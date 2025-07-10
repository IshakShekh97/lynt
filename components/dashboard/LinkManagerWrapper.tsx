"use client";

import { useState, useEffect } from "react";
import { LinkManager } from "@/components/dashboard/LinkManager";
import { getLinks } from "@/lib/actions/links.action";
import { Skeleton } from "@/components/ui/skeleton";

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

export const LinkManagerWrapper = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLinks = async () => {
    try {
      const result = await getLinks();
      if (result.success && result.data) {
        setLinks(result.data);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return <LinkManager links={links} onRefresh={fetchLinks} />;
};
