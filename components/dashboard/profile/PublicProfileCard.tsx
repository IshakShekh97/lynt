"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Share2 } from "lucide-react";
import { toast } from "sonner";
import { User as UserType } from "better-auth";
import { BrutalBox, ShakeElement } from "@/components/ui/brutal-effects";

interface PublicProfileCardProps {
  user: UserType & {
    username?: string;
    bio?: string;
  };
}

export function PublicProfileCard({ user }: PublicProfileCardProps) {
  const profileUrl = `${window.location.origin}/${user.username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      toast.success("Profile URL copied to clipboard!");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  const openProfile = () => {
    window.open(profileUrl, "_blank");
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name}'s Lynt Profile`,
          text: `Check out ${user.name}'s profile on Lynt!`,
          url: profileUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      <BrutalBox className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg">Your Public Profile</h4>
            <p className="text-sm text-muted-foreground">
              This is how others will see your profile
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                Profile URL
              </Label>
              <div className="flex items-center gap-2 mt-1">
                <Badge
                  variant="outline"
                  className="text-sm font-mono border-2 border-black bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  lynt.app/{user.username}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="h-8 w-8 p-0 hover:bg-yellow-400 hover:border-2 hover:border-black"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t-2 border-dashed border-black/20">
              <div className="space-y-2">
                <p className="font-bold text-lg">{user.name}</p>
                {user.bio && (
                  <p className="text-muted-foreground text-sm">{user.bio}</p>
                )}
                <div className="text-xs text-muted-foreground">
                  Member since {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrutalBox>

      <div className="flex gap-3">
        <ShakeElement>
          <Button
            onClick={openProfile}
            variant="outline"
            className="flex-1 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </ShakeElement>

        <ShakeElement>
          <Button
            onClick={shareProfile}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </ShakeElement>
      </div>
    </div>
  );
}

function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <label className={className}>{children}</label>;
}
