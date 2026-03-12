'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { 
  FaMagnifyingGlass, 
  FaChevronDown, 
  FaHeadset, 
  FaCartShopping, 
  FaBars,
  FaXmark
} from 'react-icons/fa6';
import { FaHeart, FaUser } from 'react-icons/fa';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4 lg:gap-8">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/FreshCartLogo.svg"
              alt="FreshCart"
              width={160}
              height={31}
              className="h-6 lg:h-8 w-auto"
              priority
            />
          </Link>

          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
              >
                <FaMagnifyingGlass className="text-sm" />
              </button>
            </div>
          </form>

          <nav className="hidden xl:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Shop
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1.5 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2">
                Categories
                <FaChevronDown className="text-[10px] transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[200px]">
                  <Link
                    href="/categories"
                    className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    All Categories
                  </Link>
                  <Link
                    href="/products?category=6439d58a0049ad0b52b9003f"
                    className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Electronics
                  </Link>
                  <Link
                    href="/products?category=6439d5b90049ad0b52b90048"
                    className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Women&apos;s Fashion
                  </Link>
                  <Link
                    href="/products?category=6439d2d167d9aa4ca970649f"
                    className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Men&apos;s Fashion
                  </Link>
                  <Link
                    href="/products?category=6439d40367d9aa4ca97064a8"
                    className="block px-4 py-2.5 text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Beauty &amp; Health
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/brands"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Brands
            </Link>
          </nav>

          <div className="flex items-center gap-1 lg:gap-2">
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                <FaHeadset className="text-primary-600" />
              </div>
              <div className="text-xs">
                <div className="text-gray-400">Support</div>
                <div className="font-semibold text-gray-700">24/7 Help</div>
              </div>
            </Link>

            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
              title="Wishlist"
            >
              <FaHeart className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors" />
            </Link>

            <Link
              href="/cart"
              className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group"
              title="Cart"
            >
              <FaCartShopping className="text-xl text-gray-500 group-hover:text-primary-600 transition-colors" />
            </Link>

            <Link
              href="/login"
              className="hidden lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-primary-600/20"
            >
              <FaUser className="text-xs" />
              Sign In
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden ml-1 w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
          </div>
        </div>

        <>
          <div
            className={`fixed inset-0 bg-black/50 z-60 lg:hidden transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-70 overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                <Image
                  src="/images/FreshCartLogo.svg"
                  alt="FreshCart"
                  width={160}
                  height={31}
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  aria-label="Close menu"
                >
                  <FaXmark className="text-gray-600" />
                </button>
              </div>

              <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center"
                  >
                    <FaMagnifyingGlass className="text-sm" />
                  </button>
                </div>
              </form>

              <nav className="p-4">
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <Link
                    href="/categories"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/brands"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Brands
                  </Link>
                </div>
              </nav>

              <div className="mx-4 border-t border-gray-100"></div>

              <div className="p-4 space-y-1">
                <Link
                  href="/wishlist"
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                      <FaHeart className="text-red-500" />
                    </div>
                    <span className="font-medium text-gray-700">Wishlist</span>
                  </div>
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-green-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center">
                      <FaCartShopping className="text-green-600" />
                    </div>
                    <span className="font-medium text-gray-700">Cart</span>
                  </div>
                </Link>
              </div>

              <div className="mx-4 border-t border-gray-100"></div>

              <div className="p-4 space-y-1">
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              <Link
                href="/contact"
                className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-green-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FaHeadset className="text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-700">Need Help?</div>
                  <div className="text-sm text-green-600">Contact Support</div>
                </div>
              </Link>
            </div>
          </>
      </div>
    </div>
  );
}
