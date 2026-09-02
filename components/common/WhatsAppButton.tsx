"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
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
        className={`fixed bottom-20 right-5 md:bottom-6 md:right-6 z-50 flex items-center gap-2.5 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white p-3.5 md:px-5 md:py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 group ${className}`}
      >
        <MessageCircle className="w-6 h-6 text-white fill-current stroke-none" />
        <span className="hidden md:inline font-semibold text-sm tracking-wide">
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
        className={`inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-semibold h-[46px] px-6 rounded-[8px] shadow-xs transition-colors duration-200 ${className}`}
      >
        <MessageCircle className="w-5 h-5 fill-current stroke-none" />
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
        className={`inline-flex items-center gap-1.5 text-brand-whatsapp hover:text-brand-whatsappHover font-semibold text-sm ${className}`}
      >
        <MessageCircle className="w-4 h-4 fill-current stroke-none" />
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
      className={`inline-flex items-center justify-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-semibold h-[44px] px-5 rounded-[8px] shadow-xs transition-colors duration-200 ${className}`}
    >
      <MessageCircle className="w-4 h-4 fill-current stroke-none" />
      <span>{text}</span>
    </a>
  );
}
