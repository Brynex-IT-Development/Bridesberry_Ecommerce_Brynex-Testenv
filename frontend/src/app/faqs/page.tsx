"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Materials & Plating" | "Ordering & Sizing" | "Shipping & Delivery" | "Care & Longevity";
}

const FAQS: FAQItem[] = [
  // 1. Materials & Plating
  {
    category: "Materials & Plating",
    question: "Are your bridal earrings and necklaces nickel-free and hypoallergenic?",
    answer: "Yes. All Brides Berry jewelry is 100% lead-free, nickel-free, and hypoallergenic. Our metal alloys are crafted specifically for sensitive skin so brides can wear them for hours without irritation or heaviness.",
  },
  {
    category: "Materials & Plating",
    question: "What plating is used on Brides Berry jewelry?",
    answer: "We use premium micron gold plating (up to 22K finish) and antique matte gold plating, reinforced with a specialized e-coat anti-tarnish barrier designed to resist humidity and sweat during long wedding ceremonies.",
  },
  {
    category: "Materials & Plating",
    question: "Are the pearls and gemstones real?",
    answer: "Our pieces feature high-grade simulated Basra pearls, shell pearls, and lab-created micro-faceted zirconias and Kundan stones. This allows us to achieve regal heirloom luster while keeping our bridal sets feather-light and comfortably wearable.",
  },

  // 2. Ordering & Sizing
  {
    category: "Ordering & Sizing",
    question: "How do I choose the right necklace length for my bridal neckline?",
    answer: "For deep sweetheart or V-necklines, pendant drops and cascading necklaces elongate the neck gracefully. For high collars, round necklines, or boat necks, chokers and structured collar sets sit flat and photograph brilliantly. You can also consult our stylists via WhatsApp.",
  },
  {
    category: "Ordering & Sizing",
    question: "Are the bridal earrings heavy to wear all day?",
    answer: "No. Our earrings are engineered with a hollow-core design and balanced weight distribution. Even our large statement pearl drop earrings weigh under 18 grams per pair, preventing earlobe stretching during full-day ceremonies.",
  },
  {
    category: "Ordering & Sizing",
    question: "Do you offer customization or sizing adjustments?",
    answer: "Yes! Many of our necklaces come with adjustable dori (silk tassel) backings that accommodate all neck measurements. For custom sizing inquiries on bangles or footwear, contact our concierge before placing your order.",
  },

  // 3. Shipping & Delivery
  {
    category: "Shipping & Delivery",
    question: "How long does delivery take within Kerala and across India?",
    answer: "Standard delivery across Kerala arrives within 2 to 3 business days. Deliveries to major Indian metro cities (Mumbai, Bangalore, Chennai, Delhi) take 3 to 5 business days. Express delivery is available at checkout for urgent wedding dates.",
  },
  {
    category: "Shipping & Delivery",
    question: "Is shipping free?",
    answer: "Yes! All orders above our free shipping threshold (₹ 2,000) automatically receive FREE Standard Delivery across India. Orders below this threshold incur standard carrier rates calculated directly at checkout.",
  },
  {
    category: "Shipping & Delivery",
    question: "How is bridal jewelry packaged?",
    answer: "Every piece is cushioned in an anti-tarnish protective pouch, boxed in a luxury rigid keepsake box, and shipped in discreet, tamper-evident outer packaging insured until it reaches your hands.",
  },
  {
    category: "Shipping & Delivery",
    question: "Can I inspect the product before accepting delivery?",
    answer: "Our packages are shipped via reputable express courier partners with door-to-door tracking. If any parcel arrives tampered with or damaged, please refuse delivery and notify our team immediately.",
  },

  // 4. Care & Longevity
  {
    category: "Care & Longevity",
    question: "How should I store my bridal jewelry after the wedding?",
    answer: "Always store your pieces in the airtight pouch provided, away from moisture and direct sunlight. Never store gold-plated jewelry in velvet boxes or damp drawers, as velvet can trap moisture and accelerate oxidation.",
  },
  {
    category: "Care & Longevity",
    question: "Can I apply perfume or hairspray while wearing the jewelry?",
    answer: "Always follow the 'last on, first off' golden rule. Apply perfumes, body lotions, hairsprays, and bridal makeup first, allow them to dry completely, and only then put on your jewelry.",
  },
  {
    category: "Care & Longevity",
    question: "How do I clean my jewelry after wearing it?",
    answer: "Gently wipe the surface with a soft, lint-free cotton cloth or jewelry polishing cloth after every wear to remove natural oils and makeup. Avoid harsh chemical cleaners, alcohol dips, or hot water.",
  },
];

const CATEGORIES = [
  "All",
  "Materials & Plating",
  "Ordering & Sizing",
  "Shipping & Delivery",
  "Care & Longevity",
] as const;

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openIndices, setOpenIndices] = useState<number[]>([0]); // Open first by default

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQS
      : FAQS.filter((f) => f.category === selectedCategory);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Google FAQPage Schema Markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-24 text-left">
      {/* Head schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pb-12 sm:pb-16 border-b border-neutral-150">
        <div className="max-w-3xl">
          <span
            style={{
              fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
              letterSpacing: "0.22em",
            }}
            className="text-[11px] sm:text-xs uppercase text-[#B78924] font-medium block mb-3"
          >
            Help &amp; Customer Care
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
            Frequently Asked
            <br />
            Questions
          </h1>
          <p className="mt-5 text-sm sm:text-base text-neutral-600 font-questrial leading-relaxed max-w-2xl">
            Everything you need to know about our bridal jewelry craftsmanship, materials, skin-safe plating, custom sizing, delivery timelines, and aftercare.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-[6.5%] mx-auto max-w-none pt-10 sm:pt-14">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-neutral-100 font-questrial text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 transition-all cursor-pointer rounded-none uppercase tracking-wider text-[11px] ${
                selectedCategory === cat
                  ? "bg-[#310C13] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl divide-y divide-neutral-200 pt-6">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div key={idx} className="py-5 sm:py-6">
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span
                    style={{ fontFamily: "'Raleway', sans-serif" }}
                    className="text-base sm:text-lg font-medium text-neutral-900 group-hover:text-[#B78924] transition-colors leading-snug"
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-250 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-[#310C13]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="pt-3.5 pr-8">
                    <p className="text-xs sm:text-sm text-neutral-600 font-questrial leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-16 bg-[#FAF7F2] border border-[#E8DBB4]/80 p-8 sm:p-10 max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h3
              style={{ fontFamily: "'Raleway', sans-serif" }}
              className="text-lg font-medium text-[#310C13]"
            >
              Have a question not listed here?
            </h3>
            <p className="text-xs text-neutral-600 font-questrial">
              Our styling team is available Monday through Saturday to answer any custom inquiry.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#310C13] hover:bg-[#4a101a] text-white uppercase text-[11px] font-medium tracking-[0.16em] transition-colors flex-shrink-0"
          >
            Ask Our Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}

