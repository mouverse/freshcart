import Link from 'next/link';
import { FaTruck, FaGift, FaPhone, FaEnvelope, FaUser, FaUserPlus } from 'react-icons/fa';

export default function Announcement() {
  return (
    <div className="hidden lg:block text-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <FaTruck className="text-green-600 text-xs" />
              <span>Free Shipping on Orders 500 EGP</span>
            </span>
            <span className="flex items-center gap-2">
              <FaGift className="text-green-600 text-xs" />
              <span>New Arrivals Daily</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
              >
                <FaPhone className="text-xs" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 hover:text-green-600 transition-colors"
              >
                <FaEnvelope className="text-xs" />
                <span>support@freshcart.com</span>
              </a>
            </div>

            <span className="w-px h-4 bg-gray-200"></span>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
              >
                <FaUser className="text-xs" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
              >
                <FaUserPlus className="text-xs" />
                <span>Sign Up</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
