import React, { useState, useRef, useEffect } from "react";
import { AdminCategory } from "@/types/admin";
import { uploadFile } from "@/services/media.service";
import { MAIN_CATEGORIES } from "@/data/categories";

interface CategoryFormProps {
  initialData?: AdminCategory | null;
  onSubmit: (data: Partial<AdminCategory>) => void;
  onCancel: () => void;
}

export default function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [parentCategory, setParentCategory] = useState(
    initialData?.parentCategory || "Jewellery"
  );
  const [selectedPresetSub, setSelectedPresetSub] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<"Active" | "Draft" | "Hidden">(initialData?.status || "Active");
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 1);
  const [imageUrl, setImageUrl] = useState(initialData?.image || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available subcategory presets for the selected parent category
  const currentParentObj = MAIN_CATEGORIES.find(
    (c) =>
      c.name.toLowerCase() === parentCategory.toLowerCase() ||
      c.id.toLowerCase() === parentCategory.toLowerCase()
  );
  const availablePresets = currentParentObj ? currentParentObj.subCategories : [];

  // When editing or when parent changes:
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setSlug(initialData.slug || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "Active");
      setDisplayOrder(initialData.displayOrder ?? 1);
      setImageUrl(initialData.image || "");
      
      const parent = initialData.parentCategory || "Jewellery";
      setParentCategory(parent);
      
      const matched = availablePresets.find(
        (p) => p.name.toLowerCase() === initialData.name.toLowerCase() || p.slug === initialData.slug
      );
      if (matched) {
        setSelectedPresetSub(matched.name);
        setIsCustom(false);
      } else {
        setSelectedPresetSub("__custom__");
        setIsCustom(true);
      }
    } else {
      if (availablePresets.length > 0) {
        setSelectedPresetSub(availablePresets[0].name);
        setName(availablePresets[0].name);
        setSlug(availablePresets[0].slug);
        setIsCustom(false);
      } else {
        setSelectedPresetSub("__custom__");
        setIsCustom(true);
      }
    }
  }, [initialData, parentCategory]);

  const handleSubSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPresetSub(val);
    if (val === "__custom__") {
      setIsCustom(true);
      setName("");
      setSlug("");
    } else {
      setIsCustom(false);
      setName(val);
      const matched = availablePresets.find((p) => p.name === val);
      if (matched) {
        setSlug(matched.slug);
      } else {
        setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, ""));
      }
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    // Auto slugify if not custom
    setSlug(val.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, ""));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploading(true);
      setError("");
      try {
        const url = await uploadFile(file, "categories");
        setImageUrl(url);
      } catch (err: any) {
        setError(err.message || "Failed to upload image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    if (!slug.trim()) {
      setError("Category slug is required");
      return;
    }

    onSubmit({
      id: initialData?.id,
      name,
      slug,
      parentCategory,
      description,
      status,
      displayOrder: Number(displayOrder),
      image: imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 shadow-sm space-y-4">
      <div className="border-b border-neutral-100 pb-3 flex justify-between items-center">
        <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-800 font-sans">
          {initialData ? "Edit Category" : "Add Category"}
        </h2>
        {initialData && (
          <span className="text-[10px] text-neutral-400 font-mono">({initialData.id})</span>
        )}
      </div>

      {error && <p className="text-[10px] text-red-500 font-medium">{error}</p>}

      {/* Category (Parent Main Category) */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Category *
        </label>
        <select
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
          className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850 font-semibold"
        >
          <option value="Jewellery">Jewellery</option>
          <option value="Bridal Footwear">Bridal Footwear</option>
          <option value="Bridal Clutches">Bridal Clutches</option>
        </select>
        <span className="text-[10px] text-neutral-400">
          Select the main store category.
        </span>
      </div>

      {/* Sub Category Dropdown */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Sub Category *
        </label>
        <select
          value={selectedPresetSub}
          onChange={handleSubSelectChange}
          className="px-3 py-2 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
        >
          {availablePresets.map((sub) => (
            <option key={sub.id} value={sub.name}>
              {sub.name}
            </option>
          ))}
          <option value="__custom__">+ Create Custom Sub Category...</option>
        </select>
      </div>

      {/* If Custom is selected, show custom name input */}
      {isCustom && (
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-[#C99213] uppercase tracking-wider">
            Custom Sub Category Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. Bangles, Maang Tikka, Kolhapuris..."
            autoFocus
            className="px-3 py-2 border border-[#C99213] rounded text-xs outline-none focus:ring-1 focus:ring-[#C99213] text-neutral-850"
          />
        </div>
      )}

      {/* Slug */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Slug *
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. earrings"
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col space-y-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Description
        </label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Category catalog description..."
          className="px-3 py-2 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "Active" | "Draft" | "Hidden")}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs bg-white outline-none focus:border-[#C99213] text-neutral-850"
          >
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Hidden">Hidden</option>
          </select>
        </div>

        {/* Display Order */}
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Display Order
          </label>
          <input
            type="number"
            min={0}
            value={displayOrder === 0 ? "" : displayOrder}
            placeholder="0"
            onChange={(e) => {
              const val = e.target.value;
              setDisplayOrder(val === "" ? 0 : Number.parseInt(val, 10) || 0);
            }}
            className="px-3 py-1.5 border border-neutral-200 rounded text-xs outline-none focus:border-[#C99213] text-neutral-850"
          />
        </div>
      </div>

      {/* Category Image Banner */}
      <div className="flex flex-col space-y-1 pt-1">
        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
          Category Image Banner
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="h-24 rounded border-2 border-dashed border-neutral-250 bg-neutral-50 hover:bg-neutral-100 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden text-neutral-400"
        >
          {uploading ? (
            <div className="flex flex-col items-center space-y-1">
              <span className="inline-block border-2 border-t-transparent border-neutral-400 rounded-full h-4 w-4 animate-spin"></span>
              <span className="text-[9px] uppercase tracking-wider font-semibold">Uploading...</span>
            </div>
          ) : imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt="Category preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] uppercase tracking-widest font-bold">
                Change Image
              </div>
            </>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Click to upload preview image
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 border border-neutral-300 rounded-full text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-1.5 bg-neutral-900 text-white rounded-full text-xs font-semibold hover:bg-neutral-800 cursor-pointer"
        >
          Save
        </button>
      </div>
    </form>
  );
}
