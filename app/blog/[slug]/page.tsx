import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, User } from "lucide-react";
import { blogPostsData } from "@/data/blog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FinalCTA from "@/components/home/FinalCTA";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <article className="bg-white rounded-[14px] overflow-hidden shadow-card border border-brand-border p-6 sm:p-12 mb-16 space-y-8">
          <div className="space-y-4">
            <span className="bg-primary-blue text-white text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider inline-block shadow-xs">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted font-medium border-b border-brand-border/60 pb-4">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-bright-blue" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-bright-blue" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-bright-blue" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-[14px] overflow-hidden shadow-card bg-slate-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Post Content */}
          <div className="prose max-w-none text-brand-dark space-y-4 text-xs sm:text-base leading-relaxed font-normal">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* CTA Box inside blog */}
          <div className="bg-light-bg p-6 rounded-[14px] border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold text-navy text-sm sm:text-base">Inspired to plan this trip?</h3>
              <p className="text-xs text-brand-muted font-normal">Get a customized itinerary quote directly over WhatsApp.</p>
            </div>
            <WhatsAppButton variant="accent" text="Chat with Advisor" source={`Blog-${post.slug}`} className="py-2 px-5 rounded-[8px] text-xs h-[40px]" />
          </div>
        </article>
      </div>

      <FinalCTA />
    </div>
  );
}

