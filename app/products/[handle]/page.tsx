import type { Metadata } from "next";
import { ProductRouteShell } from "@/components/product-route-shell";

type Props = {
  params: {
    handle: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: "Product | GOODDEMON",
    description: `GOODDEMON product detail for ${params.handle}. Loaded from Supabase catalog.`,
    openGraph: {
      title: "Product | GOODDEMON",
      description: `GOODDEMON product detail for ${params.handle}. Loaded from Supabase catalog.`
    }
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductRouteShell handle={params.handle} />;
}
