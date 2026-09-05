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
            ? "shadow-nav py-1.5 border-b border-slate-200/90"
            : "border-b border-slate-100 py-2 md:py-2.5"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[64px] md:h-[76px]">
          {/* LEFT: Official Brand Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative h-[52px] w-[190px] sm:h-[62px] sm:w-[230px] md:h-[72px] md:w-[270px] flex items-center">
              <Image
                src="/images/logo.png"
                alt="My Krishna Travels.in"
                fill
                priority
                className="object-contain object-left transition-transform duration-200 hover:scale-[1.03]"
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
            {/* Sleek WhatsApp Button with Real WhatsApp Icon */}
            <WhatsAppButton
              variant="button"
              text="WhatsApp"
              source="Header"
              className="h-[38px] px-3.5 text-xs sm:text-sm font-bold rounded-lg shadow-[0_2px_10px_rgba(37,211,102,0.28)] hover:shadow-[0_4px_14px_rgba(37,211,102,0.42)] transition-all duration-200 active:scale-[0.98]"
            />

            {/* Premium Plan My Trip CTA */}
            <Link
              href="/customize"
              className="group relative overflow-hidden bg-gradient-to-r from-primary-blue via-[#1070e3] to-indigo-600 hover:from-primary-hover hover:via-primary-blue hover:to-indigo-700 text-white text-xs sm:text-sm font-bold h-[38px] px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-[0_2px_10px_rgba(11,99,206,0.32)] hover:shadow-[0_4px_16px_rgba(11,99,206,0.45)] active:scale-[0.98]"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
              <Compass className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300 shrink-0" />
              <span className="tracking-wide">Plan My Trip</span>
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
        <>
          {/* Overlay backdrop */}
          <div
            className="lg:hidden fixed inset-0 top-[64px] bg-black/50 backdrop-blur-xs z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="lg:hidden fixed inset-x-0 top-[64px] bg-white z-50 shadow-2xl border-b border-slate-200 animate-in slide-in-from-top duration-250 max-h-[calc(100vh-64px)] overflow-y-auto rounded-b-2xl">
            <div className="px-5 pt-4 pb-8 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-4 py-3 text-base font-bold rounded-xl transition-all ${
                      isActive
                        ? "text-primary-blue bg-light-blue shadow-xs"
                        : "text-slate-800 hover:bg-slate-50 hover:text-primary-blue"
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] uppercase font-extrabold bg-brand-red text-white rounded-md shadow-xs">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <Link
                  href="/customize"
                  className="w-full bg-gradient-to-r from-primary-blue via-[#1070e3] to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white font-bold h-[48px] rounded-xl flex items-center justify-center gap-2 text-sm shadow-[0_4px_14px_rgba(11,99,206,0.3)] active:scale-[0.98] transition-all"
                >
                  <Compass className="w-5 h-5 text-amber-300" />
                  <span>Plan My Trip</span>
                </Link>
                <WhatsAppButton variant="accent" text="WhatsApp Us" source="MobileDrawer" className="w-full h-[48px] rounded-xl text-sm font-bold shadow-[0_4px_14px_rgba(37,211,102,0.3)]" />
              </div>

              <div className="pt-4 text-xs text-slate-500 space-y-1.5 text-center font-medium bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                <p>📞 Call Support: <a href={`tel:${siteConfig.phoneNumber}`} className="text-navy font-bold hover:underline">{siteConfig.phoneNumber}</a></p>
                <p>✉️ Email: <a href={`mailto:${siteConfig.contactEmail}`} className="text-navy font-bold hover:underline">{siteConfig.contactEmail}</a></p>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

