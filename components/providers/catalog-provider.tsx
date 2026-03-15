"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  collections as seedCollections,
  getCollectionByHandle as getSeedCollectionByHandle,
  getProductByHandle as getSeedProductByHandle,
  products as seedProducts
} from "@/content/site";
import type { Collection, Product } from "@/lib/types";

type CatalogContextValue = {
  products: Product[];
  collections: Collection[];
  hydrated: boolean;
  upsertProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  upsertCollection: (collection: Collection) => void;
  deleteCollection: (handle: string) => void;
  getProductByHandle: (handle: string) => Product | undefined;
  getCollectionByHandle: (handle: string) => Collection | undefined;
  getProductsByCollection: (handle: string) => Product[];
};

const PRODUCTS_KEY = "gooddemon-admin-products";
const COLLECTIONS_KEY = "gooddemon-admin-collections";

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [collections, setCollections] = useState<Collection[]>(seedCollections);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const rawProducts = window.localStorage.getItem(PRODUCTS_KEY);
    const rawCollections = window.localStorage.getItem(COLLECTIONS_KEY);

    if (rawProducts) {
      setProducts(JSON.parse(rawProducts));
    }

    if (rawCollections) {
      setCollections(JSON.parse(rawCollections));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [hydrated, products]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
  }, [collections, hydrated]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      collections,
      hydrated,
      upsertProduct: (product) => {
        setProducts((current) => {
          const exists = current.some((entry) => entry.id === product.id);
          return exists
            ? current.map((entry) => (entry.id === product.id ? product : entry))
            : [product, ...current];
        });
      },
      deleteProduct: (productId) => {
        setProducts((current) => current.filter((entry) => entry.id !== productId));
      },
      upsertCollection: (collection) => {
        setCollections((current) => {
          const exists = current.some((entry) => entry.handle === collection.handle);
          return exists
            ? current.map((entry) => (entry.handle === collection.handle ? collection : entry))
            : [collection, ...current];
        });
      },
      deleteCollection: (handle) => {
        setCollections((current) => current.filter((entry) => entry.handle !== handle));
      },
      getProductByHandle: (handle) =>
        products.find((product) => product.handle === handle) ?? getSeedProductByHandle(handle),
      getCollectionByHandle: (handle) =>
        collections.find((collection) => collection.handle === handle) ??
        getSeedCollectionByHandle(handle),
      getProductsByCollection: (handle) =>
        products.filter((product) => product.collection === handle)
    }),
    [collections, hydrated, products]
  );

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog must be used within CatalogProvider");
  }

  return context;
}
