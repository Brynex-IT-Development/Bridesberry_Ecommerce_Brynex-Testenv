"use client";

import React from "react";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import NewProductForm from "@/components/admin/products/NewProductForm";

export default function AddProductPage() {
  const breadcrumbs = [
    { label: "Products", href: "/admin/products" },
    { label: "Add Product" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFA]">
      {/* Header bar */}
      <AdminTopbar breadcrumbItems={breadcrumbs} showSearch={false} />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto min-w-0">
        <NewProductForm />
      </div>
    </div>
  );
}
