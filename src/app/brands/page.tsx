import Image from 'next/image';
import Link from 'next/link';
import { FaTags, FaArrowRight } from 'react-icons/fa6';
import type { Metadata } from 'next';
import Features from '@/components/home/Features';

export const metadata: Metadata = {
  title: 'Top Brands | FreshCart',
  description: 'Shop from your favorite brands',
};

interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface BrandsResponse {
  results: number;
  metadata: { currentPage: number; numberOfPages: number };
  data: Brand[];
}

async function getAllBrands(): Promise<Brand[]> {
  const res = await fetch('https://ecommerce.routemisr.com/api/v1/brands?limit=40&page=1', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch brands');
  const json: BrandsResponse = await res.json();
  return json.data.filter((b) => b && b._id && b.name && b.image);
}

export default async function BrandsPage() {
  const brands = await getAllBrands();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaTags className="text-3xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-white/80 mt-1">
                Shop from your favorite brands
                <span className="ml-2 text-white/60 text-sm">({brands.length} brands)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/brands/${brand._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={120}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                {brand.name}
              </h3>
              <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-violet-600 flex items-center gap-1">
                  View Products
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
