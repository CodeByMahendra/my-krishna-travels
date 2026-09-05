"use client";

import React, { useState } from "react";
import { Sparkles, Send, CheckCircle2, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { trackLead, trackWhatsAppClick } from "@/lib/tracking";
import { getStoredUTMParams } from "@/lib/utm";

export default function QuickLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    destination: "",
    date: "",
    travellers: "1 Traveller (Solo)",
    budget: "Standard Comfort",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const utm = getStoredUTMParams();
    const payload = { ...formData, ...utm, formSource: "Quick Lead Form (Homepage)" };

    // Track analytics lead event
    trackLead(payload);

    // Instant Smart WhatsApp Redirect
    const waLink = getEnquiryWhatsAppLink(formData);
    trackWhatsAppClick("QuickLeadFormAutoRedirect");
    window.open(waLink, "_blank");

    try {
      // Send email notification to business owner in parallel
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error("Failed to send email notification:", error);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleWhatsAppDirect = () => {
    trackWhatsAppClick("QuickLeadForm");
    const link = getEnquiryWhatsAppLink(formData);
    window.open(link, "_blank");
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl p-2.5 sm:p-5 md:p-6 border border-slate-100 relative text-slate-800 overflow-hidden">
      <div className="flex items-center gap-1 mb-0.5 sm:mb-1">
        <span className="text-brand-red bg-brand-red-light p-0.5 rounded">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
        </span>
        <span className="text-[9px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
          Instant Trip Assistance
        </span>
      </div>

      <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
        Plan Your Dream Trip
      </h2>
      <p className="text-[10px] sm:text-xs text-slate-500 mb-1.5 sm:mb-3 font-normal leading-tight">
        Share your choices to get a customized quote in 15 minutes.
      </p>

      {submitted ? (
        <div className="text-center py-4 sm:py-6 space-y-2 sm:space-y-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-0.5 sm:space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900">Enquiry Submitted!</h3>
            <p className="text-[11px] sm:text-xs text-slate-600 max-w-sm mx-auto font-normal">
              Thank you <strong className="text-brand-red">{formData.name}</strong>! Our travel expert will contact you shortly.
            </p>
          </div>

          <div className="pt-1.5 flex flex-col gap-1.5">
            <button
              onClick={handleWhatsAppDirect}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[36px] sm:h-[40px] rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-xs sm:text-sm"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>Connect on WhatsApp</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="text-[11px] sm:text-xs text-brand-red hover:underline font-bold"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-1.5 sm:space-y-2.5">
          {/* Row 1: Name & WhatsApp (2-col even on mobile) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[32px] sm:h-[40px] px-2 sm:px-3 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[11px] sm:text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
                WhatsApp No. *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[32px] sm:h-[40px] px-2 sm:px-3 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[11px] sm:text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>

          {/* Row 2: Destination */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
              Where to? (Destination) *
            </label>
            <div className="relative">
              <input
                type="text"
                name="destination"
                required
                placeholder="e.g. Mathura, Vrindavan, Kashmir, Goa..."
                value={formData.destination}
                onChange={handleChange}
                className="w-full h-[32px] sm:h-[40px] pl-7 pr-2 sm:pl-9 sm:pr-3 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[11px] sm:text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
              <MapPin className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Row 3: Travel Date & Travellers (2-col) */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-3">
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
                Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-[32px] sm:h-[40px] px-1.5 sm:px-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[10px] sm:text-xs font-semibold text-slate-800 bg-white"
              />
            </div>
            <div>
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
                Travellers
              </label>
              <select
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full h-[32px] sm:h-[40px] px-1.5 sm:px-2.5 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[10px] sm:text-xs bg-white font-semibold text-slate-800 cursor-pointer"
              >
                <option value="1 Traveller (Solo)">1 Solo</option>
                <option value="2 Travellers (Couple)">2 Couple</option>
                <option value="3-5 Travellers (Family)">3-5 Family</option>
                <option value="6+ Travellers (Group)">6+ Group</option>
              </select>
            </div>
          </div>

          {/* Row 4: Hotel & Stay Style */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold text-slate-700 mb-0.5">
              Stay Preference
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full h-[32px] sm:h-[40px] px-2 sm:px-3 rounded-lg sm:rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-[11px] sm:text-xs bg-white font-semibold text-slate-800 cursor-pointer"
            >
              <option value="Standard (3-Star)">Standard (3-Star Deluxe)</option>
              <option value="Premium (4-Star)">Premium (4-Star Luxury)</option>
              <option value="Ultra Luxury (5-Star)">Ultra Luxury (5-Star & Resorts)</option>
              <option value="Budget Friendly">Budget Friendly Stays</option>
            </select>
          </div>

          {/* Row 5: Action Buttons Side-by-Side */}
          <div className="pt-0.5 sm:pt-1 grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-extrabold h-[34px] sm:h-[42px] rounded-lg sm:rounded-xl shadow-md transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-[11px] sm:text-sm active:scale-[0.98] whitespace-nowrap"
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Get Quote</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="w-full bg-white hover:bg-emerald-50/40 border border-slate-200 text-emerald-600 font-bold h-[34px] sm:h-[42px] rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-1.5 transition-all text-[11px] sm:text-sm active:scale-[0.98] whitespace-nowrap"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
