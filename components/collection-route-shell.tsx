"use client";

import { CollectionShell } from "@/components/collection-shell";
import { useCatalog } from "@/components/providers/catalog-provider";

export function CollectionRouteShell({
  handle,
  initialCategory
}: {
  handle: string;
  initialCategory?: string;
}) {
  const { getCollectionByHandle, getProductsByCollection, hydrated } = useCatalog();
  const collection = getCollectionByHandle(handle);

  if (!collection && !hydrated) {
    return (
      <div className="container-shell py-16">
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow">Loading collection</p>
          <p className="mt-4 text-sm text-bone/62">Resolving local admin catalog data.</p>
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="container-shell py-16">
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow">Collection missing</p>
          <h1 className="mt-4 font-serif text-4xl uppercase">This collection does not exist.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-bone/62">
            Create it from the visible admin panel or check the handle used in the URL.
          </p>
        </div>
      </div>
    );
  }

  return (
    <CollectionShell
      collection={collection}
      products={getProductsByCollection(handle)}
      initialCategory={initialCategory}
    />
  );
}
