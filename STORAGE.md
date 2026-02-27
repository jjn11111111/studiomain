# Storage (exercise videos) setup

If exercise pages show **"Video unavailable"** or **"Unable to load this exercise video"**, the app is building a Supabase Storage URL but the file isn’t accessible. Fix it in the Supabase Dashboard.

## Quick checklist

1. **Create buckets** (Storage → New bucket): `Module A`, `Module B`, `Module C` — set each to **Public**.
2. **Upload files** into each bucket at the exact paths below (create the folder first, then upload the file).
3. **Test the URL**: On the exercise page, click **"Open in new tab"** in the error box.  
   - **404 / XML error** → file or path is wrong; fix bucket name and path.  
   - **CORS error in console** → add your app origin in Project Settings → API (or Storage CORS).
4. **CORS**: In Supabase, add `https://studiomain1.vercel.app` (and `http://localhost:3000` for local dev) to allowed origins.

---

## 1. Create buckets (if needed)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Storage**.
2. Create three buckets (if they don’t exist):
   - **Module A**
   - **Module B**
   - **Module C**
3. When creating each bucket, set it to **Public** so the app can load videos via the public URL.

## 2. Make existing buckets public

If the buckets already exist but are private:

1. Go to **Storage** → select the bucket (e.g. **Module A**).
2. Open the bucket menu (⋮) → **Edit bucket** or **Make public**.
3. Enable **Public bucket** so that `getPublicUrl()` URLs work without a token.
4. Repeat for **Module B** and **Module C**.

## 3. Upload paths

The app expects files at these paths inside each bucket (see `lib/exercise-videos.ts`):

- **Module A:** `A-Red Fruits/ex1.mp4` … `ex10.mp4`
- **Module B:** `B-Yellow Animals/ex11.mp4` … `ex21.mp4`
- **Module C:** `C-Blue Cities/ex22.mp4` … `ex31.mp4`

Upload your video files so those paths exist (create the folder, e.g. `A-Red Fruits`, and upload `ex1.mp4`, etc.).

## 4. CORS (if videos still don’t load)

If the bucket is public and paths are correct but the browser still blocks the request:

1. Go to **Project Settings** → **API** (or **Storage** if there’s a CORS section).
2. Add your app origin to allowed origins, e.g.:
   - `https://studiomain1.vercel.app`
   - `https://*.vercel.app` (for preview deployments)

After this, reload the exercise page; the video should load.
