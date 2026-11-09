export declare enum SortOption {
    FEATURED = "featured",
    NEWEST = "newest",
    PRICE_ASC = "price_asc",
    PRICE_DESC = "price_desc",
    RATING_DESC = "rating_desc"
}
export declare class GetProductsQueryDto {
    category?: string;
    collection?: string;
    minPrice?: number;
    maxPrice?: number;
    occasion?: string;
    gender?: string;
    inStock?: boolean;
    search?: string;
    sort?: SortOption;
    page?: number;
    limit?: number;
    newArrival?: boolean;
    bestSeller?: boolean;
    featured?: boolean;
}
