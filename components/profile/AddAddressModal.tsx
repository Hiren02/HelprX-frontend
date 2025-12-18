import { useState } from 'react';
import { useAddresses } from '@/lib/hooks/useAddresses';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAddressModal({ isOpen, onClose }: AddAddressModalProps) {
  const { createAddressAsync } = useAddresses();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    label: 'Home',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    latitude: 19.07600000,
    longitude: 72.87770000,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.addressLine || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      await createAddressAsync(formData);
      // Success toast handled by mutation
      onClose();
      // Reset form
      setFormData({
        label: 'Home',
        addressLine: '',
        city: '',
        state: '',
        pincode: '',
        latitude: 19.07600000,
        longitude: 72.87770000,
      });
    } catch (error) {
      console.error(error);
      // Error toast handled by mutation
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Address">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <div className="flex gap-2">
            {['Home', 'Work', 'Other'].map((label) => (
              <button
                key={label}
                type="button"
                className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
                  formData.label === label
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
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
          label="Street Address"
          placeholder="123 Main St, Apt 4B"
          value={formData.addressLine}
          onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
          required
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
        
        <div className="bg-blue-50 p-3 rounded-md flex items-start gap-2 text-sm text-blue-700">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Map selection is currently unavailable. Coordinates will be set to default. You can update specific location details later.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t mt-4">
          <Button variant="outline" type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Address'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
