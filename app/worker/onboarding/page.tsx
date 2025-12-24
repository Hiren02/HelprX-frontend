'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/forms/Select';
import { User, Briefcase, FileText, CheckCircle, ChevronRight, ChevronLeft, Upload, Loader2, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateWorkerProfile, useUpdateSkills, useUploadKYC, useWorkerProfile, useCreateWorkerAddress } from '@/lib/hooks/useWorker';
import { ServiceType } from '@/types/worker';
import { AddressAutocomplete } from '@/components/location/AddressAutocomplete';
import toast from 'react-hot-toast';
import { clearAuthData } from '@/lib/utils/auth';
import { clearUser } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';

const STEPS = [
  { id: 'profile', title: 'Profile Setup', icon: User },
  { id: 'skills', title: 'Skills & Experience', icon: Briefcase },
  { id: 'address', title: 'Service Address', icon: MapPin },
  { id: 'kyc', title: 'KYC Verification', icon: FileText },
  { id: 'completed', title: 'All Set!', icon: CheckCircle }
];

const SKILL_OPTIONS = [
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'carpentry', label: 'Carpentry' },
  { value: 'painting', label: 'Painting' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'gardening', label: 'Gardening' },
  { value: 'pest_control', label: 'Pest Control' },
  { value: 'ac_repair', label: 'AC Repair' },
  { value: 'appliance_repair', label: 'Appliance Repair' },
];

