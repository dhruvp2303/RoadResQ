import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import {
  Phone,
  MessageSquare,
  Shield,
  ShieldCheck,
  MapPin,
  Clock,
  Car,
  CheckCircle2,
  X,
  CreditCard,
  Star,
  Zap,
  ArrowLeft,
  Navigation,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';

// Leaflet custom marker icons
const userIcon = new L.DivIcon({
  className: 'custom-user-marker',
  html: `<div style="background: #ef4444; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">📍</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const providerIcon = new L.DivIcon({
  className: 'custom-provider-marker',
  html: `<div style="background: #0f172a; width: 34px; height: 34px; border-radius: 50%; border: 3px solid #10b981; box-shadow: 0 4px 12px rgba(16,185,129,0.5); display: flex; align-items: center; justify-content: center; color: #10b981; font-size: 16px;">🚗</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

interface ActiveTrackingHUDProps {
  onBackToSOS?: () => void;
}

export const ActiveTrackingHUD: React.FC<ActiveTrackingHUDProps> = ({ onBackToSOS }) => {
  const {
    activeIncident,
    cancelActiveIncident,
    sendChatMessage,
    messages,
    processPayment,
    submitRating,
    updateIncidentStatus,
    completeService,
    currentUser,
    t,
  } = useRoadResQ();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewNote, setReviewNote] = useState('Super fast response and very professional technician!');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');

  if (!activeIncident) {
    return (
      <div className="w-full h-full min-h-[640px] flex flex-col items-center justify-center bg-[#e7e9ec] p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 mb-3">
          <Navigation className="h-8 w-8" />
        </div>
        <h3 className="font-sora font-extrabold text-lg text-slate-900">No Active Emergency Request</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Use the Radar or 16-Tile Matrix to trigger an instant roadside assistance dispatch.
        </p>
        <button
          onClick={onBackToSOS}
          className="mt-4 px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs shadow hover:bg-slate-800"
        >
          Open Emergency Matrix
        </button>
      </div>
    );
  }

  const provider = activeIncident.provider;
  const currentCoords =
    activeIncident.providerRoute.length > 0 &&
    activeIncident.providerRoute[activeIncident.currentRouteIndex]
      ? activeIncident.providerRoute[activeIncident.currentRouteIndex]
      : [activeIncident.location.lat + 0.015, activeIncident.location.lng + 0.015];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage('user', chatInput);
    setChatInput('');
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between overflow-hidden select-none bg-[#e7e9ec] text-slate-800 font-sans">
      {/* TOP BAR / DYNAMIC STATUS */}
      <div className="absolute top-0 left-0 right-0 z-30 p-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={onBackToSOS}
          className="pointer-events-auto flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-800 shadow-md border border-white/60 hover:bg-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>SOS HUD</span>
        </button>

        <div className="pointer-events-auto flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md text-xs font-bold text-white shadow-md">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-sora uppercase text-[10px] tracking-wider">
            {activeIncident.status}
          </span>
        </div>
      </div>

      {/* LIVE MAP CONTAINER UNDERLAY */}
      <div className="relative w-full flex-1 min-h-[300px] z-10">
        <MapContainer
          center={[activeIncident.location.lat, activeIncident.location.lng]}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full"
          style={{ minHeight: '320px' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* User Marker */}
          <Marker position={[activeIncident.location.lat, activeIncident.location.lng]} icon={userIcon}>
            <Popup>
              <div className="text-xs font-bold">Your Breakdown Location</div>
              <div className="text-[10px] text-slate-500">{activeIncident.location.address}</div>
            </Popup>
          </Marker>

          {/* Provider Marker */}
          {provider && (
            <Marker position={[currentCoords[0], currentCoords[1]]} icon={providerIcon}>
              <Popup>
                <div className="text-xs font-bold">{provider.name}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">{provider.vehicleType} • En Route</div>
              </Popup>
            </Marker>
          )}

          {/* Simulated Route Polyline */}
          {activeIncident.providerRoute.length > 0 && (
            <Polyline
              positions={activeIncident.providerRoute}
              color="#3b82f6"
              weight={4}
              dashArray="6, 8"
            />
          )}
        </MapContainer>
      </div>

      {/* BOTTOM SLIDE-UP TELEMATICS & DISPATCH DETAILS CARD */}
      <div className="relative z-20 w-full bg-white/95 backdrop-blur-xl rounded-t-[32px] p-5 border-t border-white shadow-[0_-10px_30px_rgba(0,0,0,0.1)] space-y-4">
        {/* MUTUAL 4-DIGIT SAFETY PIN & ETA BANNER */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Mutual Safety PIN
              </div>
              <div className="text-lg font-mono font-black text-emerald-400 tracking-widest">
                {activeIncident.safetyPin}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Live ETA
            </div>
            <div className="text-lg font-sora font-black text-white">
              {activeIncident.status === 'ARRIVED' ? 'Arrived!' : `${activeIncident.etaMinutes} mins`}
            </div>
          </div>
        </div>

        {/* PROVIDER PROFILE & QUICK ACTIONS */}
        {provider && (
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="h-11 w-11 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <div className="text-xs font-black text-slate-900 font-sora">{provider.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {provider.vehicleType} • ⭐ {provider.rating} ({provider.jobsCompleted} jobs)
                </div>
                <div className="text-[10px] font-mono text-blue-600 font-bold mt-0.5">
                  {provider.vehiclePlate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${provider.phone}`}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 shadow-sm transition-colors"
                title="Call Responder"
              >
                <Phone className="h-4 w-4" />
              </a>

              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-sm transition-colors"
                title="Live Chat"
              >
                <MessageSquare className="h-4 w-4" />
                {messages.length > 1 && (
                  <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* SIMULATED STATUS PROGRESSION BUTTONS (TEST & DEMO BAR) */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          {activeIncident.status === 'ASSIGNED' && (
            <button
              onClick={() => updateIncidentStatus('ARRIVED')}
              className="w-full py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow transition-all"
            >
              Simulate Arrival
            </button>
          )}

          {activeIncident.status === 'ARRIVED' && (
            <button
              onClick={() =>
                completeService([
                  { id: 'p1', name: 'Roadside Diagnostic & Safety Protocol', price: 250 },
                ])
              }
              className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow transition-all"
            >
              Complete Service & Bill
            </button>
          )}

          {activeIncident.status === 'PAYMENT' && activeIncident.invoice && (
            <div className="w-full p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-2">
              <div className="text-xs font-bold text-amber-900">
                Invoice Total: ₹{activeIncident.invoice.total}
              </div>
              <button
                onClick={() => processPayment('upi')}
                className="w-full py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs shadow"
              >
                Pay with UPI / 1-Tap
              </button>
            </div>
          )}

          {activeIncident.status === 'CLOSED' && (
            <div className="w-full p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Service Completed!
              </div>
              <button
                onClick={() => submitRating(selectedRating, reviewNote, ['Fast', 'Polite'], 50)}
                className="w-full py-2 rounded-full bg-slate-900 text-white font-bold text-xs shadow"
              >
                Submit ⭐ Review & Close
              </button>
            </div>
          )}

          <button
            onClick={cancelActiveIncident}
            className="py-2.5 px-4 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 font-bold text-xs transition-colors shrink-0"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* SLIDE-OVER CHAT DRAWER */}
      {chatOpen && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end animate-fade-in">
          <div className="w-full max-h-[80%] bg-white rounded-t-3xl p-4 flex flex-col shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-extrabold text-slate-900 font-sora">
                  Chat with {provider?.name || 'Technician'}
                </span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-60 my-3 space-y-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    m.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-2.5 rounded-2xl text-xs ${
                      m.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-100 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">{m.timestamp}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message to technician..."
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveTrackingHUD;
