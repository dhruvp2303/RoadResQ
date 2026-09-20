-- RoadResQ Realistic Indian Seed Data

-- Users
INSERT INTO users (id, email, passwordHash, name, phone, role, avatarUrl)
VALUES 
('usr_main', 'dhruv.patel@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'Dhruv Patel', '+91 98765 43210', 'USER', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'),
('usr_2', 'priya.sharma@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'Priya Sharma', '+91 98450 99887', 'USER', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'),
('usr_admin', 'admin@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'Control Room Admin', '+91 98000 11223', 'ADMIN', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80')
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Vehicles
INSERT INTO vehicles (id, userId, make, model, year, plateNumber, color, type, fuelType)
VALUES
('veh_1', 'usr_main', 'Tata', 'Nexon EV Empowered', 2024, 'GJ 01 AB 1234', 'Intensi-Teal', 'ev', 'Electric'),
('veh_2', 'usr_main', 'Hyundai', 'Creta 1.5 SX(O)', 2023, 'GJ 01 CD 5678', 'Polar White', 'suv', 'Petrol'),
('veh_3', 'usr_main', 'Royal Enfield', 'Hunter 350', 2023, 'GJ 01 EF 9012', 'Dapper Ash', 'bike', 'Petrol')
ON DUPLICATE KEY UPDATE plateNumber=VALUES(plateNumber);

-- Providers
INSERT INTO providers (id, email, passwordHash, name, phone, avatarUrl, vehicleType, vehiclePlate, rating, jobsCompleted, earningsTotal, status, verificationStatus, currentLat, currentLng)
VALUES
('prov_1', 'shreeautocare@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'Shree Auto Care (Rajesh Patel)', '+91 98250 12345', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'Mobile Service Van', 'GJ 01 TC 7711', 4.88, 842, 142500.0, 'AVAILABLE', 'VERIFIED', 23.0225, 72.5714),
('prov_2', 'gujarattowing@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'Gujarat 24/7 Heavy Towing (Vikram Sinh)', '+91 98251 55667', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'Hydraulic Flatbed Tow Truck', 'GJ 01 TOW 9022', 4.92, 610, 218000.0, 'AVAILABLE', 'VERIFIED', 23.0338, 72.5135),
('prov_3', 'quickfix@roadresq.in', '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe', 'QuickFix Battery & Tyre Squad (Mohammed Irfan)', '+91 98252 88990', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Quick Response Bike', 'GJ 01 MOTO 104', 4.91, 420, 96000.0, 'AVAILABLE', 'VERIFIED', 23.0130, 72.5350)
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Capabilities
INSERT INTO provider_capabilities (id, providerId, skillType, baseRate)
VALUES
('cap_1', 'prov_1', 'FLAT_TYRE', 350.0),
('cap_2', 'prov_1', 'DEAD_BATTERY', 450.0),
('cap_3', 'prov_1', 'OUT_OF_FUEL', 400.0),
('cap_4', 'prov_1', 'MECHANICAL', 650.0),
('cap_5', 'prov_2', 'TOWING', 1200.0),
('cap_6', 'prov_3', 'DEAD_BATTERY', 450.0),
('cap_7', 'prov_3', 'FLAT_TYRE', 350.0)
ON DUPLICATE KEY UPDATE baseRate=VALUES(baseRate);

-- Sample Completed Incident
INSERT INTO incidents (id, userId, vehicleId, breakdownType, severity, latitude, longitude, address, landmark, notes, status, safetyPin, etaMinutes)
VALUES
('RRQ-2026-004281', 'usr_main', 'veh_1', 'DEAD_BATTERY', 'MEDIUM', 23.0225, 72.5714, 'Satellite Road, Near ISRO, Satellite, Ahmedabad, Gujarat 380015', 'Opposite Star Bazaar', '12V Auxiliary battery completely drained while parked.', 'CLOSED', '4819', 0)
ON DUPLICATE KEY UPDATE status=VALUES(status);

-- Invoice
INSERT INTO invoices (id, incidentId, baseFee, labourFee, partsFee, tax, discount, total, isPaid)
VALUES
('INV-2026-004281', 'RRQ-2026-004281', 350.0, 150.0, 60.0, 38.0, 80.0, 518.0, TRUE)
ON DUPLICATE KEY UPDATE total=VALUES(total);

-- Payment
INSERT INTO payments (id, incidentId, amount, gateway, transactionRef, status)
VALUES
('pay_1', 'RRQ-2026-004281', 518.0, 'UPI', 'UPI_RRQ_2026_98214', 'SUCCESS')
ON DUPLICATE KEY UPDATE amount=VALUES(amount);

-- Review
INSERT INTO reviews (id, incidentId, providerId, rating, feedback, tags, tipAmount)
VALUES
('rev_1', 'RRQ-2026-004281', 'prov_1', 5, 'Super fast jumpstart for my Nexon EV. Rajesh was courteous and reached in 10 mins!', 'Punctual, Professional, EV Expert', 50.0)
ON DUPLICATE KEY UPDATE rating=VALUES(rating);
