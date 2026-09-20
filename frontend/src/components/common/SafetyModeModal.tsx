import React, { useState, useEffect } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import {
  ShieldAlert,
  X,
  Volume2,
  VolumeX,
  Share2,
  PhoneCall,
  Flame,
  CheckCircle,
  Lightbulb,
  AlertOctagon,
} from 'lucide-react';

export const SafetyModeModal: React.FC = () => {
  const { isSafetyModeOpen, setSafetyModeOpen, currentUser, activeIncident, t } = useRoadResQ();
  const [isStrobeActive, setIsStrobeActive] = useState(false);
  const [isSirenActive, setIsSirenActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Web Audio API Siren Generator
  useEffect(() => {
    if (isSirenActive) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(1000, ctx.currentTime + 0.6);
        osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        setAudioCtx(ctx);
        setOscillator(osc);
      } catch (err) {
        console.warn('Audio permission', err);
      }
    } else {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {}
        setOscillator(null);
      }
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch (e) {}
        setAudioCtx(null);
      }
    }

    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
        } catch (e) {}
      }
    };
  }, [isSirenActive]);

  if (!isSafetyModeOpen) return null;

  const handleShareLocation = () => {
    const locText = activeIncident
      ? `🚨 EMERGENCY: My vehicle has broken down at ${activeIncident.location.address}. Please track my RoadResQ help request: https://roadresq.in/track/${activeIncident.id}`
      : `🚨 Roadside safety alert from ${currentUser.name}. Breakdown coordinates sent via RoadResQ India.`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(locText);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      {/* Full screen strobe background if enabled */}
      {isStrobeActive && (
        <div className="fixed inset-0 z-50 pointer-events-none animate-beacon-pulse bg-red-600/30"></div>
      )}

      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 z-50 animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-200">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>{t.safetyKit}</span>
                <span className="rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  India Emergency
                </span>
              </h2>
              <p className="text-xs text-slate-500">Essential tools to ensure personal safety while awaiting assistance</p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsSirenActive(false);
              setIsStrobeActive(false);
              setSafetyModeOpen(false);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Hazard Quick Actions */}
        <div className="grid grid-cols-2 gap-3 my-5">
          {/* Visual Strobe Beacon */}
          <button
            onClick={() => setIsStrobeActive(!isStrobeActive)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all text-center ${
              isStrobeActive
                ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50'
            }`}
          >
            <Lightbulb className={`h-6 w-6 ${isStrobeActive ? 'text-amber-600 animate-bounce' : 'text-slate-500'}`} />
            <div className="text-xs font-bold">{isStrobeActive ? 'Strobe: ON' : t.strobeHazard}</div>
            <div className="text-[11px] text-slate-500">Night visibility warning</div>
          </button>

          {/* Distress Siren */}
          <button
            onClick={() => setIsSirenActive(!isSirenActive)}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all text-center ${
              isSirenActive
                ? 'bg-red-50 border-red-400 text-red-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-red-300 hover:bg-red-50/50'
            }`}
          >
            {isSirenActive ? (
              <Volume2 className="h-6 w-6 text-red-600 animate-pulse" />
            ) : (
              <VolumeX className="h-6 w-6 text-slate-500" />
            )}
            <div className="text-xs font-bold">{isSirenActive ? 'Siren: ACTIVE' : t.sirenAlarm}</div>
            <div className="text-[11px] text-slate-500">Sound alarm for nearby help</div>
          </button>
        </div>

        {/* Indian Emergency Speed Dials */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">India Emergency Speed Helplines</div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="flex items-center justify-between p-3 rounded-2xl bg-red-50 border border-red-200 hover:bg-red-100 transition-all text-slate-900"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-600 text-white">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">112 National Helpline</div>
                  <div className="text-[10px] text-slate-500">Police & Medical</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-red-600 text-white px-2 py-1 rounded-lg">CALL</span>
            </a>

            <a
              href="tel:1033"
              className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all text-slate-900"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <PhoneCall className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">1033 NHAI Helpline</div>
                  <div className="text-[10px] text-slate-500">National Highway Patrol</div>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-2 py-1 rounded-lg">CALL</span>
            </a>
          </div>

          <button
            onClick={handleShareLocation}
            className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-900 transition-all mt-2"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Share2 className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">{t.shareLocationWhatsapp}</div>
                <div className="text-[11px] text-slate-500">Priya Sharma & Amit Verma ({currentUser.emergencyContacts.length} saved)</div>
              </div>
            </div>
            {shareSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> Copied link
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-blue-600">SHARE</span>
            )}
          </button>
        </div>

        {/* Highway Safety Checklist */}
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-3.5 space-y-1.5">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <AlertOctagon className="h-3.5 w-3.5 text-amber-600" />
            <span>{t.safetyChecklistTitle}</span>
          </div>
          <ul className="text-xs text-amber-800 space-y-1 pl-1">
            <li>• 1. {t.safetyTip1}</li>
            <li>• 2. {t.safetyTip2}</li>
            <li>• 3. {t.safetyTip3}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SafetyModeModal;
