import React from 'react';
import Image from 'next/image';
import { getSystemSettings } from '@/services/system-settings.service';

export default async function HeroSection() {
  const settings = await getSystemSettings();
  const heroImage = settings.hero_image || '/hero-bg-v2.jpg';
  const heroPosition = settings.hero_image_position || '50% 46%';
  const heroFit = (settings.hero_image_fit as 'cover' | 'contain') || 'cover';

  return (
    <section className="relative w-full h-[76vh] sm:h-[85vh] min-h-[520px] sm:min-h-[640px] max-h-[860px] mt-16 md:mt-20 flex items-center overflow-hidden bg-neutral-900">
      {/* Full Background Image (focal alignment and fit configurable via Admin) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Brides Berry Bridal Jewelry"
          fill
          priority
          quality={100}
          sizes="100vw"
          style={{ objectPosition: heroPosition, objectFit: heroFit }}
        />
      </div>

      {/* Split Editorial Headline: "MADE FOR YOUR MOST" & "BEAUTIFUL MOMENTS" */}
      <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-[6.5%] flex flex-col justify-center">
        <div
          style={{
            fontFamily: "'Stack Sans Headline', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(32px, 5.1vw, 74px)',
            lineHeight: '100%',
            letterSpacing: '0%',
            textTransform: 'uppercase',
          }}
          className="w-full grid grid-cols-1 md:grid-cols-12 items-start pt-20 sm:pt-36 md:pt-48 text-white select-none drop-shadow-md"
        >
          {/* Left Headline Block */}
          <div className="md:col-span-6 md:pl-[12%] lg:pl-[16%]">
            <h1
              style={{
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                letterSpacing: 'inherit',
              }}
            >
              MADE FOR
              <br />
              YOUR MOST
            </h1>
          </div>

          {/* Right Headline Block: offset by 1em on desktop so "BEAUTIFUL" aligns on the exact same line as "YOUR MOST", right-aligned on mobile for editorial balance */}
          <div className="md:col-span-6 mt-3 md:mt-[1em] text-right md:text-left md:pl-[10%] lg:pl-[14%]">
            <p
              style={{
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                letterSpacing: 'inherit',
              }}
            >
              BEAUTIFUL
              <br />
              MOMENTS
            </p>
          </div>
        </div>
      </div>

      {/* Curved Burgundy Wave Transition at Bottom */}
      <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-[0] z-30 pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[58px] sm:h-[82px] md:h-[108px] block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 C140,85 280,105 420,75 C540,48 610,15 720,15 C830,15 900,48 1020,75 C1160,105 1300,85 1440,15 L1440,122 L0,122 Z"
            fill="#310C13"
          />
        </svg>
      </div>
    </section>
  );
}
