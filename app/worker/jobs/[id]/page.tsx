'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, MapPin, Clock, Navigation, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWorkerJob, useStartJob, useCompleteJob, useAcceptJob, useDeclineJob } from '@/lib/hooks/useWorker';
import { formatCurrency } from '@/lib/utils/currency';
import toast from 'react-hot-toast';

export default function JobExecutionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: jobResponse, isLoading } = useWorkerJob(id);
  const job = jobResponse?.data;

  const startJob = useStartJob();
  const completeJob = useCompleteJob();
  const acceptJob = useAcceptJob();
  const declineJob = useDeclineJob();

  const handleStartJob = () => {
    startJob.mutate(id, {
      onSuccess: () => {
        // Refetch explicitly or handled by invalidation
      }
    });
  };

  const handleCompleteJob = () => {
    // Logic to confirm final price if needed, for now using estimated
    const finalPrice = job?.priceEstimate || 0;
    // In real app, might show a modal to enter final price or extra charges
    const confirmed = window.confirm(`Complete job for ${formatCurrency(finalPrice)}?`);
    if (confirmed) {
      completeJob.mutate({ id, finalPrice }, {
        onSuccess: () => {
          router.push('/worker/jobs'); // Or stay on page with "Completed" status
        }
      });
    }
  };

  const handleNavigation = () => {
    if (!job?.address) return;
    const { latitude, longitude } = job.address; // Assuming address object has these
    // fallback if address is just string or missing coords
    if (!latitude || !longitude) {
      toast.error("Location coordinates unavailable");
      return;
    }
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-semibold mb-2">Job not found</h2>
        <Button onClick={() => router.push('/worker/jobs')} variant="secondary">Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <header className="bg-white border-b sticky top-0 z-10 mb-6 rounded-lg shadow-sm">
          <div className="container mx-auto py-4 px-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/worker/jobs')}
                className="-ml-2 text-gray-500 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Job Execution</h1>
            </div>
          </div>
        </header>

        {/* Status Banner */}
        <Card className={`mb-6 ${job.status === 'assigned' ? 'bg-purple-600' :
          job.status === 'in_progress' ? 'bg-purple-700' :
            job.status === 'completed' ? 'bg-green-600' : 'bg-gray-600'
          } text-white border-none`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="opacity-90 mb-1">Current Status</p>
              <h2 className="text-2xl font-bold capitalize">{job.status.replace('_', ' ')}</h2>
            </div>
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              {job.status === 'assigned' && <Clock className="w-8 h-8" />}
              {job.status === 'in_progress' && <Navigation className="w-8 h-8 animate-pulse" />}
              {job.status === 'completed' && <CheckCircle className="w-8 h-8" />}
            </div>
          </div>
        </Card>

        {/* Action Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between border border-gray-100 sticky top-24 z-10">
          <div>
            <p className="text-sm text-gray-500">Actions</p>
          </div>
          <div className="flex gap-3">
            {job.status === 'matching' && (
              <div className="flex gap-2">
                <Button onClick={() => acceptJob.mutate(id)} variant="secondary">Accept Job</Button>
                <Button onClick={() => declineJob.mutate({ id, reason: 'Declined' })} variant="danger">Decline</Button>
              </div>
            )}

            {job.status === 'assigned' && (
              <div className="flex gap-2">
                <Button onClick={() => handleStartJob()} variant="secondary">Start Job</Button>
              </div>
            )}

            {job.status === 'in_progress' && (
              <Button onClick={handleCompleteJob} variant="secondary">Complete Job</Button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Job Details */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4">Job Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Service Type</label>
                  <p className="font-medium capitalize">{job.serviceType}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Title</label>
                  <p className="font-medium">{job.title}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Description</label>
                  <p className="text-gray-700">{job.description}</p>
                </div>
                {job.attachments && job.attachments.length > 0 && (
                  <div>
                    <label className="text-sm text-gray-500">Attachments</label>
                    <div className="flex gap-2 mt-2">
                      {job.attachments.map((url, i) => (
                        <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                          View Attachment {i + 1}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Address */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Location</h3>
                <Button variant="secondary-outline" size="sm" onClick={handleNavigation}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  {job.address ? (
                    <>
                      <p className="font-medium">{job.address.label || 'Address'}</p>
                      <p>{job.address.addressLine}</p>
                      <p>{job.address.city}, {job.address.state} - {job.address.pincode}</p>
                    </>
                  ) : (
                    <p>Location details unavailable</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Customer</h3>
              {job.user ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">{job.user.name?.[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium">{job.user.name}</p>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Customer info hidden</p>
              )}
            </Card>

            {/* Earnings */}
            <Card>
              <h3 className="text-lg font-semibold mb-4">Est. Earnings</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(job.priceEstimate || 0)}
              </div>
              <p className="text-sm text-gray-500">
                Includes base fare and surge pricing if applicable.
              </p>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
