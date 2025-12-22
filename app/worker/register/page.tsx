'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { authService } from '@/lib/api/services/auth';
import { setAccessToken, setRefreshToken } from '@/lib/utils/auth';
import { useAppDispatch } from '@/store/hooks';
import { setUser } from '@/store/authSlice';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';

export default function WorkerRegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      const response = await authService.register({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        password: formData.password,
        role: 'worker',
      });
      
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        dispatch(setUser(user));
        
        toast.success('Worker registration successful!');
        // Redirect to onboarding as requested
        router.push('/worker/onboarding');
      }
    } catch (error: unknown) {
      console.error('Registration error:', error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100 rounded-full blur-3xl -mr-48 -mt-48 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl -ml-48 -mb-48 opacity-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-secondary-600 rounded-lg flex items-center justify-center shadow-lg shadow-secondary-200">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">HelprX</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Become a Provider</h1>
          <p className="mt-2 text-gray-600">Register as a worker to start earning</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl shadow-secondary-100/50 p-8 border border-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
              maxLength={10}
              className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
            />

            <Input
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              className="rounded-xl border-gray-200 focus:border-secondary-500 focus:ring-secondary-500"
            />

            <Button 
                type="submit" 
                className="w-full h-12 bg-secondary-600 hover:bg-secondary-700 text-white font-bold rounded-xl shadow-lg shadow-secondary-200 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                isLoading={isLoading}
            >
              Start Earning
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-600">
              Already have a worker account?{' '}
              <Link href="/worker/login" className="text-secondary-600 hover:text-secondary-700 font-bold">
                Sign in
              </Link>
            </p>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-400">Or</span>
                </div>
            </div>

            <p className="text-sm text-gray-600">
              Looking for services?{' '}
              <Link href="/user/register" className="text-primary-600 hover:text-primary-700 font-bold">
                User Registration
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
