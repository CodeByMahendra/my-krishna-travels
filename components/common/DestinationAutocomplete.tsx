"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, X, Loader2, Globe, Building2, Landmark, Check } from "lucide-react";
import { searchLocalDestinations, DestinationItem } from "@/data/destinationsSearchData";

export interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

interface SuggestionItem {
  id: string;
  name: string;
  displayName: string;
  category: "City" | "State" | "Country" | "Region" | "Place";
  country: string;
  state?: string;
  tag?: string;
}

export default function DestinationAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Search City, State, or Country (e.g. Gujarat, Manali, Dubai...)",
  className = "",
  autoFocus = false,
}: DestinationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Search Query changes with 0ms local + debounced live fetch
  useEffect(() => {
    const query = value.trim();
    if (!query || query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    // 1. Instant 0ms local results
    const local = searchLocalDestinations(query);
    const initialSuggestions: SuggestionItem[] = local.map((item) => ({
      id: item.id,
      name: item.name,
      displayName: item.state
        ? `${item.name}, ${item.state}, ${item.country}`
        : item.category === "Country"
        ? item.name
        : `${item.name}, ${item.country}`,
      category: item.category,
      country: item.country,
      state: item.state,
      tag: item.tag,
    }));

    setSuggestions(initialSuggestions);
    setIsOpen(true);
    setSelectedIndex(-1);

    // 2. Debounced live fetch from API
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/destinations-search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.results && Array.isArray(data.results) && data.results.length > 0) {
            setSuggestions(data.results);
          }
        }
      } catch (err) {
        console.warn("Live destination search error:", err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (destinationName: string) => {
    onChange(destinationName);
    if (onSelect) onSelect(destinationName);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsOpen(false);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSelect(suggestions[selectedIndex].name);
      } else if (suggestions.length > 0) {
        handleSelect(suggestions[0].name);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const getCategoryBadge = (category: SuggestionItem["category"]) => {
    switch (category) {
      case "Country":
        return {
          label: "Country",
          bg: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <Globe className="w-3 h-3 text-amber-600" />,
        };
      case "State":
        return {
          label: "State",
          bg: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: <Landmark className="w-3 h-3 text-emerald-600" />,
        };
      case "City":
        return {
          label: "City",
          bg: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <Building2 className="w-3 h-3 text-blue-600" />,
        };
      default:
        return {
          label: "Destination",
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          icon: <MapPin className="w-3 h-3 text-slate-600" />,
        };
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (value.trim().length >= 2 && suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          placeholder={placeholder}
          aria-autocomplete="list"
          aria-expanded={isOpen}
          className="w-full h-[50px] pl-11 pr-24 rounded-xl border-2 border-slate-200 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/15 text-sm sm:text-base font-semibold text-slate-800 placeholder:text-slate-400 bg-white transition-all shadow-xs"
        />

        {/* Left Location Icon */}
        <MapPin className="w-5 h-5 text-primary-blue absolute left-3.5 pointer-events-none" />

        {/* Right Status / Action Controls */}
        <div className="absolute right-3 flex items-center gap-1.5">
          {loading && (
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md text-[11px] font-bold text-slate-500 animate-in fade-in">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-primary-blue" />
              <span className="hidden sm:inline">Fetching...</span>
            </div>
          )}

          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setSuggestions([]);
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Clear destination"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] inset-x-0 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Header indicator */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-primary-blue" />
              <span>Matching Destinations ({suggestions.length})</span>
            </span>
            <span className="text-[10px] text-slate-400">Click or Press Enter</span>
          </div>

          <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100 py-1">
            {suggestions.length > 0 ? (
              suggestions.map((item, index) => {
                const isSelected = selectedIndex === index;
                const badge = getCategoryBadge(item.category);
                const isCurrent = value.toLowerCase() === item.name.toLowerCase();

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item.name)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors ${
                      isSelected
                        ? "bg-light-blue text-primary-blue"
                        : "hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-primary-blue text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm truncate">{item.name}</span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${badge.bg}`}
                          >
                            {badge.icon}
                            <span>{badge.label}</span>
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-normal truncate mt-0.5">
                          {item.displayName || item.tag}
                        </p>
                      </div>
                    </div>

                    {isCurrent ? (
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-primary-blue shrink-0">
                        Select →
                      </span>
                    )}
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-sm text-slate-500 space-y-2">
                <p>No exact match found for &quot;{value}&quot;.</p>
                <button
                  type="button"
                  onClick={() => handleSelect(value.trim())}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-blue text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Use &quot;{value.trim()}&quot; as destination</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Helper Footer */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>⚡ Instant City, State & Country Search</span>
            <span className="font-semibold text-emerald-600">✓ Auto-Fetched</span>
          </div>
        </div>
      )}
    </div>
  );
}
