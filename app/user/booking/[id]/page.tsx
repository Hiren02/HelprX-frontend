'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/feedback/Loader';
import { Rating } from '@/components/feedback/Rating';
import { User, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';
import { useJob } from '@/lib/hooks/useJobs';
import { useMatching } from '@/lib/hooks/useMatching';
import { formatCurrency } from '@/lib/utils/currency';
import { MatchWorker } from '@/lib/api/services/matching';
import toast from 'react-hot-toast';

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id as string;
  const { job, isLoading: isLoadingJob } = useJob(jobId);
  const { findWorkersAsync, isFinding, matchResults } = useMatching();

  const [matchingStep, setMatchingStep] = useState<'searching' | 'found' | 'confirming'>('searching');
  const [selectedWorker, setSelectedWorker] = useState<MatchWorker | null>(null);

  useEffect(() => {
    if (jobId && matchingStep === 'searching') {
      const searchWorkers = async () => {
        try {
          await findWorkersAsync({ jobId });
          setMatchingStep('found'); // 'found' now means "Waiting for acceptance"
        } catch (error) {
          toast.error('Failed to find professionals nearby');
          // Still show the page but maybe with an error state or empty list
        }
      };

      searchWorkers();
    }
  }, [jobId, matchingStep, findWorkersAsync]);

  // Poll for job status changes to detect assignment
  const { job: polledJob } = useJob(jobId);

  useEffect(() => {
    if (polledJob?.status === 'assigned' || polledJob?.assignedWorkerId) {
      toast.success('A professional has accepted your request!');
      router.push(`/user/jobs/${jobId}`);
    }
  }, [polledJob, jobId, router]);


  if (isLoadingJob || (matchingStep === 'searching' && isFinding)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
        <p className="mt-4 text-gray-500">Searching for nearby professionals...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Request Sent</h1>
        <p className="text-gray-600">
          Job ID: <span className="font-mono">{params.id}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Status & Workers */}
        <div className="md:col-span-2 space-y-6">
          <Card className="text-center py-12">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-ping"></div>
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Waiting for a professional...</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              We have sent your request to <strong>{matchResults?.matches?.length || 0}</strong> nearby professionals.
              The first one to accept will be assigned to your job.
            </p>
            <div className="mt-8 text-sm text-gray-400">
              You will be automatically redirected when a worker accepts.
            </div>
          </Card>
        </div>

        {/* Right Column: Job Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>

            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Service</span>
                <span className="font-medium capitalize">{job?.serviceType.replace('_', ' ')}</span>
              </div>

              <div>
                <span className="text-gray-500 block mb-1">Scheduled For</span>
                <span className="font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {job?.preferredTimeStart ? new Date(job.preferredTimeStart).toLocaleString() : 'ASAP'}
                </span>
              </div>

              <div>
                <span className="text-gray-500 block mb-1">Location</span>
                <span className="font-medium flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                  {job?.address?.addressLine}, {job?.address?.city}
                </span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Initial Quote</span>
                  <span className="font-bold text-lg">{formatCurrency(job?.priceEstimate || 0)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  *Final price may vary based on actual work duration and parts used.
                </p>

                <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50" onClick={() => router.back()}>
                  Cancel Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
