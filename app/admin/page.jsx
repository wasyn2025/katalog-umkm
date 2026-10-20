import NavAdmin from "@/components/NavAdmin";
import TabelProduk from "@/components/TabelProduk";
import Tombol from "@/components/Tombol";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";
import { buatKoneksiServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanAdmin() {
  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabase = await buatKoneksiAdmin();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      const serverSupabase = buatKoneksiServer();
      const { data: serverData, error: serverError } = await serverSupabase
        .from("produk")
        .select("*")
        .order("created_at", { ascending: false });

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

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Produk</h1>
        {/* US-08 (bonus): tambah produk */}
        <Tombol href="/admin/produk/baru">Tambah produk</Tombol>
      </div>

      {pesanError ? (
        <div className="rounded-xl border border-garis bg-permukaan p-4 text-sm text-bahaya">
          <p className="font-semibold">Gagal memuat produk</p>
          <p className="mt-1">{pesanError}</p>
        </div>
      ) : daftarProduk.length === 0 ? (
        <p className="py-8 text-center text-teks-lembut">Belum ada produk</p>
      ) : (
        <TabelProduk daftarProduk={daftarProduk} />
      )}
    </div>
  );
}
