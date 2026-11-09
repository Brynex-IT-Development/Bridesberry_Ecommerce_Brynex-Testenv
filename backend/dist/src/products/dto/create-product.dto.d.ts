import { ProductImageRole } from '../../generated/prisma/client.js';
export declare class CreateProductImageDto {
    url: string;
    altText?: string;
    isPrimary: boolean;
    imageRole?: ProductImageRole;
    sortOrder: number;
}
export declare class CreateProductVariantDto {
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
    initialStock?: number;
}
export declare class CreateProductDto {
    name: string;
    sku: string;
    slug: string;
    shortDescription?: string;
    description?: string;
    sellingPrice: number;
    mrp: number;
    costPrice?: number;
    categoryId: string;
    status: string;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    showOnHomepage?: boolean;
    trackInventory?: boolean;
    initialStock?: number;
    minStock?: number;
    occasion?: string;
    gender?: string;
    material?: string;
    collection?: string;
    images: CreateProductImageDto[];
    variants: CreateProductVariantDto[];
}
