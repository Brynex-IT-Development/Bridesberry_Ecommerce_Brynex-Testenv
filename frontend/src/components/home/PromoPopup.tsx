"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getSystemSettings } from "@/services/system-settings.service";

interface PromoPopupProps {
  initialSettings?: {
    enabled: boolean;
    title: string;
    description: string;
    image: string;
    link: string;
    position?: string;
    fit?: 'cover' | 'contain';
  };
}

export default function PromoPopup({ initialSettings }: PromoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupData, setPopupData] = useState<{
    title: string;
    description: string;
    image: string;
    link: string;
    position?: string;
    fit?: 'cover' | 'contain';
  }>({
    title: initialSettings?.title || "",
    description: initialSettings?.description || "",
    image: initialSettings?.image || "",
    link: initialSettings?.link || "",
    position: initialSettings?.position || "center",
    fit: initialSettings?.fit || "cover",
  });

  useEffect(() => {
    // Check if dismissed in this tab session
    const dismissed = sessionStorage.getItem("promo_popup_dismissed");
    if (dismissed === "true") return;

    if (initialSettings?.enabled) {
      setPopupData({
        title: initialSettings.title,
        description: initialSettings.description,
        image: initialSettings.image,
        link: initialSettings.link,
        position: initialSettings.position || "center",
        fit: initialSettings.fit || "cover",
      });
      // Small timeout for smooth entrance
      const timer = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(timer);
    }

    // Client-side fallback fetch
    getSystemSettings().then((settings) => {
      if (settings.promo_popup_enabled === "true") {
        setPopupData({
          title: settings.promo_popup_title || "Announcement",
          description: settings.promo_popup_description || "",
          image: settings.promo_popup_image || "",
          link: settings.promo_popup_link || "",
          position: settings.promo_popup_image_position || "center",
          fit: (settings.promo_popup_image_fit as 'cover' | 'contain') || "cover",
        });
        const timer = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(timer);
      }
    });
  }, [initialSettings]);

  const handleClose = () => {
    sessionStorage.setItem("promo_popup_dismissed", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={handleClose}
          />

          {/* Luxury Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-xl md:max-w-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row my-auto border border-neutral-150"
          >
            {/* Minimalist Round Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 z-30 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-neutral-900 shadow-sm flex items-center justify-center transition-all cursor-pointer border border-neutral-200"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left column: Image banner */}
            {popupData.image && (
              <div className="w-full md:w-[48%] relative aspect-[4/3] md:aspect-auto min-h-[220px] md:min-h-[380px] bg-[#2A080E] overflow-hidden flex-shrink-0">
                <Image
                  src={popupData.image}
                  alt={popupData.title || "Special Announcement"}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 360px"
                  style={{
                    objectPosition: popupData.position || 'center',
                    objectFit: popupData.fit || 'cover',
                  }}
                  className="transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            )}

            {/* Right column: Refined Editorial Typography */}
            <div
              className={`w-full ${
                popupData.image ? 'md:w-[52%]' : 'w-full'
              } p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left space-y-6 bg-white`}
            >
              <div className="space-y-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium text-[#B78924] block font-questrial">
                  Special Announcement
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-stack-headline), 'Stack Sans Headline', 'Raleway', sans-serif",
                    fontWeight: 300,
                  }}
                  className="text-2xl sm:text-[28px] md:text-[32px] text-neutral-900 leading-[1.15] tracking-tight"
                >
                  {popupData.title}
                </h3>

                {popupData.description && (
                  <p className="font-questrial text-xs sm:text-[13px] text-neutral-600 leading-relaxed pt-1">
                    {popupData.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
                {popupData.link && (
                  <Link
                    href={popupData.link}
                    onClick={handleClose}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#310C13] hover:bg-[#4a101a] text-white transition-all duration-300 text-[11px] font-medium tracking-[0.16em] uppercase text-center shadow-sm hover:shadow-md active:scale-98"
                  >
                    <span>Discover Now</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}

                <button
                  onClick={handleClose}
                  className="px-5 py-3 border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 transition-colors text-[11px] font-medium tracking-[0.16em] uppercase text-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
