"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FolderKanban, Package2, Plus, Trash2 } from "lucide-react";
import { categories, cultureFeed, lookbook, siteConfig } from "@/content/site";
import { useCatalog } from "@/components/providers/catalog-provider";
import type { Badge, Collection, Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type ProductFormState = {
  id: string;
  handle: string;
  name: string;
  tagline: string;
  price: string;
  compareAtPrice: string;
  collection: string;
  category: string;
  color: string;
  badges: string;
  sizes: string;
  stock: string;
  description: string;
  material: string;
  fit: string;
  care: string;
  shipping: string;
  spotlight: string;
  image: string;
};

type CollectionFormState = {
  handle: string;
  name: string;
  eyebrow: string;
  description: string;
  accent: string;
  heroImage: string;
  tags: string;
};

const emptyCollection = (): CollectionFormState => ({
  handle: "",
  name: "",
  eyebrow: "New Collection",
  description: "",
  accent: "",
  heroImage: "/images/collection-betrayal.svg",
  tags: "Limited Drop"
});

const emptyProduct = (defaultCollection = ""): ProductFormState => ({
  id: "",
  handle: "",
  name: "",
  tagline: "",
  price: "",
  compareAtPrice: "",
  collection: defaultCollection,
  category: "Tees",
  color: "Abyss Black",
  badges: "Limited Drop",
  sizes: "S, M, L, XL",
  stock: "10",
  description: "",
  material: "",
  fit: "",
  care: "",
  shipping: "Ships worldwide in 2-5 business days.",
  spotlight: "",
  image: "/images/product-tee-front.svg"
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createImageSet(src: string, name: string) {
  return [
    { src, alt: `${name} image 1` },
    { src, alt: `${name} image 2` },
    { src, alt: `${name} image 3` }
  ];
}

function toProductForm(product: Product): ProductFormState {
  return {
    id: product.id,
    handle: product.handle,
    name: product.name,
    tagline: product.tagline,
    price: String(product.price),
    compareAtPrice: product.compareAtPrice ? String(product.compareAtPrice) : "",
    collection: product.collection,
    category: product.category,
    color: product.color,
    badges: product.badges.join(", "),
    sizes: product.sizes.join(", "),
    stock: String(product.stock),
    description: product.description,
    material: product.material,
    fit: product.fit,
    care: product.care,
    shipping: product.shipping,
    spotlight: product.spotlight,
    image: product.images[0]?.src ?? "/images/product-tee-front.svg"
  };
}

function toCollectionForm(collection: Collection): CollectionFormState {
  return {
    handle: collection.handle,
    name: collection.name,
    eyebrow: collection.eyebrow,
    description: collection.description,
    accent: collection.accent,
    heroImage: collection.heroImage,
    tags: collection.tags.join(", ")
  };
}

async function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function AdminDashboard() {
  const {
    products,
    collections,
    configured,
    error,
    loading,
    upsertProduct,
    deleteProduct,
    upsertCollection,
    deleteCollection
  } = useCatalog();
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedCollectionHandle, setSelectedCollectionHandle] = useState<string>("");
  const [productForm, setProductForm] = useState<ProductFormState>(emptyProduct());
  const [collectionForm, setCollectionForm] = useState<CollectionFormState>(emptyCollection());
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const totalStock = useMemo(
    () => products.reduce((sum, product) => sum + product.stock, 0),
    [products]
  );

  useEffect(() => {
    if (!selectedProductId && products[0]) {
      setSelectedProductId(products[0].id);
      setProductForm(toProductForm(products[0]));
    }
  }, [products, selectedProductId]);

  useEffect(() => {
    if (!selectedCollectionHandle && collections[0]) {
      setSelectedCollectionHandle(collections[0].handle);
      setCollectionForm(toCollectionForm(collections[0]));
    }
  }, [collections, selectedCollectionHandle]);

  function handleProductSelection(productId: string) {
    const product = products.find((entry) => entry.id === productId);

    if (!product) {
      return;
    }

    setSelectedProductId(productId);
    setProductForm(toProductForm(product));
  }

  function handleCollectionSelection(handle: string) {
    const collection = collections.find((entry) => entry.handle === handle);

    if (!collection) {
      return;
    }

    setSelectedCollectionHandle(handle);
    setCollectionForm(toCollectionForm(collection));
  }

  async function saveProduct() {
    const name = productForm.name.trim();
    const handle = (productForm.handle || slugify(name)).trim();

    if (!name || !handle) {
      setStatus("Product name and handle are required.");
      return;
    }

    if (!productForm.collection.trim()) {
      setStatus("A collection handle is required before saving a product.");
      return;
    }

    const nextProduct: Product = {
      id: productForm.id || crypto.randomUUID(),
      handle,
      name,
      tagline: productForm.tagline,
      price: Number(productForm.price || 0),
      compareAtPrice: productForm.compareAtPrice
        ? Number(productForm.compareAtPrice)
        : undefined,
      collection: productForm.collection,
      category: productForm.category,
      color: productForm.color,
      badges: parseList(productForm.badges) as Badge[],
      sizes: parseList(productForm.sizes),
      stock: Number(productForm.stock || 0),
      description: productForm.description,
      material: productForm.material,
      fit: productForm.fit,
      care: productForm.care,
      shipping: productForm.shipping,
      spotlight: productForm.spotlight,
      images: createImageSet(productForm.image, name)
    };

    setBusy(true);
    setStatus(null);

    try {
      await upsertProduct(nextProduct);
      setSelectedProductId(nextProduct.id);
      setProductForm(toProductForm(nextProduct));
      setStatus(`Saved product: ${nextProduct.name}`);
    } catch (saveError) {
      setStatus(saveError instanceof Error ? saveError.message : "Could not save product.");
    } finally {
      setBusy(false);
    }
  }

  async function saveCollection() {
    const name = collectionForm.name.trim();
    const handle = (collectionForm.handle || slugify(name)).trim();

    if (!name || !handle) {
      setStatus("Collection name and handle are required.");
      return;
    }

    const nextCollection: Collection = {
      handle,
      name,
      eyebrow: collectionForm.eyebrow,
      description: collectionForm.description,
      accent: collectionForm.accent,
      heroImage: collectionForm.heroImage,
      tags: parseList(collectionForm.tags)
    };

    setBusy(true);
    setStatus(null);

    try {
      await upsertCollection(nextCollection);
      setSelectedCollectionHandle(nextCollection.handle);
      setCollectionForm(toCollectionForm(nextCollection));
      setStatus(`Saved collection: ${nextCollection.name}`);
    } catch (saveError) {
      setStatus(saveError instanceof Error ? saveError.message : "Could not save collection.");
    } finally {
      setBusy(false);
    }
  }

  async function removeProduct() {
    if (!selectedProductId) {
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      await deleteProduct(selectedProductId);
      setSelectedProductId("");
      setProductForm(emptyProduct(collections[0]?.handle ?? ""));
      setStatus("Product deleted.");
    } catch (deleteError) {
      setStatus(deleteError instanceof Error ? deleteError.message : "Could not delete product.");
    } finally {
      setBusy(false);
    }
  }

  async function removeCollection() {
    if (!selectedCollectionHandle) {
      return;
    }

    setBusy(true);
    setStatus(null);

    try {
      await deleteCollection(selectedCollectionHandle);
      setSelectedCollectionHandle("");
      setCollectionForm(emptyCollection());
      setStatus("Collection deleted.");
    } catch (deleteError) {
      setStatus(deleteError instanceof Error ? deleteError.message : "Could not delete collection.");
    } finally {
      setBusy(false);
    }
  }

  async function handleProductImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const image = await fileToDataUrl(file);
    setProductForm((current) => ({ ...current, image }));
  }

  async function handleCollectionImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const image = await fileToDataUrl(file);
    setCollectionForm((current) => ({ ...current, heroImage: image }));
  }

  return (
    <div className="container-shell py-10">
      <section className="overflow-hidden rounded-[2.6rem] border border-bone/10 bg-[radial-gradient(circle_at_top_left,rgba(125,16,16,0.18),transparent_24%),rgba(255,255,255,0.03)]">
        <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
          <div className="space-y-5">
            <p className="eyebrow">Admin Visible / Test Mode</p>
            <h1 className="font-serif text-5xl uppercase leading-none sm:text-6xl lg:text-7xl">
              Build the catalog fast.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-bone/68">
              This panel is open on purpose so you can test how easy it is to create products,
              assign collections, load images, set prices, sizes, stock, and brand copy without
              touching code.
            </p>
            {!configured ? (
              <div className="rounded-[1.6rem] border border-ember/30 bg-ember/10 p-4 text-sm leading-7 text-bone/75">
                Supabase is not configured. Add the values from `.env.example`, run the SQL in `supabase/schema.sql`, and reload.
              </div>
            ) : null}
            {error ? (
              <div className="rounded-[1.6rem] border border-ember/30 bg-ember/10 p-4 text-sm leading-7 text-bone/75">
                {error}
              </div>
            ) : null}
            {status ? (
              <div className="rounded-[1.6rem] border border-bone/10 bg-white/[0.03] p-4 text-sm leading-7 text-bone/75">
                {status}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full bg-bone px-6 py-3 text-xs uppercase tracking-[0.22em] text-abyss transition hover:bg-white"
              >
                Open storefront
              </Link>
              <button
                type="button"
                onClick={() => {
                  const next = emptyProduct(collections[0]?.handle ?? "");
                  setSelectedProductId("");
                  setProductForm(next);
                }}
                disabled={busy}
                className="rounded-full border border-bone/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-bone transition hover:border-bone/40"
              >
                New product
              </button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Products", value: products.length, note: "Live catalog entries" },
                { label: "Collections", value: collections.length, note: "Drop and archive groups" },
                { label: "Stock Units", value: totalStock, note: "Inventory count in Supabase" },
                { label: "Status", value: loading ? "..." : "Live", note: configured ? "Connected to Supabase" : "Waiting for env vars" }
              ].map((metric) => (
              <div key={metric.label} className="panel rounded-[1.8rem] p-5">
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">
                  {metric.label}
                </p>
                <p className="mt-4 font-serif text-5xl uppercase leading-none">{metric.value}</p>
                <p className="mt-3 text-sm leading-7 text-bone/58">{metric.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-8 py-12 xl:grid-cols-[0.56fr_0.44fr]">
        <div className="space-y-8">
          <div className="panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Products</p>
                <h2 className="mt-3 font-serif text-4xl uppercase">Create and edit</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const next = emptyProduct(collections[0]?.handle ?? "");
                  setSelectedProductId("");
                  setProductForm(next);
                }}
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-bone/70 transition hover:border-bone/40 hover:text-bone"
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Product
                  <select
                    value={selectedProductId}
                    onChange={(event) => handleProductSelection(event.target.value)}
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  >
                    <option value="">New product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Collection handle
                  {collections.length > 0 ? (
                    <select
                      value={productForm.collection}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, collection: event.target.value }))
                      }
                      className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                    >
                      {collections.map((collection) => (
                        <option key={collection.handle} value={collection.handle}>
                          {collection.name} ({collection.handle})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      value={productForm.collection}
                      onChange={(event) =>
                        setProductForm((current) => ({ ...current, collection: event.target.value }))
                      }
                      placeholder="create-collection-first"
                      className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                    />
                  )}
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Name
                  <input
                    value={productForm.name}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Handle
                  <input
                    value={productForm.handle}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, handle: event.target.value }))
                    }
                    placeholder="auto-from-name"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-bone/60">
                Tagline
                <input
                  value={productForm.tagline}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, tagline: event.target.value }))
                  }
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-4">
                <label className="grid gap-2 text-sm text-bone/60">
                  Price
                  <input
                    value={productForm.price}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, price: event.target.value }))
                    }
                    type="number"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Compare at
                  <input
                    value={productForm.compareAtPrice}
                    onChange={(event) =>
                      setProductForm((current) => ({
                        ...current,
                        compareAtPrice: event.target.value
                      }))
                    }
                    type="number"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Stock
                  <input
                    value={productForm.stock}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, stock: event.target.value }))
                    }
                    type="number"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Category
                  <input
                    value={productForm.category}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, category: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <label className="grid gap-2 text-sm text-bone/60">
                  Color
                  <input
                    value={productForm.color}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, color: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Sizes
                  <input
                    value={productForm.sizes}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, sizes: event.target.value }))
                    }
                    placeholder="S, M, L, XL"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Badges
                  <input
                    value={productForm.badges}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, badges: event.target.value }))
                    }
                    placeholder="Limited Drop, Low Stock"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-bone/60">
                Description
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, description: event.target.value }))
                  }
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Material
                  <textarea
                    rows={3}
                    value={productForm.material}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, material: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Fit
                  <textarea
                    rows={3}
                    value={productForm.fit}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, fit: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Care
                  <textarea
                    rows={3}
                    value={productForm.care}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, care: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Shipping
                  <textarea
                    rows={3}
                    value={productForm.shipping}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, shipping: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-bone/60">
                Spotlight copy
                <textarea
                  rows={3}
                  value={productForm.spotlight}
                  onChange={(event) =>
                    setProductForm((current) => ({ ...current, spotlight: event.target.value }))
                  }
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <label className="grid gap-2 text-sm text-bone/60">
                  Image URL or uploaded asset
                  <input
                    value={productForm.image}
                    onChange={(event) =>
                      setProductForm((current) => ({ ...current, image: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                  <span className="text-xs leading-6 text-bone/42">
                    Product main image: `4:5` portrait. Recommended `2000x2500`, minimum `1600x2000`.
                  </span>
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProductImageUpload}
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone file:mr-3 file:border-0 file:bg-bone file:px-3 file:py-2 file:text-xs file:uppercase file:tracking-[0.18em] file:text-abyss"
                  />
                </label>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={saveProduct}
                    disabled={busy || !configured}
                    className="rounded-full bg-bone px-6 py-3 text-xs uppercase tracking-[0.22em] text-abyss transition hover:bg-white"
                  >
                    {busy ? "Saving..." : "Save product"}
                  </button>
                {selectedProductId ? (
                  <button
                    type="button"
                    onClick={removeProduct}
                    disabled={busy || !configured}
                    className="inline-flex items-center gap-2 rounded-full border border-ember/35 px-6 py-3 text-xs uppercase tracking-[0.22em] text-ember transition hover:border-ember/70"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                ) : null}
                {productForm.handle || productForm.name ? (
                  <Link
                    href={`/products/${productForm.handle || slugify(productForm.name)}`}
                    className="rounded-full border border-bone/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-bone transition hover:border-bone/40"
                  >
                    Preview product
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <p className="eyebrow">Current products</p>
            <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-bone/10">
              <div className="grid grid-cols-[1.3fr_0.6fr_0.5fr_0.4fr] border-b border-bone/10 bg-white/[0.03] px-4 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-bone/42">
                <span>Product</span>
                <span>Collection</span>
                <span>Price</span>
                <span>Edit</span>
              </div>
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[1.3fr_0.6fr_0.5fr_0.4fr] items-center gap-3 border-b border-bone/10 px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-[1rem] border border-bone/10">
                      <Image src={product.images[0].src} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.14em] text-bone">{product.name}</p>
                      <p className="text-xs text-bone/45">{product.handle}</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-bone/60">{product.collection}</span>
                  <span className="text-xs uppercase tracking-[0.16em] text-bone/60">{formatPrice(product.price)}</span>
                  <button
                    type="button"
                    onClick={() => handleProductSelection(product.id)}
                    className="rounded-full border border-bone/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-bone/60 transition hover:border-bone/35 hover:text-bone"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="panel rounded-[2rem] p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Collections</p>
                <h2 className="mt-3 font-serif text-4xl uppercase">Create groups and drops</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedCollectionHandle("");
                  setCollectionForm(emptyCollection());
                }}
                className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-4 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-bone/70 transition hover:border-bone/40 hover:text-bone"
              >
                <Plus className="h-3.5 w-3.5" />
                New
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm text-bone/60">
                Collection
                <select
                  value={selectedCollectionHandle}
                  onChange={(event) => handleCollectionSelection(event.target.value)}
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                >
                  <option value="">New collection</option>
                  {collections.map((collection) => (
                    <option key={collection.handle} value={collection.handle}>
                      {collection.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Name
                  <input
                    value={collectionForm.name}
                    onChange={(event) =>
                      setCollectionForm((current) => ({ ...current, name: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Handle
                  <input
                    value={collectionForm.handle}
                    onChange={(event) =>
                      setCollectionForm((current) => ({ ...current, handle: event.target.value }))
                    }
                    placeholder="auto-from-name"
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <label className="grid gap-2 text-sm text-bone/60">
                  Eyebrow
                  <input
                    value={collectionForm.eyebrow}
                    onChange={(event) =>
                      setCollectionForm((current) => ({ ...current, eyebrow: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Accent
                  <input
                    value={collectionForm.accent}
                    onChange={(event) =>
                      setCollectionForm((current) => ({ ...current, accent: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-bone/60">
                Description
                <textarea
                  rows={4}
                  value={collectionForm.description}
                  onChange={(event) =>
                    setCollectionForm((current) => ({ ...current, description: event.target.value }))
                  }
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                />
              </label>

              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <label className="grid gap-2 text-sm text-bone/60">
                  Hero image
                  <input
                    value={collectionForm.heroImage}
                    onChange={(event) =>
                      setCollectionForm((current) => ({ ...current, heroImage: event.target.value }))
                    }
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                  />
                  <span className="text-xs leading-6 text-bone/42">
                    Collection hero: `16:9`. Recommended `2400x1350`, minimum `2000x1125`.
                  </span>
                </label>
                <label className="grid gap-2 text-sm text-bone/60">
                  Upload hero
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCollectionImageUpload}
                    className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone file:mr-3 file:border-0 file:bg-bone file:px-3 file:py-2 file:text-xs file:uppercase file:tracking-[0.18em] file:text-abyss"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm text-bone/60">
                Tags
                <input
                  value={collectionForm.tags}
                  onChange={(event) =>
                    setCollectionForm((current) => ({ ...current, tags: event.target.value }))
                  }
                  placeholder="Limited Drop, Editorial"
                  className="rounded-[1rem] border border-bone/10 bg-black/35 px-4 py-3 text-bone outline-none"
                />
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={saveCollection}
                  disabled={busy || !configured}
                  className="rounded-full bg-bone px-6 py-3 text-xs uppercase tracking-[0.22em] text-abyss transition hover:bg-white"
                >
                  {busy ? "Saving..." : "Save collection"}
                </button>
                {selectedCollectionHandle ? (
                  <button
                    type="button"
                    onClick={removeCollection}
                    disabled={busy || !configured}
                    className="inline-flex items-center gap-2 rounded-full border border-ember/35 px-6 py-3 text-xs uppercase tracking-[0.22em] text-ember transition hover:border-ember/70"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                ) : null}
                {collectionForm.handle || collectionForm.name ? (
                  <Link
                    href={`/collections/${collectionForm.handle || slugify(collectionForm.name)}`}
                    className="rounded-full border border-bone/15 px-6 py-3 text-xs uppercase tracking-[0.22em] text-bone transition hover:border-bone/40"
                  >
                    Preview collection
                  </Link>
                ) : null}
              </div>
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <p className="eyebrow">Collections live</p>
            <div className="mt-5 grid gap-4">
              {collections.map((collection) => (
                <div key={collection.handle} className="rounded-[1.5rem] border border-bone/10 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/10 bg-white/[0.02]">
                        <FolderKanban className="h-4 w-4 text-bone/55" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.16em] text-bone">{collection.name}</p>
                        <p className="text-xs text-bone/45">{collection.handle}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCollectionSelection(collection.handle)}
                      className="rounded-full border border-bone/10 px-3 py-2 text-[0.62rem] uppercase tracking-[0.2em] text-bone/60 transition hover:border-bone/35 hover:text-bone"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-bone/58">{collection.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <p className="eyebrow">Storefront wiring</p>
            <h2 className="mt-3 font-serif text-4xl uppercase">Already connected</h2>
            <div className="mt-6 grid gap-4">
              {[
                {
                  title: "Homepage products",
                  detail: "Featured grid and spotlight use the admin catalog state.",
                  icon: Package2
                },
                {
                  title: "Dynamic collections",
                  detail: "New collections become reachable under their handle immediately.",
                  icon: FolderKanban
                },
                {
                  title: "Campaign blocks",
                  detail: `Lookbook (${lookbook.length}) and culture feed (${cultureFeed.length}) stay visible while catalog changes.`
                }
              ].map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-bone/10 bg-white/[0.02] p-4">
                  <p className="text-sm uppercase tracking-[0.16em] text-bone">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-bone/58">{item.detail}</p>
                </div>
              ))}
              <div className="rounded-[1.4rem] border border-bone/10 bg-white/[0.02] p-4">
                <p className="text-sm uppercase tracking-[0.16em] text-bone">Hero campaign</p>
                <p className="mt-3 text-sm leading-7 text-bone/58">
                  Current storefront hero remains on brand: {siteConfig.hero.title.replace("\n", " ")}
                </p>
              </div>
            </div>
          </div>

          <div className="panel rounded-[2rem] p-6">
            <p className="eyebrow">Asset Specs</p>
            <h2 className="mt-3 font-serif text-4xl uppercase">Upload dimensions</h2>
            <div className="mt-6 grid gap-3">
              {[
                {
                  title: "Collection hero",
                  detail: "16:9, recommended 2400x1350, minimum 2000x1125"
                },
                {
                  title: "Product main image",
                  detail: "4:5 portrait, recommended 2000x2500, minimum 1600x2000"
                },
                {
                  title: "Lookbook image",
                  detail: "3:4 portrait, recommended 1800x2400, minimum 1350x1800"
                },
                {
                  title: "Culture / social tile",
                  detail: "4:5 portrait, recommended 1080x1350"
                },
                {
                  title: "Category card",
                  detail: "9:7 landscape, recommended 1800x1400"
                },
                {
                  title: "Logo / favicon source",
                  detail: "1:1 square, recommended 1024x1024 or SVG"
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.4rem] border border-bone/10 bg-white/[0.02] px-4 py-3"
                >
                  <p className="text-sm uppercase tracking-[0.16em] text-bone">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-bone/58">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
