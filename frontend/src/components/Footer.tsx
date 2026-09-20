import React from 'react';
import { Shield, Star, Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--foreground))] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[hsl(var(--accent))]">
                <Shield className="w-5 h-5 text-[hsl(var(--accent))]" />
              </div>
              <span className="font-[Sora] font-bold text-2xl text-white tracking-tight">
                ROADRESQ
              </span>
            </div>
            <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/60 leading-relaxed max-w-xs">
              When the road stops, help keeps moving. 24/7 intelligent breakdown response across Indian cities and national expressways.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Trustpilot badge */}
              <div className="bg-white/10 rounded-lg px-3 py-2 border border-white/10 flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
                <p className="font-[Plus_Jakarta_Sans] font-bold text-xs text-white">
                  4.9★ Trustpilot (18.4k+ Reviews)
                </p>
              </div>
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="font-[Sora] font-bold text-sm text-white mb-4 tracking-wide uppercase">
              Emergency Services
            </p>
            <ul className="space-y-2.5">
              {[
                'Battery Jump Start',
                'Flat Tyre & Puncture Fix',
                'Hydraulic Flatbed Towing',
                'On-Site Mechanical Repair',
                'Emergency Fuel & EV Boost',
                'Car Key Lockout Assistance',
                'Engine Overheating Help',
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#languages"
                    className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Network Hubs column */}
          <div>
            <p className="font-[Sora] font-bold text-sm text-white mb-4 tracking-wide uppercase">
              Coverage Hubs
            </p>
            <ul className="space-y-2.5">
              {[
                'Bengaluru & Karnataka Expressways',
                'Mumbai & MMR Corridor',
                'Delhi NCR & Yamuna Expressway',
                'Pune & Samruddhi Mahamarg',
                'Hyderabad Hi-Tech Zone',
                'Chennai & Outer Ring Road',
                'NH-44 Pan-India Highway Grid',
              ].map((city) => (
                <li key={city}>
                  <a
                    href="#coverage"
                    className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="font-[Sora] font-bold text-sm text-white mb-4 tracking-wide uppercase">
              Get In Touch
            </p>
            <ul className="space-y-2.5">
              <li className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/70 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>support@roadresq.in</span>
              </li>
              <li className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/70 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[hsl(var(--accent))]" />
                <span>1800-ROAD-RESQ (Toll Free)</span>
              </li>
              <li className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/70 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Police 112 · NHAI 1033</span>
              </li>
              <li className="font-[Plus_Jakarta_Sans] font-normal text-sm text-white/50 flex items-center gap-2 pt-1">
                <Clock className="w-4 h-4" />
                <span>24x7 Active Live Dispatch</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs text-white/40">
          <p className="font-[Plus_Jakarta_Sans] font-normal">
            © {new Date().getFullYear()} RoadResQ Technologies India Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-4 font-[Plus_Jakarta_Sans]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Insurance Claim T&C</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
