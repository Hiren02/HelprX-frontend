'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { PageLoader } from '@/components/feedback/Loader';
import { RootState } from '@/store';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/user/login');
    } else if (user && user.role !== 'user') {
      // If logged in but not a user, redirect to appropriate dashboard
      router.push(`/${user.role}`);
    }
  }, [isAuthenticated, user, router]);

//   if (!isAuthenticated) {
//     return <PageLoader />;
//   }

  return <>{children}</>;
}
