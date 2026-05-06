import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.makwines.co.uk"),
  title: {
    default: "Mak Wines - Premium Wines, Spirits & Vapes in Abingdon, Oxfordshire",
    template: "%s | Mak Wines",
  },
  description: "Mak Wines is your premier off-licence in Abingdon, Oxfordshire. Shop quality wines, spirits, beers, ciders, vapes, e-liquids and sweets at unbeatable prices. Visit us at Peachcroft Shopping Centre.",
  keywords: [
    "wines Abingdon",
    "spirits Oxfordshire",
    "vapes Abingdon",
    "e-liquids",
    "beer",
    "cider",
    "off-licence Abingdon",
    "off-licence Oxfordshire",
    "Mak Wines",
    "wine shop near me",
    "spirits shop Abingdon",
    "vape shop Oxfordshire",
    "Peachcroft Shopping Centre",
    "alcohol delivery Abingdon",
    "premium wines UK",
    "cheap spirits Abingdon",
  ],
  authors: [{ name: "Mak Wines" }],
  creator: "Mak Wines",
  publisher: "Mak Wines",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Mak Wines - Premium Wines, Spirits & Vapes in Abingdon",
    description: "Your premier off-licence for quality wines, spirits, beers, vapes and more at unbeatable prices. Visit us in Abingdon, Oxfordshire.",
    url: "https://www.makwines.co.uk",
    siteName: "Mak Wines",
    images: [
      {
        url: "https://www.makwines.co.uk/Images/wine-978688_1280.jpg",
        width: 1280,
        height: 853,
        alt: "Mak Wines - Premium Wines, Spirits & Vapes Shop",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mak Wines - Premium Wines, Spirits & Vapes",
    description: "Your premier off-licence for quality wines, spirits, beers, vapes and more at unbeatable prices in Abingdon, Oxfordshire.",
    images: ["https://www.makwines.co.uk/Images/wine-978688_1280.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.makwines.co.uk",
  },
  category: "shopping",
};

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LiquorStore",
  name: "Mak Wines",
  image: "https://www.makwines.co.uk/Images/wine-978688_1280.jpg",
  "@id": "https://www.makwines.co.uk",
  url: "https://www.makwines.co.uk",
  telephone: "",
  email: "mak@makwines.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "6 Peachcroft Shopping Centre, Peachcroft Road",
    addressLocality: "Abingdon",
    addressRegion: "Oxfordshire",
    postalCode: "OX14 2QA",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.6708,
    longitude: -1.2880,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "22:00",
    },
  ],
  priceRange: "££",
  servesCuisine: ["Wines", "Spirits", "Beers", "Vapes", "E-Liquids"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Products",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Wines",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Red Wines" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "White Wines" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Rosé Wines" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sparkling Wines" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Spirits",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Vodka" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Whisky" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Gin" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Rum" } },
        ],
      },
      {
        "@type": "OfferCatalog",
        name: "Vapes & E-Liquids",
      },
      {
        "@type": "OfferCatalog",
        name: "Beers & Ciders",
      },
    ],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
