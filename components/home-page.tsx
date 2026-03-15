"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { useCatalog } from "@/components/providers/catalog-provider";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { Wordmark } from "@/components/ui/logo";
import { categories, cultureFeed, lookbook, siteConfig } from "@/content/site";
import { formatPrice } from "@/lib/utils";

function HeroSection() {
  const { collections } = useCatalog();
  const primaryCollection = collections[0];
  const heroCtas = [
    { label: "Shop the Drop", href: primaryCollection ? `/collections/${primaryCollection.handle}` : "/admin" },
    { label: "Enter the Control Room", href: primaryCollection ? "#drop" : "/admin" }
  ];

  return (
    <section className="container-shell relative min-h-[calc(100vh-88px)] py-10">
      <div className="grid min-h-[78vh] gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <FadeIn className="relative overflow-hidden rounded-[2.5rem] border border-bone/10 bg-black/40 p-8 sm:p-10 lg:p-14">
          <div className="absolute inset-0">
            <Image src="/images/hero-campaign.svg" alt="GOODDEMON campaign hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,16,16,0.28),transparent_34%)]" />
          </div>
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div className="space-y-5">
              <p className="eyebrow">{siteConfig.hero.eyebrow}</p>
              <div className="panel inline-flex max-w-full rounded-[2rem] px-5 py-4 sm:px-7 sm:py-5">
                <Wordmark />
              </div>
              <h1 className="max-w-4xl whitespace-pre-line font-serif text-[2.9rem] uppercase leading-[0.9] sm:text-[4.2rem] lg:text-[5.6rem]">
                {siteConfig.hero.title}
              </h1>
              <p className="max-w-xl text-base leading-8 text-bone/72 sm:text-lg">{siteConfig.hero.subtitle}</p>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {heroCtas.map((cta, index) => (
                  <Button key={cta.label} href={cta.href} variant={index === 0 ? "primary" : "secondary"}>
                    {cta.label}
                  </Button>
                ))}
              </div>
              <div className="grid gap-4 rounded-[2rem] border border-bone/10 bg-black/45 p-5 sm:grid-cols-3">
                {siteConfig.hero.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/35">{metric.label}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.16em] text-bone">{metric.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <div className="grid gap-6">
          <FadeIn delay={0.1} className="panel relative overflow-hidden rounded-[2.5rem] p-6 sm:p-8">
            <div className="absolute inset-0">
              <Image src="/images/hero-side.svg" alt="Campaign side frame" fill className="object-cover opacity-70" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
            <div className="relative z-10 flex h-full min-h-[20rem] flex-col justify-between">
              <div className="space-y-3">
                <p className="eyebrow">Campaign / Sequence 01</p>
                <p className="font-serif text-3xl uppercase leading-none sm:text-4xl">The Betrayal</p>
              </div>
              <p className="max-w-sm text-sm leading-7 text-bone/65">
                Built as a drop, shot as a statement. Scarce inventory, campaign-specific copy, and a checkout rhythm designed for urgency.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="grid gap-6 sm:grid-cols-2">
            <div className="panel rounded-[2rem] p-6">
              <p className="eyebrow">Password page is over</p>
              <p className="mt-4 font-serif text-3xl uppercase leading-none">Not a store template. A brand world.</p>
            </div>
            <Link
              href="#drop"
              className="group panel flex min-h-[14rem] flex-col justify-between rounded-[2rem] p-6 transition hover:border-bone/30"
            >
              <span className="eyebrow">Scroll</span>
              <div className="flex items-center justify-between">
                <p className="font-serif text-3xl uppercase">Enter</p>
                <ChevronDown className="h-5 w-5 transition group-hover:translate-y-1" />
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DropSection() {
  const { products } = useCatalog();
  const heroProduct = products[0];

  if (!heroProduct) {
    return (
      <section id="drop" className="container-shell py-20">
        <div className="panel rounded-[2.5rem] p-8 sm:p-10">
          <p className="eyebrow">Catalog Empty</p>
          <h2 className="mt-4 font-serif text-5xl uppercase leading-none">No drop products yet.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-bone/62">
            Connect Supabase, create a collection in `/admin`, then add products. This section will populate from the database automatically.
          </p>
          <div className="mt-6">
            <Button href="/admin">Open Admin</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="drop" className="container-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <FadeIn className="space-y-6">
          <SectionHeading
            eyebrow="New Drop / The Betrayal"
            title="A release built like a confession."
            description="Limited pieces anchored by strong editorial copy, countdown-ready urgency, and badge systems that make scarcity visible without looking cheap."
          />
          <div className="panel rounded-[2rem] p-6">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/35">Status</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">Live now</p>
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/35">Countdown</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">72:14:09</p>
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/35">Urgency</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-bone">Only a few remain</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.slice(0, 2).map((product) => (
              <div key={product.id} className="panel rounded-[2rem] p-5">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/40">{product.badges.join(" / ")}</p>
                <h3 className="mt-3 font-serif text-3xl uppercase">{product.name}</h3>
                <p className="mt-3 text-sm leading-7 text-bone/65">{product.spotlight}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.18em]">{formatPrice(product.price)}</span>
                  <Button href={`/products/${product.handle}`} variant="ghost" className="px-0">
                    View piece
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="relative overflow-hidden rounded-[2.5rem] border border-bone/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(174,180,190,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(125,16,16,0.22),transparent_28%)]" />
          <div className="grid min-h-full gap-6 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="eyebrow">Hero Piece</p>
              <h3 className="font-serif text-5xl uppercase leading-none">{heroProduct.name}</h3>
              <p className="text-sm leading-7 text-bone/65">{heroProduct.description}</p>
              <div className="flex flex-wrap gap-2">
                {heroProduct.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-bone/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] text-bone/70"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <Button href={`/products/${heroProduct.handle}`} className="mt-3">
                Explore Product
              </Button>
            </div>
            <div className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-bone/10 bg-black/30">
              <Image src={heroProduct.images[0].src} alt={heroProduct.images[0].alt} fill className="object-cover" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const { products } = useCatalog();

  return (
    <section className="container-shell py-20">
      <SectionHeading
        eyebrow="Featured Products"
        title="Editorial cards with buying intent."
        description="Second-image hover, quick add, wishlist persistence, premium typography, and enough whitespace for the product to feel expensive."
      />
      {products.length === 0 ? (
        <div className="mt-10 panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-bone/42">No products loaded from Supabase.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.06}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}

function ManifestoSection() {
  return (
    <section id="manifesto" className="container-shell py-20">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <FadeIn>
          <SectionHeading
            eyebrow="Brand Manifesto"
            title="Dress like belief already cracked."
            description="This section is not filler copy. It is where the brand earns its depth."
          />
        </FadeIn>
        <FadeIn delay={0.1} className="grid gap-5">
          {siteConfig.manifesto.map((paragraph) => (
            <div key={paragraph} className="panel rounded-[2rem] p-6 sm:p-8">
              <p className="font-serif text-3xl leading-[1.1] text-bone/92 sm:text-4xl">{paragraph}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}

function LookbookSection() {
  const { products } = useCatalog();
  const availableHandles = new Set(products.map((product) => product.handle));
  const primaryLookbookHandles = lookbook[0].productHandles.filter((handle) =>
    availableHandles.has(handle)
  );

  return (
    <section id="lookbook" className="container-shell py-20">
      <SectionHeading
        eyebrow="Lookbook / Campaign"
        title="Lifestyle that sells the world, not just the SKU."
        description="Asymmetrical layout, full-bleed image blocks, scroll motion, and product linkage embedded inside the editorial system."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn className="relative overflow-hidden rounded-[2.5rem] border border-bone/10 lg:min-h-[44rem]">
          <Image src={lookbook[0].image} alt={lookbook[0].title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 space-y-4 p-8">
            <p className="eyebrow">{lookbook[0].title}</p>
            <p className="max-w-lg font-serif text-4xl leading-none">{lookbook[0].caption}</p>
            {primaryLookbookHandles.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {primaryLookbookHandles.map((handle) => (
                  <Button key={handle} href={`/products/${handle}`} variant="secondary">
                    Shop the Look
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-sm uppercase tracking-[0.18em] text-bone/45">Campaign only</p>
            )}
          </div>
        </FadeIn>
        <div className="grid gap-6">
          {lookbook.slice(1).map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.08} className="grid gap-4 rounded-[2.5rem] border border-bone/10 bg-white/[0.03] p-5 sm:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-bone/10">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="flex flex-col justify-between gap-6 p-2">
                <div>
                  <p className="eyebrow">{item.title}</p>
                  <p className="mt-4 font-serif text-4xl leading-none">{item.caption}</p>
                </div>
                {item.productHandles.some((handle) => availableHandles.has(handle)) ? (
                  <div className="flex flex-wrap gap-2">
                    {item.productHandles
                      .filter((handle) => availableHandles.has(handle))
                      .map((handle) => (
                        <Button key={handle} href={`/products/${handle}`} variant="secondary">
                          Open Look
                        </Button>
                      ))}
                  </div>
                ) : (
                  <p className="text-sm uppercase tracking-[0.18em] text-bone/45">Campaign only</p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { collections } = useCatalog();
  const primaryCollection = collections[0];
  const secondaryCollection = collections[1] ?? collections[0];

  return (
    <section className="container-shell py-20">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Every entry point gets its own visual language."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <FadeIn key={category.slug} delay={index * 0.04}>
            <Link
              href={
                category.slug === "outerwear"
                  ? secondaryCollection
                    ? `/collections/${secondaryCollection.handle}`
                    : "/admin"
                  : primaryCollection
                    ? `/collections/${primaryCollection.handle}`
                    : "/admin"
              }
              className="group relative block min-h-[19rem] overflow-hidden rounded-[2.2rem] border border-bone/10"
            >
              <Image src={category.image} alt={category.title} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 space-y-3 p-6">
                <p className="eyebrow">Category</p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-4xl uppercase">{category.title}</p>
                    <p className="mt-2 text-sm text-bone/65">{category.subtitle}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SpotlightSection() {
  const { collections, products } = useCatalog();
  const spotlight = products[2];

  if (!spotlight) {
    return null;
  }

  return (
    <section className="container-shell py-20">
      <div className="grid gap-8 rounded-[2.7rem] border border-bone/10 bg-[linear-gradient(135deg,rgba(174,180,190,0.05),transparent_35%),linear-gradient(225deg,rgba(125,16,16,0.12),transparent_40%)] p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
        <FadeIn className="relative min-h-[36rem] overflow-hidden rounded-[2.2rem] border border-bone/10">
          <Image src={spotlight.images[0].src} alt={spotlight.images[0].alt} fill className="object-cover" />
        </FadeIn>
        <FadeIn delay={0.1} className="flex flex-col justify-center gap-6">
          <p className="eyebrow">Product Spotlight</p>
          <h2 className="font-serif text-5xl uppercase leading-none sm:text-6xl">{spotlight.name}</h2>
          <p className="max-w-xl text-base leading-8 text-bone/68">{spotlight.spotlight}</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel rounded-[1.7rem] p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Fabric</p>
              <p className="mt-3 text-sm text-bone/75">{spotlight.material}</p>
            </div>
            <div className="panel rounded-[1.7rem] p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Fit</p>
              <p className="mt-3 text-sm text-bone/75">{spotlight.fit}</p>
            </div>
            <div className="panel rounded-[1.7rem] p-4">
              <p className="text-[0.62rem] uppercase tracking-[0.28em] text-bone/35">Status</p>
              <p className="mt-3 text-sm text-bone/75">{spotlight.badges[0]}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`/products/${spotlight.handle}`}>View Product</Button>
            <Button
              href={collections[1] ? `/collections/${collections[1].handle}` : "/admin"}
              variant="secondary"
            >
              {collections[1] ? "Explore Archive" : "Open Admin"}
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function CultureFeedSection() {
  return (
    <section className="container-shell py-20">
      <SectionHeading
        eyebrow="Social / Culture Feed"
        title="Make the brand feel alive between drops."
        description="This grid is designed to connect Instagram, TikTok, campaign fragments, and backstage motion without looking like a plug-in widget."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cultureFeed.map((item, index) => (
          <FadeIn key={item.id} delay={index * 0.05} className="group relative min-h-[20rem] overflow-hidden rounded-[2.2rem] border border-bone/10">
            <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-bone/45">{item.channel}</p>
              <p className="mt-3 font-serif text-3xl uppercase">{item.title}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function EmailCaptureSection() {
  return (
    <section className="container-shell py-20">
      <FadeIn className="overflow-hidden rounded-[2.7rem] border border-bone/10 bg-[radial-gradient(circle_at_top_left,rgba(125,16,16,0.22),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(174,180,190,0.16),transparent_24%),rgba(255,255,255,0.03)] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow">Private Access</p>
            <h2 className="font-serif text-5xl uppercase leading-none sm:text-6xl">{siteConfig.emailCapture.title}</h2>
            <p className="max-w-xl text-base leading-8 text-bone/68">{siteConfig.emailCapture.subtitle}</p>
          </div>
          <form className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              type="email"
              placeholder="Email address"
              className="h-14 rounded-full border border-bone/15 bg-black/45 px-6 text-sm tracking-[0.08em] text-bone outline-none placeholder:text-bone/28"
            />
            <Button className="h-14 px-8">Be first to wear the forbidden</Button>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}

export function HomePage() {
  const { collections, loading, error } = useCatalog();

  return (
    <>
      <HeroSection />
      {error ? (
        <section className="container-shell pt-4">
          <div className="rounded-[1.6rem] border border-ember/30 bg-ember/10 p-4 text-sm text-bone/75">
            {error}
          </div>
        </section>
      ) : null}
      <DropSection />
      <FeaturedProductsSection />
      <ManifestoSection />
      <LookbookSection />
      <CategoriesSection />
      <SpotlightSection />
      <CultureFeedSection />
      <EmailCaptureSection />
      <section className="container-shell py-10">
        <div className="grid gap-6 rounded-[2.3rem] border border-bone/10 p-6 sm:grid-cols-2 xl:grid-cols-4">
          {collections.length === 0 && !loading ? (
            <div className="panel rounded-[1.8rem] p-5">
              <p className="eyebrow">Collections</p>
              <p className="mt-3 font-serif text-3xl uppercase">No collections yet.</p>
              <p className="mt-3 text-sm leading-7 text-bone/62">
                Create the first collection in `/admin` and it will appear here.
              </p>
            </div>
          ) : null}
          {collections.map((collection) => (
            <Link key={collection.handle} href={`/collections/${collection.handle}`} className="panel rounded-[1.8rem] p-5 transition hover:border-bone/30">
              <p className="eyebrow">{collection.eyebrow}</p>
              <p className="mt-3 font-serif text-3xl uppercase">{collection.name}</p>
              <p className="mt-3 text-sm leading-7 text-bone/62">{collection.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
