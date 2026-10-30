import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BLOG_POSTS, BlogPost } from "@/data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Brides Berry" };

  return {
    title: `${post.title} | Brides Berry Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts from the same category or others
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="min-h-screen bg-[#FDFCFB] text-[#1E1E1E] pt-24 sm:pt-28 pb-20 font-sans">
      
      {/* ─── Top Navigation & Header ─── */}
      <div className="w-full px-[6.5%] mx-auto max-w-[1000px]">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-questrial text-neutral-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#310C13] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#310C13] transition-colors">
            Journal
          </Link>
          <span>/</span>
          <span className="text-[#C99213] truncate max-w-[220px] sm:max-w-md font-medium">
            {post.title}
          </span>
        </nav>

        {/* Category & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-block bg-[#FBF7ED] text-[#8C6A16] border border-[#E8DBB4] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-xs text-neutral-400 font-questrial">
            {post.publishedAt}
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-xs text-neutral-400 font-questrial">
            {post.readTime}
          </span>
        </div>

        {/* Article Headline */}
        <h1
          style={{
            fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            lineHeight: 1.18,
          }}
          className="text-[#310C13] tracking-tight mb-4"
        >
          {post.title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "var(--font-questrial), 'Questrial', sans-serif",
          }}
          className="text-neutral-600 text-base sm:text-lg leading-relaxed mb-8"
        >
          {post.subtitle}
        </p>

        {/* Author Bylines */}
        <div className="flex items-center justify-between border-y border-neutral-200 py-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#E8DBB4]">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="block text-sm font-semibold text-[#1E1E1E]">
                {post.author.name}
              </span>
              <span className="block text-xs text-neutral-400 font-questrial">
                {post.author.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-questrial text-neutral-400 hidden sm:inline-block">
              Share:
            </span>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-500 hover:text-[#25D366] hover:bg-neutral-100 rounded-full transition-colors"
              title="Share on WhatsApp"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Hero Cover Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 shadow-sm bg-neutral-100">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>

        {/* ─── Article Body Content ─── */}
        <div className="space-y-8 font-questrial text-neutral-700 text-base sm:text-lg leading-relaxed">
          
          {/* Introduction paragraph */}
          <p className="text-lg sm:text-xl font-light text-[#310C13] leading-relaxed border-l-2 border-[#C99213] pl-4 sm:pl-6 py-1">
            {post.content.intro}
          </p>

          {/* Sections */}
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              <h2
                style={{
                  fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "clamp(22px, 2.5vw, 30px)",
                }}
                className="text-[#310C13] tracking-tight"
              >
                {section.heading}
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {section.body}
              </p>

              {section.quote && (
                <blockquote className="my-6 p-6 sm:p-8 bg-[#FAF7F2] border-l-4 border-[#C99213] rounded-r-2xl italic text-[#310C13] font-serif text-lg sm:text-xl">
                  {section.quote}
                </blockquote>
              )}
            </div>
          ))}

          {/* Tips Callout */}
          {post.content.tips && post.content.tips.length > 0 && (
            <div className="my-10 bg-[#FAF7F2] border border-[#E8DBB4] rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#8C6A16]">
                <span className="text-sm">✳</span>
                <h3 className="text-xs uppercase tracking-widest font-bold">
                  Atelier Stylist Notes
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-neutral-700 list-disc list-inside">
                {post.content.tips.map((tip, tIdx) => (
                  <li key={tIdx} className="leading-relaxed">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Featured Products in this Story */}
          {post.content.featuredProducts && post.content.featuredProducts.length > 0 && (
            <div className="pt-8 border-t border-neutral-200">
              <h3
                style={{
                  fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                  fontWeight: 600,
                  fontSize: "24px",
                }}
                className="text-[#310C13] mb-6"
              >
                Featured in this Story
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {post.content.featuredProducts.map((prod, pIdx) => (
                  <Link
                    key={pIdx}
                    href={prod.link}
                    className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl hover:border-[#C99213] transition-colors group shadow-2xs"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-neutral-100">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                        {prod.category}
                      </span>
                      <h4 className="text-sm font-semibold text-neutral-800 group-hover:text-[#C99213] transition-colors truncate">
                        {prod.name}
                      </h4>
                      <span className="text-xs font-bold text-[#310C13] mt-1 block">
                        {prod.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ─── Back Button & Author Bio ─── */}
        <div className="pt-12 mt-12 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#310C13] hover:text-[#C99213] transition-colors"
          >
            <span>&larr; Back to All Stories</span>
          </Link>
          <span className="text-xs text-neutral-400 font-questrial">
            Published in {post.category}
          </span>
        </div>

      </div>


      {/* ─── Related Articles Section ─── */}
      {relatedPosts.length > 0 && (
        <section className="w-full px-[6.5%] mx-auto max-w-[1440px] pt-20 mt-20 border-t border-neutral-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span
              style={{ fontFamily: "var(--font-windsong), cursive" }}
              className="text-[#C99213] text-2xl"
            >
              More to Explore
            </span>
            <h2
              style={{
                fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(26px, 3vw, 36px)",
              }}
              className="text-[#310C13]"
            >
              Related Bridal Stories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((rel) => (
              <article
                key={rel.slug}
                className="bg-white border border-neutral-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow group"
              >
                <div>
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-neutral-100"
                  >
                    <Image
                      src={rel.coverImage}
                      alt={rel.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 bg-[#FBF7ED]/95 backdrop-blur-xs text-[#8C6A16] border border-[#E8DBB4] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full">
                      {rel.category}
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400 font-questrial mb-2">
                      <span>{rel.publishedAt}</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-abhaya-libre), 'Abhaya Libre', Georgia, serif",
                        fontWeight: 600,
                        fontSize: "18px",
                        lineHeight: 1.25,
                      }}
                      className="text-[#310C13] mb-2 group-hover:text-[#C99213] transition-colors line-clamp-2"
                    >
                      <Link href={`/blog/${rel.slug}`}>
                        {rel.title}
                      </Link>
                    </h3>
                    <p className="text-neutral-600 text-xs font-questrial line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 border-t border-neutral-100 flex justify-end">
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#310C13] hover:text-[#C99213] uppercase tracking-wider transition-colors"
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
        </section>
      )}

    </article>
  );
}

