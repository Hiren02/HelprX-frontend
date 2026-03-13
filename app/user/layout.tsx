'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

import { Header } from '@/components/layout/Header';

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

  return (
    <>

      {/* Show header on user pages mostly, maybe conditionally hide on login/register if needed, 
          but usually layout wraps content. For now assuming we want it everywhere in /user.
          Except maybe login/register which might have their own layout or be part of this.
          Wait, /user/login is a public path but still under /user layout? 
          Let's check if we should show header on login. Usually no.
      */}
      {!pathname.includes('/login') && !pathname.includes('/register') && <Header />}

      {children}
    </>
  );
}
