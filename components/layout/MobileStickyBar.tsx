"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
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
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 h-[64px] px-3 py-2 flex items-center gap-2.5 shadow-lg">
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsApp}
        className="flex-1 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-semibold text-sm h-[44px] rounded-[8px] flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98]"
      >
        <MessageCircle className="w-4 h-4 fill-current stroke-none" />
        <span>WhatsApp</span>
      </a>

      <Link
        href="/customize"
        onClick={handleQuote}
        className="flex-1 bg-primary-blue hover:bg-primary-hover text-white font-semibold text-sm h-[44px] rounded-[8px] flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98] text-center"
      >
        <Sparkles className="w-4 h-4" />
        <span>Get Free Quote</span>
      </Link>
    </div>
  );
}

