import React from 'react';
import { Check } from 'lucide-react';
import { useRoadResQ } from '../context/RoadResQContext';

const plans = [
  {
    name: 'Pay As You Go (On-Demand)',
    tag: null,
    price: 'From ₹350',
    period: '/ service',
    description: 'Maximum flexibility. Pay only when you experience a breakdown with guaranteed flat rates.',
    features: [
      'Puncture & flat tyre from ₹350',
      'Battery jump start from ₹450',
      'Hydraulic towing from ₹1,200',
      'Live Google Maps telematics tracking',
      'Pay via UPI (GPay/PhonePe) or card',
      'Instant GST invoice for insurance claim',
    ],
    cta: 'Request on demand',
    highlight: false,
  },
  {
    name: 'Annual RoadSafe Shield',
    tag: 'BEST VALUE',
    price: '₹1,499',
    period: '/ year',
    description: 'Complete 365-day roadside peace of mind across all national highways and city roads in India.',
    features: [
      '3 × Free emergency towing up to 50 km',
      'Unlimited free battery jump starts',
      '2 × Free emergency fuel deliveries (fuel cost extra)',
      'Free 21-point pre-highway inspection at home',
      'Priority 10-minute dispatch routing',
      '24/7 Concierge helpline & ambulance escort link',
      'Covers up to 2 family vehicles',
    ],
    cta: 'Activate Annual Shield',
    highlight: true,
  },
  {
    name: 'Corporate Fleet Pro',
    tag: 'For logistics & fleets',
    price: 'Custom',
    period: 'fleet pricing',
    description: 'For transport fleets, corporate cabs, and EV operators needing SLA-backed breakdown response.',
    features: [
      'Centralized admin billing & GST input tax credit',
      'Dedicated operations dispatch manager',
      'Real-time fleet breakdown telemetry dashboard',
      'Multi-vehicle driver onboarding & tracking',
      'Custom roadside SLA (15 min city / 30 min highway)',
      'Quarterly vehicle health & incident analytics',
    ],
    cta: 'Contact Fleet Sales →',
    highlight: false,
  },
];

export default function PricingPlans() {
  const { setRole } = useRoadResQ();

  return (
    <section id="pricing" className="py-24 bg-[hsl(var(--muted))] border-t border-b border-[hsl(var(--border))]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h2 className="font-[Sora] font-bold text-[40px] sm:text-[48px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight mb-4 tracking-tight">
          Simple, transparent pricing.
        </h2>
        <p className="font-[Plus_Jakarta_Sans] font-normal text-base sm:text-lg text-[hsl(var(--muted-foreground))] mb-16 max-w-md mx-auto leading-relaxed">
          No hidden fees, no surge extortion in rain or night. Transparent rates upfront.
        </p>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? 'bg-[hsl(var(--primary))] border-[hsl(var(--primary))] text-white shadow-xl scale-[1.02]'
                  : 'bg-white border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] hover:shadow-md'
              }`}
            >
              <div>
                {plan.tag && (
                  <span
                    className={`inline-block self-start font-[Plus_Jakarta_Sans] font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${
                      plan.highlight
                        ? 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))]'
                        : 'bg-[hsl(var(--accent)/0.3)] text-[hsl(var(--foreground))]'
                    }`}
                  >
                    {plan.tag}
                  </span>
                )}
                <h3
                  className={`font-[Sora] font-bold text-2xl mb-1 ${
                    plan.highlight ? 'text-white' : 'text-[hsl(var(--foreground))]'
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 my-4">
                  <span
                    className={`font-[Sora] font-extrabold text-4xl sm:text-5xl ${
                      plan.highlight ? 'text-white' : 'text-[hsl(var(--primary))]'
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`font-[Plus_Jakarta_Sans] font-normal text-sm ${
                      plan.highlight ? 'text-white/70' : 'text-[hsl(var(--muted-foreground))]'
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <p
                  className={`font-[Plus_Jakarta_Sans] font-normal text-sm leading-relaxed mb-6 ${
                    plan.highlight ? 'text-white/80' : 'text-[hsl(var(--muted-foreground))]'
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.highlight
                            ? 'text-[hsl(var(--accent))]'
                            : 'text-[hsl(var(--primary))]'
                        }`}
                      />
                      <span
                        className={`font-[Plus_Jakarta_Sans] font-normal text-sm ${
                          plan.highlight
                            ? 'text-white/90'
                            : 'text-[hsl(var(--muted-foreground))]'
                        }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setRole('user')}
                className={`w-full py-3.5 rounded-full font-[Plus_Jakarta_Sans] font-bold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] ${
                  plan.highlight
                    ? 'bg-[hsl(var(--accent))] text-[hsl(var(--foreground))] shadow-md'
                    : 'bg-[hsl(var(--primary))] text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