export default function WorkerOnboardingPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const { data: profile } = useWorkerProfile();
  const updateProfile = useUpdateWorkerProfile();
  const updateSkills = useUpdateSkills();
  const uploadKYC = useUploadKYC();
  const createAddress = useCreateWorkerAddress();

  // Profile State
  const [profileData, setProfileData] = useState({
    experienceYears: 0,
    bio: '',
    companyName: '',
  });

  // Skills State
  const [selectedSkills, setSelectedSkills] = useState<Array<{ skill: ServiceType; level: 1 | 2 | 3 | 4 }>>([]);
  const [currentSkill, setCurrentSkill] = useState<ServiceType | ''>('');
  const [currentLevel, setCurrentLevel] = useState<1 | 2 | 3 | 4>(1);

  // Address State
  const [addressData, setAddressData] = useState({
    label: 'Work Office',
    addressLine: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    latitude: 0,
    longitude: 0,
  });

  const isAddressSelected = addressData.addressLine !== '';

  const handleAddressSelect = (data: any) => {
    setAddressData(prev => ({
      ...prev,
      addressLine: data.addressLine,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      latitude: data.latitude,
      longitude: data.longitude,
    }));
  };

  // KYC State
  const [kycFiles, setKycFiles] = useState<{
    aadhar?: File;
    pan?: File;
    photo?: File;
  }>({});

  const handleNext = async () => {
    try {
      if (currentStep === 0) {
        // Update Profile
        await updateProfile.mutateAsync({
          experienceYears: Number(profileData.experienceYears),
          bio: profileData.bio,
          companyName: profileData.companyName
        });
        setCurrentStep(1);
      } else if (currentStep === 1) {
        // Update Skills
        if (selectedSkills.length === 0) {
          toast.error("Please add at least one skill");
          return;
        }
        await updateSkills.mutateAsync({ skills: selectedSkills });
        setCurrentStep(2);
      } else if (currentStep === 2) {
        // Save Service Address
        if (!addressData.addressLine || !addressData.city || !addressData.state || !addressData.pincode) {
          toast.error("Please fill in all required address fields");
          return;
        }
        await createAddress.mutateAsync(addressData);
        setCurrentStep(3);
      } else if (currentStep === 3) {
        // Upload KYC
        if (!kycFiles.aadhar || !kycFiles.pan || !kycFiles.photo) {
          toast.error("Please upload all required documents");
          return;
        }

        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = error => reject(error);
        });

        const aadhar = await toBase64(kycFiles.aadhar);
        const pan = await toBase64(kycFiles.pan);
        const photo = await toBase64(kycFiles.photo);

        await uploadKYC.mutateAsync({
          documents: { aadhar, pan, photo }
        });
        setCurrentStep(4);
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinish = () => {
    clearAuthData();
    dispatch(clearUser());
    router.push('/worker/login');
    toast.success('Onboarding complete! Please log in to your account.');
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const addSkill = () => {
    if (!currentSkill) return;
    if (selectedSkills.some(s => s.skill === currentSkill)) {
      toast.error("Skill already added");
      return;
    }
    setSelectedSkills([...selectedSkills, { skill: currentSkill, level: currentLevel }]);
    setCurrentSkill('');
    setCurrentLevel(1);
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter(s => s.skill !== skillToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'aadhar' | 'pan' | 'photo') => {
    if (e.target.files && e.target.files[0]) {
      setKycFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10" />
            <div
              className="absolute left-0 top-1/2 h-0.5 bg-secondary-600 -z-10 transition-all duration-300"
              style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            />

            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-secondary-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'
                      }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${isActive ? 'text-secondary-600' : 'text-gray-400'
                    }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <Card className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {/* Step 0: Profile */}
            {currentStep === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold">Tell us about yourself</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Company Name (Optional)</label>
                    <Input
                      value={profileData.companyName}
                      onChange={(e) => setProfileData({ ...profileData, companyName: e.target.value })}
                      placeholder="e.g. Speed Fix Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <Input
                      type="number"
                      min="0"
                      value={profileData.experienceYears}
                      onChange={(e) => setProfileData({ ...profileData, experienceYears: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-secondary-500 focus:outline-none"
                      placeholder="Brief description of your services..."
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Skills */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold">Add your skills</h2>

                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <Select
                      label="Skill"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value as ServiceType)}
                      options={[
                        { value: '', label: 'Select a skill' },
                        ...SKILL_OPTIONS
                      ]}
                    />
                  </div>
                  <div className="w-32">
                    <Select
                      label="Level"
                      value={String(currentLevel)}
                      onChange={(e) => setCurrentLevel(Number(e.target.value) as 1 | 2 | 3 | 4)}
                      options={[
                        { value: '1', label: 'Beginner' },
                        { value: '2', label: 'Intermediate' },
                        { value: '3', label: 'Advanced' },
                        { value: '4', label: 'Expert' },
                      ]}
                    />
                  </div>
                  <Button onClick={addSkill} disabled={!currentSkill} variant="secondary">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedSkills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <span className="capitalize">{s.skill.replace('_', ' ')} (Lvl {s.level})</span>
                      <button onClick={() => removeSkill(s.skill)} className="text-gray-500 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {selectedSkills.length === 0 && (
                    <p className="text-gray-500 italic">No skills added yet.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Address */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold">Service Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Search Service Location</label>
                    <AddressAutocomplete onSelect={handleAddressSelect} placeholder="Type your area or building name..." />
                    <p className="text-[10px] text-gray-400 mt-1 italic">Type your address or use current location icon</p>
                  </div>

                  <AnimatePresence>
                    {isAddressSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-4 border-t space-y-4 overflow-hidden"
                      >
                        <div>
                          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Verify Details</label>
                          <div className="flex gap-2 mb-4">
                            {['Home', 'Work', 'Other'].map((label) => (
                              <button
                                key={label}
                                type="button"
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${addressData.label === label
                                  ? 'bg-secondary-50 border-secondary-600 text-secondary-700 shadow-sm'
                                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                onClick={() => setAddressData({ ...addressData, label })}
                              >
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <Input
                          label="Full Address"
                          value={addressData.addressLine}
                          onChange={(e) => setAddressData({ ...addressData, addressLine: e.target.value })}
                          placeholder="Street, Building, Area"
                          required
                        />

                        <Input
                          label="Landmark (Building, Area, etc.)"
                          value={addressData.landmark}
                          onChange={(e) => setAddressData({ ...addressData, landmark: e.target.value })}
                          placeholder="Near..."
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="City"
                            value={addressData.city}
                            onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                            placeholder="City"
                            required
                          />
                          <Input
                            label="State"
                            value={addressData.state}
                            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                            placeholder="State"
                            required
                          />
                        </div>

                        <Input
                          label="Pincode"
                          value={addressData.pincode}
                          onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                          placeholder="6-digit Pincode"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Step 3: KYC */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-bold">Verify Identity</h2>
                <p className="text-sm text-gray-500">Upload clear photos of your documents.</p>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'aadhar')} />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-medium">Aadhar Card</p>
                    {kycFiles.aadhar && <p className="text-green-600 text-sm mt-1">{kycFiles.aadhar.name}</p>}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'pan')} />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-medium">PAN Card</p>
                    {kycFiles.pan && <p className="text-green-600 text-sm mt-1">{kycFiles.pan.name}</p>}

                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, 'photo')} />
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-medium">Profile Photo</p>
                    {kycFiles.photo && <p className="text-green-600 text-sm mt-1">{kycFiles.photo.name}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Completed */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
                <p className="text-gray-600 mb-8">
                  Your professional profile and documents have been submitted for verification.
                  Please log in again to access your updated profile.
                </p>
                <Button onClick={handleFinish} size="lg" className="w-full md:w-auto bg-secondary-600 hover:bg-secondary-700">
                  Go to Login
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={updateProfile.isPending || updateSkills.isPending || createAddress.isPending || uploadKYC.isPending} variant="secondary">
                {updateProfile.isPending || updateSkills.isPending || createAddress.isPending || uploadKYC.isPending ? (
                  <>Processing <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                ) : (
                  <>
                    {currentStep === 3 ? 'Submit Application' : 'Next'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
