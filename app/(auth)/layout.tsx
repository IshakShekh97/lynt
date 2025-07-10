import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-dvh flex items-center justify-center">
      {children}
      <ThemeSwitcher className="fixed bottom-10 right-10" />
    </div>
  );
};

export default AuthLayout;
