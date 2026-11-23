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
var SystemSettingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemSettingsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let SystemSettingsService = SystemSettingsService_1 = class SystemSettingsService {
    prisma;
    logger = new common_1.Logger(SystemSettingsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllSettings() {
        const settings = await this.prisma.systemSetting.findMany();
        return settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {});
    }
    async getSetting(key) {
        const setting = await this.prisma.systemSetting.findUnique({
            where: { key },
        });
        return setting ? setting.value : null;
    }
    async setSetting(key, value) {
        return this.prisma.systemSetting.upsert({
            where: { key },
            update: { value },
            create: { key, value },
        });
    }
    async scheduledInstagramFeedSync() {
        try {
            const feedUrl = await this.getSetting('instagram_feed_url');
            if (!feedUrl || !feedUrl.trim())
                return;
            await this.syncInstagramFeed(feedUrl.trim());
        }
        catch (err) {
            this.logger.warn(`Scheduled Instagram feed sync failed: ${err?.message || err}`);
        }
    }
    validateExternalFeedUrl(rawUrl) {
        const trimmed = rawUrl.trim();
        let parsed;
        try {
            parsed = new URL(trimmed);
        }
        catch {
            throw new common_1.BadRequestException('Please enter a valid HTTPS feed URL (e.g. https://feeds.behold.so/YOUR_ID).');
        }
        if (parsed.protocol !== 'https:') {
            throw new common_1.BadRequestException('Feed URL must use HTTPS.');
        }
        const host = parsed.hostname.toLowerCase();
        if (host === 'localhost' ||
            host === '127.0.0.1' ||
            host === '0.0.0.0' ||
            host.startsWith('10.') ||
            host.startsWith('192.168.') ||
            host.startsWith('169.254.') ||
            /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) {
            throw new common_1.BadRequestException('Private or local network URLs are not allowed.');
        }
        return parsed.toString();
    }
    async syncInstagramFeed(feedUrlOverride) {
        const rawUrl = feedUrlOverride !== undefined
            ? feedUrlOverride
            : (await this.getSetting('instagram_feed_url')) || '';
        if (!rawUrl.trim()) {
            throw new common_1.BadRequestException('No Instagram JSON feed URL configured.');
        }
        const feedUrl = this.validateExternalFeedUrl(rawUrl);
        await this.setSetting('instagram_feed_url', feedUrl);
        try {
            const res = await fetch(feedUrl, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                signal: AbortSignal.timeout(10000),
            });
            if (!res.ok) {
                const errText = (await res.text()).slice(0, 200);
                throw new Error(`Feed returned HTTP ${res.status}: ${errText || res.statusText}`);
            }
            const payload = await res.json();
            const rawPosts = Array.isArray(payload)
                ? payload
                : Array.isArray(payload?.posts)
                    ? payload.posts
                    : Array.isArray(payload?.data)
                        ? payload.data
                        : [];
            const normalized = rawPosts
                .map((post) => {
                const mediaTypeRaw = String(post?.mediaType || post?.media_type || '').toUpperCase();
                const isReel = Boolean(post?.isReel) ||
                    mediaTypeRaw === 'VIDEO' ||
                    String(post?.permalink || '').includes('/reel/');
                const mediaUrl = post?.mediaUrl ||
                    post?.media_url ||
                    post?.sizes?.large?.mediaUrl ||
                    post?.sizes?.medium?.mediaUrl ||
                    post?.url ||
                    '';
                const thumbnailUrl = post?.thumbnailUrl ||
                    post?.thumbnail_url ||
                    post?.sizes?.medium?.mediaUrl ||
                    post?.sizes?.small?.mediaUrl ||
                    '';
                const permalink = post?.permalink || post?.linkUrl || '';
                if (!mediaUrl && !permalink)
                    return null;
                return {
                    url: mediaUrl || permalink,
                    thumbnailUrl: thumbnailUrl || undefined,
                    linkUrl: permalink || undefined,
                    caption: typeof post?.caption === 'string' ? post.caption.slice(0, 140) : undefined,
                    mediaType: isReel ? 'VIDEO' : 'IMAGE',
                    timestamp: post?.timestamp || undefined,
                };
            })
                .filter((item) => item !== null);
            const videoReels = normalized.filter((item) => item.mediaType === 'VIDEO');
            const selected = (videoReels.length > 0 ? videoReels : normalized).slice(0, 12);
            const now = new Date().toISOString();
            await Promise.all([
                this.setSetting('instagram_feed_reels', JSON.stringify(selected)),
                this.setSetting('instagram_feed_last_sync', now),
                this.setSetting('instagram_feed_error', ''),
            ]);
            this.logger.log(`Synced ${selected.length} Instagram reels from ${feedUrl}`);
            return {
                success: true,
                count: selected.length,
                totalPostsInFeed: rawPosts.length,
                lastSync: now,
                reels: selected,
            };
        }
        catch (err) {
            const msg = err?.message || 'Failed to fetch Instagram feed';
            this.logger.warn(`Instagram feed sync error (${feedUrl}): ${msg}`);
            await this.setSetting('instagram_feed_error', msg);
            throw new common_1.BadRequestException(`Failed to sync Instagram feed: ${msg}`);
        }
    }
    async disconnectInstagramFeed() {
        await Promise.all([
            this.setSetting('instagram_feed_url', ''),
            this.setSetting('instagram_feed_reels', '[]'),
            this.setSetting('instagram_feed_last_sync', ''),
            this.setSetting('instagram_feed_error', ''),
        ]);
        return { success: true };
    }
};
exports.SystemSettingsService = SystemSettingsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemSettingsService.prototype, "scheduledInstagramFeedSync", null);
exports.SystemSettingsService = SystemSettingsService = SystemSettingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SystemSettingsService);
//# sourceMappingURL=system-settings.service.js.map