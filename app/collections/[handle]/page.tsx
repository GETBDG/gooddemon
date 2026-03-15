import type { Metadata } from "next";
import { CollectionRouteShell } from "@/components/collection-route-shell";

type Props = {
  params: {
    handle: string;
  };
  searchParams?: {
    category?: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  return {
    title: "Collection | GOODDEMON",
    description: `GOODDEMON collection page for ${params.handle}. Loaded from Supabase catalog.`
  };
}

export default function CollectionPage({ params, searchParams }: Props) {
  return (
    <CollectionRouteShell handle={params.handle} initialCategory={searchParams?.category} />
  );
}
