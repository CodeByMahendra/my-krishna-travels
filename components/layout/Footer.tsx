import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 pt-10 sm:pt-16 pb-28 md:pb-12 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-800">
          {/* Column 1: Logo & Overview */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            {/* White pill box now correctly hosts the brand logo with explicit dimensions */}
            <div className="bg-white px-3.5 py-2 rounded-xl inline-flex items-center shadow-md">
              <div className="relative h-[42px] w-[170px] sm:h-[48px] sm:w-[210px]">
                <Image
                  src="/images/logo.png"
                  alt="My Krishna Travels.in"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              My Krishna Travels is a dedicated tours and travel agency specializing in personalized domestic and international travel planning. Your journey, our responsibility.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-primary-blue flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-brand-whatsapp flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 & 3: Quick Links & Top Destinations (2-col on mobile for compact viewing) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-8">
            {/* Quick Links */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-l-3 border-primary-blue pl-2.5">
                Quick Links
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Tour Packages
                  </Link>
                </li>
                <li>
                  <Link href="/customize" className="text-bright-blue hover:text-white font-semibold transition-colors">
                    Plan My Trip
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-slate-300 hover:text-bright-blue transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            {/* Top Destinations */}
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-l-3 border-bright-blue pl-2.5">
                Top Places
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link href="/packages?theme=pilgrimage" className="text-amber-300 hover:text-amber-200 transition-colors font-medium">
                    🛕 Spiritual Yatra
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/mathura" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Mathura & Vrindavan
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/kashmir" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Kashmir Escape
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/goa" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Goa Beach Tours
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/manali" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Manali & Himachal
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/kerala" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Kerala Backwaters
                  </Link>
                </li>
                <li>
                  <Link href="/destinations/dubai" className="text-slate-300 hover:text-bright-blue transition-colors">
                    Dubai Luxury
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider border-l-3 border-brand-whatsapp pl-2.5">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-bright-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[11px]">Call Us:</p>
                  <a href={`tel:${siteConfig.phoneNumber}`} className="text-white hover:underline font-semibold">
                    {siteConfig.phoneNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-brand-whatsapp mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[11px]">WhatsApp Support:</p>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-whatsapp hover:underline font-semibold"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-bright-blue mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[11px]">Email Us:</p>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:underline font-medium break-all">
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-red mt-0.5 shrink-0" />
                <div>
                  <p className="text-slate-400 text-[11px]">Office Address:</p>
                  <span className="text-slate-300 text-xs leading-snug">
                    {siteConfig.businessAddress}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© 2026 {siteConfig.domain}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/cancellation-policy" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
