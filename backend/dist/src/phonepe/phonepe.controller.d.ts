import { PhonepeService } from './phonepe.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { RefundPaymentDto } from './dto/refund-payment.dto';
export declare class PhonepeController {
    private readonly phonepeService;
    constructor(phonepeService: PhonepeService);
    checkHealth(): Promise<{
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
    createPayment(dto: CreatePaymentDto): Promise<{
        redirectUrl: string;
    }>;
    checkStatus(merchantTransactionId: string): Promise<any>;
    handleCallback(body: {
        response?: string;
    }, xVerify: string): Promise<{
        success: boolean;
    }>;
    handleWebhook(body: {
        response?: string;
    }, xVerify: string): Promise<{
        success: boolean;
    }>;
    refundPayment(dto: RefundPaymentDto): Promise<any>;
}
