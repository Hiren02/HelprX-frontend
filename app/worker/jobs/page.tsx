'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/forms/Select';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, Clock, Phone, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/lib/utils/currency';
import { formatTimeAgo } from '@/lib/utils/date';

// Mock data for demonstration
const mockJobs = [
  {
    id: '1',
    title: 'Fix leaking kitchen tap',
    serviceType: 'plumbing',
    description: 'Kitchen tap is leaking, needs urgent repair',
    priceEstimate: 300,
    distance: 2.5,
    address: '123 Main Street, Sector 15, Mumbai',
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    user: {
      name: 'John Doe',
      phone: '9876543210',
    },
  },
  {
    id: '2',
    title: 'Ceiling fan installation',
    serviceType: 'electrical',
    description: 'Need to install 2 new ceiling fans in bedrooms',
    priceEstimate: 500,
    distance: 1.2,
    address: '45 Green Avenue, Andheri West, Mumbai',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    user: {
      name: 'Priya Sharma',
      phone: '9876543211',
    },
  },
  {
    id: '3',
    title: 'Bathroom cleaning',
    serviceType: 'cleaning',
    description: 'Deep cleaning of 2 bathrooms',
    priceEstimate: 800,
    distance: 5.0,
    address: '78 High Rise, Malad, Mumbai',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    user: {
      name: 'Rahul Verma',
      phone: '9876543212',
    },
  },
];

export default function WorkerJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'new' | 'accepted' | 'completed'>('new');
  
  // Advanced Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    maxDistance: '',
    serviceType: '',
  });

  const handleAcceptJob = (id: string) => {
    // TODO: Accept job API call
    toast.success('Job accepted');
    router.push(`/worker/jobs/${id}`);
  };

  const handleDeclineJob = (id: string) => {
    // TODO: Call API to decline job
    console.log('Declining job:', id);
    toast.success('Job declined');
  };

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      // 1. Tab Filter (Mocking status based on ID for demo)
      // In real app, check job.status
      if (filter !== 'new') return false; // Basic mock: all are 'new'

      // 2. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesDesc = job.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc) return false;
      }

      // 3. Price Filter
      if (filters.minPrice && job.priceEstimate < Number(filters.minPrice)) return false;
      if (filters.maxPrice && job.priceEstimate > Number(filters.maxPrice)) return false;

      // 4. Distance Filter
      if (filters.maxDistance && job.distance > Number(filters.maxDistance)) return false;

      // 5. Service Type Filter
      if (filters.serviceType && job.serviceType !== filters.serviceType) return false;

      return true;
    });
  }, [filter, searchQuery, filters]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Job Inbox</h1>
            <Button variant="ghost" onClick={() => router.push('/worker')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={filter === 'new' ? 'primary' : 'outline'}
            onClick={() => setFilter('new')}
            size="sm"
          >
            New Jobs
          </Button>
          <Button
            variant={filter === 'accepted' ? 'primary' : 'outline'}
            onClick={() => setFilter('accepted')}
            size="sm"
          >
            Accepted
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline'}
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
                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Button variant="outline" onClick={() => setShowFilterModal(true)} className="flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                    <Badge variant="info" className="ml-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                        {activeFilterCount}
                    </Badge>
                )}
            </Button>
        </div>

        {/* Job List */}
        {filter === 'new' ? (
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
              <Card key={job.id}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <Badge variant="info">{job.serviceType}</Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-secondary-600">
                      {formatCurrency(job.priceEstimate)}
                    </p>
                    <p className="text-sm text-gray-500">Estimated</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{job.distance} km away</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{formatTimeAgo(job.createdAt)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{job.user.name}</p>
                      <p className="text-sm text-gray-600">{job.address}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleAcceptJob(job.id)}
                    className="flex-1 bg-secondary-600 hover:bg-secondary-700"
                  >
                    Accept Job
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDeclineJob(job.id)}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                </div>

                {/* Auto-decline timer */}
                <div className="mt-3 text-center">
                  <p className="text-sm text-gray-500">
                    Auto-decline in <span className="font-medium text-red-600">14:32</span>
                  </p>
                </div>
              </Card>
            ))
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No jobs match your filters</p>
                    <Button variant="ghost" onClick={clearFilters} className="mt-2 text-primary-600 hover:text-primary-700 hover:bg-transparent">
                        Clear all filters
                    </Button>
                </div>
            )}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No {filter} jobs</p>
              <p className="text-sm text-gray-500">
                {`You don't have any ${filter} jobs`}
              </p>
            </div>
          </Card>
        )}
      </div>

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

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Distance (km)
                </label>
                <div className="relative">
                    <Input 
                        type="range" 
                        min="1" 
                        max="50"
                        className="w-full"
                        value={filters.maxDistance || 10}
                         onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: e.target.value }))}
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>1 km</span>
                        <span>{filters.maxDistance || 10} km</span>
                        <span>50 km</span>
                    </div>
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
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                    Reset
                </Button>
                <Button onClick={() => setShowFilterModal(false)} className="flex-1">
                    Apply Filters
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
}
