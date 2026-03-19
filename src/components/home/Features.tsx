import { FaTruck, FaShieldHalved, FaArrowRotateLeft, FaHeadset } from 'react-icons/fa6';

const features = [
  {
    id: 1,
    icon: FaTruck,
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    id: 2,
    icon: FaShieldHalved,
    title: 'Secure Payment',
    description: '100% secure transactions',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
  },
  {
    id: 3,
    icon: FaArrowRotateLeft,
    title: 'Easy Returns',
    description: '14-day return policy',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    id: 4,
    icon: FaHeadset,
    title: '24/7 Support',
    description: 'Dedicated support team',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
  },
];

export default function Features() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className={`${feature.bgColor} ${feature.iconColor} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
                >
                  <Icon className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
