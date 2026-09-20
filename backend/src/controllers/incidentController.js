import { DB } from '../services/dataStore.js';
import { matchProvidersForIncident } from '../services/matchingEngine.js';

export const createIncident = (req, res) => {
  const { breakdownType, vehicle, vehicleId, location, severity, notes } = req.body;
  const incidentId = `RRQ-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;
  const randomPin = Math.floor(1000 + Math.random() * 9000).toString();

  const coords = location?.lat !== undefined ? location : { lat: location?.latitude || 23.0225, lng: location?.longitude || 72.5714 };

  const newIncident = {
    id: incidentId,
    userId: req.user?.id || 'usr_main',
    userName: req.user?.name || 'Dhruv Patel',
    userPhone: '+91 98765 43210',
    vehicleId: vehicleId || 'veh_1',
    vehicle: vehicle || DB.vehicles[0],
    breakdownType: (breakdownType || 'FLAT_TYRE').toUpperCase(),
    severity: (severity || 'MEDIUM').toUpperCase(),
    latitude: coords.lat,
    longitude: coords.lng,
    address: location?.address || 'Satellite Road, Ahmedabad, Gujarat',
    landmark: location?.landmark || '',
    notes: notes || '',
    status: 'MATCHING',
    safetyPin: randomPin,
    etaMinutes: 12,
    createdAt: new Date().toISOString(),
    escalationLogs: [],
    timeline: [
      {
        status: 'CREATED',
        title: 'Incident Logged',
        description: `Emergency roadside request registered for ${breakdownType}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        status: 'CLASSIFIED',
        title: 'Severity & Equipment Classified',
        description: `${severity || 'MEDIUM'} priority dispatch initiated`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      {
        status: 'MATCHING',
        title: 'Smart Matching Engine Active',
        description: 'Searching for nearby certified mobile service units...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ],
  };

  DB.incidents.unshift(newIncident);
  res.status(201).json({ success: true, incident: newIncident });
};

export const getIncidents = (req, res) => {
  const { status, role } = req.query;
  let results = [...DB.incidents];

  if (status) {
    results = results.filter((i) => i.status.toUpperCase() === status.toUpperCase());
  }

  res.json({
    success: true,
    count: results.length,
    incidents: results,
  });
};

export const getIncidentById = (req, res) => {
  const incident = DB.incidents.find((i) => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const assignedProvider = incident.providerId
    ? DB.providers.find((p) => p.id === incident.providerId)
    : null;

  res.json({
    success: true,
    incident: {
      ...incident,
      provider: assignedProvider,
    },
  });
};

export const updateIncidentStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  incident.status = status.toUpperCase();
  incident.updatedAt = new Date().toISOString();

  let desc = `Status updated to ${status}`;
  if (incident.status === 'ARRIVED') desc = 'Provider reached vehicle location on-site';
  if (incident.status === 'SERVICE') desc = 'Diagnostics and repair work in progress';
  if (incident.status === 'PAYMENT') desc = 'Service completed. Digital invoice generated.';
  if (incident.status === 'CLOSED') desc = 'Payment confirmed and incident closed.';

  incident.timeline.push({
    status: incident.status,
    title: incident.status,
    description: desc,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  res.json({ success: true, incident });
};

export const getMatchedProviders = (req, res) => {
  const incident = DB.incidents.find((i) => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const matched = matchProvidersForIncident(incident, DB.providers);
  res.json({ success: true, count: matched.length, providers: matched });
};

export const escalateIncident = (req, res) => {
  const { id } = req.params;
  const { providerId, reason } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const triedIds = [...(incident.escalationLogs || []).map((l) => l.providerId), providerId];
  const nextCandidates = matchProvidersForIncident(incident, DB.providers, triedIds);

  const logEntry = {
    providerId,
    reason: reason || 'declined',
    timestamp: new Date().toISOString(),
  };

  if (!incident.escalationLogs) incident.escalationLogs = [];
  incident.escalationLogs.push(logEntry);

  if (nextCandidates.length > 0) {
    const nextPro = nextCandidates[0];
    incident.providerId = nextPro.id;
    incident.status = 'ASSIGNED';
    incident.timeline.push({
      status: 'ASSIGNED',
      title: 'Auto-Escalated to Next Unit',
      description: `Re-assigned to ${nextPro.name} (${nextPro.rating}★)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });

    return res.json({
      success: true,
      escalated: true,
      escalatedTo: nextPro,
      incident,
    });
  }

  res.json({
    success: false,
    escalated: false,
    message: 'No further standby units within standard radius',
    incident,
  });
};
