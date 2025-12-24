'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/forms/Textarea';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
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
      staggerChildren: 0.15
    }
  }
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-white">
        {/* Hero Header */}
        <section className="bg-gray-50 py-20 border-b overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-50 -z-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-primary-100 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-secondary-100 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Get in Touch</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Have questions about HelprX? Whether you&apos;re a customer, professional, or partner, our team is ready to support you.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-12 gap-16">
              {/* Contact Information */}
              <motion.div
                className="lg:col-span-5 space-y-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <MessageCircle className="w-8 h-8 text-primary-600" />
                    How can we help?
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        icon: Mail,
                        title: 'Email Us',
                        details: ['support@helprx.com', 'partners@helprx.com'],
                        color: 'blue'
                      },
                      {
                        icon: Phone,
                        title: 'Call Us',
                        details: ['+91 98765 43210'],
                        subtext: 'Mon-Sat, 9am - 7pm IST',
                        color: 'green'
                      },
                      {
                        icon: MapPin,
                        title: 'Visit Us',
                        details: ['123 Tech Park, Cyber City', 'Gurugram, HR 122002'],
                        color: 'orange'
                      }
                    ].map((item, i) => (
                      <Card key={i} className="p-6 border-none shadow-sm bg-gray-50/50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className={`bg-white p-3 rounded-2xl shadow-sm text-gray-700`}>
                            <item.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                            {item.details.map((detail, idx) => (
                              <p key={idx} className="text-gray-600">{detail}</p>
                            ))}
                            {item.subtext && <p className="text-xs text-gray-400 mt-1">{item.subtext}</p>}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Map/Image Placeholder */}
                <motion.div
                  variants={fadeInUp}
                  className="pt-8"
                >
                  <div className="h-64 bg-gray-100 rounded-3xl overflow-hidden relative shadow-inner border-4 border-gray-50 group">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-700">
                      <Globe className="w-16 h-16 mb-4 opacity-20" />
                      <span className="font-medium text-sm">Gurugram Operations Hub</span>
                    </div>
                    {/* Simplified glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-500 rounded-full animate-ping" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-7"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="p-10 md:p-12 shadow-2xl rounded-[40px] border-none bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-primary-600" />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                    <p className="text-gray-500 mb-10">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Full Name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="bg-gray-50 border-transparent focus:bg-white h-12"
                        />
                        <Input
                          type="email"
                          label="Email Address"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-gray-50 border-transparent focus:bg-white h-12"
                        />
                      </div>
                      <Input
                        label="Subject"
                        placeholder="Project inquiry, support, etc."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-gray-50 border-transparent focus:bg-white h-12"
                      />
                      <Textarea
                        label="Message"
                        placeholder="Tell us more about how we can help you..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="bg-gray-50 border-transparent focus:bg-white"
                      />
                      <div className="pt-4">
                        <Button type="submit" size="lg" className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary-500/20 group" isLoading={isLoading}>
                          <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </div>
                </Card>

                <div className="mt-12 flex items-center justify-center gap-8 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">Avg. response time: 4h</span>
                  </div>
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-500">Secure & Encrypted</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
