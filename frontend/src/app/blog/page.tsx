"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "@/data/blog";

function SafeImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
  fallbackSrc = "/hero-bg.jpg",
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  fallbackSrc?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
    />
  );
}

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Lead featured post
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1E1E1E] pt-24 sm:pt-28 pb-20 font-sans">
      
      {/* ─── Top Editorial Masthead ─── */}
      <header className="w-full px-[6.5%] mx-auto max-w-[1440px] pt-4 pb-10 text-center flex flex-col items-center">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center space-x-2 text-xs font-questrial text-neutral-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#C99213] font-medium">Journal</span>
        </nav>

        {/* Script Brand Accent */}
        <span
          style={{
            fontFamily: "var(--font-windsong), 'WindSong', cursive",
            fontSize: "clamp(28px, 4vw, 42px)",
            lineHeight: 1,
          }}
          className="text-[#C99213] block mb-2 select-none"
        >
          The Bridal Journal
        </span>

        {/* Grand Serif Headline */}
        <h1
          style={{
            fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 5vw, 54px)",
            lineHeight: 1.15,
          }}
          className="text-[#310C13] tracking-tight max-w-3xl mb-4"
        >
          Stories of Heritage, Craft &amp; Bridal Elegance
        </h1>

        <p
          style={{
            fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
          }}
          className="text-neutral-500 text-sm sm:text-base max-w-xl leading-relaxed"
        >
          Expert styling advice, behind-the-scenes gemology, and timeless inspiration curated by the master jewelers of Brides Berry.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-3 mt-6 text-[#C99213]">
          <span className="h-[1px] w-12 bg-[#E8DBB4]"></span>
          <span className="text-xs">✳</span>
          <span className="h-[1px] w-12 bg-[#E8DBB4]"></span>
        </div>
      </header>


      {/* ─── Main Content Container ─── */}
      <div className="w-full px-[6.5%] mx-auto max-w-[1440px] space-y-12 sm:space-y-16">

        {/* ─── Featured Spotlight Card ─── */}
        {featuredPost && selectedCategory === "All" && !searchQuery && (
          <section className="w-full bg-[#FAF7F2] border border-[#E8DBB4]/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Left Image Column */}
              <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[480px] overflow-hidden group">
                <SafeImage
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  {/* Category Pill + Read Time */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs font-questrial text-neutral-400">
                      {featuredPost.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                      fontWeight: 600,
                      fontSize: "clamp(24px, 2.5vw, 36px)",
                      lineHeight: 1.2,
                    }}
                    className="text-[#310C13] mb-3 hover:text-[#C99213] transition-colors"
                  >
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {/* Subtitle / Excerpt */}
                  <p
                    style={{
                      fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
                    }}
                    className="text-neutral-600 text-sm leading-relaxed mb-6"
                  >
                    {featuredPost.excerpt}
                  </p>
                </div>

                {/* Footer: Author & CTA */}
                <div className="pt-6 border-t border-[#E8DBB4]/50 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#E8DBB4]">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-[#1E1E1E]">
                        {featuredPost.author.name}
                      </span>
                      <span className="block text-[10px] text-neutral-400 uppercase tracking-wider font-questrial">
                        {featuredPost.publishedAt}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    style={{
                      fontFamily: "var(--font-stack-text), 'Questrial', sans-serif",
                    }}
                    className="inline-flex items-center gap-2 bg-[#310C13] hover:bg-[#4a101a] text-white text-xs uppercase tracking-widest px-5 py-2.5 transition-colors duration-300"
                  >
                    <span>Read Story</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H8M17 7V16" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </section>
        )}


        {/* ─── Controls: Category Filter Tabs & Search Bar ─── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-y border-neutral-200 py-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {BLOG_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-[#310C13] text-white font-medium shadow-xs"
                      : "bg-transparent text-neutral-600 hover:text-[#310C13] hover:bg-neutral-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:max-w-xs w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search bridal stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
              }}
              className="w-full pl-9 pr-8 py-2 bg-white border border-neutral-200 focus:border-[#C99213] focus:outline-none text-xs text-neutral-800 placeholder-neutral-400 rounded-full transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-700 cursor-pointer text-xs"
              >
                ✕
              </button>
            )}
          </div>

        </div>


        {/* ─── Articles Grid ─── */}
        <section>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-neutral-200 rounded-2xl p-8 space-y-3">
              <span className="text-2xl text-[#C99213]">✳</span>
              <h3 className="text-base font-semibold text-neutral-800">
                No bridal stories found
              </h3>
              <p className="text-xs text-neutral-500 font-questrial max-w-sm mx-auto">
                We couldn&apos;t find any stories matching your criteria. Try searching for a different keyword or category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-xs font-semibold text-[#C99213] underline hover:text-[#310C13] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Article Card Image */}
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative aspect-[16/10] overflow-hidden bg-neutral-100"
                    >
                      <SafeImage
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute top-3 left-3 bg-[#FBF7ED]/95 backdrop-blur-xs text-[#8C6A16] border border-[#E8DBB4] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-2xs">
                        {post.category}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 font-questrial mb-2.5">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3
                        style={{
                          fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                          fontWeight: 600,
                          fontSize: "20px",
                          lineHeight: 1.25,
                        }}
                        className="text-[#310C13] mb-2 group-hover:text-[#C99213] transition-colors line-clamp-2"
                      >
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>

                      <p
                        style={{
                          fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
                        }}
                        className="text-neutral-600 text-xs leading-relaxed line-clamp-3 mb-4"
                      >
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-neutral-200">
                        <Image
                          src={post.author.avatar}
                          alt={post.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-700">
                        {post.author.name}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#310C13] hover:text-[#C99213] uppercase tracking-wider transition-colors"
                    >
                      <span>Read</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H8M17 7V16" />
                      </svg>
                    </Link>
                  </div>

                </article>
              ))}
            </div>
          )}
        </section>


        {/* ─── Atelier Editorial Newsletter Banner ─── */}
        <section className="bg-[#310C13] text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center flex flex-col items-center">
          <span className="text-[#C99213] text-2xl mb-2">✳</span>
          <span
            style={{ fontFamily: "var(--font-windsong), cursive" }}
            className="text-[#C99213] text-2xl sm:text-3xl mb-1 select-none"
          >
            Stay Inspired
          </span>
          <h2
            style={{
              fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
              fontWeight: 600,
              fontSize: "clamp(26px, 3.5vw, 42px)",
              lineHeight: 1.2,
            }}
            className="text-white max-w-xl mb-3"
          >
            Subscribe to The Brides Berry Atelier
          </h2>
          <p
            style={{ fontFamily: "var(--font-questrial), 'Questrial', sans-serif" }}
            className="text-white/70 text-xs sm:text-sm max-w-md mb-8 leading-relaxed"
          >
            Receive invitation-only bridal previews, gemstone insights, and private invitations directly to your inbox.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to The Brides Berry Atelier journal!");
            }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 focus:border-[#C99213] focus:bg-white focus:text-neutral-900 text-white placeholder-white/50 text-xs rounded-none outline-none transition-all"
            />
            <button
              type="submit"
              className="bg-[#C99213] hover:bg-[#a9831e] text-white text-xs font-semibold uppercase tracking-widest px-6 py-3 transition-colors cursor-pointer shrink-0"
            >
              Subscribe
            </button>
          </form>
        </section>

      </div>

    </div>
  );
}

