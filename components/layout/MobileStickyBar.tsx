"use client";

import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackQuoteRequest } from "@/lib/tracking";

export default function MobileStickyBar() {
  const handleWhatsApp = () => {
    trackWhatsAppClick("MobileStickyBar");
  };

  const handleQuote = () => {
    trackQuoteRequest("General", "MobileStickyBar");
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3.5 py-2.5 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[max(0.625rem,env(safe-area-inset-bottom))]">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex-1 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold text-xs sm:text-sm h-[44px] rounded-xl flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(37,211,102,0.28)] transition-transform active:scale-[0.97]"
      >
        <WhatsAppIcon className="w-4 h-4 text-white" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/customize"
        onClick={handleQuote}
        className="flex-1 bg-gradient-to-r from-primary-blue to-indigo-600 hover:from-primary-hover hover:to-indigo-700 text-white font-bold text-xs sm:text-sm h-[44px] rounded-xl flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(11,99,206,0.3)] transition-transform active:scale-[0.97] text-center"
      >
        <Sparkles className="w-4 h-4 text-amber-300" />
        <span>Plan My Trip</span>
      </Link>
    </div>
  );
}

