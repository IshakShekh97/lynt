"use client";

import { useState } from "react";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useSession, signOut } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 dark:bg-background/95 backdrop-blur-sm border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <ShakeElement intensity="medium" trigger="hover">
              <Link href="/" className="block">
                <BrutalBox
                  variant="destructive"
                  className="p-3 transform -rotate-1 hover:rotate-1 transition-transform duration-300"
                >
                  <GlitchText
                    className="text-2xl font-black text-white tracking-wider"
                    intensity="high"
                    trigger="hover"
                  >
                    💀 LYNTBRUTT 💀
                  </GlitchText>
                </BrutalBox>
              </Link>
            </ShakeElement>
          </div>

          {/* Desktop Navigation - Only Auth Related */}
          <div className="hidden md:flex items-center space-x-6">
            {session && (
              <ShakeElement intensity="low" trigger="hover">
                <Link href="/dashboard">
                  <BrutalBox
                    variant={pathname === "/dashboard" ? "warning" : "default"}
                    className="px-4 py-2 transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="font-bold text-sm tracking-wider uppercase">
                      🔥 DASHBOARD
                    </span>
                  </BrutalBox>
                </Link>
              </ShakeElement>
            )}
          </div>

          {/* Right side items */}
          <div className="hidden md:flex items-center space-x-4">
            <ShakeElement intensity="low" trigger="hover">
              <BrutalBox className="p-2">
                <ThemeSwitcher />
              </BrutalBox>
            </ShakeElement>

            {!isPending && !session && (
              <div className="flex space-x-3">
                <ShakeElement intensity="low" trigger="hover">
                  <Link href="/sign-in">
                    <BrutalBox
                      variant="default"
                      className="px-4 py-2 hover:scale-105 transition-transform duration-200"
                    >
                      <span className="font-bold text-sm tracking-wider uppercase">
                        🔓 SIGN IN
                      </span>
                    </BrutalBox>
                  </Link>
                </ShakeElement>
                <ShakeElement intensity="medium" trigger="hover">
                  <Link href="/sign-up">
                    <BrutalBox
                      variant="destructive"
                      className="px-4 py-2 hover:scale-105 transition-transform duration-200"
                    >
                      <span className="font-bold text-sm tracking-wider uppercase text-white">
                        💥 JOIN THE CHAOS
                      </span>
                    </BrutalBox>
                  </Link>
                </ShakeElement>
              </div>
            )}

            {session && (
              <ShakeElement intensity="low" trigger="hover">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0"
                    >
                      <BrutalBox className="p-1">
                        <Avatar className="h-8 w-8 border-2 border-foreground">
                          <AvatarImage
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? ""}
                          />
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                            {session.user.name?.charAt(0)?.toUpperCase() ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                      </BrutalBox>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 border-4 border-foreground bg-background"
                    align="end"
                    forceMount
                  >
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-bold text-sm">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-foreground" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 font-bold cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>🔥 DASHBOARD</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-foreground" />
                    <DropdownMenuItem
                      className="flex items-center gap-2 font-bold cursor-pointer text-destructive focus:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>💀 SIGN OUT</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </ShakeElement>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <ShakeElement intensity="high" trigger="hover">
              <BrutalBox variant="destructive" className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMenu}
                  className="text-white hover:bg-red-600"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </BrutalBox>
            </ShakeElement>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t-4 border-foreground bg-background/95 backdrop-blur-sm"
          >
            <div className="px-2 pt-2 pb-3 space-y-3">
              {session && (
                <ShakeElement intensity="low" trigger="hover">
                  <Link
                    href="/dashboard"
                    className="block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <BrutalBox
                      variant={
                        pathname === "/dashboard" ? "warning" : "default"
                      }
                      className="w-full p-3 text-center"
                    >
                      <span className="font-bold text-lg tracking-wider uppercase">
                        🔥 DASHBOARD
                      </span>
                    </BrutalBox>
                  </Link>
                </ShakeElement>
              )}

              <div className="pt-3 border-t-2 border-foreground">
                <BrutalBox className="p-3 text-center mb-3">
                  <ThemeSwitcher />
                </BrutalBox>

                {!isPending && !session && (
                  <div className="space-y-3">
                    <ShakeElement intensity="low" trigger="hover">
                      <Link
                        href="/sign-in"
                        className="block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BrutalBox
                          variant="default"
                          className="w-full p-3 text-center"
                        >
                          <span className="font-bold text-lg tracking-wider uppercase">
                            🔓 SIGN IN
                          </span>
                        </BrutalBox>
                      </Link>
                    </ShakeElement>
                    <ShakeElement intensity="medium" trigger="hover">
                      <Link
                        href="/sign-up"
                        className="block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BrutalBox
                          variant="destructive"
                          className="w-full p-3 text-center"
                        >
                          <span className="font-bold text-lg tracking-wider uppercase text-white">
                            💥 JOIN THE CHAOS
                          </span>
                        </BrutalBox>
                      </Link>
                    </ShakeElement>
                  </div>
                )}

                {session && (
                  <div className="space-y-3">
                    <BrutalBox variant="warning" className="p-3 text-center">
                      <p className="font-bold text-sm">
                        👋 Hey, {session.user.name}!
                      </p>
                    </BrutalBox>
                    <ShakeElement intensity="low" trigger="hover">
                      <Link
                        href="/dashboard"
                        className="block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <BrutalBox
                          variant="default"
                          className="w-full p-3 text-center"
                        >
                          <span className="font-bold text-lg tracking-wider uppercase">
                            🔥 DASHBOARD
                          </span>
                        </BrutalBox>
                      </Link>
                    </ShakeElement>
                    <ShakeElement intensity="medium" trigger="hover">
                      <Button
                        variant="ghost"
                        className="w-full p-0"
                        onClick={handleSignOut}
                      >
                        <BrutalBox
                          variant="destructive"
                          className="w-full p-3 text-center"
                        >
                          <span className="font-bold text-lg tracking-wider uppercase text-white">
                            💀 SIGN OUT
                          </span>
                        </BrutalBox>
                      </Button>
                    </ShakeElement>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
