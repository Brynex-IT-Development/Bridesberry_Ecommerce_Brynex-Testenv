"use client";

import React, { use } from "react";
import Link from "next/link";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import NewProductForm from "@/components/admin/products/NewProductForm";
import { getAdminProductBySku } from "@/services/products.service";
import { AdminProductFormData } from "@/types/admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const [product, setProduct] = React.useState<AdminProductFormData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAdminProductBySku(id).then((res) => {
      setProduct(res || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500 font-questrial">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-xs font-semibold text-neutral-500 font-questrial">
        Product SKU not found. <Link href="/admin/products" className="text-[#C99213] underline">Go back</Link>
      </div>
    );
  }

  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: product.name, href: `/admin/products/${product.sku}` },
    { label: "Edit Product" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA]">
      {/* Header bar */}
      <AdminTopbar
        breadcrumbItems={breadcrumbs}
        showSearch={false}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto min-w-0">
        <NewProductForm initialData={product} mode="edit" />
      </div>
    </div>
  );
}
