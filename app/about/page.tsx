'use client';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Users, Heart, Shield, Globe, ArrowRight, CheckCircle2, Star, Award } from 'lucide-react';
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

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary-900 text-white overflow-hidden">
          {/* Animated Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-primary-100 font-medium text-sm mb-8 backdrop-blur-sm border border-white/10">
                <Award className="w-4 h-4 mr-2" />
                Our Story & Vision
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              >
                Building the Future of <br />
                <span className="text-secondary-400">Local Services</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-primary-100/90 leading-relaxed mb-10 max-w-3xl mx-auto"
              >
                HelprX is more than a platform. We are a community-driven ecosystem dedicated to transparency, reliability, and empowering local professionals.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
                <Link href="/user/register">
                  <Button size="lg" className="rounded-full px-8 h-14 bg-white text-primary-900 hover:bg-primary-50">
                    Get Started Today
                  </Button>
                </Link>
                <div className="flex items-center gap-4 px-6 text-primary-100 font-medium border-l border-white/20 ml-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-8 h-8 rounded-full border-2 border-primary-900 bg-gray-200`} />
                    ))}
                  </div>
                  <span className="text-sm">Trusted by 10k+ Neighbors</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-24 container mx-auto px-4 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-8 relative inline-block">
                Driven by a Simple Promise
                <div className="absolute -bottom-2 left-0 w-20 h-1.5 bg-primary-600 rounded-full" />
              </h2>
              <div className="space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  At HelprX, we believe that finding reliable help shouldn&apos;t be a source of stress. We&apos;re revolutionizing the local service industry by creating a platform that prioritizes <span className="text-primary-600 font-semibold underline decoration-primary-200 underline-offset-4">trust, transparency</span>, and fair opportunities.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded in 2024, our journey began with a single question: "What if you could book a verified professional as easily as a ride-share?" Today, we serve thousands of households and support hundreds of independent pros.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Verified & Background-checked professionals",
                    "Transparent, upfront pricing model",
                    "Secure escrow-based payment system",
                    "24/7 dedicated community support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="rounded-xl px-10 border-2 group font-bold">
                      Chat with Our Team
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl bg-gray-100 aspect-video lg:aspect-square flex items-center justify-center">
                <Users size={120} className="text-gray-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center text-yellow-600">
                    <Star className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide every decision we make, ensuring we stay true to our community and our mission.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Heart,
                  title: 'Community First',
                  desc: 'We are building more than just an app; we are cultivating a community of support and growth for everyone.',
                  color: 'red'
                },
                {
                  icon: Shield,
                  title: 'Trust & Safety',
                  desc: 'Your peace of mind is non-negotiable. We rigorously verify every pro and protect every single transaction.',
                  color: 'blue'
                },
                {
                  icon: Globe,
                  title: 'Sustainability',
                  desc: 'We support local economies and encourage efficient, long-lasting solutions in every home we serve.',
                  color: 'green'
                }
              ].map((value, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card hover className="h-full p-10 flex flex-col items-center text-center group border-none shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[32px]">
                    <div className={`w-20 h-20 bg-${value.color}-50 rounded-3xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-300`}>
                      <value.icon className={`w-10 h-10 text-${value.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.desc}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Leadership</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A passionate team dedicated to transforming the home services industry.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: 'Alex Thompson',
                  role: 'CEO & Co-Founder',
                  image: '👨‍💼',
                  bio: 'Former product lead at a major tech company, passionate about local economies.'
                },
                {
                  name: 'Maria Garcia',
                  role: 'CTO & Co-Founder',
                  image: '👩‍💻',
                  bio: '15+ years in engineering, building scalable platforms that empower communities.'
                },
                {
                  name: 'David Chen',
                  role: 'Head of Operations',
                  image: '👨‍💼',
                  bio: 'Expert in logistics and marketplace operations, ensuring seamless experiences.'
                }
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium text-center mb-4">{member.role}</p>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Key milestones that shaped HelprX into what it is today.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {[
                {
                  year: '2024',
                  title: 'HelprX Founded',
                  description: 'Started with a vision to revolutionize local home services.'
                },
                {
                  year: '2024 Q2',
                  title: 'Platform Launch',
                  description: 'Officially launched in 5 major cities with 100+ verified professionals.'
                },
                {
                  year: '2024 Q3',
                  title: '10,000 Users',
                  description: 'Reached 10,000 active users and completed 5,000+ successful jobs.'
                },
                {
                  year: '2024 Q4',
                  title: 'Expansion',
                  description: 'Expanded to 15 cities with 500+ professionals on the platform.'
                }
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-grow pt-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden bg-primary-600">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Join the HelprX Revolution</h2>
              <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto">
                Whether you need help or want to offer your skills, there&apos;s a place for you in our growing community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/user/register">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold shadow-xl">
                    Find Help
                  </Button>
                </Link>
                <Link href="/worker/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl text-lg font-bold border-white text-white hover:bg-white hover:text-primary-600 transition-all">
                    Become a Pro
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
