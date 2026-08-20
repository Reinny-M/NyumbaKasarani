// app/api/properties/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasActiveSubscription, applyGating } from "@/lib/gating";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const unlocked = await hasActiveSubscription(userId);

  const property = await prisma.property.findUnique({
    where: { id: params.id },
    include: {
      subLocation: { include: { location: true } },
      ratings: true,
      comments: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!property || property.status !== "approved") {
    return NextResponse.json({ error: "Property not found." }, { status: 404 });
  }

  return NextResponse.json(applyGating(property, unlocked));
}
