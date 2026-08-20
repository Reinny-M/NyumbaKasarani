// app/api/properties/route.ts
// GET /api/properties?locationId=&subLocationId=&category=&maxPrice=
// Returns approved properties, with exactLocation/caretakerContact stripped
// unless the requester has an active subscription.

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasActiveSubscription, applyGating } from "@/lib/gating";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subLocationId = searchParams.get("subLocationId") || undefined;
  const category = searchParams.get("category") || undefined;
  const maxPrice = searchParams.get("maxPrice");

  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const unlocked = await hasActiveSubscription(userId);

  const properties = await prisma.property.findMany({
    where: {
      status: "approved",
      rented: false,
      ...(subLocationId ? { subLocationId } : {}),
      ...(category ? { category: category as any } : {}),
      ...(maxPrice ? { price: { lte: parseInt(maxPrice, 10) } } : {}),
    },
    include: {
      subLocation: { include: { location: true } },
      ratings: true,
      _count: { select: { comments: true } },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const gated = properties.map((p) => applyGating(p, unlocked));

  return NextResponse.json(gated);
}
