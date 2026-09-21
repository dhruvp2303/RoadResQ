import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import RadarSafetyScreen from './RadarSafetyScreen';
import EmergencyGridScreen from './EmergencyGridScreen';
import {
  Smartphone,
  LayoutGrid,
  Radio,
  Monitor,
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ModernEmergencyHUD: React.FC = () => {
  const { setRole, triggerQuickSOS, t } = useRoadResQ();

  // Mode: 'studio' (Dual-phone reference match), 'radar' (Screen 1 only), 'grid' (Screen 2 only), 'expanded' (Full web app command center)
  const [viewMode, setViewMode] = useState<'studio' | 'radar' | 'grid' | 'expanded'>('studio');
  const [activeMobileScreen, setActiveMobileScreen] = useState<'radar' | 'grid'>('radar');

  return (
    <div className="relative min-h-screen w-full bg-[#cfd2d6] flex flex-col items-center justify-start overflow-x-hidden font-sans text-slate-900 pb-16">
      {/* TOP FLOATING CONTROLLER TOOLBAR */}
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 text-white px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRole('landing')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portal</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 font-sora">
              RoadResQ Safety HUD Studio
            </span>
          </div>
        </div>

        {/* VIEW MODE SWITCHER PILLS */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-1 rounded-full border border-slate-700">
          <button
            onClick={() => setViewMode('studio')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'studio'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Dual Phone Studio</span>
            <span className="md:hidden">Studio</span>
          </button>

          <button
            onClick={() => {
              setViewMode('radar');
              setActiveMobileScreen('radar');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'radar'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Radar HUD</span>
          </button>

          <button
            onClick={() => {
              setViewMode('grid');
              setActiveMobileScreen('grid');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>16-SOS Grid</span>
          </button>

          <button
            onClick={() => setViewMode('expanded')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              viewMode === 'expanded'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Web Command Center</span>
            <span className="sm:hidden">Web</span>
          </button>
        </div>
      </header>

      {/* VIEWPORT CANVAS */}
      <main className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12">
        {/* MODE 1: STUDIO DUAL-PHONE SHOWCASE (EXACT MATCH OF REFERENCE IMAGE) */}
        {viewMode === 'studio' && (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* Header Description */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/10 border border-slate-900/20 text-slate-800 text-xs font-extrabold uppercase tracking-widest mb-2 font-sora">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                <span>Ultra-Modern Safety UI Architecture</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-sora tracking-tight">
                Emergency Radar & 16-Tile SOS HUD
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-1 font-medium">
                Live interactive prototype directly ported into RoadResQ. Interact with the Radar scanner, blip telemetry, address selector, and 3-second SOS countdown.
              </p>
            </div>

            {/* DUAL PHONE DISPLAY FRAME CONTAINER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center justify-center w-full max-w-4xl">
              {/* PHONE 1: RADAR & SAFETY CORRIDOR SCREEN */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-800 transition-all hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]">
                  {/* Phone Bezel Top Speaker / Dynamic Island Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40" />

                  {/* Inner Screen Surface */}
                  <div className="relative w-full h-full rounded-[42px] overflow-hidden">
                    <RadarSafetyScreen
                      onSlideToGrid={() => setViewMode('grid')}
                      onExit={() => setRole('landing')}
                    />
                  </div>

                  {/* Bottom Home Indicator Bar */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full z-40" />
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-3 font-sora uppercase tracking-wider">
                  Screen 1: Telematics Radar & Safety Index
                </span>
              </div>

              {/* PHONE 2: EMERGENCY CATEGORIES & 3S DISPATCH */}
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-800 transition-all hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]">
                  {/* Phone Bezel Top Speaker / Dynamic Island Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40" />

                  {/* Inner Screen Surface */}
                  <div className="relative w-full h-full rounded-[42px] overflow-hidden">
                    <EmergencyGridScreen
                      onCancel={() => setViewMode('radar')}
                      onSendSOS={() => setRole('user')}
                    />
                  </div>

                  {/* Bottom Home Indicator Bar */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full z-40" />
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-3 font-sora uppercase tracking-wider">
                  Screen 2: 16-Category Matrix & 3-Second SOS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: SINGLE RADAR SCREEN */}
        {viewMode === 'radar' && (
          <div className="w-full max-w-[400px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-2xl ring-1 ring-slate-800">
            <div className="relative w-full h-full rounded-[42px] overflow-hidden">
              <RadarSafetyScreen
                onSlideToGrid={() => setViewMode('grid')}
                onExit={() => setRole('landing')}
                standalone
              />
            </div>
          </div>
        )}

        {/* MODE 3: SINGLE GRID SCREEN */}
        {viewMode === 'grid' && (
          <div className="w-full max-w-[400px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-2xl ring-1 ring-slate-800">
            <div className="relative w-full h-full rounded-[42px] overflow-hidden">
              <EmergencyGridScreen
                onCancel={() => setViewMode('radar')}
                onSendSOS={() => setRole('user')}
                standalone
              />
            </div>
          </div>
        )}

        {/* MODE 4: FULL EXPANDED WIDESCREEN WEB APP COMMAND CENTER */}
        {viewMode === 'expanded' && (
          <div className="w-full max-w-6xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-300 animate-fade-up">
            <div className="flex flex-col lg:flex-row items-center justify-between pb-6 mb-6 border-b border-slate-200 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Pan-India Live Command Center
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sora mt-1">
                  RoadResQ Integrated Safety & Rapid Dispatch HUD
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Real-time radar telemetry, automated 3-second SOS triage, and emergency dispatch integration.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRole('user')}
                  className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Open Driver Portal
                </button>
                <button
                  onClick={() => setRole('admin')}
                  className="px-5 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Open Admin Dispatch
                </button>
              </div>
            </div>

            {/* SPLIT SCREEN DESKTOP LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Radar Scanner Container (5 cols) */}
              <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-[680px]">
                <RadarSafetyScreen
                  onSlideToGrid={() => setViewMode('grid')}
                  onExit={() => setRole('landing')}
                />
              </div>

              {/* Right Column: 16 Emergency Categories & Instant Dispatch (7 cols) */}
              <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate-200 h-[680px]">
                <EmergencyGridScreen
                  onCancel={() => setViewMode('radar')}
                  onSendSOS={() => setRole('user')}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModernEmergencyHUD;
