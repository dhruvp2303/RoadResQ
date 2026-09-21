import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import RadarSafetyScreen from '../hud/RadarSafetyScreen';
import EmergencyGridScreen from '../hud/EmergencyGridScreen';
import ActiveTrackingHUD from './ActiveTrackingHUD';
import ProviderDashboard from '../provider/ProviderDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import {
  Radio,
  LayoutGrid,
  Navigation,
  Wrench,
  Activity,
  Shield,
  Car,
  Globe,
  ChevronDown,
  Sparkles,
  PhoneCall,
  Bell,
  Smartphone,
  Monitor,
  Menu,
  X,
} from 'lucide-react';
import { INDIAN_LANGUAGES, IndianLanguage } from '../../data/translations';

export const RoadResQWebApp: React.FC = () => {
  const {
    role,
    setRole,
    activeIncident,
    setSafetyModeOpen,
    setVehicleManagerOpen,
    currentUser,
    language,
    setLanguage,
    t,
  } = useRoadResQ();

  // Screen Tab in the SOS view: 'radar' (Screen 1) | 'grid' (Screen 2) | 'tracking' (Live Map) | 'provider' | 'admin'
  const [appScreen, setAppScreen] = useState<'radar' | 'grid' | 'tracking' | 'provider' | 'admin'>('radar');
  const [desktopLayout, setDesktopLayout] = useState<'studio' | 'focus' | 'split'>('studio');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const currentLangObj = INDIAN_LANGUAGES.find((l) => l.code === language) || INDIAN_LANGUAGES[0];

  // Auto-switch to tracking when an incident is active
  React.useEffect(() => {
    if (activeIncident && (activeIncident.status === 'ASSIGNED' || activeIncident.status === 'EN_ROUTE')) {
      setAppScreen('tracking');
    }
  }, [activeIncident?.id, activeIncident?.status]);

  return (
    <div className="relative min-h-screen w-full bg-[#d2d5d9] flex flex-col items-center justify-start overflow-x-hidden font-sans text-slate-900 pb-20 select-none">
      {/* TOP FLOATING APP BAR */}
      <header className="sticky top-0 left-0 right-0 z-50 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 text-white px-4 sm:px-8 py-3 flex items-center justify-between gap-4 shadow-xl">
        {/* LOGO & BRAND */}
        <div
          onClick={() => setAppScreen('radar')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 shadow-md group-hover:scale-105 transition-transform">
            <Shield className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-sora font-extrabold text-lg sm:text-xl tracking-tight text-white">
                ROADRESQ
              </span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
                Live App 🇮🇳
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-400 hidden sm:block -mt-0.5">
              Emergency Dispatch & Telematics
            </span>
          </div>
        </div>

        {/* PRIMARY APP SCREEN SWITCHER PILLS (Center) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800 shadow-inner">
          <button
            onClick={() => setAppScreen('radar')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              appScreen === 'radar'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Radio className="h-3.5 w-3.5" />
            <span>Radar HUD</span>
          </button>

          <button
            onClick={() => setAppScreen('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              appScreen === 'grid'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>16-SOS Matrix</span>
          </button>

          <button
            onClick={() => setAppScreen('tracking')}
            className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              appScreen === 'tracking'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Navigation className="h-3.5 w-3.5" />
            <span>Live Tracking</span>
            {activeIncident && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setAppScreen('provider')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              appScreen === 'provider'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Wrench className="h-3.5 w-3.5" />
            <span>Mechanic Hub</span>
          </button>

          <button
            onClick={() => setAppScreen('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              appScreen === 'admin'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Admin Fleet</span>
          </button>
        </div>

        {/* RIGHT UTILITIES: LANGUAGE, GARAGE & SAFETY KIT */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              <span>{currentLangObj.native}</span>
              <ChevronDown className="h-3 w-3 text-slate-400" />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 p-2 shadow-2xl z-50 max-h-64 overflow-y-auto space-y-1">
                {INDIAN_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                      language === l.code
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{l.native}</span>
                    <span className="text-[10px] opacity-70">({l.label})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Garage Vehicle Manager */}
          <button
            onClick={() => setVehicleManagerOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Car className="h-3.5 w-3.5 text-blue-400" />
            <span>Garage ({currentUser.savedVehicles.length})</span>
          </button>

          {/* Safety Kit Button */}
          <button
            onClick={() => setSafetyModeOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-600/90 hover:bg-red-600 text-xs font-black text-white shadow-md transition-all active:scale-95 font-sora"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">112 / 1033 SOS</span>
            <span className="sm:hidden">112</span>
          </button>
        </div>
      </header>

      {/* MAIN APP WORKSPACE CONTAINER */}
      <main className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 lg:p-10">
        {/* DESKTOP STUDIO DUAL-PHONE VIEW (When on Radar/Grid and in Studio layout on larger screens) */}
        {(appScreen === 'radar' || appScreen === 'grid') && desktopLayout === 'studio' && (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            {/* Studio Header */}
            <div className="text-center mb-6 hidden lg:block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/10 border border-slate-900/20 text-slate-800 text-xs font-extrabold uppercase tracking-widest mb-1.5 font-sora">
                <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                <span>RoadResQ Emergency Architecture</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 font-sora tracking-tight">
                Live Telematics Radar & 16-Tile Emergency Dispatch HUD
              </h1>
            </div>

            {/* DUAL PHONE CONTAINER (SIDE-BY-SIDE ON DESKTOP, SINGLE ON MOBILE) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center justify-center w-full max-w-4xl">
              {/* PHONE 1: RADAR & SAFETY INDEX */}
              <div
                className={`flex flex-col items-center ${
                  appScreen === 'grid' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-800">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40" />
                  <div className="relative w-full h-full rounded-[42px] overflow-hidden">
                    <RadarSafetyScreen
                      onSlideToGrid={() => setAppScreen('grid')}
                      onExit={() => setAppScreen('grid')}
                    />
                  </div>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full z-40" />
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-3 font-sora uppercase tracking-wider hidden lg:block">
                  Screen 1: Live Radar & Safety Index HUD
                </span>
              </div>

              {/* PHONE 2: 16-CATEGORY MATRIX & 3-SECOND SOS */}
              <div
                className={`flex flex-col items-center ${
                  appScreen === 'radar' ? 'hidden lg:flex' : 'flex'
                }`}
              >
                <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[740px] rounded-[52px] bg-black p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-800">
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40" />
                  <div className="relative w-full h-full rounded-[42px] overflow-hidden">
                    <EmergencyGridScreen
                      onCancel={() => setAppScreen('radar')}
                      onSendSOS={() => setAppScreen('tracking')}
                    />
                  </div>
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/60 rounded-full z-40" />
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-3 font-sora uppercase tracking-wider hidden lg:block">
                  Screen 2: 16-Category Matrix & 3-Second SOS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: LIVE TRACKING HUD */}
        {appScreen === 'tracking' && (
          <div className="w-full max-w-[400px] sm:max-w-[420px] h-[750px] rounded-[52px] bg-black p-3.5 shadow-2xl ring-1 ring-slate-800">
            <div className="relative w-full h-full rounded-[42px] overflow-hidden">
              <ActiveTrackingHUD onBackToSOS={() => setAppScreen('grid')} />
            </div>
          </div>
        )}

        {/* VIEW: MECHANIC / PROVIDER DASHBOARD */}
        {appScreen === 'provider' && (
          <div className="w-full max-w-6xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-300 animate-fade-up">
            <ProviderDashboard />
          </div>
        )}

        {/* VIEW: FLEET ADMIN COMMAND */}
        {appScreen === 'admin' && (
          <div className="w-full max-w-6xl bg-white rounded-3xl p-6 shadow-2xl border border-slate-300 animate-fade-up">
            <AdminDashboard />
          </div>
        )}
      </main>

      {/* FLOATING FROSTED GLASS BOTTOM APP DOCK (Mobile & Desktop Quick Actions) */}
      <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-slate-950/90 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
        <button
          onClick={() => setAppScreen('radar')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            appScreen === 'radar'
              ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Radio className="h-4 w-4" />
          <span>Radar</span>
        </button>

        <button
          onClick={() => setAppScreen('grid')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            appScreen === 'grid'
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
          <span>16-SOS</span>
        </button>

        <button
          onClick={() => setAppScreen('tracking')}
          className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
            appScreen === 'tracking'
              ? 'bg-blue-600 text-white shadow-md scale-105'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Navigation className="h-4 w-4" />
          <span>Tracking</span>
          {activeIncident && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 animate-ping" />
          )}
        </button>

        <button
          onClick={() => setSafetyModeOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 text-white font-extrabold text-xs shadow-md hover:bg-red-700 transition-colors"
        >
          <Shield className="h-4 w-4" />
          <span>112 Kit</span>
        </button>
      </footer>
    </div>
  );
};

export default RoadResQWebApp;
