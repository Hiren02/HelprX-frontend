'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import { Briefcase, MapPin, Clock, DollarSign, Phone } from 'lucide-react';
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
];

export default function WorkerJobsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'new' | 'accepted' | 'completed'>('new');

  const handleAcceptJob = (jobId: string) => {
    // TODO: Call API to accept job
    router.push(`/worker/jobs/${jobId}`);
  };

  const handleDeclineJob = (jobId: string) => {
    // TODO: Call API to decline job
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
        <div className="flex space-x-2 mb-6">
          <Button
            variant={filter === 'new' ? 'primary' : 'outline'}
            onClick={() => setFilter('new')}
          >
            New Jobs
          </Button>
          <Button
            variant={filter === 'accepted' ? 'primary' : 'outline'}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </Button>
          <Button
            variant={filter === 'completed' ? 'primary' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>

        {/* Job List */}
        {filter === 'new' && mockJobs.length > 0 ? (
          <div className="space-y-4">
            {mockJobs.map((job) => (
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
            ))}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No {filter} jobs</p>
              <p className="text-sm text-gray-500">
                {filter === 'new'
                  ? 'New job requests will appear here'
                  : `You don't have any ${filter} jobs`}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
