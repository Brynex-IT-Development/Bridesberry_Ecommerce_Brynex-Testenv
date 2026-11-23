import { apiFetch } from "./api";

export interface SyncedInstagramReel {
  url: string;
  thumbnailUrl?: string;
  linkUrl?: string;
  caption?: string;
  mediaType?: "VIDEO" | "IMAGE";
  timestamp?: string;
}

export interface InstagramFeedSyncResult {
  success: boolean;
  count: number;
  totalPostsInFeed: number;
  lastSync: string;
  reels: SyncedInstagramReel[];
}

export async function getSystemSettings(): Promise<Record<string, string>> {
  try {
    return await apiFetch<Record<string, string>>("/api/system-settings", {
      method: "GET",
      timeout: 5000,
      next: { revalidate: 60 },
    });
  } catch {
    return {};
  }
}

export async function saveSystemSetting(key: string, value: string): Promise<any> {
  return apiFetch("/api/system-settings", {
    method: "PUT",
    body: JSON.stringify({ key, value }),
  });
}

function parseBeholdPayload(payload: any): { selected: SyncedInstagramReel[]; total: number } {
  const rawPosts: any[] = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.posts)
      ? payload.posts
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

  const normalized: SyncedInstagramReel[] = rawPosts
    .map((post): SyncedInstagramReel | null => {
      const mediaTypeRaw = String(post?.mediaType || post?.media_type || "").toUpperCase();
      const isReel =
        Boolean(post?.isReel) ||
        mediaTypeRaw === "VIDEO" ||
        String(post?.permalink || "").includes("/reel/");

      const mediaUrl =
        post?.mediaUrl ||
        post?.media_url ||
        post?.sizes?.large?.mediaUrl ||
        post?.sizes?.medium?.mediaUrl ||
        post?.url ||
        "";

      const thumbnailUrl =
        post?.thumbnailUrl ||
        post?.thumbnail_url ||
        post?.sizes?.medium?.mediaUrl ||
        post?.sizes?.small?.mediaUrl ||
        "";

      const permalink = post?.permalink || post?.linkUrl || "";

      if (!mediaUrl && !permalink) return null;

      return {
        url: mediaUrl || permalink,
        thumbnailUrl: thumbnailUrl || undefined,
        linkUrl: permalink || undefined,
        caption: typeof post?.caption === "string" ? post.caption.slice(0, 140) : undefined,
        mediaType: isReel ? "VIDEO" : "IMAGE",
        timestamp: post?.timestamp || undefined,
      };
    })
    .filter((item): item is SyncedInstagramReel => item !== null);

  const videoReels = normalized.filter((item) => item.mediaType === "VIDEO");
  const selected = (videoReels.length > 0 ? videoReels : normalized).slice(0, 12);
  return { selected, total: rawPosts.length };
}

export async function syncInstagramFeed(feedUrl?: string): Promise<InstagramFeedSyncResult> {
  try {
    return await apiFetch<InstagramFeedSyncResult>("/api/system-settings/instagram/sync", {
      method: "POST",
      body: JSON.stringify(feedUrl !== undefined ? { feedUrl } : {}),
      timeout: 15000,
    });
  } catch (err: any) {
    // Graceful fallback if the running backend hasn't been restarted with the new route yet
    const msg = String(err?.message || "");
    if (feedUrl && (msg.includes("Cannot POST") || msg.includes("404"))) {
      const trimmed = feedUrl.trim();
      const res = await fetch(trimmed, { headers: { Accept: "application/json" } });
      if (!res.ok) {
        throw new Error(`Behold feed returned HTTP ${res.status}`);
      }
      const payload = await res.json();
      const { selected, total } = parseBeholdPayload(payload);
      const now = new Date().toISOString();

      await Promise.all([
        saveSystemSetting("instagram_feed_url", trimmed),
        saveSystemSetting("instagram_feed_reels", JSON.stringify(selected)),
        saveSystemSetting("instagram_feed_last_sync", now),
        saveSystemSetting("instagram_feed_error", ""),
      ]);

      return {
        success: true,
        count: selected.length,
        totalPostsInFeed: total,
        lastSync: now,
        reels: selected,
      };
    }
    throw err;
  }
}

export async function disconnectInstagramFeed(): Promise<{ success: boolean }> {
  try {
    return await apiFetch<{ success: boolean }>("/api/system-settings/instagram/disconnect", {
      method: "POST",
    });
  } catch (err: any) {
    const msg = String(err?.message || "");
    if (msg.includes("Cannot POST") || msg.includes("404")) {
      await Promise.all([
        saveSystemSetting("instagram_feed_url", ""),
        saveSystemSetting("instagram_feed_reels", "[]"),
        saveSystemSetting("instagram_feed_last_sync", ""),
        saveSystemSetting("instagram_feed_error", ""),
      ]);
      return { success: true };
    }
    throw err;
  }
}
