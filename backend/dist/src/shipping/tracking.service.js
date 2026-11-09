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
var TrackingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const ShippingProvider_1 = require("./providers/ShippingProvider");
const shipping_log_service_1 = require("./shipping-log.service");
const shipping_notification_service_1 = require("./shipping-notification.service");
const client_js_1 = require("../generated/prisma/client.js");
let TrackingService = TrackingService_1 = class TrackingService {
    prisma;
    provider;
    logService;
    notificationService;
    logger = new common_1.Logger(TrackingService_1.name);
    constructor(prisma, provider, logService, notificationService) {
        this.prisma = prisma;
        this.provider = provider;
        this.logService = logService;
        this.notificationService = notificationService;
    }
    async syncTracking(shipmentId) {
        const shipment = await this.prisma.shipment.findUnique({
            where: { id: shipmentId },
            include: { order: { include: { customer: true } } },
        });
        if (!shipment) {
            throw new Error(`Shipment with ID ${shipmentId} not found.`);
        }
        if (!shipment.awb && !shipment.shipmentId) {
            return shipment;
        }
        let trackingData = null;
        try {
            trackingData = await this.provider.trackShipment(shipment.awb || shipment.shipmentId || '');
        }
        catch (error) {
            this.logger.error(`Error fetching tracking for shipment ${shipmentId}: ${error.message}`);
            return shipment;
        }
        if (!trackingData)
            return shipment;
        return this.applyTrackingUpdates(shipment, trackingData);
    }
    async applyTrackingUpdates(shipment, trackingData) {
        const trackInfo = trackingData.shipment_track?.[0];
        const activities = trackingData.shipment_track_activities || [];
        const currentStatusStr = trackInfo?.current_status || 'IN_TRANSIT';
        const trackingUrl = trackingData.track_url || undefined;
        const estDelivery = trackInfo?.edd ? new Date(trackInfo.edd) : undefined;
        const newShipmentStatus = this.mapStatusToEnum(currentStatusStr);
        const mappedOrderStatus = this.mapStatusToOrderStatus(currentStatusStr);
        const oldStatus = shipment.shipmentStatus;
        const updated = await this.prisma.shipment.update({
            where: { id: shipment.id },
            data: {
                shipmentStatus: newShipmentStatus,
                trackingUrl: trackingUrl || undefined,
                estimatedDelivery: estDelivery && !isNaN(estDelivery.getTime()) ? estDelivery : undefined,
                lastTrackingUpdate: new Date(),
                rawShipmentData: trackingData,
            },
            include: { events: true, logs: true, order: true },
        });
        if (oldStatus !== newShipmentStatus) {
            await this.logService.recordLog({
                shipmentId: shipment.id,
                action: 'TRACKING_SYNC',
                performedBy: 'SYSTEM',
                remarks: `Status updated from ${oldStatus} to ${newShipmentStatus} (${currentStatusStr})`,
                payload: trackingData,
            });
            const order = shipment.order;
            if (order) {
                await this.notificationService.notifyShipmentStatusChange({
                    shipmentId: shipment.id,
                    orderId: order.id,
                    orderNumber: order.orderNumber,
                    customerEmail: order.customer?.email || 'customer@example.com',
                    status: newShipmentStatus,
                    courier: shipment.courier || undefined,
                    awb: shipment.awb || undefined,
                    trackingUrl: updated.trackingUrl || undefined,
                    estimatedDelivery: updated.estimatedDelivery || undefined,
                    timestamp: new Date(),
                });
            }
        }
        if (mappedOrderStatus) {
            await this.prisma.order.update({
                where: { id: shipment.orderId },
                data: { status: mappedOrderStatus },
            });
        }
        for (const act of activities) {
            const actDate = act.date ? new Date(act.date) : new Date();
            const existing = await this.prisma.shipmentEvent.findFirst({
                where: {
                    shipmentId: shipment.id,
                    activity: act.activity,
                    eventTimestamp: actDate,
                },
            });
            if (!existing) {
                await this.prisma.shipmentEvent.create({
                    data: {
                        shipmentId: shipment.id,
                        status: act.status || currentStatusStr,
                        activity: act.activity,
                        location: act.location || null,
                        eventTimestamp: actDate,
                        rawPayload: JSON.stringify(act),
                    },
                });
            }
        }
        return updated;
    }
    mapStatusToEnum(srStatus) {
        const s = (srStatus || '').toUpperCase().trim();
        if (s.includes('DELIVERED'))
            return client_js_1.ShipmentStatus.DELIVERED;
        if (s.includes('OUT FOR DELIVERY'))
            return client_js_1.ShipmentStatus.OUT_FOR_DELIVERY;
        if (s.includes('IN TRANSIT') || s.includes('DISPATCHED') || s.includes('SHIPPED'))
            return client_js_1.ShipmentStatus.IN_TRANSIT;
        if (s.includes('PICKED UP'))
            return client_js_1.ShipmentStatus.PICKED_UP;
        if (s.includes('PICKUP SCHEDULED'))
            return client_js_1.ShipmentStatus.PICKUP_SCHEDULED;
        if (s.includes('ASSIGNED'))
            return client_js_1.ShipmentStatus.COURIER_ASSIGNED;
        if (s.includes('CANCEL'))
            return client_js_1.ShipmentStatus.CANCELLED;
        if (s.includes('RTO'))
            return client_js_1.ShipmentStatus.RTO_INITIATED;
        return client_js_1.ShipmentStatus.NEW;
    }
    mapStatusToOrderStatus(srStatus) {
        const s = (srStatus || '').toUpperCase().trim();
        if (s.includes('DELIVERED'))
            return 'DELIVERED';
        if (s.includes('OUT FOR DELIVERY') || s.includes('IN TRANSIT') || s.includes('SHIPPED'))
            return 'SHIPPED';
        if (s.includes('PICKED UP') || s.includes('PACKED'))
            return 'PACKED';
        if (s.includes('CANCEL'))
            return 'CANCELLED';
        if (s.includes('RTO'))
            return 'RETURNED';
        return null;
    }
};
exports.TrackingService = TrackingService;
exports.TrackingService = TrackingService = TrackingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(ShippingProvider_1.SHIPPING_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ShippingProvider_1.ShippingProvider,
        shipping_log_service_1.ShippingLogService,
        shipping_notification_service_1.ShippingNotificationService])
], TrackingService);
//# sourceMappingURL=tracking.service.js.map