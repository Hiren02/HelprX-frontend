'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { ServiceType } from '@/types/worker';
import { MapPin, Upload, Plus, Check, ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAddresses } from '@/lib/hooks/useAddresses';
import { useJobs } from '@/lib/hooks/useJobs';
import { AddAddressModal } from '@/components/profile/AddAddressModal';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { addresses, isLoading: loadingAddresses } = useAddresses();
  const { createJobAsync, isCreating } = useJobs();
  const [step, setStep] = useState<'service' | 'details' | 'location'>('service');
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
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
    if (!formData.addressId) {
      toast.error('Please select an address');
      return;
    }
    
    if (!selectedService) return;

    try {
      const response = await createJobAsync({
        serviceType: selectedService,
        title: formData.title,
        description: formData.description,
        addressId: formData.addressId,
        preferredTimeStart: formData.preferredDate && formData.preferredTime 
          ? new Date(`${formData.preferredDate}T${formData.preferredTime}`).toISOString() 
          : undefined,
      });

      if (response.data) {
        toast.success('Service request created! Finding workers...');
        router.push(`/user/booking/${response.data.id}`);
      }
    } catch (error) {
      console.error(error);
      // Toast handled by mutation
    }
  };

  const steps = [
    { id: 'service', label: 'Service', number: 1 },
    { id: 'details', label: 'Details', number: 2 },
    { id: 'location', label: 'Location', number: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      {/* Header removed in favor of global layout header */}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full z-0" />
          <div 
             className="absolute top-1/2 left-0 h-1 bg-primary-500 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-in-out" 
             style={{ 
                 width: step === 'service' ? '0%' : step === 'details' ? '50%' : '100%' 
             }}
          />
          <div className="relative z-10 flex justify-between w-full max-w-lg mx-auto">
             {steps.map((s, index) => {
                 const isActive = s.id === step;
                 const isCompleted = 
                    (step === 'details' && index === 0) || 
                    (step === 'location' && index <= 1);
                 
                 return (
                     <div key={s.id} className="flex flex-col items-center gap-2 bg-gray-50/50 px-2">
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                             isActive || isCompleted 
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-110' 
                                : 'bg-white border-2 border-gray-200 text-gray-400'
                         }`}>
                             {isCompleted ? <Check className="w-5 h-5" /> : s.number}
                         </div>
                         <span className={`text-sm font-medium transition-colors ${
                             isActive || isCompleted ? 'text-primary-700' : 'text-gray-400'
                         }`}>
                             {s.label}
                         </span>
                     </div>
                 );
             })}
          </div>
        </div>

        <AnimatePresence mode="wait">
            {/* Step 1: Select Service */}
            {step === 'service' && (
            <motion.div
                key="service"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
            >
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What help do you need today?</h2>
                    <p className="text-gray-600">Select a category to get started</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SERVICE_TYPES.map((service) => (
                    <Card
                    key={service.value}
                    hover
                    padding="lg"
                    className="cursor-pointer text-center group border-gray-100 bg-white hover:border-primary-200"
                    onClick={() => handleServiceSelect(service.value)}
                    >
                    <div className="text-5xl mb-4 transform transition-transform group-hover:scale-110 duration-300 inline-block">{service.icon}</div>
                    <p className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{service.label}</p>
                    </Card>
                ))}
                </div>
            </motion.div>
            )}

            {/* Step 2: Service Details */}
            {step === 'details' && selectedService && (
            <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <Button variant="ghost" onClick={() => setStep('service')} className="mb-4 hover:bg-gray-100 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Button>
                <h2 className="text-2xl font-bold mb-6">Details for {SERVICE_TYPES.find(s => s.value === selectedService)?.label}</h2>
                <Card className="shadow-lg border-gray-100">
                <div className="space-y-6">
                    <Input
                        label="Problem Title"
                        placeholder="e.g., Fix leaking kitchen tap"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="text-lg"
                    />
                    
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Description
                    </label>
                    <textarea
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow resize-none bg-gray-50 focus:bg-white"
                        rows={4}
                        placeholder="Describe the issue in detail to help workers understand..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="date" 
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    value={formData.preferredDate}
                                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                                />
                            </div>
                        </div>
                         <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input 
                                    type="time" 
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none"
                                    value={formData.preferredTime}
                                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-primary-500" />
                        </div>
                        <p className="font-medium text-gray-900">Upload photos (optional)</p>
                        <p className="text-sm text-gray-500 mt-1">Help workers understand the problem better</p>
                    </div>

                    <Button onClick={() => setStep('location')} className="w-full h-12 text-lg shadow-lg shadow-primary-500/20">
                        Continue to Location <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
                </Card>
            </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 'location' && (
            <motion.div
                key="location"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                <Button variant="ghost" onClick={() => setStep('details')} className="mb-4 hover:bg-gray-100 -ml-2">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Details
                </Button>
                <h2 className="text-2xl font-bold mb-6">Select Location</h2>
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <Card className="border-gray-100 shadow-md">
                        <div className="space-y-4">
                            {loadingAddresses ? (
                            <div className="p-8 text-center">
                                <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                <p className="text-gray-500">Loading your addresses...</p>
                            </div>
                            ) : addresses.length === 0 ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <MapPin className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-gray-900">No saved addresses</h3>
                                <p className="text-sm text-gray-600 mt-1 mb-4">
                                Add an address where the service is required
                                </p>
                            </div>
                            ) : (
                                <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {addresses.map((address) => (
                                    <div 
                                        key={address.id}
                                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 relative ${
                                            formData.addressId === address.id 
                                                ? 'border-primary-500 bg-primary-50 shadow-md' 
                                                : 'border-transparent bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-sm'
                                        }`}
                                        onClick={() => setFormData({ ...formData, addressId: address.id })}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center ${
                                                     formData.addressId === address.id ? 'border-primary-600 bg-primary-600' : 'border-gray-400'
                                                }`}>
                                                    {formData.addressId === address.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-gray-900">{address.label}</h4>
                                                        {address.isDefault && <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Default</span>}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{address.addressLine}, {address.city}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{address.pincode}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            )}

                            <Button variant="outline" className="w-full border-dashed border-2 hover:border-primary-500 hover:text-primary-600 h-12" onClick={() => setIsAddAddressOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Address
                            </Button>
                        </div>
                        </Card>
                    </div>

                    <div className="lg:w-80">
                         <Card className="bg-primary-900 text-white border-primary-800 h-fit sticky top-24">
                            <h3 className="font-semibold text-lg mb-4 text-primary-50">Booking Summary</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-primary-200 text-sm">Service</p>
                                    <p className="font-medium text-lg flex items-center gap-2">
                                        {SERVICE_TYPES.find(s => s.value === selectedService)?.icon}
                                        {SERVICE_TYPES.find(s => s.value === selectedService)?.label}
                                    </p>
                                </div>
                                <div className="h-px bg-primary-800" />
                                <div>
                                    <p className="text-primary-200 text-sm">Estimated Price</p>
                                    <p className="font-bold text-2xl">₹250 - ₹500</p>
                                    <p className="text-xs text-primary-300">Final price depends on work scope</p>
                                </div>
                                <div className="h-px bg-primary-800" />
                                <Button 
                                    onClick={handleSubmit} 
                                    className="w-full bg-white text-primary-900 hover:bg-gray-100 shadow-xl" 
                                    size="lg" 
                                    disabled={!formData.addressId || isCreating}
                                >
                                    {isCreating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-primary-900 border-t-transparent rounded-full animate-spin mr-2" />
                                            Confirming...
                                        </>
                                    ) : 'Confirm Booking'}
                                </Button>
                            </div>
                         </Card>
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>

      <AddAddressModal 
        isOpen={isAddAddressOpen} 
        onClose={() => setIsAddAddressOpen(false)} 
      />
    </div>
  );
}
