import React, { useMemo, useState } from 'react';
import {
  Truck,
  BatteryCharging,
  Fuel,
  Disc,
  Lock,
  Wrench,
  MapPin,
  Phone,
  User,
  CheckCircle2,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useRoadResQ } from '../context/RoadResQContext';
import { BreakdownType } from '../types';

type ServiceKey = 'tow' | 'jump' | 'fuel' | 'tire' | 'lock' | 'repair';

const serviceOptions: {
  key: ServiceKey;
  type: BreakdownType;
  label: string;
  icon: typeof Truck;
  eta: string;
  price: string;
}[] = [
  { key: 'tire', type: 'flat_tyre', label: 'Flat Tire', icon: Disc, eta: '15 min', price: '₹350' },
  { key: 'jump', type: 'dead_battery', label: 'Jump Start', icon: BatteryCharging, eta: '12 min', price: '₹450' },
  { key: 'fuel', type: 'out_of_fuel', label: 'Fuel / EV Boost', icon: Fuel, eta: '18 min', price: '₹400' },
  { key: 'repair', type: 'mechanical', label: 'On-site Repair', icon: Wrench, eta: '20 min', price: '₹650' },
  { key: 'lock', type: 'lockout', label: 'Key Lockout', icon: Lock, eta: '20 min', price: '₹550' },
  { key: 'tow', type: 'towing', label: 'Flatbed Tow', icon: Truck, eta: '25 min', price: '₹1,200' },
];

export default function RequestHelp() {
  const { createEmergencyIncident, currentUser, setRole } = useRoadResQ();
  const [service, setService] = useState<ServiceKey>('tire');
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone);
  const [location, setLocation] = useState('100 Feet Rd, Koramangala 5th Block, Bengaluru');

  const selected = useMemo(
    () => serviceOptions.find((s) => s.key === service)!,
    [service]
  );

  const valid = name.trim() && phone.trim().length >= 7 && location.trim();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    createEmergencyIncident(
      selected.type,
      currentUser.savedVehicles[0],
      { lat: 12.9352, lng: 77.6245, address: location },
      'medium',
      'Landing quick dispatch request'
    );
    setRole('user');
  };

  return (
    <section id="request" className="py-24 bg-white border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          {/* Left copy */}
          <div className="lg:sticky lg:top-28">
            <span className="bg-[hsl(var(--accent)/0.3)] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-bold text-xs tracking-wider uppercase px-3 py-1 rounded-full">
              Quick Dispatch
            </span>
            <h2 className="font-[Sora] font-bold text-[36px] sm:text-[48px] text-[hsl(var(--foreground))] leading-tight mt-4 tracking-tight">
              Get an emergency pro rolling your way.
            </h2>
            <p className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] mt-4 leading-relaxed max-w-md">
              Pick your breakdown issue, confirm your spot, and we dispatch the closest certified technician. Live Google Maps routing with upfront pricing.
            </p>
            <ul className="mt-8 space-y-3.5 text-sm font-medium text-[hsl(var(--foreground))]">
              {[
                'Transparent flat-rate INR pricing upfront',
                'Live GPS tracking of your technician on Google Maps',
                'Fast UPI (GPay, PhonePe, Paytm) or card payment',
                'Instant digital GST invoice for vehicle insurance',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Interactive card */}
          <div className="bg-[hsl(var(--muted))] rounded-3xl border border-[hsl(var(--border))] p-6 sm:p-8 shadow-sm">
            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2.5 block font-[Sora] font-bold text-sm text-[hsl(var(--foreground))]">
                  What assistance do you need?
                </label>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {serviceOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = service === opt.key;
                    return (
                      <button
                        type="button"
                        key={opt.key}
                        onClick={() => setService(opt.key)}
                        className={`group flex flex-col items-start gap-1.5 rounded-2xl border p-3.5 text-left transition-all ${
                          active
                            ? 'border-[hsl(var(--primary))] bg-white shadow-sm ring-2 ring-[hsl(var(--accent))]'
                            : 'border-[hsl(var(--border))] bg-white/70 hover:bg-white text-[hsl(var(--foreground))]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <Icon
                            className={`h-5 w-5 ${
                              active ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--muted-foreground))]'
                            }`}
                          />
                          <span className="font-[Sora] font-bold text-xs text-[hsl(var(--foreground))]">
                            {opt.price}
                          </span>
                        </div>
                        <span className="font-[Plus_Jakarta_Sans] font-bold text-xs mt-1">
                          {opt.label}
                        </span>
                        <span className="text-[11px] text-[hsl(var(--muted-foreground))]">
                          ETA ~{opt.eta}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <Field icon={User} label="Your Name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rohan Sharma"
                  className="w-full bg-transparent text-sm font-medium text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none"
                />
              </Field>

              <Field icon={Phone} label="Mobile Phone">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="+91 98765 43210"
                  className="w-full bg-transparent text-sm font-medium text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none"
                />
              </Field>

              <Field icon={MapPin} label="Breakdown Location">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="100 Feet Rd, Koramangala 5th Block, Bengaluru"
                  className="w-full bg-transparent text-sm font-medium text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none"
                />
              </Field>

              <div className="flex items-center justify-between rounded-2xl border border-[hsl(var(--border))] bg-white px-4 py-3 text-sm">
                <span className="font-[Plus_Jakarta_Sans] text-[hsl(var(--muted-foreground))] font-medium">
                  Estimated Arrival & Fare
                </span>
                <span className="font-[Sora] font-bold text-[hsl(var(--foreground))] flex items-center gap-2">
                  <span className="text-base text-[hsl(var(--primary))]">{selected.price}</span>
                  <span className="text-xs font-normal text-[hsl(var(--muted-foreground))]">
                    • ~{selected.eta}
                  </span>
                </span>
              </div>

              <button
                type="submit"
                disabled={!valid}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--primary))] px-6 py-4 text-base font-bold text-white shadow hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                <Zap className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span>Dispatch Nearest Pro Live</span>
                <ChevronRight className="h-4 w-4" />
              </button>
              <p className="text-center font-[Plus_Jakarta_Sans] text-xs text-[hsl(var(--muted-foreground))]">
                No upfront charges. Pay seamlessly after inspection via UPI, card, or cash.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-[Plus_Jakarta_Sans] text-xs font-bold text-[hsl(var(--foreground))] uppercase tracking-wider">
        {label}
      </span>
      <span className="flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-white px-3.5 py-3 transition-colors focus-within:border-[hsl(var(--primary))] focus-within:ring-2 focus-within:ring-[hsl(var(--accent)/0.3)]">
        <Icon className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))]" />
        {children}
      </span>
    </label>
  );
}
