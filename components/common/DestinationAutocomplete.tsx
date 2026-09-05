"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Loader2, X, Navigation } from "lucide-react";
import { DestinationSuggestion } from "@/app/api/destinations-search/route";

export interface SelectedLocationData {
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city?: string;
  state?: string;
  country?: string;
}

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelectLocation?: (location: SelectedLocationData) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  compact?: boolean;
}

export default function DestinationAutocomplete({
  value,
  onChange,
  onSelectLocation,
  placeholder = "e.g. Kashmir, Manali, Goa, Dubai, Bali...",
  required = false,
  className = "",
  compact = false,
}: DestinationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<DestinationSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [hasSearched, setHasSearched] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const justSelectedRef = useRef(false);

  // Close dropdown on outside click or on window scroll
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleWindowScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  // Debounced search with AbortController for race condition prevention
  useEffect(() => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    const trimmed = value.trim();

    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      setLoading(false);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(false);

    const timer = setTimeout(async () => {
      // Abort previous in-flight request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const res = await fetch(
          `/api/destinations-search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal }
        );

        if (res.ok) {
          const data = await res.json();
          const items: DestinationSuggestion[] = data?.results || [];
          setSuggestions(items);
          setIsOpen(true);
          setHighlightedIndex(items.length > 0 ? 0 : -1);
          setHasSearched(true);
        } else {
          setSuggestions([]);
          setHasSearched(true);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Destination search error:", err);
          setSuggestions([]);
          setHasSearched(true);
        }
      } finally {
        setLoading(false);
      }
    }, 350); // 350ms debounce

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [value]);

  const handleSelect = (item: DestinationSuggestion) => {
    justSelectedRef.current = true;
    const selectedName = item.formattedAddress
      ? `${item.name}, ${item.formattedAddress}`
      : item.name;

    onChange(selectedName);
    setIsOpen(false);
    setSuggestions([]);

    if (onSelectLocation) {
      onSelectLocation({
        name: item.name,
        formattedAddress: item.formattedAddress,
        latitude: item.latitude,
        longitude: item.longitude,
        city: item.city,
        state: item.state,
        country: item.country,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setIsOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSelect(suggestions[highlightedIndex]);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input container */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value.trim().length >= 2 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full ${
            compact
              ? "h-[32px] sm:h-[40px] pl-7 sm:pl-8 pr-12 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[11px] sm:text-xs font-semibold text-slate-800 placeholder:text-slate-400"
              : "h-[48px] pl-11 pr-16 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-semibold text-brand-dark"
          } bg-white transition-colors`}
        />

        {/* Left Map Pin */}
        <MapPin
          className={`${
            compact ? "w-3.5 h-3.5 left-2 sm:left-2.5" : "w-5 h-5 left-3.5"
          } text-slate-400 absolute pointer-events-none`}
        />

        {/* Right Status / Clear Controls */}
        <div className={`absolute ${compact ? "right-2" : "right-3"} flex items-center gap-1`}>
          {loading && (
            <div className="flex items-center text-primary-blue">
              <Loader2 className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"} animate-spin text-primary-blue`} />
            </div>
          )}

          {value && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-0.5 sm:p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Clear destination input"
            >
              <X className={`${compact ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-4 h-4"}`} />
            </button>
          )}
        </div>
      </div>

      {/* Uber/Rapido-Style Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {suggestions.length > 0 ? (
            <ul className={`${compact ? "max-h-[220px] sm:max-h-[280px]" : "max-h-[320px]"} overflow-y-auto divide-y divide-slate-100 py-1 focus:outline-none`}>
              {suggestions.map((item, index) => {
                const isSelected = highlightedIndex === index;
                return (
                  <li
                    key={item.id}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelect(item)}
                    className={`${
                      compact ? "px-2.5 py-1.5 sm:px-3 sm:py-2" : "px-3.5 py-2.5"
                    } flex items-center gap-2 sm:gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-light-blue/60 text-primary-blue"
                        : "hover:bg-slate-50 text-brand-dark"
                    }`}
                  >
                    {/* Uber/Rapido Style Pin Icon */}
                    <div
                      className={`${
                        compact ? "w-6 h-6 sm:w-7 sm:h-7" : "w-8 h-8"
                      } rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-primary-blue text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <MapPin className={`${compact ? "w-3 h-3 sm:w-3.5 sm:h-3.5" : "w-4 h-4"}`} />
                    </div>

                    {/* Location Text (Place Name + Subtitle/Address) */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-bold ${compact ? "text-xs sm:text-sm" : "text-sm"} text-slate-900 truncate`}>
                          {item.name}
                        </p>
                        {item.country && (
                          <span className={`${compact ? "text-[9px]" : "text-[10px]"} font-semibold text-slate-400 uppercase tracking-wider shrink-0`}>
                            {item.country}
                          </span>
                        )}
                      </div>
                      {item.formattedAddress && (
                        <p className={`${compact ? "text-[10px] sm:text-xs" : "text-xs"} text-slate-500 truncate mt-0.5 font-normal`}>
                          {item.formattedAddress}
                        </p>
                      )}
                    </div>

                    <Navigation
                      className={`w-3.5 h-3.5 shrink-0 transition-opacity ${
                        isSelected ? "opacity-100 text-primary-blue" : "opacity-0"
                      }`}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            hasSearched &&
            !loading && (
              <div className="p-3 sm:p-4 text-center text-xs sm:text-sm text-slate-500 space-y-1">
                <p className="font-medium">No locations found</p>
                <p className="text-[11px] sm:text-xs text-slate-400">
                  Try typing a city, region, or landmark name
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
