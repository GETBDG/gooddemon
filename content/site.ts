import type { CategoryCard, Collection, CultureItem, LookbookItem, Product } from "@/lib/types";

export const siteConfig = {
  name: "GOODDEMON",
  title: "GOODDEMON | Wear the Contradiction",
  description:
    "GOODDEMON is a luxury underground streetwear label built around betrayal, faith, and the sacred-profane contradiction.",
  announcement: "The Betrayal drop is live. Limited release pieces disappear without warning.",
  hero: {
    eyebrow: "Luxury Underground Streetwear",
    title: "GOOD AND DEMON\nWEAR THE SAME SKIN.",
    subtitle: "Fashion for the faithful, the broken, and the forbidden.",
    ctas: [
      { label: "Shop the Drop", href: "/collections/the-betrayal" },
      { label: "Enter the Betrayal", href: "#drop" }
    ],
    metrics: [
      { label: "Drop", value: "The Betrayal / 01" },
      { label: "Pieces", value: "18 Limited Forms" },
      { label: "Shipping", value: "Global / 2-5 Days" }
    ]
  },
  manifesto: [
    "GOODDEMON was not built to decorate a catalog. It was built for people who understand that loyalty always leaves a mark.",
    "The silhouette is disciplined. The emotion is not. Every piece carries tension between sacred ritual and private collapse.",
    "You do not wear GOODDEMON to fit in. You wear it when contradiction is the most honest thing left."
  ],
  emailCapture: {
    title: "Join the first circle.",
    subtitle: "Get access before the rest. Private drops. Restock signals. Campaign-only releases."
  },
  footerStatement:
    "GOODDEMON is fashion for the loyal, the fractured, and the unrepentant."
};

export const collections: Collection[] = [
  {
    handle: "the-betrayal",
    name: "The Betrayal",
    eyebrow: "Current Drop",
    description:
      "A ceremonial release built around fracture, sacrifice, and the elegance of disobedience.",
    accent: "Blood Accent",
    heroImage: "/images/collection-betrayal.svg",
    tags: ["Limited Drop", "Campaign", "Editorial"]
  },
  {
    handle: "the-faithless",
    name: "The Faithless",
    eyebrow: "Archive Sequence",
    description:
      "Muted tones, cold metals, and silhouettes that feel lit from a final confession.",
    accent: "Cold Silver",
    heroImage: "/images/collection-faithless.svg",
    tags: ["Archived", "Outerwear", "Uniform"]
  }
];

export const products: Product[] = [
  {
    id: "gd-001",
    handle: "betrayal-veil-hoodie",
    name: "Betrayal Veil Hoodie",
    tagline: "Heavy fleece armor for public silence.",
    price: 240,
    compareAtPrice: 290,
    collection: "the-betrayal",
    category: "Hoodies",
    color: "Abyss Black",
    badges: ["Limited Drop", "Low Stock"],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    description:
      "Structured heavyweight fleece with a dropped shoulder and tonal sigil embroidery placed like a private warning.",
    material: "520gsm brushed cotton fleece with enzyme wash and tonal embroidery.",
    fit: "Relaxed silhouette with cropped body and extended sleeve drop.",
    care: "Cold wash inside out. Dry flat. Do not bleach.",
    shipping: "Ships worldwide in 2-5 business days. Signature required on limited drops.",
    images: [
      { src: "/images/product-hoodie-front.svg", alt: "Betrayal Veil Hoodie front" },
      { src: "/images/product-hoodie-back.svg", alt: "Betrayal Veil Hoodie back" },
      { src: "/images/product-hoodie-detail.svg", alt: "Betrayal Veil Hoodie detail" }
    ],
    spotlight:
      "This piece was made for those who know loyalty has a cost."
  },
  {
    id: "gd-002",
    handle: "same-skin-tee",
    name: "Same Skin Tee",
    tagline: "A ritual uniform cut from contradiction.",
    price: 120,
    collection: "the-betrayal",
    category: "Tees",
    color: "Bone White",
    badges: ["Exclusive Release"],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    description:
      "Boxy cotton tee with front scripture graphic and bleeding seam print that exposes the tension between innocence and corrosion.",
    material: "310gsm combed cotton jersey with vintage wash.",
    fit: "Boxy and slightly cropped with clean drape at the shoulder.",
    care: "Cold wash. Hang dry. Avoid heat on graphic panel.",
    shipping: "Ships worldwide in 2-5 business days.",
    images: [
      { src: "/images/product-tee-front.svg", alt: "Same Skin Tee front" },
      { src: "/images/product-tee-back.svg", alt: "Same Skin Tee back" },
      { src: "/images/product-tee-detail.svg", alt: "Same Skin Tee detail" }
    ],
    spotlight: "Wear the contradiction."
  },
  {
    id: "gd-003",
    handle: "faithless-bomber",
    name: "Faithless Bomber",
    tagline: "Cold hardware. Clean silhouette. No forgiveness.",
    price: 420,
    collection: "the-faithless",
    category: "Outerwear",
    color: "Charcoal",
    badges: ["Archived"],
    sizes: ["M", "L", "XL"],
    stock: 0,
    description:
      "Technical bomber with oversized sleeve volume, matte hardware, and quilt channels designed to feel like armor rather than comfort.",
    material: "Nylon shell, insulated lining, matte silver hardware.",
    fit: "Structured oversized body with cropped hem and sculpted sleeve.",
    care: "Specialist clean only.",
    shipping: "Archived product. Restock notification available.",
    images: [
      { src: "/images/product-bomber-front.svg", alt: "Faithless Bomber front" },
      { src: "/images/product-bomber-back.svg", alt: "Faithless Bomber back" },
      { src: "/images/product-bomber-detail.svg", alt: "Faithless Bomber detail" }
    ],
    spotlight: "The sacred broke first."
  },
  {
    id: "gd-004",
    handle: "forbidden-rosary-cap",
    name: "Forbidden Rosary Cap",
    tagline: "An accessory that reads like a quiet threat.",
    price: 85,
    collection: "the-betrayal",
    category: "Accessories",
    color: "Abyss Black",
    badges: ["Limited Drop"],
    sizes: ["One Size"],
    stock: 11,
    description:
      "Structured six-panel cap with metallic icon plaque and inner tape printed with campaign scripture.",
    material: "Cotton twill, silver-tone plaque, woven inner tape.",
    fit: "Adjustable strap with deep crown profile.",
    care: "Spot clean only.",
    shipping: "Ships worldwide in 2-5 business days.",
    images: [
      { src: "/images/product-cap-front.svg", alt: "Forbidden Rosary Cap front" },
      { src: "/images/product-cap-back.svg", alt: "Forbidden Rosary Cap back" },
      { src: "/images/product-cap-detail.svg", alt: "Forbidden Rosary Cap detail" }
    ],
    spotlight: "The kind of piece that finishes the sentence without raising its voice."
  }
];

