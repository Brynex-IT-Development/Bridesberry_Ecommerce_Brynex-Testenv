import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RootfinOrderItem {
  sku: string;
  quantity: number;
}

export interface RootfinOrderPayload {
  orderRef: string;
  customer: string;
  customerPhone: string;
  paymentReference: string;
  items: RootfinOrderItem[];
}

export interface RootfinSyncResult {
  success: boolean;
  duplicate?: boolean;
  statusCode?: number;
  data?: any;
  error?: string;
  orderRef: string;
}

@Injectable()
export class RootfinSyncService {
  private readonly logger = new Logger(RootfinSyncService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the Rootfin API endpoint configuration from environment or SystemSetting table
   */
  async getConfig() {
    const defaultBaseUrl = process.env.ROOTFIN_API_URL || 'https://jewels.brynexapparels.in/api/public';
    const defaultEndpoint = process.env.ROOTFIN_ORDERS_ENDPOINT || '/orders';
    const apiKey = process.env.ROOTFIN_API_KEY || process.env.PUBLIC_API_KEY || '';

    try {
      const settingUrl = await this.prisma.systemSetting.findUnique({
        where: { key: 'rootfin_api_url' },
      });
      const settingApiKey = await this.prisma.systemSetting.findUnique({
        where: { key: 'rootfin_api_key' },
      });

      const baseUrl = (settingUrl?.value || defaultBaseUrl).replace(/\/+$/, '');
      const ordersPath = defaultEndpoint.startsWith('/') ? defaultEndpoint : `/${defaultEndpoint}`;

      return {
        baseUrl,
        ordersUrl: `${baseUrl}${ordersPath}`,
        apiKey: settingApiKey?.value || apiKey,
      };
    } catch {
      const baseUrl = defaultBaseUrl.replace(/\/+$/, '');
      const ordersPath = defaultEndpoint.startsWith('/') ? defaultEndpoint : `/${defaultEndpoint}`;
      return {
        baseUrl,
        ordersUrl: `${baseUrl}${ordersPath}`,
        apiKey,
      };
    }
  }

  /**
   * Dispatches a confirmed web order to Rootfin ERP:
   * Creates a sales invoice, deducts stock in Rootfin warehouse, and posts the financial transaction.
   * Duplicate requests with the same orderRef are safe (idempotent, returns 200 duplicate: true).
   */
  async syncOrderToRootfin(orderId: string): Promise<RootfinSyncResult> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        customer: true,
      },
    });

    if (!order) {
      this.logger.warn(`Cannot sync order to Rootfin: Order ${orderId} not found.`);
      return { success: false, error: 'Order not found', orderRef: orderId };
    }

    if (!order.items || order.items.length === 0) {
      this.logger.warn(`Cannot sync order to Rootfin: Order ${order.orderNumber} has no items.`);
      return { success: false, error: 'Order has no items', orderRef: order.orderNumber };
    }

    const config = await this.getConfig();

    if (!config.apiKey) {
      this.logger.warn(
        `Rootfin sync skipped: ROOTFIN_API_KEY (or x-api-key) is not configured. Configure it in .env or system settings.`,
      );
      return {
        success: false,
        error: 'ROOTFIN_API_KEY not configured',
        orderRef: order.orderNumber,
      };
    }

    // Extract customer details safely from snapshotted shippingAddress or customer record
    const shipping = (order.shippingAddress as any) || {};
    const customerName =
      [shipping.firstName, shipping.lastName].filter(Boolean).join(' ').trim() ||
      [order.customer?.firstName, order.customer?.lastName].filter(Boolean).join(' ').trim() ||
      'Online Customer';

    const customerPhone = shipping.phone || '9999999999';

    // Payment reference: phonepe transaction ID, merchant transaction ID, or fallback
    const paymentReference =
      order.paymentReference ||
      order.phonepeTransactionId ||
      order.merchantTransactionId ||
      `PAY-${order.orderNumber}`;

    const payload: RootfinOrderPayload = {
      orderRef: order.orderNumber,
      customer: customerName,
      customerPhone,
      paymentReference,
      items: order.items.map((i) => ({
        sku: i.sku,
        quantity: i.quantity,
      })),
    };

    return this.sendOrderPayload(payload, config.ordersUrl, config.apiKey);
  }

  /**
   * Direct payload sender (used by syncOrderToRootfin and test endpoints)
   */
  async sendOrderPayload(
    payload: RootfinOrderPayload,
    endpointUrl?: string,
    apiKeyOverride?: string,
  ): Promise<RootfinSyncResult> {
    const config = await this.getConfig();
    const endpoint = endpointUrl || config.ordersUrl;
    const apiKey = apiKeyOverride || config.apiKey;

    this.logger.log(`Dispatching order ${payload.orderRef} to Rootfin endpoint: ${endpoint}`);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(12000), // 12-second timeout
      });

      const responseText = await res.text();
      let responseJson: any = null;
      try {
        responseJson = JSON.parse(responseText);
      } catch {
        // Not JSON
      }

      const statusCode = res.status;

      // 201 Created: Sales invoice created, stock reduced, financial transaction posted
      if (statusCode === 201) {
        this.logger.log(`Rootfin created sales invoice successfully for ${payload.orderRef}: ${responseText}`);
        await this.recordSyncLog({
          orderRef: payload.orderRef,
          status: 'SUCCESS',
          statusCode,
          items: payload.items,
          response: responseJson || responseText,
        });

        return {
          success: true,
          statusCode,
          data: responseJson || responseText,
          orderRef: payload.orderRef,
        };
      }

      // 200 OK (duplicate: true): Invoice already exists for this orderRef
      if (statusCode === 200) {
        const isDuplicate = responseJson?.duplicate === true || responseText.includes('duplicate');
        this.logger.log(
          `Rootfin returned 200 (duplicate: ${isDuplicate}) for ${payload.orderRef}: ${responseText.substring(0, 200)}`,
        );

        await this.recordSyncLog({
          orderRef: payload.orderRef,
          status: 'DUPLICATE_ACCEPTED',
          statusCode,
          duplicate: isDuplicate,
          items: payload.items,
          response: responseJson || responseText,
        });

        return {
          success: true,
          duplicate: isDuplicate,
          statusCode,
          data: responseJson || responseText,
          orderRef: payload.orderRef,
        };
      }

      // 409 Conflict: Stock check failed (insufficient warehouse stock or inactive SKU)
      if (statusCode === 409) {
        this.logger.warn(`Rootfin stock conflict (409) for ${payload.orderRef}: ${responseText}`);
        await this.recordSyncLog({
          orderRef: payload.orderRef,
          status: 'STOCK_CONFLICT',
          statusCode,
          items: payload.items,
          error: responseJson || responseText,
        });

        return {
          success: false,
          statusCode,
          error: `Stock conflict: ${responseText}`,
          data: responseJson,
          orderRef: payload.orderRef,
        };
      }

      // 503 Service Unavailable: PUBLIC_API_KEY not configured or server refused
      if (statusCode === 503) {
        this.logger.error(`Rootfin returned 503 (PUBLIC_API_KEY missing or service unavailable): ${responseText}`);
        await this.recordSyncLog({
          orderRef: payload.orderRef,
          status: 'SERVICE_UNAVAILABLE',
          statusCode,
          items: payload.items,
          error: responseText,
        });

        return {
          success: false,
          statusCode,
          error: `Rootfin 503: ${responseText}`,
          orderRef: payload.orderRef,
        };
      }

      // Other non-2xx status
      this.logger.warn(`Rootfin returned unexpected status ${statusCode} for ${payload.orderRef}: ${responseText}`);
      await this.recordSyncLog({
        orderRef: payload.orderRef,
        status: 'FAILED',
        statusCode,
        items: payload.items,
        error: responseText,
      });

      return {
        success: false,
        statusCode,
        error: `HTTP ${statusCode}: ${responseText}`,
        orderRef: payload.orderRef,
      };
    } catch (err: any) {
      this.logger.error(`Network error connecting to Rootfin (${endpoint}): ${err.message}`);
      await this.recordSyncLog({
        orderRef: payload.orderRef,
        status: 'NETWORK_ERROR',
        items: payload.items,
        error: err.message,
      });

      return {
        success: false,
        error: err.message,
        orderRef: payload.orderRef,
      };
    }
  }

  /**
   * Allows testing Rootfin connection with sample order payload
   */
  async testConnection(testPayload?: Partial<RootfinOrderPayload>, apiKey?: string) {
    const config = await this.getConfig();
    const effectiveApiKey = apiKey || config.apiKey;

    const samplePayload: RootfinOrderPayload = {
      orderRef: testPayload?.orderRef || `TEST-WEB-${Date.now().toString().slice(-4)}`,
      customer: testPayload?.customer || 'Test Customer',
      customerPhone: testPayload?.customerPhone || '9876543210',
      paymentReference: testPayload?.paymentReference || `TEST-PAY-${Date.now()}`,
      items: testPayload?.items || [{ sku: 'BRL8/1410', quantity: 1 }],
    };

    return this.sendOrderPayload(samplePayload, config.ordersUrl, effectiveApiKey);
  }

  private async recordSyncLog(log: any) {
    try {
      const key = `rootfin_sync_${log.orderRef}_${Date.now()}`;
      await this.prisma.systemSetting.upsert({
        where: { key },
        update: { value: JSON.stringify(log) },
        create: { key, value: JSON.stringify(log) },
      });
    } catch (e: any) {
      this.logger.warn(`Failed to store Rootfin sync log: ${e.message}`);
    }
  }
}
