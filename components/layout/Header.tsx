'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">HelprX</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/features" className="text-gray-600 hover:text-gray-900 font-medium">
            Features
          </Link>
          <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900 font-medium">
            How It Works
          </Link>
          <Link href="/services" className="text-gray-600 hover:text-gray-900 font-medium">
            Services
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
            About Us
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/user/login" className="text-gray-600 hover:text-gray-900 font-medium">
            Sign In
          </Link>
          <Link href="/user/register">
            <Button>Get Started</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg absolute w-full left-0">
          <Link 
            href="/features" 
            className="block text-gray-600 hover:text-primary-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            href="/how-it-works" 
            className="block text-gray-600 hover:text-primary-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            href="/services" 
            className="block text-gray-600 hover:text-primary-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="/about" 
            className="block text-gray-600 hover:text-primary-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <hr />
          <Link 
            href="/user/login" 
            className="block text-gray-600 hover:text-primary-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link 
            href="/user/register" 
            className="block w-full"
            onClick={() => setIsMenuOpen(false)}
          >
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
