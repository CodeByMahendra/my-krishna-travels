import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, HeartHandshake, UserCheck, Compass } from "lucide-react";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "About Us | Travel Made Personal",
  description: "Learn about My Krishna Travels - a dedicated tour & travel agency helping travellers plan memorable, customized domestic and international holidays.",
};

export default function AboutPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="bg-navy text-white rounded-[14px] p-8 sm:p-14 mb-16 relative overflow-hidden shadow-card">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
              alt="About Us Banner"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="bg-white/15 text-bright-blue text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight">
              Travel Made Personal.
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              My Krishna Travels is a dedicated tours and travel agency focused on helping travellers plan memorable, comfortable, and hassle-free journeys tailored to their unique preferences.
            </p>
          </div>
        </div>

        {/* Section: Who We Are & What We Do */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-5">
            <span className="text-primary-blue font-bold text-xs uppercase tracking-wider bg-light-blue px-3.5 py-1 rounded-full border border-primary-blue/15">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy leading-snug">
              Dedicated Travel Specialists Planning Your Dream Holidays
            </h2>
            <p className="text-brand-muted leading-relaxed text-sm sm:text-base font-normal">
              At My Krishna Travels, we believe that travel should be an enriching and personal experience. We don&apos;t force rigid, one-size-fits-all group packages. Instead, we listen to your destination goals, duration expectations, and budget requirements to design custom itineraries that work for you.
            </p>
            <p className="text-brand-muted leading-relaxed text-sm sm:text-base font-normal">
              Whether you are planning a romantic honeymoon in Kashmir or Bali, a fun-filled family vacation in Himachal or Kerala, or an adventurous international trip to Dubai, our team is committed to providing end-to-end guidance and personal support throughout your trip.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/customize"
                className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center gap-2 text-sm sm:text-base active:scale-[0.98]"
              >
                <Compass className="w-5 h-5" />
                <span>Plan Your Trip With Us</span>
              </Link>
            </div>
          </div>

          <div className="relative h-[380px] sm:h-[420px] rounded-[14px] overflow-hidden shadow-card border border-brand-border bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80"
              alt="Kashmir Valley Travel"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Section: Our Approach */}
        <div className="bg-white rounded-[14px] p-8 sm:p-12 border border-brand-border shadow-card mb-20">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">Our Approach to Travel</h2>
            <p className="text-brand-muted text-sm sm:text-base font-normal">
              How we ensure every journey is memorable, safe, and tailored for our travellers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="space-y-3 p-6 bg-light-bg rounded-[14px] border border-brand-border">
              <div className="w-12 h-12 rounded-[8px] bg-light-blue flex items-center justify-center text-primary-blue">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy">1. Customer-Centric Planning</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
                We start by understanding your travel style, dietary preferences, hotel standards, and budget before designing any itinerary.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-light-bg rounded-[14px] border border-brand-border">
              <div className="w-12 h-12 rounded-[8px] bg-light-blue flex items-center justify-center text-primary-blue">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy">2. Quality Ground Support</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
                We partner with verified hotels, experienced local drivers, and reliable ground partners to ensure safety and comfort.
              </p>
            </div>

            <div className="space-y-3 p-6 bg-light-bg rounded-[14px] border border-brand-border">
              <div className="w-12 h-12 rounded-[8px] bg-light-blue flex items-center justify-center text-primary-blue">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-navy">3. Honest & Transparent</h3>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-normal">
                Clear communication regarding package costs, inclusions, and exclusions with zero unexpected surprises during your trip.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <WhyChooseUs />
      </div>

      <FinalCTA />
    </div>
  );
}

