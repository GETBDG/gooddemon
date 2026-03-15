import type { Metadata } from "next";
import { CollectionRouteShell } from "@/components/collection-route-shell";
import { getCollectionByHandle } from "@/content/site";

type Props = {
  params: {
    handle: string;
  };
  searchParams?: {
    category?: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const collection = getCollectionByHandle(params.handle);

  return {
    title: collection ? `${collection.name} | GOODDEMON` : "Collection | GOODDEMON",
    description:
      collection?.description ?? "GOODDEMON collection page. Preview collections created from admin."
  };
}

export default function CollectionPage({ params, searchParams }: Props) {
  return (
    <CollectionRouteShell handle={params.handle} initialCategory={searchParams?.category} />
  );
}
