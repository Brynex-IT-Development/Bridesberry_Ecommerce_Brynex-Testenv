import { SystemSettingsService } from './system-settings.service';
export declare class UpdateSettingDto {
    key: string;
    value: string;
}
export declare class SyncInstagramFeedDto {
    feedUrl?: string;
}
export declare class SystemSettingsController {
    private readonly settingsService;
    constructor(settingsService: SystemSettingsService);
    getSettings(): Promise<Record<string, string>>;
    updateSetting(dto: UpdateSettingDto): Promise<{
        createdAt: Date;
        updatedAt: Date;
        key: string;
        value: string;
    }>;
    syncInstagramFeed(dto: SyncInstagramFeedDto): Promise<{
        success: boolean;
        count: number;
        totalPostsInFeed: number;
        lastSync: string;
        reels: import("./system-settings.service").SyncedInstagramReel[];
    }>;
    disconnectInstagramFeed(): Promise<{
        success: boolean;
    }>;
}
