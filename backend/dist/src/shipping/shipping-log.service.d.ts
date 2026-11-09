import { PrismaService } from '../prisma/prisma.service';
export type ShipmentAction = 'SHIPMENT_CREATED' | 'COURIER_ASSIGNED' | 'AWB_GENERATED' | 'PICKUP_REQUESTED' | 'LABEL_GENERATED' | 'INVOICE_GENERATED' | 'MANIFEST_GENERATED' | 'TRACKING_SYNC' | 'WEBHOOK_RECEIVED' | 'SHIPMENT_CANCELLED';
export declare class ShippingLogService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    recordLog(params: {
        shipmentId: string;
        action: ShipmentAction;
        performedBy?: string;
        remarks?: string;
        payload?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        remarks: string | null;
        shipmentId: string;
        action: string;
        performedBy: string;
        payload: import("@prisma/client/runtime/client").JsonValue | null;
    } | undefined>;
    getLogs(shipmentId: string): Promise<{
        id: string;
        createdAt: Date;
        remarks: string | null;
        shipmentId: string;
        action: string;
        performedBy: string;
        payload: import("@prisma/client/runtime/client").JsonValue | null;
    }[]>;
}
