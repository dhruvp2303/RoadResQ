import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { Incident } from '../../types';
import { BREAKDOWN_CATEGORIES } from '../../data/mockData';
import {
  History,
  Receipt,
  Car,
  Calendar,
  Download,
  Star,
  X,
  MapPin,
  Flame,
} from 'lucide-react';

export const IncidentHistoryView: React.FC = () => {
  const { incidents } = useRoadResQ();
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const pastIncidents = incidents.filter((i) => i.status === 'CLOSED');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <History className="h-6 w-6 text-red-600" />
            <span>Assistance History & Invoices</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View completed roadside dispatches, official GST receipts, and warranty proof.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-mono text-slate-700 font-bold">
          {pastIncidents.length} Completed Records
        </span>
      </div>

      <div className="space-y-3">
        {pastIncidents.map((incident) => {
          const category = BREAKDOWN_CATEGORIES.find((c) => c.type === incident.breakdownType);
          const dateStr = new Date(incident.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          return (
            <div
              key={incident.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-slate-300 shadow-sm transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-200">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">
                        {category?.label || incident.breakdownType}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] font-mono text-slate-700 border border-slate-200 font-bold">
                        {incident.id}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {dateStr}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Car className="h-3 w-3 text-blue-600" /> {incident.vehicle.make} {incident.vehicle.model}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Total Paid</div>
                    <div className="font-mono text-sm font-bold text-emerald-700">
                      ₹{incident.invoice?.total.toFixed(2) || '518.00'}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedIncident(incident)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 transition-all shadow-sm"
                  >
                    <Receipt className="h-3.5 w-3.5 text-blue-600" />
                    <span>View Receipt</span>
                  </button>
                </div>
              </div>

              {/* Location & Feedback summary */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <div className="text-slate-600 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate max-w-sm">{incident.location.address}</span>
                </div>

                {incident.rating && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center text-amber-600 font-bold">
                      <Star className="h-3.5 w-3.5 fill-amber-500 mr-1" />
                      {incident.rating} / 5
                    </span>
                    {incident.review && (
                      <span className="text-slate-600 italic truncate max-w-xs">"{incident.review}"</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Downloadable Receipt Preview Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-up">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-emerald-600" />
                <span className="font-display font-bold text-sm">Official Tax Invoice & Receipt</span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Incident Reference:</span>
                <span className="font-mono text-slate-900 font-bold">{selectedIncident.id}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Service Type:</span>
                <span className="text-slate-900 capitalize font-medium">{selectedIncident.breakdownType}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Assisted Vehicle:</span>
                <span className="text-slate-900 font-medium">
                  {selectedIncident.vehicle.make} {selectedIncident.vehicle.model} ({selectedIncident.vehicle.plate})
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Assigned Pro:</span>
                <span className="text-slate-900 font-medium">{selectedIncident.provider?.name || 'Rajesh Kumar'}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Status:</span>
                <span className="text-emerald-700 font-bold uppercase">PAID IN FULL</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Dispatch & Travel</span>
                <span className="font-mono">₹{selectedIncident.invoice?.baseFee.toFixed(2) || '350.00'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Technician Labor & Diagnosis</span>
                <span className="font-mono">₹{selectedIncident.invoice?.labourFee.toFixed(2) || '150.00'}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                <span>Total Amount Paid</span>
                <span className="font-mono text-emerald-700 text-sm">
                  ₹{selectedIncident.invoice?.total.toFixed(2) || '518.00'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Tax invoice downloaded successfully to your device.');
                setSelectedIncident(null);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <Download className="h-4 w-4" />
              <span>Download PDF Invoice</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentHistoryView;
