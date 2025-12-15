'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ServiceType } from '@/types/worker';
import { Search, MapPin, Clock, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

const SERVICE_TYPES: { value: ServiceType; label: string; icon: string }[] = [
  { value: 'plumbing', label: 'Plumbing', icon: '🔧' },
  { value: 'electrical', label: 'Electrical', icon: '⚡' },
  { value: 'tutoring', label: 'Tutoring', icon: '📚' },
  { value: 'carpentry', label: 'Carpentry', icon: '🔨' },
  { value: 'painting', label: 'Painting', icon: '🎨' },
  { value: 'cleaning', label: 'Cleaning', icon: '🧹' },
  { value: 'pet_care', label: 'Pet Care', icon: '🐕' },
  { value: 'handyman', label: 'Handyman', icon: '🛠️' },
  { value: 'ac_repair', label: 'AC Repair', icon: '❄️' },
  { value: 'appliance_repair', label: 'Appliance Repair', icon: '🔌' },
  { value: 'pest_control', label: 'Pest Control', icon: '🐛' },
  { value: 'gardening', label: 'Gardening', icon: '🌱' },
];

export default function SearchPage() {
  const router = useRouter();
  const [step, setStep] = useState<'service' | 'details' | 'location'>('service');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    addressId: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    setStep('details');
  };

  const handleSubmit = async () => {
    // TODO: Implement job creation
    toast.success('Service request created! Finding workers...');
    router.push('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Find a Service</h1>
            <Button variant="ghost" onClick={() => router.push('/user')}>
              Cancel
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step === 'service' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'service' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Service</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'details' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'details' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Details</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className={`flex items-center ${step === 'location' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'location' ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Location</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 'service' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">What service do you need?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SERVICE_TYPES.map((service) => (
                <Card
                  key={service.value}
                  hover
                  padding="md"
                  className="cursor-pointer text-center"
                  onClick={() => handleServiceSelect(service.value)}
                >
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <p className="font-medium text-gray-900">{service.label}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Service Details */}
        {step === 'details' && selectedService && (
          <div>
            <Button variant="ghost" onClick={() => setStep('service')} className="mb-4">
              ← Back
            </Button>
            <h2 className="text-xl font-semibold mb-4">Describe your requirement</h2>
            <Card>
              <div className="space-y-4">
                <Input
                  label="Title"
                  placeholder="e.g., Fix leaking kitchen tap"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={4}
                    placeholder="Describe the problem in detail..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Preferred Date"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  />
                  <Input
                    label="Preferred Time"
                    type="time"
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upload photos (optional)</p>
                  <p className="text-xs text-gray-500 mt-1">Help workers understand the problem better</p>
                </div>

                <Button onClick={() => setStep('location')} className="w-full">
                  Continue
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 'location' && (
          <div>
            <Button variant="ghost" onClick={() => setStep('details')} className="mb-4">
              ← Back
            </Button>
            <h2 className="text-xl font-semibold mb-4">Where do you need the service?</h2>
            <Card>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">No saved addresses</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Add an address to continue
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>

                <div className="pt-4 border-t">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h3 className="font-medium mb-2">Estimated Price</h3>
                    <p className="text-3xl font-bold text-primary-600">₹250 - ₹500</p>
                    <p className="text-sm text-gray-600 mt-1">Based on similar requests</p>
                  </div>

                  <Button onClick={handleSubmit} className="w-full" size="lg">
                    Find Workers
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
