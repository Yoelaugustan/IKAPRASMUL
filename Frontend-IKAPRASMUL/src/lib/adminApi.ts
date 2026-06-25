// Client-side calls to the same-origin admin BFF proxy (app/api/admin/[...path]).
// The proxy injects the bearer token server-side, so nothing sensitive is exposed
// here. Used by the CMS hook (useResource) and the upload fields.

async function ensureOk(res: Response, fallback: string): Promise<void> {
  if (res.ok) return;

  // 401 here means even the refresh token is gone/expired (adminFetch already
  // tried to refresh) — the session is over, so send the admin back to sign-in.
  if (res.status === 401 && typeof window !== "undefined") {
    const from = encodeURIComponent(window.location.pathname);
    window.location.href = `/login?from=${from}`;
    throw new Error("Your session has expired. Please sign in again.");
  }

  let message = fallback;
  try {
    const data = (await res.json()) as { error?: string; title?: string };
    message = data.error ?? data.title ?? fallback;
  } catch {
    // Non-JSON error body — keep the fallback message.
  }
  throw new Error(message);
}

/** Create or update a resource. Returns the saved item in the frontend shape. */
export async function saveResource<T>(resourcePath: string, draft: unknown): Promise<T> {
  const res = await fetch(`/api/admin/${resourcePath}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  await ensureOk(res, "Failed to save.");
  return (await res.json()) as T;
}

/** Delete a resource by its key (slug or id). */
export async function deleteResource(resourcePath: string, key: string): Promise<void> {
  const res = await fetch(`/api/admin/${resourcePath}/${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
  await ensureOk(res, "Failed to delete.");
}

/** Upload an image or PDF; returns the stored public URL path.
 *  Pass `folder` to save into a named wwwroot subfolder (e.g. "media/news").
 *  The folder is sent as a form field (not a query param) to avoid encoding issues. */
export async function uploadFile(file: File, folder?: string): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  if (folder) form.append("folder", folder);
  const res = await fetch(`/api/admin/upload`, { method: "POST", body: form });
  await ensureOk(res, "Upload failed.");
  const data = (await res.json()) as { url: string };
  return data.url;
}
