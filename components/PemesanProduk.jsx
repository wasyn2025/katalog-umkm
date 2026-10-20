"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function PemesanProduk({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  const nomor = (toko.nomorWhatsApp || "").replace(/\D/g, "");
  const totalHarga = formatRupiah(produk.harga * jumlah);
  const pesan =
    jumlah === 1
      ? `Halo, saya ingin memesan ${produk.nama} seharga ${formatRupiah(produk.harga)}.`
      : `Halo, saya ingin memesan ${produk.nama} sebanyak ${jumlah} pcs seharga ${totalHarga}.`;

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  function kurangi() {
    setJumlah((j) => Math.max(1, j - 1));
  }

  function tambah() {
    setJumlah((j) => j + 1);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Pilih jumlah */}
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">Jumlah</p>
        <div className="flex w-fit items-center rounded-lg border border-garis">
          <button
            type="button"
            onClick={kurangi}
            disabled={jumlah <= 1}
            aria-label="Kurangi jumlah"
            className="px-4 py-2.5 text-lg font-semibold text-teks-lembut hover:text-teks disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="min-w-[3rem] text-center text-base font-semibold">
            {jumlah}
          </span>
          <button
            type="button"
            onClick={tambah}
            aria-label="Tambah jumlah"
            className="px-4 py-2.5 text-lg font-semibold text-teks-lembut hover:text-teks"
          >
            +
          </button>
        </div>
      </div>

      {/* Tampilkan total jika jumlah lebih dari 1 */}
      {jumlah > 1 && (
        <p className="self-start rounded-md bg-harga-latar px-3 py-1 text-sm font-bold text-harga">
          Total: {totalHarga}
        </p>
      )}

      {/* Tombol pesan WhatsApp */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp
      </a>
    </div>
  );
}

