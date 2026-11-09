import { SystemSettingsService } from './system-settings.service';
export declare class UpdateSettingDto {
    key: string;
    value: string;
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
}
