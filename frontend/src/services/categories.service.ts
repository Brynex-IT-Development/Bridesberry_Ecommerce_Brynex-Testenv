import { Category } from "@/types/category";
import { AdminCategory } from "@/types/admin";
import { apiFetch } from "@/services/api";

interface BackendAdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
}

function mapAdminCategory(category: BackendAdminCategory): AdminCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    image: category.image ?? undefined,
    status: category.isActive ? "Active" : "Hidden",
    productCount: category.productCount ?? 0,
    displayOrder: category.sortOrder ?? 0,
  };
}

function mapAdminCategoryPayload(
  payload: Partial<AdminCategory>,
): Record<string, unknown> {
  const { displayOrder, status, ...category } = payload;
  return {
    ...category,
    ...(displayOrder !== undefined ? { sortOrder: displayOrder } : {}),
    ...(status !== undefined ? { isActive: status === "Active" } : {}),
  };
}

// ----- Public storefront -----
export async function getCategories(): Promise<Category[]> {
  try {
    const data = await apiFetch<BackendAdminCategory[]>("/api/categories", {
      cache: "no-store",
    });
    return (data ?? [])
      .map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image ?? "",
        count: category.productCount ?? 0,
        sortOrder: category.sortOrder ?? 0,
      }))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch {
    return [];
  }
}

// ----- Admin CRUD -----
export async function getAdminCategories(): Promise<AdminCategory[]> {
  try {
    const data = await apiFetch<BackendAdminCategory[]>("/api/categories/admin");
    return (data ?? []).map(mapAdminCategory);
  } catch {
    return [];
  }
}

export async function createCategory(
  payload: Omit<AdminCategory, "id" | "productCount">
): Promise<AdminCategory> {
  const category = await apiFetch<BackendAdminCategory>("/api/categories", {
    method: "POST",
    body: JSON.stringify(mapAdminCategoryPayload(payload)),
  });
  return mapAdminCategory(category);
}

export async function updateCategory(
  id: string,
  payload: Partial<AdminCategory>
): Promise<AdminCategory> {
  const category = await apiFetch<BackendAdminCategory>(`/api/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(mapAdminCategoryPayload(payload)),
  });
  return mapAdminCategory(category);
}

export async function deleteCategory(id: string): Promise<void> {
  await apiFetch<void>(`/api/categories/${id}`, { method: "DELETE" });
}
