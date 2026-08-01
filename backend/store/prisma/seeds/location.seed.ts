import { PrismaClient } from '@prisma/client';

export async function seedLocation(prisma: PrismaClient) {
  console.log('🌱 Seeding Locations...');

  const warehouses = await prisma.warehouse.findMany();

  const warehouseMap = Object.fromEntries(
    warehouses.map((w) => [w.code, w.id]),
  );

  const locations = [
    // =========================
    // Main Warehouse
    // =========================
    { code: 'A1', name: 'Rack A1', warehouse: 'MAIN' },
    { code: 'A2', name: 'Rack A2', warehouse: 'MAIN' },
    { code: 'A3', name: 'Rack A3', warehouse: 'MAIN' },
    { code: 'A4', name: 'Rack A4', warehouse: 'MAIN' },

    { code: 'B1', name: 'Rack B1', warehouse: 'MAIN' },
    { code: 'B2', name: 'Rack B2', warehouse: 'MAIN' },
    { code: 'B3', name: 'Rack B3', warehouse: 'MAIN' },
    { code: 'B4', name: 'Rack B4', warehouse: 'MAIN' },

    { code: 'C1', name: 'Rack C1', warehouse: 'MAIN' },
    { code: 'C2', name: 'Rack C2', warehouse: 'MAIN' },
    { code: 'C3', name: 'Rack C3', warehouse: 'MAIN' },
    { code: 'C4', name: 'Rack C4', warehouse: 'MAIN' },

    { code: 'DAMAGE', name: 'Damage Area', warehouse: 'MAIN' },
    { code: 'QC', name: 'Quality Check', warehouse: 'MAIN' },
    { code: 'DISPATCH', name: 'Dispatch Zone', warehouse: 'MAIN' },
    { code: 'RECEIVING', name: 'Receiving Dock', warehouse: 'MAIN' },

    // =========================
    // Retail Store
    // =========================
    { code: 'COUNTER', name: 'Counter Stock', warehouse: 'STORE' },
    { code: 'DISPLAY', name: 'Display Rack', warehouse: 'STORE' },
    { code: 'BACKROOM', name: 'Back Room', warehouse: 'STORE' },
    { code: 'STORE-RET', name: 'Return Shelf', warehouse: 'STORE' },

    // =========================
    // Online Warehouse
    // =========================
    { code: 'ONLINE-A1', name: 'Online Rack A1', warehouse: 'ONLINE' },
    { code: 'ONLINE-A2', name: 'Online Rack A2', warehouse: 'ONLINE' },
    { code: 'PACKING', name: 'Packing Area', warehouse: 'ONLINE' },
    { code: 'SHIPPING', name: 'Shipping Zone', warehouse: 'ONLINE' },

    // =========================
    // Return Warehouse
    // =========================
    { code: 'RETURN-1', name: 'Return Rack 1', warehouse: 'RETURN' },
    { code: 'RETURN-2', name: 'Return Rack 2', warehouse: 'RETURN' },
    { code: 'REFURB', name: 'Refurbishment Area', warehouse: 'RETURN' },
    { code: 'SCRAP', name: 'Scrap Storage', warehouse: 'RETURN' },

    // =========================
    // School Store
    // =========================
    { code: 'UNI-1', name: 'Uniform Rack', warehouse: 'SCHOOL' },
    { code: 'BOOK-1', name: 'Book Shelf', warehouse: 'SCHOOL' },
    { code: 'STAT-1', name: 'Stationery Rack', warehouse: 'SCHOOL' },
    { code: 'SHOE-1', name: 'Shoe Section', warehouse: 'SCHOOL' },
    { code: 'BAG-1', name: 'Bag Section', warehouse: 'SCHOOL' },
    { code: 'SPORT-1', name: 'Sports Shelf', warehouse: 'SCHOOL' },
  ];

  for (const location of locations) {
    await prisma.location.upsert({
      where: {
        code: location.code,
      },
      update: {
        name: location.name,
        warehouseId: warehouseMap[location.warehouse],
      },
      create: {
        code: location.code,
        name: location.name,
        warehouseId: warehouseMap[location.warehouse],
      },
    });
  }

  console.log(`✅ ${locations.length} Locations Seeded`);
}