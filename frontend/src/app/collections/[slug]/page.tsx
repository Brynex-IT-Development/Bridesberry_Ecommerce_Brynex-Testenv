import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COLLECTIONS_DATA } from '@/data/collections';
import { MAIN_CATEGORIES } from '@/data/categories';
import { getProducts } from '@/services/products.service';
import ProductGrid from '@/components/product/ProductGrid';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COLLECTIONS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = COLLECTIONS_DATA[slug];
  if (!config) return {};

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bridesberry.com';
  const pageUrl = `${baseUrl}/collections/${slug}`;

  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: config.metaTitle,
      description: config.metaDescription,
      url: pageUrl,
      type: 'website',
      siteName: 'Brides Berry',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.metaTitle,
      description: config.metaDescription,
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const config = COLLECTIONS_DATA[slug];

  if (!config) {
    notFound();
  }

  // Fetch products matching this collection
  let products = await getProducts({
    category: config.categoryFilter,
    collection: config.collectionFilter,
    newArrival: config.newArrival,
    bestSeller: config.bestSeller,
  });

  // Filter out any dummy SKUs
  products = products.filter((p) => p.id !== 'SKU-005');

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bridesberry.com';
  const pageUrl = `${baseUrl}/collections/${slug}`;

  // Structured Data (JSON-LD): BreadcrumbList + ItemList + FAQPage
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Collections',
        item: `${baseUrl}/shop`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: config.h1,
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.h1,
    description: config.metaDescription,
    url: pageUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: `${baseUrl}/product/${product.slug || product.id}`,
      image: product.images?.[0] || product.primaryImage || '',
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-16">
      {/* Structured Data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full px-[6.5%] mx-auto max-w-[1440px]">
        {/* Breadcrumb row */}
        <nav
          aria-label="Breadcrumb"
          style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
          className="text-xs text-neutral-400 py-3 flex items-center gap-2 select-none"
        >
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#310C13] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-neutral-700 font-medium">{config.h1}</span>
        </nav>

        {/* 1. TOP SEO INTRO: 40-60 words above the grid with primary keyword */}
        <header className="pt-4 pb-8 sm:pb-10 max-w-3xl">
          <h1
            style={{ fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif" }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#310C13] font-normal tracking-tight uppercase"
          >
            {config.h1}
          </h1>
          <p
            style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
            className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-light"
          >
            {config.introText}
          </p>

          {/* Quick Subcategory Filter Chips */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-questrial text-neutral-400 mr-2 uppercase tracking-wider">
              Browse Subcategories:
            </span>
            {MAIN_CATEGORIES.flatMap((c) => c.subCategories).map((sub) => (
              <Link
                key={sub.id}
                href={sub.href}
                className="px-3 py-1.5 bg-neutral-100 hover:bg-[#310C13] hover:text-white text-xs font-questrial text-neutral-700 transition-colors border border-neutral-200"
              >
                {sub.name}
              </Link>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs font-questrial text-neutral-500">
            <span>{products.length} Designs Available</span>
            <span>•</span>
            <span>Express Delivery across India</span>
            <span>•</span>
            <span>Handcrafted Quality Guarantee</span>
          </div>
        </header>

        {/* 2. PRODUCT GRID: Clean existing catalog representation */}
        <section className="pb-16 sm:pb-20 border-b border-neutral-100">
          <ProductGrid products={products} />
        </section>

        {/* 3. BOTTOM SEO EDITORIAL & STYLING GUIDE: High-intent bridal advice */}
        <section className="pt-14 sm:pt-16 max-w-4xl space-y-10">
          <div>
            <h2
              style={{ fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif" }}
              className="text-xl sm:text-2xl text-[#310C13] font-normal tracking-tight mb-4"
            >
              {config.bodyTitle}
            </h2>
            <div
              style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
              className="space-y-4 text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-light"
            >
              {config.bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Styling Tips */}
          {config.stylingTips && config.stylingTips.length > 0 && (
            <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-none border-l-2 border-[#8C6A16]">
              <h3
                style={{ fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif" }}
                className="text-base sm:text-lg text-[#310C13] font-medium mb-3"
              >
                Bridal Styling & Care Insights
              </h3>
              <ul
                style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
                className="space-y-2.5 text-xs sm:text-sm text-neutral-700 leading-relaxed"
              >
                {config.stylingTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#8C6A16] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Internal Linking: Related collection & bridal guide */}
          <div
            style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
            className="pt-4 flex flex-wrap items-center gap-6 text-sm text-neutral-600 border-t border-neutral-100"
          >
            <span>Explore Complementary Styles:</span>
            <Link
              href={config.relatedCollection.href}
              className="text-[#310C13] font-medium underline underline-offset-4 hover:text-[#8C6A16] transition-colors"
            >
              {config.relatedCollection.name} →
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href={config.relatedArticle.href}
              className="text-[#310C13] font-medium underline underline-offset-4 hover:text-[#8C6A16] transition-colors"
            >
              Guide: {config.relatedArticle.title} →
            </Link>
          </div>

          {/* 4. COLLECTION FAQs (with Google FAQ Schema) */}
          <div className="pt-6">
            <h3
              style={{ fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif" }}
              className="text-lg sm:text-xl text-[#310C13] font-normal tracking-tight mb-6"
            >
              Frequently Asked Questions about {config.h1}
            </h3>
            <div
              style={{ fontFamily: "var(--font-stack-text), 'Questrial', sans-serif" }}
              className="space-y-4"
            >
              {config.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-neutral-200 p-5 bg-white transition-colors"
                >
                  <h4 className="text-sm sm:text-base font-medium text-neutral-900 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
