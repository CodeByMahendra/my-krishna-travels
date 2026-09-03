"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, X, MapPin, Sparkles } from "lucide-react";

interface SocialProofItem {
  id: number;
  name: string;
  city: string;
  action: "inquired for" | "booked";
  packageName: string;
  timeAgo: string;
}

const SOCIAL_ITEMS: SocialProofItem[] = [
  {
    id: 1,
    name: "Amit Sharma",
    city: "Delhi",
    action: "inquired for",
    packageName: "Ujjain Mahakal & Omkareshwar Yatra",
    timeAgo: "2 mins ago",
  },
  {
    id: 2,
    name: "Rohit & Neha",
    city: "Mumbai",
    action: "booked",
    packageName: "Kashmir Paradise Escape (6D/5N)",
    timeAgo: "14 mins ago",
  },
  {
    id: 3,
    name: "Vikas Patel",
    city: "Ahmedabad",
    action: "inquired for",
    packageName: "Goa Beach Holiday & Water Sports",
    timeAgo: "7 mins ago",
  },
  {
    id: 4,
    name: "Pooja Verma",
    city: "Bangalore",
    action: "inquired for",
    packageName: "Manali & Solang Valley Adventure",
    timeAgo: "19 mins ago",
  },
  {
    id: 5,
    name: "Suresh Gupta",
    city: "Indore",
    action: "booked",
    packageName: "Kerala Houseboat & Munnar Tour",
    timeAgo: "28 mins ago",
  },
  {
    id: 6,
    name: "Rajesh K.",
    city: "Pune",
    action: "inquired for",
    packageName: "Dubai International Luxury Package",
    timeAgo: "35 mins ago",
  },
];

export default function SocialProofTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    // Show initial toast after 4s
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => {
      clearTimeout(initialTimer);
    };
  }, [dismissed]);

  useEffect(() => {
    if (dismissed || !visible || isHovered) return;

    // Automatically hide after 6 seconds of display
    const autoHideTimer = setTimeout(() => {
      setVisible(false);

      // Wait 10 seconds, then advance and show next
      const nextShowTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % SOCIAL_ITEMS.length);
        setVisible(true);
      }, 10000);

      return () => clearTimeout(nextShowTimer);
    }, 6000);

    return () => clearTimeout(autoHideTimer);
  }, [visible, dismissed, isHovered]);

  if (dismissed) return null;

  const currentItem = SOCIAL_ITEMS[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed bottom-20 md:bottom-6 left-3 sm:left-6 right-3 sm:right-auto z-40 max-w-[340px] sm:max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 transition-all duration-500 ease-out transform ${
        visible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Pulsing Verified Icon */}
        <div className="relative shrink-0 mt-0.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
              currentItem.action === "booked"
                ? "bg-emerald-100 text-emerald-600"
                : "bg-rose-100 text-brand-red"
            }`}
          >
            {currentItem.action === "booked" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <strong className="text-slate-900 font-black">{currentItem.name}</strong>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-slate-600">
              <MapPin className="w-3 h-3 text-slate-400" />
              {currentItem.city}
            </span>
          </div>

          <div className="text-xs text-slate-800 font-semibold leading-snug mt-0.5">
            <span
              className={
                currentItem.action === "booked"
                  ? "text-emerald-700 font-bold"
                  : "text-brand-red font-bold"
              }
            >
              {currentItem.action === "booked" ? "Just booked" : "Just inquired for"}{" "}
            </span>
            <span className="text-slate-900 line-clamp-1">{currentItem.packageName}</span>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-medium">
            <span>{currentItem.timeAgo}</span>
            <span className="text-emerald-600 font-bold flex items-center gap-0.5">
              ✓ Verified Traveller
            </span>
          </div>
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-slate-600 p-0.5 -mt-1 -mr-1 transition-colors rounded-md"
          title="Dismiss"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
