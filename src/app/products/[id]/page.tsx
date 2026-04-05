import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FaHouse, FaChevronRight } from 'react-icons/fa6';
import type { Metadata } from 'next';
import type { ProductResponse } from '@/types/product';
import ProductImageGallery from '@/components/product/ProductImageGallery';
import ProductActions from '@/components/product/ProductActions';
import ProductDetailsTabs from '@/components/product/ProductDetailsTabs';
import SimilarProducts from '@/components/product/SimilarProducts';

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return null;

  const json: ProductResponse = await res.json();
  return json.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.title} | FreshCart`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const subcategory = product.subcategory[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="py-4 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link
                href="/"
                className="text-gray-500 hover:text-primary-600 transition flex items-center gap-1.5"
              >
                <FaHouse className="text-xs" />
                Home
              </Link>
              <FaChevronRight className="text-gray-400 text-xs mx-2" />
            </li>
            <li className="flex items-center">
              <Link
                href={`/categories/${product.category._id}`}
                className="text-gray-500 hover:text-primary-600 transition"
              >
                {product.category.name}
              </Link>
              {subcategory && <FaChevronRight className="text-gray-400 text-xs mx-2" />}
            </li>
            {subcategory && (
              <li className="flex items-center">
                <Link
                  href={`/categories/${product.category._id}/${subcategory._id}`}
                  className="text-gray-500 hover:text-primary-600 transition"
                >
                  {subcategory.name}
                </Link>
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
              </li>
            )}
            <li className="text-gray-900 font-medium truncate max-w-xs">{product.title}</li>
          </ol>
        </div>
      </nav>

      {/* Product detail */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: image gallery */}
            <div className="lg:w-2/5 xl:w-[38%]">
              <div className="sticky top-4">
                <ProductImageGallery
                  images={[product.imageCover, ...product.images]}
                  title={product.title}
                />
              </div>
            </div>

            {/* Right: info + actions */}
            <div className="lg:w-3/5 xl:w-[62%]">
              <div className="bg-white rounded-xl shadow-sm p-6">
                {/* Category + brand badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    href={`/categories/${product.category._id}`}
                    className="bg-primary-50 text-primary-700 text-xs px-3 py-1.5 rounded-full hover:bg-primary-100 transition"
                  >
                    {product.category.name}
                  </Link>
                  {product.brand && (
                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                      {product.brand.name}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>

                {/* Description preview */}
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Interactive actions (client) */}
                <ProductActions
                  price={product.price}
                  priceAfterDiscount={product.priceAfterDiscount}
                  quantity={product.quantity}
                  ratingsAverage={product.ratingsAverage}
                  ratingsQuantity={product.ratingsQuantity}
                  categoryId={product.category._id}
                  categoryName={product.category.name}
                  brandName={product.brand?.name ?? ''}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details tabs (client) */}
      <ProductDetailsTabs product={product} />

      {/* Similar products (server) */}
      <SimilarProducts
        categoryId={product.category._id}
        currentProductId={product._id}
      />
    </div>
  );
}
