import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { IncidentStatus, BreakdownType } from '../../types';
import {
  Sparkles,
  Zap,
  Disc,
  Truck,
  ChevronUp,
  ChevronDown,
  UserCheck,
  Navigation,
  MapPin,
  Wrench,
  CreditCard,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Sliders,
} from 'lucide-react';

export const DemoControlBar: React.FC = () => {
  const {
    activeIncident,
    setRole,
    triggerQuickSOS,
    fastForwardTo,
    declineJob,
    cancelActiveIncident,
  } = useRoadResQ();

  const [isExpanded, setIsExpanded] = useState(true);

  const statusSteps: { status: IncidentStatus; label: string; icon: React.ReactNode }[] = [
    { status: 'MATCHING', label: '1. Matching', icon: <UserCheck className="h-3.5 w-3.5" /> },
    { status: 'EN_ROUTE', label: '2. En Route', icon: <Navigation className="h-3.5 w-3.5" /> },
    { status: 'ARRIVED', label: '3. Arrived', icon: <MapPin className="h-3.5 w-3.5" /> },
    { status: 'SERVICE', label: '4. Service', icon: <Wrench className="h-3.5 w-3.5" /> },
    { status: 'PAYMENT', label: '5. Invoice & Pay', icon: <CreditCard className="h-3.5 w-3.5" /> },
    { status: 'CLOSED', label: '6. Resolved', icon: <CheckCircle className="h-3.5 w-3.5" /> },
  ];

  const handleLaunchScenario = (type: BreakdownType) => {
    triggerQuickSOS(type);
    setRole('user');
  };

  const handleSimulateDecline = () => {
    if (activeIncident && activeIncident.providerId) {
      declineJob(activeIncident.providerId, activeIncident.id, 'busy');
    }
  };

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-5xl">
      <div className="rounded-3xl border border-slate-300/90 bg-white/95 backdrop-blur-md shadow-2xl p-3.5 sm:p-4 text-slate-900 transition-all duration-300">
        {/* Header Bar with generous spacing */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-red-100 text-red-600 border border-red-200 shadow-2xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900">
              ⚡ RoadResQ Telematics Simulator HUD
            </span>
            {activeIncident ? (
              <span className="rounded-full bg-emerald-100 border border-emerald-200 px-3 py-0.5 text-[11px] font-mono text-emerald-800 font-extrabold shadow-2xs">
                Active: {activeIncident.id} ({activeIncident.status})
              </span>
            ) : (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-mono text-slate-500 font-semibold">
                Ready to simulate
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeIncident && (
              <button
                onClick={cancelActiveIncident}
                className="text-xs font-bold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Demo</span>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
              aria-label="Toggle HUD"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Controls with increased spacing */}
        {isExpanded && (
          <div className="pt-3 space-y-3">
            {/* Quick Preset Launchers for India */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5 text-slate-400" />
                <span>Presets (Ahmedabad / Bengaluru):</span>
              </span>

              <button
                onClick={() => handleLaunchScenario('flat_tyre')}
                className="flex items-center gap-2 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-200 px-3.5 py-1.5 text-xs font-bold text-orange-800 transition-all shadow-xs hover:-translate-y-0.5"
              >
                <Disc className="h-3.5 w-3.5 text-orange-600" />
                <span>Puncture (Satellite Rd)</span>
              </button>

              <button
                onClick={() => handleLaunchScenario('dead_battery')}
                className="flex items-center gap-2 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-1.5 text-xs font-bold text-amber-800 transition-all shadow-xs hover:-translate-y-0.5"
              >
                <Zap className="h-3.5 w-3.5 text-amber-600" />
                <span>Battery Jump (SG Highway)</span>
              </button>

              <button
                onClick={() => handleLaunchScenario('towing')}
                className="flex items-center gap-2 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 px-3.5 py-1.5 text-xs font-bold text-red-800 transition-all shadow-xs hover:-translate-y-0.5"
              >
                <Truck className="h-3.5 w-3.5 text-red-600" />
                <span>Flatbed Tow (NH48 Toll)</span>
              </button>

              {activeIncident && activeIncident.status === 'ASSIGNED' && (
                <button
                  onClick={handleSimulateDecline}
                  className="flex items-center gap-1.5 rounded-full bg-rose-100 hover:bg-rose-200 border border-rose-300 px-3 py-1 text-xs font-bold text-rose-900 transition-all shadow-xs ml-auto"
                >
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-700" />
                  <span>Simulate Decline ➔ Auto Escalate</span>
                </button>
              )}
            </div>

            {/* Step-by-Step Fast Forward Progression Bar */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                Fast-Forward Lifecycle Stages:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {statusSteps.map((step) => {
                  const isCurrent = activeIncident?.status === step.status;
                  return (
                    <button
                      key={step.status}
                      onClick={() => fastForwardTo(step.status)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl px-2.5 py-2 text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-[hsl(var(--primary))] text-white shadow-sm ring-2 ring-[hsl(var(--accent))] scale-[1.02]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      {step.icon}
                      <span className="truncate">{step.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoControlBar;
