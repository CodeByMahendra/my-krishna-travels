"use client";

import React, { useState } from "react";
import { Sparkles, MessageCircle, Send, CheckCircle2, MapPin } from "lucide-react";
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
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-100/90 relative text-slate-800">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-brand-red bg-brand-red-light p-1 rounded-md">
          <Sparkles className="w-4 h-4" />
        </span>
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-brand-red">
          Instant Trip Assistance
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1 tracking-tight">
        Plan Your Dream Trip
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-5 leading-relaxed font-normal">
        Share your choices to get a customized itinerary quote in 15 minutes.
      </p>

      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900">Enquiry Submitted!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-normal">
              Thank you <strong className="text-brand-red">{formData.name}</strong>! Our travel expert will contact you shortly with a personalized proposal.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleWhatsAppDirect}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-[48px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-md text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-current stroke-none" />
              <span>Connect Immediately on WhatsApp</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-brand-red hover:underline font-bold"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                WhatsApp Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Where to? (Destination) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="destination"
                  required
                  placeholder="Kashmir, Manali, Dubai..."
                  value={formData.destination}
                  onChange={handleChange}
                  className="w-full h-[46px] pl-9 pr-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Approximate Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm font-semibold text-slate-800 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Number of Travellers
              </label>
              <select
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full h-[46px] px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm bg-white font-semibold text-slate-800"
              >
                <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
                <option value="2 Travellers (Couple)">2 Travellers (Couple)</option>
                <option value="3-5 Travellers (Family)">3-5 Travellers (Family)</option>
                <option value="6+ Travellers (Group)">6+ Travellers (Group)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Approximate Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full h-[46px] px-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red text-sm bg-white font-semibold text-slate-800"
              >
                <option value="Budget Friendly">Budget Friendly (&lt;₹20k)</option>
                <option value="Standard Comfort">Standard Comfort (₹20k-₹40k)</option>
                <option value="Premium Luxury">Premium Luxury (₹40k+)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-brand-red-dark text-white font-extrabold h-[48px] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.98]"
            >
              {loading ? (
                <span>Processing...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Get Free Quote</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleWhatsAppDirect}
              className="w-full bg-white hover:bg-slate-50 border border-slate-200 text-emerald-600 font-bold h-[44px] rounded-xl flex items-center justify-center gap-2 transition-all text-xs sm:text-sm active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600 stroke-none" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
