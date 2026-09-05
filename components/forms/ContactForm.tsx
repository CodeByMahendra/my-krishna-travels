"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getWhatsAppLink, getEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { trackLead, trackWhatsAppClick } from "@/lib/tracking";
import { getStoredUTMParams } from "@/lib/utm";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    date: "",
    travellers: "2 Travellers (Couple)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const utm = getStoredUTMParams();
    const payload = { ...formData, ...utm, formSource: "Contact Us Page Form" };

    trackLead({ ...payload, form: "ContactUsPage" });

    // Instant Smart WhatsApp Redirect
    const waLink = getEnquiryWhatsAppLink({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      date: formData.date,
      travellers: formData.travellers,
      message: formData.message,
    });
    trackWhatsAppClick("ContactFormAutoRedirect");
    window.open(waLink, "_blank");

    try {
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

  const handleWhatsApp = () => {
    trackWhatsAppClick("ContactPageForm");
    window.open(getWhatsAppLink(), "_blank");
  };

  return (
    <div className="bg-white rounded-[14px] p-6 sm:p-8 border border-brand-border shadow-card">
      <h2 className="text-xl sm:text-2xl font-black text-navy mb-1">
        Send Us An Enquiry
      </h2>
      <p className="text-xs sm:text-sm text-brand-muted mb-6 font-normal">
        Fill in your details and our team will connect with you within 2 business hours.
      </p>

      {submitted ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-14 h-14 bg-emerald-50 text-brand-whatsapp rounded-full flex items-center justify-center mx-auto shadow-xs border border-brand-whatsapp/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-navy">Message Received!</h3>
          <p className="text-xs sm:text-sm text-brand-muted max-w-sm mx-auto font-normal">
            Thank you <strong className="text-primary-blue">{formData.name}</strong>! We will get back to you shortly.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-semibold h-[46px] rounded-[8px] flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.98] text-xs sm:text-sm"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp Now</span>
            </button>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-primary-blue hover:underline font-semibold"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Kashmir, Goa, Dubai..."
                value={formData.destination}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Travel Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-dark mb-1">
                Number of Travellers
              </label>
              <select
                name="travellers"
                value={formData.travellers}
                onChange={handleChange}
                className="w-full h-[46px] px-3 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm bg-white font-medium text-brand-dark"
              >
                <option value="1 Traveller (Solo)">1 Traveller (Solo)</option>
                <option value="2 Travellers (Couple)">2 Travellers (Couple)</option>
                <option value="3-5 Travellers (Family)">3-5 Travellers (Family)</option>
                <option value="6+ Travellers (Group)">6+ Travellers (Group)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-dark mb-1">
              Your Message / Requirements
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us more about your trip preferences..."
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-primary-blue text-sm font-medium text-brand-dark placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[48px] rounded-[8px] shadow-xs transition-colors flex items-center justify-center gap-2 text-sm sm:text-base active:scale-[0.98]"
          >
            {loading ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Enquiry</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

