import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brutalist Themes - LYNTBRUTT",
  description:
    "Explore our collection of 30 premium brutalist themes with animated patterns",
};

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
