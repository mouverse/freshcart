'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaTruck, FaShieldAlt, FaClock, FaLock as FaLockIcon, FaUsers, FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import Image from 'next/image';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    const loginPromise = signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        throw new Error('Invalid email or password');
      }
      
      if (result?.ok) {
        router.push('/');
        router.refresh();
      }
      
      return result;
    });

    toast.promise(loginPromise, {
      loading: 'Signing you in...',
      success: 'Welcome back! Redirecting...',
      error: (error) => {
        setIsLoading(false);
        return error.message || 'Login failed. Please try again.';
      },
    });
  };

  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <Image
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              alt="fresh vegetables and fruits shopping cart illustration"
              src="/images/LoginLogo.png"
              width={600}
              height={384}
              priority
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their daily grocery needs
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaTruck className="text-primary-600 mr-2" />
                  Free Delivery
                </div>
                <div className="flex items-center">
                  <FaShieldAlt className="text-primary-600 mr-2" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <FaClock className="text-primary-600 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-primary-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
              <p className="text-gray-600">Sign in to continue your fresh shopping experience</p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
              >
                <FaFacebook className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">Continue with Facebook</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Enter your email"
                    id="email"
                    type="email"
                    {...register('email')}
                  />
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <a
                    className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
                    href="/forget-password"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
                    placeholder="Enter your password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FaEye />
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
                    type="checkbox"
                    {...register('rememberMe')}
                  />
                  <span className="ml-3 text-sm text-gray-700">Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to FreshCart?
                <a
                  className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
                  href="/register"
                >
                  Create an account
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center">
                <FaLockIcon className="mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                50K+ Users
              </div>
              <div className="flex items-center">
                <FaStar className="mr-1" />
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
