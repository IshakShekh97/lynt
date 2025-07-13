import React from "react";
import { Metadata } from "next";
import { PublicProfilePage } from "@/components/public/PublicProfilePage";
import { UsernameNotFound } from "@/components/public/UsernameNotFound";
import { getPublicUserProfile } from "@/lib/actions/public-profile.action";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const user = await getPublicUserProfile(username);

  if (!user) {
    return {
      title: `@${username} - Username Available | LYNTBRUTT`,
      description: `The username @${username} is available! Claim it now and build your brutal online presence with LYNTBRUTT - the most aggressive link management platform.`,
      keywords: [
        "username available",
        "claim username",
        "link management",
        "social media",
        "digital presence",
        username,
        "brutal design",
        "LYNTBRUTT",
      ],
      openGraph: {
        title: `@${username} - Username Available | LYNTBRUTT`,
        description: `The username @${username} is available! Claim it now and build your brutal online presence.`,
        type: "website",
        locale: "en_US",
        siteName: "LYNTBRUTT",
      },
      twitter: {
        card: "summary_large_image",
        title: `@${username} - Username Available | LYNTBRUTT`,
        description: `The username @${username} is available! Claim it now and build your brutal online presence.`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: `${user.displayUsername || user.name} (@${user.username}) - LYNTBRUTT`,
    description:
      user.bio ||
      `Check out ${user.displayUsername || user.name}'s brutal link collection on LYNTBRUTT - the most aggressive link management platform.`,
    keywords: [
      "link management",
      "social media",
      "digital presence",
      user.username,
      user.name,
      "brutal design",
    ],
    authors: [{ name: user.name }],
    creator: user.name,
    openGraph: {
      title: `${user.displayUsername || user.name} - LYNTBRUTT`,
      description:
        user.bio ||
        `Check out ${user.displayUsername || user.name}'s brutal link collection`,
      type: "profile",
      locale: "en_US",
      siteName: "LYNTBRUTT",
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.displayUsername || user.name} - LYNTBRUTT`,
      description:
        user.bio ||
        `Check out ${user.displayUsername || user.name}'s brutal link collection`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

const page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;

  if (!username) {
    return <UsernameNotFound username={username || "unknown"} />;
  }

  const user = await getPublicUserProfile(username);

  if (!user) {
    return <UsernameNotFound username={username} />;
  }

  return <PublicProfilePage user={user} />;
};

export default page;
