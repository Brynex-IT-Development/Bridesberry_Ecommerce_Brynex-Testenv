import { ShipmentStatus } from '../generated/prisma/client.js';
export interface ShipmentNotificationEvent {
    shipmentId: string;
    orderId: string;
    orderNumber: string;
    customerEmail: string;
    customerPhone?: string;
    status: ShipmentStatus;
    courier?: string;
    awb?: string;
    trackingUrl?: string;
    estimatedDelivery?: Date;
    timestamp: Date;
}
export declare class ShippingNotificationService {
    private readonly logger;
    notifyShipmentStatusChange(event: ShipmentNotificationEvent): Promise<void>;
}