export const categories: CategoryCard[] = [
  {
    slug: "tees",
    title: "Tees",
    subtitle: "Scripture in cotton form.",
    image: "/images/category-tees.svg",
    href: "/collections/the-betrayal?category=Tees"
  },
  {
    slug: "hoodies",
    title: "Hoodies",
    subtitle: "Heavy silhouettes, private damage.",
    image: "/images/category-hoodies.svg",
    href: "/collections/the-betrayal?category=Hoodies"
  },
  {
    slug: "outerwear",
    title: "Outerwear",
    subtitle: "Armor for colder rituals.",
    image: "/images/category-outerwear.svg",
    href: "/collections/the-faithless?category=Outerwear"
  },
  {
    slug: "accessories",
    title: "Accessories",
    subtitle: "Objects with memory.",
    image: "/images/category-accessories.svg",
    href: "/collections/the-betrayal?category=Accessories"
  },
  {
    slug: "limited-pieces",
    title: "Limited Pieces",
    subtitle: "Disappear first. Return last.",
    image: "/images/category-limited.svg",
    href: "/collections/the-betrayal"
  },
  {
    slug: "new-drop",
    title: "New Drop",
    subtitle: "The latest fracture in full view.",
    image: "/images/category-drop.svg",
    href: "/collections/the-betrayal"
  }
];

export const lookbook: LookbookItem[] = [
  {
    id: "look-01",
    title: "Ceremony I",
    image: "/images/lookbook-01.svg",
    caption: "Bone jersey under concrete light. The silhouette stays disciplined while the message bleeds.",
    productHandles: ["same-skin-tee", "forbidden-rosary-cap"]
  },
  {
    id: "look-02",
    title: "Ceremony II",
    image: "/images/lookbook-02.svg",
    caption: "Heavy fleece, black void, silver interruption.",
    productHandles: ["betrayal-veil-hoodie"]
  },
  {
    id: "look-03",
    title: "Ceremony III",
    image: "/images/lookbook-03.svg",
    caption: "Outerwear that feels archival, not nostalgic.",
    productHandles: ["faithless-bomber"]
  }
];

export const cultureFeed: CultureItem[] = [
  {
    id: "culture-01",
    title: "Campaign Teaser",
    channel: "Instagram",
    image: "/images/culture-01.svg"
  },
  {
    id: "culture-02",
    title: "Drop Countdown Reel",
    channel: "TikTok",
    image: "/images/culture-02.svg"
  },
  {
    id: "culture-03",
    title: "Studio Fragment",
    channel: "Instagram",
    image: "/images/culture-03.svg"
  },
  {
    id: "culture-04",
    title: "Backstage Motion",
    channel: "TikTok",
    image: "/images/culture-04.svg"
  }
];

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getCollectionByHandle(handle: string) {
  return collections.find((collection) => collection.handle === handle);
}

export function getProductsByCollection(handle: string) {
  return products.filter((product) => product.collection === handle);
}
