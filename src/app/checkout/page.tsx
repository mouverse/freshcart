'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import {
  FaReceipt,
  FaArrowLeft,
  FaHouse,
  FaCity,
  FaLocationDot,
  FaPhone,
  FaWallet,
  FaMoneyBill,
  FaCheck,
  FaBagShopping,
  FaTruck,
  FaShieldHalved,
  FaBox,
  FaCircleInfo,
} from 'react-icons/fa6';

interface ShippingForm {
  city: string;
  details: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, cartCount, clearCart } = useCart();

  const [form, setForm] = useState<ShippingForm>({ city: '', details: '', phone: '' });
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [submitting, setSubmitting] = useState(false);

  const token = (session?.user as any)?.token as string | undefined;

  const items = cart?.products ?? [];
  const subtotal = cart?.totalAfterDiscount ?? cart?.totalCartPrice ?? 0;
  const shipping = 50;
  const total = subtotal + shipping;

  function validate(): boolean {
    const errs: Partial<ShippingForm> = {};
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.details.trim()) errs.details = 'Street address is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^01[0-9]{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid Egyptian phone number';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!cart?._id || !token) {
      toast.error('Please sign in and add items to your cart first');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cart._id}`, {
        method: 'POST',
        headers: { token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shippingAddress: {
            details: form.details.trim(),
            phone: form.phone.trim(),
            city: form.city.trim(),
          },
        }),
      });

      if (!res.ok) throw new Error();

      await clearCart();
      toast.success('Order placed successfully!');
      router.push('/orders/success');
    } catch {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaReceipt className="text-3xl text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to checkout</h2>
          <p className="text-gray-500 mb-6">You need to be signed in to place an order.</p>
          <Link
            href="/login?redirect=/checkout"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBagShopping className="text-3xl text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items to your cart before checking out.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="hover:text-primary-600 transition">Cart</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-primary-600 to-primary-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <FaReceipt />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">Review your items and complete your purchase</p>
            </div>
            <Link
              href="/cart"
              className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all"
            >
              <FaArrowLeft />
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — Shipping + Payment */}
            <div className="lg:col-span-2 space-y-6">

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaHouse />
                    Shipping Address
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">Where should we deliver your order?</p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Info banner */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <FaCircleInfo className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Delivery Information</p>
                      <p className="text-xs text-blue-600 mt-0.5">Please ensure your address is accurate for smooth delivery</p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FaCity className="text-gray-500 text-sm" />
                      </div>
                      <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        value={form.city}
                        onChange={(e) => { setForm((f) => ({ ...f, city: e.target.value })); setErrors((er) => ({ ...er, city: '' })); }}
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all ${errors.city ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'}`}
                      />
                    </div>
                    {errors.city && <p className="text-red-500 text-xs mt-1.5">{errors.city}</p>}
                  </div>

                  {/* Street Address */}
                  <div>
                    <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FaLocationDot className="text-gray-500 text-sm" />
                      </div>
                      <textarea
                        id="details"
                        rows={3}
                        name="details"
                        placeholder="Street name, building number, floor, apartment..."
                        value={form.details}
                        onChange={(e) => { setForm((f) => ({ ...f, details: e.target.value })); setErrors((er) => ({ ...er, details: '' })); }}
                        className={`w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none ${errors.details ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'}`}
                      />
                    </div>
                    {errors.details && <p className="text-red-500 text-xs mt-1.5">{errors.details}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <FaPhone className="text-gray-500 text-sm" />
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        placeholder="01xxxxxxxxx"
                        value={form.phone}
                        onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((er) => ({ ...er, phone: '' })); }}
                        className={`w-full px-4 py-3.5 pl-14 pr-36 border-2 rounded-xl focus:outline-none transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100'}`}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">Egyptian numbers only</span>
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaWallet />
                    Payment Method
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">Cash on delivery only</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Cash on Delivery — always selected */}
                  <div className="w-full p-5 rounded-xl border-2 border-primary-500 bg-linear-to-r from-primary-50 to-emerald-50 shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-linear-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30">
                      <FaMoneyBill className="text-xl" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-primary-700">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Pay when your order arrives at your doorstep</p>
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-primary-600 text-white shrink-0">
                      <FaCheck className="text-xs" />
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <FaShieldHalved className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">Safe & Hassle-free</p>
                      <p className="text-xs text-green-600 mt-0.5">No payment info required — pay only when you receive your order</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                <div className="bg-linear-to-r from-primary-600 to-primary-700 px-6 py-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaBagShopping />
                    Order Summary
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="p-5">
                  {/* Items list */}
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {items.map((item) => (
                      <div key={item._id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            width={56}
                            height={56}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{item.product.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {item.count * item.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-gray-100 my-4" />

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">{subtotal} EGP</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FaTruck className="text-gray-400" />
                        Shipping
                      </span>
                      <span className="font-medium">{shipping} EGP</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-600">{total}</span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full mt-6 bg-linear-to-r from-primary-600 to-primary-700 text-white py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                  >
                    <FaBox />
                    {submitting ? 'Placing Order...' : 'Place Order'}
                  </button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaShieldHalved className="text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaTruck className="text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaBox className="text-orange-500" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
