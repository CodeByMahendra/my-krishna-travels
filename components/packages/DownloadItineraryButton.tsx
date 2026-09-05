"use client";

import React, { useState } from "react";
import { Download, FileText, Check, Loader2 } from "lucide-react";
import { TourPackage } from "@/data/packages";
import { siteConfig } from "@/lib/config";

interface DownloadItineraryButtonProps {
  pkg: TourPackage;
  variant?: "primary" | "outline" | "compact";
}

export default function DownloadItineraryButton({
  pkg,
  variant = "outline",
}: DownloadItineraryButtonProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPDF = () => {
    setDownloading(true);

    // Construct printable HTML document with clean professional branding
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${pkg.name} - Detailed Itinerary | My Krishna Travels</title>
          <style>
            @page { size: A4; margin: 18mm 15mm; }
            * { box-sizing: border-box; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; line-height: 1.5; margin: 0; padding: 0; background: #ffffff; font-size: 13px; }
            .header { border-bottom: 2px solid #ef4444; padding-bottom: 14px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
            .brand-name { font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; }
            .brand-name span { color: #ef4444; }
            .brand-tagline { font-size: 11px; color: #64748b; margin-top: 2px; }
            .contact-info { text-align: right; font-size: 11px; color: #475569; }
            .badge { display: inline-block; background: #fee2e2; color: #b91c1c; font-weight: 800; font-size: 10px; padding: 3px 8px; border-radius: 6px; text-transform: uppercase; margin-bottom: 6px; }
            .title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 4px 0 6px; }
            .overview-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 20px; }
            .overview-item { font-size: 11px; }
            .overview-label { color: #64748b; font-weight: 600; text-transform: uppercase; font-size: 9px; }
            .overview-value { font-weight: 700; color: #0f172a; font-size: 12px; margin-top: 2px; }
            .section-title { font-size: 14px; font-weight: 800; color: #0f172a; border-left: 4px solid #ef4444; padding-left: 8px; margin: 18px 0 10px; text-transform: uppercase; letter-spacing: 0.5px; }
            .highlights-list { padding-left: 18px; margin: 8px 0 16px; }
            .highlights-list li { margin-bottom: 4px; }
            .itinerary-day { margin-bottom: 14px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; page-break-inside: avoid; }
            .day-header { background: #f1f5f9; padding: 8px 12px; font-weight: 700; font-size: 12px; color: #0f172a; display: flex; justify-content: space-between; }
            .day-body { padding: 10px 12px; font-size: 12px; color: #334155; }
            .day-activities { margin-top: 6px; padding-left: 16px; font-size: 11px; color: #475569; }
            .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 14px; page-break-inside: avoid; }
            .box { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
            .box ul { padding-left: 16px; margin: 6px 0 0; font-size: 11px; }
            .box li { margin-bottom: 4px; }
            .inc { border-top: 3px solid #22c55e; }
            .exc { border-top: 3px solid #f43f5e; }
            .footer { margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #94a3b8; }
            .cta-box { background: #fef2f2; border: 1px dashed #ef4444; border-radius: 8px; padding: 12px; text-align: center; margin-top: 18px; page-break-inside: avoid; }
            .cta-title { font-weight: 800; color: #991b1b; font-size: 13px; }
            .cta-phone { font-size: 14px; font-weight: 900; color: #ef4444; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1 class="brand-name">My Krishna <span>Travels</span></h1>
              <div class="brand-tagline">Your Journey, Our Responsibility • Govt. Registered Tour Agency</div>
            </div>
            <div class="contact-info">
              <div><strong>WhatsApp / Call:</strong> ${siteConfig.phoneNumber}</div>
              <div><strong>Email:</strong> ${siteConfig.contactEmail}</div>
              <div><strong>Web:</strong> ${siteConfig.website}</div>
            </div>
          </div>

          <span class="badge">Official Tour Itinerary & Quotation</span>
          <h2 class="title">${pkg.name}</h2>
          <p style="color: #64748b; margin: 0 0 14px; font-size: 12px;">${pkg.description}</p>

          <div class="overview-grid">
            <div class="overview-item">
              <div class="overview-label">Duration</div>
              <div class="overview-value">${pkg.duration}</div>
            </div>
            <div class="overview-item">
              <div class="overview-label">Destination</div>
              <div class="overview-value">${pkg.destination}</div>
            </div>
            <div class="overview-item">
              <div class="overview-label">Tour Type</div>
              <div class="overview-value" style="color: #0b7285;">Private Customized</div>
            </div>
            <div class="overview-item">
              <div class="overview-label">Customization</div>
              <div class="overview-value">100% Flexible</div>
            </div>
          </div>

          <div class="section-title">Tour Highlights</div>
          <ul class="highlights-list">
            ${(pkg.highlights || []).map((h) => `<li>${h}</li>`).join("")}
          </ul>

          <div class="section-title">Day-by-Day Itinerary</div>
          ${(pkg.itinerary || [])
            .map(
              (day) => `
            <div class="itinerary-day">
              <div class="day-header">
                <span>Day ${day.day}: ${day.title}</span>
              </div>
              <div class="day-body">
                <div>${day.description}</div>
                ${
                  day.activities && day.activities.length > 0
                    ? `
                  <ul class="day-activities">
                    ${day.activities.map((a) => `<li>${a}</li>`).join("")}
                  </ul>`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}

          <div class="two-col">
            <div class="box inc">
              <strong style="color: #15803d; font-size: 12px;">✓ Package Inclusions:</strong>
              <ul>
                ${(pkg.inclusions || []).map((inc) => `<li>${inc}</li>`).join("")}
              </ul>
            </div>
            <div class="box exc">
              <strong style="color: #b91c1c; font-size: 12px;">✗ Exclusions:</strong>
              <ul>
                ${(pkg.exclusions || []).map((exc) => `<li>${exc}</li>`).join("")}
              </ul>
            </div>
          </div>

          <div class="cta-box">
            <div class="cta-title">Ready to Book or Need Custom Changes in this Itinerary?</div>
            <div style="font-size: 11px; color: #475569; margin-top: 2px;">Contact our senior tour planner directly for group discounts and date bookings.</div>
            <div class="cta-phone">📞 Call / WhatsApp: ${siteConfig.phoneNumber}</div>
          </div>

          <div class="footer">
            <div>My Krishna Travels • Verified Travel Partner</div>
            <div>Generated for Personal Trip Reference • Prices Subject to Availability</div>
          </div>
        </body>
      </html>
    `;

    // 100% Reliable print rendering (works on mobile & desktop, bypasses popup blockers)
    try {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow?.document;
      if (doc && iframe.contentWindow) {
        doc.open();
        doc.write(printContent);
        doc.close();

        setTimeout(() => {
          try {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
          } catch (e) {
            console.error("Print error:", e);
          } finally {
            setDownloading(false);
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 4000);
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 3000);
          }
        }, 500);
      } else {
        throw new Error("Unable to access iframe document");
      }
    } catch (err) {
      console.warn("Iframe print fallback to window.open:", err);
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(printContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
          setDownloading(false);
          setDownloaded(true);
          setTimeout(() => setDownloaded(false), 4000);
        }, 500);
      } else {
        setDownloading(false);
      }
    }
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleDownloadPDF}
        disabled={downloading}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-red transition-colors py-1 px-2.5 rounded-lg border border-slate-200 hover:border-brand-red/30 bg-white"
        title="Download Itinerary PDF"
      >
        {downloading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-red" />
        ) : downloaded ? (
          <Check className="w-3.5 h-3.5 text-emerald-600" />
        ) : (
          <FileText className="w-3.5 h-3.5" />
        )}
        <span>{downloaded ? "Downloaded!" : "Itinerary PDF"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleDownloadPDF}
      disabled={downloading}
      className={`h-[48px] px-6 rounded-[8px] font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
        variant === "primary"
          ? "bg-brand-red hover:bg-brand-red-dark text-white shadow-sm"
          : "bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-slate-400 shadow-xs"
      }`}
    >
      {downloading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
          <span>Generating PDF...</span>
        </>
      ) : downloaded ? (
        <>
          <Check className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700">Itinerary Ready!</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4 text-brand-red" />
          <span>Download Itinerary PDF</span>
        </>
      )}
    </button>
  );
}
