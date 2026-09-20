import React from 'react';

interface TickerMarqueeProps {
  items?: string[];
  className?: string;
}

const DEFAULT_TICKER_TEXT =
  "नमस्ते (Hindi) · ನಮಸ್ಕಾರ (Kannada) · வணக்கம் (Tamil) · నమస్కారం (Telugu) · नमस्कार (Marathi) · નમસ્તે (Gujarati) · নমস্কার (Bengali) · നമസ്കാരം (Malayalam) · ସତଶ୍ରୀଅକାଳ (Punjabi) · ନମସ୍କାର (Odia) · অসমীয়া (Assamese) · آداب (Urdu) · नमस्कार (Nepali) · नमो नमः (Sanskrit) · سلام (Kashmiri) · देव बरे करू (Konkani) · 24/7 Pan-India Emergency Roadside Assistance & Towing Network · Delhi NCR · Mumbai · Bengaluru · Chennai · Hyderabad · Kolkata · Ahmedabad · Pune · National Highway 44 & 48 · Emergency SOS 112 / 1033 · ";

export default function TickerMarquee({
  items,
  className = '',
}: TickerMarqueeProps) {
  const text = items ? items.join(' · ') + ' · ' : DEFAULT_TICKER_TEXT;

  return (
    <div
      className={`w-full overflow-hidden bg-[hsl(var(--accent))] py-3.5 border-y border-black/10 select-none shadow-xs ${className}`}
      aria-hidden="true"
    >
      <div className="ticker-track">
        {/* Continuous seamless infinite loop */}
        <span className="font-[Sora] font-bold text-sm sm:text-base text-[hsl(var(--foreground))] pr-8 whitespace-nowrap tracking-wide">
          {text.repeat(2)}
        </span>
        <span className="font-[Sora] font-bold text-sm sm:text-base text-[hsl(var(--foreground))] pr-8 whitespace-nowrap tracking-wide">
          {text.repeat(2)}
        </span>
      </div>
    </div>
  );
}
