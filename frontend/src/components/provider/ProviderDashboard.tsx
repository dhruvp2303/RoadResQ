import React, { useState, useEffect } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { LeafletMap } from '../common/LeafletMap';
import { BREAKDOWN_CATEGORIES } from '../../data/mockData';
import {
  Power,
  Star,
  CheckCircle2,
  Navigation,
  MapPin,
  Car,
  Shield,
  Phone,
  Trash2,
  Receipt,
} from 'lucide-react';

export const ProviderDashboard: React.FC = () => {
  const {
    activeProvider,
    toggleProviderStatus,
    activeIncident,
    incomingJobAlert,
    acceptJob,
    declineJob,
    updateIncidentStatus,
    completeService,
  } = useRoadResQ();

  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);

  // Digital Invoice Form state
  const [parts, setParts] = useState<{ id: string; name: string; price: number }[]>([
    { id: 'p1', name: 'On-Site Diagnostic & Safety Seal', price: 150.0 },
  ]);
  const [newPartName, setNewPartName] = useState('');
  const [newPartPrice, setNewPartPrice] = useState('');
  const [laborFee, setLaborFee] = useState(250.0);

  // Incoming Job Countdown timer
  const [alertSeconds, setAlertSeconds] = useState(30);

  useEffect(() => {
    if (incomingJobAlert) {
      setAlertSeconds(30);
      const timer = setInterval(() => {
        setAlertSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            declineJob(activeProvider.id, incomingJobAlert.id, 'timeout');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [incomingJobAlert, activeProvider.id, declineJob]);

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIncident && enteredPin === activeIncident.safetyPin) {
      setPinVerified(true);
      setPinError(false);
      updateIncidentStatus('SERVICE');
    } else {
      setPinError(true);
    }
  };

  const handleAddPart = () => {
    if (!newPartName || !newPartPrice) return;
    setParts([
      ...parts,
      { id: `part_${Date.now()}`, name: newPartName, price: parseFloat(newPartPrice) },
    ]);
    setNewPartName('');
    setNewPartPrice('');
  };

  const handleRemovePart = (id: string) => {
    setParts(parts.filter((p) => p.id !== id));
  };

  const handleCompleteJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeService(parts, laborFee);
  };

  const isCurrentAssigned = activeIncident?.providerId === activeProvider.id;

  return (
    <div className="container-px py-6 space-y-6 animate-fade-up">
      {/* Provider Header Banner & Status Toggle */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={activeProvider.avatar}
                alt={activeProvider.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                  activeProvider.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              ></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-bold text-slate-900">{activeProvider.name}</h1>
                <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.2 text-[10px] font-bold font-mono">
                  {activeProvider.vehiclePlate}
                </span>
              </div>
              <p className="text-xs text-slate-500">{activeProvider.vehicleType} • Certified Roadside Pro (India)</p>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleProviderStatus(activeProvider.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                activeProvider.isOnline
                  ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                  : 'bg-slate-100 border border-slate-300 text-slate-600'
              }`}
            >
              <Power className={`h-4 w-4 ${activeProvider.isOnline ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{activeProvider.isOnline ? 'Online on Indian Grid' : 'Offline / On Break'}</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Today's Earnings</div>
            <div className="font-mono text-xl font-extrabold text-emerald-700 mt-0.5">
              ₹{activeProvider.earningsToday.toFixed(2)}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Total Dispatches</div>
            <div className="font-mono text-xl font-extrabold text-slate-900 mt-0.5">
              {activeProvider.jobsCompleted}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Customer Rating</div>
            <div className="font-mono text-xl font-extrabold text-amber-600 mt-0.5 flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-amber-500" />
              <span>{activeProvider.rating}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500">Avg Arrival Speed</div>
            <div className="font-mono text-xl font-extrabold text-blue-600 mt-0.5">
              8.8 mins
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Emergency Job Alert Modal */}
      {incomingJobAlert && (
        <div className="rounded-3xl border-2 border-red-500 bg-red-50/50 p-6 shadow-md animate-fade-up">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-3 w-3 rounded-full bg-red-600 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-red-700 font-mono">
                  🚨 Incoming Emergency Request #{incomingJobAlert.id}
                </span>
                <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {alertSeconds}s timer
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-slate-900">
                {BREAKDOWN_CATEGORIES.find((c) => c.type === incomingJobAlert.breakdownType)?.label ||
                  incomingJobAlert.breakdownType}
              </h2>
              <p className="text-xs text-slate-600 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-red-600" />
                <span>{incomingJobAlert.location.address}</span>
              </p>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                <Car className="h-3.5 w-3.5 text-blue-600" />
                <span>
                  {incomingJobAlert.vehicle.year} {incomingJobAlert.vehicle.make} {incomingJobAlert.vehicle.model} ({incomingJobAlert.vehicle.plate})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => declineJob(activeProvider.id, incomingJobAlert.id, 'busy')}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700 transition-all shadow-sm"
              >
                Decline & Escalate
              </button>

              <button
                onClick={() => acceptJob(activeProvider.id, incomingJobAlert.id)}
                className="flex items-center gap-2 px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm transition-all"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Accept Job (₹450 Est)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Job Execution Workflow */}
      {isCurrentAssigned && activeIncident && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Navigation Map & Incident Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Active Roadside Dispatch
                  </span>
                  <h2 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                    Job #{activeIncident.id} — Customer: {activeIncident.userName}
                  </h2>
                </div>
                <a
                  href={`tel:${activeIncident.userPhone}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Customer</span>
                </a>
              </div>

              {/* Map */}
              <LeafletMap
                userLocation={activeIncident.location}
                assignedProvider={activeProvider}
                providerRoute={activeIncident.providerRoute}
                className="h-80 w-full"
              />

              {/* Job Step Navigation Actions */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Update Service Status (Live Customer Sync)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => updateIncidentStatus('EN_ROUTE')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      activeIncident.status === 'EN_ROUTE'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    1. En Route
                  </button>

                  <button
                    onClick={() => updateIncidentStatus('ARRIVED')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      activeIncident.status === 'ARRIVED'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    2. I've Arrived
                  </button>

                  <button
                    onClick={() => updateIncidentStatus('SERVICE')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      activeIncident.status === 'SERVICE'
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    3. In Service
                  </button>

                  <button
                    onClick={() => updateIncidentStatus('PAYMENT')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      activeIncident.status === 'PAYMENT'
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    4. Bill & Complete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: PIN Verification / Digital Invoice Builder */}
          <div className="space-y-4">
            {/* PIN Verification Box */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-600" />
                <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                  Customer Safety PIN Verification
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Ask customer for their 4-digit RoadResQ PIN before starting work.
              </p>

              <form onSubmit={handleVerifyPin} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-digit PIN"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    className="flex-1 rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-center text-sm font-mono tracking-widest text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
                  >
                    Verify
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-red-600">Invalid PIN. Please re-check with customer.</p>
                )}
                {pinVerified && (
                  <p className="text-xs text-emerald-700 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> PIN Verified. Authorized to proceed.
                  </p>
                )}
              </form>
            </div>

            {/* Digital Service Checklist & Invoice Builder */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-xs text-slate-900 uppercase tracking-wider">
                    Digital Service Invoice Builder (INR)
                  </span>
                </div>
              </div>

              {/* Added parts list */}
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <div className="flex justify-between items-center text-xs text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span>Standard Inspection & Labor</span>
                  <span className="font-mono font-bold">₹{laborFee.toFixed(2)}</span>
                </div>

                {parts.map((part) => (
                  <div
                    key={part.id}
                    className="flex justify-between items-center text-xs text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <span>• {part.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold">₹{part.price.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemovePart(part.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add item inputs */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Part / Material"
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    className="col-span-2 rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                  <input
                    type="number"
                    placeholder="₹ Price"
                    value={newPartPrice}
                    onChange={(e) => setNewPartPrice(e.target.value)}
                    className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddPart}
                  className="w-full py-1.5 rounded-xl border border-dashed border-slate-300 hover:border-blue-500 text-slate-600 hover:text-blue-700 text-xs font-semibold"
                >
                  + Add Custom Material / Fluid
                </button>
              </div>

              {/* Complete Job & Issue Bill Button */}
              <button
                onClick={handleCompleteJobSubmit}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Issue Digital Invoice to Customer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If no active job assigned */}
      {!activeIncident && !incomingJobAlert && (
        <div className="p-12 text-center rounded-3xl border border-slate-200 bg-white shadow-sm space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
            <Navigation className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-slate-900">Standby for Roadside Dispatch in Bengaluru</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your mobile workshop is marked <strong>Online</strong> on the regional Indian telematics network. Nearby emergency calls will pop up here instantly.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
