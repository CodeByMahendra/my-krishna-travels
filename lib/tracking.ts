import { siteConfig } from "./config";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Track generic analytics event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window === "undefined") return;

  // Track in Meta Pixel (Facebook / Instagram Ads)
  if (window.fbq) {
    try {
      window.fbq("trackCustom", eventName, eventParams);
    } catch (err) {
      console.warn("Meta Pixel trackCustom error:", err);
    }
  }

  // Track in Google Analytics
  if (window.gtag && siteConfig.gaId) {
    try {
      window.gtag("event", eventName, eventParams);
    } catch (err) {
      console.warn("Google Analytics event error:", err);
    }
  }
}

/**
 * Track Lead event (e.g. form submission, quote request)
 */
export function trackLead(leadData?: Record<string, any>) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    try {
      window.fbq("track", "Lead", leadData);
    } catch (err) {
      console.warn("Meta Pixel Lead track error:", err);
    }
  }

  trackEvent("generate_lead", leadData);
}

/**
 * Track WhatsApp Click event
 */
export function trackWhatsAppClick(source?: string) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    try {
      window.fbq("track", "Contact", { method: "WhatsApp", source: source || "General" });
    } catch (err) {
      console.warn("Meta Pixel WhatsApp click track error:", err);
    }
  }

  trackEvent("whatsapp_click", { source: source || "General" });
}

/**
 * Track Quote Request event
 */
export function trackQuoteRequest(packageName?: string, destination?: string) {
  trackLead({
    content_name: packageName || "Custom Trip",
    content_category: destination || "Travel Package",
    event_type: "QuoteRequest",
  });
}

/**
 * Track ViewContent event (when user views a package or destination page)
 */
export function trackViewContent(title: string, category: string, id?: string) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    try {
      window.fbq("track", "ViewContent", {
        content_name: title,
        content_category: category,
        content_ids: id ? [id] : [],
      });
    } catch (err) {
      console.warn("Meta Pixel ViewContent error:", err);
    }
  }

  trackEvent("view_item", {
    item_name: title,
    item_category: category,
    item_id: id,
  });
}
