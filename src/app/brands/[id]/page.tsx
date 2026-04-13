import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FaFilter, FaTags, FaXmark } from 'react-icons/fa6';
import type { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';
import Features from '@/components/home/Features';

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandResponse {
  data: Brand;
}

async function getBrand(id: string): Promise<Brand> {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) notFound();
  const json: BrandResponse = await res.json();
  return json.data;
}

async function getBrandProducts(brandId: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}&limit=100`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return [];
  const json: ProductsResponse = await res.json();
  return json.data ?? [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const brand = await getBrand(id);
    return {
      title: `${brand.name} Products`,
      description: `Shop ${brand.name} products on FreshCart`,
    };
  } catch {
    return { title: 'Brand' };
  }
}

export default async function BrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [brand, products] = await Promise.all([getBrand(id), getBrandProducts(id)]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/brands" className="hover:text-white transition-colors">Brands</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{brand.name}</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <Image
                src={brand.image}
                alt={brand.name}
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{brand.name}</h1>
              <p className="text-white/80 mt-1">Shop {brand.name} products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">

        {/* Active filter pill */}
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-2 text-sm text-gray-600">
            <FaFilter />
            Active Filters:
          </span>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
          >
            <FaTags className="text-xs" />
            {brand.name}
            <FaXmark className="text-xs" />
          </Link>
          <Link href="/products" className="text-sm text-gray-500 hover:text-gray-700 underline">
            Clear all
          </Link>
        </div>

        <div className="mb-6 text-sm text-gray-500">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTags className="text-3xl text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">There are no products for this brand yet.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Features />
    </div>
  );
}
