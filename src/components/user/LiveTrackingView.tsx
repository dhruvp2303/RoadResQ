import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { LeafletMap } from '../common/LeafletMap';
import {
  Phone,
  MessageSquare,
  Shield,
  Clock,
  MapPin,
  Car,
  Send,
  X,
  Star,
  Flame,
  Radio,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { BREAKDOWN_CATEGORIES } from '../../data/mockData';

export const LiveTrackingView: React.FC = () => {
  const {
    activeIncident,
    messages,
    sendChatMessage,
    cancelActiveIncident,
    setSafetyModeOpen,
    providers,
  } = useRoadResQ();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [copiedPin, setCopiedPin] = useState(false);
  const [bottomSheetExpanded, setBottomSheetExpanded] = useState(true);

  if (!activeIncident) return null;

  const currentProvider = activeIncident.provider || providers[0];
  const categoryInfo = BREAKDOWN_CATEGORIES.find((c) => c.type === activeIncident.breakdownType);

  // Current provider interpolated coordinate
  const currentProviderCoords =
    activeIncident.providerRoute.length > 0 && activeIncident.currentRouteIndex < activeIncident.providerRoute.length
      ? {
          lat: activeIncident.providerRoute[activeIncident.currentRouteIndex][0],
          lng: activeIncident.providerRoute[activeIncident.currentRouteIndex][1],
        }
      : currentProvider.coords;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage('user', chatInput);
    setChatInput('');
  };

  const handleCopyPin = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeIncident.safetyPin);
      setCopiedPin(true);
      setTimeout(() => setCopiedPin(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 animate-fade-up">
      {/* Top Status Strip */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-200 shrink-0">
              <Flame className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  {activeIncident.id}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {categoryInfo?.label || activeIncident.breakdownType}
                </span>
                {activeIncident.escalationLogs && activeIncident.escalationLogs.length > 0 && (
                  <span className="rounded-full bg-amber-50 text-amber-800 border border-amber-300 px-2 py-0.2 text-[10px] font-bold">
                    Escalated ({activeIncident.escalationLogs.length})
                  </span>
                )}
              </div>
              <h1 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                {activeIncident.status === 'ASSIGNED' && 'Provider Assigned — Starting Route'}
                {activeIncident.status === 'EN_ROUTE' && `Technician En Route — ETA ${activeIncident.etaMinutes} Mins`}
                {activeIncident.status === 'ARRIVED' && 'Technician Arrived On-Site!'}
                {activeIncident.status === 'SERVICE' && 'Roadside Diagnostics & Repair in Progress'}
                {activeIncident.status === 'PAYMENT' && 'Service Completed — Invoice Generated'}
                {activeIncident.status === 'CLOSED' && 'Assistance Completed & Resolved'}
              </h1>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-1.5 text-center shadow-sm">
              <div className="text-[10px] font-bold text-slate-500 uppercase">ETA</div>
              <div className="font-display text-base font-extrabold text-slate-900">
                {activeIncident.status === 'ARRIVED' || activeIncident.status === 'SERVICE'
                  ? 'ON SITE'
                  : `${activeIncident.etaMinutes} min`}
              </div>
            </div>

            <div
              onClick={handleCopyPin}
              className="bg-red-50 border border-red-200 hover:border-red-400 rounded-2xl px-3.5 py-1.5 text-center cursor-pointer shadow-sm group"
              title="Share PIN with technician for verification"
            >
              <div className="text-[10px] font-bold text-red-700 uppercase">Safety PIN</div>
              <div className="font-mono text-base font-extrabold text-red-700 tracking-wider">
                {activeIncident.safetyPin}
              </div>
            </div>
          </div>
        </div>

        {/* Step Progress Line */}
        <div className="grid grid-cols-5 gap-2 pt-3 mt-3 border-t border-slate-100">
          {[
            { label: 'Assigned', active: true },
            {
              label: 'En Route',
              active: ['EN_ROUTE', 'ARRIVED', 'SERVICE', 'PAYMENT', 'CLOSED'].includes(activeIncident.status),
            },
            {
              label: 'Arrived',
              active: ['ARRIVED', 'SERVICE', 'PAYMENT', 'CLOSED'].includes(activeIncident.status),
            },
            {
              label: 'Service',
              active: ['SERVICE', 'PAYMENT', 'CLOSED'].includes(activeIncident.status),
            },
            {
              label: 'Paid',
              active: ['PAYMENT', 'CLOSED'].includes(activeIncident.status),
            },
          ].map((s, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <div
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s.active ? 'bg-red-600' : 'bg-slate-200'
                }`}
              />
              <div
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  s.active ? 'text-slate-900' : 'text-slate-400'
                }`}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Layout: Desktop 2-Col (Side Panel + Large Map) / Mobile Map + Bottom Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Side Panel (Desktop: 4 cols) */}
        <div className="order-2 lg:order-1 lg:col-span-4 space-y-4">
          {/* Provider Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Assigned Responder
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Verified Pro
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentProvider.avatar}
                  alt={currentProvider.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500"
                />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </div>

              <div>
                <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                  {currentProvider.name}
                </h3>
                <div className="text-xs text-blue-600 font-semibold">{currentProvider.vehicleType}</div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                  <span className="flex items-center text-amber-600 font-bold">
                    <Star className="h-3 w-3 fill-amber-500 mr-1" />
                    {currentProvider.rating}
                  </span>
                  <span>•</span>
                  <span>{currentProvider.jobsCompleted} dispatches</span>
                </div>
              </div>
            </div>

            {/* Vehicle Plate & Action Buttons */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Service Vehicle Plate</span>
              <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {currentProvider.vehiclePlate}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setCallModalOpen(true)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Pro</span>
              </button>

              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all active:scale-95"
              >
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                <span>Chat ({messages.length})</span>
              </button>
            </div>
          </div>

          {/* Interactive Chat Box */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col h-64">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-blue-600" />
                <span>Direct Masked Chat</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-mono">End-to-End Private</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 py-2 text-xs">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                const isSystem = msg.sender === 'system';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      isSystem ? 'items-center' : isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    {isSystem ? (
                      <div className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl text-[10px] text-slate-700 text-center max-w-[90%]">
                        {msg.text}
                      </div>
                    ) : (
                      <div
                        className={`max-w-[85%] rounded-2xl px-3 py-1.5 ${
                          isUser
                            ? 'bg-blue-600 text-white font-medium rounded-br-none'
                            : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <span className="text-[9px] opacity-75 block text-right mt-0.5">{msg.timestamp}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quick chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
              {['Where are you?', 'Hazard lights are ON', 'PIN is ready'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => sendChatMessage('user', chip)}
                  className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-full shrink-0 font-medium"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                placeholder="Type message to pro..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="submit"
                className="flex h-7 w-7 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 shrink-0"
              >
                <Send className="h-3 w-3" />
              </button>
            </form>
          </div>

          {/* Quick Vehicle & Safety Bar */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-slate-600" />
              <span className="font-bold text-slate-900">
                {activeIncident.vehicle.year} {activeIncident.vehicle.make} {activeIncident.vehicle.model}
              </span>
            </div>
            <button
              onClick={() => setSafetyModeOpen(true)}
              className="text-red-600 hover:text-red-700 font-bold bg-red-50 px-2.5 py-1 rounded-xl border border-red-200 text-xs"
            >
              Safety Kit (112)
            </button>
          </div>

          <button
            onClick={cancelActiveIncident}
            className="w-full py-2 text-xs font-semibold text-slate-400 hover:text-red-600 text-center transition-all"
          >
            Cancel Roadside Request
          </button>
        </div>

        {/* Right Large Map (Desktop: 8 cols, Mobile: full height with bottom sheet) */}
        <div className="order-1 lg:order-2 lg:col-span-8 relative">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
            <LeafletMap
              userLocation={activeIncident.location}
              assignedProvider={currentProvider}
              currentProviderCoords={currentProviderCoords}
              providerRoute={activeIncident.providerRoute}
              className="h-[380px] sm:h-[480px] lg:h-[580px] w-full"
            />
          </div>
        </div>
      </div>

      {/* Masked Phone Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-900 space-y-4 animate-fade-up shadow-2xl">
            <div className="relative mx-auto w-20 h-20">
              <img
                src={currentProvider.avatar}
                alt={currentProvider.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
              />
              <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping" />
            </div>

            <div>
              <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">
                Connecting Masked Call (India)
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-1">{currentProvider.name}</h3>
              <p className="text-xs text-slate-500">{currentProvider.phone} (Privacy Protected)</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              "RoadResQ automated IVR bridges your call securely without exposing private numbers."
            </div>

            <button
              onClick={() => setCallModalOpen(false)}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTrackingView;
