'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Zap, Shield, CheckCircle, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-32 overflow-hidden bg-gradient-to-b from-purple-50/50 to-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-accent-100 text-purple-700 font-medium text-sm mb-6 shadow-sm">
                <Star className="w-4 h-4 mr-2 fill-current" />
                #1 Trusted Local Services Platform
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
              >
                Your Home, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-500 to-accent-500">
                  Example Perfection.
                </span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                From leaky faucets to full home renovations, connect with verified experts who get the job done right. Experience the new standard in home care.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/user/register">
                  <Button size="lg" variant="purple" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl shadow-lg hover:shadow-purple-500/30 group">
                    Book a Service
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/worker/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-xl border-2 hover:bg-gray-50 text-gray-700">
                    Join as a Pro
                  </Button>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-500 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Verified Pros</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Insured Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Upfront Pricing</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative z-10">
                <Image
                  src="/assets/images/hero-illustration.png"
                  alt="HelprX Home Services Ecosystem"
                  width={800}
                  height={600}
                  priority
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
              {/* Decorative blobs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-purple-100/50 via-accent-100/50 to-purple-200/50 rounded-full blur-3xl -z-10 animate-pulse" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '10k+', label: 'Active Users' },
              { number: '500+', label: 'Verified Pros' },
              { number: '98%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support Available' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-gray-900">{stat.number}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Homeowners Trust HelprX
            </h2>
            <p className="text-xl text-gray-600">
              We&apos;ve reimagined the home service experience to be seamless, safe, and satisfying.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                color: 'bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600',
                title: 'Instant Matching',
                desc: 'Our smart algorithm connects you with the right pro in seconds, not hours.'
              },
              {
                icon: Shield,
                color: 'bg-green-100 text-green-600',
                title: '100% Secure',
                desc: 'Every job is insured. Payments are held in escrow until you are satisfied.'
              },
              {
                icon: Users,
                color: 'bg-gradient-to-br from-accent-100 to-accent-200 text-accent-600',
                title: 'Community Rated',
                desc: 'Hire with confidence using real reviews from neighbors in your community.'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.2 } }
                }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">
                  Simplicity at its best.
                </h2>
                <div className="space-y-12">
                  {[
                    {
                      step: '01',
                      title: 'Tell us your needs',
                      desc: 'Select a service, describe the issue, and choose a convenient time slot.'
                    },
                    {
                      step: '02',
                      title: 'Get matched instantly',
                      desc: 'We send your request to top-rated pros nearby who fit your criteria.'
                    },
                    {
                      step: '03',
                      title: 'Relax and Review',
                      desc: 'Pro arrives, fixes the issue. You pay securely and rate the service.'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-purple-200 bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg shadow-sm">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              {/* Simplified UI Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-gray-900 rounded-3xl p-4 shadow-2xl max-w-sm mx-auto border-4 border-gray-800"
              >
                <div className="aspect-[9/16] bg-gray-100 rounded-2xl overflow-hidden relative">
                  {/* Mock App UI Content */}
                  <div className="absolute top-0 w-full bg-gradient-to-r from-purple-600 to-purple-700 h-32 p-6 text-white pt-10">
                    <p className="text-sm opacity-80">Welcome back,</p>
                    <p className="text-xl font-bold">Alex Johnson</p>
                  </div>
                  <div className="absolute top-24 inset-x-4 bg-white rounded-xl shadow-lg p-4 space-y-4">
                    <div className="flex items-center gap-3 border-b pb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"><Clock size={20} /></div>
                      <div>
                        <p className="font-bold text-sm">Plumbing Repair</p>
                        <p className="text-xs text-gray-500">Today, 2:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><CheckCircle size={20} /></div>
                      <div>
                        <p className="font-bold text-sm">Cleaner Arrived</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full p-4 bg-white border-t">
                    <div className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg text-center font-bold text-sm shadow-md">Book New Service</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-16">
            Everything you need.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {['Plumbing', 'Electrical', 'Cleaning', 'Carpentry', 'Painting', 'Appliances', 'Gardening', 'Moving'].map((service, i) => (
              <motion.div
                key={service}
                whileHover={{ y: -5, borderColor: '#9333ea' }}
                className="bg-white p-6 rounded-2xl border-2 border-transparent shadow-sm hover:shadow-lg hover:shadow-purple-100 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group"
              >
                <div className="w-12 h-12 bg-purple-50 rounded-full group-hover:bg-purple-100 transition-colors flex items-center justify-center">
                  {/* We could map icons here, simple placeholder for now */}
                  <span className="text-2xl">🔧</span>
                </div>
                <span className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-accent-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your home?</h2>
          <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
            Join the fastest growing community of homeowners and professionals.
          </p>
          <Link href="/user/register">
            <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 h-14 px-10 text-lg rounded-full shadow-xl">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
