export const siteConfig = {
  name: "My Krishna Travels.in",
  tagline: "Your Journey, Our Responsibility.",
  subTagline: "Discover unforgettable journeys, thoughtfully planned just for you.",
  description: "From weekend getaways to complete family holidays, we create customized travel experiences designed around your destination, budget and preferences.",
  website: "https://mykrishnatravels.in",
  domain: "MyKrishnaTravels.in",
  
  // Central Contact Configuration (Configurable via environment variables)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@mykrishnatravels.in",
  phoneNumber: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 98765 43210",
  businessAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "101, Travel Plaza, Main Road, New Delhi, India - 110001",
  businessHours: "Mon - Sat: 9:00 AM - 8:00 PM | Sun: 10:00 AM - 5:00 PM",

  // Analytics & Tracking
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",

  // Social Links
  socials: {
    instagram: "https://instagram.com/mykrishnatravels.in",
    facebook: "https://facebook.com/mykrishnatravels.in",
    whatsapp: "https://wa.me/919876543210",
    youtube: "https://youtube.com/@mykrishnatravels",
  },

  // Trust Highlights
  trustItems: [
    "100% Customized Tour Packages",
    "Dedicated 24/7 Travel Assistance",
    "Verified Hotels & Skilled Drivers",
    "Transparent Pricing - No Hidden Fees",
  ],
};
