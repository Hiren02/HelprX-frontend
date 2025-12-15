'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Plus, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/store';

export default function UserDashboardPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">HelprX</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {user?.name}</span>
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your service requests and bookings</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link href="/user/search">
            <Card hover className="cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">New Service Request</h3>
                  <p className="text-gray-600 text-sm">Find a service provider</p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/user/profile">
            <Card hover className="cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Manage Addresses</h3>
                  <p className="text-gray-600 text-sm">Add or edit your addresses</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Recent Jobs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Jobs</h2>
          <Card>
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No recent jobs</p>
              <Link href="/user/search">
                <Button>Create Your First Request</Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Total Jobs</p>
              <p className="text-3xl font-bold text-gray-900">0</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Completed</p>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Active</p>
              <p className="text-3xl font-bold text-blue-600">0</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
