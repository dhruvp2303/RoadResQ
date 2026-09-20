import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { BreakdownType, SeverityLevel, LocationCoords } from '../../types';
import { BREAKDOWN_CATEGORIES } from '../../data/mockData';
import {
  Disc,
  Zap,
  Fuel,
  Truck,
  Wrench,
  Thermometer,
  HelpCircle,
  Car,
  MapPin,
  AlertOctagon,
  Flame,
  ArrowRight,
  ShieldCheck,
  Clock,
  Plus,
  Navigation,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const EmergencyRequestFlow: React.FC = () => {
  const { currentUser, createEmergencyIncident, setVehicleManagerOpen, t } = useRoadResQ();

  const [selectedCategory, setSelectedCategory] = useState<BreakdownType>('dead_battery');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(currentUser.savedVehicles[0]?.id || '');
  const [severity, setSeverity] = useState<SeverityLevel>('medium');
  const [location, setLocation] = useState<LocationCoords>({
    lat: 12.9352,
    lng: 77.6245,
    address: '80ft Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034',
    landmark: 'Near Sony World Signal',
    accuracy: 3,
  });
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'detecting' | 'detected' | 'denied'>('detected');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Icon mapper helper
  const getCategoryIcon = (type: BreakdownType) => {
    switch (type) {
      case 'dead_battery':
        return <Zap className="h-6 w-6 text-amber-600" />;
      case 'flat_tyre':
        return <Disc className="h-6 w-6 text-orange-600" />;
      case 'out_of_fuel':
        return <Fuel className="h-6 w-6 text-blue-600" />;
      case 'overheating':
        return <Thermometer className="h-6 w-6 text-rose-600" />;
      case 'mechanical':
        return <Wrench className="h-6 w-6 text-purple-600" />;
      case 'towing':
        return <Truck className="h-6 w-6 text-red-600" />;
      case 'dont_know':
        return <HelpCircle className="h-6 w-6 text-slate-600" />;
      default:
        return <Wrench className="h-6 w-6" />;
    }
  };

  const selectedVehicle =
    currentUser.savedVehicles.find((v) => v.id === selectedVehicleId) || currentUser.savedVehicles[0];

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      setLocationStatus('detecting');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E (GPS Fixed)`,
            landmark: 'Auto-detected GPS coordinates in India',
            accuracy: Math.round(pos.coords.accuracy) || 3,
          });
          setIsLocating(false);
          setLocationStatus('detected');
        },
        (err) => {
          console.warn('GPS permission / fallback', err);
          setIsLocating(false);
          setLocationStatus('denied');
        },
        { timeout: 8000 }
      );
    } else {
      setLocationStatus('denied');
    }
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    setIsSubmitting(true);
    setTimeout(() => {
      createEmergencyIncident(selectedCategory, selectedVehicle, location, severity, notes);
      setIsSubmitting(false);
    }, 400);
  };

  const activeCategoryInfo = BREAKDOWN_CATEGORIES.find((c) => c.type === selectedCategory);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Banner / Title Card */}
      <div className="rounded-3xl border border-red-200 bg-gradient-to-r from-red-50 via-white to-amber-50 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-700 font-mono">
                24/7 Roadside Assistance · India
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              {t.appName}
            </h1>
            <p className="text-xs text-slate-600">
              {t.subTagline}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl p-3.5 shrink-0 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-slate-900">Target Arrival &lt; 15 min</div>
              <div className="text-[11px] text-emerald-700 font-semibold">100% Certified Network</div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleRequestSubmit} className="space-y-6">
        {/* STEP 1: Breakdown Category Selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  1
                </span>
                <span>{t.whatHappened}</span>
              </h2>
              <p className="text-xs text-slate-500">{t.whatHappenedDesc}</p>
            </div>

            {activeCategoryInfo && (
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-blue-600" /> {activeCategoryInfo.typicalEta}
                </span>
                <span className="flex items-center gap-1 font-bold text-emerald-700">
                  From ₹{activeCategoryInfo.baseEstimate}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {BREAKDOWN_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.type;
              const translated = t.categories?.[cat.type];
              const displayLabel = translated?.label || cat.label;
              const displayDesc = translated?.desc || cat.description;

              return (
                <div
                  key={cat.type}
                  onClick={() => setSelectedCategory(cat.type)}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? `bg-red-50/70 border-red-500 ring-2 ring-red-500 shadow-sm`
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-2.5 rounded-xl ${
                        isSelected ? 'bg-white shadow-sm' : 'bg-white border border-slate-200'
                      }`}
                    >
                      {getCategoryIcon(cat.type)}
                    </div>
                    {isSelected && (
                      <span className="flex h-2.5 w-2.5 rounded-full bg-red-600" />
                    )}
                  </div>
                  <div className="mt-3">
                    <div className="font-bold text-sm text-slate-900">{displayLabel}</div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{displayDesc}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">ETA: {cat.typicalEta}</span>
                    <span className="font-bold text-emerald-700 font-mono">₹{cat.baseEstimate} est.</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Location Verification */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                2
              </span>
              <span>{t.confirmLocation}</span>
            </h2>
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 transition-all shadow-sm"
            >
              <Navigation className={`h-3.5 w-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? t.detectingGps : t.useCurrentGps}</span>
            </button>
          </div>

          {/* Location status badge */}
          {locationStatus === 'detected' && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                <strong>GPS Location Fixed:</strong> High accuracy lock (±{location.accuracy || 3}m) in India.
              </span>
            </div>
          )}

          {locationStatus === 'denied' && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>
                Location permission disabled or unavailable. Please enter your street address / landmark manually below.
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-red-600" />
                <span>Street / Highway Address</span>
              </label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation({ ...location, address: e.target.value })}
                required
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Nearby Landmark / Highway KM Stone (e.g. Near Silk Board Flyover, NH44)"
                value={location.landmark || ''}
                onChange={(e) => setLocation({ ...location, landmark: e.target.value })}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <AlertOctagon className="h-3.5 w-3.5 text-amber-600" />
                <span>Roadside Hazard Severity</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSeverity('low')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    severity === 'low'
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs">Safe Parking</div>
                  <div className="text-[10px] text-slate-500">Society / Fuel Pump</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeverity('medium')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    severity === 'medium'
                      ? 'bg-amber-50 border-amber-400 text-amber-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs">Roadside Curb</div>
                  <div className="text-[10px] text-slate-500">City Road Lane</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSeverity('critical')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    severity === 'critical'
                      ? 'bg-red-50 border-red-500 text-red-800 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs">Highway Hazard</div>
                  <div className="text-[10px] text-red-600">Flyover / Expressway</div>
                </button>
              </div>

              <input
                type="text"
                placeholder="Additional notes for technician (e.g. front left tyre flat, smoke from hood)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* STEP 3: Vehicle Selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                3
              </span>
              <span>{t.selectVehicle}</span>
            </h2>
            <button
              type="button"
              onClick={() => setVehicleManagerOpen(true)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" /> Manage Garage
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {currentUser.savedVehicles.map((veh) => {
              const isSelected = selectedVehicleId === veh.id;
              return (
                <div
                  key={veh.id}
                  onClick={() => setSelectedVehicleId(veh.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500 text-slate-900'
                      : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Car className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      {veh.plate}
                    </span>
                  </div>
                  <div className="mt-2 font-bold text-xs text-slate-900">
                    {veh.year} {veh.make} {veh.model}
                  </div>
                  <div className="text-[11px] text-slate-500 capitalize mt-0.5">
                    {veh.color} • {veh.fuelType || veh.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500">
            RoadResQ AI matches verified mechanics and towing cranes based on compatibility and ETA.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 rounded-full bg-red-600 hover:bg-red-700 px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-sm hover:shadow active:scale-95 transition-all disabled:opacity-50"
          >
            <Flame className="h-5 w-5 animate-pulse" />
            <span>{isSubmitting ? 'Searching Units...' : t.dispatchProNow}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyRequestFlow;
