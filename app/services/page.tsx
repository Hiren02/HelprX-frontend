import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Wrench, Zap, BookOpen, Hammer, Palette, Sparkles, Dog, Home } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ServicesPage() {
  const categories = [
    { name: 'Plumbing', icon: BookOpen, desc: 'Leak repairs, pipe installation, drainage solutions.' },
    { name: 'Electrical', icon: Zap, desc: 'Wiring, appliance repair, fan installation.' },
    { name: 'Cleaning', icon: Palette, desc: 'Deep home cleaning, sofa cleaning, pest control.' },
    { name: 'Carpentry', icon: Hammer, desc: 'Furniture assembly, repairs, custom woodwork.' },
    { name: 'Moving', icon: Sparkles, desc: 'House shifting, furniture moving, packing services.' },
    { name: 'Appliance Repair', icon: Wrench, desc: 'AC repair, washing machine, refrigerator service.' },
    { name: 'Pet Care', icon: Dog, desc: 'Dog walking, pet grooming, sitting.' },
    { name: 'Beauty', icon: Home, desc: 'At-home salon, haircut, massage therapy.' },
  ];

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-12">
            Whatever you need done, we have a trusted professional ready to help.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link href={`/user/search?service=${cat.name.toLowerCase()}`} key={i} className="group">
                <Card hover className="h-full flex flex-col items-center text-center p-6 group-hover:border-primary-500 transition-all duration-300">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary-50 transition-colors">
                    <cat.icon className="w-8 h-8 text-gray-700 group-hover:text-primary-600 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow">{cat.desc}</p>
                  <span className="text-primary-600 font-medium text-sm group-hover:underline">Book Now</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <section className="py-20 bg-gray-50 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
            <p className="text-gray-600 mb-8">We are constantly adding new services and professionals.</p>
            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
