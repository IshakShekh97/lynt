import Navigation from "@/components/landing/Navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navigation />
      <div className="container mx-auto my-10 max-sm:px-3">{children}</div>
    </div>
  );
};

export default DashboardLayout;
