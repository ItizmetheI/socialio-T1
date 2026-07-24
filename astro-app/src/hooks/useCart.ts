import { useStore } from "@nanostores/react";
import { $cartItems, $isCartOpen, addToCart, removeFromCart, clearCart } from "../stores/cart";

// Same shape as the old CartContext's useCart() so consuming components
// (NavBar, CartDrawer, Contact, PricingCard, ServiceDetail) didn't need to
// change their logic, only their import.
export function useCart() {
  const items = useStore($cartItems);
  const isCartOpen = useStore($isCartOpen);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    addToCart,
    removeFromCart,
    clearCart,
    total,
    isCartOpen,
    setIsCartOpen: (isOpen: boolean) => $isCartOpen.set(isOpen),
  };
}
