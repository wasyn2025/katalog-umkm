# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Pekerjaan untuk **US-01 (Katalog dari database)** telah selesai.

### File yang dibuat & diubah:
1. [`lib/supabase/server.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/server.js) — Membuat fungsi `buatKoneksiServer` menggunakan `@supabase/supabase-js` dengan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dari environment variable di sisi server.
2. [`lib/supabase/index.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/index.js) — Re-export helper koneksi server.
3. [`app/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/page.jsx) — Mengambil daftar produk dari tabel `produk` di Supabase secara server-side, menampilkan kartu produk dengan [`KartuProduk`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/KartuProduk.jsx), menampilkan pesan error jika pengambilan data gagal, menampilkan teks *"Belum ada produk"* jika tabel kosong, serta menghapus [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx) dan ketergantungan pada `data-contoh.js`.

---

### Cara mengetes:
1. Pastikan server dev aktif (misalnya `npm run dev`).
2. Buka halaman beranda di browser: `http://localhost:3000`.
3. Periksa daftar produk: semua produk dari database Supabase berhasil tampil lengkap dengan foto, kategori, nama, dan harga dalam format rupiah.
4. Periksa komponen: catatan kuning ("Masih data contoh...") sudah tidak ada lagi di halaman katalog.
5. (Opsional uji pesan kosong/error): jika tabel produk kosong, halaman menampilkan teks *"Belum ada produk"*, dan jika koneksi database terputus/gagal, pesan error yang informatif akan muncul di halaman.

**Perbaikan:**
-

## US-02 Detail produk

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-03 Pesan via WhatsApp

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-04 Login admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-05 Ganti password

**Prompt:**

**Hasil:**

**Perbaikan:**

## US-06 Proteksi halaman admin

**Prompt:**

**Hasil:**

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
