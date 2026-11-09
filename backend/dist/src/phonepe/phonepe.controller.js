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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhonepeController = void 0;
const common_1 = require("@nestjs/common");
const phonepe_service_1 = require("./phonepe.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const refund_payment_dto_1 = require("./dto/refund-payment.dto");
const public_decorator_1 = require("../auth/decorators/public.decorator");
let PhonepeController = class PhonepeController {
    phonepeService;
    constructor(phonepeService) {
        this.phonepeService = phonepeService;
    }
    async checkHealth() {
        return this.phonepeService.getHealthStatus();
    }
    async createPayment(dto) {
        return this.phonepeService.createPayment(dto.orderId);
    }
    async checkStatus(merchantTransactionId) {
        if (!merchantTransactionId) {
            throw new common_1.BadRequestException('Merchant transaction ID is required.');
        }
        return this.phonepeService.checkPaymentStatus(merchantTransactionId);
    }
    async handleCallback(body, xVerify) {
        if (!body?.response) {
            throw new common_1.BadRequestException('Missing callback response payload.');
        }
        if (!xVerify) {
            throw new common_1.BadRequestException('Missing checksum verification header.');
        }
        const success = await this.phonepeService.processCallback(body.response, xVerify);
        return { success };
    }
    async handleWebhook(body, xVerify) {
        if (!body?.response || !xVerify) {
            throw new common_1.BadRequestException('Missing payload or verification header.');
        }
        const success = await this.phonepeService.processCallback(body.response, xVerify);
        return { success };
    }
    async refundPayment(dto) {
        return this.phonepeService.processRefund(dto.orderId, dto.amount);
    }
};
exports.PhonepeController = PhonepeController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "checkHealth", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "createPayment", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('status/:merchantTransactionId'),
    __param(0, (0, common_1.Param)('merchantTransactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "checkStatus", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('callback'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-verify')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "handleCallback", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-verify')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "handleWebhook", null);
__decorate([
    (0, common_1.Post)('refund'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refund_payment_dto_1.RefundPaymentDto]),
    __metadata("design:returntype", Promise)
], PhonepeController.prototype, "refundPayment", null);
exports.PhonepeController = PhonepeController = __decorate([
    (0, common_1.Controller)('payments/phonepe'),
    __metadata("design:paramtypes", [phonepe_service_1.PhonepeService])
], PhonepeController);
//# sourceMappingURL=phonepe.controller.js.map