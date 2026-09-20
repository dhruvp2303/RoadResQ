# 🗄️ RoadResQ Database Architecture

RoadResQ uses **MySQL** as its production relational database with **Prisma ORM** for schema migrations and type safety.

---

## 📊 Entity Relationship Model (12 Main Tables)

```text
               +---------------+
               |     users     |
               +-------+-------+
                       | 1:N
        +--------------+--------------+
        |                             |
+-------v-------+             +-------v-------+
|   vehicles    |             | notifications |
+-------+-------+             +---------------+
        | 1:N
+-------v-------+             +---------------+
|   incidents   |<------------+   providers   |
+---+---+---+---+ 1:N         +-------+-------+
    |   |   |                         | 1:N
    |   |   +----------------->+------v---------------+
    |   |                      | provider_capabilities|
    |   +--->+---------------+ +----------------------+
    |        | incident_     |
    |        | assignments   |
    |        +---------------+
    |
    +--->+------------------+
    |    | tracking_updates |
    |    +------------------+
    |
    +--->+------------------+
    |    |     services     |
    |    +------------------+
    |
    +--->+------------------+      +---------------+
    |    |     invoices     |----->|   payments    |
    |    +------------------+ 1:1  +---------------+
    |
    +--->+------------------+
         |     reviews      |
         +------------------+
```

---

## 📋 Table Specifications

### 1. `users`
- Stores driver & dispatcher accounts.
- Fields: `id`, `email`, `passwordHash`, `name`, `phone`, `role` (`USER`, `PROVIDER`, `ADMIN`), `avatarUrl`, timestamps.

### 2. `vehicles`
- Registered vehicles in driver's digital garage.
- Fields: `id`, `userId`, `make`, `model`, `year`, `plateNumber`, `color`, `type` (`suv`, `sedan`, `hatchback`, `bike`, `ev`, `scooter`), `fuelType`.

### 3. `providers`
- Certified service technicians and towing operators.
- Fields: `id`, `email`, `name`, `phone`, `vehicleType`, `vehiclePlate`, `rating`, `jobsCompleted`, `earningsTotal`, `status` (`AVAILABLE`, `BUSY`, `OFFLINE`), `verificationStatus` (`VERIFIED`, `PENDING`, `SUSPENDED`), `currentLat`, `currentLng`.

### 4. `provider_capabilities`
- Maps skills & base service rates.
- Fields: `id`, `providerId`, `skillType` (`FLAT_TYRE`, `DEAD_BATTERY`, `OUT_OF_FUEL`, `OVERHEATING`, `MECHANICAL`, `TOWING`, `DONT_KNOW`), `baseRate`.

### 5. `incidents`
- Emergency roadside cases and telemetry state.
- Fields: `id`, `userId`, `vehicleId`, `breakdownType`, `severity`, `latitude`, `longitude`, `address`, `landmark`, `status` (`CREATED`, `CLASSIFIED`, `MATCHING`, `ASSIGNED`, `EN_ROUTE`, `ARRIVED`, `SERVICE`, `PAYMENT`, `CLOSED`), `safetyPin`, `etaMinutes`.

### 6. `incident_assignments`
- Provider dispatch history and auto-escalation logs.
- Fields: `id`, `incidentId`, `providerId`, `status` (`PENDING`, `ACCEPTED`, `DECLINED`, `TIMEOUT`), `responseSecs`.

### 7. `tracking_updates`
- Breadcrumb GPS coordinate stream during provider transit.
- Fields: `id`, `incidentId`, `providerId`, `latitude`, `longitude`, `speed`, `heading`, `recordedAt`.

### 8. `services`
- Itemized parts and labor for the job.
- Fields: `id`, `incidentId`, `serviceName`, `unitPrice`, `quantity`, `total`.

### 9. `invoices`
- Transparent billing statement with GST.
- Fields: `id`, `incidentId`, `baseFee`, `labourFee`, `partsFee`, `tax` (18% GST), `discount`, `total`, `isPaid`.

### 10. `payments`
- Financial transaction confirmation.
- Fields: `id`, `incidentId`, `amount`, `gateway` (`RAZORPAY`, `UPI`, `CASH`), `transactionRef`, `status`, `paidAt`.

### 11. `reviews`
- Multi-criteria feedback & CSAT scoring.
- Fields: `id`, `incidentId`, `providerId`, `rating` (1–5), `feedback`, `tags`, `tipAmount`.

### 12. `notifications`
- In-app notification alerts for status milestones.
- Fields: `id`, `userId`, `title`, `message`, `type`, `read`, `createdAt`.
