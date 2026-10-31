'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  centered?: boolean;
}

export default function ProductCard({ product, centered = true }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Fallback to secondary gallery image if explicit hoverImage is not configured
  const primaryImg = product.primaryImage || product.images?.[0] || '/placeholder.png';
  const hoverImg =
    product.hoverImage ||
    (product.images && product.images.length > 1 ? product.images[1] : null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultAttributes =
      product.category === 'Rings'
        ? [{ name: 'Ring Size', value: '7' }]
        : product.category === 'Necklaces'
        ? [{ name: 'Length', value: '18 inches' }]
        : [];

    addToCart(product, 1, defaultAttributes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="group relative flex flex-col bg-white">
      {/* Product Image Frame */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-[#FAF9F6] border border-[#EBEBEB]"
      >
        {/* Primary Product Image */}
        <Image
          src={primaryImg}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-500 ease-out ${
            hoverImg ? 'group-hover:opacity-0' : 'group-hover:scale-105'
          }`}
        />

        {/* Secondary Hover Image (smooth cross-fade) */}
        {hoverImg && (
          <Image
            src={hoverImg}
            alt={`${product.title} – alternate view`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover absolute inset-0 transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
          />
        )}

        {/* Floating Solid Burgundy "ADD TO BAG" Button (inset inside edges) on hover */}
        <div className="absolute inset-x-3 sm:inset-x-3.5 bottom-3 sm:bottom-3.5 z-20 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none group-hover:pointer-events-auto">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#310C13] hover:bg-[#45101B] active:bg-[#20060B] text-white flex items-center justify-center gap-2 py-2.5 sm:py-3 text-[11px] sm:text-[11.5px] uppercase tracking-[0.14em] font-medium transition-colors duration-200 cursor-pointer shadow-md select-none rounded-none"
            style={{
              fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
            }}
          >
            {added ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 text-emerald-400"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-emerald-300 font-semibold">ADDED TO BAG</span>
              </>
            ) : (
              <>
                {/* Outlined Shopping Bag Icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0"
                >
                  <path
                    d="M6.34 8H17.66C18.67 8 19.51 8.75 19.64 9.75L20.77 18.25C20.92 19.44 19.99 20.5 18.79 20.5H5.21C4.01 20.5 3.08 19.44 3.23 18.25L4.36 9.75C4.49 8.75 5.33 8 6.34 8Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 10.5V7C8.5 5.067 10.067 3.5 12 3.5C13.933 3.5 15.5 5.067 15.5 7V10.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>ADD TO BAG</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details (Title & Price) */}
      <div className={`pt-3 sm:pt-3.5 pb-2 px-1 sm:px-2 ${centered ? 'text-center' : 'text-left'}`}>
        <Link
          href={`/product/${product.slug}`}
          title={product.title}
          className="block text-[13px] sm:text-[14px] leading-snug text-[#1A1A1A] hover:text-[#310C13] transition-colors mb-1 line-clamp-2"
          style={{
            fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
            fontWeight: 300,
            letterSpacing: '0%',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {product.title}
        </Link>
        <p
          className="text-[12.5px] sm:text-[13.5px] leading-relaxed text-[#2B2B2B]"
          style={{
            fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
            fontWeight: 400,
            letterSpacing: '0%',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          From <span className="font-semibold text-[#111111]">RS. {product.price.toLocaleString('en-IN')}</span>
        </p>
      </div>
    </div>
  );
}
