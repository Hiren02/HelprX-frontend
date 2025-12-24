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
import { AxiosError } from 'axios';

export default function WorkerLoginPage() {
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
        
        // Check if user is a worker
        if (user.role !== 'worker') {
          toast.error('Please use the user login page');
          return;
        }
        
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setStoredUser(user);
        dispatch(setUser(user));
        
        toast.success('Login successful!');
        router.push('/worker');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">HelprX</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Worker Login</h1>
          <p className="mt-2 text-gray-600">Sign in to manage your jobs</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
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
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/worker/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/worker/register" className="text-purple-600 hover:text-purple-700 font-medium">
                Register as Worker
              </Link>
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Looking for services?{' '}
              <Link href="/user/login" className="text-purple-600 hover:text-purple-700 font-medium">
                User Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
