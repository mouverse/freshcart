import Image from 'next/image';
import Link from 'next/link';
import { FaLayerGroup, FaArrowRight } from 'react-icons/fa6';
import Features from '@/components/home/Features';

interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategoriesResponse {
  results: number;
  data: Category[];
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const json: CategoriesResponse = await res.json();
  return json.data;
}

export const metadata = {
  title: 'All Categories | FreshCart',
  description: 'Browse our wide range of product categories',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <div className="bg-linear-to-br from-primary-600 via-primary-500 to-primary-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-primary-600 transition-colors">
                {category.name}
              </h3>
              <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-primary-600 flex items-center gap-1">
                  View Subcategories
                  <FaArrowRight className="text-[10px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Features />
    </div>
  );
}
