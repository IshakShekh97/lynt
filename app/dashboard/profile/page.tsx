"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  User,
  Settings,
  Shield,
  Trash2,
  LogOut,
  Link as LinkIcon,
  BarChart3,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import {
  updateUserSettings,
  deleteUserAccount,
  revokeAllSessions,
  getUserAnalytics,
} from "@/lib/actions/profile.action";

interface AnalyticsData {
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  recentActivities: number;
  clicksThisWeek: number;
  clicksThisMonth: number;
  topLinks: Array<{
    id: string;
    title: string;
    url: string;
    clicks: number;
    emoji?: string | null;
  }>;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "",
    bio: "",
    username: "",
    email: "",
    image: "",
  });

  // Settings state
  const [settings, setSettings] = useState({
    profileVisible: true,
    showAnalytics: true,
    allowDirectMessages: false,
    emailNotifications: true,
  });

  // Initialize form with session data
  useEffect(() => {
    if (session?.user) {
      setProfileForm({
        name: session.user.name || "",
        bio: "", // Bio is not available in the session, will need to fetch separately
        username: session.user.username || "",
        email: session.user.email || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  // Load analytics when tab changes to analytics
  useEffect(() => {
    if (activeTab === "analytics" && !analytics) {
      loadAnalytics();
    }
  }, [activeTab, analytics]);

  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const result = await getUserAnalytics();
      if (result.success && result.data) {
        setAnalytics(result.data);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to load analytics");
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleSettingsUpdate = async () => {
    try {
      const result = await updateUserSettings(settings);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to update settings");
    }
  };

  const handleAccountDeletion = async () => {
    setIsLoading(true);
    try {
      const result = await deleteUserAccount("/goodbye");
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to initiate account deletion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully!");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const handleRevokeAllSessions = async () => {
    try {
      const result = await revokeAllSessions();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to revoke sessions");
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name}
            />
            <AvatarFallback className="text-2xl">
              {session.user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{session.user.name}</h1>
          <p className="text-muted-foreground">@{session.user.username}</p>
          {profileForm.bio && (
            <p className="text-sm text-muted-foreground max-w-md mx-auto mt-2">
              {profileForm.bio}
            </p>
          )}
        </div>
      </div>

      {/* Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings
            user={{
              name: session.user.name || "",
              email: session.user.email || "",
              username: session.user.username || "",
              bio: profileForm.bio,
              image: session.user.image || "",
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Public Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Profile URL</h4>
                  <p className="text-sm text-muted-foreground">
                    Your public Lynt profile
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    lynt.app/{session.user.username}
                  </Badge>
                  <Button variant="ghost" size="sm" className="ml-2">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {loadingAnalytics ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading analytics...</p>
            </div>
          ) : analytics ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {analytics.totalClicks}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Total Clicks
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {analytics.activeLinks}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Active Links
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {analytics.clicksThisWeek}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Clicks This Week
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Links</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.topLinks.length > 0 ? (
                      analytics.topLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {link.emoji || "🔗"}
                            </span>
                            <div>
                              <p className="font-medium">{link.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {link.url}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {link.clicks} clicks
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-muted-foreground py-4">
                        No links found. Create some links to see analytics!
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Failed to load analytics
                </p>
                <Button onClick={loadAnalytics} className="mt-2">
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch
                  checked={settings.profileVisible}
                  onCheckedChange={(checked) => {
                    setSettings((prev) => ({
                      ...prev,
                      profileVisible: checked,
                    }));
                    handleSettingsUpdate();
                  }}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Show Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Display view counts on your links
                  </p>
                </div>
                <Switch
                  checked={settings.showAnalytics}
                  onCheckedChange={(checked) => {
                    setSettings((prev) => ({
                      ...prev,
                      showAnalytics: checked,
                    }));
                    handleSettingsUpdate();
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => {
                    setSettings((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }));
                    handleSettingsUpdate();
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 inline mr-1" />
                      {session.session.userAgent || "Unknown Device"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 inline mr-1" />
                      Active now
                    </p>
                  </div>
                  <Badge>Current</Badge>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleRevokeAllSessions}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Revoke All Sessions
                </Button>
                <Button onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data.
                    This action cannot be undone.
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data from our
                        servers, including:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Your profile and all personal information</li>
                          <li>All your links and social media connections</li>
                          <li>Analytics data and statistics</li>
                          <li>Custom settings and preferences</li>
                        </ul>
                        <br />
                        We will send a verification email to confirm this
                        action.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleAccountDeletion}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={isLoading}
                      >
                        {isLoading ? "Processing..." : "Delete Account"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
