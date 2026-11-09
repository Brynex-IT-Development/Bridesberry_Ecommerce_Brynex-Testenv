import { ShippingService } from './shipping.service';
export declare class ShippingScheduler {
    private readonly shippingService;
    private readonly logger;
    constructor(shippingService: ShippingService);
    handle30MinShipmentSync(): Promise<void>;
}
