import type { Metadata } from "next";
import { ProductRouteShell } from "@/components/product-route-shell";
import { getProductByHandle } from "@/content/site";

type Props = {
  params: {
    handle: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductByHandle(params.handle);

  return {
    title: product ? `${product.name} | GOODDEMON` : "Product | GOODDEMON",
    description:
      product?.description ?? "GOODDEMON product detail. Preview products created from admin.",
    openGraph: {
      title: product ? `${product.name} | GOODDEMON` : "Product | GOODDEMON",
      description:
        product?.description ?? "GOODDEMON product detail. Preview products created from admin."
    }
  };
}

export default function ProductPage({ params }: Props) {
  return <ProductRouteShell handle={params.handle} />;
}
