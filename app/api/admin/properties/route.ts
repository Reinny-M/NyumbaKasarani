// app/api/admin/properties/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as any)?.role;
  if (!session || role !== "admin") {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const properties = await prisma.property.findMany({
    where: { status: "pending" },
    include: { landlord: true, subLocation: { include: { location: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(properties);
}
