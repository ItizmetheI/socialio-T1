import { atom } from "nanostores";

export interface CartItem {
  id: string;
  serviceId: string;
  title: string;
  levelLabel: string;
  price: number;
  type: "service" | "addon";
}

const STORAGE_KEY = "socialio-cart-items";

function loadInitial(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// ponytail: nanostores instead of React Context -- Astro islands are separate
// React roots, so a Context provider in one island is invisible to a sibling
// island on the same page (e.g. NavBar's cart icon vs. a PricingCard's Add to
// Cart button). localStorage-backed so cart also survives full-page nav/refresh,
// which the old in-memory-only Context couldn't do anyway.
export const $cartItems = atom<CartItem[]>(loadInitial());
export const $isCartOpen = atom<boolean>(false);

if (typeof window !== "undefined") {
  $cartItems.subscribe((items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  });
}

export function addToCart(item: Omit<CartItem, "id">) {
  const newItem: CartItem = { ...item, id: `${item.serviceId}-${Date.now()}` };
  $cartItems.set([...$cartItems.get(), newItem]);
  $isCartOpen.set(true);
}

export function removeFromCart(id: string) {
  $cartItems.set($cartItems.get().filter((i) => i.id !== id));
}

export function clearCart() {
  $cartItems.set([]);
}
