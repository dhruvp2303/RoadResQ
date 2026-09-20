import { DB } from '../services/dataStore.js';

export const getVehicles = (req, res) => {
  const userId = req.user?.id || 'usr_main';
  const vehicles = DB.vehicles.filter((v) => v.userId === userId);
  res.json({ success: true, count: vehicles.length, vehicles });
};

export const addVehicle = (req, res) => {
  const userId = req.user?.id || 'usr_main';
  const { make, model, year, plateNumber, color, type, fuelType } = req.body;

  const newVehicle = {
    id: `veh_${Date.now()}`,
    userId,
    make: make || 'Tata',
    model: model || 'Harrier Dark Edition',
    year: Number(year) || 2024,
    plateNumber: plateNumber || `GJ 01 ${Math.floor(1000 + Math.random() * 9000)}`,
    color: color || 'Black',
    type: type || 'suv',
    fuelType: fuelType || 'Diesel',
    createdAt: new Date().toISOString(),
  };

  DB.vehicles.push(newVehicle);
  res.status(201).json({ success: true, vehicle: newVehicle });
};

export const updateVehicle = (req, res) => {
  const { id } = req.params;
  const vehicle = DB.vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }

  Object.assign(vehicle, req.body);
  res.json({ success: true, vehicle });
};

export const deleteVehicle = (req, res) => {
  const { id } = req.params;
  const index = DB.vehicles.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Vehicle not found' });
  }

  DB.vehicles.splice(index, 1);
  res.json({ success: true, message: 'Vehicle deleted from garage' });
};
