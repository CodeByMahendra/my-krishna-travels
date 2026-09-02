import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-slate-300 pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Logo & Overview */}
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-[8px] inline-block shadow-sm">
              <div className="relative h-11 w-48">
                <Image
                  src="/images/logo.png"
                  alt="My Krishna Travels.in"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              My Krishna Travels is a dedicated tours and travel agency specializing in personalized domestic and international travel planning. Your journey, our responsibility.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary-blue flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-whatsapp flex items-center justify-center text-slate-200 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-primary-blue pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
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
                  Customize Your Trip
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
                  Traveller Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-300 hover:text-bright-blue transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Destinations */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-bright-blue pl-3">
              Popular Destinations
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/destinations/kashmir" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Kashmir Packages
                </Link>
              </li>
              <li>
                <Link href="/destinations/manali" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Manali & Himachal
                </Link>
              </li>
              <li>
                <Link href="/destinations/goa" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Goa Beach Holidays
                </Link>
              </li>
              <li>
                <Link href="/destinations/kerala" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Kerala Backwaters
                </Link>
              </li>
              <li>
                <Link href="/destinations/dubai" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Dubai Luxury Tour
                </Link>
              </li>
              <li>
                <Link href="/destinations/bali" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Bali Honeymoon Specials
                </Link>
              </li>
              <li>
                <Link href="/destinations/rajasthan" className="text-slate-300 hover:text-bright-blue transition-colors">
                  Rajasthan Royal Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider border-l-3 border-brand-whatsapp pl-3">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-bright-blue mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs">Call Us:</p>
                  <a href={`tel:${siteConfig.phoneNumber}`} className="text-white hover:underline font-medium">
                    {siteConfig.phoneNumber}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-brand-whatsapp mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs">WhatsApp Support:</p>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-whatsapp hover:underline font-medium"
                  >
                    Send Instant Message
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-bright-blue mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs">Email Us:</p>
                  <a href={`mailto:${siteConfig.contactEmail}`} className="text-white hover:underline font-medium">
                    {siteConfig.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-red mt-1 shrink-0" />
                <div>
                  <p className="text-slate-400 text-xs">Office Address:</p>
                  <span className="text-slate-300 text-xs leading-snug">
                    {siteConfig.businessAddress}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {siteConfig.domain}. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
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
