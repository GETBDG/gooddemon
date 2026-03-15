"use client";

import { ProductDetailShell } from "@/components/product-detail-shell";
import { useCatalog } from "@/components/providers/catalog-provider";

export function ProductRouteShell({ handle }: { handle: string }) {
  const { getProductByHandle, hydrated } = useCatalog();
  const product = getProductByHandle(handle);

  if (!product && !hydrated) {
    return (
      <div className="container-shell py-16">
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow">Loading product</p>
          <p className="mt-4 text-sm text-bone/62">Loading catalog data from Supabase.</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-shell py-16">
        <div className="panel rounded-[2rem] p-8">
          <p className="eyebrow">Product missing</p>
          <h1 className="mt-4 font-serif text-4xl uppercase">This product does not exist.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-bone/62">
            Create it in `/admin` and save it to Supabase, or check the handle used in the URL.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetailShell product={product} />;
}
