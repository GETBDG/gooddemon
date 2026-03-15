"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCatalog } from "@/components/providers/catalog-provider";
import { useStore } from "@/components/providers/store-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { products } = useCatalog();
  const { cart, cartTotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useStore();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition ${isCartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-bone/10 bg-[#090909]/95 p-6 backdrop-blur-2xl transition duration-500 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-bone/10 pb-4">
          <div>
            <p className="eyebrow">Cart</p>
            <h2 className="font-serif text-3xl uppercase">Your ritual</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone/10 text-bone/70 transition hover:text-bone"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-6">
          {cart.length === 0 ? (
            <div className="panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-bone/40">Empty for now</p>
              <p className="mt-3 text-sm text-bone/65">
                Add a limited piece and the drawer becomes the final checkpoint before checkout.
              </p>
            </div>
          ) : (
            cart.map((item) => {
              const product = products.find((entry) => entry.id === item.productId);

              if (!product) {
                return null;
              }

              return (
                <div key={`${item.productId}-${item.size}`} className="panel rounded-[2rem] p-4">
                  <div className="flex gap-4">
                    <div className="relative aspect-[4/5] w-24 overflow-hidden rounded-[1.5rem] border border-bone/10 bg-black/30">
                      <Image
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <Link href={`/products/${product.handle}`} className="font-serif text-2xl uppercase">
                            {product.name}
                          </Link>
                          <p className="text-xs uppercase tracking-[0.2em] text-bone/45">
                            {item.size} / {product.color}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id, item.size)}
                          className="text-xs uppercase tracking-[0.2em] text-bone/40 transition hover:text-bone"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-5">
                        <div className="flex items-center gap-3 rounded-full border border-bone/10 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, item.size, item.quantity - 1)}
                            className="text-bone/60 transition hover:text-bone"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs uppercase tracking-[0.2em]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, item.size, item.quantity + 1)}
                            className="text-bone/60 transition hover:text-bone"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm uppercase tracking-[0.2em]">
                          {formatPrice(product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="space-y-4 border-t border-bone/10 pt-5">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.18em] text-bone/60">
            <span>Estimated total</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <Button className="w-full">Checkout / Shop Pay</Button>
          <Button variant="secondary" className="w-full">
            Stripe Express
          </Button>
          <p className="text-xs leading-6 text-bone/45">
            Checkout is prepared for Shopify Headless + Stripe wallets. Low-stock pieces are reserved at payment only.
          </p>
        </div>
      </aside>
    </>
  );
}
