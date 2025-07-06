"use client";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { incrementLinkClick } from "@/lib/actions/link.action";

interface ProfileLinkProps {
  link: {
    id: string;
    title: string;
    url: string;
    description: string | null;
    iconUrl: string | null;
    emoji: string | null;
  };
  buttonColor: string;
  buttonTextColor: string;
}

export function ProfileLink({
  link,
  buttonColor,
  buttonTextColor,
}: ProfileLinkProps) {
  const handleClick = async () => {
    try {
      await incrementLinkClick(link.id);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <Card
      className="transition-all duration-200 hover:scale-102 cursor-pointer"
      style={{
        backgroundColor: buttonColor,
        color: buttonTextColor,
        borderColor: buttonColor,
      }}
    >
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {link.emoji ? (
            <span className="text-2xl flex-shrink-0 w-6 h-6 flex items-center justify-center">
              {link.emoji}
            </span>
          ) : link.iconUrl ? (
            <div className="w-6 h-6 relative flex-shrink-0">
              <Image
                src={link.iconUrl}
                alt={`${link.title} icon`}
                width={24}
                height={24}
                className="rounded-sm object-cover"
              />
            </div>
          ) : null}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{link.title}</h3>
            {link.description && (
              <p className="text-sm opacity-80 truncate">{link.description}</p>
            )}
          </div>

          <ExternalLink className="h-4 w-4 flex-shrink-0 opacity-60" />
        </div>
      </Link>
    </Card>
  );
}
