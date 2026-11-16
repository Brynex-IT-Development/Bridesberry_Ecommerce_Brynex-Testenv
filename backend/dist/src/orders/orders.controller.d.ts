import { UserRole } from '../generated/prisma/client.js';
import { OrdersService, CreateOrderDto, CreateOrderItemDto } from './orders.service';
declare class CreateOrderItemBodyDto implements CreateOrderItemDto {
    productId: string;
    variantId?: string;
    name: string;
    sku: string;
    variantName?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderBodyDto implements CreateOrderDto {
    subtotal: number;
    taxTotal: number;
    shippingCharge?: number;
    discountAmount?: number;
    total: number;
    shippingAddress: any;
    billingAddress: any;
    customerId?: string;
    notes?: string;
    items: CreateOrderItemBodyDto[];
}
export declare class UpdateOrderStatusBodyDto {
    status: string;
}
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(dto: CreateOrderBodyDto, user: any): Promise<{
        items: {
            name: string;
            id: string;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        notes: string | null;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
    getMyOrders(user: any): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    productId: string;
                    isPrimary: boolean;
                    url: string;
                    altText: string | null;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    sortOrder: number;
                }[];
            } & {
                name: string;
                id: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                sku: string;
                slug: string;
                shortDescription: string | null;
                description: string | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                mrp: import("@prisma/client-runtime-utils").Decimal | null;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
                featured: boolean;
                newArrival: boolean;
                bestSeller: boolean;
                showOnHomepage: boolean;
                occasion: string;
                gender: string;
                material: string | null;
                collection: string | null;
                packageLength: number | null;
                packageWidth: number | null;
                packageHeight: number | null;
                packageWeight: number | null;
                categoryId: string | null;
            };
        } & {
            name: string;
            id: string;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            variantId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        notes: string | null;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    })[]>;
    getAdminOrders(): Promise<({
        customer: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        items: {
            name: string;
            id: string;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        notes: string | null;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    })[]>;
    getOrderDetails(id: string, user: any): Promise<{
        customer: {
            id: string;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: UserRole;
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    productId: string;
                    isPrimary: boolean;
                    url: string;
                    altText: string | null;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    sortOrder: number;
                }[];
            } & {
                name: string;
                id: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                sku: string;
                slug: string;
                shortDescription: string | null;
                description: string | null;
                sellingPrice: import("@prisma/client-runtime-utils").Decimal;
                mrp: import("@prisma/client-runtime-utils").Decimal | null;
                costPrice: import("@prisma/client-runtime-utils").Decimal | null;
                featured: boolean;
                newArrival: boolean;
                bestSeller: boolean;
                showOnHomepage: boolean;
                occasion: string;
                gender: string;
                material: string | null;
                collection: string | null;
                packageLength: number | null;
                packageWidth: number | null;
                packageHeight: number | null;
                packageWeight: number | null;
                categoryId: string | null;
            };
        } & {
            name: string;
            id: string;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            variantId: string | null;
            orderId: string;
        })[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        notes: string | null;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
    updateOrderStatus(id: string, dto: UpdateOrderStatusBodyDto, admin: any): Promise<{
        items: {
            name: string;
            id: string;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            productId: string;
            variantId: string | null;
            orderId: string;
        }[];
    } & {
        id: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerId: string;
        paymentStatus: string;
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        notes: string | null;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    }>;
}
export {};
