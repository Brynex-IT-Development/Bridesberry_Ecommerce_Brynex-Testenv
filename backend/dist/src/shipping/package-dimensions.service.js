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
var PackageDimensionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageDimensionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PackageDimensionsService = PackageDimensionsService_1 = class PackageDimensionsService {
    prisma;
    logger = new common_1.Logger(PackageDimensionsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async resolveOrderDimensions(orderId, defaultSettings) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            include: { category: true },
                        },
                    },
                },
            },
        });
        if (!order || !order.items || order.items.length === 0) {
            return {
                ...defaultSettings,
                source: 'SETTINGS',
            };
        }
        let maxProductL = 0;
        let maxProductW = 0;
        let maxProductH = 0;
        let totalProductWeight = 0;
        let hasAllProductDims = true;
        for (const item of order.items) {
            const p = item.product;
            if (p &&
                p.packageLength &&
                p.packageWidth &&
                p.packageHeight &&
                p.packageWeight) {
                maxProductL = Math.max(maxProductL, p.packageLength);
                maxProductW = Math.max(maxProductW, p.packageWidth);
                maxProductH = Math.max(maxProductH, p.packageHeight);
                totalProductWeight += p.packageWeight * item.quantity;
            }
            else {
                hasAllProductDims = false;
                break;
            }
        }
        if (hasAllProductDims && maxProductL > 0) {
            this.logger.log(`Resolved dimensions from Product level for order ${orderId}`);
            return {
                length: maxProductL,
                width: maxProductW,
                height: maxProductH,
                weight: Math.max(0.1, totalProductWeight),
                source: 'PRODUCT',
            };
        }
        let maxCategoryL = 0;
        let maxCategoryW = 0;
        let maxCategoryH = 0;
        let totalCategoryWeight = 0;
        let hasAllCategoryDims = true;
        for (const item of order.items) {
            const cat = item.product?.category;
            if (cat &&
                cat.defaultLength &&
                cat.defaultWidth &&
                cat.defaultHeight &&
                cat.defaultWeight) {
                maxCategoryL = Math.max(maxCategoryL, cat.defaultLength);
                maxCategoryW = Math.max(maxCategoryW, cat.defaultWidth);
                maxCategoryH = Math.max(maxCategoryH, cat.defaultHeight);
                totalCategoryWeight += cat.defaultWeight * item.quantity;
            }
            else {
                hasAllCategoryDims = false;
                break;
            }
        }
        if (hasAllCategoryDims && maxCategoryL > 0) {
            this.logger.log(`Resolved dimensions from Category level for order ${orderId}`);
            return {
                length: maxCategoryL,
                width: maxCategoryW,
                height: maxCategoryH,
                weight: Math.max(0.1, totalCategoryWeight),
                source: 'CATEGORY',
            };
        }
        this.logger.log(`Fallback to ShippingSettings defaults for order ${orderId}`);
        return {
            length: defaultSettings.length,
            width: defaultSettings.width,
            height: defaultSettings.height,
            weight: defaultSettings.weight,
            source: 'SETTINGS',
        };
    }
};
exports.PackageDimensionsService = PackageDimensionsService;
exports.PackageDimensionsService = PackageDimensionsService = PackageDimensionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PackageDimensionsService);
//# sourceMappingURL=package-dimensions.service.js.map