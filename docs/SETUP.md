# 🛠️ RoadResQ Setup & Installation Guide

This guide details how to configure, run, and verify the full-stack RoadResQ application locally.

---

## ⚡ Prerequisites

- **Node.js**: v18+ or v20+
- **npm**: v9+
- **MySQL**: (Optional for production MySQL mode; in-memory fallback is enabled by default for instant zero-config testing)

---

## 🚀 Quick Start (Single Command)

From the project root:

```bash
# 1. Install frontend dependencies
cd frontend
npm install

# 2. Start frontend dev server
npm run dev
```

In a separate terminal:

```bash
# 3. Start backend API & Telematics server
cd backend
npm install
npm start
```

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=
```
*Note: If `VITE_GOOGLE_MAPS_API_KEY` is not provided, RoadResQ automatically uses its built-in Leaflet + OpenStreetMap engine without throwing errors.*

### Backend (`backend/.env`)
```env
PORT=5000
DATABASE_URL="mysql://root:password@localhost:3306/roadresq_db"
JWT_SECRET="roadresq_super_secret_jwt_key_2026_india"
GOOGLE_MAPS_API_KEY=""
RAZORPAY_KEY_ID="rzp_test_roadresq2026"
RAZORPAY_KEY_SECRET="test_secret_roadresq"
NODE_ENV="development"
```

---

## 🗄️ MySQL Database Setup (Optional)

If running with local MySQL:

```bash
cd backend

# Generate Prisma Client
npm run prisma:generate

# Run schema migrations
npm run prisma:migrate

# Seed realistic Indian data
npm run prisma:seed
```

Or directly import `database/migrations/01_initial_schema.sql` and `database/seed/seed.sql` into MySQL Workbench / phpMyAdmin.

---

## 🧑💻 Side-by-Side Role Testing

RoadResQ includes a floating **Demo Control Bar** at the bottom of the screen:

1. **Role Switcher**: Click `Driver/User`, `Provider Pro`, `Admin Command`, or `Marketing Landing` to switch views instantly.
2. **Fast Forward**: Jump through incident milestones (`MATCHING` ➔ `ASSIGNED` ➔ `EN_ROUTE` ➔ `ARRIVED` ➔ `SERVICE` ➔ `PAYMENT` ➔ `CLOSED`).
3. **Multi-Language**: Click the language switcher in the header to view UI in English, Hindi, Kannada, Tamil, Telugu, Gujarati, Bengali, or Marathi.
4. **Auto-Escalation Test**: When provider receives request, click "Decline" to test automatic re-routing to Provider B.
