"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ProductsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let ProductsService = ProductsService_1 = class ProductsService {
    prisma;
    logger = new common_1.Logger(ProductsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    mapStatus(status) {
        const s = status.toUpperCase();
        if (s === 'ACTIVE')
            return client_js_1.ProductStatus.ACTIVE;
        if (s === 'ARCHIVED')
            return client_js_1.ProductStatus.ARCHIVED;
        return client_js_1.ProductStatus.DRAFT;
    }
    async findAll(query) {
        const where = {};
        if (!query.isAdmin) {
            where.status = client_js_1.ProductStatus.ACTIVE;
        }
        else if (query.status) {
            const statusMap = {
                Active: client_js_1.ProductStatus.ACTIVE,
                Draft: client_js_1.ProductStatus.DRAFT,
                Archived: client_js_1.ProductStatus.ARCHIVED,
                ACTIVE: client_js_1.ProductStatus.ACTIVE,
                DRAFT: client_js_1.ProductStatus.DRAFT,
                ARCHIVED: client_js_1.ProductStatus.ARCHIVED,
            };
            const mapped = statusMap[query.status];
            if (mapped) {
                where.status = mapped;
            }
            else {
                where.status = { not: client_js_1.ProductStatus.ARCHIVED };
            }
        }
        else {
            where.status = { not: client_js_1.ProductStatus.ARCHIVED };
        }
        if (query.category) {
            if (query.category.includes(',')) {
                const slugs = query.category.split(',').map((s) => s.trim()).filter(Boolean);
                where.category = {
                    slug: { in: slugs },
                };
            }
            else {
                where.category = {
                    slug: query.category,
                };
            }
        }
        if (query.collection) {
            where.collection = {
                equals: query.collection,
                mode: 'insensitive',
            };
        }
        if (query.minPrice !== undefined || query.maxPrice !== undefined) {
            const priceFilter = {};
            if (query.minPrice !== undefined) {
                priceFilter.gte = query.minPrice;
            }
            if (query.maxPrice !== undefined) {
                priceFilter.lte = query.maxPrice;
            }
            where.sellingPrice = priceFilter;
        }
        if (query.occasion) {
            where.occasion = {
                equals: query.occasion,
                mode: 'insensitive',
            };
        }
        if (query.gender) {
            where.gender = {
                equals: query.gender,
                mode: 'insensitive',
            };
        }
        if (query.inStock !== undefined) {
            if (query.inStock) {
                where.OR = [
                    {
                        inventory: {
                            currentStock: { gt: 0 },
                        },
                    },
                    {
                        variants: {
                            some: {
                                inventory: {
                                    currentStock: { gt: 0 },
                                },
                            },
                        },
                    },
                ];
            }
            else {
                where.inventory = {
                    currentStock: { lte: 0 },
                };
                where.variants = {
                    every: {
                        inventory: {
                            currentStock: { lte: 0 },
                        },
                    },
                };
            }
        }
        if (query.featured !== undefined) {
            where.featured = query.featured;
        }
        if (query.bestSeller !== undefined) {
            where.bestSeller = query.bestSeller;
        }
        if (query.newArrival !== undefined) {
            where.newArrival = query.newArrival;
        }
        if (query.search) {
            const searchConditions = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { sku: { contains: query.search, mode: 'insensitive' } },
                { description: { contains: query.search, mode: 'insensitive' } },
            ];
            if (where.OR) {
                where.AND = [{ OR: where.OR }, { OR: searchConditions }];
                delete where.OR;
            }
            else {
                where.OR = searchConditions;
            }
        }
        let orderBy = { createdAt: 'desc' };
        if (query.sort) {
            switch (query.sort) {
                case 'newest':
                    orderBy = { createdAt: 'desc' };
                    break;
                case 'price_asc':
                    orderBy = { sellingPrice: 'asc' };
                    break;
                case 'price_desc':
                    orderBy = { sellingPrice: 'desc' };
                    break;
                case 'rating_desc':
                    orderBy = { showOnHomepage: 'desc' };
                    break;
                case 'featured':
                default:
                    orderBy = { showOnHomepage: 'desc' };
                    break;
            }
        }
        const page = query.page && query.page > 0 ? query.page : 1;
        const limit = query.limit && query.limit > 0 ? query.limit : 12;
        const skip = (page - 1) * limit;
        const [products, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                include: {
                    images: {
                        orderBy: { sortOrder: 'asc' },
                    },
                    category: true,
                    variants: true,
                    inventory: true,
                },
                orderBy,
                skip: query.isAdmin ? undefined : skip,
                take: query.isAdmin ? undefined : limit,
            }),
            this.prisma.product.count({ where }),
        ]);
        if (query.isAdmin) {
            return products;
        }
        return {
            products,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findCollections(activeOnly = true) {
        const where = {
            collection: { not: null },
        };
        if (activeOnly) {
            where.status = client_js_1.ProductStatus.ACTIVE;
        }
        const products = await this.prisma.product.findMany({
            where,
            select: { collection: true },
            distinct: ['collection'],
            orderBy: { collection: 'asc' },
        });
        const collections = products
            .map((product) => product.collection?.trim())
            .filter((collection) => Boolean(collection));
        return [...new Set(collections)].sort((a, b) => a.localeCompare(b));
    }
    async getFilterMetadata() {
        const activeProducts = await this.prisma.product.findMany({
            where: {
                status: client_js_1.ProductStatus.ACTIVE,
            },
            include: {
                category: true,
                inventory: true,
                variants: {
                    include: {
                        inventory: true,
                    },
                },
            },
        });
        const categoryMap = new Map();
        for (const p of activeProducts) {
            if (p.category) {
                const cat = p.category;
                const existing = categoryMap.get(cat.id);
                if (existing) {
                    existing.count += 1;
                }
                else {
                    categoryMap.set(cat.id, {
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug,
                        count: 1,
                        sortOrder: cat.sortOrder,
                    });
                }
            }
        }
        const categories = Array.from(categoryMap.values())
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map(({ id, name, slug, count }) => ({ id, name, slug, count }));
        let minPrice = 0;
        let maxPrice = 0;
        if (activeProducts.length > 0) {
            const prices = activeProducts.map((p) => Number(p.sellingPrice));
            minPrice = Math.min(...prices);
            maxPrice = Math.max(...prices);
        }
        const occasionMap = new Map();
        for (const p of activeProducts) {
            if (p.occasion) {
                const val = p.occasion.trim();
                if (val) {
                    const normalized = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
                    occasionMap.set(normalized, (occasionMap.get(normalized) || 0) + 1);
                }
            }
        }
        const occasions = Array.from(occasionMap.entries()).map(([value, count]) => ({
            value,
            count,
        }));
        const genderMap = new Map();
        for (const p of activeProducts) {
            if (p.gender) {
                const val = p.gender.trim();
                if (val) {
                    const normalized = val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
                    genderMap.set(normalized, (genderMap.get(normalized) || 0) + 1);
                }
            }
        }
        const genders = Array.from(genderMap.entries()).map(([value, count]) => ({
            value,
            count,
        }));
        const collectionMap = new Map();
        for (const p of activeProducts) {
            if (p.collection) {
                const val = p.collection.trim();
                if (val) {
                    collectionMap.set(val, (collectionMap.get(val) || 0) + 1);
                }
            }
        }
        const collections = Array.from(collectionMap.entries())
            .map(([value, count]) => ({
            value,
            count,
        }))
            .sort((a, b) => a.value.localeCompare(b.value));
        const purities = [];
        const brands = [];
        let inStock = 0;
        let outOfStock = 0;
        for (const p of activeProducts) {
            const mainStock = p.inventory?.currentStock ?? 0;
            const variantStock = p.variants?.reduce((sum, v) => sum + (v.inventory?.currentStock ?? 0), 0) ?? 0;
            const totalStock = mainStock + variantStock;
            if (totalStock > 0) {
                inStock += 1;
            }
            else {
                outOfStock += 1;
            }
        }
        return {
            categories,
            collections,
            price: {
                min: minPrice,
                max: maxPrice,
            },
            occasions,
            genders,
            purities,
            brands,
            availability: {
                inStock,
                outOfStock,
            },
        };
    }
    async findOne(idOrSlug) {
        const product = await this.prisma.product.findFirst({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug },
                    { sku: idOrSlug },
                ],
            },
            include: {
                images: {
                    orderBy: { sortOrder: 'asc' },
                },
                category: true,
                variants: {
                    include: {
                        inventory: true,
                    },
                },
                inventory: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product ${idOrSlug} not found.`);
        }
        return product;
    }
    validateImageRoles(images) {
        if (!images || images.length === 0)
            return;
        let primaryCount = 0;
        let hoverCount = 0;
        for (const img of images) {
            if (img.imageRole === 'PRIMARY' || img.isPrimary) {
                primaryCount++;
            }
            if (img.imageRole === 'HOVER') {
                hoverCount++;
            }
        }
        if (primaryCount > 1) {
            throw new common_1.BadRequestException('A product can only have one PRIMARY image.');
        }
        if (hoverCount > 1) {
            throw new common_1.BadRequestException('A product can only have one HOVER image.');
        }
    }
    async create(dto, adminEmail) {
        const slug = dto.slug.toLowerCase().trim();
        const existingSlug = await this.prisma.product.findUnique({
            where: { slug },
        });
        if (existingSlug) {
            throw new common_1.BadRequestException('A product with this slug already exists.');
        }
        const existingSku = await this.prisma.product.findUnique({
            where: { sku: dto.sku },
        });
        if (existingSku) {
            throw new common_1.BadRequestException('A product with this SKU already exists.');
        }
        const status = this.mapStatus(dto.status);
        this.validateImageRoles(dto.images);
        return this.prisma.$transaction(async (tx) => {
            const product = await tx.product.create({
                data: {
                    name: dto.name,
                    slug,
                    sku: dto.sku,
                    shortDescription: dto.shortDescription,
                    description: dto.description,
                    sellingPrice: dto.sellingPrice,
                    mrp: dto.mrp,
                    costPrice: dto.costPrice,
                    status,
                    featured: dto.featured ?? false,
                    newArrival: dto.newArrival ?? false,
                    bestSeller: dto.bestSeller ?? false,
                    showOnHomepage: dto.showOnHomepage ?? false,
                    occasion: dto.occasion || 'Everyday',
                    gender: dto.gender || 'Unisex',
                    material: dto.material,
                    collection: dto.collection,
                    categoryId: dto.categoryId,
                    images: {
                        create: (dto.images || []).map((img) => ({
                            url: img.url,
                            altText: img.altText,
                            isPrimary: img.imageRole === 'PRIMARY',
                            imageRole: img.imageRole || client_js_1.ProductImageRole.GALLERY,
                            sortOrder: img.sortOrder,
                        })),
                    },
                },
            });
            const initialStock = dto.initialStock ?? 0;
            const minStock = dto.minStock ?? 0;
            if (dto.variants && dto.variants.length > 0) {
                for (const variantDto of dto.variants) {
                    const variant = await tx.productVariant.create({
                        data: {
                            productId: product.id,
                            name: variantDto.name,
                            sku: variantDto.sku,
                            sellingPrice: variantDto.sellingPrice ?? dto.sellingPrice,
                            isActive: variantDto.isActive ?? true,
                        },
                    });
                    const varInitialStock = variantDto.initialStock ?? initialStock;
                    await tx.inventory.create({
                        data: {
                            variantId: variant.id,
                            currentStock: varInitialStock,
                            minimumRequired: minStock,
                            reorderPoint: minStock * 2,
                        },
                    });
                    if (varInitialStock > 0) {
                        await tx.stockTransaction.create({
                            data: {
                                productId: product.id,
                                variantId: variant.id,
                                type: client_js_1.StockTransactionType.OPENING_STOCK,
                                quantity: varInitialStock,
                                beforeStock: 0,
                                afterStock: varInitialStock,
                                reason: 'Initial opening stock creation',
                                changedBy: adminEmail,
                            },
                        });
                    }
                }
            }
            else {
                await tx.inventory.create({
                    data: {
                        productId: product.id,
                        currentStock: initialStock,
                        minimumRequired: minStock,
                        reorderPoint: minStock * 2,
                    },
                });
                if (initialStock > 0) {
                    await tx.stockTransaction.create({
                        data: {
                            productId: product.id,
                            type: client_js_1.StockTransactionType.OPENING_STOCK,
                            quantity: initialStock,
                            beforeStock: 0,
                            afterStock: initialStock,
                            reason: 'Initial opening stock creation',
                            changedBy: adminEmail,
                        },
                    });
                }
            }
            return product;
        });
    }
    async update(id, dto) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { images: true, variants: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        this.validateImageRoles(dto.images);
        if (dto.slug) {
            const slug = dto.slug.toLowerCase().trim();
            if (slug !== product.slug) {
                const existing = await this.prisma.product.findUnique({
                    where: { slug },
                });
                if (existing) {
                    throw new common_1.BadRequestException('A product with this slug already exists.');
                }
                dto.slug = slug;
            }
        }
        const status = dto.status ? this.mapStatus(dto.status) : undefined;
        return this.prisma.$transaction(async (tx) => {
            if (dto.images) {
                const incomingUrls = dto.images.map((img) => img.url);
                const imagesToDelete = product.images.filter((ext) => !incomingUrls.includes(ext.url));
                if (imagesToDelete.length > 0) {
                    await tx.productImage.deleteMany({
                        where: {
                            id: { in: imagesToDelete.map((d) => d.id) },
                        },
                    });
                }
                for (const imgDto of dto.images) {
                    const matchingExisting = product.images.find((ext) => ext.url === imgDto.url);
                    const isPrimaryValue = imgDto.imageRole === 'PRIMARY';
                    const imageRoleValue = imgDto.imageRole || client_js_1.ProductImageRole.GALLERY;
                    if (matchingExisting) {
                        await tx.productImage.update({
                            where: { id: matchingExisting.id },
                            data: {
                                altText: imgDto.altText,
                                isPrimary: isPrimaryValue,
                                imageRole: imageRoleValue,
                                sortOrder: imgDto.sortOrder,
                            },
                        });
                    }
                    else {
                        await tx.productImage.create({
                            data: {
                                productId: id,
                                url: imgDto.url,
                                altText: imgDto.altText,
                                isPrimary: isPrimaryValue,
                                imageRole: imageRoleValue,
                                sortOrder: imgDto.sortOrder,
                            },
                        });
                    }
                }
            }
            if (dto.variants) {
                const variantIdsToKeep = [];
                const existingVariantIds = new Set(product.variants.map((v) => v.id));
                for (const varDto of dto.variants) {
                    if (varDto.id) {
                        if (!existingVariantIds.has(varDto.id)) {
                            throw new common_1.BadRequestException(`Variant ${varDto.id} does not belong to product ${id}.`);
                        }
                        const updatedVar = await tx.productVariant.update({
                            where: { id: varDto.id },
                            data: {
                                name: varDto.name,
                                sku: varDto.sku,
                                sellingPrice: varDto.sellingPrice,
                                isActive: varDto.isActive,
                            },
                        });
                        variantIdsToKeep.push(updatedVar.id);
                    }
                    else {
                        const newVar = await tx.productVariant.create({
                            data: {
                                productId: id,
                                name: varDto.name,
                                sku: varDto.sku,
                                sellingPrice: varDto.sellingPrice,
                                isActive: varDto.isActive,
                            },
                        });
                        await tx.inventory.create({
                            data: {
                                variantId: newVar.id,
                                currentStock: varDto.initialStock ?? 0,
                            },
                        });
                        variantIdsToKeep.push(newVar.id);
                    }
                }
                const variantsToRemove = product.variants.filter((v) => !variantIdsToKeep.includes(v.id));
                if (variantsToRemove.length > 0) {
                    await tx.productVariant.deleteMany({
                        where: {
                            id: { in: variantsToRemove.map((v) => v.id) },
                        },
                    });
                }
            }
            return tx.product.update({
                where: { id },
                data: {
                    name: dto.name,
                    slug: dto.slug,
                    sku: dto.sku,
                    shortDescription: dto.shortDescription,
                    description: dto.description,
                    sellingPrice: dto.sellingPrice,
                    mrp: dto.mrp,
                    costPrice: dto.costPrice,
                    categoryId: dto.categoryId,
                    status,
                    featured: dto.featured,
                    newArrival: dto.newArrival,
                    bestSeller: dto.bestSeller,
                    showOnHomepage: dto.showOnHomepage,
                    occasion: dto.occasion,
                    gender: dto.gender,
                    material: dto.material,
                    collection: dto.collection,
                },
            });
        });
    }
    async remove(id) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        return this.prisma.product.update({
            where: { id },
            data: { status: client_js_1.ProductStatus.ARCHIVED },
        });
    }
    async permanentDelete(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: {
                _count: { select: { orderItems: true } },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        if (product.status !== client_js_1.ProductStatus.ARCHIVED) {
            throw new common_1.BadRequestException('Only archived products can be permanently deleted. Archive the product first.');
        }
        if (product._count.orderItems > 0) {
            throw new common_1.BadRequestException(`Cannot permanently delete this product — it appears in ${product._count.orderItems} order(s). Historical order records must remain intact.`);
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.stockTransaction.deleteMany({
                where: { productId: id },
            });
            return tx.product.delete({ where: { id } });
        });
    }
    async fetchExternalProducts() {
        const url = 'https://jewels.brynexapparels.in/api/public/products';
        try {
            const res = await fetch(url, {
                headers: { Accept: 'application/json' },
                signal: AbortSignal.timeout(8000),
            });
            if (res.ok) {
                const data = (await res.json());
                if (data && Array.isArray(data.products) && data.products.length > 0) {
                    return data.products;
                }
            }
            this.logger.warn(`External products API returned HTTP status ${res.status}`);
        }
        catch (err) {
            this.logger.warn(`Failed to reach ${url}: ${err.message}`);
        }
        try {
            const cached = await this.prisma.systemSetting.findUnique({
                where: { key: 'external_products_catalog' },
            });
            if (cached && cached.value) {
                const parsed = JSON.parse(cached.value);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        }
        catch (e) {
            this.logger.error('Failed to parse cached external products', e);
        }
        return [];
    }
    async syncExternalProducts(adminEmail = 'system') {
        const products = await this.fetchExternalProducts();
        if (products.length === 0) {
            return {
                success: false,
                syncedCount: 0,
                updatedInDb: 0,
                timestamp: new Date().toISOString(),
                message: 'External products API (https://jewels.brynexapparels.in/api/public/products) currently returned 0 products (404 Not Found on Rootfin server).',
                products: [],
            };
        }
        await this.prisma.systemSetting.upsert({
            where: { key: 'external_products_catalog' },
            update: { value: JSON.stringify(products) },
            create: { key: 'external_products_catalog', value: JSON.stringify(products) },
        });
        await this.prisma.systemSetting.upsert({
            where: { key: 'external_products_last_sync' },
            update: { value: new Date().toISOString() },
            create: { key: 'external_products_last_sync', value: new Date().toISOString() },
        });
        let updatedInDb = 0;
        for (const item of products) {
            if (!item.sku)
                continue;
            const existingProduct = await this.prisma.product.findFirst({
                where: {
                    OR: [
                        { sku: item.sku },
                        { sku: { equals: item.sku, mode: 'insensitive' } },
                    ],
                },
                include: { inventory: true },
            });
            if (existingProduct) {
                await this.prisma.product.update({
                    where: { id: existingProduct.id },
                    data: {
                        sellingPrice: item.sellingPrice,
                        mrp: item.mrp || existingProduct.mrp,
                    },
                });
                if (typeof item.stock === 'number') {
                    const oldStock = existingProduct.inventory?.currentStock ?? 0;
                    const newStock = item.stock;
                    await this.prisma.inventory.upsert({
                        where: { productId: existingProduct.id },
                        update: { currentStock: newStock },
                        create: {
                            productId: existingProduct.id,
                            currentStock: newStock,
                            minimumRequired: 2,
                            reorderPoint: 4,
                        },
                    });
                    if (oldStock !== newStock) {
                        await this.prisma.stockTransaction.create({
                            data: {
                                productId: existingProduct.id,
                                type: client_js_1.StockTransactionType.MANUAL_CORRECTION,
                                quantity: Math.abs(newStock - oldStock),
                                beforeStock: oldStock,
                                afterStock: newStock,
                                reason: `Brynex ERP stock sync (${newStock} ${item.unit || 'pcs'})`,
                                changedBy: adminEmail,
                            },
                        });
                    }
                }
                updatedInDb++;
            }
        }
        return {
            success: true,
            syncedCount: products.length,
            updatedInDb,
            timestamp: new Date().toISOString(),
            products,
        };
    }
    async lookupExternalProduct(sku) {
        if (!sku || !sku.trim()) {
            throw new common_1.BadRequestException('SKU parameter is required.');
        }
        const cleanSku = sku.trim();
        const existingProduct = await this.prisma.product.findFirst({
            where: {
                OR: [
                    { sku: cleanSku },
                    { sku: { equals: cleanSku, mode: 'insensitive' } },
                ],
            },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
                inventory: true,
                category: true,
                variants: true,
            },
        });
        const externalProducts = await this.fetchExternalProducts();
        const matchedExternal = externalProducts.find((p) => p.sku && p.sku.toLowerCase() === cleanSku.toLowerCase());
        if (existingProduct) {
            return {
                found: true,
                source: 'database',
                sku: existingProduct.sku,
                name: existingProduct.name,
                sellingPrice: Number(existingProduct.sellingPrice),
                mrp: existingProduct.mrp ? Number(existingProduct.mrp) : undefined,
                stock: existingProduct.inventory?.currentStock ?? matchedExternal?.stock ?? 0,
                status: existingProduct.status,
                hsnCode: matchedExternal?.hsnCode,
                unit: matchedExternal?.unit,
                existingProductId: existingProduct.id,
                categoryId: existingProduct.categoryId,
                categoryName: existingProduct.category?.name,
                images: existingProduct.images,
                variants: existingProduct.variants,
            };
        }
        if (matchedExternal) {
            return {
                found: true,
                source: 'external',
                sku: matchedExternal.sku,
                name: matchedExternal.name,
                sellingPrice: matchedExternal.sellingPrice,
                mrp: matchedExternal.mrp,
                stock: matchedExternal.stock,
                hsnCode: matchedExternal.hsnCode,
                unit: matchedExternal.unit,
                status: matchedExternal.status,
                existingProductId: null,
            };
        }
        return {
            found: false,
            sku: cleanSku,
            message: `No product found for SKU "${cleanSku}" in local DB or Brynex ERP feed.`,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = ProductsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map