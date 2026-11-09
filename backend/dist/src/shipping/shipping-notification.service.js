"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ShippingNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingNotificationService = void 0;
const common_1 = require("@nestjs/common");
const client_js_1 = require("../generated/prisma/client.js");
let ShippingNotificationService = ShippingNotificationService_1 = class ShippingNotificationService {
    logger = new common_1.Logger(ShippingNotificationService_1.name);
    async notifyShipmentStatusChange(event) {
        this.logger.log(`[Notification Event] Shipment ${event.shipmentId} (Order #${event.orderNumber}) status updated to ${event.status}`);
        switch (event.status) {
            case client_js_1.ShipmentStatus.COURIER_ASSIGNED:
                this.logger.log(`[Hook: Email/SMS] Courier assigned: ${event.courier}, AWB: ${event.awb}`);
                break;
            case client_js_1.ShipmentStatus.PICKUP_SCHEDULED:
                this.logger.log(`[Hook: Email/SMS] Pickup scheduled for Order #${event.orderNumber}`);
                break;
            case client_js_1.ShipmentStatus.OUT_FOR_DELIVERY:
                this.logger.log(`[Hook: WhatsApp/SMS] Out for delivery notification dispatched to ${event.customerPhone || event.customerEmail}`);
                break;
            case client_js_1.ShipmentStatus.DELIVERED:
                this.logger.log(`[Hook: Email/SMS/Push] Delivery confirmation sent for Order #${event.orderNumber}`);
                break;
            case client_js_1.ShipmentStatus.CANCELLED:
                this.logger.log(`[Hook: Email] Shipment cancellation notice sent for Order #${event.orderNumber}`);
                break;
            default:
                break;
        }
    }
};
exports.ShippingNotificationService = ShippingNotificationService;
exports.ShippingNotificationService = ShippingNotificationService = ShippingNotificationService_1 = __decorate([
    (0, common_1.Injectable)()
], ShippingNotificationService);
//# sourceMappingURL=shipping-notification.service.js.map