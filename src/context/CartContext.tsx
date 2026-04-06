'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export interface CartItem {
  product: {
    _id: string;
    id: string;
    title: string;
    imageCover: string;
    price: number;
    priceAfterDiscount?: number;
    category: { name: string };
  };
  count: number;
  price: number;
  _id: string;
}

interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  totalAfterDiscount?: number;
}

interface CartContextType {
  cart: CartData | null;
  cartCount: number;
  loading: boolean;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | null>(null);

const API = 'https://ecommerce.routemisr.com/api/v2/cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(false);

  const token = (session?.user as any)?.token as string | undefined;

  const refreshCart = useCallback(async () => {
    if (!token) {
      setCart(null);
      return;
    }
    try {
      const res = await fetch(API, { headers: { token } });
      if (!res.ok) { setCart(null); return; }
      const json = await res.json();
      setCart(json.data ?? null);
    } catch {
      setCart(null);
    }
  }, [token]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addToCart = useCallback(async (productId: string) => {
    if (!token) {
      toast.error('Please sign in to add items to your cart');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setCart(json.data ?? null);
      toast.success('Added to cart!');
    } catch {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/${productId}`, {
        method: 'DELETE',
        headers: { token },
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setCart(json.data ?? null);
      toast.success('Item removed from cart');
    } catch {
      toast.error('Failed to remove item');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const updateQuantity = useCallback(async (productId: string, count: number) => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}/${productId}`, {
        method: 'PUT',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ count }),
      });
      if (!res.ok) throw new Error();
      const json = await res.json();
      setCart(json.data ?? null);
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const clearCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(API, { method: 'DELETE', headers: { token } });
      if (!res.ok) throw new Error();
      setCart(null);
      toast.success('Cart cleared');
    } catch {
      toast.error('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const cartCount = cart?.products?.reduce((sum, item) => sum + item.count, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, cartCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
