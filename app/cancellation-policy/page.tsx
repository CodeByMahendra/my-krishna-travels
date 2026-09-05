import React from "react";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Cancellation & Refund Policy | My Krishna Travels",
  description: "Detailed cancellation terms, refund schedules, and booking modification rules for My Krishna Travels tour packages.",
};

export default function CancellationPolicyPage() {
  return (
    <div className="bg-light-bg min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-[14px] border border-brand-border shadow-card space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy border-l-4 border-primary-blue pl-4">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs text-brand-muted">Last updated: February 2026</p>

          <div className="space-y-4 text-sm text-brand-dark leading-relaxed font-normal">
            <p>
              At <strong>{siteConfig.name}</strong>, we understand that travel plans can sometimes change unexpectedly. We maintain clear cancellation guidelines for all our customized domestic and international tour packages.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">1. Standard Cancellation Schedule</h2>
            <div className="bg-light-bg p-4 rounded-[8px] border border-brand-border space-y-2 text-xs sm:text-sm font-medium">
              <p>• <strong>30+ Days Prior to Travel:</strong> Minimal processing fee / 90% Refund of land package amount.</p>
              <p>• <strong>15 to 29 Days Prior to Travel:</strong> 50% Refund of total tour cost.</p>
              <p>• <strong>7 to 14 Days Prior to Travel:</strong> 25% Refund of total tour cost.</p>
              <p>• <strong>Less than 7 Days / No-Show:</strong> Non-refundable due to non-refundable hotel & transport commitments.</p>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">2. Flight & Special Attraction Tickets</h2>
            <p>
              Flight tickets, train bookings, and special non-refundable permits (such as cable car tickets or safari permits) follow the respective airline/vendor cancellation rules and are processed accordingly.
            </p>

            <h2 className="text-base sm:text-lg font-bold text-navy pt-2">3. Refund Process</h2>
            <p>
              Approved refunds are processed back to the original payment mode within 7 to 10 business days after receiving formal written cancellation confirmation over email or WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
