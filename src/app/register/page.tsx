'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FaStar, FaTruckFast, FaShieldHalved, FaUserPlus } from 'react-icons/fa6';
import { FaGoogle, FaFacebook, FaSpinner } from 'react-icons/fa';
import { signupSchema, type SignupFormData } from '@/types/auth';

const registerSchema = signupSchema.extend({
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch('password');

  const calculatePasswordStrength = (pass: string): number => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength += 25;
    if (/\d/.test(pass)) strength += 25;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength += 25;
    return strength;
  };

  const getPasswordStrengthLabel = (strength: number): string => {
    if (strength === 0) return 'Weak';
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength <= 25) return 'bg-red-500';
    if (strength <= 50) return 'bg-orange-500';
    if (strength <= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    const signupPromise = fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }
      
      return result;
    });

    toast.promise(signupPromise, {
      loading: 'Creating your account...',
      success: (data) => {
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
        return 'Account created successfully! Redirecting to login...';
      },
      error: (error) => {
        setIsLoading(false);
        return error.message || 'An unexpected error occurred. Please try again.';
      },
    });
  };

  return (
    <main className="py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-green-600">FreshCart</span>
          </h1>
          <p className="text-xl mt-2 mb-4">
            Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
          </p>

          <ul className="space-y-6 my-8">
            <li className="flex items-start gap-4">
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center shrink-0">
                <FaStar />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Premium Quality</h2>
                <p className="text-gray-600">Premium quality products sourced from trusted suppliers.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center shrink-0">
                <FaTruckFast />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Fast Delivery</h2>
                <p className="text-gray-600">Same-day delivery available in most areas</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="icon size-12 text-lg bg-green-200 text-green-600 rounded-full flex justify-center items-center shrink-0">
                <FaShieldHalved />
              </div>
              <div className="content">
                <h2 className="text-lg font-semibold">Secure Shopping</h2>
                <p className="text-gray-600">Your data and payments are completely secure</p>
              </div>
            </li>
          </ul>

          <div className="review bg-white shadow-sm p-4 rounded-md">
            <div className="author flex items-center gap-4 mb-4">
              <div className="size-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-lg">
                SJ
              </div>
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <div className="rating flex gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
            <blockquote>
              <p className="italic text-gray-600">
                &quot;FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!&quot;
              </p>
            </blockquote>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
          <h2 className="text-center text-3xl font-semibold mb-2">Create Your Account</h2>
          <p className="text-center text-gray-600">Start your fresh journey with us today</p>

          <div className="register-options flex gap-2 my-10">
            <button
              type="button"
              className="grow bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center py-3 rounded-lg transition-colors"
              aria-label="Sign up with Google"
            >
              <FaGoogle className="text-red-600 mr-2" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="grow bg-transparent border border-gray-300 hover:bg-gray-100 flex justify-center items-center py-3 rounded-lg transition-colors"
              aria-label="Sign up with Facebook"
            >
              <FaFacebook className="text-blue-600 mr-2" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center justify-center">
            <span className="absolute bg-white px-4 text-gray-500 text-sm">or</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-medium">
                Name*
              </label>
              <input
                id="name"
                {...register('name')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Ali"
                type="text"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-medium">
                Email*
              </label>
              <input
                id="email"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="ali@example.com"
                autoComplete="email"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-medium">
                Password*
              </label>
              <input
                id="password"
                {...register('password', {
                  onChange: (e) => setPasswordStrength(calculatePasswordStrength(e.target.value)),
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="create a strong password"
                autoComplete="new-password"
                type="password"
              />
              {password && (
                <div className="password-requirements">
                  <div className="flex items-center gap-2">
                    <div className="grow h-1 bg-gray-200 rounded-md overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ease-out ${getPasswordStrengthColor(passwordStrength)}`}
                        style={{ width: `${passwordStrength}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium min-w-[50px]">
                      {getPasswordStrengthLabel(passwordStrength)}
                    </span>
                  </div>
                </div>
              )}
              <p className="text-gray-500 text-xs">
                Must be at least 8 characters with numbers and symbols
              </p>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rePassword" className="font-medium">
                Confirm Password*
              </label>
              <input
                id="rePassword"
                {...register('rePassword')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="confirm your password"
                autoComplete="new-password"
                type="password"
              />
              {errors.rePassword && (
                <span className="text-red-500 text-sm">{errors.rePassword.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-medium">
                Phone Number*
              </label>
              <input
                id="phone"
                {...register('phone')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="+1 234 567 8900"
                autoComplete="tel"
                type="tel"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>

            <div>
              <div className="flex items-start gap-2">
                <input
                  id="terms"
                  {...register('terms')}
                  className="size-4 mt-1 accent-green-600"
                  type="checkbox"
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="text-green-600 hover:underline">
                    Privacy Policy
                  </Link>{' '}
                  *
                </label>
              </div>
              {errors.terms && (
                <span className="text-red-500 text-sm block mt-1">{errors.terms.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? <FaSpinner className="animate-spin" /> : <FaUserPlus />}
              <span>{isLoading ? 'Creating Account...' : 'Create My Account'}</span>
            </button>
          </form>

          <p className="border-t pt-6 border-gray-300/30 mt-6 text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-green-600 hover:underline font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
