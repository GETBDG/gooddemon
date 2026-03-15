"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { useStore } from "@/components/providers/store-provider";

export function ProductCard({
  product,
  className
}: {
  product: Product;
  className?: string;
}) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  return (
    <article className={cn("group space-y-4", className)}>
      <div className="relative overflow-hidden rounded-[2rem] border border-bone/10 bg-white/[0.03]">
        <Link href={`/products/${product.handle}`} className="relative block aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <Image
            src={product.images[1]?.src ?? product.images[0].src}
            alt={product.images[1]?.alt ?? product.images[0].alt}
            fill
            className="object-cover opacity-0 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
          />
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-2 p-4">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-bone/15 bg-black/55 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-bone"
              >
                {badge}
              </span>
            ))}
          </div>
        </Link>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-6 justify-between gap-2 p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addToCart(product, product.sizes[0])}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-bone px-4 py-3 text-xs uppercase tracking-[0.2em] text-abyss transition hover:bg-white"
          >
            <ShoppingBag className="h-4 w-4" />
            Quick Add
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 bg-black/45 text-bone transition hover:border-bone/40"
          >
            <Heart className={cn("h-4 w-4", isWishlisted(product.id) && "fill-current")} />
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-bone/40">{product.category}</p>
          <Link href={`/products/${product.handle}`} className="font-serif text-3xl uppercase">
            {product.name}
          </Link>
          <p className="mt-2 max-w-sm text-sm text-bone/60">{product.tagline}</p>
        </div>
        <p className="pt-1 text-sm uppercase tracking-[0.18em]">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
