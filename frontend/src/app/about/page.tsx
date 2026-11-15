import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridesberry.com";

export const metadata: Metadata = {
  title: "About Us | Handcrafted Bridal Jewellery & Accessories",
  description:
    "Discover the story of Brides Berry — handcrafted luxury bridal earrings, necklaces, heels, and accessories designed for your most beautiful moments in Kerala and across India.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Brides Berry | Handcrafted Bridal Jewellery",
    description:
      "Crafted with devotion for the modern bride. Discover our design philosophy, artisanal heritage, and Kerala bridal collections.",
    url: `${siteUrl}/about`,
    siteName: "Brides Berry",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-left">
      {/* Hero Header */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pb-12 sm:pb-16 border-b border-neutral-150">
        <div className="max-w-3xl">
          <span
            style={{
              fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
              letterSpacing: "0.22em",
            }}
            className="text-[11px] sm:text-xs uppercase text-[#B78924] font-medium block mb-3"
          >
            Our Story &amp; Craft
          </span>
          <h1
            style={{
              fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
              fontWeight: 200,
              fontSize: "clamp(34px, 4.5vw, 60px)",
              lineHeight: "108%",
              letterSpacing: "0%",
            }}
            className="text-neutral-900 uppercase"
          >
            Made for Your Most
            <br />
            Beautiful Moments
          </h1>
          <p className="mt-5 text-sm sm:text-base text-neutral-600 font-questrial leading-relaxed max-w-2xl">
            Brides Berry was born from a singular conviction: that a bride’s jewelry should feel as unforgettable and deeply personal as the vows she takes. Every earring, necklace set, and embellished heel in our atelier balances heirloom craftsmanship with feather-light comfort.
          </p>
        </div>
      </div>

      {/* Main Narrative Section */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pt-12 sm:pt-16 space-y-16 sm:space-y-24">
        {/* Story Row 1: The Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3.2] bg-[#FAF7F2] overflow-hidden border border-neutral-200">
            <Image
              src="/hero-bg-v2.jpg"
              alt="Brides Berry Bridal Jewelry Atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[10px] uppercase tracking-[0.24em] text-[#B78924] font-medium block font-questrial">
              Artisanal Heritage
            </span>
            <h2
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 200,
                fontSize: "clamp(26px, 2.8vw, 38px)",
                lineHeight: "115%",
              }}
              className="text-[#310C13]"
            >
              Quiet Luxury,
              <br />
              Woven with Tradition
            </h2>
            <p className="text-sm text-neutral-600 font-questrial leading-relaxed">
              Rooted in the cultural tapestry of Kerala and celebrating Indian bridal diversity, our collections honor classic bridal motifs while embracing modern minimalism. Whether completing a regal Kasavu saree for an intimate temple wedding, layering pearls for a Christian church ceremony, or selecting contemporary kundan for a sangeet reception, Brides Berry creates accessories that resonate through generations.
            </p>
            <p className="text-sm text-neutral-600 font-questrial leading-relaxed">
              We work exclusively with artisan metalsmiths and stone-setters who treat each piece with jeweler precision. Every setting is hand-finished, hypoallergenic, and coated with protective anti-tarnish plating designed to remain brilliant long after your wedding day.
            </p>
          </div>
        </div>

        {/* Pillars / Values Grid */}
        <div className="border-t border-neutral-150 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="space-y-3">
              <span className="text-xs text-[#B78924] font-serif font-semibold">01</span>
              <h3
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className="text-lg font-medium text-neutral-900"
              >
                Weightless Wearability
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 font-questrial leading-relaxed">
                A bride wears her jewelry for ten hours or more. Our hollow-core craftsmanship and balanced ergonomics ensure zero earlobe strain and effortless grace from morning ceremony to midnight reception.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-[#B78924] font-serif font-semibold">02</span>
              <h3
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className="text-lg font-medium text-neutral-900"
              >
                Conscious Craftsmanship
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 font-questrial leading-relaxed">
                Hand-selected simulated pearls, micro-faceted crystals, and premium 22K gold-plated alloys. Ethically sourced and hand-assembled in small, meticulous batches.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-[#B78924] font-serif font-semibold">03</span>
              <h3
                style={{ fontFamily: "'Raleway', sans-serif" }}
                className="text-lg font-medium text-neutral-900"
              >
                Studio &amp; Consultation
              </h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 font-questrial leading-relaxed">
                Located on MG Road, Ernakulam, our styling team assists brides in finding exact matches for their blouse cutouts, lehenga hues, and bridal footwear.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Location & CTA Box */}
        <div className="bg-[#FAF7F2] border border-[#E8DBB4]/80 p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 300,
              }}
              className="text-2xl text-[#310C13]"
            >
              Visit Our Styling Studio
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-questrial leading-relaxed">
              Registered Office &amp; Bridal Consultations: MG Road, Ernakulam, Kerala. Schedule an appointment or browse our handcrafted online catalog with insured pan-India delivery.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-[#310C13] hover:bg-[#4a101a] text-white uppercase text-[11px] font-medium tracking-[0.16em] transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/shop"
              className="px-6 py-3 border border-neutral-300 hover:border-neutral-900 text-neutral-800 uppercase text-[11px] font-medium tracking-[0.16em] transition-colors bg-white"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

