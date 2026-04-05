'use client';

import { useState } from 'react';
import {
  FaCartShopping,
  FaBolt,
  FaMinus,
  FaPlus,
  FaShareNodes,
  FaTruckFast,
  FaArrowRotateLeft,
  FaShieldHalved,
  FaStar,
  FaStarHalfStroke,
} from 'react-icons/fa6';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';

interface Props {
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  categoryId: string;
  categoryName: string;
  brandName: string;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(<FaStarHalfStroke key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex gap-0.5 text-base">{stars}</div>
      <span className="text-sm text-gray-600">
        {rating} ({count} reviews)
      </span>
    </div>
  );
}

export default function ProductActions({
  price,
  priceAfterDiscount,
  quantity,
  ratingsAverage,
  ratingsQuantity,
}: Props) {
  const [qty, setQty] = useState(1);

  const displayPrice = priceAfterDiscount ?? price;
  const total = (displayPrice * qty).toFixed(2);

  return (
    <>
      {/* Ratings */}
      <StarRating rating={ratingsAverage} count={ratingsQuantity} />

      {/* Price */}
      <div className="flex items-center flex-wrap gap-3 mb-6">
        {priceAfterDiscount ? (
          <>
            <span className="text-3xl font-bold text-gray-900">{priceAfterDiscount} EGP</span>
            <span className="text-lg text-gray-400 line-through">{price} EGP</span>
            <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">
              -{Math.round(((price - priceAfterDiscount) / price) * 100)}%
            </span>
          </>
        ) : (
          <span className="text-3xl font-bold text-gray-900">{price} EGP</span>
        )}
      </div>

      {/* Stock badge */}
      <div className="flex items-center gap-2 mb-6">
        {quantity > 0 ? (
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            In Stock
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            Out of Stock
          </span>
        )}
      </div>

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaMinus />
            </button>
            <input
              type="number"
              min={1}
              max={quantity}
              value={qty}
              onChange={(e) => setQty(Math.min(quantity, Math.max(1, Number(e.target.value))))}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
            />
            <button
              onClick={() => setQty((q) => Math.min(quantity, q + 1))}
              disabled={qty >= quantity}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition disabled:opacity-50"
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-sm text-gray-500">{quantity} available</span>
        </div>
      </div>

      {/* Total price */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-primary-600">{total} EGP</span>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          disabled={quantity === 0}
          className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-primary-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-600/25 bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaCartShopping />
          Add to Cart
        </button>
        <button
          disabled={quantity === 0}
          className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaBolt />
          Buy Now
        </button>
      </div>

      {/* Wishlist + Share */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600">
          <FaRegHeart />
          Add to Wishlist
        </button>
        <button className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-primary-300 hover:text-primary-600 transition">
          <FaShareNodes />
        </button>
      </div>

      {/* Trust badges */}
      <div className="border-t border-gray-100 pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: <FaTruckFast />, title: 'Free Delivery', sub: 'Orders over 500 EGP' },
            { icon: <FaArrowRotateLeft />, title: '30 Days Return', sub: 'Money back' },
            { icon: <FaShieldHalved />, title: 'Secure Payment', sub: '100% Protected' },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center shrink-0">
                {icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
