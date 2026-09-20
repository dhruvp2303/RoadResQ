# 🚗 RoadResQ — India-First Emergency Roadside Assistance Platform

> **“When the road stops, help keeps moving.”**

RoadResQ is a production-grade, India-first roadside emergency response and telematics platform connecting stranded motorists with certified nearby service providers (mechanics, tyre technicians, battery specialists, fuel delivery patrol, and heavy flatbed towing operators).

---

## 🌟 Key Features

### 👤 1. User Application (Driver Portal)
- **1-Tap Emergency SOS**: Instant breakdown classification with recommended vehicle dispatch.
- **Smart Telematics Radar**: Matches provider based on capability, vehicle compatibility, distance, and CSAT rating.
- **Live GPS Tracking**: Real-time provider route movement, speed, heading, and dynamic ETA countdown.
- **Safety Mode (🛡️)**: 4-Digit On-site Authentication PIN, 112 & 1033 Highway Patrol SOS, and Emergency Contact notification.
- **Garage Management**: Multi-vehicle digital garage with EV, SUV, bike, and scooter support.
- **Transparent Billing & Invoicing**: Automatic 18% GST calculation, itemized labor & spare parts breakdown.
- **Indian Payment Experience**: Razorpay, UPI (GPay, PhonePe, Paytm), Cards, and Cash settlement.
- **Multi-Criteria Rating**: 5-star review system with tip option and speed/politeness tags.
- **8 Indian Languages**: English, Hindi, Kannada, Tamil, Telugu, Gujarati, Bengali, and Marathi.

### 🧑🔧 2. Provider Application (Technician Portal)
- **Shift Toggle**: Instant Online / Offline availability switch.
- **Emergency Dispatch Radar**: High-priority alert banner with audio pulse, distance, compatibility score, and countdown timer.
- **Turn-by-Turn Telematics**: Live navigation view with route simulation.
- **On-Site Safety PIN Verification**: Secure hand-off before commencing repair.
- **Digital Work Order Builder**: Add customized parts, labor rates, and view GST summary.
- **Earnings Ledger & Job History**: Daily and lifetime earnings tracker.

### 🛡️ 3. Admin Command Center (Control Room)
- **Live Fleet Telematics Map**: View active vehicles, responders, and stranded drivers across India.
- **Real-Time Incident Queue**: Live status synchronization across all active breakdowns.
- **Auto-Escalation Engine**: Audit log tracking provider declines and timeouts with seamless automatic re-dispatch.
- **Provider Verification & Suspension**: Kyc verification tools for onboarding certified technicians.
- **Telematics Analytics**: Live CSAT scores, average response SLA (< 12 min), and breakdown distribution charts.

---

## 🏗️ Architecture & Tech Stack

```text
RoadResQ/
├── frontend/             # React 18, Vite, Tailwind CSS, Leaflet/Google Maps, Socket.IO, Recharts
├── backend/              # Node.js, Express, Socket.IO, JWT, Prisma ORM, REST API
├── database/             # MySQL DDL migrations & Realistic Indian Seed Data
├── docs/                 # Detailed API, Database & Setup manuals
├── README.md             # Project documentation
└── .gitignore
```

### Frontend
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS + Custom Lingua Design System
- **Maps**: Google Maps JavaScript API + Leaflet / OpenStreetMap fallback
- **Real-Time**: Socket.IO Client
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Server**: Node.js & Express.js
- **Real-Time Gateway**: Socket.IO (`/incidents` telematics namespace)
- **Database**: MySQL + Prisma ORM (with in-memory fallback store for instant zero-config demos)
- **Security**: JWT Authentication, Role-based Access Control (RBAC), CORS, Input validation

---

## 🚀 Getting Started

### 1. Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

### 2. Start Backend
```bash
cd backend
npm install
npm start
```
The REST API and Socket.IO telematics gateway will run on `http://localhost:5000`.

---

## 🧑💻 Demo Credentials & Side-by-Side Testing

Use the floating **Demo Control Bar** at the bottom of the interface to switch between roles:

| Role | Name | Phone / Email | Capabilities / Access |
|---|---|---|---|
| **Driver (User)** | Dhruv Patel | `dhruv.patel@roadresq.in` | Tata Nexon EV, Hyundai Creta, Royal Enfield |
| **Provider (Technician)** | Shree Auto Care | `shreeautocare@roadresq.in` | Mobile Van, Tyre, Battery, Mechanical, Tow |
| **Admin (Control Room)** | Control Room Admin | `admin@roadresq.in` | Pan-India Telematics Command Center |

---

## 📄 License & Credits
Built for Indian Mobility & Roadside Safety.
**RoadResQ © 2026** — *When the road stops, help keeps moving.*
