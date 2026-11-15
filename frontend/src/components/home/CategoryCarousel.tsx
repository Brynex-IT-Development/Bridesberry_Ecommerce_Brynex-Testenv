"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  href?: string;
}

interface CategoryCarouselProps {
  categories: CategoryCardItem[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  // Take exactly the 3 primary categories (Bridal Clutches, Bridal Footwear, Jewellery)
  const displayCategories = categories.slice(0, 3);

  return (
    <div className="relative z-10 -mt-36 sm:-mt-48 w-full px-[6.5%] mx-auto max-w-[1440px]">
      {/* Exactly 3 Static Cards in 3:4 Aspect Ratio, no horizontal scrolling, no arrows */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 justify-center">
        {displayCategories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href || `/shop?category=${encodeURIComponent(cat.slug)}`}
            className="group relative w-full aspect-[3/4] bg-[#DEDEDE] overflow-hidden block shadow-sm hover:shadow-2xl transition-all duration-500 rounded-xs"
          >
            {cat.image ? (
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#DEDEDE] flex items-center justify-center text-neutral-400 font-questrial text-sm">
                {cat.name}
              </div>
            )}

            {/* Permanent bottom title on mobile */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent sm:hidden flex flex-col items-start z-10 pointer-events-none">
              <h3
                style={{
                  fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif",
                  fontWeight: 400,
                }}
                className="text-white text-base tracking-normal drop-shadow-sm uppercase"
              >
                {cat.name}
              </h3>
            </div>

            {/* Luxury Hover Dark Overlay + Title + VIEW CATEGORY Button on desktop */}
            <div className="hidden sm:block absolute inset-0 bg-[#26090E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="hidden sm:flex absolute inset-0 p-6 flex-col items-center justify-center translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center z-10 pointer-events-none">
              <h3
                style={{
                  fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif",
                  fontWeight: 300,
                }}
                className="text-white text-xl sm:text-2xl tracking-normal mb-4 drop-shadow-xs uppercase"
              >
                {cat.name}
              </h3>
              <span
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 border border-white/90 text-white uppercase transition-colors duration-300 hover:bg-white hover:text-[#310C13] pointer-events-auto"
              >
                <span>Explore Category</span>
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
