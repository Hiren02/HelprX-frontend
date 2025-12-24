'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Shield, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { clearUser } from '@/store/authSlice';
import { useWorkerProfile } from '@/lib/hooks/useWorker';
import toast from 'react-hot-toast';

export function WorkerHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const { data: workerProfile } = useWorkerProfile();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/worker/login');
    toast.success('Logged out successfully');
  };

  const navLinks = [
    { href: '/worker', label: 'Dashboard' },
    { href: '/worker/jobs', label: 'Job Inbox' },
    { href: '/worker/wallet', label: 'Wallet' },
    { href: '/worker/profile', label: 'Profile' },
  ];

  const profileImage = workerProfile?.data?.profileImage || user?.profileImage;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 h-16"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent hidden sm:block">
              HelprX Worker
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                    ? 'bg-purple-50 text-purple-700'
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
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/worker/profile" className="hidden sm:flex items-center gap-2 hover:bg-gray-50 px-2 py-1 rounded-full transition-colors group">
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">
                  {user.name?.split(' ')[0] || 'Worker'}
                </span>
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold border border-purple-200 group-hover:bg-purple-200 transition-colors overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name?.[0]?.toUpperCase() || 'W'
                  )}
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

              <Link href="/worker/profile" className="md:hidden">
                <div className={`w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold border border-purple-200 overflow-hidden`}>
                  {profileImage ? (
                    <img src={profileImage} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name?.[0]?.toUpperCase() || 'W'
                  )}
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/worker/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/worker/register">
                <Button variant="secondary">Join as Pro</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
