import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Star, ChevronRight, Phone, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useRoadResQ } from '../context/RoadResQContext';
import TickerMarquee from './common/TickerMarquee';

export default function Hero() {
  const { setRole, triggerQuickSOS, t, language, setLanguage, languages } = useRoadResQ();

  return (
    <section className="min-h-[85dvh] bg-white flex flex-col items-center justify-center text-center relative overflow-hidden pb-16">
      {/* Signature Language & Status Ticker marquee strip */}
      <TickerMarquee />

      {/* BACKGROUND DECORATIVE ELEMENTS */}
      <span className="absolute top-16 left-6 font-[Sora] font-extrabold text-[120px] text-[hsl(var(--foreground)/0.03)] select-none pointer-events-none leading-none max-lg:hidden">
        ROADRESQ
      </span>
      <span className="absolute bottom-12 right-6 font-[Sora] font-extrabold text-[100px] text-[hsl(var(--foreground)/0.03)] select-none pointer-events-none leading-none max-lg:hidden">
        TELEMATICS
      </span>
      <span className="absolute top-1/2 right-8 -translate-y-1/2 font-[Sora] font-extrabold text-[80px] text-[hsl(var(--foreground)/0.02)] select-none pointer-events-none leading-none max-lg:hidden">
        DISPATCH
      </span>

      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, hsl(228 52% 22% / 0.04), transparent)',
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center pt-8 sm:pt-12">
        {/* Quick Indian Language Chips */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-1.5 mb-5 bg-slate-50 border border-[hsl(var(--border))] p-1.5 rounded-full shadow-sm"
        >
          <span className="text-[11px] font-bold text-[hsl(var(--muted-foreground))] px-2.5 py-1">
            भाषा / Language:
          </span>
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-3 py-1 text-xs rounded-full transition-all flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[hsl(var(--primary))] text-white font-bold shadow-sm'
                    : 'text-[hsl(var(--foreground))] hover:bg-slate-200/70 font-medium'
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.native}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Pre-heading */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-[Plus_Jakarta_Sans] font-semibold text-xs tracking-[0.35em] uppercase text-[hsl(var(--muted-foreground))] mb-4 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))] ring-2 ring-[hsl(var(--accent)/0.3)] animate-pulse" />
          ONLINE EMERGENCY VEHICLE BREAKDOWN RESPONSE · INDIA
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-[Sora] font-extrabold text-[38px] sm:text-[54px] lg:text-[64px] text-[hsl(var(--foreground))] leading-[1.15] max-w-4xl tracking-tight"
        >
          {t.tagline}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed max-w-2xl mt-5"
        >
          {t.subTagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-8 items-center"
        >
          <button
            onClick={() => setRole('hud')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-[Plus_Jakarta_Sans] font-bold text-base px-7 py-3.5 rounded-full hover:opacity-95 transition-all shadow-md active:scale-[0.98] flex items-center gap-2"
          >
            <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
            <span>Radar & SOS HUD</span>
          </button>

          <button
            onClick={() => setRole('user')}
            className="bg-[hsl(var(--primary))] text-white font-[Plus_Jakarta_Sans] font-medium text-base px-7 py-3.5 rounded-full hover:opacity-90 transition-all shadow-sm hover:shadow active:scale-[0.98] flex items-center gap-2"
          >
            <Zap className="h-4 w-4 text-[hsl(var(--accent))]" />
            <span>{t.requestHelp}</span>
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => triggerQuickSOS('flat_tyre')}
            className="bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-bold text-base px-7 py-3.5 rounded-full hover:opacity-95 transition-opacity shadow-sm active:scale-[0.98]"
          >
            {t.sos1Tap}
          </button>

          <a
            href="tel:112"
            className="text-[hsl(var(--primary))] font-[Plus_Jakarta_Sans] font-medium text-base px-5 py-3.5 hover:underline flex items-center gap-1.5"
          >
            <Phone className="h-4 w-4" /> {t.call112_1033} →
          </a>
        </motion.div>

        {/* Quick Highlights / Social Proof Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 w-full max-w-3xl border-t border-[hsl(var(--border))] pt-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[hsl(var(--muted-foreground))] font-medium">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" />
              <strong>4.9★ Trustpilot</strong> (18,400+ reviews)
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              4,500+ Verified Mechanics
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-blue-600" />
              Google Maps Live Telematics
            </span>
          </div>
        </motion.div>

        {/* Live Status Card Mini-preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 w-full max-w-xl bg-white rounded-2xl p-4 sm:p-5 border border-[hsl(var(--border))] shadow-sm text-left flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[hsl(var(--accent)/0.3)] flex items-center justify-center font-bold text-[hsl(var(--foreground))] text-sm">
              ₹
            </div>
            <div>
              <p className="font-[Sora] font-bold text-sm text-[hsl(var(--foreground))]">Transparent Upfront Pricing</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Flat tire ₹499 · Battery jump ₹649 · Towing ₹1,499</p>
            </div>
          </div>
          <span className="bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-bold text-xs px-3 py-1.5 rounded-full">
            UPI Accepted
          </span>
        </motion.div>
      </div>
    </section>
  );
}
