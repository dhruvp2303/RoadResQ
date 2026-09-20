import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { useRoadResQ } from '../context/RoadResQContext';

const technicians = [
  {
    name: 'Rajesh Kumar',
    languages: 'Hindi (Native) · English (Fluent) · Kannada',
    credentials: 'Certified Master Mechanic · 12 years experience · Bosch Diagnostics certified',
    reviews: 99,
    reviewCount: 428,
    quote: "When a driver is stuck on the highway with their family, every minute feels like an hour. I carry specialized diagnostic scanners, battery testers, and essential spares to solve the breakdown right there without needing a tow whenever possible.",
    specialisms: ['Engine Diagnostics', 'Battery & Electricals', 'Brake Systems'],
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=250',
  },
  {
    name: 'Anand Varma',
    languages: 'Tamil · English · Telugu · Hindi',
    credentials: 'Heavy Recovery & Flatbed Specialist · 10 years experience · NHAI Incident Responder',
    reviews: 98,
    reviewCount: 312,
    quote: "Zero-damage loading is an art. Whether it is an electric luxury sedan or an SUV with stuck gears, our hydraulic flatbed trailers ensure safe recovery without touching the bumper or underbody. Safety is always priority one.",
    specialisms: ['Zero-Damage Flatbed', 'EV Recovery', 'Expressway Clearance'],
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
  },
  {
    name: 'Meera Deshmukh',
    languages: 'Marathi · Hindi · English',
    credentials: 'Automotive Electrical Engineer · Ex-Tata Motors R&D · EV High-Voltage Certified',
    reviews: 99,
    reviewCount: 265,
    quote: "Modern cars are computers on wheels. Most roadside breakdowns are sensor glitches, dead 12V auxiliary units, or alternator shorts. With real-time ECU OBD scanning, we identify the exact root cause in five minutes.",
    specialisms: ['EV High Voltage', 'OBD ECU Scanning', 'Alternator & Fuses'],
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  },
];

export default function Technicians() {
  const { setRole } = useRoadResQ();

  return (
    <section id="teachers" className="py-24 bg-[hsl(var(--muted))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="font-[Sora] font-bold text-[40px] sm:text-[48px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight mb-4 tracking-tight">
          Meet our verified emergency responders.
        </h2>
        <p className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] mb-14 max-w-xl">
          Every technician on RoadResQ undergoes background checks, skill certifications, and tool calibrations before receiving live dispatches.
        </p>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {technicians.map((pro, i) => (
            <motion.div
              key={pro.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-[hsl(var(--border))] flex flex-col justify-between hover:border-[hsl(var(--accent))] hover:shadow-md transition-all"
            >
              <div>
                {/* Avatar portrait */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-[hsl(var(--accent))] p-0.5 shrink-0">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-[Sora] font-bold text-xl text-[hsl(var(--foreground))]">
                      {pro.name}
                    </h3>
                    <p className="font-[Plus_Jakarta_Sans] font-medium text-xs text-[hsl(var(--muted-foreground))]">
                      {pro.languages}
                    </p>
                  </div>
                </div>

                <p className="font-[Plus_Jakarta_Sans] font-normal text-xs text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>{pro.credentials}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 bg-[hsl(var(--muted))] p-2 rounded-xl">
                  <div className="flex">
                    {[...Array(5)].map((_, s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                      />
                    ))}
                  </div>
                  <span className="font-[Plus_Jakarta_Sans] font-bold text-xs text-[hsl(var(--foreground))]">
                    {pro.reviews}% positive
                  </span>
                  <span className="font-[Plus_Jakarta_Sans] font-normal text-xs text-[hsl(var(--muted-foreground))]">
                    ({pro.reviewCount} jobs)
                  </span>
                </div>

                {/* Quote */}
                <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--muted-foreground))] leading-relaxed italic mb-5">
                  "{pro.quote}"
                </p>
              </div>

              <div>
                {/* Specialisms */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pro.specialisms.map((s) => (
                    <span
                      key={s}
                      className="bg-[hsl(var(--muted))] font-[Plus_Jakarta_Sans] font-semibold text-[11px] text-[hsl(var(--foreground))] px-3 py-1 rounded-full border border-[hsl(var(--border))]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setRole('user')}
                  className="w-full border border-[hsl(var(--primary))] text-[hsl(var(--primary))] font-[Plus_Jakarta_Sans] font-bold text-sm py-2.5 rounded-full hover:bg-[hsl(var(--primary))] hover:text-white transition-colors"
                >
                  Request Dispatch & View Units
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <p className="text-center mt-12">
          <button
            onClick={() => setRole('user')}
            className="font-[Plus_Jakarta_Sans] font-bold text-base text-[hsl(var(--primary))] hover:underline"
          >
            Explore all 4,500+ verified partner network garages across India →
          </button>
        </p>
      </div>
    </section>
  );
}
