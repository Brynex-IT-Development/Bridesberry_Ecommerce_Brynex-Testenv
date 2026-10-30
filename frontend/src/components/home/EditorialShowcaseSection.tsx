import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface EditorialShowcaseSectionProps {
  primaryEditorialImage?: string;
  primaryEditorialPosition?: string;
  primaryEditorialFit?: 'cover' | 'contain';
  secondaryEditorialImage?: string;
  secondaryEditorialPosition?: string;
  secondaryEditorialFit?: 'cover' | 'contain';
}

export default function EditorialShowcaseSection({
  primaryEditorialImage,
  primaryEditorialPosition,
  primaryEditorialFit = 'cover',
  secondaryEditorialImage,
  secondaryEditorialPosition,
  secondaryEditorialFit = 'cover',
}: EditorialShowcaseSectionProps) {
  return (
    <section className="w-full overflow-hidden">
      {/* Row 1: Full-width split – Handbag model on Left (55%), #310C13 Burgundy panel on Right (45%) */}
      <div className="w-full bg-[#310C13] grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Full-Bleed Image */}
        <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] w-full overflow-hidden bg-[#d8b89c]">
          <Image
            src={primaryEditorialImage || '/discover-bag-model.jpg'}
            alt="Discover Our Modern Jewelry Collection"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            style={{
              objectPosition: primaryEditorialPosition || 'center',
              objectFit: primaryEditorialFit,
            }}
          />
        </div>

        {/* Right Burgundy Content Panel */}
        <div className="lg:col-span-5 bg-[#310C13] flex flex-col items-start justify-center px-[6.5%] lg:px-12 xl:px-16 py-12 sm:py-16 lg:py-20 text-white">
          <h2
            style={{
              fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', sans-serif",
              fontWeight: 200,
              fontStyle: 'normal',
              fontSize: 'clamp(28px, 3vw, 42px)',
              lineHeight: '115%',
              letterSpacing: '0%',
            }}
            className="text-white mb-4 sm:mb-6"
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
            className="text-white/75 max-w-[420px] mb-10 sm:mb-20 lg:mb-24"
          >
            Lorem ipsum dolor sit amet consectetur. At vitae risus gravida lectus vel
            quisque. Tincidunt odio auctor magnis nec ut eu odio. Hendrerit duis parturient
            lectus aenean.
          </p>

          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-stack-text), 'Stack Sans Text', sans-serif",
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.16em',
            }}
            className="inline-flex items-center justify-center gap-3 border border-white/75 hover:bg-white hover:text-[#310C13] text-white uppercase px-8 py-3.5 transition-colors duration-300"
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

      {/* Row 2: Soft Cream (#FCF6F4) section – Left Text + Solid #310C13 CTA, Right Bridal Heels Image */}
      <div className="w-full bg-[#FCF6F4] py-12 sm:py-24">
        <div className="w-full px-[6.5%] mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Column: Heading, Description, and Burgundy CTA Button (order-2 on mobile so image comes on top) */}
            <div className="order-2 lg:order-1 lg:col-span-5 flex flex-col items-start justify-center">
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

            {/* Right Column: Bridal Heels & Bouquet Image (order-1 on mobile so it appears above the text) */}
            <div className="order-1 lg:order-2 lg:col-span-7">
              <div className="relative aspect-[1.9/1] w-full overflow-hidden bg-[#e8e3df]">
                <Image
                  src={secondaryEditorialImage || '/discover-bridal-heels.jpg'}
                  alt="Discover Our Modern Jewelry Collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  style={{
                    objectPosition: secondaryEditorialPosition || 'center',
                    objectFit: secondaryEditorialFit,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

