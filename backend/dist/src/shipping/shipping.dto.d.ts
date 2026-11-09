export declare class CreateShipmentDto {
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
    pickupLocation?: string;
    courierCompanyId?: number;
}
export declare class EstimateShippingDto {
    pincode: string;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
    orderValue?: number;
}
export declare class UpdateShippingSettingsDto {
    pickupLocation?: string;
    pickupPincode?: string;
    defaultLength?: number;
    defaultWidth?: number;
    defaultHeight?: number;
    defaultWeight?: number;
    weightUnit?: string;
    autoPickup?: boolean;
    autoManifest?: boolean;
    defaultCourier?: string;
    freeShippingThreshold?: number;
    standardShippingFee?: number;
    expressShippingFee?: number;
    codEnabled?: boolean;
    internationalShipping?: boolean;
    returnShippingEnabled?: boolean;
    rtoSettings?: string;
    webhookSecret?: string;
}
