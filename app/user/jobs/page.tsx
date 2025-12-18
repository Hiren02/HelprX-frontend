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
import { MapPin, Calendar, Filter } from 'lucide-react';
import { JobStatus } from '@/types/job';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
            <Button onClick={() => router.push('/user/search')}>
              New Request
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-lg mb-6 w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'active' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Active Jobs ({activeJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'past' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Past Jobs ({pastJobs.length})
          </button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                <div className="flex items-center space-x-2 text-gray-700">
                    <Filter className="w-5 h-5" />
                    <span className="font-medium">Filter by Date</span>
                </div>
                <Button variant="ghost" size="sm">
                    {showFilters ? 'Hide' : 'Show'}
                </Button>
            </div>
            
            {showFilters && (
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
            )}
        </Card>

        {/* Job List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader size="lg" />
          </div>
        ) : displayedJobs.length > 0 ? (
          <div className="space-y-4">
            {displayedJobs.map((job) => (
              <Link href={`/user/jobs/${job.id}`} key={job.id} className="block group">
                <Card hover className="group-hover:border-primary-200 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary-600 transition-colors">
                            {job.title}
                        </h3>
                        {getStatusBadge(job.status)}
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1.5" />
                            {formatDateTime(job.createdAt)}
                        </div>
                        {job.address && (
                            <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1.5" />
                                {job.address.city}
                            </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                        <span className="text-lg font-bold text-secondary-600">
                            {job.priceEstimate ? formatCurrency(job.priceEstimate) : 'Pending Quote'}
                        </span>
                        <Button variant="outline" size="sm" className="w-full md:w-auto">
                            View Details
                        </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-500 mb-6">
                {activeTab === 'active' 
                    ? "You don't have any active service requests." 
                    : "No completed job history found within this date range."}
            </p>
            {activeTab === 'active' && (
                <Button onClick={() => router.push('/user/search')}>
                    Book a Service
                </Button>
            )}
          </div>
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
