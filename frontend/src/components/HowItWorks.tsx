import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: '📍',
    title: 'Select issue & auto-pin location',
    description: 'A 10-second request captures your exact GPS location via Google Maps, vehicle model, and breakdown category. No phone trees, no waiting on hold.',
    time: 'Under 15 seconds',
  },
  {
    number: '02',
    icon: '⚡',
    title: 'Smart match with nearest verified pro',
    description: 'Our dispatch algorithm assigns the closest certified mechanic or flatbed truck with transparent upfront pricing and guaranteed flat rates.',
    time: 'Matched within 60s',
  },
  {
    number: '03',
    icon: '🗺️',
    title: 'Track live approach on Google Maps',
    description: 'Watch your mechanic navigate to you in real-time with continuous live GPS updates, vehicle registration number, and direct phone link.',
    time: 'Avg. 15 min arrival',
  },
  {
    number: '04',
    icon: '💳',
    title: 'On-spot fix & seamless UPI payment',
    description: 'Job completed and verified with safety OTP. Pay easily via UPI (GPay/PhonePe) or card, and receive an instant GST invoice for insurance.',
    time: 'Instant GST invoice',
  },
];

export default function HowItWorks() {
  return (
    <section id="courses" className="py-24 bg-white border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="font-[Sora] font-bold text-[40px] sm:text-[52px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight mb-4 text-center tracking-tight">
          Assistance that fits your emergency.
        </h2>
        <p className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] mb-16 max-w-xl mx-auto text-center leading-relaxed">
          No confusion, no unfair bargaining on the road. Just structured, trackable roadside emergency response built around your safety.
        </p>

        {/* 4-col desktop grid, 2-col tablet, 1-col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-[hsl(var(--border))] bg-white hover:border-[hsl(var(--accent))] hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="font-[Sora] font-extrabold text-[56px] leading-none text-[hsl(var(--accent)/0.5)] mb-3">
                  {step.number}
                </div>
                <div className="text-3xl mb-3">{step.icon}</div>
                <h3 className="font-[Sora] font-bold text-lg text-[hsl(var(--foreground))] mb-3">
                  {step.title}
                </h3>
                <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[hsl(var(--border))]">
                <span className="font-[Plus_Jakarta_Sans] font-semibold text-xs text-[hsl(var(--foreground))] bg-[hsl(var(--accent)/0.3)] px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                  {step.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
