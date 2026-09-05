import React from "react";
import { UserCheck, ShieldCheck, Sliders, Home, Compass, PhoneCall } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <UserCheck className="w-6 h-6 text-primary-blue" />,
      title: "Personalized Itineraries",
      description: "Every trip is designed uniquely around your specific destination preferences, dates, and budget.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary-blue" />,
      title: "Trusted Travel Assistance",
      description: "Dedicated support and ground coordination before, during, and after your entire journey.",
    },
    {
      icon: <Sliders className="w-6 h-6 text-primary-blue" />,
      title: "Flexible Travel Plans",
      description: "Tailor packages according to your choice of hotels, cab options, sightseeing spots, and activity levels.",
    },
    {
      icon: <Home className="w-6 h-6 text-primary-blue" />,
      title: "Hotel & Transport Assistance",
      description: "Verified handpicked hotels and experienced drivers with private vehicles under one roof.",
    },
    {
      icon: <Compass className="w-6 h-6 text-primary-blue" />,
      title: "Transparent Guidance",
      description: "Clear communication regarding package inclusions, exclusions, and honest advice with no hidden fees.",
    },
    {
      icon: <PhoneCall className="w-6 h-6 text-primary-blue" />,
      title: "Dedicated Support",
      description: "Instant assistance and direct connection with travel consultants via WhatsApp and phone call.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-light-blue border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-primary-blue font-bold text-xs uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-primary-blue/15">
            Our Commitment
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            Why Travel With My Krishna Travels?
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            We focus on making your travel hassle-free, comfortable, and tailored to your exact desires.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 sm:p-7 rounded-xl sm:rounded-[14px] border border-brand-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 space-y-2 sm:space-y-4 group"
            >
              <div className="w-9 h-9 sm:w-[48px] sm:h-[48px] rounded-lg bg-light-blue border border-primary-blue/15 flex items-center justify-center p-1.5 sm:p-2.5 transition-transform group-hover:scale-105">
                {React.cloneElement(item.icon, { className: "w-4 h-4 sm:w-6 sm:h-6 text-primary-blue" })}
              </div>
              <h3 className="text-xs sm:text-xl font-bold text-navy leading-snug">{item.title}</h3>
              <p className="text-[11px] sm:text-sm text-brand-muted leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

