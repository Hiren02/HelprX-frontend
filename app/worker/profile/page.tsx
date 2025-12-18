'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/forms/Textarea';
import { Select } from '@/components/forms/Select';
import { User, MapPin, Star, Edit2, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WorkerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock Profile Data
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '9876543210',
    bio: 'Professional plumber with over 8 years of experience in residential and commercial plumbing. Expert in leak repairs, pipe fitting, and installation.',
    skills: ['Plumbing', 'Pipe Fitting', 'Water Heater Repair'],
    experience: '8',
    city: 'Mumbai',
    radius: '15',
    rating: 4.8,
    jobsCompleted: 156,
    verified: true,
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline">
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: Identity Card */}
        <div className="md:col-span-1 space-y-6">
          <Card className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-500 mb-2">{profile.skills[0]} Expert</p>
            
            <div className="flex justify-center gap-2 mb-6">
              {profile.verified && (
                <Badge variant="success" className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" /> Verified
                </Badge>
              )}
              <Badge variant="info" className="flex items-center">
                <Star className="w-3 h-3 mr-1" /> {profile.rating}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t pt-4 text-center">
              <div>
                <p className="font-bold text-lg">{profile.jobsCompleted}</p>
                <p className="text-xs text-gray-500">Jobs Done</p>
              </div>
              <div>
                <p className="font-bold text-lg">{profile.experience} Yrs</p>
                <p className="text-xs text-gray-500">Experience</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">Service Area</h3>
            <div className="flex items-start text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{profile.city}</p>
                <p>Serving within {profile.radius} km radius</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Details Form */}
        <div className="md:col-span-2">
          <Card>
            <h3 className="font-semibold text-lg mb-6">Professional Details</h3>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!isEditing}
                />
                <Input
                  label="Phone Number"
                  value={profile.phone}
                  disabled
                  helperText="Contact support to change phone number"
                />
              </div>

              <Textarea
                label="Bio"
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                rows={4}
              />

              <div className="grid md:grid-cols-2 gap-4">
                 <Select
                  label="Primary Service"
                  options={[
                    { value: 'Plumbing', label: 'Plumbing' },
                    { value: 'Electrical', label: 'Electrical' },
                    { value: 'Cleaning', label: 'Cleaning' },
                  ]}
                  value={profile.skills[0]} // Simplified for verified mock
                  onChange={(e) => setProfile({...profile, skills: [e.target.value, ...profile.skills.slice(1)]})}
                  disabled={!isEditing}
                />
                <Input
                  label="Years of Experience"
                  value={profile.experience}
                  onChange={(e) => setProfile({...profile, experience: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

               <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="City"
                  value={profile.city}
                  onChange={(e) => setProfile({...profile, city: e.target.value})}
                  disabled={!isEditing}
                />
                <Input
                  label="Service Radius (km)"
                  type="number"
                  value={profile.radius}
                  onChange={(e) => setProfile({...profile, radius: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t mt-4">
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} isLoading={isSaving}>
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
