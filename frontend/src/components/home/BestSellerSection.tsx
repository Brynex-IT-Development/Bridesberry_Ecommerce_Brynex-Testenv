"use client";

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import ProductCard from '../product/ProductCard';

interface BestSellerSectionProps {
  products: Product[];
}

export default function BestSellerSection({ products: bestSellers }: BestSellerSectionProps) {
  const displayProducts = bestSellers && bestSellers.length > 0 ? bestSellers.slice(0, 8) : [];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="w-full px-[6.5%] mx-auto max-w-[1440px] relative z-10">
        {/* Centered Script Heading + Subtitle */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2
            style={{
              fontFamily: "var(--font-windsong), 'WindSong', cursive",
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: 'clamp(28px, 6vw, 64px)',
              lineHeight: '110%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#310C13',
            }}
            className="select-none px-4"
          >
            Explore Products
          </h2>
          <p
            style={{
              fontFamily: "'Stack Sans Text', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '0.28em',
            }}
            className="uppercase text-[#310C13] mt-1.5"
          >
            Best Selling
          </p>
        </div>

        {/* 4x2 Product Grid or Clean Empty State */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-7 sm:gap-x-6 sm:gap-y-12">
            {displayProducts.map((product, idx) => (
              <ProductCard
                key={`${product.id}-${idx}`}
                product={product}
                centered={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-neutral-400 font-questrial text-xs uppercase tracking-widest">
            New products arriving soon
          </div>
        )}

        {/* Bottom Centered Outlined CTA Button */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <Link
            href="/shop"
            style={{
              fontFamily: "'Stack Sans Text', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              letterSpacing: '0.16em',
            }}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 border border-[#310C13]/70 text-[#310C13] hover:bg-[#310C13] hover:border-[#310C13] hover:text-white uppercase transition-colors duration-300"
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
      </div>
    </section>
  );
}
