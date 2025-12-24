'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/forms/Select';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, Search, Filter, Loader2, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useWorkerJobs, useWorkerInbox, useAcceptJob, useDeclineJob, useCompleteJob, useStartJob } from '@/lib/hooks/useWorker';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function WorkerJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'new' | 'active' | 'history'>('new');

  // Advanced Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    maxDistance: '',
    serviceType: '',
  });

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: '',
    maxPrice: '',
    serviceType: '',
  });

  // Complete Job State
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [finalPrice, setFinalPrice] = useState(''); const debouncedSearch = useDebounce(searchQuery, 500);

  const queryParams = {
    search: debouncedSearch,
    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
    serviceType: appliedFilters.serviceType,
  };

  const { data: jobs, isLoading: isLoadingJobs } = useWorkerJobs({
    status: filter,
    ...queryParams,
  }, filter === 'active' || filter === 'history');

  const { data: inbox, isLoading: isLoadingInbox } = useWorkerInbox({
    ...queryParams,
  }, filter === 'new');

  // Re-map tabs: 
  // 'new' -> Inbox (pending invites)
  // 'active' -> My Active Jobs (assigned/in_progress)
  // 'history' -> History (completed/cancelled/disputed)

  const isLoading = isLoadingJobs || (filter === 'new' && isLoadingInbox);

  // Decide what to show based on filter
  const displayJobs = filter === 'new' ? inbox?.data : jobs?.data;

  const acceptJob = useAcceptJob();
  const declineJob = useDeclineJob();
  const startJob = useStartJob();
  const completeJob = useCompleteJob();


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

  const handleStartJob = (id: string) => {
    startJob.mutate(id);
  };

  const handleOpenCompleteModal = (job: any) => {
    setSelectedJobId(job.id);
    setFinalPrice(job.priceEstimate?.toString() || '');
    setShowCompleteModal(true);
  };

  const handleCompleteJob = () => {
    if (!selectedJobId || !finalPrice) return;

    completeJob.mutate({
      id: selectedJobId,
      finalPrice: parseFloat(finalPrice)
    }, {
      onSuccess: () => {
        setShowCompleteModal(false);
        setSelectedJobId(null);
        setFinalPrice('');
      }
    });
  };
  const activeFilterCount = [
    appliedFilters.minPrice,
    appliedFilters.maxPrice,
    appliedFilters.serviceType
  ].filter(Boolean).length;

  const handleApplyFilters = () => {
    setAppliedFilters({
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      serviceType: filters.serviceType,
    });
    setShowFilterModal(false);
  };

  const clearFilters = () => {
    const defaultFilters = {
      minPrice: '',
      maxPrice: '',
      maxDistance: '',
      serviceType: '',
    };
    setFilters(defaultFilters);
    setAppliedFilters({
      minPrice: '',
      maxPrice: '',
      serviceType: '',
    });
    setShowFilterModal(false);
  };

  // Client-side filtering removed - now handled by API
  const filteredJobs = displayJobs || [];

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
            variant={filter === 'new' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('new')}
            size="sm"
          >
            Invites ({inbox?.pagination?.totalItems || 0})
          </Button>
          <Button
            variant={filter === 'active' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('active')}
            size="sm"
          >
            Active Jobs
          </Button>
          <Button
            variant={filter === 'history' ? 'secondary' : 'secondary-outline'}
            onClick={() => setFilter('history')}
            size="sm"
          >
            History
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
                      {/* Address Link */}
                      {job.address ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${job.address.addressLine || ''} ${job.address.city || ''} ${job.address.state || ''} ${job.address.pincode || ''}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-secondary-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Location
                        </a>
                      ) : (
                        <span className="text-sm">Location not available</span>
                      )}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{formatDateTime(job.createdAt || (job as any).created_at)}</span>
                    </div>
                  </div>

                  {filter === 'new' && (
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
                  {filter !== 'active' && filter !== 'history' && (
                    <div className="flex justify-end space-x-3 space-y-2 mt-2">

                      <Button
                        onClick={() => router.push(`/worker/jobs/${job.id}`)}
                        className="w-fit"
                        variant="secondary"
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                  {filter === 'active' && (
                    <div className="flex justify-end space-x-3">
                      {job.status === 'assigned' && (
                        <Button
                          onClick={() => handleStartJob(job.id)}
                          disabled={startJob.isPending}
                          className="flex-1 bg-secondary-600 hover:bg-secondary-700"
                        >
                          {startJob.isPending ? 'Starting...' : 'Start Job'}
                        </Button>
                      )}
                      {job.status === 'in_progress' && (
                        <Button
                          onClick={() => handleOpenCompleteModal(job)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Complete Job
                        </Button>
                      )}
                      <Button
                        onClick={() => router.push(`/worker/jobs/${job.id}`)}
                        className="w-fit"
                        variant="secondary"
                      >
                        View Details
                      </Button>
                    </div>
                  )}
                  {filter === 'history' && (
                    <div className="flex justify-end space-x-3">
                      <Button
                        onClick={() => router.push(`/worker/jobs/${job.id}`)}
                        className="w-fit"
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
            <Button onClick={handleApplyFilters} className="flex-1" variant="secondary">
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>

      {/* Complete Job Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Complete Job"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Please confirm the final agreed price for this job.
          </p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Final Price (₹)
            </label>
            <Input
              type="number"
              value={finalPrice}
              onChange={(e) => setFinalPrice(e.target.value)}
              placeholder="Enter final amount"
              min="0"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <Button
              variant="ghost"
              onClick={() => setShowCompleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompleteJob}
              disabled={completeJob.isPending || !finalPrice}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {completeJob.isPending ? 'Completing...' : 'Complete Job'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
