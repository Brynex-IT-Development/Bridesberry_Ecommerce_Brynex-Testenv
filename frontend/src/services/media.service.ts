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
 * Uploads a file to S3 storage via a secure backend-generated presigned URL.
 * Falls back to local dev mock upload if AWS is not configured.
 * 
 * @param file The file to upload
 * @param folder Target folder prefix
 */
export async function uploadFile(file: File, folder: MediaFolder): Promise<string> {
  // 1. Try direct S3 presigned upload first (AWS best practice)
  try {
    const data = await apiFetch<PresignedResponse>("/api/media/presigned-url", {
      method: "POST",
      body: JSON.stringify({
        folder,
        filename: file.name,
        contentType: file.type,
      }),
    });

    const response = await fetch(data.uploadUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
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
  });

  return fallbackRes.fileUrl;
}
