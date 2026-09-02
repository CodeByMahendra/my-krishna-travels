import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import MetaAnalytics from "@/components/common/MetaAnalytics";
import { siteConfig } from "@/lib/config";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.website),
  title: {
    default: `${siteConfig.name} | Customized Tours & Travel Packages`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "My Krishna Travels",
    "MyKrishnaTravels.in",
    "Tours and Travels",
    "Customized Tour Packages",
    "Kashmir Tour Packages",
    "Manali Family Trip",
    "Goa Beach Packages",
    "Dubai Holiday Package",
    "Bali Honeymoon Specials",
    "Travel Agency India",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.website,
    title: `${siteConfig.name} | Customized Tours & Travel Packages`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-light-bg text-brand-dark selection:bg-primary-blue selection:text-white pb-16 md:pb-0">
        <MetaAnalytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileStickyBar />
        <WhatsAppButton variant="floating" source="FloatingButton" />
      </body>
    </html>
  );
}
