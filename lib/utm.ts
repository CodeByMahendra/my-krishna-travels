export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  capturedAt?: string;
}

const STORAGE_KEY = "my_krishna_travels_utm";

/**
 * Capture UTM parameters from window.location and store in sessionStorage/localStorage
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const hasUTM = Array.from(urlParams.keys()).some((key) => key.startsWith("utm_"));

    if (hasUTM) {
      const utm: UTMParams = {
        utm_source: urlParams.get("utm_source") || undefined,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        referrer: document.referrer || undefined,
        capturedAt: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
      return utm;
    }

    // Retrieve existing UTM if present
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Failed to capture UTM params", e);
  }

  return {};
}

/**
 * Get stored UTM parameters for form payloads
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    return {};
  }
}
