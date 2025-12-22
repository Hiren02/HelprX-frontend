'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import NextTopLoader from 'nextjs-toploader';
import { WorkerHeader } from '@/components/layout/WorkerHeader';
import { Header } from '@/components/layout/Header';
import { useWorkerProfile } from '@/lib/hooks/useWorker';

export default function WorkerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
  const { data: profile } = useWorkerProfile();
  const pathname = usePathname();
  const publicPaths = ['/worker/login', '/worker/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  useEffect(() => {
    if (isPublicPath) return;

    if (!isAuthenticated) {
      router.push('/worker/login');
    } else if (user && user.role !== 'worker') {
      router.push(`/${user.role}`);
    } else if (profile?.data && profile.data.kycStatus === 'pending' && pathname !== '/worker/onboarding') {
      router.push('/worker/onboarding');
    }
  }, [isAuthenticated, user, router, isPublicPath, profile, pathname]);

  // Optional: specific loading state logic if needed
  if (!isAuthenticated && !isPublicPath) {
    // We might want to show a spinner here while checking auth for protected routes
    // but the effect above handles redirect. 
    // Let's rely on the effect for now or simple loader.
    // return <PageLoader />; 
    // Keeping typical behavior: render children or loader.
    // Re-using existing logic if it was working.
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NextTopLoader color="#7c3aed" showSpinner={false} />
      {pathname === '/worker/onboarding' ? <Header /> : (!isPublicPath && <WorkerHeader />)}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
