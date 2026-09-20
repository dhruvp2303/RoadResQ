import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { LeafletMap } from '../common/LeafletMap';
import {
  Activity,
  Shield,
  Truck,
  Clock,
  Flame,
  ArrowUpRight,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { incidents, providers, activeIncident, declineJob } = useRoadResQ();
  const [searchTerm, setSearchTerm] = useState('');

  // Recharts Data for Indian Breakdown Mix
  const breakdownCategoryData = [
    { name: 'Flat Tyre / Puncture', value: 42, color: '#f97316' },
    { name: 'Dead Battery', value: 28, color: '#eab308' },
    { name: 'Towing', value: 16, color: '#dc2626' },
    { name: 'Engine Overheating', value: 14, color: '#f43f5e' },
    { name: 'Mechanical', value: 12, color: '#a855f7' },
    { name: 'Out of Fuel / EV', value: 8, color: '#2563eb' },
  ];

  const hourlyVolumeData = [
    { hour: '06:00', requests: 8, avgEta: 11 },
    { hour: '09:00', requests: 28, avgEta: 15 },
    { hour: '12:00', requests: 19, avgEta: 12 },
    { hour: '15:00', requests: 24, avgEta: 13 },
    { hour: '18:00', requests: 38, avgEta: 17 },
    { hour: '21:00', requests: 22, avgEta: 10 },
  ];

  const allIncidentsList = incidents;
  const filteredIncidents = allIncidentsList.filter(
    (i) =>
      i.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.breakdownType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-px py-6 space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 font-mono">
              Central Command Center · India Telematics
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Global Roadside Operations & Fleet Telematics
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-mono text-slate-700 shadow-sm">
            System SLA: <strong className="text-emerald-700">99.8% On-Time</strong>
          </span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Active Incidents</span>
            <Flame className="h-4 w-4 text-red-600 animate-pulse" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {activeIncident ? '1 Active' : '0 Pending'}
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
            <ArrowUpRight className="h-3.5 w-3.5" /> 100% matched under 35s
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Avg Response SLA</span>
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-blue-700 mt-2">
            10.8 min
          </div>
          <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-semibold">
            <span>-3.2 min faster than Indian benchmark</span>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Online Fleet Units</span>
            <Truck className="h-4 w-4 text-amber-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {providers.filter((p) => p.isOnline).length} / {providers.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Hydraulic flatbeds, vans & quick-response bikes
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Customer CSAT</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">
            4.95 ★
          </div>
          <div className="text-[11px] text-slate-500 mt-1">From 3,420 verified user ratings</div>
        </div>
      </div>

      {/* Global Live Incident & Fleet Map */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-red-600" />
            <span className="font-bold text-sm text-slate-900">Live Regional Dispatch Telematics Map (Google Maps Enabled)</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600"></span> Emergency Incidents
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-600"></span> Active Standby Fleet
            </span>
          </div>
        </div>

        <LeafletMap
          standbyProviders={providers}
          allIncidents={allIncidentsList}
          assignedProvider={activeIncident?.provider}
          userLocation={activeIncident?.location}
          providerRoute={activeIncident?.providerRoute}
          showAllFleet={true}
          className="h-96 w-full"
        />
      </div>

      {/* Analytics Charts Grid (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Breakdown Distribution */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-slate-900">Breakdown Distribution by Category</h3>
            <span className="text-xs text-slate-500">Real-time breakdown mix</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={breakdownCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {breakdownCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Hourly Dispatch Volume & ETA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-slate-900">24h Dispatch Volume & Arrival Speed</h3>
            <span className="text-xs text-slate-500">Peak commute demand & SLA times</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyVolumeData}>
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Bar dataKey="requests" name="Incident Volume" fill="#dc2626" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avgEta" name="Avg Arrival (min)" fill="#2563eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Incidents Management Table */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900">Live Incident Dispatch Logs</h3>
            <p className="text-xs text-slate-500">Real-time breakdown alerts, auto-escalations & supervisor overrides</p>
          </div>

          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by ID, driver, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-slate-50 border border-slate-200 pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">ID / Driver</th>
                <th className="py-3 px-3">Vehicle</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Location (India)</th>
                <th className="py-3 px-3">Assigned Pro</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-mono font-bold text-slate-900">{inc.id}</div>
                    <div className="text-[11px] text-slate-500">{inc.userName}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-900">
                      {inc.vehicle.year} {inc.vehicle.make} {inc.vehicle.model}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">{inc.vehicle.plate}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="capitalize font-medium text-slate-900">{inc.breakdownType}</span>
                  </td>
                  <td className="py-3 px-3 max-w-xs truncate text-slate-600">{inc.location.address}</td>
                  <td className="py-3 px-3">
                    {inc.provider ? (
                      <div>
                        <div className="font-bold text-slate-900">{inc.provider.name}</div>
                        <div className="text-[10px] text-blue-600">{inc.provider.vehicleType}</div>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        inc.status === 'CLOSED'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : inc.status === 'EN_ROUTE'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {inc.status !== 'CLOSED' && (
                      <button
                        onClick={() => {
                          if (inc.providerId) {
                            declineJob(inc.providerId, inc.id, 'manual_override');
                          }
                        }}
                        className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-[11px] font-semibold"
                      >
                        Escalate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
