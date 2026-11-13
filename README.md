# Sabila Alifia Sundawa — Personal Portfolio

Website portfolio modern, pastel, dan interaktif. Siap deploy ke Vercel via GitHub.

## 🚀 Cara Deploy

1. Push folder ini ke repo GitHub.
2. Buka [vercel.com](https://vercel.com) → **New Project** → import repo.
3. Framework: **Next.js** (auto-detect). Klik **Deploy**. Selesai.

## 🔐 Admin Dashboard

- URL: `https://<domain-kamu>/admin`
- Password default: **`sabila2025`**
- Ganti password di file `app/admin/page.js` (cari `ADMIN_PASSWORD`).

## 📸 Mengisi Foto

Semua data (foto profil, pengalaman, project, galeri) dikelola lewat **Admin Dashboard**. Data tersimpan di `localStorage` browser kamu — jadi **langsung berfungsi tanpa database**.

### ⚠️ Catatan penting tentang localStorage
- Data tersimpan **per browser/device**.
- Jika kamu ingin data tampil di semua perangkat, upgrade ke Supabase (lihat di bawah).

## 🔄 Upgrade ke Supabase (opsional, untuk multi-device)

1. Buat project di [supabase.com](https://supabase.com).
2. Buat tabel `portfolio` (id text primary key, data jsonb).
3. Install: `npm i @supabase/supabase-js`.
4. Ganti fungsi di `lib/storage.js` dengan Supabase client.
5. Tambahkan env `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` di Vercel.

## 🛠️ Develop Lokal

```bash
npm install
npm run dev
```
Buka http://localhost:3000
