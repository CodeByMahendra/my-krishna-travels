"use client";

import React from "react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";

interface WhatsAppButtonProps {
  message?: string;
  source?: string;
  variant?: "floating" | "button" | "accent" | "compact";
  text?: string;
  className?: string;
}

export default function WhatsAppButton({
  message,
  source = "General",
  variant = "button",
  text = "WhatsApp Us",
  className = "",
}: WhatsAppButtonProps) {
  const href = getWhatsAppLink(message);

  const handleClick = () => {
    trackWhatsAppClick(source);
  };

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with us on WhatsApp"
        className={`hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2.5 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white px-5 py-3 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.55)] transition-all duration-200 hover:scale-105 group ${className}`}
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
        <span className="hidden md:inline font-bold text-sm tracking-wide">
          Chat on WhatsApp
        </span>
        <span className="relative flex h-2.5 w-2.5 -ml-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
      </a>
    );
  }

  if (variant === "accent") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold h-[46px] px-6 rounded-xl shadow-[0_3px_12px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_16px_rgba(37,211,102,0.45)] transition-all duration-200 active:scale-[0.98] ${className}`}
      >
        <WhatsAppIcon className="w-5 h-5 text-white" />
        <span>{text}</span>
      </a>
    );
  }

  if (variant === "compact") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`inline-flex items-center gap-1.5 text-brand-whatsapp hover:text-brand-whatsappHover font-bold text-sm transition-colors ${className}`}
      >
        <WhatsAppIcon className="w-4 h-4 text-brand-whatsapp" />
        {text && <span>{text}</span>}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-bold h-[40px] px-4 rounded-lg shadow-[0_2px_8px_rgba(37,211,102,0.25)] hover:shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-200 active:scale-[0.98] ${className}`}
    >
      <WhatsAppIcon className="w-4 h-4 text-white" />
      <span>{text}</span>
    </a>
  );
}
