import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import ContactForm from "@/components/forms/ContactForm";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FinalCTA from "@/components/home/FinalCTA";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Contact Us | Get Free Travel Quote",
  description: "Connect with My Krishna Travels team via Phone, WhatsApp, or Email for customized tour packages and travel assistance.",
};

export default function ContactPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Contact Us" }]} />

        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="bg-light-blue text-primary-blue px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-blue/15">
            We&apos;re Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-navy tracking-tight">
            Contact My Krishna Travels
          </h1>
          <p className="text-brand-muted text-sm sm:text-base font-normal">
            Reach out to our travel specialists for customized itinerary planning, quotes, or booking assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            {/* Phone */}
            <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-brand-border shadow-card flex items-start gap-4">
              <div className="w-12 h-12 rounded-[8px] bg-light-blue text-primary-blue flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-navy">Phone Call</h3>
                <p className="text-xs text-brand-muted font-normal">Speak directly with a travel expert</p>
                <a
                  href={`tel:${siteConfig.phoneNumber}`}
                  className="text-primary-blue font-extrabold text-base hover:underline block pt-0.5"
                >
                  {siteConfig.phoneNumber}
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-brand-border shadow-card flex items-start gap-4">
              <div className="w-12 h-12 rounded-[8px] bg-emerald-50 text-brand-whatsapp border border-brand-whatsapp/20 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-6 h-6 text-brand-whatsapp" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-navy">WhatsApp Instant Chat</h3>
                <p className="text-xs text-brand-muted font-normal">Fast replies for quotes & package details</p>
                <div className="pt-2">
                  <WhatsAppButton variant="accent" text="Chat on WhatsApp" source="ContactPage" className="py-2 px-4 rounded-[8px] text-xs h-[40px]" />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-brand-border shadow-card flex items-start gap-4">
              <div className="w-12 h-12 rounded-[8px] bg-light-blue text-primary-blue flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-navy">Email Address</h3>
                <p className="text-xs text-brand-muted font-normal">Send us detailed itineraries or feedback</p>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-primary-blue font-bold text-sm hover:underline block pt-0.5"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>
            </div>

            {/* Office & Hours */}
            <div className="bg-white p-5 sm:p-6 rounded-[14px] border border-brand-border shadow-card space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-[8px] bg-light-blue text-primary-blue flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-navy">Office Location</h3>
                  <p className="text-xs text-brand-muted leading-relaxed font-normal">{siteConfig.businessAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-brand-border/60">
                <div className="w-12 h-12 rounded-[8px] bg-light-blue text-primary-blue flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-navy">Business Hours</h3>
                  <p className="text-xs text-brand-muted font-normal">{siteConfig.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>

      <FinalCTA />
    </div>
  );
}

