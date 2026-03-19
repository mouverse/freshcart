'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FaTruck, FaGift, FaPhone, FaEnvelope, FaUser, FaUserPlus, FaRightFromBracket } from 'react-icons/fa6';

export default function Announcement() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="hidden lg:block text-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <FaTruck className="text-primary-600 text-xs" />
              <span>Free Shipping on Orders 500 EGP</span>
            </span>
            <span className="flex items-center gap-2">
              <FaGift className="text-primary-600 text-xs" />
              <span>New Arrivals Daily</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
              >
                <FaPhone className="text-xs" />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 hover:text-primary-600 transition-colors"
              >
                <FaEnvelope className="text-xs" />
                <span>support@freshcart.com</span>
              </a>
            </div>

            <span className="w-px h-4 bg-gray-200"></span>

            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaUser className="text-xs" />
                    <span>{session.user?.name || 'User'}</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <FaRightFromBracket className="text-xs" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaUser className="text-xs" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-1.5 text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <FaUserPlus className="text-xs" />
                    <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
