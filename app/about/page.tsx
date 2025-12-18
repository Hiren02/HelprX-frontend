import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, Heart, Shield, Globe } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <div className="bg-white">
        {/* Hero Section */}
      <section className="relative py-20 bg-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Empowering Local Services</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-primary-100 mb-8">
            Connecting skilled professionals with neighbors who need help, building stronger communities one task at a time.
          </p>
        </div>
      </section>

      {/* Mission & Story */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At HelprX, we believe that finding reliable help shouldn&apos;t be a hassle. We&apos;re on a mission to revolutionize the local service industry by creating a platform that prioritizes trust, transparency, and fair opportunities for everyone.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2024, we started with a simple idea: what if you could book a trusted plumber or cleaner as easily as ordering a pizza? Today, we serve thousands of households and empower hundreds of independent professionals to grow their businesses.
            </p>
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            {/* Placeholder for About Image - In real app use local asset or optimized next/image */}
             <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                <Users size={64} />
                <span className="ml-4 text-xl">Team Photo Placeholder</span>
             </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every interaction we have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-gray-600">
                We&apos;re building more than just an app; we&apos;re building a community of neighbors helping neighbors.
              </p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                Your peace of mind is our top priority. We verify every professional and insure every job.
              </p>
            </Card>

            <Card hover className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We support local economies and encourage eco-friendly practices in home services.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join the HelprX Revolution</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you need help or want to offer your skills, there&apos;s a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/user/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Find Help
              </Button>
            </Link>
            <Link href="/worker/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Become a Pro
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
}
