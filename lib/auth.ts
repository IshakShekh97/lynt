import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  plugins: [nextCookies()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: true,
        unique: true,
      },
      displayName: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
    },
    deleteUser: {
      enabled: true,
      beforeDelete: async (user) => {
        // Log user deletion for audit purposes
        console.log(`User ${user.id} (${user.email}) is being deleted`);
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookiePrefix: "lynt",
    defaultCookieAttributes: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
    // Better IP tracking for security
    ipAddress: {
      ipAddressHeaders: ["x-forwarded-for", "x-real-ip", "cf-connecting-ip"],
      disableIpTracking: false,
    },
    // Database optimizations for SQLite
    database: {
      defaultFindManyLimit: 100,
    },
  },
  rateLimit: {
    enabled: true, // Always enable rate limiting for security
    window: 60, // 60 seconds
    max: process.env.NODE_ENV === "production" ? 50 : 100, // Stricter in production
    storage: "database", // Use database storage for persistence
    customRules: {
      "/api/auth/sign-in": {
        window: 300, // 5 minutes
        max: 5, // 5 login attempts per 5 minutes
      },
      "/api/auth/sign-up": {
        window: 600, // 10 minutes
        max: 3, // 3 signup attempts per 10 minutes
      },
    },
  },
});

export const { getSession } = auth.api;
