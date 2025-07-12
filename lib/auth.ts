import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { sendVerificationEmail, sendPasswordResetEmail } from "./email";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url, token }) => {
      await sendPasswordResetEmail({
        email: user.email,
        url,
        token,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendVerificationEmail({
        email: user.email,
        url,
        token,
      });
    },
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
      sendChangeEmailVerification: async ({ user, url, token }) => {
        await sendVerificationEmail({
          email: user.email, // Send to current email for security
          url,
          token,
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url, token }) => {
        await sendVerificationEmail({
          email: user.email,
          url,
          token,
        });
      },
    },
  },
  plugins: [username(), nextCookies()],
});

export const { getSession } = auth.api;
