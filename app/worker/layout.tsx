'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { PageLoader } from '@/components/feedback/Loader';
import { RootState } from '@/store';

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const pathname = usePathname();
  const publicPaths = ['/worker/login', '/worker/register', '/worker']; // /worker landing page might be public? No, dashboard.
  // Actually /worker is dashboard. Login is public. Register is public.
  const isPublicPath = ['/worker/login', '/worker/register'].some(path => pathname.startsWith(path));

  useEffect(() => {
    if (isPublicPath) return;

    if (!isAuthenticated) {
      router.push('/worker/login');
    } else if (user && user.role !== 'worker') {
      router.push(`/${user.role}`);
    }
  }, [isAuthenticated, user, router, isPublicPath]);

  if (!isAuthenticated && !isPublicPath) {
    return <PageLoader />;
  }

  return <>{children}</>;
}
