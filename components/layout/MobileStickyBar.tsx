"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Landmark, Sparkles } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick, trackQuoteRequest } from "@/lib/tracking";

export default function MobileStickyBar() {
  const pathname = usePathname();

  const handleWhatsApp = () => {
    trackWhatsAppClick("MobileBottomNav");
  };

  const isHome = pathname === "/";
  const isPackages = pathname === "/packages" && !pathname.includes("pilgrimage");
  const isCustomize = pathname === "/customize";
  const isSpiritual = pathname.includes("pilgrimage");

  return (
    <nav
      aria-label="Mobile Navigation Bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_25px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors flex-1 ${
            isHome ? "text-primary-blue font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className={`w-5 h-5 transition-transform ${isHome ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">Home</span>
        </Link>

        {/* 2. Packages */}
        <Link
          href="/packages"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors flex-1 ${
            isPackages ? "text-primary-blue font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Compass className={`w-5 h-5 transition-transform ${isPackages ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">Packages</span>
        </Link>

        {/* 3. Center Action: Plan Trip */}
        <Link
          href="/customize"
          onClick={() => trackQuoteRequest("General", "MobileBottomNav")}
          className="flex flex-col items-center justify-center -mt-4 px-1.5 flex-1 group"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-red to-rose-500 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(227,38,46,0.45)] ring-4 ring-white transition-transform active:scale-95 group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300/30" />
          </div>
          <span className="text-[10px] mt-1 font-bold text-brand-red tracking-tight">Plan Trip</span>
        </Link>

        {/* 4. Spiritual Yatra */}
        <Link
          href="/packages?theme=pilgrimage"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors flex-1 ${
            isSpiritual ? "text-primary-blue font-bold" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Landmark className={`w-5 h-5 transition-transform ${isSpiritual ? "scale-110 stroke-[2.5]" : "stroke-[1.8]"}`} />
          <span className="text-[10px] mt-1 font-medium tracking-tight">Spiritual</span>
        </Link>

        {/* 5. WhatsApp */}
        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors flex-1 text-slate-500 hover:text-emerald-600"
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <WhatsAppIcon className="w-[19px] h-[19px] text-[#25D366]" />
          </div>
          <span className="text-[10px] mt-1 font-medium text-emerald-600 tracking-tight">WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
