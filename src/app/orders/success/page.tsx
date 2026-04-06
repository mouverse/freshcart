'use client';

import Link from 'next/link';
import { FaCheck, FaBagShopping, FaBox, FaBoxOpen } from 'react-icons/fa6';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center">

        {/* Animated checkmark */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          <div className="relative w-28 h-28 rounded-full bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30">
            <FaCheck className="text-white text-4xl" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Order Placed!</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Your order has been placed successfully. We'll get it packed and on its way to you soon!
        </p>

        {/* Info card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
              <FaBoxOpen className="text-primary-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Cash on Delivery</p>
              <p className="text-xs text-gray-500">Pay when your order arrives</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <FaBagShopping className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Order Confirmed</p>
              <p className="text-xs text-gray-500">You'll receive a confirmation shortly</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/orders"
            className="flex-1 flex items-center justify-center gap-2 bg-primary-600 text-white py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all"
          >
            <FaBox />
            View My Orders
          </Link>
          <Link
            href="/products"
            className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:border-primary-300 hover:text-primary-600 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
