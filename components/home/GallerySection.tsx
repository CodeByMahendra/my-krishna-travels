import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, MapPin } from "lucide-react";
import { galleryData } from "@/data/gallery";

export default function GallerySection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            <Camera className="w-3.5 h-3.5 text-bright-blue" />
            <span>Travel Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Moments Worth Travelling For
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            A glance at breathtaking destinations and memorable travel experiences.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          {galleryData.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="relative h-60 sm:h-72 rounded-[14px] overflow-hidden shadow-subtle hover:shadow-card group border border-brand-border"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-semibold uppercase bg-primary-blue px-2 py-0.5 rounded text-white inline-block mb-1.5 shadow-xs">
                  {item.category}
                </span>
                <h4 className="text-xs sm:text-sm font-bold leading-tight line-clamp-1">{item.title}</h4>
                <p className="text-[11px] text-slate-300 flex items-center gap-1 mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 text-bright-blue" />
                  <span>{item.location}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-navy hover:bg-navy-dark text-white font-semibold h-[48px] px-7 rounded-[8px] shadow-xs transition-colors text-sm sm:text-base active:scale-[0.98]"
          >
            <span>Explore Full Photo Gallery</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

