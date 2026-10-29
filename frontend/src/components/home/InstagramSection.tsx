"use client";

import React, { useRef, useEffect, useState } from 'react';
import videoFiles from '../../data/videos.json';
import { getSystemSettings } from '@/services/system-settings.service';

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [reels, setReels] = useState<string[]>(videoFiles);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Fetch dynamic videos from database
  useEffect(() => {
    getSystemSettings().then((settings) => {
      if (settings.instagram_videos) {
        try {
          const list = JSON.parse(settings.instagram_videos);
          if (Array.isArray(list) && list.length > 0) {
            setReels(list);
          }
        } catch {
          // Keep default video files
        }
      }
    });
  }, []);

  // Ensure enough base items so seamless looping works across all screen widths
  let baseReels = [...reels];
  while (baseReels.length > 0 && baseReels.length < 6) {
    baseReels = [...baseReels, ...reels];
  }
  const loopedReels = [...baseReels, ...baseReels];
  const baseCount = baseReels.length;

  // Continuous seamless auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || baseCount === 0) return;

    let animationFrameId: number;
    let currentScroll = container.scrollLeft;
    const speed = 0.7; // Smooth continuous auto-scroll (px/frame)

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
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
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
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  if (!reels || reels.length === 0) {
    return null;
  }

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-[#310C13] pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        <div className="w-full px-[6.5%] mx-auto max-w-[1440px] relative z-10">
          {/* Centered Script Heading + Subtitle */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
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
              Follow Us On
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
              Instagram
            </p>
          </div>

          {/* Centered Auto-Scrolling Video Cards Row */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className={`flex items-stretch gap-5 overflow-x-auto scrollbar-none select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {loopedReels.map((filename, idx) => {
              const videoSrc =
                filename.startsWith('http') || filename.startsWith('/')
                  ? filename
                  : `/videos/${encodeURIComponent(filename)}`;

              return (
                <div
                  key={idx}
                  className="relative aspect-[1/1.28] flex-shrink-0 w-[82%] sm:w-[46%] lg:w-[calc((100%-40px)/3.22)] overflow-hidden bg-[#24080d] group"
                >
                  {isInView ? (
                    <video
                      src={videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5 animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Seamless Double-Arch Wave Transition: Burgundy shape on pure White base flowing directly into white footer */}
      <div className="relative w-full -mt-px overflow-hidden leading-[0] pointer-events-none bg-white">
        <svg
          viewBox="0 0 1440 90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[52px] sm:h-[74px] md:h-[92px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0 L1440 0 L1440 90 C1310 10, 1090 10, 890 50 C780 72, 640 72, 540 52 C340 12, 120 12, 0 90 Z"
            fill="#310C13"
          />
        </svg>
      </div>

      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
