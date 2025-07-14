"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, BarChart3, Activity } from "lucide-react";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";

interface BrutalTabsProps {
  linkManagerContent: React.ReactNode;
  analyticsContent: React.ReactNode;
  socialContent: React.ReactNode;
}

export const BrutalTabs = ({
  linkManagerContent,
  analyticsContent,
  socialContent,
}: BrutalTabsProps) => {
  return (
    <div className="space-y-6">
      <BrutalBox
        variant="destructive"
        className="inline-block p-3 transform -rotate-1"
      >
        <GlitchText
          className="text-xl font-black uppercase tracking-wider text-white"
          intensity="medium"
          trigger="hover"
        >
          � BRUTAL DOMINATION CONSOLE �
        </GlitchText>
      </BrutalBox>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-12 bg-background border-4 border-foreground p-1">
          <TabsTrigger
            value="links"
            className="flex items-center justify-center space-x-1 sm:space-x-2 font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Link className="h-4 w-4" />
            <span className="hidden sm:inline">Weapon Forge</span>
            <span className="sm:hidden">Forge</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center justify-center space-x-1 sm:space-x-2 font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Kill Count</span>
            <span className="sm:hidden">Kills</span>
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="flex items-center justify-center space-x-1 sm:space-x-2 font-black uppercase tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Brutal Networks</span>
            <span className="sm:hidden">Networks</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="links" className="space-y-4 overflow-hidden w-full">
          <ShakeElement intensity="low" trigger="hover" className="w-full">
            <BrutalBox className="p-6 w-full">
              <div className="space-y-4">
                <GlitchText
                  className="text-2xl font-black uppercase"
                  intensity="medium"
                  trigger="hover"
                >
                  ⚔️ BRUTAL WEAPON FOUNDRY
                </GlitchText>
                <p className="font-bold uppercase tracking-wide opacity-70 text-sm">
                  Craft devastating links and unleash digital chaos upon the
                  world
                </p>
              </div>
              <div className="mt-6">{linkManagerContent}</div>
            </BrutalBox>
          </ShakeElement>
        </TabsContent>

        <TabsContent
          value="analytics"
          className="space-y-4 overflow-hidden w-full"
        >
          <ShakeElement intensity="low" trigger="hover" className="w-full">
            <BrutalBox variant="destructive" className="p-6">
              <div className="space-y-4">
                <GlitchText
                  className="text-2xl font-black uppercase text-white"
                  intensity="medium"
                  trigger="hover"
                >
                  � CARNAGE ANALYTICS
                </GlitchText>
                <p className="font-bold uppercase tracking-wide opacity-80 text-sm text-white">
                  Witness the digital bloodbath and count your digital victims
                </p>
              </div>
              <div className="mt-6">{analyticsContent}</div>
            </BrutalBox>
          </ShakeElement>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 w-full">
          <ShakeElement intensity="low" trigger="hover" className="w-full">
            <BrutalBox variant="warning" className="p-6">
              <div className="space-y-4">
                <GlitchText
                  className="text-2xl font-black uppercase"
                  intensity="medium"
                  trigger="hover"
                >
                  🩸 SOCIAL WARFARE HUB
                </GlitchText>
                <p className="font-bold uppercase tracking-wide opacity-70 text-sm">
                  Dominate social platforms and establish your brutal digital
                  presence
                </p>
              </div>
              <div className="mt-6">{socialContent}</div>
            </BrutalBox>
          </ShakeElement>
        </TabsContent>
      </Tabs>
    </div>
  );
};
