"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  Heart,
  Send,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Clock,
  User,
  UserCheck,
  Building2,
  Compass,
  Check,
  Sun
} from "lucide-react";
import { getEnquiryWhatsAppLink } from "@/lib/whatsapp";
import { trackLead, trackWhatsAppClick } from "@/lib/tracking";
import { getStoredUTMParams } from "@/lib/utm";

export default function CustomizeTripForm() {
  const searchParams = useSearchParams();
  const initialDestination = searchParams.get("destination") || searchParams.get("package") || "";

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    destination: initialDestination,
    travelDates: "",
    duration: "5-7 Days",
    travellers: "2 Travellers (Couple / Honeymoon)",
    budget: "Standard Comfort (₹20,000 - ₹40,000 / person)",
    tripType: "Family",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const utm = getStoredUTMParams();
    const payload = {
      ...formData,
      ...utm,
      date: formData.travelDates,
      message: `Duration: ${formData.duration} | Style: ${formData.tripType} | Notes: ${formData.notes || "None"}`,
      formSource: "Customized Trip Wizard",
    };

    trackLead(payload);

    // Instant Smart WhatsApp Redirect
    const waLink = getEnquiryWhatsAppLink({
      name: formData.name,
      phone: formData.phone,
      destination: formData.destination,
      date: formData.travelDates,
      travellers: formData.travellers,
      budget: formData.budget,
      message: `Duration: ${formData.duration}, Style: ${formData.tripType}`,
    });
    trackWhatsAppClick("CustomizeWizardAutoRedirect");
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
    trackWhatsAppClick("CustomizeWizard");
    const link = getEnquiryWhatsAppLink({
      name: formData.name,
      destination: formData.destination,
      date: formData.travelDates,
      travellers: formData.travellers,
      budget: formData.budget,
    });
    window.open(link, "_blank");
  };

  const popularDestinations = [
    { name: "Kashmir", icon: "🏔️", tag: "Snow & Lakes" },
    { name: "Manali & Himachal", icon: "🌲", tag: "Mountains & Adventure" },
    { name: "Goa", icon: "🏖️", tag: "Beaches & Sunsets" },
    { name: "Kerala", icon: "🌴", tag: "Backwaters & Houseboat" },
    { name: "Dubai", icon: "🏙️", tag: "Luxury & Safari" },
    { name: "Bali", icon: "🌺", tag: "Tropical Island" },
    { name: "Rajasthan", icon: "🏰", tag: "Forts & Thar Desert" },
    { name: "Maldives", icon: "🌊", tag: "Overwater Villas" },
  ];

  const durationOptions = [
    { label: "3-4 Days", desc: "Short Weekend Getaway", icon: <Sun className="w-5 h-5 text-bright-blue" /> },
    { label: "5-7 Days", desc: "Standard Holiday Plan", icon: <Compass className="w-5 h-5 text-primary-blue" /> },
    { label: "8-10 Days", desc: "Extended Exploration", icon: <Clock className="w-5 h-5 text-primary-blue" /> },
    { label: "10+ Days", desc: "Grand Tour Experience", icon: <Sparkles className="w-5 h-5 text-primary-blue" /> },
  ];

  const travellerOptions = [
    { label: "1 Traveller (Solo)", subtitle: "Solo Explorer", icon: <User className="w-5 h-5 text-primary-blue" /> },
    { label: "2 Travellers (Couple / Honeymoon)", subtitle: "Couple / Honeymoon", icon: <Heart className="w-5 h-5 text-brand-red" /> },
    { label: "3-5 Travellers (Family)", subtitle: "Family Vacation", icon: <Users className="w-5 h-5 text-primary-blue" /> },
    { label: "6-10 Travellers (Friends)", subtitle: "Friends / Small Group", icon: <UserCheck className="w-5 h-5 text-primary-blue" /> },
    { label: "10+ Travellers (Group)", subtitle: "Large Group / Corporate", icon: <Building2 className="w-5 h-5 text-primary-blue" /> },
  ];

  const budgetOptions = [
    {
      title: "Budget Friendly",
      range: "Under ₹20,000 / person",
      tag: "Essential Comfort",
      desc: "3★ Cozy Hotels + Private Cabs",
      icon: <Wallet className="w-5 h-5 text-primary-blue" />,
    },
    {
      title: "Standard Comfort",
      range: "₹20,000 - ₹40,000 / person",
      tag: "Most Popular",
      desc: "3★ / 4★ View Resorts + Breakfast & Dinner",
      icon: <Sparkles className="w-5 h-5 text-primary-blue" />,
    },
    {
      title: "Premium Luxury",
      range: "₹40,000+ / person",
      tag: "Luxury Experience",
      desc: "4★ / 5★ Luxury Resorts + Houseboats & Special Amenities",
      icon: <Compass className="w-5 h-5 text-primary-blue" />,
    },
  ];

  const tripTypes = [
    { label: "Family", icon: "👨‍👩‍👧‍👦" },
    { label: "Couple", icon: "💑" },
    { label: "Honeymoon", icon: "💍" },
    { label: "Friends", icon: "🎒" },
    { label: "Solo", icon: "🧭" },
    { label: "Corporate", icon: "💼" },
    { label: "Group Tour", icon: "🚌" },
  ];

  const stepTitles = [
    "Destination",
    "Dates & Duration",
    "Travellers",
    "Budget",
    "Trip Style",
    "Contact Details",
  ];

  return (
    <div className="bg-white rounded-[14px] shadow-card border border-brand-border p-5 sm:p-8 md:p-10 max-w-4xl mx-auto overflow-hidden relative">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 bg-light-blue text-primary-blue px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-primary-blue/15">
          <Sparkles className="w-3.5 h-3.5 text-bright-blue" />
          <span>Tailored Personal Trip Planner</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy tracking-tight leading-snug">
          Let&apos;s Plan Your <span className="text-primary-blue">Perfect Trip</span>
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-brand-muted font-normal">
          Answer a few quick questions to receive a tailored itinerary & quote over WhatsApp.
        </p>
      </div>

      {/* Interactive Step Indicator */}
      {!submitted && (
        <div className="mb-8">
          {/* Desktop Stepper */}
          <div className="hidden md:flex items-center justify-between relative mb-3">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 -z-0 rounded-full" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-primary-blue -translate-y-1/2 transition-all duration-300 rounded-full -z-0"
              style={{ width: `${((step - 1) / 5) * 100}%` }}
            />

            {stepTitles.map((title, idx) => {
              const stepNum = idx + 1;
              const isDone = stepNum < step;
              const isCurrent = stepNum === step;
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => {
                    if (stepNum < step) setStep(stepNum);
                  }}
                  disabled={stepNum > step}
                  className="flex flex-col items-center relative z-10 group focus:outline-none"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 ${
                      isCurrent
                        ? "bg-primary-blue text-white ring-4 ring-primary-blue/20 shadow-xs scale-105"
                        : isDone
                        ? "bg-navy text-white shadow-xs"
                        : "bg-white text-slate-400 border border-brand-border"
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 ${
                      isCurrent ? "text-navy font-bold" : isDone ? "text-primary-blue" : "text-slate-400"
                    }`}
                  >
                    {title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile Stepper Bar */}
          <div className="md:hidden space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-brand-dark bg-light-bg px-3.5 py-2 rounded-lg border border-brand-border">
              <span className="text-primary-blue flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-primary-blue text-white flex items-center justify-center text-[10px]">
                  {step}
                </span>
                Step {step} of 6
              </span>
              <span className="text-navy font-bold tracking-wide">{stepTitles[step - 1]}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-blue transition-all duration-300 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Selected Summary Pill Bar (When step > 1) */}
      {!submitted && step > 1 && (
        <div className="mb-6 bg-light-bg border border-brand-border p-3 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs text-brand-dark">
          <div className="flex flex-wrap items-center gap-2">
            {formData.destination && (
              <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border font-semibold text-primary-blue flex items-center gap-1 shadow-xs">
                <MapPin className="w-3 h-3 text-bright-blue" />
                {formData.destination}
              </span>
            )}
            {formData.duration && (
              <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border font-medium">
                ⏱️ {formData.duration}
              </span>
            )}
            {formData.travellers && step > 3 && (
              <span className="bg-white px-2.5 py-1 rounded-md border border-brand-border font-medium hidden sm:inline">
                👥 {formData.travellers.split("(")[0]}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-[11px] font-semibold text-primary-blue hover:underline"
          >
            Edit Specs
          </button>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-10 sm:py-14 space-y-6">
          <div className="w-16 h-16 bg-emerald-50 text-brand-whatsapp rounded-full flex items-center justify-center mx-auto shadow-xs border border-brand-whatsapp/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Your Custom Trip Plan Request is Ready!
            </h2>
            <p className="text-xs sm:text-base text-brand-muted max-w-md mx-auto leading-relaxed font-normal">
              Thank you <strong className="text-primary-blue">{formData.name}</strong>! We received your request for{" "}
              <strong className="text-navy">{formData.destination || "your destination"}</strong>. Our travel specialist is preparing a customized itinerary proposal for you.
            </p>
          </div>

          <div className="pt-4 max-w-md mx-auto space-y-3">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-brand-whatsapp hover:bg-brand-whatsappHover text-white font-semibold h-[48px] rounded-[8px] shadow-xs flex items-center justify-center gap-2 transition-colors active:scale-[0.98] text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current stroke-none" />
              <span>Connect on WhatsApp Immediately</span>
            </button>

            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
              }}
              className="text-xs text-primary-blue hover:underline font-semibold block mx-auto pt-2"
            >
              Start New Customized Plan
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* STEP 1: Destination Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 1: Where do you want to travel?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Enter a city/region or tap a popular choice</p>
                </div>
              </div>

              {/* Destination Search Box */}
              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1.5">
                  Type Destination Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashmir, Manali, Goa, Dubai, Bali..."
                    value={formData.destination}
                    onChange={(e) => updateField("destination", e.target.value)}
                    className="w-full h-[48px] pl-11 pr-4 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-semibold text-brand-dark"
                  />
                  <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Visual Popular Destination Cards */}
              <div>
                <span className="text-xs font-semibold text-brand-muted block mb-3 uppercase tracking-wider">
                  Popular Destinations:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                  {popularDestinations.map((dest) => {
                    const isSelected = formData.destination === dest.name;
                    return (
                      <button
                        key={dest.name}
                        type="button"
                        onClick={() => updateField("destination", dest.name)}
                        className={`p-3 rounded-[8px] border text-left transition-all duration-150 flex flex-col justify-between h-22 ${
                          isSelected
                            ? "border-primary-blue bg-light-blue text-primary-blue ring-2 ring-primary-blue/20 shadow-xs"
                            : "border-brand-border bg-white hover:bg-slate-50 text-brand-dark"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xl">{dest.icon}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary-blue" />}
                        </div>
                        <div>
                          <p className="font-bold text-xs sm:text-sm line-clamp-1">{dest.name}</p>
                          <p className="text-[10px] text-brand-muted line-clamp-1 font-normal">{dest.tag}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!formData.destination}
                  className="w-full sm:w-auto bg-primary-blue hover:bg-primary-hover disabled:opacity-40 text-white font-semibold h-[46px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <span>Continue to Dates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dates & Duration */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 2: When are you travelling & for how long?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Pick approximate travel month or date</p>
                </div>
              </div>

              {/* Expected Date Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">
                    Expected Travel Date / Month
                  </label>
                  <input
                    type="date"
                    value={formData.travelDates}
                    onChange={(e) => updateField("travelDates", e.target.value)}
                    className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1.5">
                    Or Preferred Travel Month
                  </label>
                  <select
                    onChange={(e) => updateField("travelDates", e.target.value)}
                    className="w-full h-[46px] px-3 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm bg-white font-medium text-brand-dark"
                  >
                    <option value="">Select Upcoming Month</option>
                    <option value="Next 2 Weeks">Within Next 2 Weeks</option>
                    <option value="Next Month">Next Month</option>
                    <option value="In 2-3 Months">In 2 - 3 Months</option>
                    <option value="Festive / Winter Season">Festive / Snow Season</option>
                  </select>
                </div>
              </div>

              {/* Visual Duration Cards */}
              <div>
                <label className="block text-xs font-semibold text-brand-muted uppercase tracking-wider mb-2">
                  Expected Trip Duration:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {durationOptions.map((opt) => {
                    const isSelected = formData.duration === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => updateField("duration", opt.label)}
                        className={`p-3.5 rounded-[8px] border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "border-primary-blue bg-light-blue text-primary-blue ring-2 ring-primary-blue/20 shadow-xs"
                            : "border-brand-border hover:bg-slate-50 text-brand-dark"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-white border border-brand-border">
                            {opt.icon}
                          </div>
                          <div>
                            <p className="font-bold text-sm">{opt.label}</p>
                            <p className="text-xs text-brand-muted font-normal">{opt.desc}</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-primary-blue" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white border border-primary-blue text-navy hover:bg-light-blue font-semibold h-[46px] px-6 rounded-[8px] flex items-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[46px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center gap-2 text-sm"
                >
                  <span>Continue to Travellers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Travellers Selection */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 3: How many travellers are going?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Helps us recommend room counts & cab sizes</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {travellerOptions.map((opt) => {
                  const isSelected = formData.travellers === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => updateField("travellers", opt.label)}
                      className={`w-full p-3.5 rounded-[8px] border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-primary-blue bg-light-blue text-primary-blue ring-2 ring-primary-blue/20 shadow-xs"
                          : "border-brand-border hover:bg-slate-50 text-brand-dark"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2 rounded-md bg-white border border-brand-border">
                          {opt.icon}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{opt.subtitle}</p>
                          <p className="text-xs text-brand-muted font-normal">{opt.label}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary-blue" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white border border-primary-blue text-navy hover:bg-light-blue font-semibold h-[46px] px-6 rounded-[8px] flex items-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[46px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center gap-2 text-sm"
                >
                  <span>Continue to Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Budget Tier */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 4: What&apos;s your budget preference?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Per person estimated budget expectation</p>
                </div>
              </div>

              <div className="space-y-3">
                {budgetOptions.map((opt) => {
                  const isSelected = formData.budget.includes(opt.title);
                  return (
                    <button
                      key={opt.title}
                      type="button"
                      onClick={() => updateField("budget", `${opt.title} (${opt.range})`)}
                      className={`w-full p-4 rounded-[8px] border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "border-primary-blue bg-light-blue text-primary-blue ring-2 ring-primary-blue/20 shadow-xs"
                          : "border-brand-border hover:bg-slate-50 text-brand-dark"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="p-2 rounded-md bg-white border border-brand-border mt-0.5">
                          {opt.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-sm">{opt.title}</p>
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-primary-blue/10 text-primary-blue">
                              {opt.tag}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-navy mt-0.5">{opt.range}</p>
                          <p className="text-xs text-brand-muted mt-0.5 font-normal">{opt.desc}</p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-primary-blue shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white border border-primary-blue text-navy hover:bg-light-blue font-semibold h-[46px] px-6 rounded-[8px] flex items-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[46px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center gap-2 text-sm"
                >
                  <span>Continue to Trip Style</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Trip Style / Type */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 5: What type of trip is this?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Helps us suggest specific hotels & itinerary pace</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tripTypes.map((type) => {
                  const isSelected = formData.tripType === type.label;
                  return (
                    <button
                      key={type.label}
                      type="button"
                      onClick={() => updateField("tripType", type.label)}
                      className={`p-4 rounded-[8px] border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? "border-primary-blue bg-light-blue text-primary-blue ring-2 ring-primary-blue/20 shadow-xs font-bold"
                          : "border-brand-border hover:bg-slate-50 text-brand-dark font-semibold"
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                      <span className="text-xs sm:text-sm">{type.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="pt-4 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-white border border-primary-blue text-navy hover:bg-light-blue font-semibold h-[46px] px-6 rounded-[8px] flex items-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary-blue hover:bg-primary-hover text-white font-semibold h-[46px] px-7 rounded-[8px] shadow-xs transition-colors flex items-center gap-2 text-sm"
                >
                  <span>Final Step: Contact Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Contact Details & Submit */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <div className="p-2 rounded-lg bg-light-blue text-primary-blue">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-navy">
                    STEP 6: Where should we send your travel plan?
                  </h3>
                  <p className="text-xs text-brand-muted font-normal">Provide your contact details for instant itinerary delivery</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-semibold text-brand-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-dark mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-semibold text-brand-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. vikram@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium text-brand-dark"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-dark mb-1">
                  Special Requirements / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Pure veg food needed, 4-star hotel mountain view room, flight assistance required..."
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className="w-full p-3.5 rounded-[8px] border border-brand-border focus:outline-none focus:ring-2 focus:ring-primary-blue text-sm font-medium text-brand-dark"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto bg-white border border-primary-blue text-navy hover:bg-light-blue font-semibold h-[48px] px-6 rounded-[8px] flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={loading || !formData.name || !formData.phone}
                  className="w-full sm:flex-1 bg-primary-blue hover:bg-primary-hover disabled:opacity-40 text-white font-semibold text-base h-[48px] px-8 rounded-[8px] shadow-xs transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {loading ? (
                    <span>Preparing Custom Plan...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Get My Free Travel Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

