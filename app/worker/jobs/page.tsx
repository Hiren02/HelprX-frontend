'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/forms/Select';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Search, Filter, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWorkerJobs, useAcceptJob, useDeclineJob } from '@/lib/hooks/useWorker';

export default function WorkerJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'assigned' | 'in_progress' | 'completed'>('assigned');

  // Advanced Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    maxDistance: '',
    serviceType: '',
  });

  const { data: jobs, isLoading } = useWorkerJobs({
    status: filter,
    // Pass other filters if backend supports them directly, otherwise filtering client-side below
    // For now, assuming backend filters by status primarily
  });

  const acceptJob = useAcceptJob();
  const declineJob = useDeclineJob();

  const handleAcceptJob = (id: string) => {
    acceptJob.mutate(id, {
      onSuccess: () => {
        // Optimistically update or wait for refetch (handled by hook)
        // Redirect to execution page? Or stay here?
        // Usually stay here or go to 'in_progress' tab?
        // Let's redirect to avoid confusion if it disappears from 'New' list
        router.push(`/worker/jobs/${id}`);
      }
    });
  };

  const handleDeclineJob = (id: string) => {
    // Show a modal for reason? For now hardcoded reason or prompt
    const reason = window.prompt("Reason for declining:") || "Not available";
    declineJob.mutate({ id, reason });
  };

  const activeFilterCount = [
    filters.minPrice,
    filters.maxPrice,
    filters.maxDistance,
    filters.serviceType
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      maxDistance: '',
      serviceType: '',
    });
    setShowFilterModal(false);
  };

  // Client-side filtering for demo (or until backend supports advanced search params)
  const filteredJobs = jobs?.data?.filter(job => {
    // 1. Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(query);
      const matchesDesc = job.description?.toLowerCase().includes(query) || false;
      if (!matchesTitle && !matchesDesc) return false;
    }

    // 2. Price Filter
    // Note: job has estimatedPrice (worker view might have price field)
    const price = job.priceEstimate || 0;
    if (filters.minPrice && price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

    // 3. Service Type Filter
    if (filters.serviceType && job.serviceType !== filters.serviceType) return false;

    // 4. Distance Filter (Need distance in job object, mock supported it, real API might not return it yet)
    // Skipping distance for now if not in type

    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Job Inbox</h1>
        </div>
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto py-1 pl-1">
          <Button
            variant={filter === 'assigned' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('assigned')}
            size="sm"
          >
            New Jobs
          </Button>
          <Button
            variant={filter === 'in_progress' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('in_progress')}
            size="sm"
          >
            Accepted / In Progress
          </Button>
          <Button
            variant={filter === 'completed' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('completed')}
            size="sm"
          >
            Completed
          </Button>
        </div>

        {/* Search & Advanced Filters Bar */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="secondary-outline" onClick={() => setShowFilterModal(true)} className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-secondary-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Link href={`/worker/jobs/${job.id}`} className="hover:underline">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                        </Link>
                        <Badge variant="secondary">{job.serviceType}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary-600">
                        {formatCurrency(job.priceEstimate || 0)}
                      </p>
                      <p className="text-sm text-gray-500">Estimated</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Distance if available */}
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {/* Placeholder for address until fully populated */}
                      <span className="text-sm">View Location</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{formatDateTime(job.createdAt || '')}</span>
                    </div>
                  </div>

                  {filter === 'assigned' && (
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleAcceptJob(job.id)}
                        disabled={acceptJob.isPending}
                        className="flex-1 bg-secondary-600 hover:bg-secondary-700"
                      >
                        {acceptJob.isPending ? 'Accepting...' : 'Accept Job'}
                      </Button>
                      <Button
                        variant="secondary-outline"
                        onClick={() => handleDeclineJob(job.id)}
                        disabled={declineJob.isPending}
                        className="flex-1"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                  {filter !== 'assigned' && (
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => router.push(`/worker/jobs/${job.id}`)}
                        className="flex-1"
                        variant="secondary"
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No jobs match your filters</p>
                <Button variant="ghost" onClick={clearFilters} className="mt-2 text-secondary-600 hover:text-secondary-700 hover:bg-transparent">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Filter Modal */}
      <Modal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        title="Filter Jobs"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range (₹)
            </label>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Min"
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              />
              <span className="text-gray-400">-</span>
              <Input
                placeholder="Max"
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              />
            </div>
          </div>

          <Select
            label="Service Type"
            value={filters.serviceType}
            onChange={(e) => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
            options={[
              { value: '', label: 'All Services' },
              { value: 'plumbing', label: 'Plumbing' },
              { value: 'electrical', label: 'Electrical' },
              { value: 'cleaning', label: 'Cleaning' },
            ]}
          />

          <div className="flex gap-3 pt-4">
            <Button variant="secondary-outline" onClick={clearFilters} className="flex-1">
              Reset
            </Button>
            <Button onClick={() => setShowFilterModal(false)} className="flex-1" variant="secondary">
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
