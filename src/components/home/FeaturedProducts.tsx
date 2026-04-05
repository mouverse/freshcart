import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import type { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';

async function getFeaturedProducts(): Promise<Product[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const json: ProductsResponse = await res.json();
  return json.data;
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured <span className="text-emerald-600">Products</span>
            </h2>
          </div>
          <Link
            href="/products"
            className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center gap-2 transition-colors"
          >
            View All Products
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
