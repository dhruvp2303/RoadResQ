import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    text: "I've tried calling local towing numbers and roadside insurance helplines in the past — you're stuck on hold for 40 minutes while stranded in the rain. RoadResQ was completely different. I tapped once on my phone, saw the mechanic's live route on Google Maps, and had my puncture fixed in under 18 minutes on Outer Ring Road, Bengaluru. Genuinely stress-free.",
    name: "Ananya Sharma",
    detail: "Tata Nexon EV owner · Electronic City, Bengaluru",
    stars: 5,
  },
  {
    text: "Rajesh from RoadResQ is an outstanding technician. Arrived with high-grade jumper cables and a digital load tester at 11 PM on the Mumbai-Pune Expressway when our battery died. Upfront INR pricing on the screen meant zero uncomfortable bargaining. Paid instantly via UPI QR code.",
    name: "Vikramaditya Kulkarni",
    detail: "Road tripper · Mumbai-Pune Expressway",
    stars: 5,
  },
  {
    text: "We enrolled our entire logistics delivery fleet — 28 vehicles — under the RoadResQ Corporate Plan. When our driver had a radiator blowout near Gurgaon on NH-48, the telemetry alert notified our operations desk immediately, and a flatbed reached him in 22 minutes with an automated GST invoice generated.",
    name: "Siddharth Malhotra",
    detail: "Fleet Operations Director · 28 Vehicles",
    stars: 5,
  },
  {
    text: "Locked my keys inside my SUV at a highway fuel pump near Krishnagiri. The locksmith arrived in 20 minutes, used gentle non-destructive inflatable wedges, and got me back inside in under 3 minutes without a single scratch on the door frame. Exceptional service.",
    name: "Pooja Hegde",
    detail: "Mahindra XUV700 driver · NH-44 Corridor",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-white border-b border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading with star rating */}
        <div className="text-center mb-14">
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
              />
            ))}
          </div>
          <h2 className="font-[Sora] font-bold text-[40px] sm:text-[48px] max-md:text-[34px] text-[hsl(var(--foreground))] leading-tight tracking-tight">
            4.9★ on Trustpilot & Google Reviews.
          </h2>
          <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--muted-foreground))] mt-2">
            Based on 18,400+ verified breakdown rescues across India
          </p>
        </div>

        {/* 2×2 grid desktop, 1-col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[hsl(var(--muted))] rounded-2xl p-8 border border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.stars)].map((_, s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-[hsl(var(--accent))] text-[hsl(var(--accent))]"
                    />
                  ))}
                </div>
                <p className="font-[Plus_Jakarta_Sans] font-normal text-sm text-[hsl(var(--foreground))] leading-relaxed mb-5">
                  "{review.text}"
                </p>
              </div>

              <div className="border-t border-[hsl(var(--border))] pt-4">
                <p className="font-[Plus_Jakarta_Sans] font-bold text-sm text-[hsl(var(--foreground))]">
                  {review.name}
                </p>
                <p className="font-[Plus_Jakarta_Sans] font-normal text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
                  {review.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
