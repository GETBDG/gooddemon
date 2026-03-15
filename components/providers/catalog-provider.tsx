"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Collection, Product } from "@/lib/types";
import {
  deleteCollection as deleteCollectionRecord,
  deleteProduct as deleteProductRecord,
  fetchCollections,
  fetchProducts,
  upsertCollection as upsertCollectionRecord,
  upsertProduct as upsertProductRecord
} from "@/lib/supabase/catalog";
import { getSupabaseBrowserClient, hasSupabaseConfig } from "@/lib/supabase/client";

type CatalogContextValue = {
  products: Product[];
  collections: Collection[];
  hydrated: boolean;
  loading: boolean;
  error: string | null;
  configured: boolean;
  refreshCatalog: () => Promise<void>;
  upsertProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  upsertCollection: (collection: Collection) => Promise<void>;
  deleteCollection: (handle: string) => Promise<void>;
  getProductByHandle: (handle: string) => Product | undefined;
  getCollectionByHandle: (handle: string) => Collection | undefined;
  getProductsByCollection: (handle: string) => Product[];
};

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCatalog = useCallback(async () => {
    const client = getSupabaseBrowserClient();

    if (!client) {
      setProducts([]);
      setCollections([]);
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      setHydrated(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [nextCollections, nextProducts] = await Promise.all([
        fetchCollections(client),
        fetchProducts(client)
      ]);

      setCollections(nextCollections);
      setProducts(nextProducts);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Could not load catalog from Supabase.");
    } finally {
      setLoading(false);
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    void refreshCatalog();
  }, [refreshCatalog]);

  const value = useMemo<CatalogContextValue>(
    () => ({
      products,
      collections,
      hydrated,
      loading,
      error,
      configured: hasSupabaseConfig,
      refreshCatalog,
      upsertProduct: async (product) => {
        const client = getSupabaseBrowserClient();

        if (!client) {
          throw new Error("Supabase is not configured.");
        }

        await upsertProductRecord(client, product);
        await refreshCatalog();
      },
      deleteProduct: async (productId) => {
        const client = getSupabaseBrowserClient();

        if (!client) {
          throw new Error("Supabase is not configured.");
        }

        await deleteProductRecord(client, productId);
        await refreshCatalog();
      },
      upsertCollection: async (collection) => {
        const client = getSupabaseBrowserClient();

        if (!client) {
          throw new Error("Supabase is not configured.");
        }

        await upsertCollectionRecord(client, collection);
        await refreshCatalog();
      },
      deleteCollection: async (handle) => {
        const client = getSupabaseBrowserClient();

        if (!client) {
          throw new Error("Supabase is not configured.");
        }

        await deleteCollectionRecord(client, handle);
        await refreshCatalog();
      },
      getProductByHandle: (handle) => products.find((product) => product.handle === handle),
      getCollectionByHandle: (handle) =>
        collections.find((collection) => collection.handle === handle),
      getProductsByCollection: (handle) =>
        products.filter((product) => product.collection === handle)
    }),
    [collections, error, hydrated, loading, products, refreshCatalog]
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
