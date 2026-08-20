// app/api/landlord/properties/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "You must be signed in to add a property." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, category, subLocationId, price, images, amenities, exactLocation, caretakerContact } = body;

    if (!title || !category || !subLocationId || !price || !exactLocation || !caretakerContact) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const property = await prisma.property.create({
      data: {
        landlordId: userId,
        title,
        category,
        subLocationId,
        price: parseInt(price, 10),
        images: images || [],
        amenities: amenities || [],
        exactLocation,
        caretakerContact,
        status: "pending", // always starts pending — admin must approve before it's public
      },
    });

    return NextResponse.json({ id: property.id });
  } catch (err) {
    console.error("Add property error:", err);
    return NextResponse.json({ error: "Something went wrong submitting your property." }, { status: 500 });
  }
}
