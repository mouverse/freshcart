'use client';

import { useState } from 'react';
import { FaBox, FaStar, FaTruck, FaCheck } from 'react-icons/fa6';
import type { Product } from '@/types/product';

type Tab = 'details' | 'reviews' | 'shipping';

interface Props {
  product: Product;
}

export default function ProductDetailsTabs({ product }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('details');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'details', label: 'Product Details', icon: <FaBox className="text-sm" /> },
    {
      id: 'reviews',
      label: `Reviews (${product.ratingsQuantity})`,
      icon: <FaStar className="text-sm" />,
    },
    { id: 'shipping', label: 'Shipping & Returns', icon: <FaTruck className="text-sm" /> },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Tab headers */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Product</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Product Information</h4>
                    <ul className="space-y-2">
                      {[
                        { label: 'Category', value: product.category.name },
                        {
                          label: 'Subcategory',
                          value: product.subcategory[0]?.name ?? '—',
                        },
                        { label: 'Brand', value: product.brand?.name ?? '—' },
                        { label: 'Items Sold', value: `${product.sold}+ sold` },
                      ].map(({ label, value }) => (
                        <li key={label} className="flex justify-between text-sm">
                          <span className="text-gray-500">{label}</span>
                          <span className="text-gray-900 font-medium">{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {[
                        'Premium Quality Product',
                        '100% Authentic Guarantee',
                        'Fast & Secure Packaging',
                        'Quality Tested',
                      ].map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-600">
                          <FaCheck className="text-primary-600 mr-2 w-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.ratingsQuantity === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No reviews yet. Be the first to review this product.
                  </p>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900">
                        {product.ratingsAverage.toFixed(1)}
                      </div>
                      <div className="flex justify-center text-yellow-400 my-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.round(product.ratingsAverage)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {product.ratingsQuantity} reviews
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4">
                {[
                  {
                    title: 'Standard Delivery',
                    desc: 'Delivered within 3–5 business days. Free on orders over 500 EGP.',
                  },
                  {
                    title: 'Express Delivery',
                    desc: 'Next-day delivery available for orders placed before 2 PM.',
                  },
                  {
                    title: 'Returns Policy',
                    desc: 'Return within 14 days of delivery for a full refund. Item must be unused and in original packaging.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                    <FaCheck className="text-primary-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
