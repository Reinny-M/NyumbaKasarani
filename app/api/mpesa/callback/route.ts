// app/api/mpesa/callback/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const SUBSCRIPTION_DAYS = 7;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode;

    const existingLog = await prisma.paymentLog.findUnique({
      where: { checkoutRequestId },
    });

    if (!existingLog) {
      console.error("No matching PaymentLog for", checkoutRequestId);
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (resultCode !== 0) {
      // Payment failed or was cancelled
      await prisma.paymentLog.update({
        where: { checkoutRequestId },
        data: { status: "failed", rawCallbackPayload: body },
      });
      return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    // Payment succeeded — extract the M-Pesa receipt number and amount
    const items = callback.CallbackMetadata?.Item || [];
    const getValue = (name: string) => items.find((i: any) => i.Name === name)?.Value;

    const mpesaReceipt = getValue("MpesaReceiptNumber");
    const amount = getValue("Amount");

    await prisma.paymentLog.update({
      where: { checkoutRequestId },
      data: { status: "success", rawCallbackPayload: body },
    });

    if (existingLog.userId) {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + SUBSCRIPTION_DAYS);

      await prisma.subscription.create({
        data: {
          userId: existingLog.userId,
          mpesaReceipt: mpesaReceipt || null,
          amount: amount || 0,
          durationDays: SUBSCRIPTION_DAYS,
          expiresAt,
        },
      });

      await prisma.notification.create({
        data: {
          userId: existingLog.userId,
          message: "Your subscription is now active! You have full access for 7 days.",
        },
      });
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (err) {
    console.error("M-Pesa callback error:", err);
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
}
