import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin({ searchParams }) {
  const { q, kategori } = (await searchParams) || {};
  let daftarProduk = [];
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = await buatKoneksiAdmin();

    // Ambil daftar kategori unik
    const { data: dataKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (dataKategori) {
      daftarKategori = [
        ...new Set(dataKategori.map((p) => p.kategori).filter(Boolean)),
      ].sort();
    }

    // Bangun query produk dengan filter kategori dan pencarian
    let query = supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (kategori && kategori.trim()) {
      query = query.eq("kategori", kategori.trim());
    }

    if (q && q.trim()) {
      query = query.ilike("nama", `%${q.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      const serverSupabase = buatKoneksiServer();
      let serverQuery = serverSupabase
        .from("produk")
        .select("*")
        .order("created_at", { ascending: false });

      if (kategori && kategori.trim()) {
        serverQuery = serverQuery.eq("kategori", kategori.trim());
      }

      if (q && q.trim()) {
        serverQuery = serverQuery.ilike("nama", `%${q.trim()}%`);
      }

      const { data: serverData, error: serverError } = await serverQuery;

      if (serverError) {
        pesanError = error.message;
      } else {
        daftarProduk = serverData || [];
      }
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError = err.message || "Gagal memuat produk dari database.";
  }

  const adaFilter = Boolean((q && q.trim()) || (kategori && kategori.trim()));

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {/* Form Filter Kategori dan Pencarian */}
      <form method="GET" action="/admin" className="flex flex-wrap items-center gap-3">
        <div className="min-w-[200px] flex-1">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Cari nama produk..."
            className="w-full rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
          />
        </div>

        <select
          name="kategori"
          defaultValue={kategori || ""}
          className="rounded-lg border border-garis bg-latar px-3 py-2 text-sm text-teks focus:border-utama focus:outline-none"
        >
          <option value="">Semua kategori</option>
          {daftarKategori.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>

        <Tombol type="submit">Cari</Tombol>

        {adaFilter && (
          <Tombol href="/admin" varian="garis">
            Reset
          </Tombol>
        )}
      </form>

      {pesanError ? (
        <div className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya">
          <p className="font-semibold">Gagal memuat produk</p>
          <p className="mt-1">{pesanError}</p>
        </div>
      ) : daftarProduk.length === 0 ? (
        <p className="py-8 text-center text-teks-lembut">
          {adaFilter ? "Tidak ada produk yang cocok dengan pencarian" : "Belum ada produk"}
        </p>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
