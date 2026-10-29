import React from 'react';
import Image from 'next/image';
import { getSystemSettings } from '@/services/system-settings.service';

export default async function HeroSection() {
  const settings = await getSystemSettings();
  const heroImage = settings.hero_image || '/hero-bg-v2.jpg';

  return (
    <section className="relative w-full h-[76vh] sm:h-[85vh] min-h-[520px] sm:min-h-[640px] max-h-[860px] mt-16 md:mt-20 flex items-center overflow-hidden bg-neutral-900">
      {/* Single Full-Color Background Image (centered on earring for mobile & editorial framing on desktop) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={heroImage}
          alt="Brides Berry Bridal Jewelry"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[48.5%_28%] md:object-[56%_32%] saturate-115 contrast-[1.03]"
        />
      </div>

      {/* Four surrounding grayscale backdrop panels forming the exact square window in the center */}
      <div className="absolute inset-0 w-full h-full pointer-events-none grid grid-rows-[0.74fr_auto_1.26fr] md:grid-rows-[0.65fr_auto_1.38fr] grid-cols-[1fr_auto_1fr]">
        {/* Top grayscale band */}
        <div className="col-span-3 backdrop-grayscale backdrop-contrast-[1.04]" />
        {/* Middle row: Left grayscale, Center transparent square window, Right grayscale */}
        <div className="backdrop-grayscale backdrop-contrast-[1.04]" />
        <div className="w-[220px] sm:w-[270px] md:w-[330px] aspect-square" />
        <div className="backdrop-grayscale backdrop-contrast-[1.04]" />
        {/* Bottom grayscale band */}
        <div className="col-span-3 backdrop-grayscale backdrop-contrast-[1.04]" />
      </div>

      {/* Split Editorial Headline: "MADE FOR YOUR MOST" & "BEAUTIFUL MOMENTS" */}
      <div className="relative z-20 w-full h-full max-w-[1440px] mx-auto px-[6.5%] flex flex-col justify-center">
        <div
          style={{
            fontFamily: "'Stack Sans Headline', sans-serif",
            fontWeight: 200,
            fontSize: 'clamp(32px, 5.1vw, 74px)',
            lineHeight: '100%',
            letterSpacing: '0%',
            textTransform: 'uppercase',
          }}
          className="w-full grid grid-cols-1 md:grid-cols-12 items-start pt-20 sm:pt-36 md:pt-48 text-white select-none drop-shadow-xs"
        >
          {/* Left Headline Block */}
          <div className="md:col-span-6 md:pl-[12%] lg:pl-[16%]">
            <h1>
              MADE FOR
              <br />
              YOUR MOST
            </h1>
          </div>

          {/* Right Headline Block: offset by 1em on desktop so "BEAUTIFUL" aligns on the exact same line as "YOUR MOST", right-aligned on mobile for editorial balance */}
          <div className="md:col-span-6 mt-3 md:mt-[1em] text-right md:text-left md:pl-[10%] lg:pl-[14%]">
            <p>
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
