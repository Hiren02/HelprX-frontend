'use client';

import { Button } from '@/components/ui/Button';
import { Search, Calculator, CheckSquare, Star, UserPlus, ClipboardList, Wallet, BadgeCheck, ArrowRight, MousePointerClick, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "Search for a Service",
      desc: "Browse our wide range of services or search for exactly what you need. From plumbing to cleaning, we've got you covered."
    },
    {
      icon: MousePointerClick,
      title: "Get Matched",
      desc: "Tell us the details of the job. We'll match you with the best available professionals in your area instantly."
    },
    {
      icon: ShieldCheck,
      title: "Job Done",
      desc: "Your pro arrives on time and completes the job. You can track their status in real-time through the app."
    },
    {
      icon: Star,
      title: "Pay & Review",
      desc: "Pay securely via the app after the job is finished. Rate your pro to help others find great service."
    }
  ];

  const workerSteps = [
    {
      icon: UserPlus,
      title: "Create Profile",
      desc: "Sign up, upload your ID for verification, and list your skills and experience to build trust."
    },
    {
      icon: ClipboardList,
      title: "Receive Jobs",
      desc: "Get notified about jobs in your area that match your expertise. Accept the ones that fit your schedule."
    },
    {
      icon: BadgeCheck,
      title: "Deliver Excellence",
      desc: "Complete the job to the customer's satisfaction. Professionalism earns you better ratings and more work."
    },
    {
      icon: Wallet,
      title: "Get Paid",
      desc: "Earnings are transferred directly to your wallet instantly upon job completion. Withdraw anytime you like."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-white py-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-50/30 rounded-l-[100px] -z-10 hidden lg:block" />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div
                className="lg:w-1/2 text-center lg:text-left"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-6">
                  Simple. Transparent. Reliable.
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-900 leading-tight">
                  How <span className="text-primary-600">HelprX</span> <br />
                  Works for You
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-xl">
                  We bridge the gap between skilled professionals and homeowners. Discover how easy it is to get things done or grow your business.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="rounded-xl h-14 px-8 shadow-lg shadow-primary-500/20">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-xl h-14 px-8 border-2">
                    Learn More
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="lg:w-1/2 relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gradient-to-tr from-primary-100 to-blue-50 rounded-3xl p-8 aspect-square flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl m-8 rounded-2xl border border-white/50 shadow-2xl flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl rotate-12">
                      <Calculator className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Smart Matching</h3>
                    <p className="text-gray-500">Our algorithm finds the perfect pro in seconds based on your needs.</p>
                  </div>
                  {/* Decorative floating elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-10 right-10 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center text-secondary-500"
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-10 left-10 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary-500"
                  >
                    <CheckSquare className="w-8 h-8" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* For Customers Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">For Customers</h2>
              <div className="w-24 h-1.5 bg-primary-600 mx-auto rounded-full" />
              <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
                Getting help is just a few clicks away. Experience the most seamless home service journey.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-4 gap-12 relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {steps.map((step, i) => (
                <motion.div key={i} className="relative z-10 text-center" variants={fadeInUp}>
                  <div className="relative mb-8 group">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                      <step.icon className="w-10 h-10 text-primary-600" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-[calc(50%+4rem)] w-[calc(100%-8rem)] border-t-2 border-dashed border-gray-200" />
                    )}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg border-4 border-white">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* For Professionals Section */}
        <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-primary-600/5 -z-0" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-4">For Professionals</h2>
              <div className="w-24 h-1.5 bg-secondary-500 mx-auto rounded-full" />
              <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                Turn your skills into earnings. We provide the tools and clients you need to succeed.
              </p>
            </div>

            <motion.div
              className="grid md:grid-cols-4 gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {workerSteps.map((step, i) => (
                <motion.div key={i} className="text-center" variants={fadeInUp}>
                  <div className="w-20 h-20 bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-gray-700 hover:border-secondary-500/50 transition-colors group">
                    <step.icon className="w-10 h-10 text-secondary-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed px-4">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/worker/register">
                <Button variant="secondary" size="lg" className="rounded-xl h-14 px-10 shadow-xl shadow-secondary-500/10 group">
                  Start Earning Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
