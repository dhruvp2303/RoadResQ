import React, { useState } from 'react';
import { useRoadResQ } from '../../context/RoadResQContext';
import { Vehicle } from '../../types';
import { Car, Plus, Trash2, X, Zap, Bike } from 'lucide-react';

export const VehicleManagerModal: React.FC = () => {
  const {
    isVehicleManagerOpen,
    setVehicleManagerOpen,
    currentUser,
    addVehicle,
    removeVehicle,
  } = useRoadResQ();

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: 2023,
    plate: '',
    color: '',
    type: 'sedan' as Vehicle['type'],
    fuelType: 'Petrol' as Vehicle['fuelType'],
  });

  if (!isVehicleManagerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.make || !formData.model || !formData.plate) return;

    addVehicle({
      make: formData.make,
      model: formData.model,
      year: Number(formData.year),
      plate: formData.plate.toUpperCase(),
      color: formData.color || 'White',
      type: formData.type,
      fuelType: formData.fuelType,
    });

    setFormData({
      make: '',
      model: '',
      year: 2024,
      plate: '',
      color: '',
      type: 'sedan',
      fuelType: 'Petrol',
    });
    setIsAdding(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-up">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">My Garage Vehicles</h2>
              <p className="text-xs text-slate-500">Manage registered cars & two-wheelers for 1-tap roadside dispatch</p>
            </div>
          </div>
          <button
            onClick={() => setVehicleManagerOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Vehicle List */}
        <div className="my-5 space-y-3 max-h-64 overflow-y-auto pr-1">
          {currentUser.savedVehicles.map((veh) => (
            <div
              key={veh.id}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-700 border border-slate-200 shadow-sm">
                  {veh.type === 'ev' ? (
                    <Zap className="h-5 w-5 text-emerald-600" />
                  ) : veh.type === 'bike' || veh.type === 'scooter' ? (
                    <Bike className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Car className="h-5 w-5 text-slate-700" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">
                      {veh.year} {veh.make} {veh.model}
                    </span>
                    {veh.type === 'ev' && (
                      <span className="rounded bg-emerald-100 text-emerald-700 px-1.5 py-0.2 text-[10px] font-bold uppercase">
                        EV
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="font-mono font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {veh.plate}
                    </span>
                    <span>• {veh.color}</span>
                    <span>• {veh.fuelType || veh.type.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {currentUser.savedVehicles.length > 1 && (
                <button
                  onClick={() => removeVehicle(veh.id)}
                  className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
                  title="Remove vehicle"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Vehicle Form */}
        {isAdding ? (
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 animate-fade-up">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Add Vehicle to Garage</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Make / Brand</label>
                <input
                  type="text"
                  placeholder="e.g. Hyundai, Maruti, Tata, Royal Enfield"
                  value={formData.make}
                  onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Model Name</label>
                <input
                  type="text"
                  placeholder="e.g. Creta, Nexon, Swift, Thar"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Registration Plate (RTO)</label>
                <input
                  type="text"
                  placeholder="e.g. KA 03 MK 4190"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                  required
                  className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs text-slate-900 placeholder-slate-400 uppercase font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Vehicle Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full rounded-xl bg-white border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="sedan">Hatchback / Sedan</option>
                  <option value="suv">SUV / MUV</option>
                  <option value="ev">Electric Vehicle (EV)</option>
                  <option value="bike">Motorcycle / Two-Wheeler</option>
                  <option value="scooter">Scooter</option>
                  <option value="truck">Commercial Van / Pickup</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm"
              >
                Save Vehicle
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-blue-50/40 text-slate-600 hover:text-blue-700 transition-all text-xs font-bold"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Another Vehicle (Car / Bike / EV)</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VehicleManagerModal;
