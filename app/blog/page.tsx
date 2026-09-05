import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { blogPostsData } from "@/data/blog";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Travel Blog & Destination Advice | My Krishna Travels",
  description: "Read expert travel advice, destination guides, itinerary tips, and travel news for Kashmir, Himachal, Goa, Kerala, Dubai, and Bali.",
};

export default function BlogPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            Travel Insights
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-navy tracking-tight">
            Travel Blog & Guides
          </h1>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            Expert tips, destination insights, and practical advice to make your journey memorable.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {blogPostsData.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-[14px] overflow-hidden border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-4 left-4 bg-primary-blue text-white text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-brand-muted font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-bright-blue" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-bright-blue" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-navy group-hover:text-primary-blue transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-brand-muted line-clamp-3 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-brand-border/60 mt-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary-blue hover:text-primary-hover pt-3"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}

