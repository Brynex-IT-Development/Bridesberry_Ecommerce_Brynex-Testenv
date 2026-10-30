import React, { useState } from "react";
import { AdminProductFormData, AdminProductMedia, AdminProductVariant } from "@/types/admin";

interface ProductPreviewProps {
  formData: AdminProductFormData;
}

export default function ProductPreviewCard({ formData }: ProductPreviewProps) {
  const [fitMode, setFitMode] = useState<"cover" | "contain">("contain");
  const [alignment, setAlignment] = useState<"top" | "center" | "bottom">("center");
  const [zoomScale, setZoomScale] = useState<number>(100);

  const primaryImage = formData.media?.find((m: AdminProductMedia) => m.isPrimary)?.url;
  
  const name = formData.name || "Untitled Jewelry Piece";
  const category = formData.category || "Uncategorized";
  const shortDesc = formData.shortDescription || "No short description provided yet.";
  
  const mrpVal = parseFloat(formData.mrp) || 0;
  const sellingPriceVal = parseFloat(formData.sellingPrice) || 0;
  const discountPercent = formData.discountPercent || 0;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden sticky top-24 max-w-sm w-full mx-auto">
      {/* Label indicating preview */}
      <div className="bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-4 text-center">
        Live Customer Catalog Preview
      </div>

      {/* Interactive Alignment / Crop & Fit Controls */}
      <div className="bg-[#FAF9F6] border-b border-neutral-200 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-[10px]">
        {/* Fit Toggle: Contain (Fit Whole Item) vs Cover (Fill Box) */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-neutral-500 uppercase tracking-wider text-[9px]">Fit:</span>
          <div className="inline-flex rounded-md bg-white border border-neutral-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setFitMode("contain")}
              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                fitMode === "contain"
                  ? "bg-[#C99213] text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Fit entire jewelry piece inside without cutting edges"
            >
              Fit Full
            </button>
            <button
              type="button"
              onClick={() => setFitMode("cover")}
              className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                fitMode === "cover"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Fill entire card frame (crop edges)"
            >
              Fill Box
            </button>
          </div>
        </div>

        {/* Focus / Alignment Buttons: Top | Mid | Btm */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-neutral-500 uppercase tracking-wider text-[9px]">Focus:</span>
          <div className="inline-flex rounded-md bg-white border border-neutral-200 p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setAlignment("top")}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                alignment === "top"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Align to Top (ideal for Necklaces to prevent top chains from cutting off)"
            >
              Top
            </button>
            <button
              type="button"
              onClick={() => setAlignment("center")}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                alignment === "center"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Align to Center"
            >
              Mid
            </button>
            <button
              type="button"
              onClick={() => setAlignment("bottom")}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-colors cursor-pointer ${
                alignment === "bottom"
                  ? "bg-neutral-900 text-white shadow-2xs"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Align to Bottom (ideal for pendants)"
            >
              Btm
            </button>
          </div>
        </div>

        {/* Scale / Padding Presets */}
        <div className="flex items-center gap-1">
          <span className="font-bold text-neutral-500 uppercase tracking-wider text-[9px]">Pad:</span>
          <div className="inline-flex rounded-md bg-white border border-neutral-200 p-0.5 shadow-2xs">
            {[100, 92, 85].map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => setZoomScale(scale)}
                className={`px-1.5 py-0.5 rounded text-[8px] font-bold transition-colors cursor-pointer ${
                  zoomScale === scale
                    ? "bg-[#C99213] text-white shadow-2xs"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
                title={`Scale to ${scale}% with breathing margin`}
              >
                {scale === 100 ? "0" : scale === 92 ? "5%" : "10%"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Image Area */}
      <div className="aspect-square bg-gradient-to-tr from-[#fbf9f4] via-[#f7f3e8] to-[#f2ecda] border-b border-neutral-100 flex items-center justify-center relative overflow-hidden">
        {primaryImage ? (
          /* Native img is used intentionally for dynamic blob object URL previews */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={primaryImage}
            alt={name}
            style={{
              objectFit: fitMode,
              objectPosition: alignment,
              transform: zoomScale !== 100 ? `scale(${zoomScale / 100})` : undefined,
              transition: "transform 0.2s ease, object-position 0.2s ease",
            }}
            className={`w-full h-full ${fitMode === "contain" ? "p-3 drop-shadow-sm" : ""}`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-neutral-400 space-y-2">
            <svg className="w-12 h-12 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
              <circle cx="12" cy="14" r="5" />
              <path d="M12 9V3m-3 2h6" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wider">No Image Uploaded</span>
          </div>
        )}

        {/* Collection Tags */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 pointer-events-none">
          {formData.isNewArrival && (
            <span className="bg-[#1C1B19] text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
              NEW
            </span>
          )}
          {formData.isBestSeller && (
            <span className="bg-[#C99213] text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Quick Mode Indicator Tag on top right */}
        {primaryImage && (
          <button
            type="button"
            onClick={() => setFitMode(fitMode === "contain" ? "cover" : "contain")}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-neutral-800 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 transition-all cursor-pointer backdrop-blur-xs"
            title="Click to toggle Fit / Fill"
          >
            {fitMode === "contain" ? "Fit Full" : "Fill Box"}
          </button>
        )}
      </div>

      {/* Product Details Area */}
      <div className="p-5 space-y-4">
        {/* Category & Tags */}
        <div className="flex items-center justify-between text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
          <span>{category}</span>
          <span className="text-neutral-500 font-semibold">{formData.gender || "Unisex"}</span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-bold tracking-wide text-neutral-900 uppercase font-sans line-clamp-1">
          {name}
        </h3>

        {/* Price Level */}
        <div className="flex items-baseline space-x-2.5">
          <span className="text-sm font-bold text-[#C99213]">
            ₹{(sellingPriceVal || mrpVal).toLocaleString("en-IN")}
          </span>
          {mrpVal > sellingPriceVal && sellingPriceVal > 0 && (
            <>
              <span className="text-xs text-neutral-405 line-through font-medium">
                ₹{mrpVal.toLocaleString("en-IN")}
              </span>
              <span className="text-[10px] font-bold text-[#2E7D32]">
                ({discountPercent}% OFF)
              </span>
            </>
          )}
        </div>

        {/* Description Snippet */}
        <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-2">
          {shortDesc}
        </p>

        {/* Size Selector Mockup */}
        {formData.variants?.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider block">
              Available Options
            </span>
            <div className="flex flex-wrap gap-1.5">
              {formData.variants.map((v: AdminProductVariant) => (
                <span
                  key={v.id}
                  className="px-2 py-1 border border-neutral-200 rounded text-[9px] font-bold text-neutral-600 bg-[#F9F9F9]"
                >
                  {v.name.split(":").pop()?.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          type="button"
          className="w-full py-2 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer border border-neutral-950"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
