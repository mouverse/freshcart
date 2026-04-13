import Link from 'next/link';
import { FaBoxOpen } from 'react-icons/fa6';
import type { Metadata } from 'next';
import type { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Features from '@/components/home/Features';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Explore our complete product collection',
};

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  const json: ProductsResponse = await res.json();
  return json.data;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">All Products</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaBoxOpen className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">All Products</h1>
              <p className="text-white/80 mt-1">Explore our complete product collection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} products
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Features bar */}
      <Features />
    </div>
  );
}
