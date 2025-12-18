import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="text-xl font-bold">HelprX</span>
            </Link>
            <p className="text-gray-400">
              Your trusted local services platform. Connecting you with skilled professionals for all your home service needs.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">For Customers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/user/register" className="hover:text-white transition-colors">Sign Up</Link></li>
              <li><Link href="/user/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">For Providers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/worker/register" className="hover:text-white transition-colors">Join as Provider</Link></li>
              <li><Link href="/worker/login" className="hover:text-white transition-colors">Provider Login</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Benefits & Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How it Works for Pros</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HelprX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
