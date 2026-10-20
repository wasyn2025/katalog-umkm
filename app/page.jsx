import KartuProduk from "@/components/KartuProduk";
import Tombol from "@/components/Tombol";
import { toko } from "@/lib/toko";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog({ searchParams }) {
  const { q, kategori } = (await searchParams) || {};
  let daftarProduk = [];
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = buatKoneksiServer();

    // Ambil kategori unik dari database
    const { data: dataKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (dataKategori) {
      daftarKategori = [
        ...new Set(dataKategori.map((p) => p.kategori).filter(Boolean)),
      ].sort();
    }

    // Bangun query produk dengan filter kategori dan pencarian nama
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
      pesanError = `Gagal mengambil data dari database: ${error.message}`;
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError = `Terjadi kesalahan pada server: ${err.message || "Gagal menghubungkan ke database."}`;
  }

  const adaFilter = Boolean((q && q.trim()) || (kategori && kategori.trim()));

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="judul-produk" className="text-xl font-bold">
            Produk kami
          </h2>
        </div>

        {/* Filter kategori dan pencarian */}
        <form method="GET" action="/" className="flex flex-wrap items-center gap-3">
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
            <Tombol href="/" varian="garis">
              Reset
            </Tombol>
          )}
        </form>

        {pesanError ? (
          <div className="rounded-xl border border-garis bg-permukaan p-4 text-bahaya">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm">{pesanError}</p>
          </div>
        ) : daftarProduk.length === 0 ? (
          <p className="py-8 text-center text-teks-lembut">
            {adaFilter ? "Tidak ada produk yang cocok dengan pencarian" : "Belum ada produk"}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
