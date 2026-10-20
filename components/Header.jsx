"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toko } from "@/lib/toko";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-garis bg-latar">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-utama">
          {toko.nama}
        </Link>

        {pathname === "/" && (
          <Link
            href="/admin/login"
            className="text-md bg-utama py-1.5 hover:bg-utama/80 transition-all duration-[300ms] px-3 font-medium text-white text-sm rounded-md flex items-center justify-center"
          >
            Masuk
          </Link>
        )}
      </div>
    </header>
  );
}