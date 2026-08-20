// lib/prisma.ts
// Uses Neon's serverless driver in HTTP fetch mode (not WebSockets).
// WebSocket pooling kept dying under WARP's tunnel + Next.js dev hot-reloads
// ("Connection terminated unexpectedly"). Fetch mode sends each query as a
// plain HTTPS request instead of holding a persistent socket open — far more
// resilient for this environment.

import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

neonConfig.poolQueryViaFetch = true;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
