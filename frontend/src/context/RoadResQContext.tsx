import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Role,
  Incident,
  IncidentStatus,
  BreakdownType,
  SeverityLevel,
  Vehicle,
  LocationCoords,
  Provider,
  ChatMessage,
  NotificationItem,
  UserProfile,
  EscalationLog,
  Invoice,
} from '../types';
import {
  BREAKDOWN_CATEGORIES,
  DEFAULT_VEHICLES,
  INITIAL_PROVIDERS,
  INITIAL_USER,
  PAST_INCIDENTS,
  generateRoutePoints,
} from '../data/mockData';
import {
  IndianLanguage,
  LanguageOption,
  INDIAN_LANGUAGES,
  TranslationDict,
  TRANSLATIONS,
} from '../data/translations';
import confetti from 'canvas-confetti';

interface RoadResQContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: IndianLanguage;
  setLanguage: (lang: IndianLanguage) => void;
  languages: LanguageOption[];
  t: TranslationDict;
  activeIncident: Incident | null;
  incidents: Incident[];
  providers: Provider[];
  currentUser: UserProfile;
  activeProvider: Provider;
  messages: ChatMessage[];
  notifications: NotificationItem[];
  isSafetyModeOpen: boolean;
  setSafetyModeOpen: (open: boolean) => void;
  isVehicleManagerOpen: boolean;
  setVehicleManagerOpen: (open: boolean) => void;
  incomingJobAlert: Incident | null;
  matchedCandidates: Provider[];
  isMatchingActive: boolean;
  // Actions
  createEmergencyIncident: (
    type: BreakdownType,
    vehicle: Vehicle,
    location: LocationCoords,
    severity: SeverityLevel,
    notes?: string
  ) => Incident;
  selectMatchedProvider: (providerId: string) => void;
  acceptJob: (providerId: string, incidentId: string) => void;
  declineJob: (providerId: string, incidentId: string, reason?: EscalationLog['reason']) => void;
  updateIncidentStatus: (status: IncidentStatus) => void;
  sendChatMessage: (sender: 'user' | 'provider', text: string) => void;
  completeService: (parts: { id: string; name: string; price: number }[], customLabor?: number) => void;
  processPayment: (method: 'card' | 'upi' | 'wallet' | 'cash') => void;
  submitRating: (rating: number, review: string, tags: string[], tip: number) => void;
  toggleProviderStatus: (providerId: string) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  removeVehicle: (id: string) => void;
  triggerQuickSOS: (type?: BreakdownType) => void;
  fastForwardTo: (targetStatus: IncidentStatus) => void;
  cancelActiveIncident: () => void;
  markNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, type?: NotificationItem['type']) => void;
  scoreAndRankProviders: (type: BreakdownType, location: LocationCoords, vehicle: Vehicle) => Provider[];
}

const RoadResQContext = createContext<RoadResQContextType | undefined>(undefined);

