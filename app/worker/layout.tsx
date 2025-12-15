'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { PageLoader } from '@/components/feedback/Loader';
import { RootState } from '@/store';

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/worker/login');
    } else if (user && user.role !== 'worker') {
      router.push(`/${user.role}`);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
