'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 -left-20 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-secondary-100 rounded-full blur-3xl opacity-60" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative inline-block">
             <span className="text-[12rem] font-black text-gray-100 select-none">404</span>
             <motion.div 
                animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute inset-0 flex items-center justify-center"
             >
                <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center">
                    <Search className="w-16 h-16 text-primary-500 mb-2" />
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <span className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>
             </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
                onClick={() => window.history.back()}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto px-8 h-14 rounded-2xl border-2 hover:bg-gray-50 flex items-center gap-2 font-bold"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </Button>
            
            <Link href="/" className="w-full sm:w-auto">
              <Button 
                  size="lg"
                  className="w-full h-14 px-8 rounded-2xl bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 font-bold shadow-xl shadow-gray-200 transition-all hover:scale-105"
              >
                <Home className="w-5 h-5" />
                Return Home
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
        >
            <div className="text-sm font-semibold text-gray-400">#Reliable</div>
            <div className="text-sm font-semibold text-gray-400">#Fast</div>
            <div className="text-sm font-semibold text-gray-400">#Premium</div>
            <div className="text-sm font-semibold text-gray-400">#Trustworthy</div>
        </motion.div>
      </div>
    </div>
  );
}
