'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/forms/Select';
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

        {/* Analytics Section */}
        <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
                    Analytics & Performance
                </h2>
                <Select
                    value="week"
                    onChange={() => {}}
                    options={[
                        { value: 'week', label: 'This Week' },
                        { value: 'month', label: 'This Month' },
                        { value: 'year', label: 'This Year' },
                    ]}
                    className="w-32"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Mock Earnings Chart */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Earnings Overview</h3>
                    <div className="h-64 flex items-end justify-between px-2 gap-2">
                        {[450, 800, 300, 1200, 600, 950, 150].map((amount, i) => {
                            const height = Math.min((amount / 1200) * 100, 100);
                            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                            return (
                                <div key={i} className="flex flex-col items-center flex-1 group relative">
                                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity">
                                        ₹{amount}
                                    </div>
                                    <div 
                                        className="w-full bg-primary-200 hover:bg-primary-500 rounded-t-sm transition-colors duration-300"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-500 mt-2">{days[i]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Key Performance Indicators */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-700">Performance Metrics</h3>
                    
                    <div className="bg-white p-3 rounded border flex justify-between items-center">
                        <span className="text-gray-600 text-sm">Job Completion Rate</span>
                        <div className="text-right">
                             <span className="font-bold text-green-600">98%</span>
                             <p className="text-xs text-gray-400">Top 5% of workers</p>
                        </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border flex justify-between items-center">
                         <span className="text-gray-600 text-sm">On-Time Arrival</span>
                         <div className="text-right">
                             <span className="font-bold text-blue-600">100%</span>
                             <p className="text-xs text-gray-400">Streak: 15 jobs</p>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded border flex justify-between items-center">
                         <span className="text-gray-600 text-sm">Response Time</span>
                         <div className="text-right">
                             <span className="font-bold text-gray-900">15m</span>
                             <p className="text-xs text-gray-400">Avg. 12m in your area</p>
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded border flex justify-between items-center">
                         <span className="text-gray-600 text-sm">Repeat Customers</span>
                         <div className="text-right">
                             <span className="font-bold text-purple-600">12</span>
                             <p className="text-xs text-gray-400">Loyal client base</p>
                        </div>
                    </div>
                </div>
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
