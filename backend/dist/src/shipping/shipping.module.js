"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const system_settings_module_1 = require("../system-settings/system-settings.module");
const shipping_controller_1 = require("./shipping.controller");
const shipping_service_1 = require("./shipping.service");
const shiprocket_service_1 = require("./shiprocket.service");
const courier_service_1 = require("./courier.service");
const tracking_service_1 = require("./tracking.service");
const shipping_scheduler_1 = require("./shipping.scheduler");
const package_dimensions_service_1 = require("./package-dimensions.service");
const shipping_log_service_1 = require("./shipping-log.service");
const shipping_notification_service_1 = require("./shipping-notification.service");
const ShippingProvider_1 = require("./providers/ShippingProvider");
const ShiprocketProvider_1 = require("./providers/ShiprocketProvider");
let ShippingModule = class ShippingModule {
};
exports.ShippingModule = ShippingModule;
exports.ShippingModule = ShippingModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, system_settings_module_1.SystemSettingsModule],
        controllers: [shipping_controller_1.ShippingController],
        providers: [
            shipping_service_1.ShippingService,
            shiprocket_service_1.ShiprocketService,
            courier_service_1.CourierService,
            tracking_service_1.TrackingService,
            shipping_scheduler_1.ShippingScheduler,
            package_dimensions_service_1.PackageDimensionsService,
            shipping_log_service_1.ShippingLogService,
            shipping_notification_service_1.ShippingNotificationService,
            ShiprocketProvider_1.ShiprocketProvider,
            {
                provide: ShippingProvider_1.SHIPPING_PROVIDER,
                useClass: ShiprocketProvider_1.ShiprocketProvider,
            },
        ],
        exports: [
            shipping_service_1.ShippingService,
            shiprocket_service_1.ShiprocketService,
            courier_service_1.CourierService,
            tracking_service_1.TrackingService,
            shipping_log_service_1.ShippingLogService,
            ShippingProvider_1.SHIPPING_PROVIDER,
        ],
    })
], ShippingModule);
//# sourceMappingURL=shipping.module.js.map