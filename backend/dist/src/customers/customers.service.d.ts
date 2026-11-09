import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '../generated/prisma/client.js';
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        joinedDate: Date;
        orderCount: number;
        totalSpend: number;
        isOnline: boolean;
        lastActiveAt: Date;
        activeSessionsCount: number;
        currentDevice: string | null;
        currentIp: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        firstName: string | null;
        lastName: string | null;
        status: import("../generated/prisma/enums").UserStatus;
        createdAt: Date;
        joinedDate: Date;
        orderCount: number;
        totalSpend: number;
        isOnline: boolean;
        lastActiveAt: Date;
        orders: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            subtotal: import("@prisma/client-runtime-utils").Decimal;
            discountAmount: import("@prisma/client-runtime-utils").Decimal;
            taxTotal: import("@prisma/client-runtime-utils").Decimal;
            total: import("@prisma/client-runtime-utils").Decimal;
            notes: string | null;
            orderNumber: string;
            customerId: string;
            paymentStatus: string;
            shippingCharge: import("@prisma/client-runtime-utils").Decimal;
            shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
            billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
            paymentMethod: string | null;
            paymentProvider: string | null;
            phonepeTransactionId: string | null;
            merchantTransactionId: string | null;
            paymentReference: string | null;
            paymentCompletedAt: Date | null;
            paymentResponse: string | null;
        }[];
        addresses: {
            id: string;
            createdAt: Date;
            type: string;
            userId: string;
            street1: string;
            street2: string | null;
            city: string;
            state: string;
            zipCode: string;
            phone: string | null;
            country: string;
        }[];
        sessions: {
            id: string;
            userAgent: string | null;
            ipAddress: string | null;
            lastActiveAt: Date;
            createdAt: Date;
            expiresAt: Date;
            isOnline: boolean;
        }[];
    }>;
    getActiveSessions(): Promise<{
        id: string;
        userId: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            orderCount: number;
        };
        ipAddress: string | null;
        userAgent: string | null;
        lastActiveAt: Date;
        createdAt: Date;
        expiresAt: Date;
        isOnline: boolean;
    }[]>;
    revokeSession(sessionId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    revokeAllUserSessions(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
