import React from 'react';

export default function Stats() {
  const stats = [
    { value: '14 min', label: 'Average Arrival Time', sub: 'Across Indian Metros & Expressways' },
    { value: '4,500+', label: 'Verified Partners', sub: 'Mechanics, mobile vans & flatbeds' },
    { value: '100%', label: 'Upfront INR Pricing', sub: 'Zero hidden fees or night surcharges' },
    { value: '4.9★', label: 'Trustpilot Rating', sub: '18,400+ verified customer reviews' },
  ];

  return (
    <section className="border-b border-[hsl(var(--border))] bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <div className="font-[Sora] text-2xl sm:text-4xl font-extrabold text-[hsl(var(--foreground))]">
                {s.value}
              </div>
              <div className="font-[Plus_Jakarta_Sans] text-xs sm:text-sm font-bold text-[hsl(var(--foreground))] mt-1">
                {s.label}
              </div>
              <div className="font-[Plus_Jakarta_Sans] text-[11px] sm:text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
