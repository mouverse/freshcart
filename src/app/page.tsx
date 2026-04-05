import HeroSlider from '@/components/home/HeroSlider';
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
