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
var ShippingScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const shipping_service_1 = require("./shipping.service");
let ShippingScheduler = ShippingScheduler_1 = class ShippingScheduler {
    shippingService;
    logger = new common_1.Logger(ShippingScheduler_1.name);
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    async handle30MinShipmentSync() {
        this.logger.log('Starting automated 30-minute Shiprocket shipment tracking sync...');
        try {
            const count = await this.shippingService.syncAllActiveShipments();
            this.logger.log(`Completed 30-minute shipment sync. Updated ${count} active shipments.`);
        }
        catch (error) {
            this.logger.error(`Automated 30-minute shipment sync failed: ${error.message}`);
        }
    }
};
exports.ShippingScheduler = ShippingScheduler;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShippingScheduler.prototype, "handle30MinShipmentSync", null);
exports.ShippingScheduler = ShippingScheduler = ShippingScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingScheduler);
//# sourceMappingURL=shipping.scheduler.js.map