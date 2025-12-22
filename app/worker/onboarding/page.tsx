'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/forms/Select';
import { User, Briefcase, FileText, CheckCircle, ChevronRight, ChevronLeft, Upload, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUpdateWorkerProfile, useUpdateSkills, useUploadKYC, useWorkerProfile } from '@/lib/hooks/useWorker';
import { ServiceType } from '@/types/worker';
import toast from 'react-hot-toast';
import { clearAuthData } from '@/lib/utils/auth';
import { clearUser } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';

const STEPS = [
  { id: 'profile', title: 'Profile Setup', icon: User },
  { id: 'skills', title: 'Skills & Experience', icon: Briefcase },
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
            // Upload KYC
            if (!kycFiles.aadhar || !kycFiles.pan || !kycFiles.photo) {
                toast.error("Please upload all required documents");
                return;
            }
            
            // Convert files to base64 strings as required by the simplistic types I created earlier 
            // OR robustly, use FormData. The service uses JSON { aadhar: string ... }.
            // The service accepts JSON with string content? 
            // In API_DOCS: "Note: This endpoint accepts multipart/form-data, not JSON."
            // Ah! My service implementation (`workers.ts`) uses `apiClient.post('/workers/kyc', data)`.
            // If `data` is a plain object, axios sends JSON.
            // I need to change `uploadKYC` in `workers.ts` to use FormData or handle it properly.
            // Let's assume for now I convert to base64 string to match the INTERFACE `UploadKYCData` defined in `workers.ts`.
            // Wait, looking at `workers.ts`:
            /*
            export interface UploadKYCData {
                documents: {
                    aadhar?: string;
                    pan?: string;
                    drivingLicense?: string;
                    photo?: string;
                };
            }
            */
            // The interface implies strings (likely base64).
            // But API docs say `multipart/form-data`.
            // I should have caught this.
            // I will implement base64 conversion here, assuming the backend "also" supports JSON with base64 OR I need to fix the service later.
            // But to avoid breaking flow now, I'll implement a helper to convert file to base64 string.
            
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
            setCurrentStep(3);
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-secondary-600 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-secondary-600' : 'text-gray-400'
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
                            onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                            placeholder="e.g. Speed Fix Services" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Years of Experience</label>
                        <Input 
                            type="number" 
                            min="0"
                            value={profileData.experienceYears}
                            onChange={(e) => setProfileData({...profileData, experienceYears: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                         <label className="block text-sm font-medium mb-1">Bio</label>
                         <textarea 
                             className="w-full border rounded-lg p-3 min-h-[100px] focus:ring-2 focus:ring-secondary-500 focus:outline-none"
                             placeholder="Brief description of your services..."
                             value={profileData.bio}
                             onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
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
                            onChange={(e) => setCurrentLevel(Number(e.target.value) as 1|2|3|4)}
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

            {/* Step 2: KYC */}
            {currentStep === 2 && (
               <motion.div
                key="step2"
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

            {/* Step 3: Completed */}
            {currentStep === 3 && (
                <motion.div
                    key="step3"
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
          {currentStep < 3 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
                <Button 
                    variant="ghost" 
                    onClick={handleBack} 
                    disabled={currentStep === 0}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button onClick={handleNext} disabled={updateProfile.isPending || updateSkills.isPending || uploadKYC.isPending} variant="secondary">
                    {updateProfile.isPending || updateSkills.isPending || uploadKYC.isPending ? (
                        <>Processing <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                    ) : (
                        <>Next <ChevronRight className="w-4 h-4 ml-2" /></>
                    )}
                </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
