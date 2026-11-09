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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CourierService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourierService = void 0;
const common_1 = require("@nestjs/common");
const ShippingProvider_1 = require("./providers/ShippingProvider");
const shipping_service_1 = require("./shipping.service");
let CourierService = CourierService_1 = class CourierService {
    provider;
    shippingService;
    logger = new common_1.Logger(CourierService_1.name);
    constructor(provider, shippingService) {
        this.provider = provider;
        this.shippingService = shippingService;
    }
    async estimateShipping(dto) {
        const settings = await this.shippingService.getEffectiveSettings();
        const orderVal = dto.orderValue || 0;
        const isFree = orderVal >= settings.freeShippingThreshold;
        const weight = dto.weight || settings.defaultWeight;
        const length = dto.length || settings.defaultLength;
        const width = dto.width || settings.defaultWidth;
        const height = dto.height || settings.defaultHeight;
        try {
            const response = await this.provider.getServiceability({
                pickup_postcode: '110001',
                delivery_postcode: dto.pincode,
                weight,
                length,
                width,
                height,
                cod: 0,
                declared_value: orderVal,
            });
            const rawCouriers = response.data?.available_courier_companies || [];
            if (rawCouriers.length === 0) {
                return this.getFallbackEstimate(dto.pincode, isFree, settings);
            }
            const surfaceCouriers = rawCouriers.filter((c) => c.is_surface);
            const airCouriers = rawCouriers.filter((c) => !c.is_surface);
            const bestStandard = (surfaceCouriers.length > 0 ? surfaceCouriers : rawCouriers).sort((a, b) => Number(a.rate) - Number(b.rate))[0];
            const bestExpress = (airCouriers.length > 0 ? airCouriers : rawCouriers).sort((a, b) => {
                const daysA = parseInt(a.estimated_delivery_days, 10) || 5;
                const daysB = parseInt(b.estimated_delivery_days, 10) || 5;
                return daysA - daysB || Number(a.rate) - Number(b.rate);
            })[0];
            const standardRate = isFree ? 0 : Number(bestStandard?.rate || settings.standardShippingCharge);
            const standardDays = bestStandard?.estimated_delivery_days ? `${bestStandard.estimated_delivery_days} business days` : '3-5 business days';
            const customerOptions = [
                {
                    code: 'STANDARD',
                    name: 'Standard Delivery',
                    courierCompanyId: bestStandard?.courier_company_id || 1,
                    rate: standardRate,
                    estimatedDays: standardDays,
                    estimatedDeliveryDate: bestStandard?.etd || undefined,
                    rating: 4.8,
                    isSurface: true,
                },
            ];
            if (bestExpress && bestExpress.courier_company_id !== bestStandard?.courier_company_id) {
                const expressRate = isFree ? 75 : Number(bestExpress.rate || settings.expressShippingCharge);
                const expressDays = bestExpress.estimated_delivery_days ? `${bestExpress.estimated_delivery_days} business days` : '1-2 business days';
                customerOptions.push({
                    code: 'EXPRESS',
                    name: 'Express Air Delivery',
                    courierCompanyId: bestExpress.courier_company_id,
                    rate: expressRate,
                    estimatedDays: expressDays,
                    estimatedDeliveryDate: bestExpress.etd || undefined,
                    rating: 4.9,
                    isSurface: false,
                });
            }
            return {
                pincode: dto.pincode,
                isServiceable: true,
                freeShippingEligible: isFree,
                couriers: customerOptions,
                options: customerOptions,
                defaultOption: customerOptions[0],
            };
        }
        catch (error) {
            this.logger.warn(`Provider serviceability check error: ${error.message}. Returning fallback options.`);
            return this.getFallbackEstimate(dto.pincode, isFree, settings);
        }
    }
    getFallbackEstimate(pincode, isFree, settings) {
        const stdRate = isFree ? 0 : settings.standardShippingCharge;
        const expRate = isFree ? 50 : settings.expressShippingCharge;
        const fallbacks = [
            {
                code: 'STANDARD',
                name: 'Standard Delivery',
                courierCompanyId: 1,
                rate: stdRate,
                estimatedDays: '3-5 business days',
                rating: 4.8,
                isSurface: true,
            },
            {
                code: 'EXPRESS',
                name: 'Express Air Delivery',
                courierCompanyId: 2,
                rate: expRate,
                estimatedDays: '1-2 business days',
                rating: 4.9,
                isSurface: false,
            },
        ];
        return {
            pincode,
            isServiceable: true,
            freeShippingEligible: isFree,
            couriers: fallbacks,
            options: fallbacks,
            defaultOption: fallbacks[0],
        };
    }
};
exports.CourierService = CourierService;
exports.CourierService = CourierService = CourierService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(ShippingProvider_1.SHIPPING_PROVIDER)),
    __metadata("design:paramtypes", [ShippingProvider_1.ShippingProvider,
        shipping_service_1.ShippingService])
], CourierService);
//# sourceMappingURL=courier.service.js.map