import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Brides Berry | Bridal Jewelry & Accessories",
  description: "Discover handcrafted luxury bridal jewelry and accessories made for your most beautiful moments.",
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
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-neutral-900 selection:bg-gold-200 selection:text-neutral-900">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}


