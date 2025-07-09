"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings, ExternalLink, BarChart3, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { LinkList } from "@/components/links/LinkList";
import { getLinksForProfile } from "@/lib/actions/link.action";
import type { Link } from "@/lib/actions/link.action";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [links, setLinks] = useState<Link[]>([]);
  const [linksLoading, setLinksLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const loadLinks = useCallback(async () => {
    if (!session?.user?.id) return;

    try {
      setLinksLoading(true);
      const userLinks = await getLinksForProfile(session.user.id);
      setLinks(userLinks);
    } catch (error) {
      console.error("Error loading links:", error);
    } finally {
      setLinksLoading(false);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user?.id) {
      loadLinks();
    }
  }, [session?.user?.id, loadLinks]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const publicUrl = `${window.location.origin}/${session.user.id}`;

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {session.user.name}!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your links and customize your profile.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Links
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {links.length}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <ExternalLink className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Active Links
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {links.filter((link) => link.isActive).length}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Clicks
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {links.reduce((total, link) => total + link.clicks, 0)}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Links Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Links</CardTitle>
              <CardDescription>
                Add, edit, and reorder your links. Drag and drop to reorder
                them.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {linksLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading links...</p>
                </div>
              ) : (
                <LinkList
                  links={links}
                  userId={session.user.id}
                  onRefresh={loadLinks}
                />
              )}
            </CardContent>
          </Card>

          {/* Profile Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Preview</CardTitle>
              <CardDescription>
                See how your profile looks to visitors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Public URL</h4>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md flex items-center justify-between">
                    <code className="text-sm flex-1 mr-2 truncate">
                      {publicUrl}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(publicUrl, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <h5 className="font-medium mb-3">Live Preview</h5>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    <LinkList
                      links={links}
                      userId={session.user.id}
                      isPreview={true}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
