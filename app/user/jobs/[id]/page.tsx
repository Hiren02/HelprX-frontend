'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Rating } from '@/components/feedback/Rating';
import { Textarea } from '@/components/forms/Textarea';
import { 
  MapPin, 
  ArrowLeft,
  Clock, 
  User, 
  Phone, 
  Star,
  CheckCircle,
  XCircle,
  Navigation
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';

// Mock job data
// Mock job data

const mockJob = {
  id: '1',
  title: 'Fix leaking kitchen tap',
  description: 'Kitchen tap is leaking, needs urgent repair',
  serviceType: 'plumbing',
  status: 'in_progress',
  estimatedPrice: 300,
  finalPrice: null,
  createdAt: new Date().toISOString(),
  preferredTimeStart: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
  address: {
    label: 'Home',
    addressLine: '123 Main Street, Sector 15',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
  },
  worker: {
    id: 'w1',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    rating: 4.5,
    completedJobs: 150,
  },
};

export default function JobDetailsPage() {
  const router = useRouter();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleCancelJob = () => {
    // TODO: Call API to cancel job
    setShowCancelModal(false);
    router.push('/user');
  };

  const handleSubmitRating = () => {
    // TODO: Call API to submit rating
    setShowRatingModal(false);
    router.push('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 max-w-4xl">
         <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4">
          <div className="flex items-center gap-3">
            <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => router.push('/user/jobs')}
                className="-ml-2 text-gray-500 hover:text-gray-900"
            >
                <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Job Tracking</h1>
          </div>
        </div>
      </header>
        {/* Status Banner */}
        <Card className="mb-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-1">Job Status</p>
              <h2 className="text-2xl font-bold">
                {mockJob.status === 'in_progress' && 'Work in Progress'}
                {mockJob.status === 'assigned' && 'Worker Assigned'}
                {mockJob.status === 'completed' && 'Completed'}
              </h2>
            </div>
            <Badge variant="success" className="bg-white text-blue-600">
              {mockJob.status.replace('_', ' ').toUpperCase()}
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
                <p className="font-semibold text-lg text-primary-600">
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

        {/* Worker Details */}
        {mockJob.worker && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Worker Details</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-secondary-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{mockJob.worker.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Rating value={mockJob.worker.rating} readonly size="sm" />
                    <span className="text-sm text-gray-600">
                      ({mockJob.worker.completedJobs} jobs)
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Worker
              </Button>
            </div>
          </Card>
        )}

        {/* Location */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Service Location</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              <p className="font-medium">{mockJob.address.label}</p>
              <p className="text-gray-600">{mockJob.address.addressLine}</p>
              <p className="text-gray-600">
                {mockJob.address.city}, {mockJob.address.state} - {mockJob.address.pincode}
              </p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
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
                <p className="font-medium">Job Created</p>
                <p className="text-sm text-gray-600">{formatDateTime(mockJob.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Worker Assigned</p>
                <p className="text-sm text-gray-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Work in Progress</p>
                <p className="text-sm text-gray-600">Currently working</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex space-x-4">
          {mockJob.status === 'in_progress' && (
            <Button
              variant="danger"
              onClick={() => setShowCancelModal(true)}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Job
            </Button>
          )}
          {mockJob.status === 'completed' && (
            <Button
              onClick={() => setShowRatingModal(true)}
              className="flex-1"
            >
              <Star className="w-4 h-4 mr-2" />
              Rate Worker
            </Button>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        title="Cancel Job"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to cancel this job? This action cannot be undone.
          </p>
          <Textarea
            label="Cancellation Reason"
            placeholder="Please provide a reason for cancellation..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            rows={3}
            required
          />
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={() => setShowCancelModal(false)}
              className="flex-1"
            >
              Keep Job
            </Button>
            <Button
              variant="danger"
              onClick={handleCancelJob}
              className="flex-1"
            >
              Cancel Job
            </Button>
          </div>
        </div>
      </Modal>

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate Your Experience"
      >
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">How was your experience with {mockJob.worker?.name}?</p>
            <div className="flex justify-center">
              <Rating value={rating} onChange={setRating} size="lg" />
            </div>
          </div>
          <Textarea
            label="Review (Optional)"
            placeholder="Share your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmitRating} className="w-full">
            Submit Rating
          </Button>
        </div>
      </Modal>
    </div>
  );
}
