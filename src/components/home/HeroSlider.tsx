'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    title: 'Fresh Products Delivered to your Door',
    description: 'Get 20% off your first order',
    primaryBtn: { text: 'Shop Now', href: '/products', color: 'text-primary-500' },
    secondaryBtn: { text: 'View Deals', href: '/deals' },
  },
  {
    id: 2,
    title: 'Premium Quality Guaranteed',
    description: 'Fresh from farm to your table',
    primaryBtn: { text: 'Shop Now', href: '/products', color: 'text-blue-500' },
    secondaryBtn: { text: 'Learn More', href: '/about' },
  },
  {
    id: 3,
    title: 'Fast & Free Delivery',
    description: 'Same day delivery available',
    primaryBtn: { text: 'Order Now', href: '/products', color: 'text-purple-500' },
    secondaryBtn: { text: 'Delivery Info', href: '/delivery' },
  },
];

export default function HeroSlider() {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: '.custom-prev',
          nextEl: '.custom-next',
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              style={{
                backgroundImage: 'url(/images/Hero.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="h-[400px] flex items-center justify-center"
            >
              <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-primary-500/90 to-primary-400/50">
                <div className="container mx-auto h-full flex items-center">
                  <div className="text-left">
                    <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                      {slide.title}
                    </h2>
                    <p>{slide.description}</p>
                    <div className="mt-4">
                      <Link
                        href={slide.primaryBtn.href}
                        className={`btn bg-white border-2 border-white/50 ${slide.primaryBtn.color} inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}
                      >
                        {slide.primaryBtn.text}
                      </Link>
                      <Link
                        href={slide.secondaryBtn.href}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        {slide.secondaryBtn.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-pagination"></div>

      <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-primary-500 hover:text-primary-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronLeft className="text-lg" />
      </div>
      <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-primary-500 hover:text-primary-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronRight className="text-lg" />
      </div>
    </div>
  );
}
