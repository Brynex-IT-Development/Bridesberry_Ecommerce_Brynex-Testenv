import { UserRole } from '../generated/prisma/client.js';
import { OrdersService, CreateOrderDto, CreateOrderItemDto } from './orders.service';
import { RootfinSyncService } from './rootfin-sync.service';
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
    private readonly rootfinSyncService;
    constructor(ordersService: OrdersService, rootfinSyncService: RootfinSyncService);
    testRootfinSync(body: any): Promise<import("./rootfin-sync.service").RootfinSyncResult>;
    syncOrderToRootfin(id: string): Promise<import("./rootfin-sync.service").RootfinSyncResult>;
    createOrder(dto: CreateOrderBodyDto, user: any): Promise<{
        items: {
            name: string;
            productId: string;
            variantId: string | null;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            orderId: string;
        }[];
    } & {
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        customerId: string;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        orderNumber: string;
        paymentStatus: string;
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
                    productId: string;
                    createdAt: Date;
                    id: string;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    sortOrder: number;
                }[];
            } & {
                name: string;
                sku: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                id: string;
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
            productId: string;
            variantId: string | null;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            orderId: string;
        })[];
    } & {
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        customerId: string;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    })[]>;
    getAdminOrders(): Promise<({
        items: ({
            product: {
                images: {
                    productId: string;
                    createdAt: Date;
                    id: string;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    sortOrder: number;
                }[];
            } & {
                name: string;
                sku: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                id: string;
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
            productId: string;
            variantId: string | null;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            orderId: string;
        })[];
        customer: {
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: UserRole;
        };
    } & {
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        customerId: string;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string | null;
        paymentProvider: string | null;
        phonepeTransactionId: string | null;
        merchantTransactionId: string | null;
        paymentReference: string | null;
        paymentCompletedAt: Date | null;
        paymentResponse: string | null;
    })[]>;
    getOrderDetails(id: string, user: any): Promise<{
        items: ({
            product: {
                images: {
                    productId: string;
                    createdAt: Date;
                    id: string;
                    url: string;
                    altText: string | null;
                    isPrimary: boolean;
                    imageRole: import("../generated/prisma/enums").ProductImageRole;
                    sortOrder: number;
                }[];
            } & {
                name: string;
                sku: string;
                status: import("../generated/prisma/enums").ProductStatus;
                createdAt: Date;
                updatedAt: Date;
                id: string;
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
            productId: string;
            variantId: string | null;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            orderId: string;
        })[];
        customer: {
            status: import("../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
            id: string;
            email: string;
            passwordHash: string;
            firstName: string | null;
            lastName: string | null;
            role: UserRole;
        };
    } & {
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        customerId: string;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        orderNumber: string;
        paymentStatus: string;
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
            productId: string;
            variantId: string | null;
            sku: string;
            variantName: string | null;
            quantity: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            id: string;
            orderId: string;
        }[];
    } & {
        subtotal: import("@prisma/client-runtime-utils").Decimal;
        taxTotal: import("@prisma/client-runtime-utils").Decimal;
        shippingCharge: import("@prisma/client-runtime-utils").Decimal;
        discountAmount: import("@prisma/client-runtime-utils").Decimal;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        billingAddress: import("@prisma/client/runtime/client").JsonValue | null;
        customerId: string;
        notes: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: string;
        orderNumber: string;
        paymentStatus: string;
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
