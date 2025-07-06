import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Auth form section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link href="/" className="inline-block">
              <Image
                src={"/logo.png"}
                alt="Lynt Logo"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Background/Welcome section */}
      <div className="hidden lg:flex lg:flex-1 bg-muted items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Welcome to Lynt</h2>
          <p className="text-xl text-muted-foreground max-w-md">
            Your comprehensive platform for modern development workflows
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
