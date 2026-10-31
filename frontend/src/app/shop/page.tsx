'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProductsPaginated, getFilterMetadata, getProductCollections, FilterMetadata } from '../../services/products.service';
import { Product } from '../../types/product';
import ProductGrid from '../../components/product/ProductGrid';
import FilterSidebar from '../../components/shop/FilterSidebar';
import SortDropdown from '../../components/shop/SortDropdown';

function ShopContent() {
  const router = useRouter();
  const activeSearchParams = useSearchParams();

  // Read current filter values directly from the URL
  const selectedCategory = activeSearchParams.get('category') || '';
  const selectedCollection = activeSearchParams.get('collection') || '';
  const selectedGender = activeSearchParams.get('gender') || '';
  const selectedOccasion = activeSearchParams.get('occasion') || '';
  const stockParam = activeSearchParams.get('inStock');
  const selectedStock = stockParam === 'true' ? 'in' : stockParam === 'false' ? 'out' : '';
  const sortBy = activeSearchParams.get('sort') || 'featured';
  const urlSearch = activeSearchParams.get('q') || '';
  const urlMaxPrice = activeSearchParams.get('maxPrice');
  const currentPage = Math.max(1, parseInt(activeSearchParams.get('page') || '1', 10) || 1);

  // Local state for UI feedback, slider, and search typing
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [metadata, setMetadata] = useState<FilterMetadata>({
    categories: [],
    collections: [],
    price: { min: 0, max: 250000 },
    occasions: [],
    genders: [],
    purities: [],
    brands: [],
    availability: { inStock: 0, outOfStock: 0 },
  });

  const minPriceBound = metadata.price?.min ?? 0;
  const maxPriceBound = metadata.price?.max ?? 250000;

  const [priceRange, setPriceRange] = useState<number[]>([0, 250000]);
  const [searchQuery, setSearchQuery] = useState(urlSearch);

  // Sync search input if URL changes externally (e.g. back/forward navigation)
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  // Load filter metadata once on mount
  useEffect(() => {
    getFilterMetadata().then(async (meta) => {
      let finalMeta = meta;
      if (!finalMeta.collections || finalMeta.collections.length === 0) {
        try {
          const colNames = await getProductCollections();
          if (colNames && colNames.length > 0) {
            finalMeta = {
              ...finalMeta,
              collections: colNames.map((name) => ({ value: name, count: 0 })),
            };
          }
        } catch {
          // Ignore fallback error
        }
      }
      setMetadata(finalMeta);
      if (finalMeta.price?.max) {
        const initialMax = urlMaxPrice ? Number(urlMaxPrice) : finalMeta.price.max;
        setPriceRange([finalMeta.price.min, initialMax]);
      }
    });
  }, [urlMaxPrice]);

  // URL updater: updates search parameters without causing loops
  const updateUrlFilters = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(activeSearchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === '' ||
          (key === 'page' && value === '1') ||
          (key === 'sort' && value === 'featured')
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const newQuery = params.toString();
      const newUrl = newQuery ? `/shop?${newQuery}` : '/shop';
      router.replace(newUrl, { scroll: false });
    },
    [activeSearchParams, router]
  );

  // Debounced search sync to URL
  useEffect(() => {
    if (searchQuery.trim() === urlSearch) return;
    const timer = setTimeout(() => {
      updateUrlFilters({ q: searchQuery.trim() || null, page: null });
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, urlSearch, updateUrlFilters]);

  // Debounced price range sync to URL
  useEffect(() => {
    if (!metadata.price?.max) return;
    const currentMaxInUrl = urlMaxPrice ? Number(urlMaxPrice) : metadata.price.max;
    if (priceRange[1] === currentMaxInUrl) return;

    const timer = setTimeout(() => {
      updateUrlFilters({
        maxPrice: priceRange[1] < metadata.price.max ? String(priceRange[1]) : null,
        page: null,
      });
    }, 350);
    return () => clearTimeout(timer);
  }, [priceRange, metadata.price?.max, urlMaxPrice, updateUrlFilters]);

  // Fetch paginated products whenever URL filter parameters change
  useEffect(() => {
    let active = true;
    setLoading(true);

    const queryParams: Record<string, string | number | boolean> = {
      page: currentPage,
      limit: 12,
    };
    if (selectedCategory) queryParams.category = selectedCategory;
    if (selectedCollection) queryParams.collection = selectedCollection;
    if (selectedOccasion) queryParams.occasion = selectedOccasion;
    if (selectedGender) queryParams.gender = selectedGender;
    if (selectedStock) {
      queryParams.inStock = selectedStock === 'in';
    }
    if (urlMaxPrice) {
      queryParams.maxPrice = Number(urlMaxPrice);
    } else if (priceRange[1] < maxPriceBound) {
      queryParams.maxPrice = priceRange[1];
    }
    if (sortBy) queryParams.sort = sortBy;
    if (urlSearch) queryParams.search = urlSearch;

    getProductsPaginated(queryParams)
      .then((res) => {
        if (active) {
          setProductsList(res.products);
          setTotalPages(res.totalPages);
          setError(false);
        }
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [
    selectedCategory,
    selectedCollection,
    selectedOccasion,
    selectedGender,
    selectedStock,
    urlMaxPrice,
    priceRange,
    maxPriceBound,
    sortBy,
    urlSearch,
    currentPage,
  ]);

  // Filter change handlers
  const changeCategory = (cat: string) => {
    updateUrlFilters({ category: cat || null, page: null });
  };
  const changeCollection = (col: string) => {
    updateUrlFilters({ collection: col || null, page: null });
  };
  const changeOccasion = (occ: string) => {
    updateUrlFilters({ occasion: occ || null, page: null });
  };
  const changeGender = (gen: string) => {
    updateUrlFilters({ gender: gen || null, page: null });
  };
  const changeStock = (stock: string) => {
    const stockVal = stock === 'in' ? 'true' : stock === 'out' ? 'false' : null;
    updateUrlFilters({ inStock: stockVal, page: null });
  };
  const changePriceRange = (range: number[]) => {
    setPriceRange(range);
  };
  const changeSortBy = (sort: string) => {
    updateUrlFilters({ sort: sort || null, page: null });
  };
  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    updateUrlFilters({ page: newPage > 1 ? String(newPage) : null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveCollection = () => {
    updateUrlFilters({ collection: null, page: null });
  };

  const handleClearAll = () => {
    setSearchQuery('');
    if (metadata.price?.max) {
      setPriceRange([metadata.price.min, metadata.price.max]);
    }
    router.replace('/shop', { scroll: false });
  };

  return (
    <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-12">
      {/* Content wrapper */}
      <div className="w-full px-[6.5%] flex gap-8 xl:gap-12">
        {/* LEFT SIDEBAR — fixed narrow width, full-height sticky */}
        <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 border-r border-neutral-200 sticky top-28 self-start h-[calc(100vh-8rem)] overflow-y-auto pt-6 pr-8">
          <FilterSidebar
            metadata={metadata}
            selectedCategory={selectedCategory}
            setSelectedCategory={changeCategory}
            selectedCollection={selectedCollection}
            setSelectedCollection={changeCollection}
            selectedGender={selectedGender}
            setSelectedGender={changeGender}
            selectedOccasion={selectedOccasion}
            setSelectedOccasion={changeOccasion}
            selectedStock={selectedStock}
            setSelectedStock={changeStock}
            priceRange={priceRange}
            setPriceRange={changePriceRange}
            onClearAll={handleClearAll}
          />
        </aside>

        {/* RIGHT CONTENT — fills remaining width */}
        <main className="flex-1 min-w-0 lg:pl-4">
          {/* SHOP NOW heading row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 sm:pt-6 pb-4 sm:pb-5">
            <h1 className="font-raleway font-medium text-[24px] sm:text-[32px] leading-[100%] tracking-normal text-neutral-900 uppercase">
              Shop Now
            </h1>
            <div className="flex items-center gap-3 sm:gap-4">
              {urlSearch && (
                <div className="hidden sm:flex items-center gap-2 bg-neutral-100 px-3 py-1.5 rounded-full text-xs font-questrial text-neutral-600">
                  Search: &quot;{urlSearch}&quot;
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      updateUrlFilters({ q: null, page: null });
                    }}
                    className="hover:text-black font-bold ml-1"
                  >
                    ×
                  </button>
                </div>
              )}
              <SortDropdown sortBy={sortBy} setSortBy={changeSortBy} />
            </div>
          </div>

          {/* Active collection filter chip */}
          {selectedCollection && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-questrial text-neutral-500 uppercase tracking-wider">
                Collection:
              </span>
              <span className="inline-flex items-center gap-2 bg-[#fbf7ed] border border-[#e8dbb4] text-[#8c6a16] text-xs font-semibold pl-3 pr-2 py-1 rounded-full shadow-2xs">
                <span>{selectedCollection}</span>
                <button
                  type="button"
                  onClick={handleRemoveCollection}
                  className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#8c6a16]/15 hover:text-black font-bold text-sm leading-none cursor-pointer transition-colors"
                  title="Remove collection filter"
                  aria-label="Remove collection filter"
                >
                  ×
                </button>
              </span>
            </div>
          )}

          {/* Search bar inside content on mobile / desktop */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateUrlFilters({ q: searchQuery.trim() || null, page: null });
                }
              }}
              className="w-full max-w-md border border-neutral-300 px-4 py-2 text-sm font-questrial placeholder-neutral-400 focus:outline-none focus:border-neutral-800 transition-colors"
            />
          </div>

          {/* Mobile filter button */}
          <div className="flex lg:hidden pt-2 pb-4 justify-between items-center">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-[11px] uppercase tracking-widest text-neutral-700 font-questrial"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M3 4h18M7 12h10M11 20h2" />
              </svg>
              Filter
            </button>
            {urlSearch && (
              <span className="text-xs font-questrial text-neutral-500">
                Found {productsList.length} items
              </span>
            )}
          </div>

          {/* Product Grid */}
          <div className="px-0">
            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-800" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center font-questrial">
                <p className="text-red-500 mb-2 font-medium">Failed to load products.</p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Reset Page
                </button>
              </div>
            ) : productsList.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px] text-center font-questrial text-neutral-500">
                <p className="mb-4">No products found for the selected filters.</p>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 border border-neutral-800 text-neutral-800 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <ProductGrid products={productsList} />

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-6 mt-12 font-questrial">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => changePage(currentPage - 1)}
                      className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-widest text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-sm text-neutral-700 select-none">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => changePage(currentPage + 1)}
                      className="px-4 py-2 border border-neutral-300 text-xs uppercase tracking-widest text-neutral-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative flex flex-col w-full max-w-xs py-6 px-6 overflow-y-auto bg-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-neutral-800 font-questrial">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-400 hover:text-neutral-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              metadata={metadata}
              selectedCategory={selectedCategory}
              setSelectedCategory={changeCategory}
              selectedCollection={selectedCollection}
              setSelectedCollection={changeCollection}
              selectedGender={selectedGender}
              setSelectedGender={changeGender}
              selectedOccasion={selectedOccasion}
              setSelectedOccasion={changeOccasion}
              selectedStock={selectedStock}
              setSelectedStock={changeStock}
              priceRange={priceRange}
              setPriceRange={changePriceRange}
              onClearAll={() => {
                handleClearAll();
                setMobileFiltersOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white min-h-screen pt-24 sm:pt-28 pb-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neutral-800" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
