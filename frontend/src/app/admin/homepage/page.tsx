"use client";

import React, { useState, useEffect } from "react";
import { Upload, Trash2, Video, Image as ImageIcon, Loader2, MessageSquare, AlertCircle, Link2, ExternalLink, Plus, Check, X } from "lucide-react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { getSystemSettings, saveSystemSetting } from "@/services/system-settings.service";
import { uploadFile } from "@/services/media.service";

export interface ReelItem {
  url: string;
  linkUrl?: string;
}

interface ImageFrameAlignmentControlsProps {
  fit: string;
  position: string;
  onChange: (fit: string, position: string) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
}

function ImageFrameAlignmentControls({
  fit,
  position,
  onChange,
  onSave,
  isSaving,
}: ImageFrameAlignmentControlsProps) {
  const [justSaved, setJustSaved] = useState(false);

  // Extract vertical offset percentage from position string (e.g., "50% 46%" -> 46)
  const parsePercent = (pos: string) => {
    const match = pos.match(/(\d+)%/g);
    if (match && match.length > 0) {
      return parseInt(match[match.length - 1], 10);
    }
    if (pos.includes("top")) return 10;
    if (pos.includes("bottom")) return 90;
    return 50;
  };

  const currentPercent = parsePercent(position);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(fit, `50% ${val}%`);
  };

  const handleSave = async () => {
    await onSave();
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  };

  return (
    <div className="bg-[#FAF9F6] border border-neutral-200 rounded-xl p-3.5 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-sans">
          <svg className="w-3.5 h-3.5 text-[#C99213]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          Frame Alignment &amp; Crop
        </span>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
            justSaved
              ? "bg-emerald-600 text-white"
              : "bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-50"
          }`}
        >
          {isSaving ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving...</span>
            </>
          ) : justSaved ? (
            <>
              <Check className="w-3 h-3" />
              <span>Saved!</span>
            </>
          ) : (
            <span>Save Alignment</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-neutral-200/80">
        {/* Fit Mode */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Fit Mode</span>
          <div className="inline-flex rounded-lg bg-white border border-neutral-200 p-0.5 w-full shadow-2xs">
            <button
              type="button"
              onClick={() => onChange("cover", position)}
              className={`flex-1 py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                fit === "cover" ? "bg-neutral-900 text-white shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Fill entire banner space (crops edges to fit)"
            >
              Fill Frame (Cover)
            </button>
            <button
              type="button"
              onClick={() => onChange("contain", position)}
              className={`flex-1 py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                fit === "contain" ? "bg-[#C99213] text-white shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Fit entire image without any cropping"
            >
              Fit Full (Contain)
            </button>
          </div>
        </div>

        {/* Alignment Presets */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Focal Presets</span>
          <div className="inline-flex rounded-lg bg-white border border-neutral-200 p-0.5 w-full shadow-2xs">
            {[
              { label: "Top", pos: "50% 10%" },
              { label: "Center", pos: "50% 50%" },
              { label: "Bottom", pos: "50% 90%" },
            ].map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange(fit, preset.pos)}
                className={`flex-1 py-1 text-center rounded text-[10px] font-bold transition-all cursor-pointer ${
                  position === preset.pos
                    ? "bg-[#C99213] text-white shadow-2xs"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fine-Tuning Vertical Offset Slider & Direct Type Input */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between items-center text-[10px]">
          <span className="font-semibold text-neutral-600">Vertical Framing Position (Focal Y):</span>
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min={0}
              max={100}
              value={currentPercent}
              onChange={(e) => {
                const val = e.target.value === "" ? 0 : Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0));
                onChange(fit, `50% ${val}%`);
              }}
              className="w-14 px-1.5 py-0.5 border border-neutral-300 rounded text-center font-mono font-bold text-xs text-[#C99213] bg-white outline-none focus:border-[#C99213]"
            />
            <span className="font-bold text-neutral-500">%</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={currentPercent}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#C99213]"
        />
        <div className="flex justify-between text-[9px] text-neutral-400 font-medium px-0.5">
          <span>0% (Top of photo)</span>
          <span>50% (Center)</span>
          <span>100% (Bottom of photo)</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminHomepageConfigPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [reels, setReels] = useState<(string | ReelItem)[]>([]);
  const [loading, setLoading] = useState(true);

  // Instagram Profile URL state
  const [instagramProfileUrl, setInstagramProfileUrl] = useState("");
  const [savingInstagramProfile, setSavingInstagramProfile] = useState(false);

  // Add Reel Panel states (Dual Mode: Upload File or Paste Link)
  const [showAddReelPanel, setShowAddReelPanel] = useState(false);
  const [reelAddMode, setReelAddMode] = useState<"upload" | "link">("upload");
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadDestinationLink, setUploadDestinationLink] = useState("");
  const [uploadingReel, setUploadingReel] = useState(false);
  const [pastedReelUrl, setPastedReelUrl] = useState("");
  const [pastedLinkUrl, setPastedLinkUrl] = useState("");
  const [addingLink, setAddingLink] = useState(false);

  // Upload loaders
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCategory, setUploadingCategory] = useState(false);
  const [uploadingEditorial1, setUploadingEditorial1] = useState(false);
  const [uploadingEditorial2, setUploadingEditorial2] = useState(false);

  // Promo Popup config states
  const [promoPopupEnabled, setPromoPopupEnabled] = useState(false);
  const [promoPopupTitle, setPromoPopupTitle] = useState("");
  const [promoPopupDescription, setPromoPopupDescription] = useState("");
  const [promoPopupLink, setPromoPopupLink] = useState("");
  const [promoPopupImage, setPromoPopupImage] = useState("");
  const [uploadingPromoImage, setUploadingPromoImage] = useState(false);
  const [savingPromo, setSavingPromo] = useState(false);

  // Alignment saving indicator
  const [savingAlignmentKey, setSavingAlignmentKey] = useState<string | null>(null);

  const handleUpdateSettingLocal = (key: string, val: string) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveAlignment = async (prefix: string) => {
    setSavingAlignmentKey(prefix);
    const fitKey = `${prefix}_fit`;
    const posKey = `${prefix}_position`;
    const fitVal = settings[fitKey] || "cover";
    const posVal = settings[posKey] || (prefix === "hero_image" ? "50% 46%" : "center");

    try {
      await Promise.all([
        saveSystemSetting(fitKey, fitVal),
        saveSystemSetting(posKey, posVal),
      ]);
    } catch (err: any) {
      console.warn("Save alignment failed:", err);
      alert(`Failed to save alignment: ${err?.message || "Unknown error"}`);
    } finally {
      setSavingAlignmentKey(null);
    }
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Homepage Settings" },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await getSystemSettings();
      setSettings(data);
      if (data.instagram_videos) {
        try {
          const parsed = JSON.parse(data.instagram_videos);
          if (Array.isArray(parsed)) {
            setReels(parsed);
          }
        } catch (e) {
          console.error("Failed to parse instagram reels:", e);
        }
      }

      // Load instagram profile setting
      setInstagramProfileUrl(data.instagram_profile_url || "");

      // Load popup settings
      setPromoPopupEnabled(data.promo_popup_enabled === "true");
      setPromoPopupTitle(data.promo_popup_title || "");
      setPromoPopupDescription(data.promo_popup_description || "");
      setPromoPopupLink(data.promo_popup_link || "");
      setPromoPopupImage(data.promo_popup_image || "");
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  // Image Upload Handlers
  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("hero_image", url);
      setSettings(prev => ({ ...prev, hero_image: url }));
      alert("Hero image updated successfully!");
    } catch (err: any) {
      console.warn("Hero upload failed:", err);
      if (err?.message?.includes("Authentication") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/admin/login";
        return;
      }
      alert(`Failed to upload hero image: ${err?.message || "Please check your network and try again."}`);
    } finally {
      setUploadingHero(false);
    }
  };

  const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingCategory(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("category_image", url);
      setSettings(prev => ({ ...prev, category_image: url }));
      alert("Categories banner updated successfully!");
    } catch (err: any) {
      console.warn("Category upload failed:", err);
      if (err?.message?.includes("Authentication") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/admin/login";
        return;
      }
      alert(`Failed to upload categories banner: ${err?.message || "Please check your network and try again."}`);
    } finally {
      setUploadingCategory(false);
    }
  };

  const handleEditorial1Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingEditorial1(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("editorial_showcase_1", url);
      setSettings(prev => ({ ...prev, editorial_showcase_1: url }));
      alert("Mid-Page Editorial Banner 1 updated successfully!");
    } catch (err: any) {
      console.warn("Editorial 1 upload failed:", err);
      if (err?.message?.includes("Authentication") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/admin/login";
        return;
      }
      alert(`Failed to upload Mid-Page Editorial Banner 1: ${err?.message || "Please check your network and try again."}`);
    } finally {
      setUploadingEditorial1(false);
    }
  };

  const handleEditorial2Upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingEditorial2(true);
    try {
      const url = await uploadFile(file, "categories");
      await saveSystemSetting("editorial_showcase_2", url);
      setSettings(prev => ({ ...prev, editorial_showcase_2: url }));
      alert("Bottom Editorial Banner 2 updated successfully!");
    } catch (err: any) {
      console.warn("Editorial 2 upload failed:", err);
      if (err?.message?.includes("Authentication") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/admin/login";
        return;
      }
      alert(`Failed to upload Bottom Editorial Banner 2: ${err?.message || "Please check your network and try again."}`);
    } finally {
      setUploadingEditorial2(false);
    }
  };

  const handleResetSetting = async (key: string, label: string) => {
    try {
      await saveSystemSetting(key, "");
      setSettings(prev => ({ ...prev, [key]: "" }));
      alert(`${label} reset to default static image!`);
    } catch (err: any) {
      if (err?.message?.includes("Authentication") || err?.message?.includes("credentials") || err?.message?.includes("Unauthorized")) {
        alert("Your session has expired. Please log in again.");
        window.location.href = "/admin/login";
        return;
      }
      console.warn("Reset failed:", err);
      alert(`Failed to reset ${label}: ${err?.message || "Unknown error"}`);
    }
  };

  // Instagram Profile URL Handler
  const handleSaveInstagramProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingInstagramProfile(true);
    try {
      await saveSystemSetting("instagram_profile_url", instagramProfileUrl.trim());
      alert("Instagram profile link saved successfully!");
    } catch (err) {
      console.error("Failed to save instagram profile link:", err);
      alert("Failed to save Instagram profile link.");
    } finally {
      setSavingInstagramProfile(false);
    }
  };

  // Video Reels Helpers & Handlers
  const extractInstagramShortcode = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const isInstagramUrl = (url: string): boolean => {
    if (!url) return false;
    return url.includes("instagram.com/reel/") || url.includes("instagram.com/p/");
  };

  const getReelData = (item: string | ReelItem): ReelItem => {
    if (typeof item === "string") {
      return {
        url: item,
        linkUrl: isInstagramUrl(item) ? item : "",
      };
    }
    return {
      url: item?.url || "",
      linkUrl: item?.linkUrl || (isInstagramUrl(item?.url) ? item.url : ""),
    };
  };

  const handleAddLinkReel = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = pastedReelUrl.trim();
    if (!cleanUrl) {
      alert("Please enter a valid Instagram reel URL or video link.");
      return;
    }

    setAddingLink(true);
    try {
      let finalItem: ReelItem;
      const shortcode = extractInstagramShortcode(cleanUrl);
      if (shortcode) {
        const canonicalIgUrl = `https://www.instagram.com/reel/${shortcode}/`;
        finalItem = {
          url: canonicalIgUrl,
          linkUrl: pastedLinkUrl.trim() || canonicalIgUrl,
        };
      } else {
        finalItem = {
          url: cleanUrl,
          linkUrl: pastedLinkUrl.trim() || (cleanUrl.startsWith("http") ? cleanUrl : ""),
        };
      }

      const updatedReels = [...reels, finalItem];
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      setPastedReelUrl("");
      setPastedLinkUrl("");
      setShowAddReelPanel(false);
      alert("Reel link added successfully!");
    } catch (err) {
      console.error("Failed to add reel link:", err);
      alert("Failed to add reel link.");
    } finally {
      setAddingLink(false);
    }
  };

  const handleUploadAndSaveReel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUploadFile) {
      alert("Please select a video file (.mp4, .webm, .mov) to upload.");
      return;
    }

    setUploadingReel(true);
    try {
      const url = await uploadFile(selectedUploadFile, "categories");
      const newItem: ReelItem = {
        url,
        linkUrl: uploadDestinationLink.trim() || instagramProfileUrl || "",
      };
      const updatedReels = [...reels, newItem];
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      setSelectedUploadFile(null);
      setUploadDestinationLink("");
      setShowAddReelPanel(false);
      alert("Video reel uploaded and added successfully!");
    } catch (err) {
      console.error("Reel upload failed:", err);
      alert("Failed to upload video reel.");
    } finally {
      setUploadingReel(false);
    }
  };

  const handleQuickReelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingReel(true);
    try {
      const url = await uploadFile(file, "categories");
      const newItem: ReelItem = { url, linkUrl: instagramProfileUrl || "" };
      const updatedReels = [...reels, newItem];
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      alert("Reel video added successfully!");
    } catch (err) {
      console.error("Reel upload failed:", err);
      alert("Failed to upload video reel.");
    } finally {
      setUploadingReel(false);
    }
  };

  const handleDeleteReel = async (idxToDelete: number) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this reel?");
    if (!confirmDelete) return;

    const updatedReels = reels.filter((_, idx) => idx !== idxToDelete);
    try {
      await saveSystemSetting("instagram_videos", JSON.stringify(updatedReels));
      setReels(updatedReels);
      alert("Reel removed successfully!");
    } catch (err) {
      console.error("Failed to delete reel:", err);
      alert("Failed to delete reel.");
    }
  };

  // Promo Popup Handlers
  const handlePromoImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPromoImage(true);
    try {
      const url = await uploadFile(file, "categories");
      setPromoPopupImage(url);
      alert("Promo popup image uploaded successfully! Click 'Save Popup Configuration' below to save changes.");
    } catch (err) {
      console.error("Promo image upload failed:", err);
      alert("Failed to upload promo image.");
    } finally {
      setUploadingPromoImage(false);
    }
  };

  const handleSavePromoSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingPromo(true);
    try {
      await Promise.all([
        saveSystemSetting("promo_popup_enabled", promoPopupEnabled ? "true" : "false"),
        saveSystemSetting("promo_popup_title", promoPopupTitle),
        saveSystemSetting("promo_popup_description", promoPopupDescription),
        saveSystemSetting("promo_popup_link", promoPopupLink),
        saveSystemSetting("promo_popup_image", promoPopupImage),
        saveSystemSetting("promo_popup_image_fit", settings.promo_popup_image_fit || "cover"),
        saveSystemSetting("promo_popup_image_position", settings.promo_popup_image_position || "center"),
      ]);
      alert("Promo Announcement settings saved successfully!");
    } catch (err) {
      console.error("Failed to save promo settings:", err);
      alert("Failed to save promo configuration settings.");
    } finally {
      setSavingPromo(false);
    }
  };

  const getReelSource = (filename: string) => {
    if (filename.startsWith('http') || filename.startsWith('/')) {
      return filename;
    }
    return `/videos/${encodeURIComponent(filename)}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F8F8] admin-dashboard-root">
        <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#C99213] animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8] admin-dashboard-root font-sans">
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      <div className="flex-grow p-4 sm:p-6 md:p-8 space-y-8 max-w-7xl w-full mx-auto min-w-0">
        {/* Title block */}
        <div>
          <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
            HOMEPAGE CONFIGURATOR
          </h1>
          <p className="text-[11px] text-neutral-500 mt-1 font-medium">
            Manage your storefront banners, promo popups, and instagram video marquee layout.
          </p>
        </div>

        {/* 2-Column Banner Editors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Hero Image card */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Front Hero Image
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Main background image displayed in the welcome hero banner (grayscale with color spotlight cutout).
                </p>
              </div>
              {settings.hero_image && (
                <button
                  type="button"
                  onClick={() => handleResetSetting("hero_image", "Front Hero Image")}
                  className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer flex-shrink-0"
                >
                  Reset Default
                </button>
              )}
            </div>

            {/* Preview image */}
            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={settings.hero_image || "/hero-bg-v2.jpg"}
                alt="Current Hero Background"
                style={{
                  objectFit: (settings.hero_image_fit as any) || "cover",
                  objectPosition: settings.hero_image_position || "50% 46%",
                  transition: "object-position 0.15s ease",
                }}
                className="w-full h-full"
              />
              {!settings.hero_image && (
                <div className="absolute bottom-2 left-2 bg-black/65 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                  Default: /hero-bg-v2.jpg
                </div>
              )}

              {uploadingHero && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Interactive Alignment & Crop Toolbar */}
            <ImageFrameAlignmentControls
              fit={settings.hero_image_fit || "cover"}
              position={settings.hero_image_position || "50% 46%"}
              onChange={(newFit, newPos) => {
                handleUpdateSettingLocal("hero_image_fit", newFit);
                handleUpdateSettingLocal("hero_image_position", newPos);
              }}
              onSave={() => handleSaveAlignment("hero_image")}
              isSaving={savingAlignmentKey === "hero_image"}
            />

            {/* Upload Button */}
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload New Hero</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Categories Editorial Image card */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Categories Editorial Banner
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Editorial showcase image displayed right below the Our Categories carousel (&quot;Discover Our Modern Jewelry Collection&quot;).
                </p>
              </div>
              {settings.category_image && (
                <button
                  type="button"
                  onClick={() => handleResetSetting("category_image", "Categories Editorial Banner")}
                  className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer flex-shrink-0"
                >
                  Reset Default
                </button>
              )}
            </div>

            {/* Preview image */}
            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={settings.category_image || "/discover-shell-necklace.jpg"}
                alt="Current Category Banner"
                style={{
                  objectFit: (settings.category_image_fit as any) || "cover",
                  objectPosition: settings.category_image_position || "50% 50%",
                  transition: "object-position 0.15s ease",
                }}
                className="w-full h-full"
              />
              {!settings.category_image && (
                <div className="absolute bottom-2 left-2 bg-black/65 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                  Default: /discover-shell-necklace.jpg
                </div>
              )}

              {uploadingCategory && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Interactive Alignment & Crop Toolbar */}
            <ImageFrameAlignmentControls
              fit={settings.category_image_fit || "cover"}
              position={settings.category_image_position || "50% 50%"}
              onChange={(newFit, newPos) => {
                handleUpdateSettingLocal("category_image_fit", newFit);
                handleUpdateSettingLocal("category_image_position", newPos);
              }}
              onSave={() => handleSaveAlignment("category_image")}
              isSaving={savingAlignmentKey === "category_image"}
            />

            {/* Upload Button */}
            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload New Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCategoryImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Mid-Page Split Editorial Banner 1 (Handbag Model) */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Mid-Page Burgundy Split Banner
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Full-bleed left image displayed next to the #310C13 burgundy panel after Explore Products.
                </p>
              </div>
              {settings.editorial_showcase_1 && (
                <button
                  type="button"
                  onClick={() => handleResetSetting("editorial_showcase_1", "Mid-Page Burgundy Split Banner")}
                  className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer flex-shrink-0"
                >
                  Reset Default
                </button>
              )}
            </div>

            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={settings.editorial_showcase_1 || "/discover-bag-model.jpg"}
                alt="Mid-Page Editorial Banner"
                style={{
                  objectFit: (settings.editorial_showcase_1_fit as any) || "cover",
                  objectPosition: settings.editorial_showcase_1_position || "50% 50%",
                  transition: "object-position 0.15s ease",
                }}
                className="w-full h-full"
              />
              {!settings.editorial_showcase_1 && (
                <div className="absolute bottom-2 left-2 bg-black/65 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                  Default: /discover-bag-model.jpg
                </div>
              )}

              {uploadingEditorial1 && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Interactive Alignment & Crop Toolbar */}
            <ImageFrameAlignmentControls
              fit={settings.editorial_showcase_1_fit || "cover"}
              position={settings.editorial_showcase_1_position || "50% 50%"}
              onChange={(newFit, newPos) => {
                handleUpdateSettingLocal("editorial_showcase_1_fit", newFit);
                handleUpdateSettingLocal("editorial_showcase_1_position", newPos);
              }}
              onSave={() => handleSaveAlignment("editorial_showcase_1")}
              isSaving={savingAlignmentKey === "editorial_showcase_1"}
            />

            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload Split Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditorial1Upload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Bottom Editorial Banner 2 (Bridal Heels & Bouquet) */}
          <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  Bottom Cream Editorial Banner
                </h2>
                <p className="text-[10px] text-neutral-400 mt-0.5">
                  Right-column editorial image displayed in the second cream section above Follow Us On Instagram.
                </p>
              </div>
              {settings.editorial_showcase_2 && (
                <button
                  type="button"
                  onClick={() => handleResetSetting("editorial_showcase_2", "Bottom Cream Editorial Banner")}
                  className="text-[10px] text-red-600 hover:underline font-semibold cursor-pointer flex-shrink-0"
                >
                  Reset Default
                </button>
              )}
            </div>

            <div className="relative aspect-video w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center">
              <img
                src={settings.editorial_showcase_2 || "/discover-bridal-heels.jpg"}
                alt="Bottom Editorial Banner"
                style={{
                  objectFit: (settings.editorial_showcase_2_fit as any) || "cover",
                  objectPosition: settings.editorial_showcase_2_position || "50% 50%",
                  transition: "object-position 0.15s ease",
                }}
                className="w-full h-full"
              />
              {!settings.editorial_showcase_2 && (
                <div className="absolute bottom-2 left-2 bg-black/65 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-xs">
                  Default: /discover-bridal-heels.jpg
                </div>
              )}

              {uploadingEditorial2 && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                </div>
              )}
            </div>

            {/* Interactive Alignment & Crop Toolbar */}
            <ImageFrameAlignmentControls
              fit={settings.editorial_showcase_2_fit || "cover"}
              position={settings.editorial_showcase_2_position || "50% 50%"}
              onChange={(newFit, newPos) => {
                handleUpdateSettingLocal("editorial_showcase_2_fit", newFit);
                handleUpdateSettingLocal("editorial_showcase_2_position", newPos);
              }}
              onSave={() => handleSaveAlignment("editorial_showcase_2")}
              isSaving={savingAlignmentKey === "editorial_showcase_2"}
            />

            <div className="flex items-center justify-end">
              <label className="flex items-center space-x-2 px-5 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Upload Editorial Banner</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleEditorial2Upload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

        </div>

        {/* Promo Announcement Popup Configurator Card */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#C99213]" />
              <span>Promo / Announcement Popup Modal</span>
            </h2>
            <p className="text-[10px] text-neutral-400 mt-0.5">
              Configure a premium modal dialog overlay containing specific ads or announcements that pops up in the storefront center on page reload.
            </p>
          </div>

          <form onSubmit={handleSavePromoSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Inputs (Left) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Toggle switch */}
              <div className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-[#E5E5E5] rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-neutral-800 block">Enable Announcement Popup</span>
                  <span className="text-[9px] text-neutral-400 block">Control whether the ad modal is displayed to visitors.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={promoPopupEnabled}
                    onChange={(e) => setPromoPopupEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C99213]" />
                </label>
              </div>

              {/* Title input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  Popup Title
                </label>
                <input
                  type="text"
                  value={promoPopupTitle}
                  onChange={(e) => setPromoPopupTitle(e.target.value)}
                  placeholder="e.g. Exclusive Festive Sale!"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800"
                />
              </div>

              {/* Description input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  Announcement Details / Description
                </label>
                <textarea
                  value={promoPopupDescription}
                  onChange={(e) => setPromoPopupDescription(e.target.value)}
                  placeholder="e.g. Discover our latest curated heritage jewelry with up to 10% off for new customers."
                  rows={4}
                  className="w-full p-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800 resize-none"
                />
              </div>

              {/* Redirect link input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                  CTA Redirect Action Link (Optional)
                </label>
                <input
                  type="text"
                  value={promoPopupLink}
                  onChange={(e) => setPromoPopupLink(e.target.value)}
                  placeholder="e.g. /shop?category=necklaces"
                  className="w-full h-11 px-4 border border-[#E5E5E5] rounded-xl text-xs bg-white focus:outline-none focus:border-[#C99213] text-neutral-800"
                />
              </div>
            </div>

            {/* Image Preview & Upload (Right) */}
            <div className="lg:col-span-5 space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block">
                Announcement Image / Banner
              </label>

              {/* Preview image */}
              <div className="relative aspect-[4/3] w-full bg-[#FAF9F6] border border-neutral-200 rounded-xl overflow-hidden flex items-center justify-center group">
                {promoPopupImage ? (
                  <>
                    <img
                      src={promoPopupImage}
                      alt="Promo Popup Banner"
                      style={{
                        objectFit: (settings.promo_popup_image_fit as any) || "cover",
                        objectPosition: settings.promo_popup_image_position || "50% 50%",
                        transition: "object-position 0.15s ease",
                      }}
                      className="w-full h-full"
                    />
                    {/* Clear overlay button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => setPromoPopupImage("")}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center space-y-1.5 text-neutral-400 p-4 text-center">
                    <ImageIcon className="w-8 h-8 opacity-70" />
                    <span className="text-[11px] font-semibold">No Custom Banner set</span>
                    <span className="text-[9px] opacity-75">Popup will load as a compact text announcement.</span>
                  </div>
                )}

                {uploadingPromoImage && (
                  <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-[#C99213] animate-spin" />
                  </div>
                )}
              </div>

              {promoPopupImage && (
                <ImageFrameAlignmentControls
                  fit={settings.promo_popup_image_fit || "cover"}
                  position={settings.promo_popup_image_position || "50% 50%"}
                  onChange={(newFit, newPos) => {
                    handleUpdateSettingLocal("promo_popup_image_fit", newFit);
                    handleUpdateSettingLocal("promo_popup_image_position", newPos);
                  }}
                  onSave={() => handleSaveAlignment("promo_popup_image")}
                  isSaving={savingAlignmentKey === "promo_popup_image"}
                />
              )}

              {/* Upload block trigger */}
              <div className="flex flex-wrap justify-between items-center gap-2">
                <span className="text-[9px] text-neutral-400">Supported formats: JPG, PNG, WebP.</span>
                <label className="flex items-center space-x-2 px-4 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePromoImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Bottom Actions block */}
            <div className="col-span-full border-t border-neutral-100 pt-5 flex flex-col sm:flex-row justify-end">
              <button
                type="submit"
                disabled={savingPromo}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer disabled:opacity-50 shadow-sm w-full sm:w-auto"
              >
                {savingPromo ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>Save Popup Configuration</span>
              </button>
            </div>
          </form>
        </div>

        {/* Video Reels Section */}
        <div className="bg-white border border-[#E5E5E5] rounded-[16px] shadow-sm p-4 sm:p-6 space-y-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-neutral-100 pb-5">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-800">
                Instagram Reels & Video Showcase
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Display your Instagram reels and vertical showcase videos in the auto-scrolling homepage marquee.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Option 1: Upload Video File Button */}
              <button
                type="button"
                onClick={() => {
                  setReelAddMode("upload");
                  setShowAddReelPanel(showAddReelPanel && reelAddMode === "upload" ? false : true);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs ${
                  showAddReelPanel && reelAddMode === "upload"
                    ? "bg-[#C99213] text-white ring-2 ring-[#C99213]/20"
                    : "bg-neutral-900 hover:bg-neutral-850 text-white"
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-[#C99213]" />
                <span>Upload Video File</span>
              </button>

              {/* Option 2: Paste Reel Link Button */}
              <button
                type="button"
                onClick={() => {
                  setReelAddMode("link");
                  setShowAddReelPanel(showAddReelPanel && reelAddMode === "link" ? false : true);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-xs ${
                  showAddReelPanel && reelAddMode === "link"
                    ? "bg-[#C99213] text-white ring-2 ring-[#C99213]/20"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Paste Reel Link</span>
              </button>
            </div>
          </div>

          {/* Connected Instagram Account Profile URL */}
          <div className="bg-[#FAF9F5] border border-[#EADEBE] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-neutral-900 flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Brand Instagram Profile Link
              </span>
              <p className="text-[11px] text-neutral-500">
                When visitors click &quot;Follow Us On Instagram&quot; or reels without a custom link, they will be navigated to this page.
              </p>
            </div>

            <form onSubmit={handleSaveInstagramProfile} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="https://instagram.com/bridesberry or @bridesberry"
                value={instagramProfileUrl}
                onChange={(e) => setInstagramProfileUrl(e.target.value)}
                className="flex-1 md:w-72 px-3.5 py-2 bg-white border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#C99213] text-neutral-800"
              />
              <button
                type="submit"
                disabled={savingInstagramProfile}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {savingInstagramProfile ? "Saving..." : "Save Link"}
              </button>
            </form>
          </div>

          {/* Dual-Mode Add Reel Panel (Upload Video File or Paste Reel Link) */}
          {showAddReelPanel && (
            <div className="bg-neutral-50 border-2 border-dashed border-[#C99213]/50 rounded-xl p-4 sm:p-6 space-y-5 animate-in fade-in duration-200 shadow-xs">
              {/* Tabs Bar inside panel */}
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setReelAddMode("upload")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      reelAddMode === "upload"
                        ? "bg-[#C99213] text-white shadow-xs"
                        : "text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Option 1: Upload Video File</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReelAddMode("link")}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      reelAddMode === "link"
                        ? "bg-[#C99213] text-white shadow-xs"
                        : "text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Option 2: Paste Reel Link</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddReelPanel(false)}
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer"
                  title="Close panel"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mode A: Upload Video File Form */}
              {reelAddMode === "upload" && (
                <form onSubmit={handleUploadAndSaveReel} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5">
                      Select Video File *
                    </label>
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-300 hover:border-[#C99213] rounded-xl bg-white transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setSelectedUploadFile(file);
                        }}
                        className="hidden"
                      />
                      {selectedUploadFile ? (
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <Check className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-800 truncate max-w-sm">
                              {selectedUploadFile.name}
                            </p>
                            <p className="text-[11px] text-neutral-500">
                              {(selectedUploadFile.size / (1024 * 1024)).toFixed(1)} MB • Click to change file
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2 text-center">
                          <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-amber-50 text-neutral-500 group-hover:text-[#C99213] flex items-center justify-center transition-colors">
                            <Video className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-neutral-800">
                              Click or drag to choose vertical video file
                            </p>
                            <p className="text-[11px] text-neutral-400 mt-0.5">
                              Supports MP4, WebM, MOV. Recommended: 9:16 vertical ratio (e.g. 1080×1920)
                            </p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Instagram Reel / Post URL when clicked (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.instagram.com/reel/C_xxxxxx/ or your Instagram profile"
                      value={uploadDestinationLink}
                      onChange={(e) => setUploadDestinationLink(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#C99213] text-neutral-800 placeholder-neutral-400"
                    />
                    <p className="text-[10px] text-neutral-400 mt-1">
                      When customers click this uploaded video on your website, they will be redirected to this Instagram link.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddReelPanel(false)}
                      className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploadingReel || !selectedUploadFile}
                      className="flex items-center space-x-2 px-6 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {uploadingReel ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Uploading Video...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          <span>Upload & Add Reel</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Mode B: Paste Reel Link Form */}
              {reelAddMode === "link" && (
                <form onSubmit={handleAddLinkReel} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Instagram Reel URL or Video Link *
                      </label>
                      <input
                        type="url"
                        required
                        placeholder="https://www.instagram.com/reel/C_xxxxxx/ or https://.../video.mp4"
                        value={pastedReelUrl}
                        onChange={(e) => setPastedReelUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#C99213] text-neutral-800 placeholder-neutral-400"
                      />
                      <p className="text-[10px] text-neutral-400 mt-1">
                        Paste any Instagram Reel link. Clicking it on your storefront opens the reel on Instagram!
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        Click Destination Link (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="Defaults to the reel link or Instagram profile"
                        value={pastedLinkUrl}
                        onChange={(e) => setPastedLinkUrl(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-xs outline-none focus:border-[#C99213] text-neutral-800 placeholder-neutral-400"
                      />
                      <p className="text-[10px] text-neutral-400 mt-1">
                        Leave blank to automatically redirect directly to the Instagram reel.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddReelPanel(false)}
                      className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={addingLink}
                      className="flex items-center space-x-1.5 px-6 py-2.5 bg-[#C99213] hover:bg-[#a9831e] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      {addingLink ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>Add Reel by Link</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Reels Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {reels.map((reel, idx) => {
              const reelData = getReelData(reel);
              const isIg = isInstagramUrl(reelData.url);
              const shortcode = extractInstagramShortcode(reelData.url);
              const targetLink = reelData.linkUrl || (isIg ? reelData.url : instagramProfileUrl) || "https://instagram.com";

              return (
                <div
                  key={idx}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Media Content: Instagram Embed or Video */}
                  {isIg && shortcode ? (
                    <div className="w-full h-full relative overflow-hidden bg-[#180a0d]">
                      <iframe
                        src={`https://www.instagram.com/reel/${shortcode}/embed/`}
                        className="w-full h-full object-cover pointer-events-none scale-105 border-0"
                        scrolling="no"
                        title={`Instagram Reel ${idx + 1}`}
                      />
                      {/* Top Badge */}
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white text-[9px] font-bold shadow-xs flex items-center gap-1">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                        </svg>
                        IG Reel
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full relative bg-neutral-900">
                      <video
                        src={getReelSource(reelData.url)}
                        className="w-full h-full object-cover"
                        controls={false}
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/60 text-neutral-300 text-[9px] font-semibold backdrop-blur-xs">
                        Video File
                      </div>
                    </div>
                  )}

                  {/* Overlay hover details with Test Link & Delete */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 z-20">
                    <div className="flex items-center justify-between">
                      {targetLink && targetLink !== "#" ? (
                        <a
                          href={targetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors cursor-pointer"
                          title="Open Instagram Link in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : <span />}

                      <button
                        type="button"
                        onClick={() => handleDeleteReel(idx)}
                        className="p-1.5 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                        title="Delete reel"
                        aria-label="Delete reel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] text-white font-bold block truncate">
                        Reel #{idx + 1}
                      </span>
                      <span className="text-[8px] text-white/70 font-mono block truncate">
                        {isIg && shortcode ? `IG: #${shortcode}` : reelData.url.split("/").pop()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {reels.length === 0 && (
              <div className="col-span-full py-12 text-center text-xs text-neutral-400 font-medium bg-neutral-50 rounded-xl border border-dashed border-neutral-200">
                <p>No custom reels configured yet.</p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Click <strong>&quot;Paste Reel Link&quot;</strong> to add any Instagram Reel link, or <strong>&quot;Upload Video Reel&quot;</strong> to upload an MP4/WebM file.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
