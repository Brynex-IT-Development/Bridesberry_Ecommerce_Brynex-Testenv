import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav className="flex items-center text-xs font-medium tracking-wide overflow-hidden min-w-0 shrink">
      <Link href="/admin/dashboard" className="text-[#C99213] hover:underline font-semibold whitespace-nowrap shrink-0">
        Brides Berry
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center min-w-0 shrink truncate">
          <span className="mx-1 sm:mx-1.5 text-neutral-400 font-light shrink-0">&gt;</span>
          {item.href ? (
            <Link
              href={item.href}
              className="text-neutral-400 hover:text-neutral-600 transition-colors truncate max-w-[70px] sm:max-w-xs md:max-w-none"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-500 font-normal truncate max-w-[85px] sm:max-w-xs md:max-w-none">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
