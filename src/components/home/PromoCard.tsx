import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

const promos = [
  {
    id: 1,
    badge: '🔥',
    badgeText: 'Deal of the Day',
    title: 'Fresh Organic Fruits',
    description: 'Get up to 40% off on selected organic fruits',
    discount: '40% OFF',
    code: 'ORGANIC40',
    gradient: 'bg-linear-to-br from-emerald-500 to-emerald-700',
    btnColor: 'text-emerald-600',
    btnText: 'Shop Now',
    href: '/products',
  },
  {
    id: 2,
    badge: '✨',
    badgeText: 'New Arrivals',
    title: 'Exotic Vegetables',
    description: 'Discover our latest collection of premium vegetables',
    discount: '25% OFF',
    code: 'FRESH25',
    gradient: 'bg-linear-to-br from-orange-400 to-rose-500',
    btnColor: 'text-orange-500',
    btnText: 'Explore Now',
    href: '/products?sort=newest',
  },
];

export default function PromoCard() {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className={`relative overflow-hidden rounded-2xl ${promo.gradient} p-8 text-white`}
            >
              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                  <span>{promo.badge}</span>
                  <span>{promo.badgeText}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-2">{promo.title}</h3>
                <p className="text-white/80 mb-4">{promo.description}</p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-bold">{promo.discount}</div>
                  <div className="text-sm text-white/70">
                    Use code:{' '}
                    <span className="font-bold text-white">{promo.code}</span>
                  </div>
                </div>

                <Link
                  href={promo.href}
                  className={`inline-flex items-center gap-2 bg-white ${promo.btnColor} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
                >
                  {promo.btnText}
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
