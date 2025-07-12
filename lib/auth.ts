import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username, multiSession } from "better-auth/plugins";
import { emailService } from "./email";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    // provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Making it optional as requested
    sendResetPassword: async ({ user, url }) => {
      await emailService.sendPasswordReset(user, url);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await emailService.sendEmailVerification(user, url);
    },
    sendOnSignUp: false, // We'll trigger manually from profile
    autoSignInAfterVerification: false,
  },
  user: {
    additionalFields: {
      bio: {
        type: "string",
        required: false,
        description: "A short bio about yourself",
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url }) => {
        await emailService.sendEmailChangeConfirmation(user, newEmail, url);
      },
    },
  },
  plugins: [username(), multiSession(), nextCookies()],
});

export const { getSession } = auth.api;
