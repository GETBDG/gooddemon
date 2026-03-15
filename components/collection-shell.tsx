"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Collection, Product } from "@/lib/types";
import { FadeIn } from "@/components/motion/fade-in";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

type SortMode = "featured" | "price-asc" | "price-desc" | "archived";

export function CollectionShell({
  collection,
  products,
  initialCategory
}: {
  collection: Collection;
  products: Product[];
  initialCategory?: string;
}) {
  const [sort, setSort] = useState<SortMode>("featured");
  const [category, setCategory] = useState<string>(initialCategory ?? "All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const activeCategory = categories.includes(category) ? category : "All";

  const filteredProducts = useMemo(() => {
    const nextProducts =
      activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory);

    switch (sort) {
      case "price-asc":
        return [...nextProducts].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...nextProducts].sort((a, b) => b.price - a.price);
      case "archived":
        return [...nextProducts].sort((a, b) => Number(b.stock === 0) - Number(a.stock === 0));
      default:
        return nextProducts;
    }
  }, [activeCategory, products, sort]);

  return (
    <div className="container-shell py-10">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-bone/10">
        <Image src={collection.heroImage} alt={collection.name} fill className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-black/25" />
        <div className="relative z-10 grid min-h-[28rem] gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:p-14">
          <div className="space-y-5">
            <p className="eyebrow">{collection.eyebrow}</p>
            <h1 className="max-w-3xl font-serif text-5xl uppercase leading-none sm:text-6xl lg:text-7xl">
              {collection.name}
            </h1>
            <p className="max-w-xl text-base leading-8 text-bone/68">{collection.description}</p>
          </div>
          <div className="grid gap-4 rounded-[2rem] border border-bone/10 bg-black/45 p-6 sm:grid-cols-3">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Accent</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">{collection.accent}</p>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Pieces</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">{products.length}</p>
            </div>
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Mood</p>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">
                {collection.tags.join(" / ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
          <FadeIn className="space-y-6">
            <SectionHeading
              eyebrow="Collection Controls"
              title="Filters that feel elevated."
              description="The collection template is designed to support category filters, premium sorting, archived products, low-stock badges, and future Shopify faceting."
            />
            <div className="panel rounded-[2rem] p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Category</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCategory(option)}
                    className={`rounded-full px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] transition ${
                      activeCategory === option
                        ? "bg-bone text-abyss"
                        : "border border-bone/10 text-bone/60 hover:border-bone/35 hover:text-bone"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="panel rounded-[2rem] p-5">
              <label className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">
                Sort
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortMode)}
                  className="mt-4 block w-full rounded-[1.2rem] border border-bone/10 bg-black/35 px-4 py-3 text-sm text-bone outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="archived">Show Archived First</option>
                </select>
              </label>
            </div>
          </FadeIn>
          <div className="grid gap-8 xl:grid-cols-2">
            {filteredProducts.map((product, index) => (
              <FadeIn key={product.id} delay={index * 0.05}>
                <ProductCard product={product} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
