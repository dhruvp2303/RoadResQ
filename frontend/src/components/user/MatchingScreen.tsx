import React from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import {
  ShieldCheck,
  Star,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { BREAKDOWN_CATEGORIES } from '../../data/mockData';

export const MatchingScreen: React.FC = () => {
  const { activeIncident, matchedCandidates, isMatchingActive, selectMatchedProvider } = useRoadResQ();

  if (!activeIncident) return null;

  const categoryInfo = BREAKDOWN_CATEGORIES.find((c) => c.type === activeIncident.breakdownType);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-up">
      {/* Radar Scanner Center Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center space-y-4">
        {/* Animated Radar Visual */}
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-red-300 animate-ping opacity-60"></div>
          <div className="absolute inset-2 rounded-full border border-red-400/50 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full border-2 border-red-500/80"></div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-md">
            <Flame className="h-6 w-6 animate-pulse" />
          </div>
        </div>

        <div>
          <span className="font-mono text-xs font-bold text-red-700 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full border border-red-200">
            {activeIncident.id}
          </span>
          <h2 className="font-display text-2xl font-extrabold text-slate-900 mt-2">
            {isMatchingActive ? 'Finding the Right Roadside Assistance...' : 'Top Verified Technicians Dispatched'}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Analyzing technician capabilities, proximity, vehicle compatibility, and arrival times.
          </p>
        </div>

        {/* Live Step Progression */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Problem: {categoryInfo?.label || activeIncident.breakdownType}</span>
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
            <span>Vehicle: {activeIncident.vehicle.make} {activeIncident.vehicle.model}</span>
          </span>

          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <Clock className="h-3.5 w-3.5 text-amber-600" />
            <span>SLA: &lt; 15 mins</span>
          </span>
        </div>
      </div>

      {/* Ranked Candidate Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ranked Smart Matches in Your Area (India)
          </h3>
          <span className="text-xs text-emerald-700 font-mono font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {matchedCandidates.length} Units Available Now
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchedCandidates.map((pro) => {
            const isAssigned = activeIncident.providerId === pro.id;
            return (
              <div
                key={pro.id}
                className={`relative rounded-3xl p-5 border transition-all duration-200 ${
                  isAssigned
                    ? 'bg-red-50/50 border-red-500 ring-2 ring-red-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Match Score Badge */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={pro.avatar}
                        alt={pro.name}
                        className="w-13 h-13 rounded-2xl object-cover border-2 border-red-500"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-slate-900">{pro.name}</h4>
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="text-xs text-blue-600 font-medium">{pro.vehicleType}</div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <span className="flex items-center text-amber-600 font-bold">
                          <Star className="h-3 w-3 fill-amber-500 mr-1" />
                          {pro.rating}
                        </span>
                        <span>•</span>
                        <span>{pro.jobsCompleted} dispatches</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[11px] font-mono font-bold">
                      <Sparkles className="h-3 w-3 text-emerald-600" />
                      {pro.compatibilityScore || 98}% Match
                    </span>
                    <div className="text-xs font-bold text-slate-900 mt-1">
                      {pro.estimatedArrivalMin || 8} min arrival
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{pro.distanceKm || 1.4} km away</div>
                  </div>
                </div>

                {/* Capability Tag Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-3 border-t border-slate-100">
                  {pro.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-700 font-medium capitalize"
                    >
                      {skill.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                {/* Status or Direct Selection Button */}
                <div className="pt-3 mt-2 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-mono">
                    Plate: <strong className="text-slate-800">{pro.vehiclePlate}</strong>
                  </div>

                  {isAssigned ? (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                      <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                      <span>Dispatched & Awaiting Confirmation</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => selectMatchedProvider(pro.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-xs font-bold text-slate-700 transition-all shadow-sm"
                    >
                      <span>Request Pro</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchingScreen;
