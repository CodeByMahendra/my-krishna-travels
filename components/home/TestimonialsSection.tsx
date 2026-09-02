import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-light-bg border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-primary-blue font-bold text-xs uppercase tracking-wider bg-light-blue px-3.5 py-1 rounded-full border border-primary-blue/15">
            Real Traveller Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            What Our Travellers Say
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            Read how we helped families, couples, and friends plan memorable holidays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonialsData.map((item) => (
            <div
              key={item.id}
              className="bg-white p-7 sm:p-8 rounded-[14px] border border-brand-border shadow-card hover:shadow-card-hover transition-all duration-200 relative flex flex-col justify-between space-y-6"
            >
              <Quote className="w-10 h-10 text-primary-blue/10 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-3.5 relative z-10">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-brand-dark leading-relaxed italic font-normal">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              {/* Customer Info */}
              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-primary-blue shrink-0 shadow-xs">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-navy flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.verified && (
                        <CheckCircle2 className="w-4 h-4 text-brand-whatsapp" />
                      )}
                    </h4>
                    <p className="text-xs text-brand-muted font-medium">
                      {item.location} • Traveled to{" "}
                      <span className="font-semibold text-primary-blue">{item.destination}</span>
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-brand-muted font-medium hidden sm:inline">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/testimonials"
            className="text-xs sm:text-sm font-bold text-primary-blue hover:text-primary-hover hover:underline"
          >
            Read All Testimonials & Review Stories →
          </Link>
        </div>
      </div>
    </section>
  );
}

