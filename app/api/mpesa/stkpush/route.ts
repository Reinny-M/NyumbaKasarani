// app/api/mpesa/stkpush/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getMpesaAccessToken, getMpesaTimestamp, getMpesaPassword, MPESA_BASE_URL } from "@/lib/mpesa";
import { prisma } from "@/lib/prisma";

const SUBSCRIPTION_PRICE = 250; // Ksh, matches the "Ksh 250 for 7 days" shown in the UI
const SUBSCRIPTION_DAYS = 7;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "You must be signed in to subscribe." }, { status: 401 });
  }

  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber || !/^254\d{9}$/.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Enter a valid phone number in the format 2547XXXXXXXX." },
        { status: 400 }
      );
    }

    const accessToken = await getMpesaAccessToken();
    const timestamp = getMpesaTimestamp();
    const password = getMpesaPassword(timestamp);
    const shortcode = process.env.MPESA_SHORTCODE!;
    const callbackUrl = process.env.MPESA_CALLBACK_URL!;

    const res = await fetch(`${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: SUBSCRIPTION_PRICE,
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: "NyumbaCheck",
        TransactionDesc: "Subscription",
      }),
    });

    const data = await res.json();

    if (!res.ok || data.errorCode) {
      console.error("STK Push error:", data);
      return NextResponse.json(
        { error: data.errorMessage || "Failed to initiate payment." },
        { status: 400 }
      );
    }

    // Log the checkout request so the callback can find it later
    await prisma.paymentLog.create({
      data: {
        checkoutRequestId: data.CheckoutRequestID,
        userId,
        status: "pending",
      },
    });

    return NextResponse.json({
      success: true,
      checkoutRequestId: data.CheckoutRequestID,
    });
  } catch (err) {
    console.error("STK Push route error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
