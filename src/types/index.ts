export type Role = 'landing' | 'user' | 'provider' | 'admin' | 'hud';

export type IncidentStatus =
  | 'CREATED'
  | 'CLASSIFIED'
  | 'MATCHING'
  | 'ASSIGNED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'SERVICE'
  | 'PAYMENT'
  | 'CLOSED'
  | 'CANCELLED';

export type BreakdownType =
  | 'flat_tyre'
  | 'dead_battery'
  | 'out_of_fuel'
  | 'overheating'
  | 'mechanical'
  | 'towing'
  | 'lockout'
  | 'dont_know';

export type SeverityLevel = 'low' | 'medium' | 'critical';

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  type: 'sedan' | 'suv' | 'ev' | 'truck' | 'motorcycle' | 'bike' | 'scooter';
  fuelType?: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
}

export interface LocationCoords {
  lat: number;
  lng: number;
  address: string;
  landmark?: string;
  accuracy?: number;
}

export interface ProviderCapability {
  type: BreakdownType;
  basePrice: number;
  name: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  rating: number;
  jobsCompleted: number;
  vehicleType: 'Tow Truck' | 'Mobile Service Van' | 'Quick Response Bike' | 'Heavy Recovery Unit';
  vehiclePlate: string;
  skills: BreakdownType[];
  isOnline: boolean;
  coords: { lat: number; lng: number };
  heading?: number;
  currentIncidentId?: string | null;
  earningsToday: number;
  status: 'available' | 'busy' | 'offline';
  verificationStatus: 'verified' | 'pending' | 'suspended';
  distanceKm?: number;
  estimatedArrivalMin?: number;
  compatibilityScore?: number;
}

export interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export interface Invoice {
  id: string;
  incidentId: string;
  baseFee: number;
  labourFee: number;
  parts: InvoiceItem[];
  tax: number;
  discount: number;
  total: number;
  isPaid: boolean;
  paymentMethod?: 'card' | 'upi' | 'wallet' | 'cash';
  paidAt?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'provider' | 'system';
  text: string;
  timestamp: string;
}

export interface IncidentTimelineEvent {
  status: IncidentStatus;
  title: string;
  description: string;
  timestamp: string;
}

export interface EscalationLog {
  providerId: string;
  providerName: string;
  reason: 'timeout' | 'declined' | 'busy' | 'manual_override';
  timestamp: string;
}

export interface Incident {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  vehicle: Vehicle;
  breakdownType: BreakdownType;
  severity: SeverityLevel;
  location: LocationCoords;
  notes?: string;
  status: IncidentStatus;
  createdAt: string;
  providerId?: string;
  provider?: Provider;
  safetyPin: string; // 4-digit mutual verification code
  timeline: IncidentTimelineEvent[];
  escalationLogs: EscalationLog[];
  etaMinutes: number;
  providerRoute: [number, number][]; // Polyline coords
  currentRouteIndex: number; // For simulation
  invoice?: Invoice;
  rating?: number;
  review?: string;
  reviewTags?: string[];
  tip?: number;
  lastUpdatedSecondsAgo?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'emergency';
  timestamp: string;
  read: boolean;
}

export interface BreakdownCategoryInfo {
  type: BreakdownType;
  label: string;
  iconName: string;
  description: string;
  baseEstimate: number;
  typicalEta: string;
  color: string;
  recommendedVehicle: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  savedVehicles: Vehicle[];
  emergencyContacts: { name: string; phone: string; relation: string }[];
  savedLocations: { label: string; address: string }[];
}