export const RoadResQProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('landing');
  const [language, setLanguageState] = useState<IndianLanguage>(() => {
    try {
      const saved = localStorage.getItem('roadresq_lang') as IndianLanguage;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch {}
    return 'en';
  });

  const setLanguage = useCallback((lang: IndianLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('roadresq_lang', lang);
    } catch {}
  }, []);

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [providers, setProviders] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [incidents, setIncidents] = useState<Incident[]>(PAST_INCIDENTS);
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [matchedCandidates, setMatchedCandidates] = useState<Provider[]>([]);
  const [isMatchingActive, setIsMatchingActive] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif_welcome',
      title: 'RoadResQ Telematics Grid Online',
      message: '24/7 Smart Emergency Dispatch & Towing Network active.',
      type: 'info',
      timestamp: 'Just now',
      read: false,
    },
  ]);
  const [isSafetyModeOpen, setSafetyModeOpen] = useState(false);
  const [isVehicleManagerOpen, setVehicleManagerOpen] = useState(false);
  const [incomingJobAlert, setIncomingJobAlert] = useState<Incident | null>(null);

  const activeProvider = providers[0];

  // Notification helper
  const addNotification = useCallback((title: string, message: string, type: NotificationItem['type'] = 'info') => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const markNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Smart Provider Matching Algorithm:
  // Evaluates: Capability + Vehicle compatibility + Availability + Distance + Rating
  const scoreAndRankProviders = useCallback(
    (type: BreakdownType, location: LocationCoords, vehicle: Vehicle): Provider[] => {
      const available = providers.filter((p) => p.isOnline && p.status === 'available');

      return available
        .map((p) => {
          let score = 70;

          // Capability Match
          if (p.skills.includes(type) || type === 'dont_know') {
            score += 20;
          }

          // Special vehicle compatibility
          if (type === 'towing' && p.vehicleType.includes('Tow')) {
            score += 10;
          }
          if (vehicle.type === 'ev' && p.vehicleType.includes('Van')) {
            score += 5;
          }

          // Distance calculation (approx euclidean to km)
          const distKm = Math.hypot(p.coords.lat - location.lat, p.coords.lng - location.lng) * 110;
          const roundedDist = Math.max(0.8, Number(distKm.toFixed(1)));
          const estimatedArrival = Math.max(4, Math.round(roundedDist * 3.5 + 2));

          // Rating weight
          score += (p.rating - 4.5) * 10;

          return {
            ...p,
            distanceKm: roundedDist,
            estimatedArrivalMin: estimatedArrival,
            compatibilityScore: Math.min(99, Math.round(score)),
          };
        })
        .sort((a, b) => (b.compatibilityScore || 0) - (a.compatibilityScore || 0));
    },
    [providers]
  );

  // Create Emergency Incident
  const createEmergencyIncident = useCallback(
    (
      type: BreakdownType,
      vehicle: Vehicle,
      location: LocationCoords,
      severity: SeverityLevel,
      notes?: string
    ): Incident => {
      const randomPin = Math.floor(1000 + Math.random() * 9000).toString();
      const incidentId = `RRQ-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;
      const catInfo = BREAKDOWN_CATEGORIES.find((c) => c.type === type);

      const newIncident: Incident = {
        id: incidentId,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhone: currentUser.phone,
        vehicle,
        breakdownType: type,
        severity,
        location,
        notes: notes || '',
        status: 'MATCHING',
        createdAt: new Date().toISOString(),
        safetyPin: randomPin,
        timeline: [
          {
            status: 'CREATED',
            title: 'Incident Created',
            description: `Emergency request logged for ${catInfo?.label || type}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          {
            status: 'CLASSIFIED',
            title: 'Equipment & Severity Classified',
            description: `${severity.toUpperCase()} priority • Requires ${catInfo?.recommendedVehicle || 'Service Pro'}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
          {
            status: 'MATCHING',
            title: 'Smart Matching Engine Active',
            description: 'Calculating capability, vehicle compatibility, and arrival times...',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ],
        escalationLogs: [],
        etaMinutes: 12,
        providerRoute: [],
        currentRouteIndex: 0,
        lastUpdatedSecondsAgo: 0,
      };

      setIsMatchingActive(true);
      const ranked = scoreAndRankProviders(type, location, vehicle);
      setMatchedCandidates(ranked);

      setActiveIncident(newIncident);
      setIncidents((prev) => [newIncident, ...prev]);

      // Initial system chat message
      setMessages([
        {
          id: 'sys_1',
          sender: 'system',
          text: `🚨 Incident #${newIncident.id} created. Your 4-digit Safety PIN for technician verification is [${randomPin}].`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);

      // Auto-assign highest match after brief radar animation
      setTimeout(() => {
        setIsMatchingActive(false);
        if (ranked.length > 0) {
          const best = ranked[0];
          const route = generateRoutePoints(best.coords, location, 30);

          setActiveIncident((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              providerId: best.id,
              provider: best,
              providerRoute: route,
              status: 'ASSIGNED',
              timeline: [
                ...prev.timeline,
                {
                  status: 'ASSIGNED',
                  title: 'Provider Dispatched',
                  description: `Assigned to ${best.name} (${best.vehicleType} • ${best.rating}★)`,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                },
              ],
            };
          });

          setIncomingJobAlert({
            ...newIncident,
            providerId: best.id,
            provider: best,
            providerRoute: route,
            status: 'ASSIGNED',
          });

          addNotification(
            '🚨 Emergency Request Sent to Provider',
            `Matched with ${best.name}. Awaiting provider acceptance.`,
            'emergency'
          );
        }
      }, 2400);

      return newIncident;
    },
    [currentUser, scoreAndRankProviders, addNotification]
  );

  // Manual Selection of Matched Provider (if user chooses specific pro)
  const selectMatchedProvider = useCallback(
    (providerId: string) => {
      const chosen = providers.find((p) => p.id === providerId);
      if (!chosen || !activeIncident) return;

      const route = generateRoutePoints(chosen.coords, activeIncident.location, 30);
      setIsMatchingActive(false);

      setActiveIncident((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          providerId: chosen.id,
          provider: chosen,
          providerRoute: route,
          status: 'ASSIGNED',
          timeline: [
            ...prev.timeline,
            {
              status: 'ASSIGNED',
              title: 'Provider Selected',
              description: `Direct request to ${chosen.name} (${chosen.vehicleType})`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      });

      setIncomingJobAlert({
        ...activeIncident,
        providerId: chosen.id,
        provider: chosen,
        providerRoute: route,
        status: 'ASSIGNED',
      });
    },
    [activeIncident, providers]
  );

  // Provider Accepts Job
  const acceptJob = useCallback(
    (providerId: string, incidentId: string) => {
      setIncomingJobAlert(null);
      setProviders((prev) =>
        prev.map((p) => (p.id === providerId ? { ...p, status: 'busy', currentIncidentId: incidentId } : p))
      );

      setActiveIncident((prev) => {
        if (!prev || prev.id !== incidentId) return prev;
        const updated: Incident = {
          ...prev,
          status: 'EN_ROUTE',
          etaMinutes: 10,
          currentRouteIndex: 0,
          timeline: [
            ...prev.timeline,
            {
              status: 'EN_ROUTE',
              title: 'Provider En Route',
              description: `${prev.provider?.name || 'Technician'} accepted job and is driving to your location.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
        return updated;
      });

      addNotification(
        '🚗 Provider Accepted & En Route',
        'Technician has started navigation with live GPS updates.',
        'success'
      );

      setMessages((prev) => [
        ...prev,
        {
          id: `msg_${Date.now()}`,
          sender: 'provider',
          text: `Hello ${currentUser.name}! I have accepted your emergency request and am driving towards you. Please keep your hazard lights on if safe!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    },
    [currentUser.name, addNotification]
  );

  // Provider Declines or Times Out ➔ Automatic Escalation to Provider B / Provider C
  const declineJob = useCallback(
    (providerId: string, incidentId: string, reason: EscalationLog['reason'] = 'declined') => {
      setIncomingJobAlert(null);
      const declinedPro = providers.find((p) => p.id === providerId);

      addNotification(
        '🔄 Auto-Escalating Incident',
        `Provider ${declinedPro?.name || 'Unit'} unavailable (${reason}). Re-routing to standby unit...`,
        'warning'
      );

      setActiveIncident((prev) => {
        if (!prev || prev.id !== incidentId) return prev;
        const newLog: EscalationLog = {
          providerId,
          providerName: declinedPro?.name || 'Provider',
          reason,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        // Find next eligible provider excluding already tried
        const triedIds = [...prev.escalationLogs.map((l) => l.providerId), providerId];
        const nextCandidates = scoreAndRankProviders(prev.breakdownType, prev.location, prev.vehicle).filter(
          (p) => !triedIds.includes(p.id)
        );

        if (nextCandidates.length > 0) {
          const nextPro = nextCandidates[0];
          const newRoute = generateRoutePoints(nextPro.coords, prev.location, 30);

          const escalatedIncident: Incident = {
            ...prev,
            providerId: nextPro.id,
            provider: nextPro,
            providerRoute: newRoute,
            escalationLogs: [...prev.escalationLogs, newLog],
            status: 'ASSIGNED',
            timeline: [
              ...prev.timeline,
              {
                status: 'ASSIGNED',
                title: 'Auto-Escalated to Next Pro',
                description: `Re-assigned to ${nextPro.name} (${nextPro.rating}★ • ${nextPro.vehicleType})`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };

          setIncomingJobAlert(escalatedIncident);
          return escalatedIncident;
        }

        return {
          ...prev,
          escalationLogs: [...prev.escalationLogs, newLog],
        };
      });
    },
    [providers, scoreAndRankProviders, addNotification]
  );

  // Update Status Progression
  const updateIncidentStatus = useCallback(
    (newStatus: IncidentStatus) => {
      setActiveIncident((prev) => {
        if (!prev) return null;
        let eventTitle = '';
        let eventDesc = '';

        if (newStatus === 'ARRIVED') {
          eventTitle = 'Provider Arrived';
          eventDesc = `${prev.provider?.name || 'Technician'} arrived on-site. Safety PIN verification ready.`;
        } else if (newStatus === 'SERVICE') {
          eventTitle = 'Roadside Repair in Progress';
          eventDesc = 'Technician is performing diagnostics, repair, and safety checks.';
        } else if (newStatus === 'PAYMENT') {
          eventTitle = 'Service Completed & Invoice Generated';
          eventDesc = 'Digital transparent bill issued. Awaiting payment authorization.';
        } else if (newStatus === 'CLOSED') {
          eventTitle = 'Incident Resolved & Closed';
          eventDesc = 'Payment confirmed and breakdown assistance resolved.';
        }

        const updated: Incident = {
          ...prev,
          status: newStatus,
          timeline: [
            ...prev.timeline,
            {
              status: newStatus,
              title: eventTitle || newStatus,
              description: eventDesc,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };

        if (newStatus === 'ARRIVED') {
          updated.etaMinutes = 0;
          if (updated.providerRoute.length > 0) {
            updated.currentRouteIndex = updated.providerRoute.length - 1;
          }
        }

        return updated;
      });
    },
    []
  );

  // Send Chat Message
  const sendChatMessage = useCallback(
    (sender: 'user' | 'provider', text: string) => {
      if (!text.trim()) return;
      const newMsg: ChatMessage = {
        id: `msg_${Date.now()}`,
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, newMsg]);

      if (sender === 'user') {
        setTimeout(() => {
          let reply = 'Understood! I am navigating to your exact breakdown location.';
          const lower = text.toLowerCase();
          if (lower.includes('where') || lower.includes('eta')) {
            reply = 'I am about 4-5 minutes away, driving along the main avenue.';
          } else if (lower.includes('hazard') || lower.includes('lights') || lower.includes('barrier')) {
            reply = 'Great! Please remain behind the safety barrier or inside your vehicle with hazard lights on.';
          } else if (lower.includes('pin') || lower.includes('code')) {
            reply = 'Thanks! I will ask for the 4-digit PIN upon arrival to authenticate the job.';
          }
          setMessages((prev) => [
            ...prev,
            {
              id: `msg_reply_${Date.now()}`,
              sender: 'provider',
              text: reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
        }, 1200);
      }
    },
    []
  );

  // Complete Service & Generate Digital Invoice
  const completeService = useCallback(
    (parts: { id: string; name: string; price: number }[], customLabor = 250.0) => {
      if (!activeIncident) return;
      const catInfo = BREAKDOWN_CATEGORIES.find((c) => c.type === activeIncident.breakdownType);
      const baseFee = catInfo ? catInfo.baseEstimate : 450.0;
      const partsTotal = parts.reduce((sum, p) => sum + p.price, 0);
      const subtotal = baseFee + customLabor + partsTotal;
      const discount = 50.0; // RoadResQ membership discount
      const tax = (subtotal - discount) * 0.08;
      const total = Math.max(subtotal - discount + tax, 0);

      const generatedInvoice: Invoice = {
        id: `INV-2026-${String(Math.floor(100000 + Math.random() * 900000))}`,
        incidentId: activeIncident.id,
        baseFee,
        labourFee: customLabor,
        parts,
        discount,
        tax: Number(tax.toFixed(2)),
        total: Number(total.toFixed(2)),
        isPaid: false,
      };

      setActiveIncident((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'PAYMENT',
          invoice: generatedInvoice,
          timeline: [
            ...prev.timeline,
            {
              status: 'PAYMENT',
              title: 'Work Completed & Invoice Issued',
              description: `Total amount ₹${total.toFixed(2)}. Digital payment required.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      });

      addNotification('🧾 Invoice Ready', `Service completed. Total: ₹${total.toFixed(2)}`, 'info');
    },
    [activeIncident, addNotification]
  );

  // Process Payment
  const processPayment = useCallback(
    (method: 'card' | 'upi' | 'wallet' | 'cash') => {
      if (!activeIncident || !activeIncident.invoice) return;

      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
      });

      const updatedInvoice: Invoice = {
        ...activeIncident.invoice,
        isPaid: true,
        paymentMethod: method,
        paidAt: new Date().toISOString(),
      };

      setProviders((prev) =>
        prev.map((p) =>
          p.id === activeIncident.providerId
            ? {
                ...p,
                status: 'available',
                currentIncidentId: null,
                earningsToday: p.earningsToday + (activeIncident.invoice?.total || 500),
                jobsCompleted: p.jobsCompleted + 1,
              }
            : p
        )
      );

      setActiveIncident((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'CLOSED',
          invoice: updatedInvoice,
          timeline: [
            ...prev.timeline,
            {
              status: 'CLOSED',
              title: 'Payment Verified & Confirmed',
              description: `Paid ₹${updatedInvoice.total.toFixed(2)} via ${method.toUpperCase()}. Safe travels!`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      });

      addNotification('✅ Payment Confirmed', 'Payment processed and verified. Thank you for using RoadResQ!', 'success');
    },
    [activeIncident, addNotification]
  );

  // Submit Rating
  const submitRating = useCallback(
    (rating: number, review: string, tags: string[], tip: number) => {
      if (!activeIncident) return;
      const closedIncident: Incident = {
        ...activeIncident,
        rating,
        review,
        reviewTags: tags,
        tip,
      };

      setIncidents((prev) => [closedIncident, ...prev.filter((i) => i.id !== activeIncident.id)]);
      setActiveIncident(null);
      addNotification('⭐ Feedback Submitted', 'Your review helps keep our roadside community safe and accountable.', 'success');
    },
    [activeIncident, addNotification]
  );

  // Toggle Provider Online Status
  const toggleProviderStatus = useCallback((providerId: string) => {
    setProviders((prev) =>
      prev.map((p) =>
        p.id === providerId
          ? {
              ...p,
              isOnline: !p.isOnline,
              status: !p.isOnline ? 'available' : 'offline',
            }
          : p
      )
    );
  }, []);

  // Garage Vehicle Management
  const addVehicle = useCallback((v: Omit<Vehicle, 'id'>) => {
    const newVeh: Vehicle = {
      ...v,
      id: `veh_${Date.now()}`,
    };
    setCurrentUser((prev) => ({
      ...prev,
      savedVehicles: [...prev.savedVehicles, newVeh],
    }));
  }, []);

  const removeVehicle = useCallback((id: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      savedVehicles: prev.savedVehicles.filter((v) => v.id !== id),
    }));
  }, []);

  // Quick SOS Trigger
  const triggerQuickSOS = useCallback(
    (type: BreakdownType = 'dead_battery') => {
      const selectedVehicle = currentUser.savedVehicles[0] || DEFAULT_VEHICLES[0];
      const defaultLoc: LocationCoords = {
        lat: 12.9352,
        lng: 77.6245,
        address: '80ft Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
        landmark: 'Near Sony World Signal',
        accuracy: 3,
      };
      createEmergencyIncident(type, selectedVehicle, defaultLoc, 'critical', 'Urgent 1-Tap SOS broadcast');
      setRole('user');
    },
    [currentUser, createEmergencyIncident]
  );

  // Fast forward simulator
  const fastForwardTo = useCallback(
    (targetStatus: IncidentStatus) => {
      if (!activeIncident) {
        triggerQuickSOS('flat_tyre');
        return;
      }

      if (targetStatus === 'MATCHING') {
        setIsMatchingActive(true);
      } else if (targetStatus === 'ASSIGNED') {
        setIsMatchingActive(false);
      } else if (targetStatus === 'EN_ROUTE') {
        acceptJob(activeIncident.providerId || providers[0].id, activeIncident.id);
      } else if (targetStatus === 'ARRIVED') {
        updateIncidentStatus('ARRIVED');
      } else if (targetStatus === 'SERVICE') {
        updateIncidentStatus('SERVICE');
      } else if (targetStatus === 'PAYMENT') {
        completeService([{ id: 'p1', name: 'Standard Diagnostics & Wheel Alignment Check', price: 120.0 }]);
      } else if (targetStatus === 'CLOSED') {
        processPayment('upi');
      }
    },
    [activeIncident, providers, triggerQuickSOS, acceptJob, updateIncidentStatus, completeService, processPayment]
  );

  // Cancel active incident
  const cancelActiveIncident = useCallback(() => {
    if (activeIncident?.providerId) {
      setProviders((prev) =>
        prev.map((p) => (p.id === activeIncident.providerId ? { ...p, status: 'available', currentIncidentId: null } : p))
      );
    }
    setActiveIncident(null);
    setIncomingJobAlert(null);
    setIsMatchingActive(false);
    addNotification('Request Cancelled', 'Emergency roadside request has been cancelled.', 'info');
  }, [activeIncident, addNotification]);

  // Real-time animation simulator for moving provider along polyline when EN_ROUTE
  useEffect(() => {
    if (!activeIncident || activeIncident.status !== 'EN_ROUTE' || activeIncident.providerRoute.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIncident((prev) => {
        if (!prev || prev.status !== 'EN_ROUTE') return prev;
        const nextIndex = prev.currentRouteIndex + 1;

        if (nextIndex >= prev.providerRoute.length) {
          clearInterval(interval);
          const arrivedIncident: Incident = {
            ...prev,
            status: 'ARRIVED',
            etaMinutes: 0,
            currentRouteIndex: prev.providerRoute.length - 1,
            timeline: [
              ...prev.timeline,
              {
                status: 'ARRIVED',
                title: 'Technician Arrived On-Site',
                description: 'Provider is at your vehicle location. Safety PIN verification ready.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          };
          addNotification('📍 Provider Has Arrived', 'Technician has reached your vehicle location.', 'success');
          return arrivedIncident;
        }

        const remainingRatio = 1 - nextIndex / prev.providerRoute.length;
        const newEta = Math.max(1, Math.round(remainingRatio * 10));

        return {
          ...prev,
          currentRouteIndex: nextIndex,
          etaMinutes: newEta,
          lastUpdatedSecondsAgo: (prev.lastUpdatedSecondsAgo || 0) + 1,
        };
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [activeIncident?.status, activeIncident?.providerRoute.length, addNotification]);

  return (
    <RoadResQContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        languages: INDIAN_LANGUAGES,
        t,
        activeIncident,
        incidents,
        providers,
        currentUser,
        activeProvider,
        messages,
        notifications,
        isSafetyModeOpen,
        setSafetyModeOpen,
        isVehicleManagerOpen,
        setVehicleManagerOpen,
        incomingJobAlert,
        matchedCandidates,
        isMatchingActive,
        createEmergencyIncident,
        selectMatchedProvider,
        acceptJob,
        declineJob,
        updateIncidentStatus,
        sendChatMessage,
        completeService,
        processPayment,
        submitRating,
        toggleProviderStatus,
        addVehicle,
        removeVehicle,
        triggerQuickSOS,
        fastForwardTo,
        cancelActiveIncident,
        markNotificationsAsRead,
        addNotification,
        scoreAndRankProviders,
      }}
    >
      {children}
    </RoadResQContext.Provider>
  );
};

export const useRoadResQ = () => {
  const context = useContext(RoadResQContext);
  if (!context) {
    throw new Error('useRoadResQ must be used within a RoadResQProvider');
  }
  return context;
};
