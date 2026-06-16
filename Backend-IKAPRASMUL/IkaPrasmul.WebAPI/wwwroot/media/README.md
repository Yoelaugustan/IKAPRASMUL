# Content images (`wwwroot/media`)

Backend-hosted images for dynamic content. Served as static files by the API
(`app.UseStaticFiles()`), and reached from the frontend through a same-origin
rewrite (`/media/*` → this folder), so `next/image` needs no `remotePatterns`.

## How to add an image
1. Drop the file in the matching subfolder, e.g.
   `wwwroot/media/sig/runners-club.jpg`
2. Reference it by its **relative path** in the seed data / content, e.g.
   ```json
   { "id": "runners-club", "name": "Runners Club", "image": "/media/sig/runners-club.jpg", "icon": "..." }
   ```

That path works in every environment — going to production only changes the
rewrite's destination (the frontend's `API_URL`), not the stored paths.

## Folders
- `sig/` — SIG group / spotlight images
- add more per content type as needed (`stories/`, `business/`, `news/` …)

> Hand-placed images (committed here) and future admin-uploaded images can share
> this scheme. Keep filenames lowercase-kebab and unique.
