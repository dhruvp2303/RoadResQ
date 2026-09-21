import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Share2,
  MessageSquare,
  AlertTriangle,
  MapPin,
  Edit2,
  Check,
  X,
  ChevronRight,
  Radio,
  Flame,
  Shield,
  Activity,
  Car,
  AlertOctagon,
  Waves,
  Zap,
  Building,
  CloudRain,
  Lock,
  Compass,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { BreakdownType } from '../../types';
import CommunityDrawer from '../app/CommunityDrawer';

interface EmergencyCategory {
  id: string;
  label: string;
  type: BreakdownType;
  iconName: string;
  emoji: string;
  color: string;
  bgGradient?: string;
  severity: 'low' | 'medium' | 'critical';
  baseEta: string;
  basePrice: number;
}

interface EmergencyGridScreenProps {
  onCancel?: () => void;
  onSendSOS?: (category: EmergencyCategory) => void;
  standalone?: boolean;
}

export const EmergencyGridScreen: React.FC<EmergencyGridScreenProps> = ({
  onCancel,
  onSendSOS,
  standalone = false,
}) => {
  const { createEmergencyIncident, currentUser, triggerQuickSOS, addNotification, setRole } =
    useRoadResQ();

  const [activeDrawerTab, setActiveDrawerTab] = useState<'community' | 'sharing' | 'message' | 'alert' | null>(null);
  const [address, setAddress] = useState('1234 Mission St');
  const [addressDetail, setAddressDetail] = useState('Apt #345B, 27th Floor · San Francisco, CA');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(true);
  const [selectedCatId, setSelectedCatId] = useState<string>('robbery');

  // Interactive 3-Second SOS Countdown State
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isDispatched, setIsDispatched] = useState(false);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 16 Emergency Categories matching the exact 4x4 grid layout from the reference image
  const categories: EmergencyCategory[] = [
    {
      id: 'medical',
      label: 'Medical',
      type: 'dont_know',
      iconName: 'ShieldPlus',
      emoji: '🛡️',
      color: '#3b82f6',
      severity: 'critical',
      baseEta: '3 mins',
      basePrice: 0,
    },
    {
      id: 'police',
      label: 'Police',
      type: 'dont_know',
      iconName: 'Shield',
      emoji: '👮',
      color: '#1e40af',
      severity: 'critical',
      baseEta: '4 mins',
      basePrice: 0,
    },
    {
      id: 'fire',
      label: 'Fire',
      type: 'overheating',
      iconName: 'Flame',
      emoji: '🔥',
      color: '#ef4444',
      severity: 'critical',
      baseEta: '4 mins',
      basePrice: 0,
    },
    {
      id: 'accident',
      label: 'Accident',
      type: 'towing',
      iconName: 'Car',
      emoji: '🚗',
      color: '#f59e0b',
      severity: 'critical',
      baseEta: '5 mins',
      basePrice: 850,
    },
    {
      id: 'robbery',
      label: 'Robbery',
      type: 'dont_know',
      iconName: 'AlertOctagon',
      emoji: '🥷',
      color: '#e11d48',
      severity: 'critical',
      baseEta: '2 mins',
      basePrice: 0,
    },
    {
      id: 'kidnapping',
      label: 'kidnapping',
      type: 'dont_know',
      iconName: 'UserX',
      emoji: '🏃‍♂️',
      color: '#64748b',
      severity: 'critical',
      baseEta: '2 mins',
      basePrice: 0,
    },
    {
      id: 'gasleak',
      label: 'Gas Leak',
      type: 'mechanical',
      iconName: 'Flame',
      emoji: '🔥',
      color: '#f97316',
      severity: 'critical',
      baseEta: '6 mins',
      basePrice: 350,
    },
    {
      id: 'flood',
      label: 'Flood',
      type: 'towing',
      iconName: 'Waves',
      emoji: '🌊',
      color: '#0284c7',
      severity: 'medium',
      baseEta: '7 mins',
      basePrice: 950,
    },
    {
      id: 'earthquake',
      label: 'Earthquake',
      type: 'mechanical',
      iconName: 'Building',
      emoji: '🏚️',
      color: '#78716c',
      severity: 'critical',
      baseEta: '5 mins',
      basePrice: 0,
    },
    {
      id: 'tsunami',
      label: 'Tsunami',
      type: 'dont_know',
      iconName: 'Waves',
      emoji: '🌊',
      color: '#0369a1',
      severity: 'critical',
      baseEta: '8 mins',
      basePrice: 0,
    },
    {
      id: 'powerout',
      label: 'Power out',
      type: 'dead_battery',
      iconName: 'Zap',
      emoji: '⚡',
      color: '#eab308',
      severity: 'medium',
      baseEta: '5 mins',
      basePrice: 400,
    },
    {
      id: 'structural',
      label: 'Structural',
      type: 'mechanical',
      iconName: 'Building',
      emoji: '🏡',
      color: '#d97706',
      severity: 'medium',
      baseEta: '9 mins',
      basePrice: 650,
    },
    {
      id: 'hazmat',
      label: 'Hazmat',
      type: 'mechanical',
      iconName: 'AlertTriangle',
      emoji: '🧪',
      color: '#06b6d4',
      severity: 'critical',
      baseEta: '6 mins',
      basePrice: 1200,
    },
    {
      id: 'wildfire',
      label: 'Wildfire',
      type: 'overheating',
      iconName: 'Flame',
      emoji: '🔥',
      color: '#ea580c',
      severity: 'critical',
      baseEta: '5 mins',
      basePrice: 0,
    },
    {
      id: 'weather',
      label: 'Weather',
      type: 'dont_know',
      iconName: 'CloudRain',
      emoji: '⛈️',
      color: '#6366f1',
      severity: 'low',
      baseEta: '8 mins',
      basePrice: 300,
    },
    {
      id: 'cyber',
      label: 'Cyber',
      type: 'lockout',
      iconName: 'Lock',
      emoji: '🔒',
      color: '#8b5cf6',
      severity: 'low',
      baseEta: '10 mins',
      basePrice: 500,
    },
  ];

  const selectedCategory = categories.find((c) => c.id === selectedCatId) || categories[4];

  // Automatic 3-Second Countdown
  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      countdownTimerRef.current = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isCountingDown && countdown === 0) {
      handleFinalDispatch();
    }

    return () => {
      if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    };
  }, [isCountingDown, countdown]);

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
    if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    if (onCancel) onCancel();
  };

  const handleManualSendSOS = () => {
    if (countdownTimerRef.current) clearTimeout(countdownTimerRef.current);
    handleFinalDispatch();
  };

  const handleFinalDispatch = () => {
    setIsDispatched(true);
    addNotification(
      `🚨 ${selectedCategory.label} SOS Broadcasted!`,
      `Dispatch unit notified at ${address}. Live telematics tracking activated.`,
      'emergency'
    );
    if (onSendSOS) {
      onSendSOS(selectedCategory);
    } else {
      triggerQuickSOS(selectedCategory.type);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between overflow-hidden select-none bg-[#e7e9ec] text-slate-800 p-4 sm:p-5 font-sans">
      {/* TOP HEADER: STATUS & DYNAMIC ISLAND */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 mb-2.5 px-1">
          <span>11:30</span>
          <div className="h-4 w-24 bg-black/85 rounded-full mx-auto hidden sm:block shadow-inner" />
          <div className="flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5 text-slate-700 animate-pulse" />
            <span>5G</span>
          </div>
        </div>

        {/* TOP 4-TAB SEGMENTED CAPSULE BAR */}
        <div className="w-full flex items-center justify-between rounded-full bg-white/90 backdrop-blur-md p-1 border border-white/60 shadow-sm">
          <button
            onClick={() => setActiveDrawerTab('community')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-full text-[11px] font-bold transition-all ${
              activeDrawerTab === 'community'
                ? 'text-rose-600 bg-rose-50/80 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <Users className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] leading-tight">Community</span>
          </button>

          <button
            onClick={() => setActiveDrawerTab('sharing')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-full text-[11px] font-bold transition-all ${
              activeDrawerTab === 'sharing'
                ? 'text-rose-600 bg-rose-50/80 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <Share2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] leading-tight">Sharing</span>
          </button>

          <button
            onClick={() => setActiveDrawerTab('message')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-full text-[11px] font-bold transition-all ${
              activeDrawerTab === 'message'
                ? 'text-rose-600 bg-rose-50/80 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <MessageSquare className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] leading-tight">Message</span>
          </button>

          <button
            onClick={() => setActiveDrawerTab('alert')}
            className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-full text-[11px] font-bold transition-all ${
              activeDrawerTab === 'alert'
                ? 'text-rose-600 bg-rose-50/80 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <AlertTriangle className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] leading-tight">Alert</span>
          </button>
        </div>
      </div>

      {/* ADDRESS CONFIRMATION CARD */}
      <div className="relative z-10 w-full my-2 bg-white/95 backdrop-blur-md rounded-2xl p-3 border border-white/80 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shrink-0">
              <MapPin className="h-4 w-4 text-slate-700" />
            </div>
            <div className="text-left overflow-hidden">
              {isEditingAddress ? (
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="text-xs font-extrabold text-slate-900 border-b border-slate-300 focus:outline-none w-full"
                />
              ) : (
                <div className="text-xs font-black text-slate-900 font-sora truncate">{address}</div>
              )}
              <div className="text-[10px] text-slate-500 truncate">{addressDetail}</div>
            </div>
          </div>
          <button
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Crimson Confirm Address Capsule Button */}
        <button
          onClick={() => {
            setIsEditingAddress(false);
            setAddressConfirmed(true);
            addNotification('Address Confirmed', address, 'success');
          }}
          className="w-full mt-2.5 py-2 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs tracking-wide shadow-md hover:shadow-lg transition-all active:scale-98"
        >
          Confirm Address
        </button>
      </div>

      {/* 4x4 EMERGENCY CATEGORIES MATRIX (16 3D TILES) */}
      <div className="relative z-10 grid grid-cols-4 gap-2 my-1">
        {categories.map((cat) => {
          const isSelected = selectedCatId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCatId(cat.id);
                // Restart countdown on new selection
                setCountdown(3);
                setIsCountingDown(true);
              }}
              className={`relative flex flex-col items-center justify-center rounded-2xl p-2.5 transition-all duration-200 select-none ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-500 to-red-600 text-white shadow-lg ring-2 ring-rose-400 scale-[1.03] z-10'
                  : 'bg-white/85 hover:bg-white text-slate-700 border border-white/60 shadow-xs hover:shadow-sm hover:scale-[1.02]'
              }`}
            >
              {/* 3D Emoji / Badge Icon */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-lg mb-1 shadow-xs transition-transform ${
                  isSelected ? 'bg-white/20' : 'bg-slate-50'
                }`}
              >
                <span>{cat.emoji}</span>
              </div>

              {/* Category Label */}
              <span
                className={`text-[10px] font-extrabold tracking-tight capitalize truncate w-full text-center ${
                  isSelected ? 'text-white' : 'text-slate-800'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* BOTTOM 3-SECOND SOS COUNTDOWN ACTION BAR */}
      <div className="relative z-10 w-full mt-2 flex items-center justify-between gap-2">
        {/* CANCEL BUTTON (Left - Green Capsule) */}
        <button
          onClick={handleCancelCountdown}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
        >
          <X className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Cancel</span>
        </button>

        {/* ANIMATED PULSING COUNTDOWN CIRCULAR BADGE (Center) */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-red-600 text-white font-black text-lg shadow-xl animate-sos-pulse border-2 border-white/80">
            {countdown > 0 ? (
              <span className="font-sora">{countdown}</span>
            ) : (
              <Check className="h-6 w-6 stroke-[3]" />
            )}
          </div>
        </div>

        {/* SEND SOS BUTTON (Right - Crimson Capsule) */}
        <button
          onClick={handleManualSendSOS}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
        >
          <span>Send SOS</span>
          <ChevronRight className="h-3.5 w-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* DISPATCH CONFIRMATION POPUP */}
      {isDispatched && (
        <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-5 text-center max-w-xs shadow-2xl animate-scale-up">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <span className="text-2xl">{selectedCategory.emoji}</span>
            </div>
            <h3 className="font-sora font-extrabold text-base text-slate-900">
              {selectedCategory.label} Unit Dispatched
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Nearest responder is en route to {address}. ETA {selectedCategory.baseEta}.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <button
                onClick={() => setRole('user')}
                className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow hover:bg-slate-800"
              >
                Track Live Telematics
              </button>
              <button
                onClick={() => setIsDispatched(false)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Close HUD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMMUNITY & TELEMATICS DRAWER */}
      <CommunityDrawer
        activeTab={activeDrawerTab}
        onClose={() => setActiveDrawerTab(null)}
      />
    </div>
  );
};

export default EmergencyGridScreen;
