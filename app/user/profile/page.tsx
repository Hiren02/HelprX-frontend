'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/authSlice';
import { User, MapPin, Settings, LogOut, Plus, Trash2, Home, Briefcase, Bell, Shield, Key } from 'lucide-react';
import { RootState } from '@/store';
import toast from 'react-hot-toast';
import { useAddresses } from '@/lib/hooks/useAddresses';
import { AddressModal } from '@/components/profile/AddressModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Address } from '@/types/user';
import { Edit2, Check } from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state: RootState) => state.auth);
    const { addresses, isLoading: loadingAddresses, deleteAddress, setDefaultAddress } = useAddresses();

    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'settings'>('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
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

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setIsAddressModalOpen(true);
    };

    const handleSetDefault = (id: string) => {
        setDefaultAddress(id);
    };

    const getLabelIcon = (label: string) => {
        switch (label.toLowerCase()) {
            case 'home': return <Home className="w-4 h-4" />;
            case 'work': return <Briefcase className="w-4 h-4" />;
            default: return <MapPin className="w-4 h-4" />;
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'addresses', label: 'Addresses', icon: MapPin },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Header removed in favor of global layout header */}

            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="w-full md:w-64 flex-shrink-0"
                    >
                        <Card className="p-2 border-gray-100" padding="none">
                            <nav className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as 'profile' | 'addresses' | 'settings')}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                                            <span>{tab.label}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeTabIndicator"
                                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </nav>
                        </Card>

                        {/* Account Summary */}
                        <Card className="mt-4 p-4 border-gray-100 bg-gradient-to-br from-indigo-50 to-white">
                            <div className="text-center">
                                <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wider mb-1">Account Status</p>
                                <p className="text-sm font-medium text-gray-900">Active User</p>
                                <div className="mt-3 text-xs text-gray-500">Member since {new Date().getFullYear()}</div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <Card className="border-gray-100 shadow-sm">
                                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                                                <p className="text-sm text-gray-500 mt-1">Manage your personal details</p>
                                            </div>
                                            {!isEditing ? (
                                                <Button variant="outline" onClick={() => setIsEditing(true)}>
                                                    Edit Profile
                                                </Button>
                                            ) : (
                                                <div className="space-x-2">
                                                    <Button variant="ghost" onClick={() => setIsEditing(false)}>
                                                        Cancel
                                                    </Button>
                                                    <Button onClick={handleSaveProfile} className="bg-primary-600 hover:bg-primary-700 text-white">
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input
                                                label="Full Name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="bg-gray-50/50 focus:bg-white transition-colors"
                                            />
                                            <Input
                                                label="Phone Number"
                                                value={formData.phone}
                                                disabled
                                                helperText="Phone number cannot be changed"
                                                className="bg-gray-100"
                                            />
                                            <div className="md:col-span-2">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    disabled={!isEditing}
                                                    className="bg-gray-50/50 focus:bg-white transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                )}

                                {/* Addresses Tab */}
                                {activeTab === 'addresses' && (
                                    <div className="space-y-4">
                                        <Card className="border-gray-100 shadow-b-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h2 className="text-xl font-bold text-gray-900">Saved Addresses</h2>
                                                    <p className="text-sm text-gray-500 mt-1">Manage delivery locations and service addresses</p>
                                                </div>
                                                <Button onClick={() => { setEditingAddress(null); setIsAddressModalOpen(true); }} className="shadow-lg shadow-primary-500/20">
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add New
                                                </Button>
                                            </div>

                                            {loadingAddresses ? (
                                                <div className="flex justify-center py-12">
                                                    <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"></div>
                                                </div>
                                            ) : addresses.length === 0 ? (
                                                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                                    <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                                                    <h3 className="text-gray-900 font-medium">No saved addresses</h3>
                                                    <p className="text-gray-500 text-sm mb-4">Add frequent locations for faster booking</p>
                                                    <Button variant="outline" size="sm" onClick={() => { setEditingAddress(null); setIsAddressModalOpen(true); }}>
                                                        Add Your First Address
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="grid gap-4">
                                                    {addresses.map((address) => (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            key={address.id}
                                                            className={`group border rounded-xl p-4 flex justify-between items-start transition-all duration-200 bg-white ${address.isDefault ? 'border-primary-200 shadow-sm' : 'border-gray-200 hover:border-primary-200 hover:shadow-md'
                                                                }`}
                                                        >
                                                            <div className="flex gap-4">
                                                                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${address.isDefault ? 'bg-primary-100 text-primary-600' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                                                    }`}>
                                                                    {getLabelIcon(address.label)}
                                                                </div>
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className="font-semibold text-gray-900">{address.label}</h4>
                                                                        {address.isDefault && (
                                                                            <span className="text-[10px] bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Default</span>
                                                                        )}
                                                                    </div>
                                                                    <p className="text-gray-600 mt-1 text-sm leading-relaxed">{address.addressLine}</p>
                                                                    <p className="text-gray-500 text-sm">
                                                                        {address.city}, {address.state} - {address.pincode}
                                                                    </p>
                                                                    {!address.isDefault && (
                                                                        <button
                                                                            onClick={() => handleSetDefault(address.id)}
                                                                            className="text-xs text-primary-600 font-medium mt-2 hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                        >
                                                                            <Check className="w-3 h-3" />
                                                                            Mark as default
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-1">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-gray-400 hover:text-primary-600 hover:bg-primary-50 p-2 h-8 w-8"
                                                                    onClick={() => handleEditAddress(address)}
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 h-8 w-8"
                                                                    onClick={() => handleDeleteAddress(address.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            )}
                                        </Card>
                                    </div>
                                )}

                                {/* Settings Tab */}
                                {activeTab === 'settings' && (
                                    <div className="space-y-6">
                                        <Card className="border-gray-100">
                                            <h2 className="text-xl font-bold mb-6">Account Settings</h2>

                                            <div className="space-y-1">
                                                {[
                                                    { title: 'Notifications', desc: 'Manage your notification preferences', icon: Bell, action: 'Configure' },
                                                    { title: 'Security', desc: 'Update your password and security settings', icon: Key, action: 'Update' },
                                                    { title: 'Privacy', desc: 'Manage your data and privacy settings', icon: Shield, action: 'Manage' }
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors group">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                                                                <item.icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-gray-900">{item.title}</p>
                                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                                            </div>
                                                        </div>
                                                        <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {item.action}
                                                        </Button>
                                                    </div>
                                                ))}

                                                <div className="pt-6 mt-4 border-t px-4">
                                                    <Button variant="ghost" onClick={handleLogout} className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 pl-0">
                                                        <div className="w-10 h-10 flex items-center justify-center">
                                                            <LogOut className="w-5 h-5 mr-3" />
                                                        </div>
                                                        Logout from current session
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card className="border-red-100 bg-red-50/30">
                                            <h2 className="text-lg font-semibold mb-4 text-red-700">Danger Zone</h2>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">Delete Account</p>
                                                    <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                                                </div>
                                                <Button variant="danger" size="sm">
                                                    Delete Data
                                                </Button>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => { setIsAddressModalOpen(false); setEditingAddress(null); }}
                initialData={editingAddress}
            />
        </div>
    );
}
