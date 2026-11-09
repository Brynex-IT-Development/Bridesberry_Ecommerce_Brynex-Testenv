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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_js_1 = require("../generated/prisma/client.js");
let CustomersService = class CustomersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const now = new Date();
        const customers = await this.prisma.user.findMany({
            where: {
                role: client_js_1.UserRole.CUSTOMER,
            },
            include: {
                sessions: {
                    where: {
                        expiresAt: { gt: now },
                    },
                    orderBy: {
                        lastActiveAt: 'desc',
                    },
                    take: 5,
                },
                orders: {
                    where: {
                        status: {
                            in: ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'],
                        },
                    },
                    select: {
                        total: true,
                    },
                },
                _count: {
                    select: {
                        orders: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return customers.map((c) => {
            const totalSpend = c.orders.reduce((sum, order) => sum + Number(order.total), 0);
            const latestSession = c.sessions[0];
            const isOnline = latestSession
                ? latestSession.lastActiveAt >= fifteenMinsAgo
                : false;
            return {
                id: c.id,
                email: c.email,
                firstName: c.firstName,
                lastName: c.lastName,
                status: c.status,
                createdAt: c.createdAt,
                joinedDate: c.createdAt,
                orderCount: c._count.orders,
                totalSpend,
                isOnline,
                lastActiveAt: latestSession?.lastActiveAt || null,
                activeSessionsCount: c.sessions.length,
                currentDevice: latestSession?.userAgent || null,
                currentIp: latestSession?.ipAddress || null,
            };
        });
    }
    async findOne(id) {
        const customer = await this.prisma.user.findFirst({
            where: {
                id,
                role: client_js_1.UserRole.CUSTOMER,
            },
            include: {
                orders: {
                    orderBy: { createdAt: 'desc' },
                },
                addresses: true,
                sessions: {
                    where: {
                        expiresAt: { gt: new Date() },
                    },
                    orderBy: {
                        lastActiveAt: 'desc',
                    },
                },
            },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID ${id} not found.`);
        }
        const activeOrders = customer.orders.filter((o) => ['CONFIRMED', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED'].includes(o.status));
        const totalSpend = activeOrders.reduce((sum, order) => sum + Number(order.total), 0);
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const latestSession = customer.sessions[0];
        const isOnline = latestSession
            ? latestSession.lastActiveAt >= fifteenMinsAgo
            : false;
        return {
            id: customer.id,
            email: customer.email,
            firstName: customer.firstName,
            lastName: customer.lastName,
            status: customer.status,
            createdAt: customer.createdAt,
            joinedDate: customer.createdAt,
            orderCount: customer.orders.length,
            totalSpend,
            isOnline,
            lastActiveAt: latestSession?.lastActiveAt || null,
            orders: customer.orders,
            addresses: customer.addresses,
            sessions: customer.sessions.map((s) => ({
                id: s.id,
                userAgent: s.userAgent,
                ipAddress: s.ipAddress,
                lastActiveAt: s.lastActiveAt,
                createdAt: s.createdAt,
                expiresAt: s.expiresAt,
                isOnline: s.lastActiveAt >= fifteenMinsAgo,
            })),
        };
    }
    async getActiveSessions() {
        const now = new Date();
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        const sessions = await this.prisma.refreshSession.findMany({
            where: {
                expiresAt: { gt: now },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                        role: true,
                        status: true,
                        _count: {
                            select: { orders: true },
                        },
                    },
                },
            },
            orderBy: {
                lastActiveAt: 'desc',
            },
        });
        return sessions.map((s) => ({
            id: s.id,
            userId: s.userId,
            user: {
                id: s.user.id,
                email: s.user.email,
                name: `${s.user.firstName || ''} ${s.user.lastName || ''}`.trim() || s.user.email,
                role: s.user.role,
                status: s.user.status,
                orderCount: s.user._count.orders,
            },
            ipAddress: s.ipAddress,
            userAgent: s.userAgent,
            lastActiveAt: s.lastActiveAt,
            createdAt: s.createdAt,
            expiresAt: s.expiresAt,
            isOnline: s.lastActiveAt >= fifteenMinsAgo,
        }));
    }
    async revokeSession(sessionId) {
        await this.prisma.refreshSession.delete({
            where: { id: sessionId },
        });
        return { success: true, message: 'Session revoked successfully.' };
    }
    async revokeAllUserSessions(userId) {
        await this.prisma.refreshSession.deleteMany({
            where: { userId },
        });
        return { success: true, message: 'All user sessions revoked successfully.' };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map