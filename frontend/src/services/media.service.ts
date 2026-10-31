import { apiFetch } from "./api";

export type MediaFolder =
  | "products/images"
  | "products/videos"
  | "categories"
  | "banners"
  | "vendors/documents"
  | "users";

export interface PresignedResponse {
  uploadUrl: string;
  fileUrl: string;
  key: string;
}

/**
 * Optimizes large images (> 2MB) in-browser before uploading to prevent
 * proxy gateway timeouts, Vercel payload limits, and mobile upload stalls.
 */
async function optimizeImageForUpload(file: File): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!file.type.startsWith("image/") || file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }
  // If file is already reasonably sized (< 2.5MB), upload directly as is
  if (file.size <= 2.5 * 1024 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const MAX_WIDTH = 2560;
      const MAX_HEIGHT = 2560;
      let { width, height } = img;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        if (width > height) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else {
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve(file);
          } else {
            const cleanName = file.name.replace(/\.[^/.]+$/, ".jpg");
            const optimizedFile = new File([blob], cleanName, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(optimizedFile);
          }
        },
        "image/jpeg",
        0.88
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file);
    };

    img.src = objectUrl;
  });
}

/**
 * Uploads a file to S3 storage via a secure backend-generated presigned URL.
 * Falls back to the backend upload proxy if direct S3 PUT is blocked by CORS.
 * 
 * @param rawFile The file to upload
 * @param folder Target folder prefix
 */
export async function uploadFile(rawFile: File, folder: MediaFolder): Promise<string> {
  const file = await optimizeImageForUpload(rawFile);

  // 1. Try direct S3 presigned upload first (AWS best practice)
  try {
    const data = await apiFetch<PresignedResponse>("/api/media/presigned-url", {
      method: "POST",
      body: JSON.stringify({
        folder,
        filename: file.name,
        contentType: file.type || "image/jpeg",
      }),
      timeout: 30000,
    });

    const response = await fetch(data.uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type || "image/jpeg",
      },
    });

    if (response.ok) {
      return data.fileUrl;
    }
    console.warn("Direct S3 PUT responded with status:", response.status, response.statusText);
  } catch (putErr) {
    console.warn("Direct S3 PUT failed (likely S3 CORS or network), falling back to backend upload proxy:", putErr);
  }

  // 2. Resilient fallback: Upload directly via backend multipart endpoint (bypasses any browser S3 CORS block)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const fallbackRes = await apiFetch<{ fileUrl: string; key: string }>("/api/media/upload", {
    method: "POST",
    body: formData,
    timeout: 120000, // Generous 2-minute timeout for large banner uploads
  });

  return fallbackRes.fileUrl;
}
