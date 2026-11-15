import type { Metadata, Viewport } from "next";
import {
  Questrial,
  Raleway,
  Instrument_Sans,
  Abhaya_Libre,
  Stack_Sans_Headline,
  Stack_Sans_Text,
  WindSong,
} from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "../components/layout/ClientLayoutWrapper";

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const abhayaLibre = Abhaya_Libre({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-abhaya-libre",
  display: "swap",
});

const stackSansHeadline = Stack_Sans_Headline({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-stack-headline",
  display: "swap",
});

const stackSansText = Stack_Sans_Text({
  weight: ["200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-stack-text",
  display: "swap",
});

const windSong = WindSong({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-windsong",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridesberry.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bridal Jewellery & Accessories Online | Brides Berry",
    template: "%s | Brides Berry",
  },
  description:
    "Handcrafted bridal earrings, necklaces, heels and hair accessories for Kerala and Indian brides. Shop luxury wedding jewellery online with fast delivery across India.",
  keywords: [
    "bridal jewellery online",
    "bridal accessories India",
    "handcrafted bridal jewellery",
    "luxury bridal jewellery Kerala",
    "bridal earrings",
    "wedding necklace set",
    "bridal heels",
    "bridal store Kochi",
    "bridal store Edappally",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bridal Jewellery & Accessories Online | Brides Berry",
    description:
      "Handcrafted bridal earrings, necklaces, heels and hair accessories for Kerala and Indian brides. Shop luxury wedding jewellery online with fast delivery across India.",
    url: siteUrl,
    siteName: "Brides Berry",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Brides Berry — Bridal Jewellery & Accessories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridal Jewellery & Accessories Online | Brides Berry",
    description:
      "Handcrafted bridal earrings, necklaces, heels and hair accessories for Kerala and Indian brides.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Brides Berry",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      email: "rootmentsit@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "MG Road",
        addressLocality: "Ernakulam",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      sameAs: [
        "https://instagram.com/bridesberry",
        "https://facebook.com/bridesberry",
        "https://pinterest.com/bridesberry",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Brides Berry Bridal Jewellery Studio",
      url: siteUrl,
      image: `${siteUrl}/icon.png`,
      priceRange: "₹₹",
      telephone: "+91-7025743212",
      address: {
        "@type": "PostalAddress",
        streetAddress: "MG Road",
        addressLocality: "Ernakulam",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${questrial.variable} ${raleway.variable} ${instrumentSans.variable} ${abhayaLibre.variable} ${stackSansHeadline.variable} ${stackSansText.variable} ${windSong.variable} h-full scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&family=Stack+Sans+Headline:wght@200..700&family=Stack+Sans+Text:wght@200..700&family=WindSong:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-gold-200 selection:text-neutral-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}


