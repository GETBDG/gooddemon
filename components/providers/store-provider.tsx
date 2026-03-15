"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCatalog } from "@/components/providers/catalog-provider";
import type { Product } from "@/lib/types";

type CartItem = {
  productId: string;
  size: string;
  quantity: number;
};

type StoreContextValue = {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string) => void;
  updateQuantity: (productId: string, size: string, nextQuantity: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextValue | null>(null);

const CART_KEY = "gooddemon-cart";
const WISHLIST_KEY = "gooddemon-wishlist";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const { products } = useCatalog();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const rawCart = window.localStorage.getItem(CART_KEY);
    const rawWishlist = window.localStorage.getItem(WISHLIST_KEY);

    if (rawCart) {
      setCart(JSON.parse(rawCart));
    }

    if (rawWishlist) {
      setWishlist(JSON.parse(rawWishlist));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      cart,
      wishlist,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      addToCart: (product, size) => {
        setCart((current) => {
          const existing = current.find(
            (item) => item.productId === product.id && item.size === size
          );

          if (existing) {
            return current.map((item) =>
              item.productId === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }

          return [...current, { productId: product.id, size, quantity: 1 }];
        });
        setIsCartOpen(true);
      },
      updateQuantity: (productId, size, nextQuantity) => {
        if (nextQuantity <= 0) {
          setCart((current) =>
            current.filter((item) => !(item.productId === productId && item.size === size))
          );
          return;
        }

        setCart((current) =>
          current.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: nextQuantity }
              : item
          )
        );
      },
      removeFromCart: (productId, size) => {
        setCart((current) =>
          current.filter((item) => !(item.productId === productId && item.size === size))
        );
      },
      toggleWishlist: (productId) => {
        setWishlist((current) =>
          current.includes(productId)
            ? current.filter((id) => id !== productId)
            : [...current, productId]
        );
      },
      isWishlisted: (productId) => wishlist.includes(productId),
      cartCount,
      cartTotal
    };
  }, [cart, isCartOpen, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
