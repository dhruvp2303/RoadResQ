import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  SlidersHorizontal,
  Mic,
  MicOff,
  ChevronRight,
  ChevronDown,
  Navigation,
  ShieldCheck,
  Radio,
  Truck,
  Wrench,
  Ambulance,
  Shield,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  Volume2,
} from 'lucide-react';
import { useRoadResQ } from '../../context/RoadResQContext';

interface RadarSafetyScreenProps {
  onSlideToGrid?: () => void;
  onExit?: () => void;
  standalone?: boolean;
}

interface RadarBlip {
  id: string;
  name: string;
  type: 'tow' | 'mechanic' | 'ambulance' | 'police';
  top: string;
  left: string;
  eta: string;
  distance: string;
  rating: number;
}

export const RadarSafetyScreen: React.FC<RadarSafetyScreenProps> = ({
  onSlideToGrid,
  onExit,
  standalone = false,
}) => {
  const { currentUser, triggerQuickSOS, setSafetyModeOpen, t } = useRoadResQ();

  const [locationName, setLocationName] = useState('China Basin, San Francisco');
  const [safetyIndex, setSafetyIndex] = useState(91);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeBlip, setActiveBlip] = useState<RadarBlip | null>(null);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [checkInDone, setCheckInDone] = useState(false);
  const [slideOffset, setSlideOffset] = useState(0);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Nearby simulated telematics responder blips on the radar
  const radarBlips: RadarBlip[] = [
    {
      id: 'b1',
      name: 'Highway Tow Patrol #04',
      type: 'tow',
      top: '32%',
      left: '68%',
      eta: '4 mins',
      distance: '1.2 km',
      rating: 4.9,
    },
    {
      id: 'b2',
      name: 'Apex Mobile Mechanic Unit',
      type: 'mechanic',
      top: '64%',
      left: '28%',
      eta: '6 mins',
      distance: '2.1 km',
      rating: 4.8,
    },
    {
      id: 'b3',
      name: 'Golden Gate Trauma Ambulance',
      type: 'ambulance',
      top: '24%',
      left: '36%',
      eta: '3 mins',
      distance: '0.9 km',
      rating: 5.0,
    },
    {
      id: 'b4',
      name: 'City Emergency Escort',
      type: 'police',
      top: '72%',
      left: '74%',
      eta: '5 mins',
      distance: '1.8 km',
      rating: 4.9,
    },
  ];

  // Hold for SOS logic (1.5s hold triggers emergency dispatch)
  useEffect(() => {
    if (isHolding) {
      holdIntervalRef.current = setInterval(() => {
        setHoldProgress((prev) => {
          if (prev >= 100) {
            clearInterval(holdIntervalRef.current!);
            setIsHolding(false);
            triggerQuickSOS('dont_know');
            return 0;
          }
          return prev + 5;
        });
      }, 50);
    } else {
      if (holdIntervalRef.current) {
        clearInterval(holdIntervalRef.current);
      }
      setHoldProgress(0);
    }

    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, [isHolding, triggerQuickSOS]);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setSearchQuery('Emergency Flat Tyre on Highway');
      }, 2500);
    }
  };

  const handleCheckIn = () => {
    setCheckInDone(true);
    setTimeout(() => setCheckInDone(false), 3500);
  };

  return (
    <div className="relative w-full h-full min-h-[640px] flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#b4f3d4] via-[#cbf7e3] to-[#b7f2d6] text-[#0f2e21] p-5 sm:p-6 font-sans">
      {/* Background Soft Glows */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* TOP BAR / SLIDE TO EXIT PILL */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* iOS Dynamic Island & Status for mobile frame view */}
        <div className="w-full flex items-center justify-between text-xs font-semibold text-emerald-950/70 mb-3 px-1">
          <span>11:30</span>
          <div className="h-4 w-24 bg-black/85 rounded-full mx-auto hidden sm:block shadow-inner" />
          <div className="flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5 text-emerald-900 animate-pulse" />
            <span>5G</span>
          </div>
        </div>

        {/* Slide To Switch/Exit Capsule Slider */}
        <div
          onClick={onSlideToGrid || onExit}
          className="relative flex items-center justify-between w-52 h-11 px-1.5 rounded-full bg-black/10 backdrop-blur-md border border-white/40 shadow-sm cursor-pointer hover:bg-black/15 transition-all group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white shadow-md group-hover:translate-x-1 transition-transform">
            <ChevronRight className="h-4 w-4 stroke-[2.5]" />
          </div>
          <span className="text-xs font-bold text-emerald-950/90 tracking-wide font-sora pr-4">
            Slide to exit
          </span>
        </div>
      </div>

      {/* HERO HEADER: LOCATION & SAFETY INDEX */}
      <div className="relative z-10 text-center my-3">
        <h1 className="text-2xl sm:text-[28px] font-black tracking-tight text-slate-900 font-sora flex items-center justify-center gap-2">
          <span>{locationName}</span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-900/90">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-ping" />
            Safety Index {safetyIndex}%
          </span>
          <span className="text-[10px] bg-emerald-800/10 text-emerald-900 font-bold px-2 py-0.5 rounded-full border border-emerald-700/20">
            Safe Corridor
          </span>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="relative z-10 w-full max-w-sm mx-auto my-1">
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/70 shadow-sm focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-600/40 transition-all">
          <Search className="h-4 w-4 text-emerald-900/60 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Where are you going today?"
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-900 placeholder:text-emerald-950/50 focus:outline-none"
          />
          <button
            onClick={() => setLocationName(locationName === 'China Basin' ? 'Gurugram NH-48 Corridor' : 'China Basin')}
            className="p-1 rounded-full text-emerald-900/60 hover:text-emerald-900 hover:bg-emerald-100/50 transition-colors"
            title="Filter Settings"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* CENTRAL ANIMATED RADAR / SONAR MAP SCANNER */}
      <div className="relative z-10 my-auto flex items-center justify-center py-2">
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center border-4 border-white/60 bg-emerald-400/20 backdrop-blur-sm shadow-[0_12px_40px_rgba(16,185,129,0.25)] overflow-hidden">
          {/* Subtle Map Grid / Land Underlay Background */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-multiply bg-center bg-cover pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(180,243,212,0.6) 100%), linear-gradient(to right, rgba(16,185,129,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,185,129,0.15) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            }}
          />

          {/* Concentric Radar Distance Rings */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-emerald-500/40" />
          <div className="absolute w-[55%] h-[55%] rounded-full border border-emerald-600/40" />
          <div className="absolute w-[30%] h-[30%] rounded-full border border-emerald-700/40" />

          {/* Crosshair Axes */}
          <div className="absolute w-full h-[1px] bg-emerald-700/20" />
          <div className="absolute h-full w-[1px] bg-emerald-700/20" />

          {/* Animated 360° Radar Cone Beam */}
          <div
            className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(16, 185, 129, 0.55) 0deg, rgba(52, 211, 153, 0.25) 45deg, rgba(16, 185, 129, 0) 90deg, transparent 360deg)',
            }}
          />

          {/* Dynamic Radar Responder Blips */}
          {radarBlips.map((blip) => (
            <div
              key={blip.id}
              style={{ top: blip.top, left: blip.left }}
              onClick={() => setActiveBlip(blip)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
            >
              <div className="relative flex items-center justify-center">
                <span className="absolute h-5 w-5 rounded-full bg-emerald-700/30 animate-ping" />
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-emerald-300 shadow-md border border-white hover:scale-125 transition-transform">
                  {blip.type === 'tow' && <Truck className="h-3 w-3" />}
                  {blip.type === 'mechanic' && <Wrench className="h-3 w-3" />}
                  {blip.type === 'ambulance' && <Ambulance className="h-3 w-3 text-red-400" />}
                  {blip.type === 'police' && <Shield className="h-3 w-3 text-blue-400" />}
                </div>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex flex-col items-center bg-slate-950 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-xl whitespace-nowrap z-30">
                <span>{blip.name}</span>
                <span className="text-emerald-400 text-[9px]">ETA {blip.eta} • {blip.distance}</span>
              </div>
            </div>
          ))}

          {/* Central Voice / Audio Pulse Trigger Button */}
          <button
            onClick={handleVoiceToggle}
            className={`relative z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/90 shadow-lg text-slate-900 transition-all active:scale-95 ${
              isListening ? 'ring-4 ring-red-500/50 scale-110 bg-red-50 text-red-600' : 'hover:scale-105'
            }`}
            title="Voice SOS Assistant"
          >
            {isListening ? (
              <Mic className="h-6 w-6 text-red-600 animate-pulse" />
            ) : (
              <Mic className="h-6 w-6 text-slate-800" />
            )}
          </button>
        </div>
      </div>

      {/* ACTIVE BLIP DETAILS MODAL / TOAST */}
      {activeBlip && (
        <div className="relative z-20 w-full max-w-sm mx-auto mb-2 p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-lg flex items-center justify-between animate-fade-up">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-emerald-400">
              {activeBlip.type === 'tow' && <Truck className="h-4 w-4" />}
              {activeBlip.type === 'mechanic' && <Wrench className="h-4 w-4" />}
              {activeBlip.type === 'ambulance' && <Ambulance className="h-4 w-4 text-red-400" />}
              {activeBlip.type === 'police' && <Shield className="h-4 w-4 text-blue-400" />}
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 font-sora">{activeBlip.name}</div>
              <div className="text-[11px] text-emerald-900/80 font-medium">
                {activeBlip.distance} away • ETA {activeBlip.eta} • ⭐ {activeBlip.rating}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => triggerQuickSOS('towing')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 text-white text-[11px] font-bold shadow hover:bg-emerald-800 transition-colors"
            >
              Dispatch
            </button>
            <button
              onClick={() => setActiveBlip(null)}
              className="text-slate-400 hover:text-slate-700 text-xs px-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ACTION FOOTER: HOLD FOR SOS & CHECK IN */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-2">
        {/* Long Press SOS Button with Circular Progress Bar */}
        <div className="relative flex flex-col items-center">
          <button
            onMouseDown={() => setIsHolding(true)}
            onMouseUp={() => setIsHolding(false)}
            onTouchStart={() => setIsHolding(true)}
            onTouchEnd={() => setIsHolding(false)}
            className="relative flex flex-col items-center justify-center px-8 py-3 rounded-2xl transition-all active:scale-95 group"
          >
            {/* Circular / Line Progress Fill Indicator */}
            {isHolding && (
              <div
                className="absolute inset-0 bg-red-600/20 rounded-2xl border-2 border-red-500 animate-pulse transition-all"
                style={{ width: `${holdProgress}%` }}
              />
            )}
            <span className="text-base sm:text-lg font-black tracking-widest text-slate-950 font-sora uppercase">
              HOLD FOR SOS
            </span>
            {isHolding ? (
              <span className="text-[11px] font-bold text-red-600 animate-bounce mt-0.5">
                Hold tight... {holdProgress}%
              </span>
            ) : (
              <span className="text-[10px] font-medium text-emerald-950/60 mt-0.5">
                Hold for 1.5s to dispatch emergency unit
              </span>
            )}
          </button>
        </div>

        {/* CHECK IN BUTTON */}
        <button
          onClick={handleCheckIn}
          className="flex flex-col items-center text-xs font-extrabold text-slate-900 hover:text-emerald-950 transition-colors py-1 group"
        >
          <span className="tracking-widest font-sora uppercase text-[11px] flex items-center gap-1">
            {checkInDone ? (
              <span className="text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Checked In!
              </span>
            ) : (
              <>CHECK IN</>
            )}
          </span>
          <ChevronDown className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform text-emerald-950/70" />
        </button>

        {/* GPS Coordinates Telemetry */}
        <div className="text-[11px] font-mono font-medium text-emerald-950/70 tracking-wide">
          37.7749° N 122.39632° W
        </div>
      </div>
    </div>
  );
};

export default RadarSafetyScreen;
