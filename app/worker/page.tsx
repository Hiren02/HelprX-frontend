'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Briefcase, Wallet, Star, TrendingUp, Power, PowerOff } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/store';
import { formatCurrency } from '@/lib/utils/currency';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [isOnline, setIsOnline] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  const toggleAvailability = () => {
    setIsOnline(!isOnline);
    // TODO: Call API to update availability
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-secondary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">HelprX Worker</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Availability Toggle */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Availability Status</h2>
              <p className="text-gray-600">
                {isOnline ? 'You are currently accepting jobs' : 'You are offline'}
              </p>
            </div>
            <button
              onClick={toggleAvailability}
              className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
                isOnline ? 'bg-secondary-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform ${
                  isOnline ? 'translate-x-12' : 'translate-x-1'
                }`}
              >
                {isOnline ? (
                  <Power className="w-6 h-6 text-secondary-600 m-2" />
                ) : (
                  <PowerOff className="w-6 h-6 text-gray-400 m-2" />
                )}
              </span>
            </button>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Today&apos;s Earnings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(0)}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Rating</p>
                <p className="text-2xl font-bold text-gray-900">0.0</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Completed</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/worker/jobs">
            <Card hover className="cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Job Inbox</h3>
                  <p className="text-gray-600 text-sm">View and manage job requests</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/worker/wallet">
            <Card hover className="cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Wallet</h3>
                  <p className="text-gray-600 text-sm">View earnings and request payout</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Jobs */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No recent jobs</p>
            <p className="text-sm text-gray-500">
              {isOnline
                ? 'Jobs will appear here when customers request your services'
                : 'Turn on availability to start receiving jobs'}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
