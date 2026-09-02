import { siteConfig } from "./config";

/**
 * Clean phone number to ensure proper format for wa.me URL
 */
const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/[^0-9]/g, "");
};

/**
 * Generate standard WhatsApp URL with customized pre-filled message
 */
export function getWhatsAppLink(message?: string): string {
  const number = cleanPhoneNumber(siteConfig.whatsappNumber);
  const defaultText = "Hi My Krishna Travels, I am interested in planning a trip. Please help me with a customized package.";
  const encodedText = encodeURIComponent(message || defaultText);
  return `https://wa.me/${number}?text=${encodedText}`;
}

/**
 * Generate package-specific WhatsApp URL
 */
export function getPackageWhatsAppLink(packageName: string, destination?: string): string {
  const text = `Hi My Krishna Travels, I am interested in the "${packageName}" package${
    destination ? ` for ${destination}` : ""
  }. Please share the detailed itinerary and pricing.`;
  return getWhatsAppLink(text);
}

/**
 * Generate destination-specific WhatsApp URL
 */
export function getDestinationWhatsAppLink(destinationName: string): string {
  const text = `Hi My Krishna Travels, I want to plan a trip to ${destinationName}. Please share available customized packages and options.`;
  return getWhatsAppLink(text);
}

/**
 * Generate enquiry-form WhatsApp URL with user inputs
 */
export function getEnquiryWhatsAppLink(data: {
  name?: string;
  destination?: string;
  date?: string;
  travellers?: string;
  budget?: string;
}): string {
  let text = `Hi My Krishna Travels, I would like to get a quote for a trip:\n`;
  if (data.name) text += `• Name: ${data.name}\n`;
  if (data.destination) text += `• Destination: ${data.destination}\n`;
  if (data.date) text += `• Travel Date: ${data.date}\n`;
  if (data.travellers) text += `• Travellers: ${data.travellers}\n`;
  if (data.budget) text += `• Budget: ${data.budget}\n`;
  text += `Please get in touch with me with a customized itinerary.`;

  return getWhatsAppLink(text);
}
