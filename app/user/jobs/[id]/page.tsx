'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useJob, useJobs } from '@/lib/hooks/useJobs';
import { useSubmitRating, useJobRating } from '@/lib/hooks/useRatings';
import toast from 'react-hot-toast';
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
  Navigation,
  Loader2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';

// Mock job data
// Mock job data

export default function JobDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { job, isLoading, error } = useJob(id);
  const { cancelJob } = useJobs();
  const { submitRating, isSubmitting } = useSubmitRating();
  const { data: jobRating, refetch: refetchRating } = useJobRating(id);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  const handleCancelJob = () => {
    if (!id) return;

    cancelJob({ id, reason: cancelReason }, {
      onSuccess: () => {
        setShowCancelModal(false);
        // Maybe refetch or redirect? 
        // If redirecting to list, user won't see updated status here.
        // But usually cancelled jobs are shown in history.
        // Let's stay here or redirect to list.
        // Router push /user/jobs might be better.
        router.push('/user/jobs');
      }
    });
  };

  const handleSubmitRating = async () => {
    try {
      if (!id) return;
      await submitRating({
        jobId: id,
        rating: rating as any,
        review
      });
      setShowRatingModal(false);
      refetchRating();
    } catch (err) {
      // Error handled by hook
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-2">Job not found</h2>
        <Button onClick={() => router.push('/user/jobs')} variant="outline">Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 max-w-4xl px-4">
        <header className="bg-white border-b sticky top-0 z-10 rounded-lg shadow-sm mb-6">
          <div className="container mx-auto py-4 px-4">
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
        <Card className={`mb-6 text-white ${job.status === 'completed' ? 'bg-green-600' :
          job.status === 'cancelled' ? 'bg-red-600' :
            job.status === 'in_progress' ? 'bg-blue-600' :
              job.status === 'assigned' ? 'bg-secondary-600' :
                'bg-gray-600' // created, matching
          }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 mb-1">Job Status</p>
              <h2 className="text-2xl font-bold capitalize">
                {job.status.replace(/_/g, ' ')}
              </h2>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
              {job.status.toUpperCase().replace(/_/g, ' ')}
            </Badge>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Job Details</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Service</p>
              <p className="font-medium capitalize">{job.serviceType} - {job.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-gray-900">{job.description || 'No description provided'}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-semibold text-lg text-primary-600">
                  {job.finalPrice ? formatCurrency(job.finalPrice) : (
                    <span>{formatCurrency(job.priceEstimate || 0)} <span className='text-sm font-normal text-gray-500'>(Est.)</span></span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Scheduled Time</p>
                <p className="font-medium">{job.preferredTimeStart ? formatDateTime(job.preferredTimeStart) : 'ASAP'}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Worker Details - Only show if assigned */}
        {/* Note: Backend might assign worker but not populate full details depending on query. 
            Checking job.worker or job.assignedWorkerId 
        */}
        {job.assignedWorkerId && job.assignedWorker ? (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Worker Details</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center overflow-hidden">
                  {job.assignedWorker.profileImage ? (
                    <img
                      src={job.assignedWorker.profileImage}
                      alt={job.assignedWorker.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-secondary-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-lg">{job.assignedWorker.name}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Rating value={job.assignedWorker.avgRating || 0} readonly size="sm" />
                    <span className="text-sm text-gray-600">
                      {/* completedJobs might not be in the nested object, strictly checking typings */}
                      {/* Types say worker has name, phone, avgRating. completedJobs might be missing in Type def but returned by API. Safe to omit if not sure.*/}
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => window.location.href = `tel:${job.assignedWorker?.phone}`}>
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
            </div>
          </Card>
        ) : job.status === 'matching' ? (
          <Card className="mb-6 border-dashed border-2 border-secondary-200 bg-secondary-50">
            <div className="flex items-center justify-center py-6 text-center">
              <div>
                <Loader2 className="w-8 h-8 animate-spin text-secondary-600 mx-auto mb-2" />
                <p className="text-secondary-700 font-medium">Looking for a professional...</p>
                <p className="text-sm text-secondary-500">We are matching you with the best worker nearby.</p>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Location */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Service Location</h3>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
            <div>
              {job.address ? (
                <>
                  <p className="font-medium">{job.address.label || 'Address'}</p>
                  <p className="text-gray-600">{job.address.addressLine}</p>
                  <p className="text-gray-600">
                    {job.address.city}{job.address.state ? `, ${job.address.state}` : ''} - {job.address.pincode}
                  </p>
                </>
              ) : (
                <p className="text-gray-500">Location details not available</p>
              )}
            </div>
          </div>
          {job.address?.latitude && job.address?.longitude && (
            <Button variant="outline" className="w-full mt-4" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${job.address!.latitude},${job.address!.longitude}`, '_blank')}>
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </Button>
          )}
        </Card>

        {/* Timeline (Simplified Dynamic) */}
        {/* Ideally backend provides timeline events. For now, inferring from timestamps */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Job Timeline</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">Job Created</p>
                <p className="text-sm text-gray-600">{formatDateTime(job.createdAt)}</p>
              </div>
            </div>

            {/* If we had acceptedAt or startedAt, we could show more steps */}
            {job.status === 'in_progress' && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">In Progress</p>
                  <p className="text-sm text-gray-600">Work is currently being done</p>
                </div>
              </div>
            )}

            {job.status === 'completed' && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Completed</p>
                  <p className="text-sm text-gray-600">{job.completedAt ? formatDateTime(job.completedAt) : 'Job finished'}</p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex space-x-4">
          {['created', 'matching', 'assigned'].includes(job.status) && (
            <Button
              variant="danger"
              onClick={() => setShowCancelModal(true)}
              className="flex-1"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Job
            </Button>
          )}
          {job.status === 'completed' && !jobRating?.data && (
            <Button
              onClick={() => setShowRatingModal(true)}
              className="flex-1"
            >
              <Star className="w-4 h-4 mr-2" />
              Rate Worker
            </Button>
          )}

          {jobRating?.data && (
            <Card className="w-full bg-secondary-50 border-secondary-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-secondary-900">Your Rating</h4>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-bold">{jobRating.data.rating}</span>
                </div>
              </div>
              {jobRating.data.review && (
                <p className="text-gray-700 italic">"{jobRating.data.review}"</p>
              )}
            </Card>
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
            <p className="text-gray-600 mb-4">How was your experience with {job.assignedWorker?.name}?</p>
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
          <Button onClick={handleSubmitRating} className="w-full" isLoading={isSubmitting}>
            Submit Rating
          </Button>
        </div>
      </Modal>
    </div>
  );
}
