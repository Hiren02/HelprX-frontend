'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
    User, Mail, Phone, MapPin, Briefcase, Star,
    Edit, Save, X, Loader2, Camera, Plus, Trash2,
    Globe, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    useWorkerProfile,
    useUpdateWorkerProfile,
    useUpdateProfileImage,
    useUpdateSkills,
    useWorkerAddresses,
    useCreateWorkerAddress,
    useUpdateWorkerAddress
} from '@/lib/hooks/useWorker';
import { ServiceType } from '@/types/worker';
import { useForm } from 'react-hook-form';
import { AddressAutocomplete } from '@/components/location/AddressAutocomplete';

const SERVICE_TYPES: ServiceType[] = [
    'plumbing', 'electrical', 'tutoring', 'carpentry', 'painting',
    'cleaning', 'pet_care', 'handyman', 'ac_repair', 'appliance_repair',
    'pest_control', 'gardening', 'other'
];

export default function WorkerProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [showSkillsModal, setShowSkillsModal] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data: profile, isLoading } = useWorkerProfile();
    const { data: addresses, isLoading: isLoadingAddresses } = useWorkerAddresses();

    const updateProfile = useUpdateWorkerProfile();
    const updateImage = useUpdateProfileImage();
    const updateSkills = useUpdateSkills();
    const createAddress = useCreateWorkerAddress();
    const updateWorkerAddress = useUpdateWorkerAddress();

    const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            companyName: '',
            bio: '',
            experienceYears: 0,
        }
    });

    const { register: registerAddress, handleSubmit: handleSubmitAddress, reset: resetAddress, getValues: getValuesAddress, watch: watchAddress } = useForm({
        defaultValues: {
            label: '',
            addressLine: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            latitude: 0,
            longitude: 0
        }
    });

    // Skills state for modal
    const [tempSkills, setTempSkills] = useState<{ skill: ServiceType; level: number }[]>([]);

    useEffect(() => {
        if (profile?.data) {
            reset({
                name: profile.data.name,
                companyName: profile.data.companyName || '',
                bio: profile.data.bio || '',
                experienceYears: profile.data.experienceYears || 0,
            });
            setTempSkills(profile.data.skills.map((s: any) => ({ skill: s.skill, level: s.level })));
        }
    }, [profile, reset]);

    const onProfileSubmit = (data: any) => {
        updateProfile.mutate(data, {
            onSuccess: () => {
                setIsEditing(false);
            }
        });
    };

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateImage.mutate(file);
        }
    };

    const handleAddSkill = () => {
        setTempSkills([...tempSkills, { skill: 'other', level: 1 }]);
    };

    const handleRemoveSkill = (index: number) => {
        setTempSkills(tempSkills.filter((_, i) => i !== index));
    };

    const handleSkillChange = (index: number, field: 'skill' | 'level', value: any) => {
        const newSkills = [...tempSkills];
        (newSkills[index] as any)[field] = value;
        setTempSkills(newSkills);
    };

    const onSaveSkills = () => {
        updateSkills.mutate({ skills: tempSkills as any }, {
            onSuccess: () => setShowSkillsModal(false)
        });
    };

    const onAddOrUpdateAddress = (data: any) => {
        if (editingAddressId) {
            updateWorkerAddress.mutate({ id: editingAddressId, data }, {
                onSuccess: () => {
                    setShowAddressModal(false);
                    setEditingAddressId(null);
                    resetAddress();
                }
            });
        } else {
            createAddress.mutate(data, {
                onSuccess: () => {
                    setShowAddressModal(false);
                    resetAddress();
                }
            });
        }
    };

    const openEditAddress = (addr: any) => {
        setEditingAddressId(addr.id);
        resetAddress({
            label: addr.label,
            addressLine: addr.addressLine,
            landmark: addr.landmark || '',
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            latitude: addr.latitude,
            longitude: addr.longitude
        });
        setShowAddressModal(true);
    };

    const openAddAddress = () => {
        setEditingAddressId(null);
        resetAddress({
            label: '',
            addressLine: '',
            landmark: '',
            city: '',
            state: '',
            pincode: '',
            latitude: 0,
            longitude: 0
        });
        setShowAddressModal(true);
    };

    const handleAddressSelect = (data: any) => {
        resetAddress({
            ...getValuesAddress(),
            addressLine: data.addressLine,
            landmark: data.landmark,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            latitude: data.latitude,
            longitude: data.longitude
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-secondary-600" />
            </div>
        );
    }

    const worker = profile?.data;

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="container mx-auto px-4 py-8 max-w-4xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                    {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="secondary-outline" className="shadow-sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Basic Info
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit(onProfileSubmit)} disabled={updateProfile.isPending}>
                                {updateProfile.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Card className="p-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                {/* Profile Image with Upload */}
                                <div className="relative group">
                                    <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-600 overflow-hidden border-4 border-white shadow-md">
                                        {worker?.profileImage ? (
                                            <img src={worker.profileImage} alt={worker.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-12 h-12" />
                                        )}
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                    >
                                        <Camera className="w-6 h-6" />
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={onImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    {updateImage.isPending && (
                                        <div className="absolute inset-0 bg-white/60 rounded-full flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-secondary-600" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    {isEditing ? (
                                        <div className="space-y-4 max-w-md">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Full Name</label>
                                                <Input {...register('name')} placeholder="Name" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Company Name</label>
                                                <Input {...register('companyName')} placeholder="Company Name (Optional)" />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">Experience (Years)</label>
                                                <Input type="number" {...register('experienceYears')} placeholder="Years of Experience" />
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <h2 className="text-2xl font-bold text-gray-900">{worker?.name}</h2>
                                            {worker?.companyName && (
                                                <p className="text-gray-600 font-medium flex items-center justify-center sm:justify-start gap-2 mt-1">
                                                    <Briefcase className="w-4 h-4 text-gray-400" />
                                                    {worker.companyName}
                                                </p>
                                            )}
                                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                                                <Badge variant={worker?.kycStatus === 'verified' ? 'success' : 'warning'} className="px-3 py-1">
                                                    {worker?.kycStatus === 'verified' && <ShieldCheck className="w-3 h-3 mr-1" />}
                                                    KYC: {worker?.kycStatus}
                                                </Badge>
                                                <Badge variant="secondary" className="px-3 py-1">
                                                    {worker?.experienceYears} Years Experience
                                                </Badge>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 border-t pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <User className="w-4 h-4 text-secondary-600" />
                                        About Me
                                    </h3>
                                </div>
                                {isEditing ? (
                                    <textarea
                                        {...register('bio')}
                                        className="w-full border rounded-lg p-3 min-h-[120px] focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 focus:outline-none transition-all"
                                        placeholder="Tell customers about your expertise, background and what makes you the right choice for the job..."
                                    />
                                ) : (
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                        {worker?.bio || "No bio added yet. Tell us about your journey and expertise!"}
                                    </p>
                                )}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-secondary-600" />
                                    Professional Skills
                                </h3>
                                <Button variant="ghost" size="sm" onClick={() => setShowSkillsModal(true)} className="text-secondary-600">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Manage
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {worker?.skills && worker.skills.length > 0 ? (
                                    worker.skills.map((skill: any) => (
                                        <div key={skill.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg hover:border-secondary-200 transition-colors">
                                            <span className="text-sm font-medium capitalize text-gray-700">{skill.skill}</span>
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(4)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-1.5 h-1.5 rounded-full ${i < skill.level ? 'bg-secondary-500' : 'bg-gray-200'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-4 w-full bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                        <p className="text-gray-500 text-sm italic">No skills listed yet. Add your skills to get matched with jobs!</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Address Management */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-secondary-600" />
                                    Service Address
                                </h3>
                                {!isLoadingAddresses && (!addresses?.data || addresses.data.length === 0) && (
                                    <Button variant="secondary-outline" size="sm" onClick={openAddAddress}>
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Address
                                    </Button>
                                )}
                            </div>
                            <div className="space-y-3">
                                {isLoadingAddresses ? (
                                    <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-primary-500" /></div>
                                ) : addresses?.data && addresses.data.length > 0 ? (
                                    addresses.data.map((addr: any) => (
                                        <div key={addr.id} className="flex items-start justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 p-2 bg-white rounded-lg shadow-sm">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{addr.label}</p>
                                                    <p className="text-sm text-gray-600 mt-0.5">{addr.addressLine}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{addr.city}, {addr.state} - {addr.pincode}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => openEditAddress(addr)} className="text-secondary-600">
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                        <p className="text-gray-500 text-sm">No service address added yet.</p>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Contact & Stats Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Mail className="w-4 h-4 text-secondary-600" />
                                Contact Info
                            </h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4 group">
                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-secondary-50 transition-colors">
                                        <Phone className="w-4 h-4 text-gray-400 group-hover:text-secondary-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone</p>
                                        <p className="text-sm font-medium text-gray-700">{worker?.phone}</p>
                                    </div>
                                </div>
                                {worker?.email && (
                                    <div className="flex items-center gap-4 group">
                                        <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-secondary-50 transition-colors">
                                            <Mail className="w-4 h-4 text-gray-400 group-hover:text-secondary-500" />
                                        </div>
                                        <div className="max-w-[140px] truncate">
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email</p>
                                            <p className="text-sm font-medium text-gray-700 truncate">{worker.email}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-4 group">
                                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-secondary-50 transition-colors">
                                        <Globe className="w-4 h-4 text-gray-400 group-hover:text-secondary-500" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Region</p>
                                        <p className="text-sm font-medium text-gray-700">Mumbai, MS</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 rounded-bl-full -z-0 opacity-50" />
                            <h3 className="font-bold text-gray-900 mb-6 relative z-10">Performance</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-yellow-50 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Avg Rating</span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">{worker?.avgRating || "0.0"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-secondary-50 rounded-lg">
                                            <Briefcase className="w-4 h-4 text-secondary-500" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600">Jobs Resolved</span>
                                    </div>
                                    <span className="text-lg font-bold text-gray-900">{worker?.completedJobs || "0"}</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </motion.div>

            {/* Skills Management Modal */}
            <Modal
                isOpen={showSkillsModal}
                onClose={() => setShowSkillsModal(false)}
                title="Manage Professional Skills"
            >
                <div className="space-y-4 py-2">
                    <p className="text-sm text-gray-500 mb-4">Add or update your expertise levels. This helps us match you with relevant service requests.</p>
                    {tempSkills.map((s, idx) => (
                        <div key={idx} className="flex items-end gap-3 p-3 bg-gray-50 rounded-lg group relative">
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1 block">Service Category</label>
                                <select
                                    value={s.skill}
                                    onChange={(e) => handleSkillChange(idx, 'skill', e.target.value)}
                                    className="w-full bg-white border rounded-md p-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                >
                                    {SERVICE_TYPES.map(type => (
                                        <option key={type} value={type}>{type.replace('_', ' ').toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-24">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-1 block">Level</label>
                                <select
                                    value={s.level}
                                    onChange={(e) => handleSkillChange(idx, 'level', parseInt(e.target.value))}
                                    className="w-full bg-white border rounded-md p-2 text-sm focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                                >
                                    <option value={1}>Beginner</option>
                                    <option value={2}>Intermediate</option>
                                    <option value={3}>Advanced</option>
                                    <option value={4}>Expert</option>
                                </select>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveSkill(idx)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="secondary-outline" className="w-full border-dashed" onClick={handleAddSkill}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Another Skill
                    </Button>
                    <div className="flex gap-3 mt-6">
                        <Button variant="ghost" className="flex-1" onClick={() => setShowSkillsModal(false)}>Cancel</Button>
                        <Button className="flex-1" onClick={onSaveSkills} disabled={updateSkills.isPending}>
                            {updateSkills.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save My Skills"}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={showAddressModal}
                onClose={() => setShowAddressModal(false)}
                title={editingAddressId ? "Edit Service Address" : "Add Service Address"}
            >
                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Search Service Location</label>
                        <AddressAutocomplete onSelect={handleAddressSelect} />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Start typing your area or use current location to auto-fill details</p>
                    </div>

                    <form onSubmit={handleSubmitAddress(onAddOrUpdateAddress)} className="space-y-4">
                        {(watchAddress('latitude') !== 0 || editingAddressId) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="pt-2 border-t space-y-4"
                            >
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Verify Details</label>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Location Label (e.g. Workshop, Home)</label>
                                        <Input {...registerAddress('label', { required: true })} placeholder="Main Workshop" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Full Address</label>
                                        <Input {...registerAddress('addressLine', { required: true })} placeholder="123 Sector, Market Street" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">Landmark (Nearby building / area)</label>
                                        <Input {...registerAddress('landmark')} placeholder="Opposite Central Mall" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">City</label>
                                            <Input {...registerAddress('city', { required: true })} placeholder="Mumbai" />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1 block">Pincode</label>
                                            <Input {...registerAddress('pincode', { required: true })} placeholder="400001" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1 block">State</label>
                                        <Input {...registerAddress('state', { required: true })} placeholder="Maharashtra" />
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="ghost" className="flex-1" onClick={() => setShowAddressModal(false)}>Cancel</Button>
                                    <Button type="submit" variant="secondary" className="flex-1" disabled={createAddress.isPending || updateWorkerAddress.isPending}>
                                        {(createAddress.isPending || updateWorkerAddress.isPending) ? (
                                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        ) : (
                                            editingAddressId ? "Update Address" : "Add Address"
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </form>
                </div>
            </Modal>
        </div>
    );
}
