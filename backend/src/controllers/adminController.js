import { DB } from '../services/dataStore.js';

export const getDashboardMetrics = (req, res) => {
  const activeIncidents = DB.incidents.filter((i) => i.status !== 'CLOSED').length;
  const onlineProviders = DB.providers.filter((p) => p.isOnline).length;
  const completedIncidents = DB.incidents.filter((i) => i.status === 'CLOSED').length;
  const totalRevenue = DB.incidents
    .filter((i) => i.invoice && i.invoice.isPaid)
    .reduce((sum, i) => sum + (i.invoice.total || 0), 0);

  res.json({
    success: true,
    metrics: {
      activeIncidents,
      onlineFleet: onlineProviders,
      totalProviders: DB.providers.length,
      completedToday: completedIncidents,
      averageResponseTimeMin: 11.2,
      customerCsatScore: 4.93,
      totalRevenueToday: totalRevenue || 3450.0,
      breakdownDistribution: {
        flatTyre: 38,
        deadBattery: 29,
        outOfFuel: 12,
        mechanical: 14,
        towing: 7,
      },
    },
  });
};

export const getAdminIncidents = (req, res) => {
  res.json({
    success: true,
    count: DB.incidents.length,
    incidents: DB.incidents,
  });
};

export const getAdminProviders = (req, res) => {
  res.json({
    success: true,
    count: DB.providers.length,
    providers: DB.providers,
  });
};

export const updateProviderStatus = (req, res) => {
  const { id } = req.params;
  const { verificationStatus, status } = req.body;

  const pro = DB.providers.find((p) => p.id === id);
  if (!pro) {
    return res.status(404).json({ success: false, message: 'Provider not found' });
  }

  if (verificationStatus) pro.verificationStatus = verificationStatus;
  if (status) pro.status = status;

  res.json({ success: true, provider: pro });
};

export const getAdminUsers = (req, res) => {
  res.json({
    success: true,
    count: DB.users.length,
    users: DB.users,
  });
};
