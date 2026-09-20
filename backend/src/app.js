import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { setupTrackingSockets } from './sockets/trackingSocket.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();
const server = http.createServer(app);

// Setup Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
});

setupTrackingSockets(io);

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'RoadResQ India Telematics & Emergency Dispatch',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start server
const PORT = config.port;
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚗 RoadResQ India-First Emergency Dispatch Backend`);
  console.log(`📡 Telematics & Socket.IO Gateway active on port: ${PORT}`);
  console.log(`⚡ REST API available at http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

export { app, server, io };
