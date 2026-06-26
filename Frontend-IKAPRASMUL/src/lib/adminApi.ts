// Client-side calls to the same-origin admin BFF proxy (app/api/admin/[...path]).
// Uses the shared axios client — interceptors handle 401 redirects and normalise
// error messages so callers just catch plain Error instances.

import { client } from "@/lib/api";

export async function saveResource<T>(resourcePath: string, draft: unknown): Promise<T> {
  const { data } = await client.post<T>(`/api/admin/${resourcePath}`, draft);
  return data;
}

export async function deleteResource(resourcePath: string, key: string): Promise<void> {
  await client.delete(`/api/admin/${resourcePath}/${encodeURIComponent(key)}`);
}

/** Upload an image or PDF; returns the stored public URL path.
 *  Pass `folder` to save into a named wwwroot subfolder (e.g. "media/news"). */
export async function uploadFile(file: File, folder?: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  if (folder) form.append("folder", folder);
  // Passing FormData lets axios strip Content-Type so the browser can set the
  // correct multipart boundary automatically.
  const { data } = await client.post<{ url: string }>("/api/admin/upload", form, {
    headers: { "Content-Type": undefined },
  });
  return data.url;
}
