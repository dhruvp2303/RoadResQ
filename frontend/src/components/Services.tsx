import React from 'react';
import { motion } from 'framer-motion';
import {
  Fuel,
  BatteryCharging,
  Wrench,
  Disc,
  Truck,
  Thermometer,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useRoadResQ } from '@/context/RoadResQContext';

const services = [
  {
    icon: Disc,
    title: 'Flat Tyre & Puncture Fix',
    levels: 'Cars · SUVs · 2-Wheelers',
    availability: '320 mobile units active',
    price: '₹350',
    popular: true,
    desc: 'On-site tubeless puncture patch, stepney tyre replacement, or air pressure inflation anywhere on the road within 15 minutes.',
  },
  {
    icon: BatteryCharging,
    title: 'Battery Jump Start',
    levels: '12V / 24V Systems · EV 12V Aux',
    availability: '240 mobile vans active',
    price: '₹450',
    popular: true,
    desc: 'Heavy-duty booster cables, instant jumpstart, battery health diagnostics, or on-spot battery replacement with GST warranty.',
  },
  {
    icon: Truck,
    title: 'Hydraulic Flatbed Towing',
    levels: 'Zero-damage · Local & Interstate',
    availability: '180 flatbeds active',
    price: '₹1,200',
    popular: true,
    desc: 'Safe hydraulic flatbed or underlift towing to your preferred showroom or certified service center with live GPS route telematics.',
  },
  {
    icon: Wrench,
    title: 'On-Site Mechanical Repair',
    levels: 'Brakes · Clutch · Alternator · Fuses',
    availability: '150 master mechanics',
    price: '₹650',
    popular: false,
    desc: 'Certified master technicians equipped with diagnostic OBD scanners and essential spares to fix mechanical faults right on the spot.',
  },
  {
    icon: Fuel,
    title: 'Emergency Fuel & EV Boost',
    levels: 'Petrol · Diesel · Portable EV Charger',
    availability: '90 quick response riders',
    price: '₹400',
    popular: false,
    desc: '5 Litres of sealed fuel delivered to your stalled location or portable Level-2 fast charging for stranded Electric Vehicles.',
  },
  {
    icon: Lock,
    title: 'Car Key Lockout Assistance',
    levels: 'Keyless · Smart Fob · Manual Locks',
    availability: '80 locksmith specialists',
    price: '₹550',
    popular: false,
    desc: 'Non-destructive vehicle entry using specialized precision tools without scratching paint or damaging weather-stripping.',
  },
  {
    icon: Thermometer,
    title: 'Engine Overheating Relief',
    levels: 'Coolant Flush · Radiator · Belts',
    availability: '110 response vans',
    price: '₹499',
    popular: false,
    desc: 'Safe highway temperature cooldown, radiator leak inspection, coolant top-up, and fan motor troubleshooting.',
  },
  {
    icon: ShieldCheck,
    title: 'Pre-Highway Safety Check',
    levels: '21-Point Inspection at Home',
    availability: 'Book on demand',
    price: '₹499',
    popular: false,
    desc: 'Complete inspection of brakes, fluid levels, tire tread depth, suspension, and battery health before long road trips.',
  },
];

export default function Services() {
  const { setRole } = useRoadResQ();

  return (
    <section id="languages" className="py-24 bg-[hsl(var(--muted))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-[Sora] font-bold text-[40px] sm:text-[52px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight mb-4 tracking-tight"
        >
          Comprehensive breakdown services. Zero gimmicks.
        </motion.h2>
        <p className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] mb-14 max-w-2xl leading-relaxed">
          All our emergency roadside partners are vetted, certified mechanics with commercial insurance and verified equipment.
        </p>

        {/* 3-column / 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {item.popular && (
                  <span className="absolute top-3.5 right-3.5 bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full">
                    Most Requested
                  </span>
                )}

                <div>
                  <div className="h-12 w-12 rounded-xl bg-[hsl(var(--muted))] border border-[hsl(var(--border))] flex items-center justify-center text-[hsl(var(--foreground))] mb-4">
                    <Icon className="h-6 w-6 text-[hsl(var(--foreground))]" />
                  </div>

                  <h3 className="font-[Sora] font-bold text-[20px] text-[hsl(var(--foreground))] mb-1">
                    {item.title}
                  </h3>

                  <p className="font-[Plus_Jakarta_Sans] font-semibold text-xs text-[hsl(var(--muted-foreground))] mb-3">
                    {item.levels} · {item.availability}
                  </p>

                  <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[hsl(var(--border))] flex items-center justify-between">
                  <div className="font-[Sora] font-extrabold text-base text-[hsl(var(--primary))]">
                    From {item.price}
                  </div>
                  <button
                    onClick={() => setRole('user')}
                    className="font-[Plus_Jakarta_Sans] font-bold text-sm text-[hsl(var(--primary))] hover:underline"
                  >
                    Request pro →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
