# Panduan Tampilan

Ikuti panduan ini setiap kali membuat atau mengubah tampilan, supaya semua halaman terlihat konsisten. Untuk menyesuaikan dengan usahamu, ganti nilai warna di `app/globals.css` (bagian `@theme`) dan isi `lib/toko.js`.

## Warna

| Token | Nilai awal | Dipakai untuk |
| --- | --- | --- |
| `latar` | `#ffffff` | Latar halaman dan kartu |
| `permukaan` | `#fdf3f2` | Latar bagian sekunder, footer, kepala tabel |
| `garis` | `#f1dcda` | Garis tepi dan pemisah |
| `teks` | `#2a1a19` | Teks utama |
| `teks-lembut` | `#75605e` | Teks pendukung: kategori, keterangan |
| `utama` | `#c0453f` | Tombol utama, tautan aktif, nama toko |
| `utama-gelap` | `#9b2f2b` | Tombol utama saat disorot |
| `harga` / `harga-latar` | `#7a4e09` / `#fbefd8` | Label harga |
| `bahaya` | `#9f1239` | Aksi hapus dan pesan error |

Pakai sebagai kelas Tailwind, misalnya `bg-utama`, `text-teks-lembut`, `border-garis`. Jangan menulis kode warna langsung di kelas.

## Huruf

- Satu jenis huruf: Plus Jakarta Sans.
- Judul halaman: `text-2xl` sampai `text-5xl`, `font-extrabold`.
- Teks biasa: ukuran bawaan, panjang baris maksimal sekitar 70 karakter (`max-w-prose`).
- Tulisan memakai huruf kecil biasa (sentence case), bukan HURUF BESAR semua.

## Komponen

Gunakan komponen yang sudah ada sebelum membuat yang baru:

| Komponen | Fungsi |
| --- | --- |
| `Tombol` | Tombol dan tautan berbentuk tombol (varian `utama`, `garis`, `bahaya`) |
| `Input` | Kolom isian beserta label, termasuk textarea |
| `KartuProduk` | Kartu di katalog |
| `TabelProduk` | Daftar produk di halaman admin |
| `FormProduk` | Form tambah dan ubah produk |
| `NavAdmin` | Menu di halaman admin |

## Tata letak

- Lebar konten maksimal `max-w-5xl`, rata kiri.
- Katalog: 2 kolom di HP, 3 kolom di layar lebar.
- Selalu cek tampilan di lebar HP (sekitar 390 px).

## Bahasa

- Gunakan bahasa Indonesia yang singkat dan jelas.
- Label tombol menyebut aksinya: "Simpan produk", bukan "Submit".
- Pesan error menjelaskan apa yang salah dan cara memperbaikinya.
