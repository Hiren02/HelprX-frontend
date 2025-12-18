'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Plus, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { RootState } from '@/store';
import { useJobs } from '@/lib/hooks/useJobs';
import { formatCurrency } from '@/lib/utils/currency';
import { FormattedDate } from '@/components/common/FormattedDate';
import { Badge } from '@/components/ui/Badge';

export default function UserDashboardPage() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { jobs, isLoading } = useJobs();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
  };

  // Calculate stats
  const totalJobs = jobs.length;
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const activeJobs = jobs.filter(job => ['pending', 'assigned', 'in_progress'].includes(job.status)).length;

  // Get recent 5 jobs
  const recentJobs = [...jobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      case 'in_progress': return 'info';
      default: return 'warning';
    }
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Jobs</h2>
            {jobs.length > 0 && (
              <Link href="/user/jobs">
                <Button variant="ghost">View All</Button>
              </Link>
            )}
          </div>
          
          <Card>
            {isLoading ? (
              <div className="text-center py-12">Loading jobs...</div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No recent jobs</p>
                <Link href="/user/search">
                  <Button>Create Your First Request</Button>
                </Link>
              </div>
            ) : (
               <div className="divide-y">
                 {recentJobs.map((job) => (
                   <div key={job.id} className="py-4 first:pt-0 last:pb-0">
                     <div className="flex items-center justify-between">
                       <div className="flex items-start space-x-4">
                         <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                           <Calendar className="w-5 h-5 text-gray-500" />
                         </div>
                         <div>
                           <h4 className="font-medium text-gray-900">{job.title}</h4>
                           <p className="text-sm text-gray-500">
                             <FormattedDate date={job.createdAt} />
                           </p>
                         </div>
                       </div>
                       <div className="flex items-center space-x-4">
                         <Badge variant={getStatusBadgeVariant(job.status)}>
                           {job.status.replace('_', ' ').toUpperCase()}
                         </Badge>
                         <p className="font-medium text-gray-900">
                           {formatCurrency(job.priceEstimate || 0)}
                         </p>
                         <Link href={`/user/jobs/${job.id}`}>
                           <Button variant="ghost" size="sm">
                             <ChevronRight className="w-4 h-4" />
                           </Button>
                         </Link>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </Card>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Total Jobs</p>
              <p className="text-3xl font-bold text-gray-900">{totalJobs}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedJobs}</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-gray-600 mb-2">Active</p>
              <p className="text-3xl font-bold text-blue-600">{activeJobs}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
