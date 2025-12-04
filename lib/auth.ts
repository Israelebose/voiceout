import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

// Driver Adapter for Postgres
import { PrismaPg } from "@prisma/adapter-pg";
import { nextCookies } from "better-auth/next-js";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      enabled: true,
      clientId:process.env.GITHUB_ID as string ,
            clientSecret:process.env.GITHUB_SECRET as string,
    },
  },
  session: {
    expiresIn: 3600 * 1000, // Set the session to expire in 1 hour (in milliseconds)
  },
  plugins: [nextCookies()],
});
