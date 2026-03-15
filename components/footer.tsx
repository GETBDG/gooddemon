"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { useCatalog } from "@/components/providers/catalog-provider";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const { collections } = useCatalog();

  return (
    <footer className="border-t border-bone/10 bg-black/40">
      <div className="container-shell grid gap-10 py-14 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-lg text-sm leading-7 text-bone/65">{siteConfig.footerStatement}</p>
          <div className="flex gap-3">
            <Button href="https://instagram.com" variant="secondary">
              Instagram
            </Button>
            <Button href="https://tiktok.com" variant="secondary">
              TikTok
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <p className="eyebrow">Navigation</p>
          <Link href="/" className="block text-sm text-bone/70 transition hover:text-bone">
            Home
          </Link>
          <Link
            href={collections[0] ? `/collections/${collections[0].handle}` : "/admin"}
            className="block text-sm text-bone/70 transition hover:text-bone"
          >
            {collections[0]?.name ?? "Collections"}
          </Link>
          <Link
            href={collections[1] ? `/collections/${collections[1].handle}` : "/admin"}
            className="block text-sm text-bone/70 transition hover:text-bone"
          >
            {collections[1]?.name ?? "Admin"}
          </Link>
          <Link href="/admin" className="block text-sm text-bone/70 transition hover:text-bone">
            Admin / Catalog
          </Link>
        </div>
        <div className="space-y-3">
          <p className="eyebrow">Contact</p>
          <p className="text-sm text-bone/65">contact@gooddemon.world</p>
          <p className="text-sm text-bone/65">Global shipping from the United States.</p>
          <p className="text-sm text-bone/65">Payments prepared for Shop Pay, Stripe, and express wallets.</p>
        </div>
      </div>
    </footer>
  );
}
