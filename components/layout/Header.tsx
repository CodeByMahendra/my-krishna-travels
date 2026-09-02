"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Sparkles, Compass } from "lucide-react";
import { siteConfig } from "@/lib/config";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Packages", href: "/packages" },
    { name: "Customize Trip", href: "/customize", badge: "AI PLAN" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-all duration-300">
      {/* Top Bar - Quick Info */}
      <div className="bg-navy text-white text-[11px] sm:text-xs py-1.5 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-bright-blue" />
              <span>Customized Tour Planning & Travel Assistance</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Phone className="w-3.5 h-3.5 text-bright-blue" />
              <a href={`tel:${siteConfig.phoneNumber}`} className="hover:underline font-medium">
                {siteConfig.phoneNumber}
              </a>
            </span>
            <span className="flex items-center gap-1.5 text-slate-200">
              <Mail className="w-3.5 h-3.5 text-bright-blue" />
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:underline font-medium">
                {siteConfig.contactEmail}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full bg-white transition-all duration-200 ${
          isScrolled
            ? "shadow-nav py-2 border-b border-slate-200/90"
            : "border-b border-slate-100 py-3 md:py-3.5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[56px] md:h-[64px]">
          {/* LEFT: Official Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-11 w-44 sm:h-13 sm:w-52 flex items-center">
              <Image
                src="/images/logo.png"
                alt="My Krishna Travels.in"
                fill
                priority
                className="object-contain object-left transition-transform duration-200 hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* CENTER: Sleek Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 text-[14px] font-semibold transition-colors duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-primary-blue font-bold"
                      : "text-slate-700 hover:text-primary-blue"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] tracking-wider uppercase font-extrabold bg-brand-red text-white rounded-[4px] shadow-xs">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-primary-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* RIGHT CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Sleek, Compact WhatsApp Button */}
            <WhatsAppButton
              variant="button"
              text="WhatsApp"
              source="Header"
              className="h-[36px] px-3 text-xs font-semibold rounded-[6px] shadow-2xs hover:bg-emerald-600"
            />

            {/* Primary Plan My Trip CTA */}
            <Link
              href="/customize"
              className="bg-primary-blue hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold h-[38px] px-4 rounded-[6px] transition-colors flex items-center gap-1.5 shadow-xs active:scale-[0.98]"
            >
              <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Plan My Trip</span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <WhatsAppButton variant="compact" text="" source="HeaderMobile" className="mr-1" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-primary-blue hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-brand-red" /> : <Menu className="w-6 h-6 text-navy" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-white border-b border-slate-200 shadow-xl z-50 animate-in slide-in-from-top duration-200 max-h-[calc(100vh-65px)] overflow-y-auto">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold rounded-md ${
                    isActive
                      ? "text-primary-blue font-bold bg-light-blue"
                      : "text-slate-700 hover:bg-slate-50 hover:text-primary-blue"
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-red text-white rounded">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <Link
                href="/customize"
                className="w-full bg-primary-blue hover:bg-primary-hover text-white text-center font-semibold h-[42px] rounded-[6px] flex items-center justify-center gap-2 text-sm shadow-xs"
              >
                <Compass className="w-4 h-4" />
                <span>Plan My Trip</span>
              </Link>
              <WhatsAppButton variant="accent" text="WhatsApp Us" source="MobileDrawer" className="w-full h-[42px] rounded-[6px] text-sm" />
            </div>

            <div className="pt-3 text-xs text-brand-muted space-y-1 text-center font-normal">
              <p>Call Us: <strong className="text-navy">{siteConfig.phoneNumber}</strong></p>
              <p>Email: <strong className="text-navy">{siteConfig.contactEmail}</strong></p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

