"use client";

import React, { useState, useMemo } from "react";
import { Calculator, Users, Hotel, Car, Sparkles, ShieldCheck, ArrowRight, IndianRupee } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { trackWhatsAppClick } from "@/lib/tracking";

interface DestinationPricing {
  id: string;
  name: string;
  basePrice: number;
  duration: string;
  tag: string;
}

const DESTINATIONS: DestinationPricing[] = [
  { id: "mathura", name: "Mathura & Vrindavan Braj Darshan", basePrice: 4999, duration: "3 Days / 2 Nights", tag: "Spiritual Special" },
  { id: "ujjain", name: "Ujjain, Indore & Omkareshwar", basePrice: 6999, duration: "4 Days / 3 Nights", tag: "Most Popular" },
  { id: "kashmir", name: "Kashmir Paradise Escape", basePrice: 14999, duration: "6 Days / 5 Nights", tag: "Trending" },
  { id: "manali", name: "Manali & Himachal Adventure", basePrice: 8999, duration: "5 Days / 4 Nights", tag: "Best Value" },
  { id: "goa", name: "Goa Beach & Celebrations", basePrice: 7499, duration: "4 Days / 3 Nights", tag: "Weekend Special" },
  { id: "kerala", name: "Kerala Backwaters & Hills", basePrice: 13500, duration: "5 Days / 4 Nights", tag: "Nature & Ayurveda" },
  { id: "rajasthan", name: "Rajasthan Royal Forts", basePrice: 11999, duration: "6 Days / 5 Nights", tag: "Heritage" },
  { id: "uttarakhand", name: "Uttarakhand & Rishikesh", basePrice: 9499, duration: "5 Days / 4 Nights", tag: "Mountains & Rafting" },
  { id: "dubai", name: "Dubai International Luxury", basePrice: 39999, duration: "5 Days / 4 Nights", tag: "International" },
];

