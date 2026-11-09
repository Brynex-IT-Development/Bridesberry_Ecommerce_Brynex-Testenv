"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhonepeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const orders_service_1 = require("../orders/orders.service");
const prisma_service_1 = require("../prisma/prisma.service");
const checksum_util_1 = require("./utils/checksum.util");
let PhonepeService = class PhonepeService {
    configService;
    ordersService;
    prisma;
    logger = new common_1.Logger('PhonepeService');
    merchantId;
    saltKey;
    saltIndex;
    baseUrl;
    callbackUrl;
    redirectUrl;
    constructor(configService, ordersService, prisma) {
        this.configService = configService;
        this.ordersService = ordersService;
        this.prisma = prisma;
        this.merchantId = this.configService.get('PHONEPE_MERCHANT_ID') || 'YOUR_MERCHANT_ID';
        this.saltKey = this.configService.get('PHONEPE_SALT_KEY') || 'YOUR_SALT_KEY';
        this.saltIndex = Number(this.configService.get('PHONEPE_SALT_INDEX') || '1');
        let rawBaseUrl = this.configService.get('PHONEPE_BASE_URL') || 'https://api-preprod.phonepe.com/apis/pg-sandbox';
        if (rawBaseUrl.includes('api-preprod.phonepe.com') && !rawBaseUrl.includes('/apis/pg-sandbox')) {
            rawBaseUrl = rawBaseUrl.replace(/\/+$/, '') + '/apis/pg-sandbox';
        }
        else if (rawBaseUrl.includes('api.phonepe.com') && !rawBaseUrl.includes('/apis/hermes')) {
            rawBaseUrl = rawBaseUrl.replace(/\/+$/, '') + '/apis/hermes';
        }
        this.baseUrl = rawBaseUrl.replace(/\/+$/, '');
        this.callbackUrl = this.configService.get('PHONEPE_CALLBACK_URL') || 'http://localhost:7001/api/payments/phonepe/callback';
        this.redirectUrl = this.configService.get('PHONEPE_REDIRECT_URL') || 'http://localhost:3000/payment/success';
        if (this.merchantId === 'YOUR_MERCHANT_ID' || this.saltKey === 'YOUR_SALT_KEY') {
            this.logger.warn('PhonePe credentials not configured. Please define PHONEPE_MERCHANT_ID and PHONEPE_SALT_KEY in your .env file.');
        }
    }
    async createPayment(orderId) {
        this.logger.log(`Initiating payment for Order: ${orderId}`);
        const order = await this.ordersService.findOne(orderId, { id: '', role: 'ADMIN' });
        if (!order) {
            this.logger.error(`Payment initiation failed: Order ${orderId} not found`);
            throw new common_1.BadRequestException(`Order ${orderId} not found.`);
        }
        if (order.paymentStatus === 'PAID') {
            this.logger.warn(`Payment initiation failed: Order ${orderId} is already PAID`);
            throw new common_1.BadRequestException(`Order ${orderId} has already been paid.`);
        }
        const amountInPaise = Math.round(Number(order.total) * 100);
        const merchantTransactionId = `TXN-${Date.now()}-${order.orderNumber}`;
        const shippingAddress = order.shippingAddress;
        let mobileNumber = shippingAddress?.phone ? String(shippingAddress.phone).replace(/\D/g, '') : undefined;
        if (mobileNumber && mobileNumber.length > 10) {
            mobileNumber = mobileNumber.slice(-10);
        }
        if (mobileNumber && !/^[6-9]\d{9}$/.test(mobileNumber)) {
            mobileNumber = undefined;
        }
        const payload = {
            merchantId: this.merchantId,
            merchantTransactionId,
            merchantUserId: `USR-${order.customerId}`,
            amount: amountInPaise,
            redirectUrl: `${this.redirectUrl}?merchantTransactionId=${merchantTransactionId}`,
            redirectMode: 'REDIRECT',
            callbackUrl: this.callbackUrl,
            mobileNumber,
            paymentInstrument: {
                type: 'PAY_PAGE',
            },
        };
        const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const apiEndpoint = '/pg/v1/pay';
        const checksum = checksum_util_1.ChecksumUtil.generatePayChecksum(base64Payload, apiEndpoint, this.saltKey, this.saltIndex);
        try {
            this.logger.log(`Sending payment request to PhonePe API: ${this.baseUrl}${apiEndpoint}`);
            const response = await fetch(`${this.baseUrl}${apiEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'X-VERIFY': checksum,
                },
                body: JSON.stringify({ request: base64Payload }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`PhonePe Gateway error status: ${response.status}. Response: ${errorText}`);
                throw new common_1.InternalServerErrorException('PhonePe payment gateway returned an error.');
            }
            const resData = await response.json();
            if (resData.success && resData.data?.instrumentResponse?.redirectInfo?.url) {
                await this.prisma.order.update({
                    where: { id: orderId },
                    data: {
                        merchantTransactionId,
                        paymentProvider: 'PhonePe',
                    },
                });
                this.logger.log(`Payment request successfully queued. Merchant Transaction ID: ${merchantTransactionId}`);
                return {
                    redirectUrl: resData.data.instrumentResponse.redirectInfo.url,
                };
            }
            else {
                this.logger.error(`PhonePe Gateway rejected request: ${JSON.stringify(resData)}`);
                throw new common_1.InternalServerErrorException('Failed to generate payment redirect from PhonePe.');
            }
        }
        catch (err) {
            this.logger.error(`PhonePe Payment Request failure: ${err.message}`, err.stack);
            throw new common_1.InternalServerErrorException(`Gateway timeout or connectivity issue: ${err.message}`);
        }
    }
    async checkPaymentStatus(merchantTransactionId) {
        this.logger.log(`Verifying payment status for Merchant Transaction ID: ${merchantTransactionId}`);
        const apiEndpoint = `/pg/v1/status/${this.merchantId}/${merchantTransactionId}`;
        const checksum = checksum_util_1.ChecksumUtil.generateStatusChecksum(this.merchantId, merchantTransactionId, this.saltKey, this.saltIndex);
        try {
            const response = await fetch(`${this.baseUrl}${apiEndpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'X-VERIFY': checksum,
                    'X-MERCHANT-ID': this.merchantId,
                },
            });
            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`PhonePe checkPaymentStatus API error status: ${response.status}. Response: ${errorText}`);
                throw new common_1.InternalServerErrorException('Failed to fetch status from PhonePe gateway.');
            }
            const resData = await response.json();
            this.logger.log(`PhonePe Check Status API returned: ${JSON.stringify(resData)}`);
            const order = await this.prisma.order.findFirst({
                where: { merchantTransactionId },
            });
            if (!order) {
                this.logger.error(`Verification error: Order with merchantTransactionId ${merchantTransactionId} not found`);
                throw new common_1.BadRequestException('Order not found for transaction.');
            }
            if (resData.success && resData.code === 'PAYMENT_SUCCESS') {
                this.logger.log(`Payment confirmed SUCCESS for Order ${order.id}. Transitioning state and deducting stock...`);
                const phonepeTransactionId = resData.data.transactionId;
                const paymentDetails = {
                    paymentMethod: resData.data.paymentInstrument?.type || 'Online',
                    paymentProvider: 'PhonePe',
                    phonepeTransactionId,
                    merchantTransactionId,
                    paymentReference: resData.data.paymentInstrument?.utr || undefined,
                    paymentResponse: JSON.stringify(resData),
                    paymentCompletedAt: new Date(),
                };
                const updatedOrder = await this.ordersService.markOrderAsPaid(order.id, paymentDetails);
                this.logger.log(`Order ${order.id} marked as PAID. Inventory deducted successfully.`);
                return {
                    status: 'SUCCESS',
                    order: updatedOrder,
                };
            }
            else if (resData.success && resData.code === 'PAYMENT_PENDING') {
                this.logger.warn(`Payment remains PENDING for Order ${order.id}.`);
                return {
                    status: 'PENDING',
                    order,
                };
            }
            else {
                this.logger.error(`Payment failed or cancelled (Code: ${resData.code}) for Order ${order.id}.`);
                const failedOrder = await this.ordersService.markOrderAsFailed(order.id, JSON.stringify(resData));
                return {
                    status: 'FAILED',
                    order: failedOrder,
                };
            }
        }
        catch (err) {
            this.logger.error(`Failed to verify payment status for ${merchantTransactionId}: ${err.message}`, err.stack);
            throw new common_1.InternalServerErrorException(`Status check error: ${err.message}`);
        }
    }
    async processCallback(base64Response, xVerifyHeader) {
        this.logger.log(`Processing incoming backend callback from PhonePe. Header X-VERIFY: ${xVerifyHeader}`);
        const isValidSignature = checksum_util_1.ChecksumUtil.verifyCallbackSignature(base64Response, xVerifyHeader, this.saltKey, this.saltIndex);
        if (!isValidSignature) {
            this.logger.error('Callback signature verification FAILED. Rejecting callback request.');
            throw new common_1.BadRequestException('Invalid signature.');
        }
        const decodedPayloadStr = Buffer.from(base64Response, 'base64').toString('utf-8');
        const callbackData = JSON.parse(decodedPayloadStr);
        this.logger.log(`Callback decoded payload: ${decodedPayloadStr}`);
        const merchantTransactionId = callbackData.data.merchantTransactionId;
        const order = await this.prisma.order.findFirst({
            where: { merchantTransactionId },
        });
        if (!order) {
            this.logger.error(`Callback error: Order with merchant transaction ID ${merchantTransactionId} not found`);
            throw new common_1.BadRequestException('Order not found.');
        }
        if (callbackData.success && callbackData.code === 'PAYMENT_SUCCESS') {
            this.logger.log(`Callback confirmation SUCCESS for Order ${order.id}. Settle order...`);
            const paymentDetails = {
                paymentMethod: callbackData.data.paymentInstrument?.type || 'Online',
                paymentProvider: 'PhonePe',
                phonepeTransactionId: callbackData.data.transactionId,
                merchantTransactionId,
                paymentReference: callbackData.data.paymentInstrument?.utr || undefined,
                paymentResponse: decodedPayloadStr,
                paymentCompletedAt: new Date(),
            };
            await this.ordersService.markOrderAsPaid(order.id, paymentDetails);
        }
        else {
            this.logger.error(`Callback failed: payment unsuccessful (code: ${callbackData.code}) for Order ${order.id}`);
            await this.ordersService.markOrderAsFailed(order.id, decodedPayloadStr);
        }
        return true;
    }
    async processRefund(orderId, refundAmount) {
        this.logger.log(`Refund request received for Order: ${orderId}, Amount: ${refundAmount}`);
        const order = await this.ordersService.findOne(orderId, { id: '', role: 'ADMIN' });
        if (!order) {
            throw new common_1.BadRequestException(`Order ${orderId} not found.`);
        }
        if (order.paymentStatus !== 'PAID') {
            throw new common_1.BadRequestException(`Order ${orderId} must be in PAID status to initiate a refund.`);
        }
        if (refundAmount > Number(order.total)) {
            throw new common_1.BadRequestException(`Refund amount cannot exceed order total of ₹${order.total}`);
        }
        const refundTransactionId = `REF-${Date.now()}-${order.orderNumber}`;
        this.logger.log(`Initiating placeholder refund with ID: ${refundTransactionId}`);
        const mockRefundResponse = {
            success: true,
            code: 'REFUND_INITIATED',
            message: 'Refund has been successfully initiated.',
            data: {
                merchantId: this.merchantId,
                merchantTransactionId: refundTransactionId,
                originalTransactionId: order.merchantTransactionId,
                amount: Math.round(refundAmount * 100),
                state: 'PENDING',
            },
        };
        await this.prisma.order.update({
            where: { id: orderId },
            data: {
                paymentStatus: 'REFUNDED',
                paymentResponse: JSON.stringify(mockRefundResponse),
            },
        });
        this.logger.log(`Placeholder refund completed for Order: ${orderId}`);
        return mockRefundResponse;
    }
    async getHealthStatus() {
        const isConfigured = this.merchantId !== 'YOUR_MERCHANT_ID' && this.saltKey !== 'YOUR_SALT_KEY';
        const isUAT = this.baseUrl.includes('api-preprod.phonepe.com') || this.merchantId.includes('UAT');
        let gatewayReachable = false;
        let message = '';
        if (isConfigured) {
            try {
                const testRes = await fetch(`${this.baseUrl}/pg/v1/status/${this.merchantId}/TEST_CONNECTIVITY`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-VERIFY': 'test',
                        'X-MERCHANT-ID': this.merchantId,
                    },
                });
                gatewayReachable = testRes.status > 0;
                message = gatewayReachable
                    ? 'PhonePe gateway server reached and responding.'
                    : 'Unable to connect to PhonePe gateway.';
            }
            catch (err) {
                gatewayReachable = false;
                message = `Gateway connection error: ${err.message}`;
            }
        }
        else {
            message = 'PhonePe credentials are not configured in backend/.env';
        }
        return {
            status: isConfigured ? 'CONFIGURED' : 'NOT_CONFIGURED',
            environment: isUAT ? 'UAT_SANDBOX' : 'PRODUCTION',
            merchantId: this.merchantId ? `${this.merchantId.slice(0, 4)}***${this.merchantId.slice(-2)}` : null,
            baseUrl: this.baseUrl,
            redirectUrl: this.redirectUrl,
            callbackUrl: this.callbackUrl,
            gatewayReachable,
            message,
            instructions: isUAT
                ? 'Using PhonePe Sandbox/UAT mode. You can simulate payments with the PhonePe test simulator.'
                : 'Using PhonePe Production mode. Real money transactions will be processed.',
        };
    }
};
exports.PhonepeService = PhonepeService;
exports.PhonepeService = PhonepeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        orders_service_1.OrdersService,
        prisma_service_1.PrismaService])
], PhonepeService);
//# sourceMappingURL=phonepe.service.js.map