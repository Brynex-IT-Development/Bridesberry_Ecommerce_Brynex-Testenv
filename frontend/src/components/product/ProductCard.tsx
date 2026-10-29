'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product } from '../../types/product';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  centered?: boolean;
}

export default function ProductCard({ product, centered = false }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultAttributes = product.category === 'Rings'
      ? [{ name: 'Ring Size', value: '7' }]
      : product.category === 'Necklaces'
        ? [{ name: 'Length', value: '18 inches' }]
        : [];
    addToCart(product, 1, defaultAttributes);
    router.push('/cart');
  };

  return (
    <div className="group relative flex flex-col bg-white">

      {/* Product Image Box */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-white border border-[#E6E6E6]"
      >
        <Image
          src={product.primaryImage || product.images[0] || '/placeholder.png'}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.hoverImage && (
          <Image
            src={product.hoverImage}
            alt={`${product.title} – hover view`}
            fill
            sizes="(max-width: 640px) 50vw, 33vw"
            className="object-cover absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100"
          />
        )}
        {/* Quick add on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white py-2.5 px-3 border-t border-neutral-200">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-neutral-900 hover:bg-[#B78924] text-white transition-colors duration-300 py-2 text-[10px] uppercase tracking-widest font-questrial"
          >
            Add to Bag
          </button>
        </div>
      </Link>

      {/* Product details */}
      <div className={`pt-2.5 sm:pt-3 pb-2 px-1 sm:px-3 ${centered ? 'text-center' : 'text-left'}`}>
        <Link
          href={`/product/${product.slug}`}
          className="block truncate mb-0.5 sm:mb-1 text-[11.5px] sm:text-[13px] leading-[18px] sm:leading-[20px] hover:text-[#340A11] transition-colors"
          style={{
            fontFamily: 'var(--font-stack-text), Questrial, sans-serif',
            fontWeight: 300,
            letterSpacing: '0%',
            color: '#6E6E6E',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {product.title}
        </Link>
        <p
          className="text-[11.5px] sm:text-[13px] leading-[18px] sm:leading-[20px]"
          style={{
            fontFamily: 'var(--font-stack-text), sans-serif',
            fontWeight: 400,
            letterSpacing: '0%',
            color: '#6E6E6E',
            textAlign: centered ? 'center' : 'left',
          }}
        >
          {centered ? (
            <>
              From{' '}
              <span className="font-semibold text-[#111111]">
                RS. {product.price.toLocaleString('en-IN')}
              </span>
            </>
          ) : (
            <span className="font-semibold text-[#111111]">
              ₹ {product.price.toLocaleString('en-IN')}
            </span>
          )}
        </p>
      </div>

    </div>
  );
}
