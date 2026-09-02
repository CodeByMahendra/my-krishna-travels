import React from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function InstagramSection() {
  const instaPosts = [
    {
      id: "insta-1",
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80",
      likes: "1.2k",
      caption: "Snowy Gulmarg paradise! Customized Kashmir packages available now.",
    },
    {
      id: "insta-2",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
      likes: "2.4k",
      caption: "Dubai skyline vibes! Book your dream Dubai holiday with us.",
    },
    {
      id: "insta-3",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
      likes: "980",
      caption: "Alleppey backwaters luxury houseboat experience. Tag your travel partner!",
    },
    {
      id: "insta-4",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
      likes: "1.8k",
      caption: "Floating breakfast in Bali! Specialized honeymoon itineraries.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            <Instagram className="w-3.5 h-3.5 text-bright-blue" />
            <span>@mykrishnatravels.in</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Follow Our Journey
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            Get travel inspiration, real traveller photos, and special package updates on Instagram.
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instaPosts.map((post) => (
            <a
              key={post.id}
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[14px] overflow-hidden shadow-subtle border border-brand-border bg-navy aspect-square"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-75"
              />

              <div className="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6 text-white">
                <div className="flex justify-end">
                  <ExternalLink className="w-5 h-5 text-bright-blue" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs line-clamp-3 leading-relaxed">{post.caption}</p>
                  <div className="flex items-center gap-4 text-xs font-semibold pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4 fill-brand-red text-brand-red" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      Comment
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] px-7 rounded-[8px] shadow-xs transition-colors text-sm sm:text-base active:scale-[0.98]"
          >
            <Instagram className="w-5 h-5" />
            <span>Follow Us on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
