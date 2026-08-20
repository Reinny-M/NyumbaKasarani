// app/api/sub-locations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const subLocations = await prisma.subLocation.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(subLocations);
}
