import { DB } from '../services/dataStore.js';

export const getIncidentTracking = (req, res) => {
  const { id } = req.params;
  const incident = DB.incidents.find((i) => i.id === id);

  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const provider = incident.providerId
    ? DB.providers.find((p) => p.id === incident.providerId)
    : null;

  res.json({
    success: true,
    tracking: {
      incidentId: incident.id,
      status: incident.status,
      userLocation: { lat: incident.latitude, lng: incident.longitude, address: incident.address },
      providerLocation: provider ? { lat: provider.currentLat, lng: provider.currentLng } : null,
      etaMinutes: incident.etaMinutes || 10,
    },
  });
};

export const updateLiveLocation = (req, res) => {
  const { id } = req.params;
  const { providerId, latitude, longitude, speed, heading } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  const provider = DB.providers.find((p) => p.id === (providerId || incident?.providerId));

  if (provider && latitude && longitude) {
    provider.currentLat = latitude;
    provider.currentLng = longitude;
  }

  res.json({
    success: true,
    message: 'Provider location updated',
    coords: { lat: latitude, lng: longitude, speed, heading },
    timestamp: new Date().toISOString(),
  });
};
