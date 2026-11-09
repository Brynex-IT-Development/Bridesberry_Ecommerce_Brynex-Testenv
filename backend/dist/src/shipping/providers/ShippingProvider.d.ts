export declare abstract class ShippingProvider {
    abstract readonly providerName: string;
    abstract login(forceRefresh?: boolean): Promise<string>;
    abstract getServiceability(params: {
        pickup_postcode: string;
        delivery_postcode: string;
        weight: number;
        length?: number;
        width?: number;
        height?: number;
        cod?: number;
        declared_value?: number;
    }): Promise<any>;
    abstract createShipment(payload: any): Promise<any>;
    abstract generateAWB(payload: {
        shipment_id: string | number;
        courier_id?: string | number;
    }): Promise<any>;
    abstract requestPickup(shipmentId: string | number): Promise<any>;
    abstract generateLabel(shipmentId: string | number): Promise<any>;
    abstract generateManifest(shipmentId: string | number): Promise<any>;
    abstract generateInvoice(orderId: string | number): Promise<any>;
    abstract trackShipment(awbOrShipmentId: string): Promise<any>;
    abstract cancelShipment(shipmentId: string | number): Promise<any>;
}
export declare const SHIPPING_PROVIDER = "SHIPPING_PROVIDER";
