import { PrismaClient } from "@/lib/generated/prisma/client";

const createPrisma = () =>
  new PrismaClient({
    accelerateUrl: process.env.ACCELERATE_URL!, // required in Prisma 7 when using Accelerate
   
  });

type PrismaInstance = ReturnType<typeof createPrisma>;

declare global {
  // allow global `var prisma` in dev
  var prisma: PrismaInstance | undefined;
}

export const prisma = globalThis.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;