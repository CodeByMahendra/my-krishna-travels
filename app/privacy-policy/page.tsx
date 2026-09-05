import React from "react";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Privacy Policy | My Krishna Travels",
  description: "Read our privacy policy regarding how My Krishna Travels collects, protects, and uses customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[14px] border border-brand-border shadow-card space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy border-l-4 border-primary-blue pl-4">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-muted">Last updated: February 2026</p>

          <div className="space-y-4 text-sm text-brand-dark leading-relaxed font-normal">
            <p>
              At <strong>{siteConfig.name}</strong> ({siteConfig.domain}), we respect your privacy and are committed to protecting the personal information you share with us when visiting our website or submitting trip inquiries.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">1. Information We Collect</h2>
            <p>
              When you submit a trip enquiry, request a free quote, or contact us through WhatsApp or phone, we collect details such as your Name, Phone Number/WhatsApp number, Email Address, Destination Preferences, Travel Dates, and Budget requirements.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To prepare customized tour proposals, quotes, and day-by-day itineraries.</li>
              <li>To communicate with you via WhatsApp, Phone Call, or Email regarding your travel enquiry.</li>
              <li>To facilitate hotel reservations, cab transfers, and tour arrangements upon your confirmation.</li>
              <li>To optimize ad performance and measure lead conversion metrics across Meta Ads and Google Analytics.</li>
            </ul>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">3. Data Sharing & Security</h2>
            <p>
              We do not sell or rent your personal information to third-party marketing companies. Your contact information is only shared with verified ground operational partners (e.g. booked hotels or drivers) as required to fulfill your confirmed travel itinerary.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">4. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please email us at{" "}
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
