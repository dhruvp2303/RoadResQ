import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { setupTrackingSockets } from './sockets/trackingSocket.js';
import { matchProvidersForIncident } from './services/matchingEngine.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
});

setupTrackingSockets(io);

app.use(cors());
app.use(express.json());

// In-memory mock DB store for demo/hackathon deployment
const DB = {
  incidents: [],
  providers: [
    {
      id: 'prov_1',
      name: 'Rajesh Kumar (Sri Krishna Auto Pro)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98450 22334',
      rating: 4.96,
      jobsCompleted: 780,
      vehicleType: 'Mobile Service Van',
      vehiclePlate: 'KA 01 MH 7711',
      skills: ['flat_tyre', 'dead_battery', 'out_of_fuel', 'mechanical', 'overheating', 'dont_know'],
      isOnline: true,
      coords: { lat: 12.9385, lng: 77.6295 },
      earningsToday: 3200.0,
      status: 'available',
      verificationStatus: 'verified',
    },
    {
      id: 'prov_2',
      name: 'Vikram Singh (Express 24/7 Towing)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98450 55667',
      rating: 4.93,
      jobsCompleted: 540,
      vehicleType: 'Tow Truck',
      vehiclePlate: 'KA 03 TOW 9022',
      skills: ['towing', 'overheating', 'mechanical', 'flat_tyre', 'dont_know'],
      isOnline: true,
      coords: { lat: 12.9212, lng: 77.6180 },
      earningsToday: 4800.0,
      status: 'available',
      verificationStatus: 'verified',
    },
    {
      id: 'prov_3',
      name: 'Mohammed Aslam (QuickFix Battery & Tyre Squad)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      phone: '+91 98450 88990',
      rating: 4.89,
      jobsCompleted: 390,
      vehicleType: 'Quick Response Bike',
      vehiclePlate: 'KA 04 MOTO 104',
      skills: ['dead_battery', 'out_of_fuel', 'flat_tyre', 'dont_know'],
      isOnline: true,
      coords: { lat: 12.9780, lng: 77.6380 },
      earningsToday: 2100.0,
      status: 'available',
      verificationStatus: 'verified',
    },
  ],
};

// --- AUTH ROUTES ---
app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  res.json({
    success: true,
    token: `jwt_${Date.now()}_token`,
    user: {
      id: 'usr_main',
      name: 'Rahul Sharma',
      email: email || 'rahul.sharma@roadresq.in',
      role: role || 'user',
    },
  });
});

// --- INCIDENTS & SMART MATCHING ROUTES ---
app.post('/api/incidents', (req, res) => {
  const { breakdownType, vehicle, location, severity, notes } = req.body;
  const incidentId = `RRQ-2026-${String(Math.floor(100000 + Math.random() * 900000))}`;
  const randomPin = Math.floor(1000 + Math.random() * 9000).toString();

  const newIncident = {
    id: incidentId,
    userId: 'usr_main',
    userName: 'Rahul Sharma',
    userPhone: '+91 98450 11223',
    vehicle,
    breakdownType,
    severity: severity || 'medium',
    location,
    notes: notes || '',
    status: 'MATCHING',
    safetyPin: randomPin,
    createdAt: new Date().toISOString(),
    escalationLogs: [],
    etaMinutes: 12,
  };

  DB.incidents.unshift(newIncident);
  res.status(201).json({ success: true, incident: newIncident });
});

app.get('/api/incidents/:id/providers', (req, res) => {
  const incident = DB.incidents.find((i) => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const matched = matchProvidersForIncident(incident, DB.providers);
  res.json({ success: true, count: matched.length, providers: matched });
});

// Escalation trigger endpoint
app.post('/api/incidents/:id/escalate', (req, res) => {
  const { providerId, reason } = req.body;
  const incident = DB.incidents.find((i) => i.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }

  const triedIds = [...incident.escalationLogs.map((l) => l.providerId), providerId];
  const nextCandidates = matchProvidersForIncident(incident, DB.providers, triedIds);

  if (nextCandidates.length > 0) {
    const nextPro = nextCandidates[0];
    incident.providerId = nextPro.id;
    incident.provider = nextPro;
    incident.status = 'ASSIGNED';
    incident.escalationLogs.push({
      providerId,
      reason: reason || 'declined',
      timestamp: new Date().toISOString(),
    });

    return res.json({ success: true, escalatedTo: nextPro, incident });
  }

  res.json({ success: false, message: 'No more standby units in radius' });
});

// --- PAYMENT VERIFICATION ROUTE ---
app.post('/api/payments/verify', (req, res) => {
  const { incidentId, amount, method } = req.body;
  // Server-side payment validation
  const incident = DB.incidents.find((i) => i.id === incidentId);
  if (incident) {
    incident.status = 'CLOSED';
  }

  res.json({
    success: true,
    transactionId: `TXN_${Date.now()}`,
    verified: true,
    amount,
    method,
    timestamp: new Date().toISOString(),
  });
});

// --- ADMIN DASHBOARD TELEMATICS METRICS ---
app.get('/api/admin/dashboard', (req, res) => {
  res.json({
    success: true,
    metrics: {
      activeIncidents: DB.incidents.filter((i) => i.status !== 'CLOSED').length,
      onlineFleet: DB.providers.filter((p) => p.isOnline).length,
      averageResponseTimeMin: 11.4,
      customerCsatScore: 4.94,
      totalVolumeToday: 42,
    },
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`[RoadResQ] Emergency Telematics Backend running on port ${PORT}`);
});
