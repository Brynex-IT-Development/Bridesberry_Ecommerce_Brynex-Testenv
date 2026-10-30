import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/services/categories.service';
import { getSystemSettings } from '@/services/system-settings.service';
import CategoryCarousel from './CategoryCarousel';

// ---------------------------------------------------------------------------
// Types – matches what the backend /api/categories endpoint returns.
// The public endpoint only returns isActive: true records, so no client-side
// filtering is needed here.
// ---------------------------------------------------------------------------
interface BackendCategory {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
  // The Category type in @/types/category uses `count` but the backend
  // field is `productCount`. The service maps them identically so we accept
  // both shapes via optional spread fields.
  count?: number;
}

// ---------------------------------------------------------------------------
// Loading skeleton – exported so page.tsx can use it as a Suspense fallback
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Loading skeleton – exported so page.tsx can use it as a Suspense fallback
// ---------------------------------------------------------------------------
export function CategorySectionSkeleton() {
  return (
    <section className="relative bg-[#FCF6F4]">
      <div className="bg-[#310C13] pt-12 pb-36">
        <div className="w-full pl-[6.5%] mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center text-center mb-12 pr-[6.5%]">
            <div className="h-12 w-64 bg-white/10 rounded mb-3 animate-pulse" />
            <div className="h-3 w-36 bg-white/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="w-full pl-[6.5%] mx-auto max-w-[1440px] -mt-28 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pr-[6.5%]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[1/1.05] w-full bg-neutral-200 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main async server component
// ---------------------------------------------------------------------------
export default async function CategorySection() {
  const [raw, settings] = await Promise.all([
    getCategories(),
    getSystemSettings(),
  ]);

  const backendCategories = (raw as unknown as BackendCategory[]) || [];
  const categories = backendCategories.filter((c) => c.isActive !== false);

  return (
    <section className="relative bg-[#FCF6F4] overflow-hidden -mt-px">
      {/* Top Burgundy Background Band (stops 25% before bottom of category cards) */}
      <div className="relative bg-[#310C13] pt-16 sm:pt-32 md:pt-40 pb-48 sm:pb-72 text-white">
        <div className="w-full px-[6.5%] mx-auto max-w-[1440px]">
          {/* Centered Script Heading + Subtitle */}
          <div className="flex flex-col items-center text-center">
            <h2
              style={{
                fontFamily: "var(--font-windsong), 'WindSong', cursive",
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: 'clamp(28px, 6vw, 64px)',
                lineHeight: '110%',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#F5F5F5',
              }}
              className="select-none px-4"
            >
              Our Categories
            </h2>
            <p
              style={{
                fontFamily: "'Stack Sans Text', sans-serif",
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.28em',
                color: '#F5F5F5',
              }}
              className="uppercase mt-2.5"
            >
              Endless Options
            </p>
          </div>
        </div>
      </div>

      {/* Centered Scrollable Category Cards Row or Admin Configuration placeholder */}
      {categories.length > 0 ? (
        <CategoryCarousel categories={categories} />
      ) : (
        <div className="relative z-10 -mt-24 sm:-mt-36 w-full px-[6.5%] mx-auto max-w-[1440px] text-center py-10">
          <p className="text-white/60 font-questrial text-xs uppercase tracking-widest">
            Categories will appear here once added in Admin Panel
          </p>
        </div>
      )}

      {/* Editorial Feature Section: "Discover Our Modern Jewelry Collection" */}
      <div className="w-full px-[6.5%] mx-auto max-w-[1440px] pt-12 sm:pt-24 pb-16 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Description, and Burgundy CTA Button */}
          <div className="lg:col-span-5 flex flex-col items-start justify-center">
            <h2
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 200,
                fontStyle: 'normal',
                fontSize: 'clamp(28px, 3vw, 42px)',
                lineHeight: '115%',
                letterSpacing: '0%',
              }}
              className="text-[#310C13] mb-4 sm:mb-6"
            >
              Discover Our Modern
              <br />
              Jewelry Collection
            </h2>

            <p
              style={{
                fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
                fontWeight: 200,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '115%',
                letterSpacing: '0%',
              }}
              className="text-[#6E625E] max-w-[380px] mb-10 sm:mb-20 lg:mb-24"
            >
              Lorem ipsum dolor sit amet consectetur. At vitae risus gravida
              lectus vel quisque. Tincidunt odio auctor magnis nec ut eu odio.
              Hendrerit duis parturient lectus aenean.
            </p>

            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.16em',
              }}
              className="inline-flex items-center justify-center gap-3 bg-[#310C13] hover:bg-[#4a101a] text-white uppercase px-8 py-3.5 transition-colors duration-300"
            >
              <span>View Collection</span>
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M7 17L17 7M17 7H8M17 7V16"
                />
              </svg>
            </Link>
          </div>

          {/* Right Column: Editorial Shell & Pearl Necklace Image */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[1.88/1] w-full overflow-hidden bg-[#eadcd5]">
              <Image
                src={settings.category_image || '/discover-shell-necklace.jpg'}
                alt="Discover Our Modern Jewelry Collection"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                style={{
                  objectPosition: settings.category_image_position || 'center',
                  objectFit: (settings.category_image_fit as 'cover' | 'contain') || 'cover',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
