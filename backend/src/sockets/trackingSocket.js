/**
 * RoadResQ Real-Time Socket.IO Telematics Gateway
 * Manages live GPS coordinate streaming, incident rooms, and in-transit messaging
 */

export function setupTrackingSockets(io) {
  const incidentNamespace = io.of('/incidents');

  incidentNamespace.on('connection', (socket) => {
    // Join dedicated incident room for live stream
    socket.on('join_incident', ({ incidentId, role, userId }) => {
      const room = `incident_${incidentId}`;
      socket.join(room);

      socket.to(room).emit('user_status_update', {
        role,
        userId,
        status: 'online',
        timestamp: new Date().toISOString(),
      });
    });

    // Provider sends location coordinates
    socket.on('provider_location_update', ({ incidentId, providerId, coords, heading, speed }) => {
      const room = `incident_${incidentId}`;
      // Broadcast to user and admin in room
      incidentNamespace.to(room).emit('telematics_stream', {
        incidentId,
        providerId,
        coords,
        heading,
        speed,
        timestamp: new Date().toISOString(),
      });
    });

    // Chat messaging
    socket.on('send_chat_message', ({ incidentId, sender, text }) => {
      const room = `incident_${incidentId}`;
      incidentNamespace.to(room).emit('new_chat_message', {
        id: `msg_${Date.now()}`,
        sender,
        text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    });

    // Status lifecycle change event (e.g. EN_ROUTE, ARRIVED, SERVICE, PAYMENT, CLOSED)
    socket.on('status_change', ({ incidentId, newStatus, updatedBy }) => {
      const room = `incident_${incidentId}`;
      incidentNamespace.to(room).emit('incident_status_changed', {
        incidentId,
        newStatus,
        updatedBy,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on('disconnect', () => {
      // Disconnect handled cleanly
    });
  });
}
