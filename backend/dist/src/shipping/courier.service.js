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
            const couriers = rawCouriers.map((c) => ({
                code: `COURIER_${c.courier_company_id}`,
                name: c.courier_name,
                courierCompanyId: c.courier_company_id,
                rate: isFree ? 0 : Number(c.rate || settings.standardShippingCharge),
                estimatedDays: `${c.estimated_delivery_days || '3-5'} days`,
                estimatedDeliveryDate: c.etd || undefined,
                rating: c.rating ? Number(c.rating) : 4.5,
                isSurface: c.is_surface,
            }));
            couriers.sort((a, b) => a.rate - b.rate);
            return {
                pincode: dto.pincode,
                isServiceable: true,
                freeShippingEligible: isFree,
                couriers,
                options: couriers,
                defaultOption: couriers[0],
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
                name: 'Standard Express Courier',
                courierCompanyId: 1,
                rate: stdRate,
                estimatedDays: '3-5 business days',
                rating: 4.5,
            },
            {
                code: 'EXPRESS',
                name: 'Priority Air Express',
                courierCompanyId: 2,
                rate: expRate,
                estimatedDays: '1-2 business days',
                rating: 4.8,
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