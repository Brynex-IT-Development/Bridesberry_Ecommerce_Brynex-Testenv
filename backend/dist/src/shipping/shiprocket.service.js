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
var ShiprocketService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiprocketService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const system_settings_service_1 = require("../system-settings/system-settings.service");
let ShiprocketService = ShiprocketService_1 = class ShiprocketService {
    configService;
    systemSettingsService;
    logger = new common_1.Logger(ShiprocketService_1.name);
    token = null;
    tokenExpiresAt = 0;
    constructor(configService, systemSettingsService) {
        this.configService = configService;
        this.systemSettingsService = systemSettingsService;
    }
    getBaseUrl() {
        return (this.configService.get('SHIPROCKET_BASE_URL') ||
            'https://apiv2.shiprocket.in/v1/external');
    }
    async getCredentials() {
        const dbEmail = await this.systemSettingsService.getSetting('shipping.shiprocket_email');
        const dbPass = await this.systemSettingsService.getSetting('shipping.shiprocket_password');
        const email = dbEmail || this.configService.get('SHIPROCKET_EMAIL') || '';
        const pass = dbPass || this.configService.get('SHIPROCKET_PASSWORD') || '';
        return { email, pass };
    }
    async authenticate(forceRefresh = false) {
        const now = Date.now();
        if (!forceRefresh && this.token && this.tokenExpiresAt > now + 60000) {
            return this.token;
        }
        const { email, pass } = await this.getCredentials();
        if (!email || !pass) {
            this.logger.warn('Shiprocket email or password not configured.');
            throw new common_1.HttpException('Shiprocket credentials are missing. Please configure them in Settings -> Shipping.', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            const baseUrl = this.getBaseUrl();
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pass }),
            });
            if (!response.ok) {
                const errText = await response.text();
                this.logger.error(`Shiprocket auth failed: HTTP ${response.status} - ${errText}`);
                throw new common_1.HttpException(`Shiprocket authentication failed (Status ${response.status}). Check credentials.`, common_1.HttpStatus.UNAUTHORIZED);
            }
            const data = (await response.json());
            if (!data.token) {
                throw new common_1.HttpException('Shiprocket response did not contain an authentication token.', common_1.HttpStatus.UNAUTHORIZED);
            }
            this.token = data.token;
            this.tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
            this.logger.log('Shiprocket authentication successful. Token cached in memory.');
            return this.token;
        }
        catch (error) {
            if (error instanceof common_1.HttpException)
                throw error;
            this.logger.error(`Shiprocket connection error during auth: ${error.message}`);
            throw new common_1.HttpException('Unable to connect to Shiprocket API.', common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
    async request(endpoint, options = {}) {
        let token = await this.authenticate();
        const baseUrl = this.getBaseUrl();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            ...options.headers,
        };
        let response = await fetch(`${baseUrl}${endpoint}`, {
            ...options,
            headers,
        });
        if (response.status === 401) {
            this.logger.warn('Shiprocket returned 401 Unauthorized. Refreshing token and retrying...');
            token = await this.authenticate(true);
            headers.Authorization = `Bearer ${token}`;
            response = await fetch(`${baseUrl}${endpoint}`, {
                ...options,
                headers,
            });
        }
        if (!response.ok) {
            const errorText = await response.text();
            this.logger.error(`Shiprocket API Error [${options.method || 'GET'} ${endpoint}]: HTTP ${response.status} - ${errorText}`);
            throw new common_1.HttpException(`Shiprocket API Error (${response.status}): ${errorText.substring(0, 200)}`, common_1.HttpStatus.BAD_REQUEST);
        }
        return (await response.json());
    }
    async checkServiceability(params) {
        const query = new URLSearchParams({
            pickup_postcode: params.pickup_postcode,
            delivery_postcode: params.delivery_postcode,
            weight: String(params.weight),
            cod: String(params.cod),
        });
        if (params.length)
            query.append('length', String(params.length));
        if (params.width)
            query.append('width', String(params.width));
        if (params.height)
            query.append('height', String(params.height));
        if (params.declared_value)
            query.append('declared_value', String(params.declared_value));
        return this.request(`/courier/serviceability/?${query.toString()}`);
    }
    async createOrder(payload) {
        return this.request('/orders/create/adhoc', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
    async assignAwb(payload) {
        return this.request('/courier/assign/awb', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    }
    async requestPickup(shipmentId) {
        return this.request('/courier/generate/pickup', {
            method: 'POST',
            body: JSON.stringify({ shipment_id: [shipmentId] }),
        });
    }
    async generateLabel(shipmentId) {
        return this.request('/courier/generate/label', {
            method: 'POST',
            body: JSON.stringify({ shipment_id: [shipmentId] }),
        });
    }
    async generateInvoice(orderId) {
        return this.request('/orders/print/invoice', {
            method: 'POST',
            body: JSON.stringify({ ids: [orderId] }),
        });
    }
    async generateManifest(shipmentId) {
        return this.request('/manifests/generate', {
            method: 'POST',
            body: JSON.stringify({ shipment_id: [shipmentId] }),
        });
    }
    async trackByAwb(awb) {
        return this.request(`/courier/track/awb/${awb}`);
    }
    async trackByShipmentId(shipmentId) {
        return this.request(`/courier/track/shipment/${shipmentId}`);
    }
    async cancelOrder(shiprocketOrderId) {
        return this.request('/orders/cancel', {
            method: 'POST',
            body: JSON.stringify({ ids: [shiprocketOrderId] }),
        });
    }
};
exports.ShiprocketService = ShiprocketService;
exports.ShiprocketService = ShiprocketService = ShiprocketService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        system_settings_service_1.SystemSettingsService])
], ShiprocketService);
//# sourceMappingURL=shiprocket.service.js.map