"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { BrutalLoadingSpinner } from "@/components/ui/brutal-loading-spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  GlitchText,
  BrutalBox,
  ShakeElement,
} from "@/components/ui/brutal-effects";
import { Badge } from "@/components/ui/badge";
import { SignUp } from "@/lib/actions/auth.action";
import { signUpSchema, type SignUpFormValues } from "@/lib/zodSchemas";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    setIsLoading(true);

    try {
      const result = await SignUp(
        values.email,
        values.password,
        values.name,
        values.username
      );

      if (result.success) {
        toast.success(result.message);
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
        delay: 0.1,
      }}
      className="w-full max-w-md"
    >
      {/* Frosted Glass Container */}
      <BrutalBox
        variant="default"
        className="brutal-frosted-glass brutal-form-container relative overflow-hidden"
      >
        {/* Glitch overlay for extra brutal effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

        <div className="relative z-10 p-8">
          {/* Header Section */}
          <div className="space-y-6 mb-8">
            <div className="text-center">
              <ShakeElement intensity="low" trigger="hover">
                <BrutalBox
                  variant="warning"
                  className="inline-block p-2 mb-4 brutal-badge-pulse"
                >
                  <Badge className="text-xs px-3 py-1 font-black tracking-wider border-2 border-black bg-yellow-400 text-black hover:bg-yellow-300 transition-colors duration-200 dark:bg-yellow-600 dark:text-white dark:border-white dark:hover:bg-yellow-500">
                    ⚡ JOIN THE MAYHEM ⚡
                  </Badge>
                </BrutalBox>
              </ShakeElement>
            </div>

            <div className="text-center space-y-2">
              <GlitchText
                className="text-3xl font-black tracking-tight uppercase"
                intensity="medium"
                trigger="hover"
              >
                <h1>CREATE</h1>
              </GlitchText>

              <BrutalBox
                variant="destructive"
                className="inline-block p-2 transform rotate-2 hover:-rotate-2 transition-transform duration-300"
              >
                <GlitchText
                  className="text-2xl font-black tracking-tight text-white uppercase"
                  intensity="high"
                  trigger="hover"
                >
                  CHAOS
                </GlitchText>
              </BrutalBox>

              <BrutalBox className="inline-block p-3 transform -rotate-1 hover:rotate-1 transition-transform duration-300">
                <p className="text-sm font-bold tracking-wide uppercase text-muted-foreground">
                  START YOUR BRUTAL JOURNEY
                </p>
              </BrutalBox>
            </div>
          </div>

          {/* Form Section */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-wide">
                      👤 Full Name
                    </FormLabel>
                    <FormControl>
                      <BrutalBox className="p-0 border-2">
                        <Input
                          placeholder="John Destroyer"
                          autoComplete="name"
                          disabled={isLoading}
                          className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                          {...field}
                        />
                      </BrutalBox>
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-wide">
                      ⚡ Username (Unique)
                    </FormLabel>
                    <FormControl>
                      <BrutalBox className="p-0 border-2">
                        <Input
                          placeholder="chaosmaster97"
                          autoComplete="username"
                          disabled={isLoading}
                          className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                          {...field}
                        />
                      </BrutalBox>
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-wide">
                      💀 Email Address
                    </FormLabel>
                    <FormControl>
                      <BrutalBox className="p-0 border-2">
                        <Input
                          placeholder="your.email@mayhem.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                          {...field}
                        />
                      </BrutalBox>
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-wide">
                      🔐 Password
                    </FormLabel>
                    <FormControl>
                      <BrutalBox className="p-0 border-2">
                        <PasswordInput
                          placeholder="••••••••••••"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                          {...field}
                        />
                      </BrutalBox>
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase tracking-wide">
                      🔒 Confirm Password
                    </FormLabel>
                    <FormControl>
                      <BrutalBox className="p-0 border-2">
                        <PasswordInput
                          placeholder="••••••••••••"
                          autoComplete="new-password"
                          disabled={isLoading}
                          className="brutal-input border-0 bg-transparent focus:ring-0 focus:ring-offset-0 font-bold"
                          {...field}
                        />
                      </BrutalBox>
                    </FormControl>
                    <FormMessage className="font-bold" />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <ShakeElement intensity="medium" trigger="hover">
                  <BrutalBox variant="warning" glitchOnHover={true}>
                    <Button
                      type="submit"
                      className="w-full px-6 py-4 text-lg font-black uppercase tracking-wide border-0 bg-transparent text-black dark:text-white hover:bg-yellow-400/20 transition-all duration-200"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <BrutalLoadingSpinner className="mr-2" size="md" />
                          CREATING CHAOS...
                        </>
                      ) : (
                        "🚀 UNLEASH THE CHAOS 🚀"
                      )}
                    </Button>
                  </BrutalBox>
                </ShakeElement>
              </div>
            </form>
          </Form>

          {/* Footer Section */}
          <div className="mt-8 text-center">
            <BrutalBox className="inline-block p-3 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
              <p className="text-sm font-bold tracking-wide">
                ALREADY IN THE CHAOS?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary hover:text-primary/80 font-black uppercase underline decoration-2 underline-offset-2"
                >
                  💥 ENTER NOW
                </Link>
              </p>
            </BrutalBox>
          </div>
        </div>
      </BrutalBox>
    </motion.div>
  );
};

export default SignUpForm;
