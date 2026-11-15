import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '../../../services/products.service';
import ProductDetailsClient from '../../../components/product/ProductDetailsClient';

interface Props {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridesberry.com";

// Generate SEO Metadata dynamically according to Brides Berry SEO Strategy
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Brides Berry',
      description: 'The requested handcrafted bridal jewellery piece could not be found.',
    };
  }

  const categoryName = product.category || 'Bridal Jewellery';
  const pageTitle = `${product.title} – ${categoryName} | Brides Berry`;
  const pageDesc = product.description
    ? `${product.description.substring(0, 140)}... Rs ${product.price}, handcrafted with fast delivery across India.`
    : `Handcrafted ${product.title} for brides. Rs ${product.price}, delivery across India. Shop luxury wedding jewellery at Brides Berry.`;

  const primaryImage = product.images?.[0] || `${siteUrl}/og-image.jpg`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `${siteUrl}/product/${slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `${siteUrl}/product/${slug}`,
      siteName: "Brides Berry",
      locale: "en_IN",
      type: "website",
      images: [{ url: primaryImage, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      images: [primaryImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Get related products (excluding current product and drafts)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.id !== "SKU-005")
    .slice(0, 4);

  // Structured Data (JSON-LD Product & Breadcrumb)
  const primaryImage = product.images?.[0] || `${siteUrl}/icon.png`;
  const inStock = (product.stock ?? 0) > 0;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${siteUrl}/product/${slug}/#product`,
        name: product.title,
        image: product.images && product.images.length > 0 ? product.images : [primaryImage],
        description: product.description || `Handcrafted ${product.title} for brides.`,
        sku: product.sku || `BB-${product.id.substring(0, 8)}`,
        brand: {
          "@type": "Brand",
          name: "Brides Berry",
        },
        offers: {
          "@type": "Offer",
          url: `${siteUrl}/product/${slug}`,
          priceCurrency: "INR",
          price: product.price,
          availability: inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: {
            "@type": "Organization",
            name: "Brides Berry",
          },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: product.category || "Shop",
            item: `${siteUrl}/shop?category=${encodeURIComponent(product.category || "")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: product.title,
            item: `${siteUrl}/product/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetailsClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
