'use client';

import { Button } from '@/components/ui/Button';
import { Search, Calculator, CheckSquare, Star, UserPlus, ClipboardList, Wallet, BadgeCheck, ArrowRight, MousePointerClick, ShieldCheck, HelpCircle, ChevronDown, Sparkles, Zap, Shield, Clock } from 'lucide-react';
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

  const faqs = [
    {
      q: "How long does it take to get a match?",
      a: "Our smart matching system typically connects you with available professionals in your area within 60 seconds."
    },
    {
      q: "Are the professionals background checked?",
      a: "Yes, every professional on HelprX undergoes a rigorous multi-step verification process, including identity and background checks."
    },
    {
      q: "How do I pay for the service?",
      a: "Payments are handled securely through the app. We hold the funds in escrow and only release them to the professional once you confirm the job is complete."
    },
    {
      q: "What if I'm not satisfied with the work?",
      a: "We offer a Happiness Guarantee. If you're not satisfied, we'll work with you to make it right, which may include a re-service or a refund."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Simplified Hero Section */}
        <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-primary-50/50 to-white -z-10" />
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-3xl mx-auto"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-medium text-sm mb-6 border border-primary-200">
                <Sparkles className="w-4 h-4 mr-2" />
                The Future of Home Services
              </motion.div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                How <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">HelprX</span> Works
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                We've simplified the entire process of finding, booking, and paying for home services.
                Whether you're a homeowner or a pro, we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-2xl h-16 px-10 text-lg shadow-xl shadow-primary-500/20">
                  Get Started Now
                </Button>
                <Button variant="outline" size="lg" className="rounded-2xl h-16 px-10 text-lg border-2">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* For Customers - Dynamic Step Cards */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Journey for Customers</h2>
              <p className="text-gray-500 text-lg">Four simple steps to a better home.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-gray-50 rounded-[32px] p-8 flex gap-6 hover:bg-primary-50 transition-colors duration-500 border border-transparent hover:border-primary-100"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <step.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-primary-500 uppercase tracking-widest">Step {i + 1}</span>
                      <div className="h-px bg-primary-200 flex-grow" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Split Section */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900 mb-8 leading-tight">
                  Why hundreds of neighbors <br />
                  trust <span className="text-primary-600">HelprX</span> every day.
                </h2>
                <div className="space-y-8">
                  {[
                    { icon: Zap, title: 'Speed of Service', desc: 'No more waiting for callbacks. Get service in hours, not days.' },
                    { icon: Shield, title: 'Safe & Secure', desc: 'Every transaction is encrypted and every pro is fully vetted.' },
                    { icon: Clock, title: 'Reliability', desc: 'Real-time tracking and constant communication for total peace of mind.' }
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <feat.icon className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{feat.title}</h4>
                        <p className="text-gray-600">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-primary-600 rounded-[40px] p-8 aspect-square relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="relative h-full flex flex-col justify-center text-white">
                    <p className="text-6xl font-black mb-4">98%</p>
                    <p className="text-2xl font-bold mb-6">Customer Satisfaction</p>
                    <p className="text-primary-100 italic">"The easiest home service experience I've ever had. From booking to payment, it was absolutely flawless."</p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-400" />
                      <div>
                        <p className="font-bold">Sarah Jenkins</p>
                        <p className="text-sm text-primary-200">New York User</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary-400 rounded-3xl blur-2xl opacity-40 animate-pulse" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-400 rounded-full blur-3xl opacity-30 animate-pulse" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* For Professionals Section */}
        <section className="py-32 bg-gray-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-6">Empowering Pros</h2>
                <p className="text-xl text-gray-400 mb-12">
                  Build your business on your own terms. We handle the marketing, payments, and support so you can focus on quality work.
                </p>
                <div className="grid sm:grid-cols-2 gap-8">
                  {workerSteps.map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center text-primary-400">
                        <step.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12">
                  <Link href="/worker/register">
                    <Button variant="secondary" size="lg" className="rounded-2xl h-16 px-10 shadow-2xl shadow-secondary-500/10 group font-bold">
                      Become a Partner
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-800 rounded-[40px] p-10 border border-gray-700 shadow-3xl"
              >
                <div className="space-y-6 text-center">
                  <p className="text-primary-400 font-bold tracking-widest uppercase text-sm">The Pro Dashboard</p>
                  <h3 className="text-3xl font-bold">Everything you need <br /> in one place.</h3>
                  <div className="pt-8">
                    <div className="aspect-[4/3] bg-gray-900 rounded-3xl border border-gray-700 p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="h-6 w-32 bg-gray-800 rounded" />
                        <div className="h-10 w-10 bg-gray-800 rounded-full" />
                      </div>
                      <div className="space-y-4">
                        <div className="h-8 w-full bg-gradient-to-r from-primary-600/20 to-transparent rounded" />
                        <div className="h-8 w-full bg-gray-800 rounded" />
                        <div className="h-8 w-2/3 bg-gray-800 rounded" />
                      </div>
                      <div className="h-12 w-full bg-primary-600 rounded-xl" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
              <p className="text-gray-500 text-lg">Everything you need to know about the process.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-gray-100 rounded-2xl overflow-hidden hover:border-primary-100 transition-colors"
                >
                  <button className="w-full text-left p-6 flex justify-between items-center group">
                    <span className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{faq.q}</span>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                  </button>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
