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
var ShippingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const ShippingProvider_1 = require("./providers/ShippingProvider");
const package_dimensions_service_1 = require("./package-dimensions.service");
const shipping_log_service_1 = require("./shipping-log.service");
const shipping_notification_service_1 = require("./shipping-notification.service");
const client_js_1 = require("../generated/prisma/client.js");
const tracking_service_1 = require("./tracking.service");
let ShippingService = ShippingService_1 = class ShippingService {
    prisma;
    configService;
    provider;
    packageDimensionsService;
    logService;
    notificationService;
    trackingService;
    logger = new common_1.Logger(ShippingService_1.name);
    constructor(prisma, configService, provider, packageDimensionsService, logService, notificationService, trackingService) {
        this.prisma = prisma;
        this.configService = configService;
        this.provider = provider;
        this.packageDimensionsService = packageDimensionsService;
        this.logService = logService;
        this.notificationService = notificationService;
        this.trackingService = trackingService;
    }
    async trackShipment(orderId) {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment) {
            throw new common_1.HttpException('Shipment record not found for this order.', common_1.HttpStatus.NOT_FOUND);
        }
        return this.trackingService.syncTracking(shipment.id);
    }
    async syncAllActiveShipments() {
        const activeShipments = await this.prisma.shipment.findMany({
            where: {
                shipmentStatus: {
                    notIn: [client_js_1.ShipmentStatus.DELIVERED, client_js_1.ShipmentStatus.CANCELLED, client_js_1.ShipmentStatus.RTO_DELIVERED],
                },
            },
        });
        let count = 0;
        for (const s of activeShipments) {
            try {
                await this.trackingService.syncTracking(s.id);
                count++;
            }
            catch (e) {
                this.logger.error(`Error syncing shipment ${s.id}: ${e.message}`);
            }
        }
        this.logger.log(`Synced ${count} active shipments.`);
        return count;
    }
    async handleWebhook(payload, secretHeader) {
        const settings = await this.getEffectiveSettings();
        if (settings.webhookSecret && secretHeader !== settings.webhookSecret) {
            this.logger.warn('Webhook secret mismatch header token.');
        }
        const rawStr = JSON.stringify(payload);
        const eventId = String(payload.shipment_id || payload.awb || Date.now());
        const log = await this.prisma.shippingWebhookLog.create({
            data: {
                eventId,
                event: payload.current_status || 'STATUS_UPDATE',
                payload: rawStr,
                receivedAt: new Date(),
            },
        });
        try {
            const awb = payload.awb;
            const shipmentIdSr = payload.shipment_id ? String(payload.shipment_id) : null;
            const shipment = await this.prisma.shipment.findFirst({
                where: {
                    OR: [
                        ...(awb ? [{ awb }] : []),
                        ...(shipmentIdSr ? [{ shipmentId: shipmentIdSr }] : []),
                    ],
                },
            });
            if (shipment) {
                const trackingPayload = {
                    track_status: 1,
                    shipment_status: 1,
                    shipment_track: [
                        {
                            id: Number(shipmentIdSr || 0),
                            awb_code: awb,
                            courier_name: payload.courier_name || shipment.courier || '',
                            current_status: payload.current_status || 'IN_TRANSIT',
                            edd: payload.etd,
                        },
                    ],
                    shipment_track_activities: payload.scans?.map((sc) => ({
                        date: sc.date,
                        status: sc.status,
                        activity: sc.activity,
                        location: sc.location,
                    })),
                };
                await this.trackingService.applyTrackingUpdates(shipment, trackingPayload);
                await this.logService.recordLog({
                    shipmentId: shipment.id,
                    action: 'WEBHOOK_RECEIVED',
                    performedBy: 'WEBHOOK',
                    remarks: `Webhook status update: ${payload.current_status}`,
                    payload,
                });
            }
            await this.prisma.shippingWebhookLog.update({
                where: { id: log.id },
                data: { processed: true },
            });
            return { success: true };
        }
        catch (err) {
            await this.prisma.shippingWebhookLog.update({
                where: { id: log.id },
                data: { error: err.message },
            });
            return { success: false, error: err.message };
        }
    }
    async getEffectiveSettings() {
        let dbSettings = await this.prisma.shippingSettings.findFirst();
        if (!dbSettings) {
            dbSettings = await this.prisma.shippingSettings.create({
                data: {
                    provider: 'SHIPROCKET',
                    shiprocketEmail: this.configService.get('SHIPROCKET_EMAIL') || '',
                    shiprocketPassword: this.configService.get('SHIPROCKET_PASSWORD') || '',
                    pickupLocation: this.configService.get('SHIPROCKET_PICKUP_LOCATION') || 'Primary',
                    defaultLength: parseFloat(this.configService.get('SHIPROCKET_DEFAULT_LENGTH') || '20'),
                    defaultWidth: parseFloat(this.configService.get('SHIPROCKET_DEFAULT_WIDTH') || '20'),
                    defaultHeight: parseFloat(this.configService.get('SHIPROCKET_DEFAULT_HEIGHT') || '10'),
                    defaultWeight: parseFloat(this.configService.get('SHIPROCKET_DEFAULT_WEIGHT') || '0.5'),
                    webhookSecret: this.configService.get('SHIPROCKET_WEBHOOK_SECRET') || '',
                },
            });
        }
        return {
            provider: dbSettings.provider || 'SHIPROCKET',
            shiprocketEmail: dbSettings.shiprocketEmail || this.configService.get('SHIPROCKET_EMAIL') || '',
            shiprocketPassword: dbSettings.shiprocketPassword || this.configService.get('SHIPROCKET_PASSWORD') || '',
            pickupLocation: dbSettings.pickupLocation || this.configService.get('SHIPROCKET_PICKUP_LOCATION') || 'Primary',
            defaultLength: dbSettings.defaultLength || 20,
            defaultWidth: dbSettings.defaultWidth || 20,
            defaultHeight: dbSettings.defaultHeight || 10,
            defaultWeight: dbSettings.defaultWeight || 0.5,
            weightUnit: dbSettings.weightUnit || 'kg',
            autoCreateShipment: dbSettings.autoCreateShipment,
            autoAssignCourier: dbSettings.autoAssignCourier,
            autoGenerateAwb: dbSettings.autoGenerateAwb,
            autoSchedulePickup: dbSettings.autoSchedulePickup,
            autoGenerateManifest: dbSettings.autoGenerateManifest,
            autoGenerateLabel: dbSettings.autoGenerateLabel,
            freeShippingThreshold: Number(dbSettings.freeShippingThreshold || 2000),
            standardShippingCharge: Number(dbSettings.standardShippingCharge || 100),
            expressShippingCharge: Number(dbSettings.expressShippingCharge || 200),
            codEnabled: dbSettings.codEnabled,
            internationalShipping: dbSettings.internationalShipping,
            returnShippingEnabled: dbSettings.returnShippingEnabled,
            rtoSettings: dbSettings.rtoSettings || 'Return to Origin Default',
            webhookSecret: dbSettings.webhookSecret || this.configService.get('SHIPROCKET_WEBHOOK_SECRET') || '',
        };
    }
    async getShipmentByOrderId(orderId) {
        return this.prisma.shipment.findUnique({
            where: { orderId },
            include: {
                events: { orderBy: { eventTimestamp: 'desc' } },
                logs: { orderBy: { createdAt: 'desc' } },
            },
        });
    }
    async createShipment(orderId, dto, performedBy = 'ADMIN') {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } }, customer: true },
        });
        if (!order) {
            throw new common_1.HttpException('Order not found', common_1.HttpStatus.NOT_FOUND);
        }
        const settings = await this.getEffectiveSettings();
        const dims = await this.packageDimensionsService.resolveOrderDimensions(orderId, {
            length: dto?.length || settings.defaultLength,
            width: dto?.width || settings.defaultWidth,
            height: dto?.height || settings.defaultHeight,
            weight: dto?.weight || settings.defaultWeight,
        });
        const shippingAddr = order.shippingAddress || {};
        const billingAddr = order.billingAddress || shippingAddr;
        const formattedDate = new Date(order.createdAt).toISOString().replace('T', ' ').substring(0, 16);
        const items = order.items.map((item) => ({
            name: item.name,
            sku: item.sku,
            units: item.quantity,
            selling_price: Number(item.price),
        }));
        const payload = {
            order_id: order.orderNumber || order.id,
            order_date: formattedDate,
            pickup_location: dto?.pickupLocation || settings.pickupLocation,
            comment: order.notes || 'Ecommerce Jewelry Order',
            billing_customer_name: `${order.customer?.firstName || 'Valued'} ${order.customer?.lastName || 'Customer'}`.trim(),
            billing_address: billingAddr.street || billingAddr.street1 || 'Address Line 1',
            billing_address_2: billingAddr.street2 || '',
            billing_city: billingAddr.city || 'City',
            billing_pincode: String(billingAddr.zipCode || billingAddr.postalCode || '110001'),
            billing_state: billingAddr.state || 'State',
            billing_country: billingAddr.country || 'India',
            billing_email: order.customer?.email || 'customer@example.com',
            billing_phone: billingAddr.phone || '9999999999',
            shipping_is_billing: true,
            order_items: items,
            payment_method: order.paymentMethod?.toUpperCase() === 'COD' ? 'COD' : 'Prepaid',
            shipping_charges: Number(order.shippingCharge || 0),
            sub_total: Number(order.subtotal),
            length: dims.length,
            width: dims.width,
            height: dims.height,
            weight: dims.weight,
        };
        let srRes;
        try {
            srRes = await this.provider.createShipment(payload);
        }
        catch (err) {
            this.logger.error(`Failed to create shipment on ${this.provider.providerName}: ${err.message}`);
            throw new common_1.HttpException(`Shipment creation failed on ${this.provider.providerName}: ${err.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
        const srOrderId = String(srRes.order_id || '');
        const srShipmentId = String(srRes.shipment_id || '');
        const awbCode = srRes.awb_code || null;
        const courierCompanyId = srRes.courier_company_id ? Number(srRes.courier_company_id) : null;
        const courierName = srRes.courier_name || null;
        const shipment = await this.prisma.shipment.upsert({
            where: { orderId },
            create: {
                orderId,
                shiprocketOrderId: srOrderId,
                shipmentId: srShipmentId,
                awb: awbCode,
                courierCompanyId,
                courier: courierName,
                pickupLocation: dto?.pickupLocation || settings.pickupLocation,
                length: dims.length,
                width: dims.width,
                height: dims.height,
                weight: dims.weight,
                shipmentStatus: client_js_1.ShipmentStatus.NEW,
                pickupStatus: client_js_1.PickupStatus.PENDING,
                rawShipmentData: srRes,
            },
            update: {
                shiprocketOrderId: srOrderId,
                shipmentId: srShipmentId,
                awb: awbCode || undefined,
                courierCompanyId: courierCompanyId || undefined,
                courier: courierName || undefined,
                pickupLocation: dto?.pickupLocation || settings.pickupLocation,
                length: dims.length,
                width: dims.width,
                height: dims.height,
                weight: dims.weight,
                shipmentStatus: client_js_1.ShipmentStatus.NEW,
                rawShipmentData: srRes,
            },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'SHIPMENT_CREATED',
            performedBy,
            remarks: `Shipment registered with ${this.provider.providerName}. Dimensions source: ${dims.source}`,
            payload: srRes,
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PROCESSING' },
        });
        if (!shipment.awb && (settings.autoAssignCourier || settings.autoGenerateAwb || dto?.courierCompanyId)) {
            try {
                await this.generateAwb(orderId, dto?.courierCompanyId || courierCompanyId || undefined, 'SYSTEM');
            }
            catch (e) {
                this.logger.warn(`Auto-AWB assignment warning: ${e.message}`);
            }
        }
        return this.getShipmentByOrderId(orderId);
    }
    async generateAwb(orderId, courierCompanyId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment || !shipment.shipmentId) {
            throw new common_1.HttpException('Shipment not created yet.', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = { shipment_id: shipment.shipmentId };
        if (courierCompanyId)
            payload.courier_id = courierCompanyId;
        const res = await this.provider.generateAWB(payload);
        const awbData = res.response?.data;
        const awbCode = awbData?.awb_code;
        const courierId = awbData?.courier_company_id || courierCompanyId;
        const courierName = awbData?.courier_name || shipment.courier;
        if (!awbCode) {
            throw new common_1.HttpException('Provider could not assign an AWB for this courier.', common_1.HttpStatus.BAD_REQUEST);
        }
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: {
                awb: awbCode,
                courierCompanyId: courierId ? Number(courierId) : undefined,
                courier: courierName || undefined,
                shipmentStatus: client_js_1.ShipmentStatus.COURIER_ASSIGNED,
                rawShipmentData: res,
            },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'AWB_GENERATED',
            performedBy,
            remarks: `AWB ${awbCode} generated for courier ${courierName}`,
            payload: res,
        });
        const settings = await this.getEffectiveSettings();
        if (settings.autoSchedulePickup) {
            try {
                await this.requestPickup(orderId, 'SYSTEM');
            }
            catch (e) {
                this.logger.warn(`Auto-pickup warning: ${e.message}`);
            }
        }
        return updated;
    }
    async requestPickup(orderId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment || !shipment.shipmentId) {
            throw new common_1.HttpException('Shipment not created yet.', common_1.HttpStatus.BAD_REQUEST);
        }
        const res = await this.provider.requestPickup(shipment.shipmentId);
        const scheduledDate = res.response?.pickup_scheduled_date
            ? new Date(res.response.pickup_scheduled_date)
            : new Date();
        const tokenNo = res.response?.pickup_token_number || null;
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: {
                pickupStatus: client_js_1.PickupStatus.SCHEDULED,
                pickupScheduledDate: scheduledDate,
                pickupTokenNumber: tokenNo || undefined,
                shipmentStatus: client_js_1.ShipmentStatus.PICKUP_SCHEDULED,
            },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'PICKUP_REQUESTED',
            performedBy,
            remarks: `Pickup requested for ${scheduledDate.toISOString()}`,
            payload: res,
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'PACKED' },
        });
        const settings = await this.getEffectiveSettings();
        if (settings.autoGenerateManifest) {
            try {
                await this.generateManifest(orderId, 'SYSTEM');
            }
            catch (e) {
                this.logger.warn(`Auto-manifest warning: ${e.message}`);
            }
        }
        if (settings.autoGenerateLabel) {
            try {
                await this.generateLabel(orderId, 'SYSTEM');
            }
            catch (e) {
                this.logger.warn(`Auto-label warning: ${e.message}`);
            }
        }
        return updated;
    }
    async generateLabel(orderId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment || !shipment.shipmentId) {
            throw new common_1.HttpException('Shipment not created yet.', common_1.HttpStatus.BAD_REQUEST);
        }
        const res = await this.provider.generateLabel(shipment.shipmentId);
        const labelUrl = res.label_url || undefined;
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: { labelUrl },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'LABEL_GENERATED',
            performedBy,
            remarks: `Shipping label URL: ${labelUrl || 'N/A'}`,
            payload: res,
        });
        return updated;
    }
    async generateInvoice(orderId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment || !shipment.shiprocketOrderId) {
            throw new common_1.HttpException('Provider Order ID missing.', common_1.HttpStatus.BAD_REQUEST);
        }
        const res = await this.provider.generateInvoice(shipment.shiprocketOrderId);
        const invoiceUrl = res.invoice_url || undefined;
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: { invoiceUrl },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'INVOICE_GENERATED',
            performedBy,
            remarks: `Invoice URL: ${invoiceUrl || 'N/A'}`,
            payload: res,
        });
        return updated;
    }
    async generateManifest(orderId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment || !shipment.shipmentId) {
            throw new common_1.HttpException('Shipment not created yet.', common_1.HttpStatus.BAD_REQUEST);
        }
        const res = await this.provider.generateManifest(shipment.shipmentId);
        const manifestUrl = res.manifest_url || undefined;
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: { manifestUrl },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'MANIFEST_GENERATED',
            performedBy,
            remarks: `Manifest URL: ${manifestUrl || 'N/A'}`,
            payload: res,
        });
        return updated;
    }
    async cancelShipment(orderId, performedBy = 'ADMIN') {
        const shipment = await this.prisma.shipment.findUnique({ where: { orderId } });
        if (!shipment) {
            throw new common_1.HttpException('Shipment not found.', common_1.HttpStatus.NOT_FOUND);
        }
        if (shipment.shiprocketOrderId) {
            try {
                await this.provider.cancelShipment(shipment.shiprocketOrderId);
            }
            catch (err) {
                this.logger.warn(`Provider cancel API warning: ${err.message}`);
            }
        }
        const updated = await this.prisma.shipment.update({
            where: { orderId },
            data: {
                shipmentStatus: client_js_1.ShipmentStatus.CANCELLED,
                pickupStatus: client_js_1.PickupStatus.CANCELLED,
            },
        });
        await this.logService.recordLog({
            shipmentId: shipment.id,
            action: 'SHIPMENT_CANCELLED',
            performedBy,
            remarks: 'Shipment cancelled with provider.',
        });
        await this.prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' },
        });
        return updated;
    }
    async getSettings() {
        return this.getEffectiveSettings();
    }
    async updateSettings(dto) {
        let settings = await this.prisma.shippingSettings.findFirst();
        const data = {};
        if (dto.pickupLocation !== undefined)
            data.pickupLocation = dto.pickupLocation;
        if (dto.defaultLength !== undefined)
            data.defaultLength = dto.defaultLength;
        if (dto.defaultWidth !== undefined)
            data.defaultWidth = dto.defaultWidth;
        if (dto.defaultHeight !== undefined)
            data.defaultHeight = dto.defaultHeight;
        if (dto.defaultWeight !== undefined)
            data.defaultWeight = dto.defaultWeight;
        if (dto.weightUnit !== undefined)
            data.weightUnit = dto.weightUnit;
        if (dto.autoPickup !== undefined)
            data.autoSchedulePickup = dto.autoPickup;
        if (dto.autoManifest !== undefined)
            data.autoGenerateManifest = dto.autoManifest;
        if (dto.freeShippingThreshold !== undefined)
            data.freeShippingThreshold = dto.freeShippingThreshold;
        if (dto.standardShippingFee !== undefined)
            data.standardShippingCharge = dto.standardShippingFee;
        if (dto.expressShippingFee !== undefined)
            data.expressShippingCharge = dto.expressShippingFee;
        if (dto.codEnabled !== undefined)
            data.codEnabled = dto.codEnabled;
        if (dto.internationalShipping !== undefined)
            data.internationalShipping = dto.internationalShipping;
        if (dto.returnShippingEnabled !== undefined)
            data.returnShippingEnabled = dto.returnShippingEnabled;
        if (dto.rtoSettings !== undefined)
            data.rtoSettings = dto.rtoSettings;
        if (dto.webhookSecret !== undefined)
            data.webhookSecret = dto.webhookSecret;
        if (settings) {
            await this.prisma.shippingSettings.update({
                where: { id: settings.id },
                data,
            });
        }
        else {
            await this.prisma.shippingSettings.create({ data });
        }
        return this.getSettings();
    }
    async testConnection() {
        try {
            const token = await this.provider.login(true);
            return {
                success: true,
                message: `Successfully authenticated with ${this.provider.providerName} API.`,
                tokenPreview: `${token.substring(0, 12)}...`,
            };
        }
        catch (err) {
            return {
                success: false,
                message: err.message || 'Connection test failed.',
            };
        }
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = ShippingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(ShippingProvider_1.SHIPPING_PROVIDER)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        ShippingProvider_1.ShippingProvider,
        package_dimensions_service_1.PackageDimensionsService,
        shipping_log_service_1.ShippingLogService,
        shipping_notification_service_1.ShippingNotificationService,
        tracking_service_1.TrackingService])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map