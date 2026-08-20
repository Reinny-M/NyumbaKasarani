// Seed script — run with: npx prisma db seed
// Populates the initial Location + Sub-Locations for launch (around Kasarani TVC, Kamulu)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const location = await prisma.location.upsert({
    where: { name: "Kasarani TVC (Kamulu)" },
    update: {},
    create: { name: "Kasarani TVC (Kamulu)" },
  });

  const subLocationNames = [
    "Kamulu Town",
    "Reflector Inn",
    "Around School Gate",
    "Upper Waterfall",
    "Near Waecon Supermarket",
    "Kamulu Field",
    "Sayendri",
    "Near Cooperative Bank",
  ];

  for (const name of subLocationNames) {
    await prisma.subLocation.upsert({
      where: { locationId_name: { locationId: location.id, name } },
      update: {},
      create: { name, locationId: location.id },
    });
  }

  console.log(`Seeded location "${location.name}" with ${subLocationNames.length} sub-locations.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
