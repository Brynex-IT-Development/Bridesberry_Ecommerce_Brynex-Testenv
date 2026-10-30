"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CategoryCardItem {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

interface CategoryCarouselProps {
  categories: CategoryCardItem[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  // Ensure enough base cards so seamless looping works across wide screens
  let baseCategories = [...categories];
  while (baseCategories.length > 0 && baseCategories.length < 6) {
    baseCategories = [...baseCategories, ...categories];
  }
  const loopedCategories = [...baseCategories, ...baseCategories];
  const baseCount = baseCategories.length;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || baseCount === 0) return;

    let animationFrameId: number;
    let currentScroll = container.scrollLeft;
    const speed = 0.7; // Smooth continuous auto-scroll (px per frame)

    const step = () => {
      if (!isPaused && !isDragging && container.children.length >= baseCount * 2) {
        currentScroll += speed;

        const firstSetEndEl = container.children[baseCount] as HTMLElement | undefined;
        const firstEl = container.children[0] as HTMLElement | undefined;
        if (firstSetEndEl && firstEl) {
          const singleSetWidth = firstSetEndEl.offsetLeft - firstEl.offsetLeft;
          if (singleSetWidth > 0 && currentScroll >= singleSetWidth) {
            currentScroll -= singleSetWidth;
          }
        }

        container.scrollLeft = currentScroll;
      } else {
        currentScroll = container.scrollLeft;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging, baseCount]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setDragDistance(0);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    setDragDistance(Math.abs(walk));
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative z-10 -mt-36 sm:-mt-48 w-full px-[6.5%] mx-auto max-w-[1440px]">
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={`flex gap-5 overflow-x-auto no-scrollbar pb-4 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {loopedCategories.map((cat, idx) => (
          <Link
            key={`${cat.id}-${idx}`}
            href={`/shop?category=${encodeURIComponent(cat.slug)}`}
            onClick={(e) => {
              if (dragDistance > 8) {
                e.preventDefault();
              }
            }}
            draggable={false}
            className="group relative w-[260px] sm:w-[300px] lg:w-[335px] aspect-[1/1.04] bg-[#DEDEDE] overflow-hidden flex-shrink-0 block"
          >
            {cat.image ? (
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                draggable={false}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-[#DEDEDE]" />
            )}

            {/* Mobile Permanent Category Label (Touch friendly) */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/75 via-black/30 to-transparent sm:hidden flex flex-col items-start z-10 pointer-events-none">
              <h3
                style={{
                  fontFamily: "'Stack Sans Text', sans-serif",
                  fontWeight: 400,
                }}
                className="text-white text-[15px] tracking-normal drop-shadow-sm"
              >
                {cat.name}
              </h3>
            </div>

            {/* Hover Dark Overlay + Title + VIEW COLLECTION Button (appears on desktop / tablet hover) */}
            <div className="hidden sm:block absolute inset-0 bg-[#26090E]/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="hidden sm:flex absolute inset-0 p-6 flex-col items-center justify-center translate-y-6 group-hover:translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center z-10 pointer-events-none">
              <h3
                style={{
                  fontFamily: "'Stack Sans Text', sans-serif",
                  fontWeight: 300,
                }}
                className="text-white text-[18px] sm:text-[21px] tracking-normal mb-3.5 drop-shadow-xs"
              >
                {cat.name}
              </h3>
              <span
                style={{
                  fontFamily: "'Stack Sans Text', sans-serif",
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                }}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 border border-white/85 text-white uppercase transition-colors duration-300 hover:bg-white hover:text-[#310C13] pointer-events-auto"
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
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
