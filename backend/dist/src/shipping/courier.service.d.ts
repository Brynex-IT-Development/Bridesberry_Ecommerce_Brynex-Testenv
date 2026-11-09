import { ShippingProvider } from './providers/ShippingProvider';
import { ShippingService } from './shipping.service';
import { EstimateShippingDto } from './shipping.dto';
export interface CourierOption {
    code: string;
    name: string;
    courierCompanyId: number;
    rate: number;
    estimatedDays: string;
    estimatedDeliveryDate?: string;
    rating?: number;
    isSurface?: boolean;
}
export interface ShippingEstimateResult {
    pincode: string;
    isServiceable: boolean;
    freeShippingEligible: boolean;
    couriers: CourierOption[];
    options: CourierOption[];
    defaultOption?: CourierOption;
}
export declare class CourierService {
    private readonly provider;
    private readonly shippingService;
    private readonly logger;
    constructor(provider: ShippingProvider, shippingService: ShippingService);
    estimateShipping(dto: EstimateShippingDto): Promise<ShippingEstimateResult>;
    private getFallbackEstimate;
}