export default function TripCostCalculator() {
  const [selectedDestId, setSelectedDestId] = useState("ujjain");
  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [hotelTier, setHotelTier] = useState<"3star" | "4star" | "5star">("3star");
  const [vehicleType, setVehicleType] = useState<"sedan" | "suv" | "tempo">("sedan");

  const selectedDest = useMemo(
    () => DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0],
    [selectedDestId]
  );

  // Calculate pricing
  const calculation = useMemo(() => {
    const basePerAdult = selectedDest.basePrice;
    const basePerKid = Math.round(selectedDest.basePrice * 0.5); // 50% for kids

    // Hotel upgrade add-on per person
    let hotelUpgradePerPerson = 0;
    if (hotelTier === "4star") hotelUpgradePerPerson = 2500;
    if (hotelTier === "5star") hotelUpgradePerPerson = 5500;

    // Vehicle upgrade add-on total
    let vehicleUpgradeTotal = 0;
    if (vehicleType === "suv") vehicleUpgradeTotal = 3000;
    if (vehicleType === "tempo") vehicleUpgradeTotal = 6500;

    const totalTravellers = adults + kids;
    const adultsCost = adults * (basePerAdult + hotelUpgradePerPerson);
    const kidsCost = kids * (basePerKid + Math.round(hotelUpgradePerPerson * 0.5));
    const totalCost = adultsCost + kidsCost + vehicleUpgradeTotal;
    const perPersonCost = Math.round(totalCost / (totalTravellers || 1));
    const advanceAmount = Math.round(totalCost * 0.2); // 20% advance token

    return {
      totalCost,
      perPersonCost,
      advanceAmount,
      totalTravellers,
    };
  }, [selectedDest, adults, kids, hotelTier, vehicleType]);

  const handleLockPriceWhatsApp = () => {
    trackWhatsAppClick("TripCostCalculator");
    const hotelLabel =
      hotelTier === "3star" ? "3★ Deluxe" : hotelTier === "4star" ? "4★ Premium Resort" : "5★ Luxury Heritage";
    const vehicleLabel =
      vehicleType === "sedan" ? "Dedicated Sedan (Dzire)" : vehicleType === "suv" ? "Spacious SUV (Ertiga/Innova)" : "Tempo Traveller";

    const text = `🙏 *Namaste My Krishna Travels!*\n\nI used your *Trip Cost Calculator* on the website and want to lock this estimated package:\n\n📍 *Destination:* ${selectedDest.name} (${selectedDest.duration})\n👥 *Travellers:* ${adults} Adults${kids > 0 ? `, ${kids} Kids` : ""}\n🏨 *Hotel Class:* ${hotelLabel}\n🚗 *Cab Preference:* ${vehicleLabel}\n\n💰 *Calculated Total Estimate:* ₹${calculation.totalCost.toLocaleString("en-IN")} (₹${calculation.perPersonCost.toLocaleString("en-IN")} / person)\n🔒 *Advance to Book:* ₹${calculation.advanceAmount.toLocaleString("en-IN")}\n\nPlease confirm availability and share the final discount quote!`;

    window.open(getWhatsAppLink(text), "_blank");
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-brand-red px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 border border-brand-red/15">
            <Calculator className="w-3.5 h-3.5" />
            <span>Instant Price Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Live Trip Cost <span className="text-brand-red">Estimator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-normal">
            Select your preferences below to get a real-time transparent cost estimate. No hidden fees.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Controls Column (8 Cols) */}
          <div className="p-6 sm:p-8 lg:col-span-7 space-y-6">
            {/* 1. Destination Select */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                1. Choose Destination
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === selectedDestId;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setSelectedDestId(dest.id)}
                      className={`text-left p-3 rounded-xl border text-xs font-bold transition-all touch-manipulation ${
                        isSelected
                          ? "bg-brand-red text-white border-brand-red shadow-md scale-[1.02]"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <div className="line-clamp-1">{dest.name}</div>
                      <div className={`text-[10px] mt-1 font-semibold ${isSelected ? "text-rose-100" : "text-slate-500"}`}>
                        {dest.duration}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Travellers Stepper */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                2. Number of Travellers
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Adults */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Adults (12+ yrs)</div>
                    <div className="text-[10px] text-slate-500">Base full fare</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs touch-manipulation select-none active:scale-95"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-black text-sm text-slate-900">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((prev) => Math.min(15, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs touch-manipulation select-none active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Kids */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kids (5 - 11 yrs)</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">50% Special Discount</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setKids((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs touch-manipulation select-none active:scale-95"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-black text-sm text-slate-900">{kids}</span>
                    <button
                      type="button"
                      onClick={() => setKids((prev) => Math.min(8, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center text-sm shadow-xs touch-manipulation select-none active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Hotel Category */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                3. Hotel Preference
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "3star", title: "3★ Deluxe", desc: "Clean & Comfortable", extra: "Included" },
                  { id: "4star", title: "4★ Premium", desc: "View Resort / Buffet", extra: "+₹2.5k / person" },
                  { id: "5star", title: "5★ Luxury", desc: "Heritage & 5-Star", extra: "+₹5.5k / person" },
                ].map((tier) => {
                  const isSelected = hotelTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setHotelTier(tier.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-brand-red bg-rose-50/60 ring-1 ring-brand-red"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-black text-slate-900">{tier.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{tier.desc}</div>
                      <div className="text-[10px] font-bold text-brand-red mt-1.5">{tier.extra}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Cab Type */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                4. Dedicated Vehicle
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "sedan", title: "AC Sedan", desc: "Swift Dzire / Etios", tag: "Ideal 2-4 Pax" },
                  { id: "suv", title: "Premium SUV", desc: "Ertiga / Innova", tag: "+₹3k Total" },
                  { id: "tempo", title: "Tempo Traveller", desc: "12-17 Seater", tag: "Large Groups" },
                ].map((cab) => {
                  const isSelected = vehicleType === cab.id;
                  return (
                    <button
                      key={cab.id}
                      type="button"
                      onClick={() => setVehicleType(cab.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-brand-red bg-rose-50/60 ring-1 ring-brand-red"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="text-xs font-black text-slate-900">{cab.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{cab.desc}</div>
                      <div className="text-[10px] font-bold text-emerald-600 mt-1.5">{cab.tag}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Column (5 Cols) */}
          <div className="p-6 sm:p-8 lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-800 to-navy text-white flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-700">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                  Calculated Estimate
                </span>
                <span className="text-xs text-slate-300 font-medium">{selectedDest.duration}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mb-1">
                {selectedDest.name}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Personalized for {calculation.totalTravellers} Traveller{calculation.totalTravellers > 1 ? "s" : ""}
              </p>

              {/* Price Display */}
              <div className="bg-white/10 rounded-2xl p-5 border border-white/10 backdrop-blur-sm space-y-3 mb-6">
                <div>
                  <div className="text-xs text-slate-300 font-medium">Estimated Total Package Cost:</div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 flex items-baseline gap-1">
                    <span>₹{calculation.totalCost.toLocaleString("en-IN")}</span>
                    <span className="text-xs font-normal text-slate-400">approx</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Cost Per Person:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    ₹{calculation.perPersonCost.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Token to Lock Date (20%):</span>
                  <span className="font-bold text-amber-300">
                    ₹{calculation.advanceAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Includes Hotels + Breakfast + Dedicated Cab</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>No hidden charges • 100% Flexible dates</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleLockPriceWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold h-[48px] rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] text-xs sm:text-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Lock This Price on WhatsApp</span>
              </button>

              <div className="text-[11px] text-center text-slate-400">
                ⚡ Instant WhatsApp reply within 15 minutes guaranteed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
