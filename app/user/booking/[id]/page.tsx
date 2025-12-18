'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/feedback/Loader';
import { Rating } from '@/components/feedback/Rating';
import { User, MapPin, Clock, Shield, CheckCircle } from 'lucide-react';
import { useJob } from '@/lib/hooks/useJobs';
import { formatCurrency } from '@/lib/utils/currency';
import toast from 'react-hot-toast';

// Mock workers for demonstration
const MOCK_WORKERS = [
  {
    id: 'w1',
    name: 'Rajesh Kumar',
    rating: 4.8,
    jobsCompleted: 156,
    hourlyRate: 250,
    distance: '1.2 km',
    image: null,
  },
  {
    id: 'w2',
    name: 'Amit Singh',
    rating: 4.5,
    jobsCompleted: 89,
    hourlyRate: 220,
    distance: '2.5 km',
    image: null,
  },
  {
    id: 'w3',
    name: 'Suresh Patel',
    rating: 4.9,
    jobsCompleted: 312,
    hourlyRate: 300,
    distance: '0.8 km',
    image: null,
  },
];

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const { isLoading } = useJob(params.id as string);
  const [matchingStep, setMatchingStep] = useState<'searching' | 'found' | 'confirming'>('searching');
  const [selectedWorker, setSelectedWorker] = useState<typeof MOCK_WORKERS[0] | null>(null);

  useEffect(() => {
    // Simulate searching process
    if (matchingStep === 'searching') {
      const timer = setTimeout(() => {
        setMatchingStep('found');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [matchingStep]);

  const handleSelectWorker = (worker: typeof MOCK_WORKERS[0]) => {
    setSelectedWorker(worker);
  };

  const handleConfirmBooking = async () => {
    if (!selectedWorker) return;
    
    setMatchingStep('confirming');
    
    // Simulate API call to assign worker
    try {
      // In a real app, we would call an API here
      // await jobService.assignWorker(job.id, selectedWorker.id);
      
      setTimeout(() => {
        toast.success(`Booking confirmed with ${selectedWorker.name}!`);
        router.push(`/user/jobs/${params.id}`);
      }, 1500);
    } catch {
      toast.error('Failed to confirm booking. Please try again.');
      setMatchingStep('found');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader size="lg" />
        <p className="mt-4 text-gray-500">Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Finding the Best Professional</h1>
        <p className="text-gray-600">
          Job ID: <span className="font-mono">{params.id}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Status & Workers */}
        <div className="md:col-span-2 space-y-6">
          {matchingStep === 'searching' && (
            <Card className="text-center py-12">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-blue-100 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">Scanning your area...</h2>
              <p className="text-gray-500">We&apos;re looking for available professionals nearby.</p>
            </Card>
          )}

          {matchingStep === 'found' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                Professionals Available Nearby
              </h2>
              
              {MOCK_WORKERS.map((worker) => (
                <Card 
                  key={worker.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedWorker?.id === worker.id 
                      ? 'border-blue-500 ring-2 ring-blue-100' 
                      : 'border-transparent hover:border-gray-200'
                  }`}
                  onClick={() => handleSelectWorker(worker)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Rating value={worker.rating} readonly size="sm" />
                          <span className="text-sm text-gray-500">({worker.jobsCompleted} jobs)</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" /> {worker.distance}
                          </span>
                          <span className="flex items-center">
                            <Shield className="w-4 h-4 mr-1 text-green-600" /> Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(worker.hourlyRate)}
                      </div>
                      <div className="text-xs text-gray-500">per hour</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {matchingStep === 'confirming' && (
            <Card className="text-center py-12">
              <Loader size="lg" className="mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Confirming your booking...</h2>
              <p className="text-gray-500">Please wait while we assign the professional.</p>
            </Card>
          )}
        </div>

        {/* Right Column: Job Summary */}
        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-gray-500 block mb-1">Service</span>
                <span className="font-medium">Plumbing Repair</span>
              </div>
              
              <div>
                <span className="text-gray-500 block mb-1">Date & Time</span>
                <span className="font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  Today, 2:30 PM
                </span>
              </div>

              <div>
                <span className="text-gray-500 block mb-1">Location</span>
                <span className="font-medium flex items-start">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                  123 Main Street, Apartment 4B
                </span>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Estimated Total</span>
                  <span className="font-bold text-lg">{formatCurrency(350)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  *Final price may vary based on actual work duration and parts used.
                </p>
                
                <Button 
                  className="w-full" 
                  disabled={!selectedWorker || matchingStep !== 'found'}
                  onClick={handleConfirmBooking}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
