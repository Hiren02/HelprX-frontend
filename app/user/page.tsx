'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Plus, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useJobs } from '@/lib/hooks/useJobs';
import { formatCurrency } from '@/lib/utils/currency';
import { FormattedDate } from '@/components/common/FormattedDate';
import { Badge } from '@/components/ui/Badge';

export default function UserDashboardPage() {
  const router = useRouter();
  const { jobs, isLoading } = useJobs();

  // Calculate stats
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const activeJobs = jobs.filter(job => ['pending', 'assigned', 'in_progress'].includes(job.status)).length;

  // Get recent 5 jobs
  const recentJobs = [...jobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'in_progress': return 'info';
      default: return 'warning';
    }
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

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header removed in favor of global layout header */}

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your service requests and bookings</p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/user/search">
            <Card hover className="h-full bg-gradient-to-br from-white to-primary-50/30 border-primary-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Plus className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">New Service Request</h3>
                  <p className="text-gray-600 text-sm">Find a service provider</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/user/profile">
            <Card hover className="h-full bg-gradient-to-br from-white to-secondary-50/30 border-secondary-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">Manage Addresses</h3>
                  <p className="text-gray-600 text-sm">Add or edit your addresses</p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-gray-600 mb-2 font-medium">Total Jobs</p>
              <p className="text-4xl font-bold text-gray-900">{totalJobs}</p>
            </div>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-gray-600 mb-2 font-medium">Completed</p>
              <p className="text-4xl font-bold text-green-600">{completedJobs}</p>
            </div>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm">
            <div className="text-center">
              <p className="text-gray-600 mb-2 font-medium">Active</p>
              <p className="text-4xl font-bold text-blue-600">{activeJobs}</p>
            </div>
          </Card>
        </motion.div>

        {/* Recent Jobs */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
            {jobs.length > 0 && (
              <Link href="/user/jobs">
                <Button variant="ghost" className="hover:bg-gray-100">View All</Button>
              </Link>
            )}
          </div>

          <Card className="border-gray-100 shadow-lg shadow-gray-100/50">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No recent activity</h3>
                <p className="text-gray-500 mb-6">You haven&apos;t booked any services yet.</p>
                <Button onClick={() => router.push('/user/search')}>
                  Find a Service
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {recentJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    className="py-4 first:pt-0 last:pb-0 hover:bg-gray-50/50 rounded-lg transition-colors px-2 -mx-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{job.title}</h4>
                          <div className="flex flex-wrap text-sm text-gray-500 gap-x-3 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              <FormattedDate date={job.createdAt || (job as any).created_at} mode="date" />
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <FormattedDate date={job.createdAt || (job as any).created_at} mode="time" />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={getStatusBadgeVariant(job.status)}>
                          {job.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <p className="font-medium text-gray-900 min-w-[80px] text-right">
                          {formatCurrency(job.priceEstimate || 0)}
                        </p>
                        <Link href={`/user/jobs/${job.id}`}>
                          <Button variant="ghost" size="sm" className="hover:bg-indigo-50 hover:text-indigo-600">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
