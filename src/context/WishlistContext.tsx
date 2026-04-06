'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import type { Product } from '@/types/product';

interface WishlistContextType {
  wishlist: Product[];
  wishlistIds: Set<string>;
  wishlistCount: number;
  loading: boolean;
  toggleWishlist: (product: Product) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const API = 'https://ecommerce.routemisr.com/api/v1/wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const token = (session?.user as any)?.token as string | undefined;

  const refreshWishlist = useCallback(async () => {
    if (!token) {
      setWishlist([]);
      return;
    }
    try {
      const res = await fetch(API, { headers: { token } });
      if (!res.ok) { setWishlist([]); return; }
      const json = await res.json();
      setWishlist(json.data ?? []);
    } catch {
      setWishlist([]);
    }
  }, [token]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const wishlistIds = new Set(wishlist.map((p) => p._id));

  const isWishlisted = useCallback(
    (productId: string) => wishlistIds.has(productId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wishlist],
  );

  const toggleWishlist = useCallback(async (product: Product) => {
    if (!token) {
      toast.error('Please sign in to save items to your wishlist');
      return;
    }
    const alreadySaved = wishlistIds.has(product._id);
    setLoading(true);
    try {
      if (alreadySaved) {
        const res = await fetch(`${API}/${product._id}`, {
          method: 'DELETE',
          headers: { token },
        });
        if (!res.ok) throw new Error();
        setWishlist((prev) => prev.filter((p) => p._id !== product._id));
        toast.success('Removed from wishlist');
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: { token, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: product._id }),
        });
        if (!res.ok) throw new Error();
        setWishlist((prev) => [...prev, product]);
        toast.success('Added to wishlist!');
      }
    } catch {
      toast.error(alreadySaved ? 'Failed to remove from wishlist' : 'Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  }, [token, wishlistIds]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistIds,
        wishlistCount: wishlist.length,
        loading,
        toggleWishlist,
        isWishlisted,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
