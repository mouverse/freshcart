import Link from 'next/link';
import {
  FaAppleWhole,
  FaCarrot,
  FaLemon,
  FaSeedling,
  FaHouse,
  FaMagnifyingGlass,
} from 'react-icons/fa6';
import Features from '@/components/home/Features';

const floatingIcons = [
  { icon: FaAppleWhole, style: 'top-[10%] left-[5%]',   size: 'text-4xl', delay: '[animation-delay:0s]',    duration: '[animation-duration:6s]' },
  { icon: FaCarrot,     style: 'top-[20%] right-[10%]', size: 'text-3xl', delay: '[animation-delay:1s]',    duration: '[animation-duration:8s]' },
  { icon: FaLemon,      style: 'bottom-[25%] left-[8%]',size: 'text-3xl', delay: '[animation-delay:0.5s]',  duration: '[animation-duration:7s]' },
  { icon: FaSeedling,   style: 'bottom-[15%] right-[15%]', size: 'text-4xl', delay: '[animation-delay:2s]', duration: '[animation-duration:9s]' },
  { icon: FaAppleWhole, style: 'top-[50%] left-[15%]',  size: 'text-2xl text-primary-100', delay: '[animation-delay:1.5s]', duration: '[animation-duration:5s]' },
  { icon: FaCarrot,     style: 'top-[40%] right-[5%]',  size: 'text-2xl text-primary-100', delay: '[animation-delay:0.8s]', duration: '[animation-duration:6s]' },
];

export default function NotFound() {
  return (
    <>
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">

      {/* Floating background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map(({ icon: Icon, style, size, delay, duration }, i) => (
          <div
            key={i}
            className={`absolute text-primary-200 ${size} ${style} animate-[float_6s_ease-in-out_infinite] ${delay} ${duration}`}
          >
            <Icon />
          </div>
        ))}

        {/* Soft glow blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-linear-to-bl from-primary-100/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-linear-to-tr from-primary-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">

        {/* 404 number */}
        <div className="relative mb-6 select-none">
          <span className="text-[10rem] sm:text-[12rem] font-black leading-none text-primary-50 select-none">
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] sm:text-[12rem] font-black leading-none text-transparent bg-clip-text bg-linear-to-br from-primary-400 to-primary-600 select-none">
            404
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-primary-50 flex items-center justify-center shadow-lg ring-1 ring-primary-100">
            <FaMagnifyingGlass className="text-3xl text-primary-500" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-primary-700 active:scale-[0.98] transition-all shadow-lg shadow-primary-600/25"
          >
            <FaHouse />
            Back to Home
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary-300 hover:text-primary-600 transition-all"
          >
            Browse Categories
          </Link>
        </div>
      </div>
    </div>
    <Features />
    </>
  );
}
