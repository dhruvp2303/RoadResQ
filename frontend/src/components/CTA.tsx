import React from 'react';
import { Phone, ChevronRight, Shield, ShieldAlert, Zap } from 'lucide-react';

interface CTAProps {
  onOpenSafety?: () => void;
  onRequestHelp?: () => void;
}

export default function CTA({ onOpenSafety, onRequestHelp }: CTAProps) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-8 sm:p-14 text-center">
          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--primary))] text-[hsl(var(--accent))] shadow-sm">
              <Shield className="h-7 w-7 text-[hsl(var(--accent))]" />
            </span>

            <h2 className="mt-6 font-[Sora] text-3xl sm:text-5xl font-extrabold text-[hsl(var(--foreground))] tracking-tight leading-tight">
              Don't wait stranded on the road.
            </h2>

            <p className="mt-4 font-[Plus_Jakarta_Sans] text-base sm:text-lg text-[hsl(var(--muted-foreground))] leading-relaxed">
              Save RoadResQ now. When you need us, one tap connects you to verified emergency dispatch with live Google Maps tracking and transparent UPI billing.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onRequestHelp}
                className="bg-[hsl(var(--primary))] text-white font-[Plus_Jakarta_Sans] font-bold text-base px-8 py-3.5 rounded-full hover:opacity-90 transition-all shadow-sm active:scale-[0.98] flex items-center gap-2"
              >
                <Zap className="h-4 w-4 text-[hsl(var(--accent))]" />
                <span>Request Assistance Now</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenSafety}
                className="bg-white border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-[Plus_Jakarta_Sans] font-bold text-base px-6 py-3.5 rounded-full hover:border-[hsl(var(--primary))] transition-all shadow-sm flex items-center gap-2"
              >
                <ShieldAlert className="h-4 w-4 text-red-600" />
                <span>Emergency 112 Safety Kit</span>
              </button>

              <a
                href="tel:1033"
                className="text-[hsl(var(--primary))] font-[Plus_Jakarta_Sans] font-medium text-base px-4 py-3.5 hover:underline flex items-center gap-1.5"
              >
                <Phone className="h-4 w-4" /> NHAI Helpline 1033 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
