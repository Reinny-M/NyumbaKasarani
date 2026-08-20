// lib/gating.ts
// Central place for the "is this user subscribed" + field-stripping logic,
// so every API route enforces it the same way (never trust the client).

import { prisma } from "./prisma";

export async function hasActiveSubscription(userId: string | undefined): Promise<boolean> {
  if (!userId) return false;
  const active = await prisma.subscription.findFirst({
    where: { userId, expiresAt: { gt: new Date() } },
  });
  return !!active;
}

// Strips exactLocation/caretakerContact from a property unless unlocked.
export function applyGating<T extends { exactLocation: string | null; caretakerContact: string | null }>(
  property: T,
  unlocked: boolean
): T {
  if (unlocked) return property;
  return { ...property, exactLocation: null, caretakerContact: null };
}
