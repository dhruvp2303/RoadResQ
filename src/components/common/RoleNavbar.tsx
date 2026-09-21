import React, { useState, useEffect, useRef } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { Role } from '../../types';
import { IndianLanguage, INDIAN_LANGUAGES } from '../../data/translations';
import {
  Car,
  Wrench,
  Activity,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  Zap,
  Shield,
  Menu,
  Globe,
  Check,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Bookmark,
  Sparkles,
} from 'lucide-react';

export const RoleNavbar: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    languages,
    t,
    activeIncident,
    notifications,
    markNotificationsAsRead,
    setSafetyModeOpen,
    setVehicleManagerOpen,
    currentUser,
  } = useRoadResQ();

  const [scrolled, setScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langSearch, setLangSearch] = useState('');
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const currentLangObj =
    INDIAN_LANGUAGES.find((l) => l.code === language) || INDIAN_LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleChange = (newRole: Role) => {
    setRole(newRole);
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (langCode: IndianLanguage) => {
    setLanguage(langCode);
    setShowLangMenu(false);
    setLangSearch('');
  };

  const filteredLanguages = INDIAN_LANGUAGES.filter(
    (l) =>
      l.label.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.native.toLowerCase().includes(langSearch.toLowerCase()) ||
      l.region.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <nav
      className={`sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-slate-200/80 ${
        scrolled ? 'shadow-md py-1' : 'shadow-sm py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[82px] flex items-center justify-between gap-4">
        {/* LOGO (left) with refined spacing */}
        <div
          onClick={() => handleRoleChange('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--accent))] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
            <Shield className="h-6 w-6 text-[hsl(var(--accent))]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-[Sora] font-extrabold text-[22px] sm:text-[24px] text-[hsl(var(--foreground))] tracking-tight">
                ROADRESQ
              </span>
              <span className="bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-extrabold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                India 🇮🇳
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 hidden sm:block -mt-0.5 tracking-tight">
              24/7 National Emergency Dispatch
            </span>
          </div>
        </div>

        {/* NAVIGATION PILLS (center) with increased gap & typography */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/70 shadow-inner">
          <button
            onClick={() => handleRoleChange('landing')}
            className={`font-[Plus_Jakarta_Sans] px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
              role === 'landing'
                ? 'bg-white text-[hsl(var(--primary))] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            {t.home || 'Home'}
          </button>
          <button
            onClick={() => handleRoleChange('user')}
            className={`font-[Plus_Jakarta_Sans] px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
              role === 'user'
                ? 'bg-white text-[hsl(var(--primary))] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Car className="h-4 w-4 text-blue-600" />
            <span>{t.driverPortal || 'Driver Portal'}</span>
            {activeIncident && (
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>
          <button
            onClick={() => handleRoleChange('provider')}
            className={`font-[Plus_Jakarta_Sans] px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
              role === 'provider'
                ? 'bg-white text-[hsl(var(--primary))] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Wrench className="h-4 w-4 text-amber-600" />
            <span>{t.mechanicHub || 'Mechanic Hub'}</span>
          </button>
          <button
            onClick={() => handleRoleChange('hud')}
            className={`font-[Plus_Jakarta_Sans] px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
              role === 'hud'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm'
                : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50'
            }`}
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Radar & SOS HUD</span>
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`font-[Plus_Jakarta_Sans] px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
              role === 'admin'
                ? 'bg-white text-[hsl(var(--primary))] shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Activity className="h-4 w-4 text-emerald-600" />
            <span>{t.telematicsAdmin || 'Telematics Admin'}</span>
          </button>
        </div>

        {/* CTA & RIGHT ACTIONS with generous spacing */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {/* SEARCHABLE & SCROLLABLE INDIAN LANGUAGE DROPDOWN */}
          <div className="relative" ref={langDropdownRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 rounded-full border border-slate-300 bg-white hover:bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm transition-all duration-200 hover:border-slate-400"
              title="Change Language / भाषा बदलें (All Indian Currency Note Languages)"
            >
              <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="font-extrabold text-[13px] text-slate-900 font-sora">
                {currentLangObj.native}
              </span>
              <span className="text-[11px] text-slate-500 hidden md:inline font-normal">
                ({currentLangObj.label})
              </span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${
                  showLangMenu ? 'rotate-180 text-[hsl(var(--primary))]' : ''
                }`}
              />
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl z-50 animate-fade-up">
                {/* Header info */}
                <div className="px-3 pt-2 pb-2.5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 font-sora flex items-center gap-1.5">
                      <span>🇮🇳 Indian Languages</span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Currency Note & Official
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Select your preferred regional language
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLangMenu(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Search input for quick language lookup */}
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={langSearch}
                      onChange={(e) => setLangSearch(e.target.value)}
                      placeholder="Search (e.g. Hindi, Tamil, বাংলা, தமிழ்)..."
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] text-slate-800 font-medium"
                    />
                    {langSearch && (
                      <button
                        onClick={() => setLangSearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Scrollable Language List */}
                <div className="max-h-80 overflow-y-auto pr-1 space-y-1 my-1 divide-y divide-slate-50">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => handleLanguageChange(l.code)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all duration-150 ${
                          language === l.code
                            ? 'bg-blue-50 text-[hsl(var(--primary))] font-bold border border-blue-200'
                            : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{l.flag}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-extrabold text-slate-900">
                                {l.native}
                              </span>
                              <span className="text-xs text-slate-500 font-medium">
                                ({l.label})
                              </span>
                              {l.notePanel && (
                                <span className="bg-slate-100 text-slate-600 text-[9px] px-1.5 py-0.2 rounded font-semibold border border-slate-200">
                                  ₹ Note
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[200px]">
                              {l.region}
                            </div>
                          </div>
                        </div>
                        {language === l.code && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white">
                            <Check className="h-3.5 w-3.5 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-500">
                      No language found matching "{langSearch}"
                    </div>
                  )}
                </div>

                {/* Footer note */}
                <div className="pt-2 px-3 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Pan-India 22 Scheduled Languages Support</span>
                  <span className="font-semibold text-slate-600">RoadResQ</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick SOS Trigger Button (Right) */}
          <button
            onClick={() => handleRoleChange('user')}
            className="flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 shrink-0"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span className="tracking-wide uppercase font-sora">
              {t.sos1Tap || '1-Tap SOS'}
            </span>
          </button>

          {/* Safety Kit Modal Launcher */}
          <button
            onClick={() => setSafetyModeOpen(true)}
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-amber-50 hover:border-amber-400 text-amber-600 transition-all shadow-sm"
            title="Safety Kit & Emergency Helplines (112 / 1033)"
          >
            <Shield className="h-4 w-4" />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsAsRead();
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm transition-all"
              title="Notifications"
            >
              <Bell className="h-4 w-4 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-80 sm:w-96 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl z-50 animate-fade-up">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 font-sora">
                    Emergency Telematics Alerts
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 flex items-start gap-3">
                      <div
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          n.type === 'emergency'
                            ? 'bg-red-100 text-red-600'
                            : n.type === 'success'
                            ? 'bg-emerald-100 text-emerald-600'
                            : 'bg-blue-100 text-blue-600'
                        }`}
                      >
                        {n.type === 'emergency' ? (
                          <AlertTriangle className="h-3.5 w-3.5" />
                        ) : n.type === 'success' ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Info className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-slate-900">
                          {n.title}
                        </div>
                        <div className="text-[11px] text-slate-600 mt-0.5">
                          {n.message}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {n.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE EXPANDED MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-3 animate-fade-down shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleRoleChange('landing')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold ${
                role === 'landing'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {t.home || 'Home'}
            </button>
            <button
              onClick={() => handleRoleChange('hud')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold ${
                role === 'hud'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Radar & SOS HUD</span>
            </button>
            <button
              onClick={() => handleRoleChange('user')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold ${
                role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Car className="h-4 w-4" />
              <span>{t.driverPortal || 'Driver Portal'}</span>
            </button>
            <button
              onClick={() => handleRoleChange('provider')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold ${
                role === 'provider'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Wrench className="h-4 w-4" />
              <span>{t.mechanicHub || 'Mechanic Hub'}</span>
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl text-xs font-bold ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Activity className="h-4 w-4" />
              <span>{t.telematicsAdmin || 'Admin Command'}</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={() => {
                setSafetyModeOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-xl"
            >
              <Shield className="h-4 w-4 text-amber-600" />
              <span>Safety Kit (112 / 1033)</span>
            </button>
            <button
              onClick={() => {
                setVehicleManagerOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-3 py-2 rounded-xl"
            >
              <Car className="h-4 w-4 text-blue-600" />
              <span>Garage ({currentUser.savedVehicles.length})</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default RoleNavbar;
