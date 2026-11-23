import { PrismaService } from '../prisma/prisma.service';
export interface SyncedInstagramReel {
    url: string;
    thumbnailUrl?: string;
    linkUrl?: string;
    caption?: string;
    mediaType?: 'VIDEO' | 'IMAGE';
    timestamp?: string;
}
export declare class SystemSettingsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getAllSettings(): Promise<Record<string, string>>;
    getSetting(key: string): Promise<string | null>;
    setSetting(key: string, value: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        key: string;
        value: string;
    }>;
    scheduledInstagramFeedSync(): Promise<void>;
    private validateExternalFeedUrl;
    syncInstagramFeed(feedUrlOverride?: string): Promise<{
        success: boolean;
        count: number;
        totalPostsInFeed: number;
        lastSync: string;
        reels: SyncedInstagramReel[];
    }>;
    disconnectInstagramFeed(): Promise<{
        success: boolean;
    }>;
}
