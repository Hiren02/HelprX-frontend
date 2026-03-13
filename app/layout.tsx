import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { ReactQueryProvider } from '@/components/providers/ReactQueryProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';
import NextTopLoader from 'nextjs-toploader';
import { NotificationProvider } from '@/components/providers/NotificationProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'HelprX - Local Services Platform',
  description: 'Find reliable local service providers - Plumbers, Electricians, Tutors, and more',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ReduxProvider>
          <ReactQueryProvider>
            <NextTopLoader
              color="#7c3aed"
              showSpinner={false}
              shadow="0 0 10px #7c3aed,0 0 5px #7c3aed"
            />
            <NotificationProvider>
              {children}
            </NotificationProvider>
            <ToastProvider />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
