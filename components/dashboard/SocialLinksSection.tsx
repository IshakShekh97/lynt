"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  Github,
  Link,
  Save,
  Trash2,
} from "lucide-react";
import {
  getSocialLinks,
  upsertSocialLink,
  toggleSocialLinkStatus,
  deleteSocialLink,
} from "@/lib/actions/social-links.action";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

interface SocialPlatform {
  name: string;
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  baseUrl: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "instagram",
    label: "Instagram",
    icon: <Instagram className="h-5 w-5" />,
    placeholder: "your-username",
    baseUrl: "https://instagram.com/",
  },
  {
    name: "twitter",
    label: "Twitter",
    icon: <Twitter className="h-5 w-5" />,
    placeholder: "your-username",
    baseUrl: "https://twitter.com/",
  },
  {
    name: "facebook",
    label: "Facebook",
    icon: <Facebook className="h-5 w-5" />,
    placeholder: "your-username",
    baseUrl: "https://facebook.com/",
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin className="h-5 w-5" />,
    placeholder: "your-username",
    baseUrl: "https://linkedin.com/in/",
  },
  {
    name: "youtube",
    label: "YouTube",
    icon: <Youtube className="h-5 w-5" />,
    placeholder: "your-channel",
    baseUrl: "https://youtube.com/@",
  },
  {
    name: "github",
    label: "GitHub",
    icon: <Github className="h-5 w-5" />,
    placeholder: "your-username",
    baseUrl: "https://github.com/",
  },
];

export default function SocialLinksSection() {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingStates, setSavingStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      const response = await getSocialLinks();
      if (response.success && response.data) {
        setSocialLinks(response.data);
      }
    } catch (error) {
      console.error("Error fetching social links:", error);
      toast.error("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (platform: string, url: string) => {
    setSocialLinks((prev) => {
      const existing = prev.find((link) => link.platform === platform);
      if (existing) {
        return prev.map((link) =>
          link.platform === platform ? { ...link, url } : link
        );
      } else {
        return [
          ...prev,
          {
            id: `temp-${platform}`,
            platform,
            url,
            isActive: true,
          },
        ];
      }
    });
  };

  const handleToggleActive = async (platform: string) => {
    try {
      setSocialLinks((prev) =>
        prev.map((link) =>
          link.platform === platform
            ? { ...link, isActive: !link.isActive }
            : link
        )
      );

      await toggleSocialLinkStatus(platform);
      toast.success("Social link status updated");
    } catch (error) {
      console.error("Error toggling social link:", error);
      toast.error("Failed to update social link status");
    }
  };

  const handleSave = async (platform: string) => {
    try {
      setSavingStates((prev) => ({ ...prev, [platform]: true }));

      const link = socialLinks.find((l) => l.platform === platform);
      if (!link || !link.url.trim()) {
        toast.error("Please enter a valid URL");
        return;
      }

      await upsertSocialLink(platform, link.url, link.isActive);
      toast.success("Social link saved successfully");

      // Refresh the data
      await fetchSocialLinks();
    } catch (error) {
      console.error("Error saving social link:", error);
      toast.error("Failed to save social link");
    } finally {
      setSavingStates((prev) => ({ ...prev, [platform]: false }));
    }
  };

  const handleDelete = async (platform: string) => {
    try {
      setSocialLinks((prev) =>
        prev.filter((link) => link.platform !== platform)
      );

      await deleteSocialLink(platform);
      toast.success("Social link deleted successfully");
    } catch (error) {
      console.error("Error deleting social link:", error);
      toast.error("Failed to delete social link");
    }
  };

  const getSocialLinkData = (platform: string) => {
    return socialLinks.find((link) => link.platform === platform);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Social Brutees</CardTitle>
          <CardDescription>Loading your social media links...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {socialPlatforms.map((platform) => {
        const linkData = getSocialLinkData(platform.name);
        const isActive = linkData?.isActive ?? true;
        const url = linkData?.url ?? "";
        const isSaving = savingStates[platform.name] || false;

        return (
          <div key={platform.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {platform.icon}
                <Label className="text-sm font-medium">{platform.label}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isActive}
                  onCheckedChange={() => handleToggleActive(platform.name)}
                  disabled={!url.trim()}
                />
                <Label className="text-xs text-muted-foreground">
                  {isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder={`Enter your ${platform.label} URL`}
                  value={url}
                  onChange={(e) =>
                    handleUrlChange(platform.name, e.target.value)
                  }
                  className="pr-10"
                />
                {url && (
                  <Link className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                )}
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSave(platform.name)}
                disabled={!url.trim() || isSaving}
                className="shrink-0"
              >
                {isSaving ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
              </Button>

              {url && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(platform.name)}
                  className="shrink-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {url && (
              <p className="text-xs text-muted-foreground">
                Preview: {platform.baseUrl}
                {url}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
