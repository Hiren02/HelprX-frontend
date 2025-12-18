'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/forms/Select';
import { Textarea } from '@/components/forms/Textarea';
import { CheckCircle, Upload, Briefcase, MapPin, User, FileText, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 'skills', title: 'Skills & Experience', icon: Briefcase },
  { id: 'location', title: 'Service Area', icon: MapPin },
  { id: 'kyc', title: 'Identity Verification', icon: FileText },
  { id: 'profile', title: 'Public Profile', icon: User },
];

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    skills: '',
    experience: '',
    city: '',
    radius: '10',
    aadhaar: null as File | null,
    pan: null as File | null,
    bio: '',
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Onboarding completed! Welcome to HelprX.');
      router.push('/worker');
    }, 2000);
  };

  const StepIcon = STEPS[currentStep].icon;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Profile</h1>
          <p className="mt-2 text-gray-600">Join thousands of professionals growing their business with HelprX</p>
        </div>

        {/* Progress System */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -z-10 -translate-y-1/2 rounded transition-all duration-300"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>
          
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? 'bg-blue-600 text-white shadow-lg scale-110' : 
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs mt-2 font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        <Card className="p-8">
          <div className="mb-6 flex items-center gap-3 pb-6 border-b">
            <div className="p-3 bg-blue-50 rounded-lg">
              <StepIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{STEPS[currentStep].title}</h2>
              <p className="text-sm text-gray-500">Step {currentStep + 1} of {STEPS.length}</p>
            </div>
          </div>

          <div className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <Select
                  label="Primary Skill"
                  options={[
                    { value: 'plumbing', label: 'Plumbing' },
                    { value: 'electrical', label: 'Electrical' },
                    { value: 'cleaning', label: 'Cleaning' },
                    { value: 'carpentry', label: 'Carpentry' },
                  ]}
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  required
                />
                
                <Input
                  label="Years of Experience"
                  type="number"
                  placeholder="e.g. 5"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  required
                />
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Input
                  label="City"
                  placeholder="e.g. Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                   <Input
                    label="Service Radius (km)"
                    type="number"
                    value={formData.radius}
                    onChange={(e) => setFormData({...formData, radius: e.target.value})}
                  />
                  <Input
                    label="Pincode"
                    placeholder="400001"
                  />
                </div>
                <div className="bg-yellow-50 p-4 rounded text-sm text-yellow-700 mt-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  We&apos;ll use this to match you with nearby jobs.
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Upload Aadhaar Card</p>
                  <p className="text-xs text-gray-500">Front & Back side (PDF, JPG)</p>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Upload PAN Card</p>
                  <p className="text-xs text-gray-500">Clear image of the card</p>
                </div>
                
                <div className="flex items-start text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  <Shield className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />
                  Your documents are encrypted and stored largely. We only use them for verification purposes.
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                
                <Textarea
                  label="Bio / Description"
                  placeholder="Tell customers about your expertise and services..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  helperText="This will be visible on your public profile."
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-between pt-6 border-t">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
            >
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              {currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
