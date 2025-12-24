'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { useJobs } from '@/lib/hooks/useJobs';
import { Loader } from '@/components/feedback/Loader';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';
import { FormattedDate } from '@/components/common/FormattedDate';
import { MapPin, Calendar, Filter, Clock } from 'lucide-react';
import { JobStatus } from '@/types/job';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

function UserJobsContent() {
  const router = useRouter();

  // Local state for filters
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch jobs with filters
  const { jobs, isLoading } = useJobs({
    startDate: dateRange.start || undefined,
    endDate: dateRange.end || undefined,
  });

  // Client-side filtering for Active/Past tabs 
  // (Since API normally returns all, and we want to split them in UI)
  const activeJobs = jobs.filter(job =>
    ['created', 'matching', 'assigned', 'in_progress'].includes(job.status)
  );

  const pastJobs = jobs.filter(job =>
    ['completed', 'cancelled', 'disputed'].includes(job.status)
  );

  const displayedJobs = activeTab === 'active' ? activeJobs : pastJobs;

  const getStatusBadge = (status: JobStatus) => {
    switch (status) {
      case 'created': return <Badge variant="info">Requested</Badge>;
      case 'matching': return <Badge variant="info">Matching</Badge>;
      case 'assigned': return <Badge variant="info">Assigned</Badge>;
      case 'in_progress': return <Badge variant="warning">In Progress</Badge>;
      case 'completed': return <Badge variant="success">Completed</Badge>;
      case 'cancelled': return <Badge variant="error">Cancelled</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-12">
      {/* Header removed in favor of global layout header */}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit border border-gray-200">
          {[
            { id: 'active', label: `Active Jobs (${activeJobs.length})` },
            { id: 'past', label: `Past Jobs (${pastJobs.length})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'active' | 'past')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${activeTab === tab.id
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-900'
                }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeJobTab"
                  className="absolute inset-0 bg-white rounded-lg shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <Card className="mb-6 border-gray-100">
          <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
            <div className="flex items-center space-x-2 text-gray-700">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="font-medium">Filter by Date</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400">
              {showFilters ? 'Hide' : 'Show'}
            </Button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 grid md:grid-cols-2 gap-4 pt-4 border-t">
                  <Input
                    type="date"
                    label="From Date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  />
                  <Input
                    type="date"
                    label="To Date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Job List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : displayedJobs.length > 0 ? (
          <motion.div
            key={activeTab}
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {displayedJobs.map((job) => (
              <Link href={`/user/jobs/${job.id}`} key={job.id} className="block group">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <Card hover className="group-hover:border-purple-200 transition-colors border-gray-100 shadow-sm hover:shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                          <h3 className="font-semibold text-lg group-hover:text-purple-600 transition-colors">
                            {job.title}
                          </h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                            <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                            <FormattedDate date={job.createdAt || (job as any).created_at} mode="date" />
                          </div>
                          <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                            <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                            <FormattedDate date={job.createdAt || (job as any).created_at} mode="time" />
                          </div>
                          {job.address && (
                            <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                              <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                              {job.address.city}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {job.priceEstimate ? formatCurrency(job.priceEstimate) : <span className="text-sm text-gray-500 font-normal">Pending Quote</span>}
                        </span>
                        <Button variant="outline" size="sm" className="w-full md:w-auto hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`${activeTab}-empty`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200"
          >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              {activeTab === 'active'
                ? "You don't have any active service requests at the moment."
                : "No completed job history found."}
            </p>
            {activeTab === 'active' && (
              <Button onClick={() => router.push('/user/search')} className="shadow-lg shadow-purple-500/20">
                Book a Service
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function UserJobsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12"><Loader size="lg" /></div>}>
      <UserJobsContent />
    </Suspense>
  );
}
