import { ConfigService } from '@nestjs/config';
import { SystemSettingsService } from '../system-settings/system-settings.service';
import { CourierServiceabilityRequest, ShiprocketServiceabilityResponse, CreateShiprocketOrderPayload, CreateShiprocketOrderResponse, AssignAwbPayload, AssignAwbResponse, RequestPickupResponse, GenerateLabelResponse, GenerateInvoiceResponse, GenerateManifestResponse, TrackingData } from './shipping.types';
export declare class ShiprocketService {
    private readonly configService;
    private readonly systemSettingsService;
    private readonly logger;
    private token;
    private tokenExpiresAt;
    constructor(configService: ConfigService, systemSettingsService: SystemSettingsService);
    private getBaseUrl;
    private getCredentials;
    authenticate(forceRefresh?: boolean): Promise<string>;
    private request;
    checkServiceability(params: CourierServiceabilityRequest): Promise<ShiprocketServiceabilityResponse>;
    createOrder(payload: CreateShiprocketOrderPayload): Promise<CreateShiprocketOrderResponse>;
    assignAwb(payload: AssignAwbPayload): Promise<AssignAwbResponse>;
    requestPickup(shipmentId: string | number): Promise<RequestPickupResponse>;
    generateLabel(shipmentId: string | number): Promise<GenerateLabelResponse>;
    generateInvoice(orderId: string | number): Promise<GenerateInvoiceResponse>;
    generateManifest(shipmentId: string | number): Promise<GenerateManifestResponse>;
    trackByAwb(awb: string): Promise<TrackingData>;
    trackByShipmentId(shipmentId: string | number): Promise<TrackingData>;
    cancelOrder(shiprocketOrderId: string | number): Promise<any>;
}
