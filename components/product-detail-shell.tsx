"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useStore } from "@/components/providers/store-provider";
import { FadeIn } from "@/components/motion/fade-in";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductDetailShell({ product }: { product: Product }) {
  const { products } = useCatalog();
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  const relatedProducts = products.filter(
    (entry) => entry.collection === product.collection && entry.id !== product.id
  );

  return (
    <div className="container-shell py-10">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <FadeIn className="grid gap-5">
          <div className="relative min-h-[40rem] overflow-hidden rounded-[2.6rem] border border-bone/10 bg-black/30">
            <Image src={activeImage.src} alt={activeImage.alt} fill className="object-cover" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {product.images.map((image) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`relative min-h-[11rem] overflow-hidden rounded-[1.7rem] border transition ${
                  activeImage.src === image.src ? "border-bone/45" : "border-bone/10"
                }`}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1} className="space-y-8">
          <div className="space-y-4">
            <p className="eyebrow">Part of {product.collection.replaceAll("-", " ")}</p>
            <h1 className="font-serif text-5xl uppercase leading-none sm:text-6xl">{product.name}</h1>
            <p className="max-w-xl text-base leading-8 text-bone/68">{product.spotlight}</p>
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-bone/12 bg-white/[0.04] px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-bone/72"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Price</p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl uppercase tracking-[0.15em]">{formatPrice(product.price)}</span>
                  {product.compareAtPrice ? (
                    <span className="text-sm uppercase tracking-[0.15em] text-bone/35 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  ) : null}
                </div>
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-ember">
                {product.stock > 0 ? `Only ${product.stock} remain` : "Archived / Restock notify"}
              </p>
            </div>
            <div className="mt-6">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Select size</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-3 text-xs uppercase tracking-[0.22em] transition ${
                      selectedSize === size
                        ? "border-bone bg-bone text-abyss"
                        : "border-bone/10 text-bone/65 hover:border-bone/35 hover:text-bone"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-bone/45">Size guide available inline or modal-ready.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => addToCart(product, selectedSize)} className="flex-1">
                Add to cart
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={`mr-2 h-4 w-4 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                Wishlist
              </Button>
            </div>
            <Button variant="ghost" className="mt-3 px-0">
              Restock notification
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel rounded-[1.8rem] p-5">
              <Truck className="h-5 w-5 text-bone/60" />
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Shipping</p>
              <p className="mt-3 text-sm leading-7 text-bone/65">{product.shipping}</p>
            </div>
            <div className="panel rounded-[1.8rem] p-5">
              <ShieldCheck className="h-5 w-5 text-bone/60" />
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Materials</p>
              <p className="mt-3 text-sm leading-7 text-bone/65">{product.material}</p>
            </div>
            <div className="panel rounded-[1.8rem] p-5">
              <Sparkles className="h-5 w-5 text-bone/60" />
              <p className="mt-4 text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Fit</p>
              <p className="mt-3 text-sm leading-7 text-bone/65">{product.fit}</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="panel rounded-[2rem] p-6">
              <p className="eyebrow">Description</p>
              <p className="mt-4 font-serif text-3xl leading-[1.1] text-bone/92">{product.description}</p>
            </div>
            <div className="panel rounded-[2rem] p-6">
              <p className="eyebrow">Care / Returns / Culture</p>
              <div className="mt-4 grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Care</p>
                  <p className="mt-3 text-sm leading-7 text-bone/65">{product.care}</p>
                </div>
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Returns</p>
                  <p className="mt-3 text-sm leading-7 text-bone/65">
                    14-day returns for unworn pieces. Limited releases may convert to exchange-only after sellout.
                  </p>
                </div>
                <div>
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Reviews</p>
                  <p className="mt-3 text-sm leading-7 text-bone/65">
                    Reviews, UGC and loyalty/VIP logic slot naturally into this panel without breaking the premium layout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <section className="py-20">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">You may also want</p>
            <h2 className="font-serif text-5xl uppercase leading-none">Related pieces</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-bone/62">
            Upsells are framed as curation, not algorithmic noise.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {relatedProducts.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.05}>
              <ProductCard product={item} />
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
