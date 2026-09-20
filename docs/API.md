# 📡 RoadResQ API & Real-Time Telematics Documentation

RoadResQ provides a RESTful API along with a high-throughput **Socket.IO Telematics Gateway** for low-latency dispatch and GPS tracking across India.

---

## 🔐 Authentication & Session Headers

Protected routes expect a standard Bearer JWT token:
```http
Authorization: Bearer <jwt_token>
```

---

## 🚀 REST API Endpoints

### 1. Authentication (`/api/auth`)

#### `POST /api/auth/login`
- **Request**:
  ```json
  {
    "email": "dhruv.patel@roadresq.in",
    "role": "USER"
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "user": {
      "id": "usr_main",
      "name": "Dhruv Patel",
      "email": "dhruv.patel@roadresq.in",
      "phone": "+91 98765 43210",
      "role": "USER"
    }
  }
  ```

#### `GET /api/auth/me`
- **Response**: Returns authenticated user profile, saved vehicles, and emergency contacts.

---

### 2. Emergency Incidents (`/api/incidents`)

#### `POST /api/incidents`
- **Request**:
  ```json
  {
    "breakdownType": "FLAT_TYRE",
    "vehicle": {
      "make": "Tata",
      "model": "Nexon EV",
      "plateNumber": "GJ 01 AB 1234",
      "type": "ev"
    },
    "location": {
      "lat": 23.0225,
      "lng": 72.5714,
      "address": "Satellite Road, Ahmedabad, Gujarat 380015",
      "landmark": "Near ISRO"
    },
    "severity": "MEDIUM",
    "notes": "Left rear tyre punctured on highway"
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "success": true,
    "incident": {
      "id": "RRQ-2026-819204",
      "status": "MATCHING",
      "safetyPin": "4819",
      "etaMinutes": 12,
      "timeline": [...]
    }
  }
  ```

#### `GET /api/incidents/:id/providers`
- **Response**: Evaluates multi-criteria compatibility (skill match, distance, vehicle suitability, CSAT rating) and returns ranked candidates.

#### `POST /api/incidents/:id/escalate`
- **Request**:
  ```json
  {
    "providerId": "prov_1",
    "reason": "timeout"
  }
  ```
- **Response**: Re-routes incident to next standby candidate in queue.

---

### 3. Provider Portal (`/api/provider`)

#### `GET /api/provider/requests`
- **Response**: Active emergency requests awaiting response or assigned to provider.

#### `POST /api/provider/requests/:id/accept`
- **Request**: `{ "providerId": "prov_1" }`
- **Response**: Transitions incident to `EN_ROUTE` and broadcasts live tracking stream.

#### `POST /api/provider/requests/:id/decline`
- **Request**: `{ "providerId": "prov_1", "reason": "busy" }`
- **Response**: Logs rejection and escalates to next available mobile unit.

---

### 4. Live Tracking (`/api/tracking`)

#### `GET /api/tracking/:id/tracking`
- Returns user coordinate, provider coordinate, heading, speed, and real-time ETA.

#### `POST /api/tracking/:id/location`
- Provider telematics ping to update active GPS latitude/longitude.

---

### 5. Invoicing & Indian Payment Gateway (`/api/payments`)

#### `POST /api/payments/invoice/:id`
- **Request**:
  ```json
  {
    "parts": [
      { "id": "p1", "name": "Tubeless Mushroom Patch Kit", "price": 120.0 }
    ],
    "labourFee": 150.0,
    "discount": 50.0
  }
  ```
- **Response**: Computes 18% GST and returns transparent itemized bill.

#### `POST /api/payments/verify`
- Server-side settlement validation (Razorpay / UPI / Cash simulator).

#### `POST /api/payments/review/:id`
- **Request**:
  ```json
  {
    "rating": 5,
    "feedback": "Quick response and polite technician.",
    "tags": ["Punctual", "Professional"],
    "tipAmount": 50.0
  }
  ```

---

### 6. Admin Telematics Dashboard (`/api/admin`)

#### `GET /api/admin/dashboard`
- Fleet telematics metrics: active incidents, online units, average response SLA, total volume, CSAT score.

---

## ⚡ Socket.IO Gateway (`/incidents` Namespace)

| Event Name | Direction | Payload | Description |
|---|---|---|---|
| `join_incident` | Client ➔ Server | `{ incidentId, role, userId }` | Joins private incident telemetry channel |
| `provider_location_update` | Provider ➔ Server | `{ incidentId, coords: { lat, lng }, heading, speed }` | Broadcasts real-time provider movement |
| `telematics_stream` | Server ➔ User/Admin | `{ coords, heading, speed, timestamp }` | Live provider GPS updates |
| `send_chat_message` | Client ➔ Server | `{ incidentId, sender, text }` | In-transit messaging |
| `new_chat_message` | Server ➔ Room | `{ id, sender, text, timestamp }` | Real-time chat message broadcast |
| `status_change` | Client ➔ Server | `{ incidentId, newStatus, updatedBy }` | Emits lifecycle transition (EN_ROUTE, ARRIVED, etc.) |
