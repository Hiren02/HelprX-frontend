'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/authSlice';
import { User, MapPin, Settings, LogOut, Plus, Trash2, Home, Briefcase } from 'lucide-react';
import { RootState } from '@/store';
import toast from 'react-hot-toast';
import { useAddresses } from '@/lib/hooks/useAddresses';
import { AddAddressModal } from '@/components/profile/AddAddressModal';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { addresses, isLoading: loadingAddresses, deleteAddress } = useAddresses();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleLogout = () => {
    dispatch(clearUser());
    toast.success('Logged out successfully');
    router.push('/');
  };

  const handleSaveProfile = () => {
    // TODO: Implement profile update API call
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      deleteAddress(id);
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home': return <Home className="w-4 h-4" />;
      case 'work': return <Briefcase className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <Button variant="ghost" onClick={() => router.push('/user')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'addresses'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Addresses
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-primary-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Settings
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              {!isEditing ? (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <div className="space-x-2">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
              />
              <Input
                label="Phone Number"
                value={formData.phone}
                disabled
                helperText="Phone number cannot be changed"
              />
              <Input
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Account Statistics</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">0</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">0</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <Button onClick={() => setIsAddAddressOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>
              
              {loadingAddresses ? (
                <div className="text-center py-12">
                  <p>Loading addresses...</p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No saved addresses yet</p>
                  <Button variant="outline" onClick={() => setIsAddAddressOpen(true)}>
                    Add Your First Address
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4 flex justify-between items-start hover:bg-gray-50 transition-colors">
                        <div className="flex gap-3">
                           <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                             {getLabelIcon(address.label)}
                           </div>
                           <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-gray-900">{address.label}</h4>
                                {address.isDefault && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>
                                )}
                              </div>
                              <p className="text-gray-600 mt-1">{address.addressLine}</p>
                              <p className="text-gray-500 text-sm">
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                           </div>
                        </div>
                        <div className="flex gap-2">
                           {/* Add Edit/Set Default buttons later */}
                           <Button 
                             variant="ghost" 
                             size="sm" 
                             className="text-red-500 hover:text-red-700 hover:bg-red-50"
                             onClick={() => handleDeleteAddress(address.id)}
                           >
                              <Trash2 className="w-4 h-4" />
                           </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <Card>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-gray-600">Manage your notification preferences</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-600">Update your password</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Privacy</p>
                    <p className="text-sm text-gray-600">Manage your privacy settings</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="pt-4">
                  <Button variant="danger" onClick={handleLogout} className="w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="danger" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <AddAddressModal 
        isOpen={isAddAddressOpen} 
        onClose={() => setIsAddAddressOpen(false)} 
      />
    </div>
  );
}
