import Navigation from "@/components/landing/Navigation";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default DashboardLayout;
