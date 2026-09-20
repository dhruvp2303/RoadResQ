/**
 * RoadResQ Prisma Database Seeder
 * Populates MySQL database with initial Indian users, providers, vehicles, capabilities, and past incident history.
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting RoadResQ Database Seed...');

  // 1. Seed User
  const user = await prisma.user.upsert({
    where: { email: 'dhruv.patel@roadresq.in' },
    update: {},
    create: {
      id: 'usr_main',
      name: 'Dhruv Patel',
      email: 'dhruv.patel@roadresq.in',
      phone: '+91 98765 43210',
      passwordHash: '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe',
      role: 'USER',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    },
  });

  // 2. Seed Vehicles
  await prisma.vehicle.upsert({
    where: { plateNumber: 'GJ 01 AB 1234' },
    update: {},
    create: {
      id: 'veh_1',
      userId: user.id,
      make: 'Tata',
      model: 'Nexon EV Empowered',
      year: 2024,
      plateNumber: 'GJ 01 AB 1234',
      color: 'Intensi-Teal',
      type: 'ev',
      fuelType: 'Electric',
    },
  });

  await prisma.vehicle.upsert({
    where: { plateNumber: 'GJ 01 CD 5678' },
    update: {},
    create: {
      id: 'veh_2',
      userId: user.id,
      make: 'Hyundai',
      model: 'Creta 1.5 SX(O)',
      year: 2023,
      plateNumber: 'GJ 01 CD 5678',
      color: 'Polar White',
      type: 'suv',
      fuelType: 'Petrol',
    },
  });

  // 3. Seed Providers
  const provider1 = await prisma.provider.upsert({
    where: { email: 'shreeautocare@roadresq.in' },
    update: {},
    create: {
      id: 'prov_1',
      name: 'Shree Auto Care (Rajesh Patel)',
      email: 'shreeautocare@roadresq.in',
      phone: '+91 98250 12345',
      passwordHash: '$2a$10$7EqJtq98hPqEX7fNZaFWoOhi59/U1V1hZJjN9r5gP0.9XmD36lDwe',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      vehicleType: 'Mobile Service Van',
      vehiclePlate: 'GJ 01 TC 7711',
      rating: 4.88,
      jobsCompleted: 842,
      earningsTotal: 142500.0,
      status: 'AVAILABLE',
      verificationStatus: 'VERIFIED',
      currentLat: 23.0225,
      currentLng: 72.5714,
    },
  });

  // Seed Capabilities
  await prisma.providerCapability.createMany({
    data: [
      { providerId: provider1.id, skillType: 'FLAT_TYRE', baseRate: 350.0 },
      { providerId: provider1.id, skillType: 'DEAD_BATTERY', baseRate: 450.0 },
      { providerId: provider1.id, skillType: 'OUT_OF_FUEL', baseRate: 400.0 },
      { providerId: provider1.id, skillType: 'MECHANICAL', baseRate: 650.0 },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Database Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
