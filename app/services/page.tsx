'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Wrench, Zap, BookOpen, Hammer, Palette, Sparkles, Dog, Home as HomeIcon, ArrowRight, Star, ShieldCheck, Clock, Award, CheckCircle2, TrendingUp } from 'lucide-react';
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
        <section className="relative py-24 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-primary-50/50 to-white -z-10" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-8 border border-primary-200">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Home Care Services
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight">
                Quality Care for your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                  Home & Family.
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Connect with the city's highest-rated professionals for all your home needs.
                Transparent pricing, verified experts, and a satisfaction guarantee.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span>Verified Pros</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                  <Award className="w-5 h-5 text-green-500" />
                  <span>Top Rated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Service Grid Section with Header */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 className="text-4xl font-bold text-gray-900 mb-4 text-left">Popular Categories</h2>
                <p className="text-gray-500 text-lg text-left">Explore our wide range of professional services tailored for your home.</p>
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-1 bg-primary-600 rounded-full" />
                <div className="w-4 h-1 bg-primary-200 rounded-full" />
                <div className="w-4 h-1 bg-primary-200 rounded-full" />
              </div>
            </div>

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
                    <div className="h-full flex flex-col p-10 group-hover:border-primary-500 transition-all duration-500 relative overflow-hidden bg-gray-50 rounded-[40px] border border-transparent hover:bg-white hover:shadow-2xl">
                      <div className={`w-16 h-16 ${getColorStyles(cat.color)} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                        <cat.icon className="w-8 h-8" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
                        {cat.name}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                        {cat.desc}
                      </p>

                      <div className="flex items-center text-primary-600 font-bold group gap-2">
                        <span className="text-sm uppercase tracking-widest group-hover:tracking-[0.2em] transition-all">Book Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Why HelprX is Different</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">We don't just connect you; we ensure a seamless and premium experience from start to finish.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                { icon: ShieldCheck, title: 'Safe Payments', desc: 'Secure escrowed payments. Only release funds when the job is done right.' },
                { icon: TrendingUp, title: 'Best Professionals', desc: 'Only the top 5% of skilled professionals pass our verification process.' },
                { icon: Clock, title: 'Value for Time', desc: 'Instant bookings and real-time tracking save you hours of coordination.' }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 bg-gray-800/50 rounded-[40px] border border-gray-700 hover:border-primary-500/50 transition-all group"
                >
                  <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 bg-white overflow-hidden relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto bg-primary-50 p-16 rounded-[60px] border border-primary-100"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Need a Custom Solution?
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                If our predefined services don't match your requirements,
                our team is ready to help you with a custom quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-2xl h-16 px-10 font-bold shadow-xl shadow-primary-500/10">
                    Get a Quote
                  </Button>
                </Link>
                <Link href="/faq">
                  <Button variant="outline" size="lg" className="rounded-2xl h-16 px-10 font-bold border-2 bg-white">
                    View FAQs
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
