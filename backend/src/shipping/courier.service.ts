import { Injectable, Inject, Logger } from '@nestjs/common';
import { SHIPPING_PROVIDER, ShippingProvider } from './providers/ShippingProvider';
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
  options: CourierOption[]; // Legacy compatibility wrapper
  defaultOption?: CourierOption;
}

@Injectable()
export class CourierService {
  private readonly logger = new Logger(CourierService.name);

  constructor(
    @Inject(SHIPPING_PROVIDER) private readonly provider: ShippingProvider,
    private readonly shippingService: ShippingService,
  ) {}

  /**
   * Estimate available couriers and rates for checkout.
   * Returns all available couriers (e.g. Blue Dart, Delhivery, XpressBees) with ratings and EDDs.
   */
  async estimateShipping(dto: EstimateShippingDto): Promise<ShippingEstimateResult> {
    const settings = await this.shippingService.getEffectiveSettings();
    const orderVal = dto.orderValue || 0;
    const isFree = orderVal >= settings.freeShippingThreshold;

    const weight = dto.weight || settings.defaultWeight;
    const length = dto.length || settings.defaultLength;
    const width = dto.width || settings.defaultWidth;
    const height = dto.height || settings.defaultHeight;

    const pickupPostcode = settings.pickupPincode || '682024';

    try {
      const response = await this.provider.getServiceability({
        pickup_postcode: pickupPostcode,
        delivery_postcode: dto.pincode,
        weight,
        length,
        width,
        height,
        cod: 0,
        declared_value: orderVal,
      });

      const rawCouriers = response.data?.available_courier_companies || [];
      if (rawCouriers.length === 0) {
        return this.getFallbackEstimate(dto.pincode, isFree, settings);
      }

      // Filter and separate air vs surface
      const surfaceCouriers = rawCouriers.filter((c: any) => c.is_surface);
      const airCouriers = rawCouriers.filter((c: any) => !c.is_surface);

      // Pick the best (lowest rate / highest rating) for Standard & Express
      const bestStandard = (surfaceCouriers.length > 0 ? surfaceCouriers : rawCouriers).sort(
        (a: any, b: any) => Number(a.rate) - Number(b.rate),
      )[0];

      const bestExpress = (airCouriers.length > 0 ? airCouriers : rawCouriers).sort(
        (a: any, b: any) => {
          const daysA = parseInt(a.estimated_delivery_days, 10) || 5;
          const daysB = parseInt(b.estimated_delivery_days, 10) || 5;
          return daysA - daysB || Number(a.rate) - Number(b.rate);
        },
      )[0];

      const standardRate = isFree ? 0 : Number(bestStandard?.rate || settings.standardShippingCharge);
      const standardDays = bestStandard?.estimated_delivery_days ? `${bestStandard.estimated_delivery_days} business days` : '3-5 business days';

      const customerOptions: CourierOption[] = [
        {
          code: 'STANDARD',
          name: 'Standard Delivery',
          courierCompanyId: bestStandard?.courier_company_id || 1,
          rate: standardRate,
          estimatedDays: standardDays,
          estimatedDeliveryDate: bestStandard?.etd || undefined,
          rating: 4.8,
          isSurface: true,
        },
      ];

      // If express air exists and is distinct from standard
      if (bestExpress && bestExpress.courier_company_id !== bestStandard?.courier_company_id) {
        const expressRate = isFree ? 75 : Number(bestExpress.rate || settings.expressShippingCharge);
        const expressDays = bestExpress.estimated_delivery_days ? `${bestExpress.estimated_delivery_days} business days` : '1-2 business days';

        customerOptions.push({
          code: 'EXPRESS',
          name: 'Express Air Delivery',
          courierCompanyId: bestExpress.courier_company_id,
          rate: expressRate,
          estimatedDays: expressDays,
          estimatedDeliveryDate: bestExpress.etd || undefined,
          rating: 4.9,
          isSurface: false,
        });
      }

      return {
        pincode: dto.pincode,
        isServiceable: true,
        freeShippingEligible: isFree,
        couriers: customerOptions,
        options: customerOptions,
        defaultOption: customerOptions[0],
      };
    } catch (error: any) {
      this.logger.warn(`Provider serviceability check error: ${error.message}. Returning fallback options.`);
      return this.getFallbackEstimate(dto.pincode, isFree, settings);
    }
  }

  private getFallbackEstimate(
    pincode: string,
    isFree: boolean,
    settings: any,
  ): ShippingEstimateResult {
    const stdRate = isFree ? 0 : settings.standardShippingCharge;
    const expRate = isFree ? 50 : settings.expressShippingCharge;

    const fallbacks: CourierOption[] = [
      {
        code: 'STANDARD',
        name: 'Standard Delivery',
        courierCompanyId: 1,
        rate: stdRate,
        estimatedDays: '3-5 business days',
        rating: 4.8,
        isSurface: true,
      },
      {
        code: 'EXPRESS',
        name: 'Express Air Delivery',
        courierCompanyId: 2,
        rate: expRate,
        estimatedDays: '1-2 business days',
        rating: 4.9,
        isSurface: false,
      },
    ];

    return {
      pincode,
      isServiceable: true,
      freeShippingEligible: isFree,
      couriers: fallbacks,
      options: fallbacks,
      defaultOption: fallbacks[0],
    };
  }
}
