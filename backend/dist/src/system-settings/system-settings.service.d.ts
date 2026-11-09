import { PrismaService } from '../prisma/prisma.service';
export declare class SystemSettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllSettings(): Promise<Record<string, string>>;
    getSetting(key: string): Promise<string | null>;
    setSetting(key: string, value: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        key: string;
        value: string;
    }>;
}
