'use client';

import { useState, useEffect } from 'react';
import { useAddresses } from '@/lib/hooks/useAddresses';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { AddressAutocomplete } from '@/components/location/AddressAutocomplete';
import { motion, AnimatePresence } from 'framer-motion';
import { Address } from '@/types/user';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Address | null;
}

export function AddressModal({ isOpen, onClose, initialData }: AddressModalProps) {
    const { createAddressAsync, updateAddress } = useAddresses();
    const [loading, setLoading] = useState(false);

    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        label: 'Home',
        addressLine: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                label: initialData.label || 'Home',
                addressLine: initialData.addressLine || '',
                landmark: initialData.landmark || '',
                city: initialData.city || '',
                state: initialData.state || '',
                pincode: initialData.pincode || '',
                latitude: initialData.latitude || 0,
                longitude: initialData.longitude || 0,
            });
        } else {
            setFormData({
                label: 'Home',
                addressLine: '',
                landmark: '',
                city: '',
                state: '',
                pincode: '',
                latitude: 0,
                longitude: 0,
            });
        }
    }, [initialData, isOpen]);

    const isAddressSelected = formData.addressLine !== '';

    const handleAddressSelect = (data: any) => {
        setFormData(prev => ({
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.addressLine || !formData.city || !formData.state || !formData.pincode) {
            toast.error('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            if (isEditMode && initialData) {
                await updateAddress({ id: initialData.id, data: formData });
            } else {
                await createAddressAsync(formData);
            }
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Address" : "Add New Address"}>
            <div className="space-y-6">
                {!isEditMode && (
                    <div>
                        <label className="text-sm font-medium mb-1.5 block">Search Service Location</label>
                        <AddressAutocomplete onSelect={handleAddressSelect} />
                        <p className="text-[10px] text-gray-400 mt-1 italic">Type your address or use current location icon</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <AnimatePresence initial={false}>
                        {(isAddressSelected || isEditMode) && (
                            <motion.div
                                initial={isEditMode ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`${!isEditMode ? 'pt-4 border-t' : ''} space-y-4 overflow-hidden`}
                            >
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block">Address Details</label>
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        {['Home', 'Work', 'Other'].map((label) => (
                                            <button
                                                key={label}
                                                type="button"
                                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${formData.label === label
                                                    ? 'bg-primary-50 border-primary-600 text-primary-700 shadow-sm'
                                                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                onClick={() => setFormData({ ...formData, label })}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Input
                                    label="Full Address"
                                    placeholder="The full search result will appear here"
                                    value={formData.addressLine}
                                    onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                                    required
                                />

                                <Input
                                    label="Landmark (Building, Area, etc.)"
                                    placeholder="e.g. Near Venus Atlantis"
                                    value={formData.landmark}
                                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        label="City"
                                        placeholder="New York"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                    <Input
                                        label="State"
                                        placeholder="NY"
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        required
                                    />
                                </div>

                                <Input
                                    label="Pincode / Zip Code"
                                    placeholder="10001"
                                    value={formData.pincode}
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                    required
                                />

                                <div className="flex items-center justify-end gap-3 pt-6 border-t mt-6">
                                    <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading} className="min-w-[120px]">
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : isEditMode ? 'Update Address' : 'Save Address'}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </Modal>
    );
}
