import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import type { Product, ProductsResponse } from '@/types/product';
import ProductCard from '@/components/product/ProductCard';

interface Props {
  categoryId: string;
  currentProductId: string;
}

async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=10`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return [];

  const json: ProductsResponse = await res.json();
  return json.data;
}

export default async function SimilarProducts({ categoryId, currentProductId }: Props) {
  const products = await getProductsByCategory(categoryId);
  const similar = products.filter((p) => p._id !== currentProductId);

  if (similar.length === 0) return null;

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-600">Like</span>
            </h2>
          </div>
          <Link
            href={`/categories/${categoryId}`}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {similar.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
