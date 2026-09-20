import { useReveal } from '@/hooks/useReveal';
import { MapPin, Clock, ShieldCheck } from 'lucide-react';

const cities = [
  'Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune',
  'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Chandigarh',
  'Lucknow', 'Kochi', 'Indore', 'Surat', 'Nagpur',
  'NH-44 Corridor', 'Mumbai-Pune Expressway', 'Bangalore-Mysore Expressway',
  'Yamuna Expressway', 'Samruddhi Mahamarg'
];

export default function Coverage() {
  const { ref, shown } = useReveal();
  return (
    <section id="coverage" className="container-px py-16 sm:py-24">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
              Pan-India Network
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Coverage across major metros & national expressways
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              With 4,500+ verified partner garages, flatbeds, and mobile battery vans across India, RoadResQ ensures rapid dispatch whether you are in Koramangala or midway on NH-44.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Clock className="h-4 w-4 text-red-600" /> 24x7 Active Dispatch
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <MapPin className="h-4 w-4 text-blue-600" /> 28 States & Expressways
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Police 112 & NHAI 1033 Linked
              </div>
            </div>
          </div>

          {/* marquee of Indian cities */}
          <div
            ref={ref}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent" />
            <div className={`flex w-max gap-3 ${shown ? 'animate-marquee' : ''}`}>
              {[...cities, ...cities].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="flex items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
