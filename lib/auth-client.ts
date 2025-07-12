import { createAuthClient } from "better-auth/react";
import { usernameClient, multiSessionClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  plugins: [
    usernameClient(),
    multiSessionClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const { signIn, signUp, signOut, useSession, getSession, updateUser } =
  authClient;
