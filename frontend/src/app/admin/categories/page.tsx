"use client";

import React, { useState, useEffect } from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import AdminStatCard from "@/components/admin/shared/AdminStatCard";
import CategoryTable from "@/components/admin/categories/CategoryTable";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import Image from "next/image";
import { uploadFile } from "@/services/media.service";
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categories.service";
import { getSystemSettings, saveSystemSetting } from "@/services/system-settings.service";
import { AdminCategory } from "@/types/admin";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Main Category inline edit modal state
  const [editingMainCat, setEditingMainCat] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
  } | null>(null);
  const [mainCatCustomDetails, setMainCatCustomDetails] = useState<
    Record<string, { name: string; description: string; image: string }>
  >({});
  const [isSavingMainCat, setIsSavingMainCat] = useState(false);

  useEffect(() => {
    getAdminCategories().then(setCategories);
    getSystemSettings().then((settings) => {
      if (settings?.main_category_customizations) {
        try {
          const parsed = JSON.parse(settings.main_category_customizations);
          if (parsed && typeof parsed === "object") {
            setMainCatCustomDetails(parsed);
          }
        } catch (e) {
          console.error("Failed to parse main_category_customizations:", e);
        }
      }
    });
  }, []);

  const breadcrumbs = [{ label: "Dashboard", href: "/admin/dashboard" }, { label: "Categories" }];

  // Helper to get parent category of any subcategory
  const getParentCategory = (cat: AdminCategory) => {
    if (cat.parentCategory) return cat.parentCategory;
    const sName = (cat.name || "").toLowerCase();
    const sSlug = (cat.slug || "").toLowerCase();
    if (sName.includes("clutch") || sSlug.includes("clutch") || sName.includes("potli") || sSlug.includes("bag")) {
      return "Bridal Clutches";
    }
    if (sName.includes("footwear") || sSlug.includes("footwear") || sName.includes("footware") || sSlug.includes("footware") || sName.includes("heel") || sSlug.includes("heel")) {
      return "Bridal Footwear";
    }
    return "Jewellery";
  };

  // Calculations for stats
  const totalMainCategories = 3; // Bridal Clutches, Bridal Footwear, Jewellery
  const totalSubCategories = categories.length;
  const activeSubCategories = categories.filter((c) => c.status === "Active").length;
  const totalProductsAssigned = categories.reduce((sum, c) => sum + c.productCount, 0);

  // Group categories under the 3 Main Categories
  const mainCategoriesSummary = [
    {
      id: "jewellery",
      name: mainCatCustomDetails["jewellery"]?.name || "Jewellery",
      slug: "jewellery",
      description:
        mainCatCustomDetails["jewellery"]?.description ||
        "Heirloom bridal earrings, necklaces, bangles, pendants, and rings.",
      image: mainCatCustomDetails["jewellery"]?.image || "/cat-earrings.jpg",
      subCategories: categories.filter((c) => getParentCategory(c) === "Jewellery"),
    },
    {
      id: "bridal-footwear",
      name: mainCatCustomDetails["bridal-footwear"]?.name || "Bridal Footwear",
      slug: "footwear",
      description:
        mainCatCustomDetails["bridal-footwear"]?.description ||
        "Orthopedic-cushioned heels, sandals, and celebratory wedding footwear.",
      image: mainCatCustomDetails["bridal-footwear"]?.image || "/cat-footwear.jpg",
      subCategories: categories.filter((c) => getParentCategory(c) === "Bridal Footwear"),
    },
    {
      id: "bridal-clutches",
      name: mainCatCustomDetails["bridal-clutches"]?.name || "Bridal Clutches",
      slug: "clutches",
      description:
        mainCatCustomDetails["bridal-clutches"]?.description ||
        "Handcrafted bridal clutches, embroidered potlis, and royal evening bags.",
      image: mainCatCustomDetails["bridal-clutches"]?.image || "/discover-bag-model.jpg",
      subCategories: categories.filter((c) => getParentCategory(c) === "Bridal Clutches"),
    },
  ];

  const currentMainObj = selectedMainCategory
    ? mainCategoriesSummary.find((m) => m.name === selectedMainCategory)
    : null;

  const filteredCategories = categories.filter((cat) => {
    if (selectedMainCategory && getParentCategory(cat) !== selectedMainCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q) ||
        cat.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshCategories = () => {
    getAdminCategories().then(setCategories);
  };

  const handleFormSubmit = async (data: Partial<AdminCategory>) => {
    try {
      if (data.id) {
        await updateCategory(data.id, data);
        showToast(`Category "${data.name}" updated successfully!`);
      } else {
        await createCategory(data as Omit<AdminCategory, "id" | "productCount">);
        showToast(`Category "${data.name}" created successfully!`);
      }
      refreshCategories();
      setIsFormOpen(false);
      setEditingCategory(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      showToast(`Error: ${msg}`);
      throw err;
    }
  };

  const handleEditClick = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setIsFormOpen(true);
  };

  const handleToggleStatus = async (id: string) => {
    const cat = categories.find((c) => c.id === id);
    if (!cat) return;
    const nextStatus = cat.status === "Active" ? "Hidden" : "Active";
    try {
      await updateCategory(id, { status: nextStatus });
      showToast(`Category "${cat.name}" marked as ${nextStatus}!`);
      refreshCategories();
    } catch (err) {
      showToast(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  const handleDelete = async (id: string) => {
    const name = categories.find((c) => c.id === id)?.name;
    try {
      await deleteCategory(id);
      showToast(`Category "${name || id}" deleted successfully!`);
      refreshCategories();
    } catch (err) {
      showToast(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
    if (editingCategory?.id === id) {
      setIsFormOpen(false);
      setEditingCategory(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#1C1B19] text-white border border-[#C99213] rounded-lg shadow-xl px-5 py-3 text-xs font-semibold flex items-center space-x-2 animate-bounce">
          <svg className="w-4 h-4 text-[#C99213]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
        
        {/* Title and Top actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-wider text-neutral-900 uppercase font-sans">
              CATEGORIES
            </h1>
            <p className="text-[11px] text-neutral-450 mt-1 font-medium">
              Manage product categories used across the customer website
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            {/* Search filter input inside body */}
            <div className="relative flex-1 sm:flex-none">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-450" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-9 pr-4 py-2 border border-neutral-200 rounded-full bg-white text-xs outline-none focus:border-[#C99213] transition-all text-neutral-850 placeholder-neutral-400"
              />
            </div>

            <button
              onClick={() => {
                setEditingCategory(null);
                setIsFormOpen(true);
              }}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-850 text-white rounded-full text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0"
            >
              <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Stats cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminStatCard
            title="MAIN CATEGORIES"
            value="3"
            subNote="Jewellery • Footwear • Clutches"
            icon={
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
          />
          <AdminStatCard
            title="TOTAL SUB CATEGORIES"
            value={totalSubCategories.toString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
          />
          <AdminStatCard
            title="ACTIVE SUB CATEGORIES"
            value={activeSubCategories.toString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <AdminStatCard
            title="ASSIGNED PRODUCTS"
            value={totalProductsAssigned.toLocaleString()}
            subNote=""
            icon={
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            }
          />
        </div>

        {/* Top Level Categories Table View */}
        {!selectedMainCategory ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-sans">
                  Categories List
                </h2>
                <p className="text-xs text-neutral-450 mt-0.5 font-questrial">
                  Click on any category to view its subcategories and manage them
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1E1D1B] text-white text-[10px] font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold">Category</th>
                      <th className="py-4 px-6 font-semibold">Slug</th>
                      <th className="py-4 px-6 font-semibold text-center">Sub Categories</th>
                      <th className="py-4 px-6 font-semibold text-center">Assigned Products</th>
                      <th className="py-4 px-6 font-semibold">Status</th>
                      <th className="py-4 px-6 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 text-xs">
                    {mainCategoriesSummary.map((m) => {
                      const subCount = m.subCategories.length;
                      const prodCount = m.subCategories.reduce((s, c) => s + c.productCount, 0);

                      return (
                        <tr
                          key={m.id}
                          className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                          onClick={() => {
                            setSelectedMainCategory(m.name);
                            setIsFormOpen(false);
                            setEditingCategory(null);
                          }}
                        >
                          {/* Category Name & Image & Description */}
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3.5">
                              <div className="relative w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-200">
                                {m.image ? (
                                  <Image
                                    src={m.image}
                                    alt={m.name}
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-400">
                                    No img
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-neutral-900 group-hover:text-[#C99213] transition-colors text-sm">
                                  {m.name}
                                </span>
                                <span className="text-[11px] text-neutral-450 line-clamp-1 font-questrial mt-0.5">
                                  {m.description}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Slug */}
                          <td className="py-4 px-6 font-mono text-neutral-500 text-xs">
                            {m.slug}
                          </td>

                          {/* Sub Categories count */}
                          <td className="py-4 px-6 text-center">
                            <span className="inline-block bg-[#FCFAF5] border border-[#E8DBB4] text-[#8C6A16] px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                              {subCount} Sub Categories
                            </span>
                          </td>

                          {/* Product Count */}
                          <td className="py-4 px-6 text-center text-neutral-700 font-semibold text-xs">
                            {prodCount}
                          </td>

                          {/* Status */}
                          <td className="py-4 px-6">
                            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase">
                              Active
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingMainCat({
                                  id: m.id,
                                  name: m.name,
                                  description: m.description,
                                  image: m.image,
                                });
                              }}
                              className="text-[#C99213] hover:text-[#a9831e] font-semibold cursor-pointer text-xs"
                            >
                              Edit Category
                            </button>
                            <span className="text-neutral-300">|</span>
                            <span className="text-neutral-800 font-semibold text-xs group-hover:text-[#C99213] inline-flex items-center gap-1">
                              View Sub Categories →
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Category Form Modal for Top-Level Add/Edit Category */}
            {isFormOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-questrial"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingCategory(null);
                }}
              >
                <div
                  className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative border border-neutral-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-sans">
                      {editingCategory ? "Edit Category" : "Add New Category"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setIsFormOpen(false);
                        setEditingCategory(null);
                      }}
                      className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <CategoryForm
                    initialData={
                      editingCategory || {
                        id: "",
                        parentCategory: "Jewellery",
                        name: "",
                        slug: "",
                        description: "",
                        status: "Active",
                        displayOrder: 1,
                        productCount: 0,
                      }
                    }
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setEditingCategory(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* When a category is clicked, show its internal subcategories list and management */
          <div className="space-y-5">
            {/* Breadcrumb / Back button bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-neutral-200 rounded-xl px-5 py-4 shadow-2xs">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    setSelectedMainCategory(null);
                    setIsFormOpen(false);
                    setEditingCategory(null);
                  }}
                  className="text-xs font-bold text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 cursor-pointer bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>←</span>
                  <span>All Categories</span>
                </button>
                <span className="text-neutral-300">/</span>
                <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-sans">
                  {selectedMainCategory}
                </span>
                <span className="text-[10px] bg-[#C99213]/10 text-[#8C6A16] px-2.5 py-0.5 rounded-full font-semibold">
                  {filteredCategories.length} Sub Categories
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const currentObj = mainCategoriesSummary.find(
                      (m) => m.name === selectedMainCategory
                    );
                    if (currentObj) {
                      setEditingMainCat({
                        id: currentObj.id,
                        name: currentObj.name,
                        description: currentObj.description,
                        image: currentObj.image,
                      });
                    }
                  }}
                  className="px-3.5 py-2 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Edit Category Details
                </button>
                <button
                  onClick={() => {
                    setEditingCategory(null);
                    setIsFormOpen(true);
                  }}
                  className="flex items-center justify-center space-x-1.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-850 text-white rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  <span className="text-[#C99213] font-bold text-sm leading-none">+</span>
                  <span>Add Sub Category</span>
                </button>
              </div>
            </div>

            {/* Split layout inside the selected category */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className={`${isFormOpen ? "lg:col-span-2" : "lg:col-span-3"} bg-white border border-[#E5E5E5] rounded-xl shadow-sm overflow-hidden flex flex-col`}>
                <CategoryTable
                  categories={filteredCategories}
                  onEdit={handleEditClick}
                  onToggleStatus={handleToggleStatus}
                  onDelete={handleDelete}
                />
              </div>

              {isFormOpen && (
                <div className="lg:col-span-1">
                  <CategoryForm
                    initialData={
                      editingCategory || {
                        id: "",
                        parentCategory: selectedMainCategory,
                        name: "",
                        slug: "",
                        description: "",
                        status: "Active",
                        displayOrder: 1,
                        productCount: 0,
                      }
                    }
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                      setIsFormOpen(false);
                      setEditingCategory(null);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Main Category Modal */}
        {editingMainCat && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 font-questrial"
            role="dialog"
            aria-modal="true"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 font-sans">
                  Edit Category: {editingMainCat.name}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingMainCat(null)}
                  className="text-neutral-400 hover:text-neutral-800 text-base"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={editingMainCat.name}
                    onChange={(e) =>
                      setEditingMainCat({ ...editingMainCat, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-250 rounded-lg text-xs outline-none focus:border-[#C99213]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={editingMainCat.description}
                    onChange={(e) =>
                      setEditingMainCat({ ...editingMainCat, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-250 rounded-lg text-xs outline-none focus:border-[#C99213]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
                    Category Banner Image
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 rounded-lg bg-neutral-100 overflow-hidden border border-neutral-200 flex-shrink-0">
                      {editingMainCat.image ? (
                        <Image
                          src={editingMainCat.image}
                          alt="Category Banner"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[9px] text-neutral-400">
                          No img
                        </div>
                      )}
                    </div>
                    <label className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg text-xs font-semibold cursor-pointer border border-neutral-300">
                      <span>Change Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await uploadFile(file, "categories");
                              setEditingMainCat({ ...editingMainCat, image: url });
                            } catch (err) {
                              console.error("Failed to upload category image:", err);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  disabled={isSavingMainCat}
                  onClick={() => setEditingMainCat(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-50 cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSavingMainCat}
                  onClick={async () => {
                    if (!editingMainCat) return;
                    setIsSavingMainCat(true);
                    const updated = {
                      ...mainCatCustomDetails,
                      [editingMainCat.id]: {
                        name: editingMainCat.name,
                        description: editingMainCat.description,
                        image: editingMainCat.image,
                      },
                    };
                    setMainCatCustomDetails(updated);

                    try {
                      await saveSystemSetting(
                        "main_category_customizations",
                        JSON.stringify(updated)
                      );
                      showToast(`Category "${editingMainCat.name}" updated and saved successfully!`);
                    } catch (err) {
                      console.error("Failed to save category customization setting:", err);
                      showToast(`Updated locally, but failed to save to server: ${err instanceof Error ? err.message : "Error"}`);
                    } finally {
                      setIsSavingMainCat(false);
                      setEditingMainCat(null);
                    }
                  }}
                  className="px-5 py-2 bg-[#C99213] hover:bg-[#b07e0c] text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSavingMainCat ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
