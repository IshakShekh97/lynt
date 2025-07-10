import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      {children}
      <ThemeSwitcher className="fixed bottom-10 right-10" />
    </div>
  );
};

export default AuthLayout;
