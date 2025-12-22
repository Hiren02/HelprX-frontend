'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { clearUser } from '@/store/authSlice';
import { useWorkerProfile } from '@/lib/hooks/useWorker';
import toast from 'react-hot-toast';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const isWorkerPath = pathname.startsWith('/worker');

  // Only fetch worker profile if they are a worker to avoid unnecessary calls for regular users
  const { data: workerProfile } = useWorkerProfile();
  const kycStatus = user?.role === 'worker' ? workerProfile?.data?.kycStatus : null;
  const isPendingWorker = user?.role === 'worker' && kycStatus === 'pending';

  // Don't show back button on the main dashboard
  const isDashboard = pathname === '/user' || pathname === '/worker';

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/');
    toast.success('Logged out successfully');
  };

  const navLinks = user?.role === 'worker'
    ? [
      { href: '/worker', label: 'Dashboard' },
      { href: '/worker/jobs', label: 'Job Inbox' },
      { href: '/worker/wallet', label: 'Wallet' },
      { href: '/worker/profile', label: 'Profile' },
    ]
    : [
      { href: '/user', label: 'Dashboard' },
      { href: '/user/search', label: 'Find Service' },
      { href: '/user/jobs', label: 'My Jobs' },
      { href: '/user/profile', label: 'Profile' },
    ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 h-16"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isDashboard && (
            <Button
              variant="ghost"
              size="sm"
              className="-ml-2 mr-1 text-gray-500 hover:text-gray-900 md:hidden"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          )}

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className={`w-8 h-8 ${isWorkerPath ? 'bg-secondary-600' : 'bg-primary-600'} rounded-lg flex items-center justify-center`}>
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r ${isWorkerPath ? 'from-secondary-600 to-secondary-800' : 'from-primary-600 to-primary-800'} bg-clip-text text-transparent hidden sm:block`}>
              {isWorkerPath ? 'HelprX Worker' : 'HelprX'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-8">
            {pathname !== '/worker/onboarding' && !isPendingWorker && navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? (isWorkerPath ? 'bg-secondary-50 text-secondary-700' : 'bg-primary-50 text-primary-700')
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Side Actions */}
        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {user && pathname !== '/worker/onboarding' && !isPendingWorker ? (
            <>
              <Link href="/user/profile" className="hidden sm:flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors group">
                <span className={`text-sm font-medium text-gray-700 ${isWorkerPath ? 'group-hover:text-secondary-700' : 'group-hover:text-primary-700'} transition-colors`}>
                  {user.name?.split(' ')[0] || (isWorkerPath ? 'Worker' : 'User')}
                </span>
                <div className={`w-8 h-8 ${isWorkerPath ? 'bg-secondary-100 text-secondary-600 border-secondary-200 group-hover:bg-secondary-200' : 'bg-primary-100 text-primary-600 border-primary-200 group-hover:bg-primary-200'} rounded-full flex items-center justify-center font-bold border transition-colors`}>
                  {user.name?.[0]?.toUpperCase() || (isWorkerPath ? 'W' : 'U')}
                </div>
              </Link>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>

              <Link href={isWorkerPath ? "/worker/profile" : "/user/profile"} className="md:hidden">
                <div className={`w-8 h-8 ${isWorkerPath ? 'bg-secondary-100 text-secondary-600 border-secondary-200' : 'bg-primary-100 text-primary-600 border-primary-200'} rounded-full flex items-center justify-center font-bold border`}>
                  {user.name?.[0]?.toUpperCase() || (isWorkerPath ? 'W' : 'U')}
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {isPendingWorker ? (
                <Link href="/worker/onboarding">
                  <Button variant="secondary">Continue Onboarding</Button>
                </Link>
              ) : (
                <>
                  <Link href={isWorkerPath ? "/worker/login" : "/user/login"}>
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href={isWorkerPath ? "/worker/register" : "/user/register"}>
                    <Button variant={isWorkerPath ? 'secondary' : 'primary'}>
                      {isWorkerPath ? 'Join as Pro' : 'Get Started'}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
