// app/api/properties/[id]/claim/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const userName = session?.user?.name || "A tenant";

  if (!userId) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const property = await prisma.property.findUnique({ where: { id: params.id } });
  if (!property) {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  await prisma.property.update({
    where: { id: params.id },
    data: { pendingConfirmation: true, claimedByUserId: userId },
  });

  await prisma.notification.create({
    data: {
      userId: property.landlordId,
      message: `${userName} says they've taken "${property.title}". Confirm on your My Properties page to remove it from listings.`,
    },
  });

  return NextResponse.json({ success: true });
}
