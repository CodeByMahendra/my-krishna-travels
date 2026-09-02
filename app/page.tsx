import React from "react";
import HeroSection from "@/components/home/HeroSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import PackagesSection from "@/components/home/PackagesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import CustomizedTravelCTA from "@/components/home/CustomizedTravelCTA";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import GallerySection from "@/components/home/GallerySection";
import InstagramSection from "@/components/home/InstagramSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DestinationsSection />
      <PackagesSection />
      <WhyChooseUs />
      <HowItWorks />
      <CustomizedTravelCTA />
      <TestimonialsSection />
      <GallerySection />
      <InstagramSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
