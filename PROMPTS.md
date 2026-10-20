# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Baca AGENTS.md dan docs/user-stories.md bagian US-01.

Ubah app/page.jsx supaya daftar produk diambil dari tabel "produk" di Supabase, di sisi server, memakai SUPABASE_URL dan SUPABASE_SECRET_KEY dari environment variable. Buat koneksi Supabase untuk server di folder lib/supabase.

Tampilkan produk dengan komponen KartuProduk yang sudah ada, tanpa mengubah tampilannya. Kalau gagal mengambil data, tampilkan pesan error yang jelas di halaman. Kalau tabel kosong, tampilkan tulisan "Belum ada produk". Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Pekerjaan untuk **US-01 (Katalog dari database)** telah selesai.

File yang dibuat & diubah:
1. [`lib/supabase/server.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/server.js) — Membuat fungsi `buatKoneksiServer` menggunakan `@supabase/supabase-js` dengan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY` dari environment variable di sisi server.
2. [`lib/supabase/index.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/index.js) — Re-export helper koneksi server.
3. [`app/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/page.jsx) — Mengambil daftar produk dari tabel `produk` di Supabase secara server-side, menampilkan kartu produk dengan [`KartuProduk`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/KartuProduk.jsx), menampilkan pesan error jika pengambilan data gagal, menampilkan teks *"Belum ada produk"* jika tabel kosong, serta menghapus [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx) dan ketergantungan pada `data-contoh.js`.

---

Cara mengetes:
1. Pastikan server dev aktif (misalnya `npm run dev`).
2. Buka halaman beranda di browser: `http://localhost:3000`.
3. Periksa daftar produk: semua produk dari database Supabase berhasil tampil lengkap dengan foto, kategori, nama, dan harga dalam format rupiah.
4. Periksa komponen: catatan kuning ("Masih data contoh...") sudah tidak ada lagi di halaman katalog.
5. (Opsional uji pesan kosong/error): jika tabel produk kosong, halaman menampilkan teks *"Belum ada produk"*, dan jika koneksi database terputus/gagal, pesan error yang informatif akan muncul di halaman.

**Perbaikan:**
-

## US-02 Detail produk

**Prompt:**
Baca docs/user-stories.md bagian US-02.

Ubah app/produk/[id]/page.jsx supaya mengambil satu produk dari tabel "produk" di Supabase berdasarkan id di URL, di sisi server, memakai koneksi Supabase yang sudah dibuat di lib/supabase. Kalau produk tidak ditemukan, panggil notFound(). Jangan ubah tampilannya. Hapus CatatanBelumAktif dari halaman ini, tapi biarkan tombol WhatsApp.

**Hasil:**
Pekerjaan untuk **US-02 (Detail produk)** telah selesai.

File yang diubah:
- [`app/produk/[id]/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/produk/[id]/page.jsx)
  - Mengambil data produk tunggal dari tabel `produk` di Supabase berdasarkan parameter `id` secara server-side menggunakan `buatKoneksiServer()` dari `lib/supabase/server`.
  - Memanggil `notFound()` jika produk tidak ditemukan di database atau jika format ID tidak valid.
  - Mempertahankan tampilan dan [`TombolWhatsApp`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/TombolWhatsApp.jsx).
  - Menghapus komponen [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx) serta fungsi data contoh `cariProdukContoh`.

---

Cara mengetes:
1. Pastikan server dev aktif (misal `npm run dev`).
2. Buka produk yang valid, contohnya `http://localhost:3000/produk/1`.
   - Foto, kategori, nama, harga dalam format rupiah, dan deskripsi produk dari database Supabase akan tampil.
   - Tombol "Pesan via WhatsApp" tetap ada, dan catatan kuning ("Tombol pesan belum berfungsi...") sudah hilang.
3. Buka ID yang tidak ada, contohnya `http://localhost:3000/produk/9999` atau `http://localhost:3000/produk/abc`.
   - Halaman akan merender tampilan 404 kustom (*"Halaman tidak ditemukan"*).

**Perbaikan:**
-

## US-03 Pesan via WhatsApp

**Prompt:**
Baca docs/rancangan-teknis.md bagian "Pesan WhatsApp (US-03)".

Ubah components/TombolWhatsApp.jsx menjadi tautan yang membuka https://wa.me/ ke nomor di lib/toko.js, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah. Pesan di-encode dengan encodeURIComponent dan dibuka di tab baru. Pertahankan tampilan tombolnya. Hapus CatatanBelumAktif yang menyebut US-03 di halaman detail produk.

**Hasil:**
Pekerjaan untuk **US-03 (Pesan via WhatsApp)** telah selesai.

File yang diubah:
- [`components/TombolWhatsApp.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/TombolWhatsApp.jsx)
  - Mengubah elemen `<button>` menjadi elemen `<a>` (tautan) dengan mempertahankan seluruh kelas tampilan tombol (`bg-utama`, teks putih, padding, rounded, dsb.).
  - Mengarahkan tautan ke format `https://wa.me/<nomor>?text=<pesan>` menggunakan nomor dari [`lib/toko.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/toko.js).
  - Pesan otomatis memuat nama produk dan harga terformat dalam rupiah (`formatRupiah`), yang di-encode menggunakan `encodeURIComponent`.
  - Menambahkan atribut `target="_blank"` dan `rel="noopener noreferrer"` agar link terbuka di tab baru.
  - Memastikan [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx) tentang US-03 sudah bersih dari [`app/produk/[id]/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/produk/[id]/page.jsx).

---

Cara mengetes:
1. Pastikan server dev berjalan (`http://localhost:3000`).
2. Buka salah satu halaman detail produk, misalnya `http://localhost:3000/produk/1`.
3. Klik tombol **"Pesan via WhatsApp"**.
4. WhatsApp (web atau aplikasi) akan terbuka di tab baru mengarah ke nomor `6282170100709` dengan pesan otomatis terisi (misalnya: *"Halo, saya ingin memesan Kopi Kabut Asap seharga Rp 45.000."*).

**Perbaikan:**
-

## US-04 Login admin

**Prompt:**
Baca AGENTS.md bagian aturan keamanan dan docs/user-stories.md bagian US-04.

Buat login admin memakai Supabase Auth (email dan password) dengan @supabase/ssr dan cookie, memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY. Login diproses dengan Server Action di app/admin/actions.js dan disambungkan ke form di app/admin/login/page.jsx. Login berhasil diarahkan ke /admin; login gagal menampilkan pesan error yang jelas di halaman login. Buat juga tombol "Keluar" di components/NavAdmin.jsx berfungsi: mengakhiri sesi lalu kembali ke /admin/login. Jangan ubah tampilan. Hapus CatatanBelumAktif dari halaman login.

**Hasil:**
Pekerjaan untuk **US-04 (Login admin)** telah selesai.

File yang dibuat & diubah:
1. [`lib/supabase/admin.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/admin.js) — Membuat helper `buatKoneksiAdmin()` menggunakan `createServerClient` dari `@supabase/ssr` dengan `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, serta cookie Next.js (`next/headers`).
2. [`lib/supabase/index.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/index.js) & [`lib/supabase/server.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/lib/supabase/server.js) — Re-export `buatKoneksiAdmin`.
3. [`app/admin/actions.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/actions.js) — Membuat Server Action:
   - `masukAdmin`: memproses email & password dengan `supabase.auth.signInWithPassword`, mengarahkan ke `/admin` jika berhasil, atau mengembalikan pesan error jika gagal.
   - `keluarAdmin`: mengakhiri sesi dengan `supabase.auth.signOut` lalu mengarahkan ke `/admin/login`.
4. [`app/admin/login/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/login/page.jsx) — Menghubungkan form login ke Server Action `masukAdmin` menggunakan `useActionState`, menampilkan pesan error bila login gagal, serta menghapus [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx).
5. [`components/NavAdmin.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/NavAdmin.jsx) — Memfungsikan tombol "Keluar" menggunakan form Server Action `keluarAdmin` tanpa mengubah tampilan.

---

Cara mengetes:
1. Buka halaman login admin di `http://localhost:3000/admin/login`.
2. **Uji login gagal**: Masukkan email atau password yang salah, lalu klik **Masuk**. Pesan error (*"Email atau password salah. Silakan periksa kembali."*) akan tampil di halaman.
3. **Uji login berhasil**: Masukkan email dan password admin toko yang terdaftar di Supabase Auth, lalu klik **Masuk**. Halaman akan dialihkan ke `/admin`.
4. **Uji tombol Keluar**: Di halaman admin (`/admin`), klik tombol **Keluar** di pojok kanan atas menu admin. Sesi akan diakhiri dan halaman akan kembali dialihkan ke `/admin/login`.

**Perbaikan:**

## US-05 Ganti password

**Prompt:**
Baca docs/user-stories.md bagian US-05.

Buat Server Action ganti password di app/admin/actions.js untuk admin yang sedang login, memakai Supabase Auth. Validasi di server: password baru minimal 8 karakter dan harus sama dengan konfirmasi. Tampilkan pesan berhasil atau pesan error yang jelas di halaman. Sambungkan ke form di app/admin/password/page.jsx tanpa mengubah tampilannya. Hapus CatatanBelumAktif dari halaman ini.

**Hasil:**
Pekerjaan untuk **US-05 (Ganti password)** telah selesai.

File yang diubah:
1. [`app/admin/actions.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/actions.js)
   - Menambahkan Server Action `gantiPassword`:
     - Memvalidasi input di server: kedua kolom wajib diisi, password baru minimal 8 karakter, dan password baru harus cocok dengan konfirmasi password.
     - Memverifikasi di server bahwa pengguna sedang login melalui `supabase.auth.getUser()`.
     - Memperbarui password menggunakan `supabase.auth.updateUser({ password })`.
     - Mengembalikan `{ success: "Password berhasil diganti." }` jika berhasil, atau pesan error jika gagal / validasi tidak terpenuhi.
2. [`app/admin/password/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/password/page.jsx)
   - Menghubungkan form ke Server Action `gantiPassword` menggunakan `useActionState`.
   - Menampilkan alert pesan berhasil atau pesan error yang jelas di atas form.
   - Mempertahankan tampilan dan tata letak asli.
   - Menghapus komponen [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx).

---

Cara mengetes:
1. Masuk terlebih dahulu melalui `/admin/login` dengan akun admin yang valid.
2. Buka halaman ganti password di `http://localhost:3000/admin/password`.
3. **Uji validasi tidak cocok**: Masukkan password baru dan konfirmasi yang berbeda. Klik **Simpan password** -> Muncul pesan error (*"Password baru dan konfirmasi password tidak sama."*).
4. **Uji validasi kurang dari 8 karakter**: Masukkan password kurang dari 8 karakter -> Muncul pesan error (*"Password baru minimal 8 karakter."*).
5. **Uji berhasil**: Masukkan password baru minimal 8 karakter yang sama di kedua kolom -> Muncul pesan sukses (*"Password berhasil diganti."*).
6. Uji login kembali di `/admin/login` menggunakan password baru tersebut untuk memastikan perubahan telah tersimpan di Supabase Auth.

**Perbaikan:**
-

## US-06 Proteksi halaman admin

**Prompt:**
Baca AGENTS.md aturan keamanan nomor 3 dan 4, dan docs/user-stories.md bagian US-06.

Buat file proxy.js di root proyek (Next.js 16). Semua rute /admin kecuali /admin/login wajib login dengan Supabase Auth; kalau belum login, alihkan ke /admin/login. Pastikan juga setiap Server Action yang mengubah data memeriksa login di server. Hapus CatatanBelumAktif dari halaman /admin.

**Hasil:**
Pekerjaan untuk **US-06 (Proteksi halaman admin)** telah selesai.

File yang dibuat & diubah:
1. [`proxy.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/proxy.js) — Dibuat di root proyek untuk memproteksi seluruh rute `/admin` (kecuali `/admin/login`) menggunakan Supabase Auth melalui `@supabase/ssr`. Jika sesi admin tidak valid atau belum login, permintaan akan dialihkan (redirect) ke `/admin/login`.
2. [`app/admin/actions.js`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/actions.js) — Menambahkan helper `periksaLoginAdmin` dan memastikan setiap Server Action yang mengubah data (seperti `gantiPassword`) memeriksa login pengguna di sisi server sebelum mengeksekusi perubahan.
3. [`app/admin/page.jsx`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/app/admin/page.jsx) — Menghapus komponen [`CatatanBelumAktif`](file:///c:/Users/liminal/Documents/chat-project/katalog-umkm/components/CatatanBelumAktif.jsx).

---

Cara mengetes:
1. Buka jendela penyamaran (Incognito / Private Window) di mana admin belum login.
2. Coba akses rute admin mana pun, misalnya:
   - `http://localhost:3000/admin`
   - `http://localhost:3000/admin/password`
   - `http://localhost:3000/admin/produk/baru`
3. Periksa browser: semua halaman tersebut akan langsung dialihkan ke `http://localhost:3000/admin/login`.
4. Masuk dengan akun admin di `/admin/login`. Setelah login berhasil, halaman `/admin` dan sub-rutenya dapat diakses seperti biasa.
5. Catatan kuning `CatatanBelumAktif` tentang proteksi halaman admin sudah tidak muncul lagi di `/admin`.

**Perbaikan:**

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.

## US-07 List Produk

**Prompt:**
Baca AGENTS.md, dan docs/user-stories.md bagian US-07.

Daftar produk masih data dummy, pakai data yang ada di supabase dengan mengikuti kolom database
yang ada di skema-database.md

**Hasil:**

**Perbaikan:**

## US-08 Tambah produk

**Prompt:**
Baca AGENTS.md, dan docs/user-stories.md bagian US-08.

Buatkan fitur tambah produk di halaman admin dengan mengikuti skema database di skema-database.md dan mengikuti kriteria yang ada di docs/user-stories.md bagian US-08

**Hasil:**

**Perbaikan:**
