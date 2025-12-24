'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/forms/Select';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Briefcase, Wallet, Star, TrendingUp, Power, PowerOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/store';
import { formatCurrency } from '@/lib/utils/currency';
import { motion } from 'framer-motion';
import { useWorkerProfile, useWorkerStats, useUpdateAvailability, useWorkerJobs } from '@/lib/hooks/useWorker';
import { Badge } from '@/components/ui/Badge';
import { formatDateTime } from '@/lib/utils/date';

export default function WorkerDashboardPage() {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { data: profile, isLoading: isLoadingProfile } = useWorkerProfile();
  const [timeRange, setTimeRange] = useState('week');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });

  const { data: stats, isLoading: isLoadingStats } = useWorkerStats({
    range: timeRange,
    startDate: customRange.start,
    endDate: customRange.end
  });
  const { data: recentJobs, isLoading: isLoadingJobs } = useWorkerJobs({ limit: 5 });
  const updateAvailability = useUpdateAvailability();

  const isOnline = profile?.data?.availabilityStatus === 'online';

  const toggleAvailability = () => {
    updateAvailability.mutate({
      status: isOnline ? 'offline' : 'online',
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoadingProfile || isLoadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-secondary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.data?.name || user?.name}
          </h1>
          <p className="text-gray-600">Manage your jobs and earnings</p>
        </motion.div>

        {/* Availability Toggle */}
        <Card className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">Availability Status</h2>
              <p className="text-gray-600">
                {isOnline ? 'You are currently accepting jobs' : 'You are offline. Turn online to start accepting jobs.'}
              </p>
            </div>
            <button
              onClick={toggleAvailability}
              disabled={updateAvailability.isPending}
              className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${isOnline ? 'bg-secondary-600' : 'bg-gray-300'
                } ${updateAvailability.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-12' : 'translate-x-1'
                  }`}
              >
                {updateAvailability.isPending ? (
                  <Loader2 className="w-6 h-6 text-gray-400 m-2 animate-spin" />
                ) : isOnline ? (
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
              <TrendingUp className=" h-5 mr-2 text-secondary-600" />
              Analytics & Performance
            </h2>
            <div className="flex items-center gap-2">
              {timeRange === 'custom' && (
                <div className="flex items-center gap-2 mr-2">
                  <input
                    type="date"
                    className="text-xs border rounded px-2 py-1"
                    value={customRange.start}
                    onChange={(e) => setCustomRange({ ...customRange, start: e.target.value })}
                  />
                  <span className="text-xs text-gray-400">to</span>
                  <input
                    type="date"
                    className="text-xs border rounded px-2 py-1"
                    value={customRange.end}
                    onChange={(e) => setCustomRange({ ...customRange, end: e.target.value })}
                  />
                </div>
              )}
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                options={[
                  { value: 'week', label: 'This Week' },
                  { value: 'month', label: 'This Month' },
                  { value: 'year', label: 'This Year' },
                  { value: 'custom', label: 'Custom Range' },
                ]}
                className="w-fit"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Earnings Chart */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 overflow-hidden">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Earnings Overview</h3>
              <div className={`h-64 flex items-end justify-between px-2 ${(stats?.data?.dailyEarnings || []).length > 20 ? 'gap-0.5' : (stats?.data?.dailyEarnings || []).length > 10 ? 'gap-1' : 'gap-2'}`}>
                {(stats?.data?.dailyEarnings || []).map((dayData: any, i: number) => {
                  const date = new Date(dayData.date);
                  const isMonthly = dayData.date.length === 7; // YYYY-MM

                  const label = isMonthly
                    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]
                    : date.getDate().toString();

                  const maxEarnings = Math.max(...(stats?.data?.dailyEarnings || []).map((d: any) => d.earnings), 500);
                  const height = Math.min((dayData.earnings / maxEarnings) * 100, 100);

                  return (
                    <div key={i} className="flex flex-col items-center flex-1 group relative h-full justify-end">
                      <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                        {formatCurrency(dayData.earnings)}
                      </div>
                      <div
                        className="w-full bg-secondary-400 hover:bg-secondary-500 rounded-t-sm transition-all duration-300"
                        style={{ height: `${height}%`, minHeight: dayData.earnings > 0 ? '4px' : '0px' }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-2 truncate max-w-full text-center">{label}</span>
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
                  <span className="font-bold text-green-600">
                    {stats?.data ?
                      Math.round((stats.data.completedJobs / (stats.data.totalJobs || 1)) * 100)
                      : 0}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded border flex justify-between items-center">
                <span className="text-gray-600 text-sm">Acceptance Rate</span>
                <div className="text-right">
                  <span className="font-bold text-secondary-600">
                    {(stats?.data?.acceptanceRate || 0) * 100}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-3 rounded border flex justify-between items-center">
                <span className="text-gray-600 text-sm">Total Ratings</span>
                <div className="text-right">
                  <span className="font-bold text-gray-900">{stats?.data?.totalRatings || 0}</span>
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
                <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats?.data?.totalEarnings || 0)}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">{stats?.data?.activeJobs || 0}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.data?.avgRating || profile?.data?.avgRating || 0.0}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats?.data?.completedJobs || profile?.data?.completedJobs || 0}</p>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Jobs</h2>
            <Link href="/worker/jobs">
              <Button variant="ghost" size="sm">View All</Button>
            </Link>
          </div>

          {recentJobs?.data && recentJobs.data.length > 0 ? (
            <div className="space-y-4">
              {recentJobs.data.map(job => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-sm text-gray-600">{formatDateTime(job.createdAt || (job as any).created_at)}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={job.status === 'completed' ? 'success' : job.status === 'in_progress' ? 'secondary' : 'default'}>
                      {job.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No recent jobs</p>
              <p className="text-sm text-gray-500">
                {isOnline
                  ? 'Jobs will appear here when customers request your services'
                  : 'Turn on availability to start receiving jobs'}
              </p>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
