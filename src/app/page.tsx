import type { Metadata } from 'next';
import HeroSlider from '@/components/home/HeroSlider';

export const metadata: Metadata = {
  title: 'FreshCart | Your Online Grocery & Shopping Store',
  description: 'Shop groceries, electronics, fashion and more at FreshCart. Fast delivery, great prices.',
};
import Features from '@/components/home/Features';
import Category from '@/components/home/Category';
import PromoCard from '@/components/home/PromoCard';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Newsletter from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      <Features />
      <Category />
      <PromoCard />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}
