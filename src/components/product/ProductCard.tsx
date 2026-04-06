'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPlus, FaStar, FaStarHalfStroke, FaHeart } from 'react-icons/fa6';
import { FaRegHeart, FaRegStar, FaRegEye } from 'react-icons/fa';
import { FaArrowsRotate } from 'react-icons/fa6';
import type { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

function StarRating({ rating, count }: { rating: number; count: number }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} />);
    } else if (i === fullStars + 1 && hasHalf) {
      stars.push(<FaStarHalfStroke key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className="flex items-center mb-2">
      <div className="flex text-yellow-400 mr-2 text-sm">{stars}</div>
      <span className="text-xs text-gray-500">
        {rating} ({count})
      </span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, loading } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product._id);
  const discountPercent =
    product.priceAfterDiscount
      ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
      : null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={400}
          height={300}
          className="w-full h-60 object-contain bg-white"
        />

        {discountPercent && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discountPercent}%
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => toggleWishlist(product)}
            className={`bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm ${wishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {wishlisted ? <FaHeart /> : <FaRegHeart />}
          </button>
          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm">
            <FaArrowsRotate />
          </button>
          <Link
            href={`/products/${product.id}`}
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
          >
            <FaRegEye />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category.name}</div>
        <h3 className="font-medium mb-1 text-sm" title={product.title}>
          <Link
            href={`/products/${product.id}`}
            className="line-clamp-2 hover:text-primary-600 transition-colors"
          >
            {product.title}
          </Link>
        </h3>

        <StarRating rating={product.ratingsAverage} count={product.ratingsQuantity} />

        <div className="flex items-center justify-between">
          <div>
            {product.priceAfterDiscount ? (
              <>
                <span className="text-lg font-bold text-primary-600">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  {product.price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">{product.price} EGP</span>
            )}
          </div>
          <button
            disabled={loading}
            onClick={() => addToCart(product._id)}
            className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-70"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
