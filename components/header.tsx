"use client";

import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/content/site";
import { useStore } from "@/components/providers/store-provider";
import { Logo } from "@/components/ui/logo";

const nav = [
  { href: "/collections/the-betrayal", label: "Drop" },
  { href: "/collections/the-faithless", label: "Archive" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#lookbook", label: "Lookbook" },
  { href: "/admin", label: "Admin" }
];

export function Header() {
  const { cartCount, openCart, wishlist } = useStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-bone/10 bg-abyss/75 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-4 py-4">
        <Logo />
        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs uppercase tracking-[0.26em] text-bone/70 transition hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bone/70 sm:inline-flex">
            {siteConfig.announcement}
          </span>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 bg-white/[0.03] text-bone/75 transition hover:border-bone/40 hover:text-bone"
            aria-label="Wishlist"
          >
            <Heart className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 rounded-full border border-bone/15 bg-abyss px-1.5 py-0.5 text-[0.55rem]">
              {wishlist.length}
            </span>
          </button>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 bg-white/[0.03] text-bone/75 transition hover:border-bone/40 hover:text-bone"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 rounded-full border border-bone/15 bg-abyss px-1.5 py-0.5 text-[0.55rem]">
              {cartCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setIsMobileOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 bg-white/[0.03] text-bone/75 transition hover:border-bone/40 hover:text-bone lg:hidden"
            aria-label="Navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      {isMobileOpen ? (
        <div className="container-shell grid gap-3 border-t border-bone/10 py-4 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className="rounded-full border border-bone/10 px-4 py-3 text-xs uppercase tracking-[0.24em] text-bone/70 transition hover:border-bone/40 hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
