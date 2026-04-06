'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { FaHeart, FaTrash, FaCartShopping, FaCheck, FaUser } from 'react-icons/fa6';

export default function WishlistPage() {
  const { data: session } = useSession();
  const { wishlist, wishlistCount, loading, toggleWishlist } = useWishlist();
  const { addToCart, loading: cartLoading, cart } = useCart();

  const cartProductIds = new Set(cart?.products?.map((item) => item.product._id) ?? []);

  if (!session) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-4xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your wishlist</h2>
          <p className="text-gray-500 mb-8">Save your favourite products and access them from any device.</p>
          <Link
            href="/login?redirect=/wishlist"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            <FaUser />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!loading && wishlist.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-4xl text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8">Browse our products and save your favourites here.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <FaHeart className="text-xl text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                <p className="text-gray-500 text-sm">
                  {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Table header — desktop only */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {wishlist.map((product) => {
              const inCart = cartProductIds.has(product._id);
              const displayPrice = product.priceAfterDiscount ?? product.price;

              return (
                <div
                  key={product._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                >
                  {/* Product info */}
                  <div className="md:col-span-6 flex items-center gap-4">
                    <Link
                      href={`/products/${product._id}`}
                      className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 block"
                    >
                      <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain p-2"
                      />
                    </Link>
                    <div className="min-w-0">
                      <Link
                        href={`/products/${product._id}`}
                        className="font-medium text-gray-900 hover:text-primary-600 transition-colors line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <p className="text-sm text-gray-400 mt-1">{product.category.name}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                    <span className="md:hidden text-sm text-gray-500">Price:</span>
                    <div className="text-right md:text-center">
                      {product.priceAfterDiscount ? (
                        <>
                          <div className="font-semibold text-gray-900">{product.priceAfterDiscount} EGP</div>
                          <div className="text-xs text-gray-400 line-through">{product.price} EGP</div>
                        </>
                      ) : (
                        <div className="font-semibold text-gray-900">{displayPrice} EGP</div>
                      )}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2 flex md:justify-center">
                    <span className="md:hidden text-sm text-gray-500 mr-2">Status:</span>
                    {inCart ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                        <FaCartShopping className="text-[10px]" />
                        In Cart
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Not in Cart
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                    {inCart ? (
                      <Link
                        href="/cart"
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                      >
                        <FaCheck className="text-xs text-green-600" />
                        <span className="md:hidden lg:inline">View Cart</span>
                      </Link>
                    ) : (
                      <button
                        disabled={cartLoading}
                        onClick={() => addToCart(product._id)}
                        className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 transition-all disabled:opacity-60"
                      >
                        <FaCartShopping className="text-xs" />
                        <span className="md:hidden lg:inline">Add to Cart</span>
                      </button>
                    )}

                    <button
                      disabled={loading}
                      onClick={() => toggleWishlist(product)}
                      title="Remove from wishlist"
                      className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            href="/products"
            className="text-gray-500 hover:text-primary-600 text-sm font-medium transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
