'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authService } from '@/lib/api/services/auth';
import { setAccessToken, setRefreshToken, setStoredUser } from '@/lib/utils/auth';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/authSlice';
import toast from 'react-hot-toast';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function UserLoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await authService.login(formData);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;

        // Store tokens and user
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setStoredUser(user as any); // Backend returns partial user on login

        // Update Redux state
        dispatch(setUser(user as any));

        toast.success('Login successful!');

        // Redirect to user dashboard
        router.push('/user');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 group">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">HelprX</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/50 p-8 border border-transparent dark:border-gray-800 transition-all duration-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              maxLength={10}
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="rounded border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-primary-600 focus:ring-primary-500 transition-colors" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
              </label>
              <Link href="/user/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link href="/user/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors">
                Sign up
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-500">Or</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you a service provider?{' '}
              <Link href="/worker/login" className="text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-semibold transition-colors">
                Worker Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
