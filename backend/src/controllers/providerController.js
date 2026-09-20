import { DB } from '../services/dataStore.js';

export const getProviderRequests = (req, res) => {
  const providerId = req.query.providerId || req.user?.id || 'prov_1';
  // Return active unassigned incidents or assigned to this provider
  const requests = DB.incidents.filter(
    (i) => i.status === 'MATCHING' || (i.providerId === providerId && i.status !== 'CLOSED')
  );

  res.json({
    success: true,
    count: requests.length,
    requests,
  });
};

export const acceptIncident = (req, res) => {
  const { id } = req.params;
  const { providerId } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const pro = DB.providers.find((p) => p.id === (providerId || 'prov_1'));
  if (pro) {
    pro.status = 'BUSY';
  }

  incident.providerId = pro ? pro.id : providerId;
  incident.status = 'EN_ROUTE';
  incident.etaMinutes = 10;
  incident.timeline.push({
    status: 'EN_ROUTE',
    title: 'Provider Accepted & En Route',
    description: `${pro?.name || 'Technician'} accepted job and is navigating with live GPS.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  });

  res.json({
    success: true,
    message: 'Incident accepted by provider',
    incident,
    provider: pro,
  });
};

export const declineIncident = (req, res) => {
  const { id } = req.params;
  const { providerId, reason } = req.body;

  const incident = DB.incidents.find((i) => i.id === id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  if (!incident.escalationLogs) incident.escalationLogs = [];
  incident.escalationLogs.push({
    providerId: providerId || 'prov_1',
    reason: reason || 'declined',
    timestamp: new Date().toISOString(),
  });

  // Re-run matching for remaining providers
  const tried = incident.escalationLogs.map((l) => l.providerId);
  const remaining = DB.providers.filter((p) => !tried.includes(p.id) && p.isOnline);

  if (remaining.length > 0) {
    const nextPro = remaining[0];
    incident.providerId = nextPro.id;
    incident.status = 'ASSIGNED';
  }

  res.json({
    success: true,
    message: 'Incident declined and escalated',
    incident,
  });
};

export const toggleShiftStatus = (req, res) => {
  const { id } = req.params;
  const pro = DB.providers.find((p) => p.id === id) || DB.providers[0];

  pro.isOnline = !pro.isOnline;
  pro.status = pro.isOnline ? 'AVAILABLE' : 'OFFLINE';

  res.json({
    success: true,
    provider: pro,
    message: `Provider status changed to ${pro.status}`,
  });
};

export const getProviderProfile = (req, res) => {
  const { id } = req.params;
  const pro = DB.providers.find((p) => p.id === id) || DB.providers[0];

  res.json({
    success: true,
    provider: pro,
  });
};
