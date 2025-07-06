import { notFound } from "next/navigation";
import { getProfileWithLinks } from "@/lib/actions/profile.action";
import { ProfileLink } from "@/components/profile/ProfileLink";
import Image from "next/image";

interface ProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params;

  const profile = await getProfileWithLinks(userId);

  if (!profile || !profile.isPublic) {
    notFound();
  }

  const activeLinks = profile.links.filter((link) => link.isActive);

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{
        backgroundColor: profile.backgroundColor,
        color: profile.textColor,
        backgroundImage: profile.backgroundImage
          ? `url(${profile.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {profile.user?.image && (
            <div className="w-24 h-24 mx-auto mb-4 relative overflow-hidden rounded-full">
              <Image
                src={profile.user.image}
                alt={profile.user.name || "Profile"}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-2xl font-bold mb-2">
            {profile.user?.displayName || profile.user?.name || "Anonymous"}
          </h1>

          {profile.user?.bio && (
            <p className="text-sm opacity-80 mb-4">{profile.user.bio}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {activeLinks.map((link) => (
            <ProfileLink
              key={link.id}
              link={link}
              buttonColor={profile.buttonColor}
              buttonTextColor={profile.buttonTextColor}
            />
          ))}
        </div>

        {activeLinks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg opacity-60">No links available</p>
          </div>
        )}

        {/* Custom CSS */}
        {profile.customCss && (
          <style dangerouslySetInnerHTML={{ __html: profile.customCss }} />
        )}

        {/* Footer */}
        <div className="text-center mt-12 opacity-60">
          <p className="text-sm">Powered by Lynt</p>
        </div>
      </div>
    </div>
  );
}
