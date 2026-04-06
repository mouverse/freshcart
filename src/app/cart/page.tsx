'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import {
  FaCartShopping,
  FaMinus,
  FaPlus,
  FaTrash,
  FaUser,
} from 'react-icons/fa6';

export default function CartPage() {
  const { data: session } = useSession();
  const { cart, cartCount, loading, removeFromCart, updateQuantity, clearCart } = useCart();

  const items = cart?.products ?? [];
  const subtotal = cart?.totalAfterDiscount ?? cart?.totalCartPrice ?? 0;

  /* ── Empty / Not logged in ── */
  if (!session) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCartShopping className="text-4xl text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your cart</h2>
          <p className="text-gray-500 mb-8">Your cart items will be saved once you sign in.</p>
          <Link
            href="/login?redirect=/cart"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            <FaUser />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCartShopping className="text-4xl text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some products and they will show up here.</p>
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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary-600 transition">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-primary-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaCartShopping />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                You have{' '}
                <span className="font-semibold text-primary-600">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>{' '}
                in your cart
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => {
                const unitPrice = item.price;
                const itemTotal = unitPrice * item.count;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Image */}
                      <Link
                        href={`/products/${item.product._id}`}
                        className="relative shrink-0 group"
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={128}
                            height={128}
                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 flex flex-col">
                        <div className="mb-3">
                          <Link href={`/products/${item.product._id}`} className="group/title">
                            <h3 className="font-semibold text-gray-900 group-hover/title:text-primary-600 transition-colors leading-relaxed text-base sm:text-lg">
                              {item.product.title}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-block px-2.5 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                              {item.product.category?.name}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="text-primary-600 font-bold text-lg">
                            {unitPrice} EGP
                          </span>
                        </div>

                        {/* Controls */}
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                          {/* Quantity stepper */}
                          <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                            <button
                              disabled={item.count <= 1 || loading}
                              onClick={() => updateQuantity(item.product._id, item.count - 1)}
                              className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="w-12 text-center font-bold text-gray-900">
                              {item.count}
                            </span>
                            <button
                              disabled={loading}
                              onClick={() => updateQuantity(item.product._id, item.count + 1)}
                              className="h-8 w-8 rounded-lg bg-primary-600 shadow-sm flex items-center justify-center text-white hover:bg-primary-700 transition-all disabled:opacity-40"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Item total */}
                            <div className="text-right">
                              <p className="text-xs text-gray-400 mb-0.5">Total</p>
                              <p className="text-xl font-bold text-gray-900">
                                {itemTotal}{' '}
                                <span className="text-sm font-medium text-gray-400">EGP</span>
                              </p>
                            </div>
                            {/* Remove */}
                            <button
                              disabled={loading}
                              onClick={() => removeFromCart(item.product._id)}
                              title="Remove item"
                              className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200 disabled:opacity-40"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-2"
              >
                <span>←</span> Continue Shopping
              </Link>
              <button
                disabled={loading}
                onClick={clearCart}
                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
              >
                <FaTrash className="text-xs group-hover:scale-110 transition-transform" />
                <span>Clear all items</span>
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
              <div className="bg-gray-900 p-5">
                <h2 className="text-white font-bold text-lg">Order Summary</h2>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold">{subtotal} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Calculated at checkout</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total</span>
                  <span className="text-primary-600">{subtotal} EGP</span>
                </div>

                <div className="pt-4 space-y-3">
                  <Link
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
                  >
                    Proceed to Checkout
                  </Link>
                  <p className="text-xs text-gray-400 text-center">
                    Signed in as{' '}
                    <span className="font-medium text-gray-600">{session.user?.name}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <p className="text-xs text-gray-500">✓ Your cart items will be saved</p>
                  <p className="text-xs text-gray-500">✓ Track your orders easily</p>
                  <p className="text-xs text-gray-500">✓ Access exclusive member deals</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
