"use client";

import { FloatingGeometricShapes } from "../landing/FloatingGeometricShapes";
import { EnhancedLinkManager } from "./EnhancedLinkManager";
import { useRouter } from "next/navigation";

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  emoji?: string | null;
  isActive: boolean;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  order: number;
}

interface LinkManagerWrapperProps {
  links: Link[];
  userId: string;
}

export function LinkManagerWrapper({ links, userId }: LinkManagerWrapperProps) {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="relative">
      <FloatingGeometricShapes />
      <EnhancedLinkManager
        links={links}
        userId={userId}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
