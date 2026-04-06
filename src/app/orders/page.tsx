'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import {
  FaBox,
  FaBagShopping,
  FaClock,
  FaCheck,
  FaTruck,
  FaHashtag,
  FaCalendarDays,
  FaLocationDot,
  FaMoneyBill,
  FaChevronDown,
  FaUser,
} from 'react-icons/fa6';

interface OrderProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  category: { name: string };
}

interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

interface Order {
  _id: string;
  id: number;
  cartItems: CartItem[];
  shippingAddress: { details: string; phone: string; city: string };
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  user?: { _id: string; name: string; email: string };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function StatusBadge({ isPaid, isDelivered }: { isPaid: boolean; isDelivered: boolean }) {
  if (isDelivered) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-lg">
        <FaCheck className="text-xs text-green-600" />
        <span className="text-xs font-semibold text-green-600">Delivered</span>
      </span>
    );
  }
  if (isPaid) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg">
        <FaTruck className="text-xs text-blue-600" />
        <span className="text-xs font-semibold text-blue-600">Shipped</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg">
      <FaClock className="text-xs text-amber-600" />
      <span className="text-xs font-semibold text-amber-600">Processing</span>
    </span>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const firstItem = order.cartItems[0];
  const extraCount = order.cartItems.length - 1;
  const totalItems = order.cartItems.reduce((sum, i) => sum + i.count, 0);

  return (
    <div className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      {/* Main row */}
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          {/* Cover image */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              {firstItem && (
                <Image
                  src={firstItem.product.imageCover}
                  alt={firstItem.product.title}
                  width={112}
                  height={112}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            {extraCount > 0 && (
              <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                +{extraCount}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <StatusBadge isPaid={order.isPaid} isDelivered={order.isDelivered} />
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2 mt-2">
                  <FaHashtag className="text-xs text-gray-400" />
                  {order.id}
                </h3>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                <FaMoneyBill className="text-gray-600" />
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FaCalendarDays className="text-xs text-gray-400" />
                {formatDate(order.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FaBox className="text-xs text-gray-400" />
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FaLocationDot className="text-xs text-gray-400" />
                {order.shippingAddress.city}
              </span>
            </div>

            {/* Price + toggle */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">EGP</span>
              </div>
              <button
                onClick={() => setExpanded((e) => !e)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Details
                <FaChevronDown
                  className={`text-xs transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-5 sm:px-6 py-5 space-y-5">
          {/* Items list */}
          <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Items</h4>
            <div className="space-y-3">
              {order.cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 p-1 shrink-0">
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.product._id}`}
                      className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors truncate block"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {item.count} × {item.price} EGP
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">
                    {item.count * item.price} EGP
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping + Price breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Shipping address */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <FaLocationDot className="text-primary-400" />
                Shipping Address
              </h4>
              <p className="text-sm text-gray-700 font-medium">{order.shippingAddress.city}</p>
              <p className="text-sm text-gray-500 mt-1">{order.shippingAddress.details}</p>
              <p className="text-sm text-gray-500 mt-1">{order.shippingAddress.phone}</p>
            </div>

            {/* Price breakdown */}
            <div className="bg-white rounded-xl p-4 border border-gray-100">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                {order.taxPrice > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Tax</span>
                    <span>{order.taxPrice} EGP</span>
                  </div>
                )}
                {order.shippingPrice > 0 && (
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span>{order.shippingPrice} EGP</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-100">
                  <span>Total</span>
                  <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const token = (session?.user as any)?.token as string | undefined;

  useEffect(() => {
    if (status === 'loading') return;
    if (!token) { setLoading(false); return; }

    // Decode the JWT payload to extract the user _id without a library
    let userId: string | undefined;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      userId = payload.id ?? payload._id ?? payload.sub;
    } catch {
      setLoading(false);
      return;
    }

    if (!userId) { setLoading(false); return; }

    setLoading(true);
    fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setOrders(Array.isArray(data) ? [...data].reverse() : []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [token, status]);

  if (status === 'loading') {
    return (
      <div className="bg-gray-50/50 min-h-screen py-8">
        <div className="container mx-auto px-4 py-8 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
              <div className="flex gap-5">
                <div className="w-28 h-28 rounded-2xl bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-24" />
                  <div className="h-6 bg-gray-200 rounded w-16" />
                  <div className="h-4 bg-gray-200 rounded w-48" />
                  <div className="h-8 bg-gray-200 rounded w-32" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-3xl text-primary-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to view your orders</h2>
          <p className="text-gray-500 mb-6">Your order history will appear here once you sign in.</p>
          <Link
            href="/login?redirect=/orders"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-primary-600 transition">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <FaBox className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
                {!loading && (
                  <p className="text-gray-500 text-sm mt-0.5">
                    {orders.length === 0
                      ? 'No orders yet'
                      : `Track and manage your ${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
                  </p>
                )}
              </div>
            </div>

            <Link
              href="/products"
              className="self-start sm:self-auto text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-primary-50 transition-all text-sm"
            >
              <FaBagShopping className="text-xs" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                <div className="flex gap-5">
                  <div className="w-28 h-28 rounded-2xl bg-gray-200 shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-24" />
                    <div className="h-6 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-48" />
                    <div className="h-8 bg-gray-200 rounded w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && orders.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBox className="text-4xl text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-8">Your order history will appear here after your first purchase.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
