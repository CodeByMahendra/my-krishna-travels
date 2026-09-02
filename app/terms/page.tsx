import React from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Terms & Conditions | My Krishna Travels",
  description: "Terms and conditions governing tour bookings, customized itineraries, and services provided by My Krishna Travels.",
};

export default function TermsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />

        <div className="bg-white p-8 sm:p-12 rounded-[14px] border border-brand-border shadow-card space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy border-l-4 border-primary-blue pl-4">
            Terms & Conditions
          </h1>
          <p className="text-xs text-brand-muted">Last updated: February 2026</p>

          <div className="space-y-4 text-sm text-brand-dark leading-relaxed font-normal">
            <p>
              Welcome to <strong>{siteConfig.name}</strong>. By accessing our website, requesting quotations, or confirming tour packages with us, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">1. Tour Customization & Quotes</h2>
            <p>
              All prices shown on our website (such as ₹XX,XXX) serve as starting reference prices. Final customized tour costs depend on seasonal hotel rates, vehicle choices, travel dates, and special requirements confirmed in your final quote.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">2. Booking & Payments</h2>
            <p>
              A advance deposit is required to confirm hotel reservations and dedicated vehicle blockings. The remaining balance must be cleared as specified in your booking confirmation voucher prior to or upon arrival.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">3. Modifications & Unforeseen Events</h2>
            <p>
              While we strive to adhere to agreed itineraries, route alterations due to unexpected weather conditions, land slides, road closures, or government regulations remain beyond our direct control. In such cases, alternative arrangements will be made for your safety.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">4. Support & Communication</h2>
            <p>
              Our team remains available over WhatsApp and Phone throughout your journey for assistance. For official inquiries, reach us at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary-blue font-semibold hover:underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
