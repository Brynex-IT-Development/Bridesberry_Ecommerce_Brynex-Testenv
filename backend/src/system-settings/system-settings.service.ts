import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

export interface SyncedInstagramReel {
  url: string;
  thumbnailUrl?: string;
  linkUrl?: string;
  caption?: string;
  mediaType?: 'VIDEO' | 'IMAGE';
  timestamp?: string;
}

@Injectable()
export class SystemSettingsService {
  private readonly logger = new Logger(SystemSettingsService.name);

  constructor(private prisma: PrismaService) {}

  async getAllSettings() {
    const settings = await this.prisma.systemSetting.findMany();
    return settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);
  }

  async getSetting(key: string): Promise<string | null> {
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key },
    });
    return setting ? setting.value : null;
  }

  async setSetting(key: string, value: string) {
    return this.prisma.systemSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }

  /**
   * Automatically refreshes the connected Instagram JSON feed (e.g. Behold.so)
   * every 30 minutes so newly posted Reels appear automatically without burning
   * client-side view quotas.
   */
  @Cron(CronExpression.EVERY_30_MINUTES)
  async scheduledInstagramFeedSync() {
    try {
      const feedUrl = await this.getSetting('instagram_feed_url');
      if (!feedUrl || !feedUrl.trim()) return;
      await this.syncInstagramFeed(feedUrl.trim());
    } catch (err: any) {
      this.logger.warn(`Scheduled Instagram feed sync failed: ${err?.message || err}`);
    }
  }

  private validateExternalFeedUrl(rawUrl: string): string {
    const trimmed = rawUrl.trim();
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new BadRequestException('Please enter a valid HTTPS feed URL (e.g. https://feeds.behold.so/YOUR_ID).');
    }

    if (parsed.protocol !== 'https:') {
      throw new BadRequestException('Feed URL must use HTTPS.');
    }

    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      host.startsWith('169.254.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      throw new BadRequestException('Private or local network URLs are not allowed.');
    }

    return parsed.toString();
  }

  async syncInstagramFeed(feedUrlOverride?: string) {
    const rawUrl = feedUrlOverride !== undefined
      ? feedUrlOverride
      : (await this.getSetting('instagram_feed_url')) || '';

    if (!rawUrl.trim()) {
      throw new BadRequestException('No Instagram JSON feed URL configured.');
    }

    const feedUrl = this.validateExternalFeedUrl(rawUrl);

    // Persist the configured feed URL first
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

      const payload: any = await res.json();

      // Behold.so v2 returns { posts: [...] }; legacy/generic feeds may return [...] or { data: [...] }
      const rawPosts: any[] = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.posts)
          ? payload.posts
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

      const normalized: SyncedInstagramReel[] = rawPosts
        .map((post): SyncedInstagramReel | null => {
          const mediaTypeRaw = String(post?.mediaType || post?.media_type || '').toUpperCase();
          const isReel =
            Boolean(post?.isReel) ||
            mediaTypeRaw === 'VIDEO' ||
            String(post?.permalink || '').includes('/reel/');

          // Behold provides mediaUrl (direct MP4 for videos, image URL for photos) & thumbnailUrl
          const mediaUrl =
            post?.mediaUrl ||
            post?.media_url ||
            post?.sizes?.large?.mediaUrl ||
            post?.sizes?.medium?.mediaUrl ||
            post?.url ||
            '';

          const thumbnailUrl =
            post?.thumbnailUrl ||
            post?.thumbnail_url ||
            post?.sizes?.medium?.mediaUrl ||
            post?.sizes?.small?.mediaUrl ||
            '';

          const permalink = post?.permalink || post?.linkUrl || '';

          if (!mediaUrl && !permalink) return null;

          return {
            url: mediaUrl || permalink,
            thumbnailUrl: thumbnailUrl || undefined,
            linkUrl: permalink || undefined,
            caption: typeof post?.caption === 'string' ? post.caption.slice(0, 140) : undefined,
            mediaType: isReel ? 'VIDEO' : 'IMAGE',
            timestamp: post?.timestamp || undefined,
          };
        })
        .filter((item): item is SyncedInstagramReel => item !== null);

      // Prefer Reels/Videos; if the account hasn't posted videos yet, fall back to all posts
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
    } catch (err: any) {
      const msg = err?.message || 'Failed to fetch Instagram feed';
      this.logger.warn(`Instagram feed sync error (${feedUrl}): ${msg}`);
      await this.setSetting('instagram_feed_error', msg);
      throw new BadRequestException(`Failed to sync Instagram feed: ${msg}`);
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
}
