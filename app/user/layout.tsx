'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  const pathname = usePathname();
  const publicPaths = ['/user/login', '/user/register', '/user/search'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  useEffect(() => {
    if (isPublicPath) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      router.push('/user/login');
    } else if (user && user.role !== 'user') {
      // If logged in but not a user, redirect to appropriate dashboard
      router.push(`/${user.role}`);
    }
  }, [isAuthenticated, user, router, isPublicPath]);

  // Only show loader for protected routes
  //   if (!isAuthenticated && !isPublicPath) {
  //     return <PageLoader />;
  //   }

  return <>{children}</>;
}
