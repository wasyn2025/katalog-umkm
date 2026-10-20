"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { buatKoneksiAdmin } from "@/lib/supabase/admin";

export async function periksaLoginAdmin(supabase) {
  const client = supabase || (await buatKoneksiAdmin());
  const {
    data: { user },
    error,
  } = await client.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function masukAdmin(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrFormData instanceof FormData
      ? prevStateOrFormData
      : maybeFormData;

  const email = formData?.get("email");
  const password = formData?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const supabase = await buatKoneksiAdmin();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(email).trim(),
    password: String(password),
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { error: "Email atau password salah. Silakan periksa kembali." };
    }
    return { error: error.message || "Gagal masuk. Silakan coba lagi." };
  }

  redirect("/admin");
}

export async function keluarAdmin() {
  const supabase = await buatKoneksiAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrFormData instanceof FormData
      ? prevStateOrFormData
      : maybeFormData;

  const passwordBaru = formData?.get("password_baru");
  const konfirmasiPassword = formData?.get("konfirmasi_password");

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (String(passwordBaru).length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  const supabase = await buatKoneksiAdmin();
  const user = await periksaLoginAdmin(supabase);

  if (!user) {
    return { error: "Sesi tidak valid atau Anda belum masuk. Silakan login kembali." };
  }

  const { error } = await supabase.auth.updateUser({
    password: String(passwordBaru),
  });

  if (error) {
    return { error: error.message || "Gagal mengganti password. Silakan coba lagi." };
  }

  return { success: "Password berhasil diganti." };
}

export async function tambahProduk(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrFormData instanceof FormData
      ? prevStateOrFormData
      : maybeFormData;

  const supabase = await buatKoneksiAdmin();
  const user = await periksaLoginAdmin(supabase);

  if (!user) {
    return { error: "Aksi ditolak: Anda harus login sebagai admin." };
  }

  const nama = formData?.get("nama");
  const hargaRaw = formData?.get("harga");
  const kategori = formData?.get("kategori");
  const foto_url = formData?.get("foto_url");
  const deskripsi = formData?.get("deskripsi");

  if (!nama || !hargaRaw) {
    return { error: "Nama produk dan harga wajib diisi." };
  }

  const harga = parseInt(hargaRaw, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka positif." };
  }

  const { error } = await supabase.from("produk").insert({
    nama: String(nama).trim(),
    harga,
    kategori: kategori ? String(kategori).trim() : null,
    foto_url: foto_url ? String(foto_url).trim() : null,
    deskripsi: deskripsi ? String(deskripsi).trim() : null,
  });

  if (error) {
    return { error: error.message || "Gagal menambahkan produk baru." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function ubahProduk(prevStateOrFormData, maybeFormData) {
  const formData =
    maybeFormData instanceof FormData
      ? maybeFormData
      : prevStateOrFormData instanceof FormData
      ? prevStateOrFormData
      : maybeFormData;

  const supabase = await buatKoneksiAdmin();
  const user = await periksaLoginAdmin(supabase);

  if (!user) {
    return { error: "Aksi ditolak: Anda harus login sebagai admin." };
  }

  const id = formData?.get("id");
  const nama = formData?.get("nama");
  const hargaRaw = formData?.get("harga");
  const kategori = formData?.get("kategori");
  const foto_url = formData?.get("foto_url");
  const deskripsi = formData?.get("deskripsi");

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  if (!nama || !hargaRaw) {
    return { error: "Nama produk dan harga wajib diisi." };
  }

  const harga = parseInt(hargaRaw, 10);
  if (isNaN(harga) || harga < 0) {
    return { error: "Harga harus berupa angka positif." };
  }

  const { error } = await supabase
    .from("produk")
    .update({
      nama: String(nama).trim(),
      harga,
      kategori: kategori ? String(kategori).trim() : null,
      foto_url: foto_url ? String(foto_url).trim() : null,
      deskripsi: deskripsi ? String(deskripsi).trim() : null,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message || "Gagal menyimpan perubahan produk." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
  redirect("/admin");
}

export async function hapusProduk(formData) {
  const id = formData instanceof FormData ? formData.get("id") : formData;

  if (!id) {
    return { error: "ID produk tidak valid." };
  }

  const supabase = await buatKoneksiAdmin();
  const user = await periksaLoginAdmin(supabase);

  if (!user) {
    return { error: "Aksi ditolak: Anda harus login sebagai admin." };
  }

  const { error } = await supabase.from("produk").delete().eq("id", id);

  if (error) {
    return { error: error.message || "Gagal menghapus produk." };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/produk/${id}`);
}


