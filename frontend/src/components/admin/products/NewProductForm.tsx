"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Upload, X, Loader2, Sparkles, Check, ChevronDown, Plus, Trash2 } from "lucide-react";
import { AdminCategory, AdminProductFormData, AdminProductMedia, AdminProductVariant } from "@/types/admin";
import { createProduct, updateProduct } from "@/services/products.service";
import { getAdminCategories, createCategory } from "@/services/categories.service";
import { uploadFile } from "@/services/media.service";

interface VariantRow {
  optionName: string;
  values: string; // Comma separated
}

interface ImageSlot {
  role: "PRIMARY" | "HOVER" | "GALLERY_1" | "GALLERY_2";
  label: string;
  sublabel: string;
  url?: string;
  file?: File;
  previewUrl?: string;
}

interface NewProductFormProps {
  initialData?: AdminProductFormData;
  mode?: "create" | "edit";
}

export default function NewProductForm({ initialData, mode = "create" }: NewProductFormProps = {}) {
  const router = useRouter();

  // Basic Form State
  const [productName, setProductName] = useState(initialData?.name || "");
  const [mainCategory, setMainCategory] = useState(initialData?.mainCategory || "Jewellery");
  const [categoryId, setCategoryId] = useState(initialData?.category || "");
  const [sellingPrice, setSellingPrice] = useState(initialData?.sellingPrice || "");
  const [mrp, setMrp] = useState(initialData?.mrp || "");
  const [stockQuantity, setStockQuantity] = useState(
    initialData?.initialStock !== undefined ? String(initialData.initialStock) : ""
  );
  const [shortDescription, setShortDescription] = useState(
    initialData?.shortDescription || initialData?.description || ""
  );

  // Initialize image slots from initialData if available
  const getInitialSlots = (): ImageSlot[] => {
    const slots: ImageSlot[] = [
      { role: "PRIMARY", label: "Upload Primary Image", sublabel: "JPG, PNG (Max 10 MB)" },
      { role: "HOVER", label: "Hover", sublabel: "(Optional)" },
      { role: "GALLERY_1", label: "Gallery", sublabel: "(Optional)" },
      { role: "GALLERY_2", label: "Gallery", sublabel: "(Optional)" },
    ];

    if (initialData?.media && initialData.media.length > 0) {
      const primary = initialData.media.find((m: AdminProductMedia) => m.isPrimary || m.imageRole === "PRIMARY");
      const hover = initialData.media.find((m: AdminProductMedia) => m.imageRole === "HOVER");
      const galleries = initialData.media.filter(
        (m: AdminProductMedia) => m !== primary && m !== hover && (m.imageRole === "GALLERY" || !m.imageRole)
      );

      if (primary?.url) slots[0].url = primary.url;
      if (hover?.url) slots[1].url = hover.url;
      if (galleries[0]?.url) slots[2].url = galleries[0].url;
      if (galleries[1]?.url) slots[3].url = galleries[1].url;
    }

    return slots;
  };

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>(getInitialSlots);

  // Variant Rows
  const getInitialVariants = (): VariantRow[] => {
    if (initialData?.variants && initialData.variants.length > 0) {
      // Group variants if any
      const vals = initialData.variants.map((v: AdminProductVariant) => v.name.replace(/^[A-Za-z]+:\s*/, "")).join(", ");
      return [{ optionName: "Size", values: vals }];
    }
    return [{ optionName: "Size", values: "" }];
  };

  const [variantRows, setVariantRows] = useState<VariantRow[]>(getInitialVariants);

  // Publishing Toggles
  const [showOnHomepage, setShowOnHomepage] = useState(initialData?.showOnHomepage ?? false);
  const [featuredProduct, setFeaturedProduct] = useState(initialData?.isFeatured ?? false);
  const [newArrival, setNewArrival] = useState(initialData?.isNewArrival ?? true);

  // Categories list
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Submission State & Feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hidden file inputs
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    getAdminCategories()
      .then((data) => {
        const activeCats = data.filter((c) => c.status === "Active");
        setCategories(activeCats);
        setCategoriesLoading(false);

        // If editing, deduce initial main category from existing categoryId/category slug
        if (initialData?.category) {
          const matched = activeCats.find(
            (c) => c.id === initialData.category || c.slug === initialData.category
          );
          if (matched) {
            setCategoryId(matched.id);
            const parent =
              matched.parentCategory ||
              (matched.name.toLowerCase().includes("clutch") || matched.slug.includes("clutch")
                ? "Bridal Clutches"
                : matched.name.toLowerCase().includes("footwear") || matched.slug.includes("footwear") || matched.slug.includes("heel")
                ? "Bridal Footwear"
                : "Jewellery");
            setMainCategory(parent);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
        setCategoriesLoading(false);
      });
  }, [initialData?.category]);

  // Compute Discount
  const mrpNum = parseFloat(mrp) || 0;
  const sellNum = parseFloat(sellingPrice) || 0;
  const discountPercent =
    mrpNum > sellNum && sellNum > 0
      ? Math.round(((mrpNum - sellNum) / mrpNum) * 100)
      : 0;

  // Filter subcategories matching the selected Main Category
  const getCategoryParent = (c: AdminCategory) => {
    if (c.parentCategory) return c.parentCategory;
    const name = (c.name || "").toLowerCase();
    const slug = (c.slug || "").toLowerCase();
    if (name.includes("clutch") || slug.includes("clutch") || name.includes("potli") || slug.includes("potli") || name.includes("bag") || slug.includes("bag")) {
      return "Bridal Clutches";
    }
    if (name.includes("footwear") || slug.includes("footwear") || name.includes("footware") || slug.includes("footware") || name.includes("heel") || slug.includes("heel") || name.includes("sandal") || slug.includes("sandal")) {
      return "Bridal Footwear";
    }
    return "Jewellery";
  };

  const filteredSubCategories = categories.filter((c) => {
    return getCategoryParent(c) === mainCategory;
  });

  // Selected Category Object
  const selectedCatObj = categories.find((c) => c.id === categoryId);

  // Handle File Selection
  const handleFileChange = (index: number, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImageSlots((prev) => {
      const copy = [...prev];
      copy[index] = {
        ...copy[index],
        file,
        previewUrl,
        url: undefined,
      };
      return copy;
    });
  };

  const handleRemoveImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setImageSlots((prev) => {
      const copy = [...prev];
      if (copy[index].previewUrl) {
        URL.revokeObjectURL(copy[index].previewUrl!);
      }
      copy[index] = {
        ...copy[index],
        file: undefined,
        previewUrl: undefined,
        url: undefined,
      };
      return copy;
    });
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
  };

  // Add / Remove Variant Row
  const handleAddVariantRow = () => {
    setVariantRows((prev) => [...prev, { optionName: "Color", values: "" }]);
  };

  const handleRemoveVariantRow = (index: number) => {
    setVariantRows((prev) => prev.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index: number, field: "optionName" | "values", val: string) => {
    setVariantRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  // Generate clean slug from name
  const generateSlug = (name: string) => {
    const base = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
    const rand = Math.random().toString(36).substring(2, 6);
    return `${base || "product"}-${rand}`;
  };

  // Generate clean SKU
  const generateSku = (name: string) => {
    const prefix = (name.replace(/[^A-Za-z]/g, "").substring(0, 3) || "BB").toUpperCase();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${rand}`;
  };

  // Save / Publish
  const handleSave = async (status: "Draft" | "Active") => {
    setErrorMessage(null);

    // Validation
    if (!productName.trim()) {
      setErrorMessage("Please enter a Product Name.");
      return;
    }
    if (!categoryId) {
      setErrorMessage("Please select a Category.");
      return;
    }
    if (!sellingPrice || sellNum <= 0) {
      setErrorMessage("Please enter a valid Selling Price.");
      return;
    }
    if (!mrp || mrpNum <= 0) {
      setErrorMessage("Please enter a valid MRP.");
      return;
    }
    if (sellNum > mrpNum) {
      setErrorMessage("Selling price cannot be greater than MRP.");
      return;
    }

    const hasPrimary = imageSlots[0].file || imageSlots[0].url;
    if (!hasPrimary) {
      setErrorMessage("Please upload at least a Primary Image.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Upload files
      const uploadedImages: {
        url: string;
        isPrimary: boolean;
        imageRole: "PRIMARY" | "HOVER" | "GALLERY";
        sortOrder: number;
      }[] = [];

      for (let i = 0; i < imageSlots.length; i++) {
        const slot = imageSlots[i];
        let finalUrl = slot.url;

        if (slot.file) {
          finalUrl = await uploadFile(slot.file, "products/images");
        }

        if (finalUrl) {
          const role: "PRIMARY" | "HOVER" | "GALLERY" =
            slot.role === "PRIMARY"
              ? "PRIMARY"
              : slot.role === "HOVER"
              ? "HOVER"
              : "GALLERY";

          uploadedImages.push({
            url: finalUrl,
            isPrimary: slot.role === "PRIMARY",
            imageRole: role,
            sortOrder: i + 1,
          });
        }
      }

      // 2. Prepare Variants payload
      const variantsPayload: {
        name: string;
        sku: string;
        sellingPrice?: number;
        isActive: boolean;
        initialStock?: number;
      }[] = [];

      const baseSku = generateSku(productName);

      variantRows.forEach((row, rIdx) => {
        const splitVals = row.values
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);

        splitVals.forEach((val, vIdx) => {
          variantsPayload.push({
            name: `${row.optionName}: ${val}`,
            sku: `${baseSku}-${row.optionName.substring(0, 2).toUpperCase()}-${vIdx + 1}`,
            sellingPrice: sellNum,
            isActive: true,
            initialStock: Math.max(1, Math.floor((parseInt(stockQuantity, 10) || 10) / splitVals.length)),
          });
        });
      });

      // 3. Assemble complete payload
      const slug = initialData?.slug || generateSlug(productName);
      const stock = parseInt(stockQuantity, 10) || 10;
      const effectiveCategoryId = categoryId;

      const payload = {
        name: productName.trim(),
        sku: initialData?.sku || baseSku,
        slug,
        shortDescription: shortDescription.trim() || undefined,
        description: shortDescription.trim() || undefined,
        sellingPrice: sellNum,
        mrp: mrpNum,
        categoryId: effectiveCategoryId,
        status: status === "Active" ? "ACTIVE" : "DRAFT",
        featured: featuredProduct,
        newArrival: newArrival,
        bestSeller: false,
        showOnHomepage,
        occasion: initialData?.occasion || "Everyday",
        gender: initialData?.gender || "Unisex",
        trackInventory: true,
        initialStock: stock,
        minStock: 2,
        images: uploadedImages,
        variants: variantsPayload,
      };

      if (mode === "edit" && initialData?.id) {
        await updateProduct(initialData.id, payload);
        setToastMessage(`Product "${productName}" updated successfully!`);
      } else {
        await createProduct(payload);
        setToastMessage(`Product successfully ${status === "Active" ? "published" : "saved as draft"}!`);
      }

      setTimeout(() => {
        router.push("/admin/products");
      }, 1200);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to create product.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview active image
  const primaryDisplayImage = imageSlots[0].previewUrl || imageSlots[0].url || "/placeholder.png";
  const allFilledThumbnails = imageSlots
    .map((s) => s.previewUrl || s.url)
    .filter(Boolean) as string[];

  return (
    <div className="w-full pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-2xl px-6 py-3.5 text-xs font-semibold flex items-center space-x-2.5 animate-bounce">
          <Check className="w-4 h-4 text-[#C99213]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1
            style={{ fontFamily: "'Raleway', sans-serif" }}
            className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight"
          >
            {mode === "edit" ? "Edit Product" : "Add Product"}
          </h1>
          <p className="text-xs text-neutral-450 mt-1 font-questrial">
            {mode === "edit"
              ? `Modify details, pricing, media, and variants for ${productName || "product"}`
              : "Quickly add products to Brides Berry"}
          </p>
        </div>

        {/* Action Buttons: Save as Draft | Publish Product */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave("Draft")}
            className="px-6 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-300 rounded-lg text-xs font-medium font-questrial transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave("Active")}
            className="px-6 py-2.5 bg-[#C99213] hover:bg-[#b07e0c] text-white rounded-lg text-xs font-medium font-questrial transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{mode === "edit" ? "Save Changes" : "Publish Product"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-medium flex items-center justify-between">
          <span>{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-rose-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Left Form (7 cols) + Right Live Preview (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ============================================================== */}
        {/* LEFT COLUMN: FORM CARDS                                       */}
        {/* ============================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. BASIC DETAILS CARD */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-5">
            <div className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
                Basic Details
              </h2>
              <span className="text-[10px] text-neutral-400 font-questrial">
                SKU, Slug and SEO are Auto Generated
              </span>
            </div>

            {/* Row 1: Product Name, Main Category & Sub Category */}
            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rose Gold Pearl Necklace"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={mainCategory}
                      onChange={(e) => {
                        const nextMain = e.target.value;
                        setMainCategory(nextMain);
                        // Auto-select first matching subcategory
                        const matching = categories.filter((c) => getCategoryParent(c) === nextMain);
                        setCategoryId(matching[0]?.id || "");
                      }}
                      className="w-full px-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 bg-white focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all appearance-none cursor-pointer pr-10 font-semibold"
                    >
                      <option value="Jewellery">Jewellery</option>
                      <option value="Bridal Footwear">Bridal Footwear</option>
                      <option value="Bridal Clutches">Bridal Clutches</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                    Sub Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      disabled={categoriesLoading}
                      className="w-full px-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 bg-white focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all appearance-none cursor-pointer pr-10"
                    >
                      <option value="">Select Sub Category</option>
                      {filteredSubCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Selling Price & MRP */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                  Selling Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-questrial">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="e.g. 5500"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                  MRP <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 text-xs font-questrial">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="e.g. 5500"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Stock Quantity & Short Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="e.g. 10"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-neutral-700 block mb-1.5 font-questrial">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Embrace timeless elegance with the Elara Pearl Em..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] focus:ring-1 focus:ring-[#C99213] transition-all bg-white"
                />
              </div>
            </div>

            {/* Product Images 4-Slot Grid */}
            <div className="pt-2">
              <label className="text-[11px] font-medium text-neutral-700 block mb-2 font-questrial">
                Product Images <span className="text-red-500">*</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageSlots.map((slot, index) => {
                  const displayImg = slot.previewUrl || slot.url;

                  return (
                    <div
                      key={slot.role}
                      onClick={() => fileInputRefs.current[index]?.click()}
                      className={`relative aspect-[1/1.05] rounded-xl border flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-all overflow-hidden ${
                        displayImg
                          ? "border-neutral-300 bg-neutral-50"
                          : index === 0
                          ? "border-dashed border-[#E3B341] bg-[#FFFBF0] hover:bg-[#FFF6DC]"
                          : "border-dashed border-neutral-250 bg-neutral-50/60 hover:bg-neutral-100/60"
                      }`}
                    >
                      <input
                        type="file"
                        ref={(el) => {
                          fileInputRefs.current[index] = el;
                        }}
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                        accept="image/png, image/jpeg, image/webp"
                        className="hidden"
                      />

                      {displayImg ? (
                        <>
                          <Image
                            src={displayImg}
                            alt={slot.label}
                            fill
                            sizes="140px"
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => handleRemoveImage(index, e)}
                            className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white flex items-center justify-center transition-colors shadow-sm"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 backdrop-blur-2xs py-0.5 px-1.5 rounded text-[9px] text-white font-questrial text-center truncate pointer-events-none">
                            {slot.label}
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1.5 pointer-events-none">
                          <div
                            className={`w-9 h-9 rounded-lg mx-auto flex items-center justify-center ${
                              index === 0
                                ? "bg-[#F7E7BD] text-[#8C6A16]"
                                : "bg-neutral-200/70 text-neutral-500"
                            }`}
                          >
                            <Upload className="w-4 h-4" />
                          </div>
                          <p
                            className={`text-[11px] font-semibold leading-tight ${
                              index === 0 ? "text-[#8C6A16]" : "text-neutral-700"
                            }`}
                          >
                            {slot.label}
                          </p>
                          <p className="text-[9px] text-neutral-400 font-questrial">
                            {slot.sublabel}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. OPTIONAL VARIANTS CARD */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-2xs space-y-4">
            <div className="border-b border-neutral-100 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
                Optional Variants
              </h2>
              <p className="text-[10px] text-neutral-400 font-questrial mt-0.5">
                Use only for footwear, bangles, bracelets , or color options
              </p>
            </div>

            <div className="space-y-3">
              {variantRows.map((row, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4">
                    <label className="text-[10px] font-medium text-neutral-600 block mb-1 font-questrial">
                      Option Name
                    </label>
                    <div className="relative">
                      <select
                        value={row.optionName}
                        onChange={(e) => handleVariantChange(index, "optionName", e.target.value)}
                        className="w-full px-3 py-2 border border-neutral-250 rounded-lg text-xs text-neutral-800 bg-white focus:outline-none focus:border-[#C99213] transition-all appearance-none cursor-pointer pr-8"
                      >
                        <option value="Size">Size</option>
                        <option value="Color">Color</option>
                        <option value="Bangle Size">Bangle Size</option>
                        <option value="Length">Length</option>
                        <option value="Material">Material</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="sm:col-span-7">
                    <label className="text-[10px] font-medium text-neutral-600 block mb-1 font-questrial">
                      Values (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 36, 38, 40"
                      value={row.values}
                      onChange={(e) => handleVariantChange(index, "values", e.target.value)}
                      className="w-full px-3 py-2 border border-neutral-250 rounded-lg text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#C99213] transition-all bg-white"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-center pb-1">
                    {variantRows.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariantRow(index)}
                        className="text-neutral-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer"
                        title="Remove option"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddVariantRow}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 rounded-lg text-xs font-questrial transition-colors cursor-pointer bg-white"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Variant Option</span>
            </button>
          </div>

          {/* 3. PUBLISHING TOGGLES CARD */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-7 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-900 font-sans">
                Publishing
              </h2>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                {/* Show on Homepage */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setShowOnHomepage(!showOnHomepage)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-250 ${
                      showOnHomepage ? "bg-[#C99213]" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-250 ${
                        showOnHomepage ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-questrial text-neutral-700">Show on Homepage</span>
                </label>

                {/* Featured Product */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setFeaturedProduct(!featuredProduct)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-250 ${
                      featuredProduct ? "bg-[#C99213]" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-250 ${
                        featuredProduct ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-questrial text-neutral-700">Featured Product</span>
                </label>

                {/* New Arrival */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div
                    onClick={() => setNewArrival(!newArrival)}
                    className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-250 ${
                      newArrival ? "bg-[#C99213]" : "bg-neutral-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-250 ${
                        newArrival ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-questrial text-neutral-700">New Arrival</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: LIVE CUSTOMER CATALOG PREVIEW                    */}
        {/* ============================================================== */}
        <div className="lg:col-span-5 sticky top-6">
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header banner */}
            <div className="bg-[#1C1B19] text-white text-[10px] font-bold uppercase tracking-widest py-2 px-4 text-center">
              Live Customer Catalog Preview
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Main Photo Gallery */}
              <div className="relative aspect-[1/1.05] w-full bg-[#FAF9F6] rounded-xl overflow-hidden border border-neutral-150">
                {imageSlots[0].previewUrl || imageSlots[0].url ? (
                  <Image
                    src={primaryDisplayImage}
                    alt={productName || "Product Preview"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 font-questrial space-y-2 p-6 text-center">
                    <Upload className="w-8 h-8 text-neutral-300" />
                    <span className="text-xs">Primary product image will appear here</span>
                  </div>
                )}
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => {
                  const thumb = imageSlots[i].previewUrl || imageSlots[i].url;
                  return (
                    <div
                      key={i}
                      className="relative aspect-square rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200/80"
                    >
                      {thumb ? (
                        <Image src={thumb} alt={`Thumb ${i + 1}`} fill sizes="80px" className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-neutral-300 font-questrial">
                          {i === 0 ? "Main" : `Slot ${i + 1}`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Product Title */}
              <div className="pt-2">
                <h3
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                  className="text-lg sm:text-xl font-medium text-neutral-900 leading-snug"
                >
                  {productName || "Multi-Layered Necklace Stack for Women"}
                </h3>
              </div>

              {/* Price & Discount Bar */}
              <div className="flex items-baseline gap-2.5 pt-0.5">
                <span
                  style={{ fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif" }}
                  className="text-lg font-bold text-neutral-900"
                >
                  ₹ {(sellNum || 2399).toLocaleString("en-IN")}
                </span>

                {mrpNum > 0 && (
                  <span className="text-xs text-neutral-400 line-through font-questrial">
                    MRP : ₹ {mrpNum.toLocaleString("en-IN")}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-rose-600 font-questrial">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Action Buttons Mockup */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  className="w-full py-3 border border-neutral-300 text-neutral-800 rounded-sm text-[11px] font-medium uppercase tracking-wider font-questrial flex items-center justify-center gap-1.5 bg-white pointer-events-none"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  className="w-full py-3 bg-[#310C13] text-white rounded-sm text-[11px] font-medium uppercase tracking-wider font-questrial flex items-center justify-center pointer-events-none"
                >
                  Buy It Now
                </button>
              </div>

              {/* Description Preview */}
              <div className="pt-2 space-y-1">
                <span className="text-[11px] font-semibold text-neutral-900 font-sans block">
                  Description
                </span>
                <p className="text-xs text-neutral-500 font-questrial leading-relaxed">
                  {shortDescription ||
                    "Elevate your style with this elegant multi-layered necklace stack, designed to create a chic layered look effortlessly. Featuring delicate chains and a polished finish, it's the perfect accessory for both everyday wear and special occasions."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

