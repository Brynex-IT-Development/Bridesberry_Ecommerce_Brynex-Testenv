import { ShippingProvider } from './ShippingProvider';
import { ShiprocketService } from '../shiprocket.service';
export declare class ShiprocketProvider implements ShippingProvider {
    private readonly shiprocketService;
    readonly providerName = "SHIPROCKET";
    private readonly logger;
    constructor(shiprocketService: ShiprocketService);
    login(forceRefresh?: boolean): Promise<string>;
    getServiceability(params: {
        pickup_postcode: string;
        delivery_postcode: string;
        weight: number;
        length?: number;
        width?: number;
        height?: number;
        cod?: number;
        declared_value?: number;
    }): Promise<any>;
    createShipment(payload: any): Promise<any>;
    generateAWB(payload: {
        shipment_id: string | number;
        courier_id?: string | number;
    }): Promise<any>;
    requestPickup(shipmentId: string | number): Promise<any>;
    generateLabel(shipmentId: string | number): Promise<any>;
    generateManifest(shipmentId: string | number): Promise<any>;
    generateInvoice(orderId: string | number): Promise<any>;
    trackShipment(awbOrShipmentId: string): Promise<any>;
    cancelShipment(shipmentId: string | number): Promise<any>;
}
