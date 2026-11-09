import { PrismaService } from '../prisma/prisma.service';
import { ShippingProvider } from './providers/ShippingProvider';
import { ShippingLogService } from './shipping-log.service';
import { ShippingNotificationService } from './shipping-notification.service';
import { ShipmentStatus } from '../generated/prisma/client.js';
export declare class TrackingService {
    private readonly prisma;
    private readonly provider;
    private readonly logService;
    private readonly notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, provider: ShippingProvider, logService: ShippingLogService, notificationService: ShippingNotificationService);
    syncTracking(shipmentId: string): Promise<any>;
    applyTrackingUpdates(shipment: any, trackingData: any): Promise<any>;
    mapStatusToEnum(srStatus: string): ShipmentStatus;
    mapStatusToOrderStatus(srStatus: string): string | null;
}
