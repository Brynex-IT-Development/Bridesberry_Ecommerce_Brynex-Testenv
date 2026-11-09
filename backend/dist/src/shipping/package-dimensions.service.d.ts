import { PrismaService } from '../prisma/prisma.service';
export interface ResolvedPackageDimensions {
    length: number;
    width: number;
    height: number;
    weight: number;
    source: 'PRODUCT' | 'CATEGORY' | 'SETTINGS';
}
export declare class PackageDimensionsService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    resolveOrderDimensions(orderId: string, defaultSettings: {
        length: number;
        width: number;
        height: number;
        weight: number;
    }): Promise<ResolvedPackageDimensions>;
}
