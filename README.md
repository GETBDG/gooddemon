# GOODDEMON

Luxury underground streetwear storefront built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## Architecture

- `app/`: App Router entrypoints for homepage, collection templates, product templates, sitemap, and robots.
- `components/`: brand system, commerce UI, motion wrappers, reusable product cards, cart drawer, and editorial sections.
- `content/site.ts`: editable seed content for homepage narratives, collections, products, lookbook, culture feed, and email capture.
- `lib/`: shared types and utilities.
- `public/images/`: campaign, collection, product, category, and culture placeholders ready to swap for final photography/video stills.

## Headless Commerce Stack

- Storefront: Next.js 14 on Vercel.
- Catalog + inventory: Shopify Storefront API / Hydrogen-ready data layer.
- Checkout + wallets: Shopify Checkout + Stripe express methods.
- CMS blocks: Shopify metaobjects or Sanity/Contentful for campaigns, lookbooks, drops, hero sections, and editorial copy.
- Extra admin data: Supabase for waitlists, restock requests, VIP segmentation, abandoned cart enrichment, and culture-feed curation.
- Media: Cloudinary for campaign video, editorial stills, responsive crops, and auto-format delivery.

## Editable Admin Model

The content model should expose these editable entities:

- `Campaign`: hero title, subtitle, CTA labels, campaign media, manifesto copy, launch timing.
- `Collection`: banner media, tags, featured pieces, ordering, archive state.
- `Product`: price, stock, variants, badges, fit notes, material, care, shipping, related products.
- `Lookbook Entry`: image, caption, linked products, ordering.
- `Homepage Section`: enabled state, headline, body copy, media source, CTA, priority.
- `Popup / Newsletter Block`: message, timing, trigger, audience, status.

## Sitemap

- `/`
- `/collections/the-betrayal`
- `/collections/the-faithless`
- `/products/betrayal-veil-hoodie`
- `/products/same-skin-tee`
- `/products/faithless-bomber`
- `/products/forbidden-rosary-cap`

## Conversion + Tracking Plan

- Events: `view_item`, `add_to_cart`, `begin_checkout`, `wishlist_add`, `view_collection`, `newsletter_signup`, `restock_request`.
- Pixels: Meta Pixel, GA4, TikTok Pixel on the client with server-side event forwarding for checkout and purchase confirmation.
- Flows: welcome series, abandoned cart, low stock urgency, restock notification, VIP early access, post-purchase cross-sell.

## Visual Asset Checklist

- Fullscreen hero video loop or 4K campaign still sequence.
- 3-5 editorial stills per product: front, back, detail, lifestyle, texture.
- 6-9 lookbook images with consistent grading.
- 4-6 culture-feed assets sized for portrait and square crops.
- Collection banners, mobile crops, and checkout-safe neutral packshots.
