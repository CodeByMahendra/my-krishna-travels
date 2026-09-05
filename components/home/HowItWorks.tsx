import React from "react";
import { MessageSquare, FileText, CheckCircle2, PlaneTakeoff } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare className="w-6 h-6 text-primary-blue" />,
      title: "Tell Us Your Plan",
      desc: "Share your travel destination, preferred dates, number of travellers, and budget via our quick form or WhatsApp.",
    },
    {
      num: "02",
      icon: <FileText className="w-6 h-6 text-primary-blue" />,
      title: "Get Your Customized Itinerary",
      desc: "Our travel specialist crafts a personalized day-by-day plan with hotel & vehicle options for your review.",
    },
    {
      num: "03",
      icon: <CheckCircle2 className="w-6 h-6 text-primary-blue" />,
      title: "Confirm Your Trip",
      desc: "Finalize your preferences, review transparent quote details, and confirm your booking hassle-free.",
    },
    {
      num: "04",
      icon: <PlaneTakeoff className="w-6 h-6 text-primary-blue" />,
      title: "Travel & Enjoy",
      desc: "Embark on your journey with 24/7 dedicated support and seamless local assistance every step of the way.",
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-primary-blue font-bold text-xs uppercase tracking-wider bg-light-blue px-3.5 py-1 rounded-full border border-primary-blue/15">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-navy tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-brand-muted font-normal">
            From your first inquiry to your final drop-off, we handle everything for you.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-light-bg p-3.5 sm:p-6 rounded-xl sm:rounded-[14px] border border-brand-border space-y-2 sm:space-y-4 hover:border-primary-blue/30 transition-all duration-200 shadow-subtle flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-2xl font-extrabold text-navy/40 font-mono">
                  {step.num}
                </span>
                <div className="p-1.5 sm:p-2.5 bg-white rounded-lg shadow-xs border border-brand-border">
                  {React.cloneElement(step.icon, { className: "w-4 h-4 sm:w-6 sm:h-6 text-primary-blue" })}
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-xs sm:text-lg font-bold text-navy leading-snug">{step.title}</h3>
                <p className="text-[11px] sm:text-sm text-brand-muted leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

