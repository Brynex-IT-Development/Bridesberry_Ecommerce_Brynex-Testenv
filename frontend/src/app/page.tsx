import React, { Suspense } from "react";
import HeroSection from "../components/home/HeroSection";
import CategorySection, { CategorySectionSkeleton } from "../components/home/CategorySection";
import BestSellerSection from "../components/home/BestSellerSection";
import EditorialShowcaseSection from "../components/home/EditorialShowcaseSection";
import InstagramSection from "../components/home/InstagramSection";
import PromoPopup from "../components/home/PromoPopup";

import { getProducts } from "@/services/products.service";
import { getSystemSettings } from "@/services/system-settings.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [newArrivalsResponse, bestSellersResponse, settings] = await Promise.all([
    getProducts({ newArrival: true }),
    getProducts({ bestSeller: true }),
    getSystemSettings(),
  ]);

  const bestSellers =
    bestSellersResponse.length > 0
      ? bestSellersResponse.slice(0, 8)
      : newArrivalsResponse.slice(0, 8);

  return (
    <div className="flex flex-col w-full relative">
      {/* Promo announcement modal */}
      <PromoPopup />

      {/* Immersive Hero Section */}
      <HeroSection />

      {/* Content wrapper */}
      <div className="relative z-20 bg-white">
        {/* Categories Grid + Modern Jewelry Editorial Section */}
        <Suspense fallback={<CategorySectionSkeleton />}>
          <CategorySection />
        </Suspense>

        {/* Explore Products / Best Selling Showcase (4x2 Grid) */}
        <BestSellerSection products={bestSellers} />

        {/* Dual Editorial Showcase after View Collection button */}
        <EditorialShowcaseSection
          primaryEditorialImage={settings.editorial_showcase_1}
          secondaryEditorialImage={settings.editorial_showcase_2}
        />

        {/* Instagram User Gallery */}
        <InstagramSection />
      </div>
    </div>
  );
}

