import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { email: "reinhardbabere@gmail.com" } });
  const subLocation = await prisma.subLocation.findFirst({ where: { name: "Kamulu Town" } });

  if (!user || !subLocation) {
    console.error("Missing user or sublocation — check the data exists.");
    return;
  }

  const property = await prisma.property.create({
    data: {
      landlordId: user.id,
      subLocationId: subLocation.id,
      title: "Test Bedsitter",
      category: "bedsitter",
      price: 6000,
      images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"],
      amenities: ["Security Guard", "Water inclusive of rent"],
      exactLocation: "Near Kamulu Stage",
      caretakerContact: "0712345678",
      status: "approved",
      featured: true,
    },
  });

  console.log("Created property:", property.id);
}

main().finally(() => prisma.$disconnect());
