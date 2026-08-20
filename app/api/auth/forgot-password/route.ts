// app/api/auth/forgot-password/route.ts
// Step 1 of password reset: user submits their email, we generate a token.
//
// NOTE: This does not send a real email yet — it logs the reset link to the
// server console for local development. Wiring up a real email service
// (e.g. Resend, SendGrid) is a small follow-up task before this goes live.

import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return a generic success message, even if no account exists —
    // this prevents leaking which emails are registered.
    if (!user || !user.passwordHash) {
      return NextResponse.json({
        message: "If an account exists for this email, a reset link has been sent.",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 minutes

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

    // TODO: replace with a real email send once an email provider is configured
    console.log(`Password reset link for ${email}: ${resetUrl}`);

    return NextResponse.json({
      message: "If an account exists for this email, a reset link has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
