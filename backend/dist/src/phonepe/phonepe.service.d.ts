import { ConfigService } from '@nestjs/config';
import { OrdersService } from '../orders/orders.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class PhonepeService {
    private readonly configService;
    private readonly ordersService;
    private readonly prisma;
    private readonly logger;
    private readonly merchantId;
    private readonly saltKey;
    private readonly saltIndex;
    private readonly baseUrl;
    private readonly callbackUrl;
    private readonly redirectUrl;
    constructor(configService: ConfigService, ordersService: OrdersService, prisma: PrismaService);
    createPayment(orderId: string): Promise<{
        redirectUrl: string;
    }>;
    checkPaymentStatus(merchantTransactionId: string): Promise<any>;
    processCallback(base64Response: string, xVerifyHeader: string): Promise<boolean>;
    processRefund(orderId: string, refundAmount: number): Promise<any>;
    getHealthStatus(): Promise<{
        status: string;
        environment: string;
        merchantId: string | null;
        baseUrl: string;
        redirectUrl: string;
        callbackUrl: string;
        gatewayReachable: boolean;
        message: string;
        instructions: string;
    }>;
}
