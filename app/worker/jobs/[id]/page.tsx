'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { 
  MapPin, 
  Clock, 
  User, 
  Phone,
  CheckCircle,
  Play,
  DollarSign,
  Navigation
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';

// Mock job data
const mockJob = {
  id: '1',
  title: 'Fix leaking kitchen tap',
  description: 'Kitchen tap is leaking, needs urgent repair',
  serviceType: 'plumbing',
  status: 'assigned',
  estimatedPrice: 300,
  createdAt: new Date().toISOString(),
  preferredTimeStart: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  address: {
    label: 'Home',
    addressLine: '123 Main Street, Sector 15',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    latitude: 19.0760,
    longitude: 72.8777,
  },
  user: {
    id: 'u1',
    name: 'John Doe',
    phone: '9876543210',
  },
};

export default function WorkerJobExecutionPage() {
  const router = useRouter();
  const [status, setStatus] = useState(mockJob.status);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [finalPrice, setFinalPrice] = useState(mockJob.estimatedPrice.toString());

  const handleStartJob = () => {
    setStatus('in_progress');
    // TODO: Call API to start job
  };

  const handleCompleteJob = () => {
    // TODO: Call API to complete job
    setShowCompleteModal(false);
    router.push('/worker/jobs');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Job Execution</h1>
            <Button variant="ghost" onClick={() => router.push('/worker/jobs')}>
              Back to Jobs
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status Banner */}
        <Card className="mb-6 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary-100 mb-1">Job Status</p>
              <h2 className="text-2xl font-bold">
                {status === 'assigned' && 'Ready to Start'}
                {status === 'in_progress' && 'Work in Progress'}
                {status === 'completed' && 'Completed'}
              </h2>
            </div>
            <Badge variant="success" className="bg-white text-secondary-600">
              {status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Job Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Service</p>
              <p className="font-medium">{mockJob.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-gray-900">{mockJob.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Estimated Price</p>
                <p className="font-semibold text-lg text-secondary-600">
                  {formatCurrency(mockJob.estimatedPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled Time</p>
                <p className="font-medium">{formatDateTime(mockJob.preferredTimeStart)}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Customer Details */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Customer Details</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-lg">{mockJob.user.name}</p>
                <p className="text-sm text-gray-600">{mockJob.user.phone}</p>
              </div>
            </div>
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Call Customer
            </Button>
          </div>
        </Card>

        {/* Location */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Service Location</h3>
          <div className="flex items-start space-x-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">{mockJob.address.label}</p>
              <p className="text-gray-600">{mockJob.address.addressLine}</p>
              <p className="text-gray-600">
                {mockJob.address.city}, {mockJob.address.state} - {mockJob.address.pincode}
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full">
            <Navigation className="w-4 h-4 mr-2" />
            Get Directions
          </Button>
        </Card>

        {/* Timeline */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Job Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Job Accepted</p>
                <p className="text-sm text-gray-600">{formatDateTime(mockJob.createdAt)}</p>
              </div>
            </div>
            {status === 'in_progress' && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Work Started</p>
                  <p className="text-sm text-gray-600">Just now</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-4">
          {status === 'assigned' && (
            <Button
              onClick={handleStartJob}
              className="w-full bg-secondary-600 hover:bg-secondary-700"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Job
            </Button>
          )}
          {status === 'in_progress' && (
            <Button
              onClick={() => setShowCompleteModal(true)}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>
      </div>

      {/* Complete Job Modal */}
      <Modal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        title="Complete Job"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Enter the final price for this job. The customer will be charged this amount.
          </p>
          <Input
            label="Final Price"
            type="number"
            value={finalPrice}
            onChange={(e) => setFinalPrice(e.target.value)}
            placeholder="Enter final price"
            required
          />
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">Payment Information</p>
                <p className="text-sm text-blue-700 mt-1">
                  Amount will be added to your wallet after customer payment confirmation.
                </p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={() => setShowCompleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCompleteJob}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Complete Job
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
