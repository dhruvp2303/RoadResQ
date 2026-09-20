import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How fast does a mechanic or tow truck reach my location in India?',
    a: 'Our average arrival time in metro cities (Bengaluru, Mumbai, Delhi NCR, Pune, Hyderabad, Chennai) is 14 to 18 minutes. On major expressways (such as NH-44, Mumbai-Pune Expressway, or Bangalore-Mysore Expressway), response time averages 25 to 32 minutes from the nearest highway rescue outpost.',
  },
  {
    q: 'Do I need a prior subscription to request emergency roadside assistance?',
    a: 'No subscription is required. You can use RoadResQ on-demand with Pay-As-You-Go pricing whenever you encounter a breakdown. We also offer an optional Annual RoadSafe Shield for frequent highway drivers and commuters who want free towing and priority dispatch.',
  },
  {
    q: 'How does live Google Maps tracking work?',
    a: 'Once your request is assigned, you receive a real-time tracking screen integrated directly with Google Maps. You can watch your technician’s vehicle approach, view their exact ETA in minutes, verify their vehicle registration number, and call them directly via a masked phone link.',
  },
  {
    q: 'Are your technicians and towing operators certified & background-verified?',
    a: 'Yes. Every mechanic, flatbed operator, and recovery driver on RoadResQ undergoes strict physical verification, Aadhaar & police background checks, commercial driving license validation, and garage equipment inspection.',
  },
  {
    q: 'What payment modes are accepted? Can I pay via UPI or card?',
    a: 'We support all major Indian digital payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards, Net Banking, and Cash on completion. All charges include GST with an instant downloadable tax invoice for reimbursement or insurance claims.',
  },
  {
    q: 'What if I need emergency police or NHAI highway assistance?',
    a: 'RoadResQ includes an integrated emergency Safety Mode that connects you in 1 tap to National Emergency Response 112 or NHAI National Highway Helpline 1033. It also broadcasts an SOS SMS with your exact Google Maps GPS coordinates to your designated emergency contact.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[hsl(var(--muted))]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="font-[Sora] font-bold text-[40px] sm:text-[48px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight mb-12 tracking-tight text-center">
          Questions we get asked a lot.
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-[hsl(var(--border))] px-6 transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full text-left font-[Sora] font-bold text-base text-[hsl(var(--foreground))] py-5 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[hsl(var(--primary))]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--muted-foreground))] leading-relaxed pb-5 pt-1 border-t border-[hsl(var(--border))]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
