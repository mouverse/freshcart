import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

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

export default async function Category() {
  const categories = await getCategories();

  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-emerald-600">Category</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center gap-2 transition-colors"
          >
            View All Categories
            <FaArrowRight className="text-sm" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
            >
              <div className="h-20 w-20 overflow-hidden bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 transition">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-700 text-sm">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
