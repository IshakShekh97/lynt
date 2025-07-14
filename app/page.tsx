import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import Navigation from "@/components/landing/Navigation";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { BrutalThemesSection } from "@/components/landing/BrutalThemesSection";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <WhyChooseSection />
      <BrutalThemesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Home;
