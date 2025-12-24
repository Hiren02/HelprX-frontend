'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Wrench, Zap, BookOpen, Hammer, Palette, Sparkles, Dog, Home as HomeIcon, ArrowRight, Star } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ServicesPage() {
  const categories = [
    { name: 'Plumbing', icon: BookOpen, desc: 'Leak repairs, pipe installation, and drainage solutions.', color: 'blue' },
    { name: 'Electrical', icon: Zap, desc: 'Wiring, appliance repair, and fan installation.', color: 'orange' },
    { name: 'Cleaning', icon: Sparkles, desc: 'Deep home cleaning, sofa cleaning, and pest control.', color: 'teal' },
    { name: 'Carpentry', icon: Hammer, desc: 'Furniture assembly, repairs, and custom woodwork.', color: 'amber' },
    { name: 'Moving', icon: Palette, desc: 'House shifting, furniture moving, and packing services.', color: 'purple' },
    { name: 'Appliances', icon: Wrench, desc: 'AC repair, washing machine, and refrigerator service.', color: 'red' },
    { name: 'Pet Care', icon: Dog, desc: 'Dog walking, pet grooming, and sitting.', color: 'rose' },
    { name: 'Beauty', icon: HomeIcon, desc: 'At-home salon, haircut, and massage therapy.', color: 'pink' },
  ];

  const getColorStyles = (color: string) => {
    const styles: Record<string, string> = {
      blue: 'bg-blue-50 text-blue-600',
      orange: 'bg-orange-50 text-orange-600',
      teal: 'bg-teal-50 text-teal-600',
      amber: 'bg-amber-50 text-amber-600',
      purple: 'bg-purple-50 text-purple-600',
      red: 'bg-red-50 text-red-600',
      rose: 'bg-rose-50 text-rose-600',
      pink: 'bg-pink-50 text-pink-600',
    };
    return styles[color] || 'bg-gray-50 text-gray-600';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary-50/50 to-white">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary-200 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-6">
                <Star className="w-4 h-4 mr-2 fill-current" />
                Expert Care for Your Home
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Everything you need, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                  Right at your doorstep.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-0">
                Choose from our range of verified home services. We bring quality, convenience, and trust directly to you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {categories.map((cat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Link href={`/user/search?service=${cat.name.toLowerCase()}`} className="group block h-full">
                    <Card hover className="h-full flex flex-col p-8 group-hover:border-primary-500 transition-all duration-300 relative overflow-hidden bg-white shadow-soft">
                      {/* Hover background effect */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 rounded-bl-full translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500" />

                      <div className={`w-14 h-14 ${getColorStyles(cat.color)} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <cat.icon className="w-7 h-7" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {cat.name}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                        {cat.desc}
                      </p>

                      <div className="flex items-center text-primary-600 font-bold group">
                        <span className="group-hover:mr-2 transition-all">Book Now</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 bg-gray-50 overflow-hidden relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Can&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                We are constantly expanding our team of experts and adding new services to make your life easier.
              </p>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-xl border-2 hover:bg-white h-14 px-8 font-bold">
                  Contact Support
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-50" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
