"use client";

import React, { useRef, useEffect, useState } from 'react';
import videoFiles from '../../data/videos.json';
import { getSystemSettings } from '@/services/system-settings.service';

interface ReelItem {
  url: string;
  linkUrl?: string;
}

function extractInstagramShortcode(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function isInstagramUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('instagram.com/reel/') || url.includes('instagram.com/p/');
}

function parseReel(item: any): ReelItem {
  if (typeof item === 'string') {
    return {
      url: item,
      linkUrl: isInstagramUrl(item) ? item : '',
    };
  }
  if (item && typeof item === 'object') {
    return {
      url: item.url || '',
      linkUrl: item.linkUrl || (isInstagramUrl(item.url) ? item.url : ''),
    };
  }
  return { url: '', linkUrl: '' };
}

export default function InstagramSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [instagramProfileUrl, setInstagramProfileUrl] = useState('https://instagram.com');
  const [reels, setReels] = useState<ReelItem[]>(
    videoFiles.map((filename) => ({ url: filename, linkUrl: '' }))
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

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

  // Fetch dynamic videos and profile link from database
  useEffect(() => {
    getSystemSettings().then((settings) => {
      if (settings.instagram_profile_url) {
        setInstagramProfileUrl(settings.instagram_profile_url);
      }
      if (settings.instagram_videos) {
        try {
          const list = JSON.parse(settings.instagram_videos);
          if (Array.isArray(list) && list.length > 0) {
            setReels(list.map(parseReel));
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
    setHasDragged(false);
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
    if (Math.abs(walk) > 6) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setHasDragged(false);
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = Math.abs(e.touches[0].clientX - touchStartX);
    if (diff > 8) {
      setHasDragged(true);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (hasDragged) {
      e.preventDefault();
    }
  };

  if (!reels || reels.length === 0) {
    return null;
  }

  return (
    <>
      <section ref={sectionRef} className="relative w-full bg-[#310C13] pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
        <div className="w-full px-[6.5%] mx-auto max-w-[1440px] relative z-10">
          {/* Centered Script Heading + Subtitle with Direct Instagram Link */}
          <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <a
              href={instagramProfileUrl || 'https://instagram.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-center focus:outline-none"
            >
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
                className="select-none px-4 group-hover:text-amber-200 transition-colors"
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
                className="uppercase mt-2.5 flex items-center gap-1.5 group-hover:text-amber-200 transition-colors"
              >
                <span>Instagram</span>
                <span className="text-[10px] opacity-70 group-hover:opacity-100 transition-opacity">↗</span>
              </p>
            </a>
          </div>

          {/* Centered Auto-Scrolling Video Cards Row */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsPaused(false)}
            className={`flex items-stretch gap-5 overflow-x-auto scrollbar-none select-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {loopedReels.map((reelItem, idx) => {
              const isIg = isInstagramUrl(reelItem.url);
              const shortcode = extractInstagramShortcode(reelItem.url);
              const targetUrl =
                reelItem.linkUrl ||
                (isIg ? reelItem.url : instagramProfileUrl) ||
                'https://instagram.com';

              const videoSrc =
                reelItem.url.startsWith('http') || reelItem.url.startsWith('/')
                  ? reelItem.url
                  : `/videos/${encodeURIComponent(reelItem.url)}`;

              return (
                <a
                  key={idx}
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCardClick}
                  className="relative aspect-[1/1.28] flex-shrink-0 w-[82%] sm:w-[46%] lg:w-[calc((100%-40px)/3.22)] overflow-hidden bg-[#24080d] group block cursor-pointer"
                >
                  {isInView ? (
                    isIg && shortcode ? (
                      <div className="w-full h-full relative overflow-hidden bg-[#180a0d]">
                        <iframe
                          src={`https://www.instagram.com/reel/${shortcode}/embed/`}
                          className="w-full h-full object-cover pointer-events-none scale-105 border-0"
                          scrolling="no"
                          title={`Instagram Reel ${idx + 1}`}
                        />
                        {/* Instagram Corner Badge */}
                        <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-xs flex items-center justify-center text-white/90 shadow-sm pointer-events-none">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
                      />
                    )
                  ) : (
                    <div className="w-full h-full bg-white/5 animate-pulse" />
                  )}

                  {/* Sleek Instagram Hover Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between z-10 pointer-events-none">
                    <span className="flex items-center text-xs font-semibold text-white tracking-wide">
                      <svg className="w-3.5 h-3.5 mr-1.5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                      Watch on Instagram
                    </span>
                    <span className="text-white/80 text-xs font-bold">↗</span>
                  </div>
                </a>
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
