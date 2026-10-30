'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const shopLinks = [
    { name: 'New Arrivals', href: '/shop?sort=newest' },
    { name: 'Best Sellers', href: '/shop?filter=bestseller' },
    { name: 'Collections', href: '/shop' },
    { name: 'Bridal Journal', href: '/blog' },
  ];

  const policyLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  ];

  const followLinks = [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'Facebook', href: 'https://facebook.com' },
    { name: 'Pinterest', href: 'https://pinterest.com' },
  ];

  return (
    <footer id="footer" className="w-full bg-white relative">
      {/* Main Footer Container */}
      <div className="w-full px-[6.5%] mx-auto max-w-[1440px] pt-12 sm:pt-16 pb-10">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12">
          {/* Left Column (Brand + Newsletter Form + Registered Address) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 select-none">
                <span className="text-[#310C13] text-[30px] font-normal leading-none select-none">
                  ✳
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-stack-headline), 'Raleway', sans-serif",
                    fontWeight: 400,
                  }}
                  className="text-[20px] tracking-normal text-[#310C13] leading-none"
                >
                  BridesBerry
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                }}
                className="text-xs text-[#8C6A16] font-medium"
              >
                A Unit of Brynex Apparels Pvt Ltd
              </p>
            </div>

            <div className="space-y-3.5 max-w-[480px]">
              <p
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  fontWeight: 400,
                }}
                className="text-[#595959] text-[13px] leading-relaxed"
              >
                Get updates about new collections, offers, and special events.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-stretch gap-2.5 w-full"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  style={{
                    fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  }}
                  className="bg-white border border-[#D4D4D4] focus:border-[#310C13] focus:outline-none flex-1 py-2.5 px-4 text-[13px] text-neutral-800 placeholder-[#A3A3A3] rounded-none"
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  }}
                  className="bg-[#310C13] hover:bg-[#4a101a] text-white font-normal text-[13px] py-2.5 px-7 transition-colors duration-300 rounded-none flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <div
              style={{
                fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
              }}
              className="text-xs text-neutral-500 space-y-1 pt-2"
            >
              <p className="font-semibold text-neutral-700">Registered Office:</p>
              <p>37/3688A3, Harikeerthi Complex, Edapally, Ernakulam, Kerala - 682024</p>
              <p>Support: <a href="mailto:rootmentsit@gmail.com" className="text-[#8C6A16] hover:underline">rootmentsit@gmail.com</a></p>
            </div>
          </div>

          {/* Right Columns (Links Grid) */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* Column 1: Shop */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  fontWeight: 400,
                }}
                className="text-[13px] uppercase text-[#513137] tracking-wider"
              >
                Shop
              </h4>
              <ul className="space-y-3">
                {shopLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                      }}
                      className="text-[13px] text-[#595959] hover:text-[#310C13] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Customer Policies */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  fontWeight: 400,
                }}
                className="text-[13px] uppercase text-[#513137] tracking-wider"
              >
                Policies
              </h4>
              <ul className="space-y-3">
                {policyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                      }}
                      className="text-[13px] text-[#595959] hover:text-[#310C13] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Follow Us */}
            <div className="space-y-4">
              <h4
                style={{
                  fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                  fontWeight: 400,
                }}
                className="text-[13px] uppercase text-[#513137] tracking-wider"
              >
                Follow Us
              </h4>
              <ul className="space-y-3">
                {followLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                      }}
                      className="text-[13px] text-[#595959] hover:text-[#310C13] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyrights Bar */}
        <div
          style={{
            fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
          }}
          className="border-t border-[#D9D9D9] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#595959] text-[13px]"
        >
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-center md:text-left">
            <span>© {new Date().getFullYear()} BridesBerry. All Rights Reserved.</span>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <Link href="/privacy-policy" className="hover:text-[#310C13] transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <Link href="/shipping-policy" className="hover:text-[#310C13] transition-colors underline-offset-4 hover:underline">
              Shipping Policy
            </Link>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <Link href="/return-policy" className="hover:text-[#310C13] transition-colors underline-offset-4 hover:underline">
              Return Policy
            </Link>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <Link href="/refund-policy" className="hover:text-[#310C13] transition-colors underline-offset-4 hover:underline">
              Refund Policy
            </Link>
            <span className="text-neutral-300 hidden sm:inline">|</span>
            <Link href="/terms-and-conditions" className="hover:text-[#310C13] transition-colors underline-offset-4 hover:underline">
              Terms &amp; Conditions
            </Link>
          </div>
          <span className="text-xs text-neutral-400">
            Brynex Apparels Private Ltd
          </span>
        </div>
      </div>
    </footer>
  );
}
