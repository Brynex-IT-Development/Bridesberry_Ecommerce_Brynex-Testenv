import { CreateProductImageDto } from './create-product.dto';
export declare class UpdateProductVariantDto {
    id?: string;
    name: string;
    sku: string;
    sellingPrice?: number;
    isActive: boolean;
    initialStock?: number;
}
export declare class UpdateProductDto {
    name?: string;
    sku?: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    sellingPrice?: number;
    mrp?: number;
    costPrice?: number;
    categoryId?: string;
    status?: string;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    showOnHomepage?: boolean;
    occasion?: string;
    gender?: string;
    material?: string | null;
    collection?: string | null;
    images?: CreateProductImageDto[];
    variants?: UpdateProductVariantDto[];
}
