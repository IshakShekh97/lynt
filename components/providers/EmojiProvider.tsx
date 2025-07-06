"use client";

import { useEffect } from "react";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

export function EmojiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize emoji data once on mount
    init({ data });
  }, []);

  return <>{children}</>;
}
