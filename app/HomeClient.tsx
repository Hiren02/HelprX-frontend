'use client';

import Link from 'next/link';
import { ArrowRight, Users, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, container, item } from '@/lib/utils/motion';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomeClient() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden transition-colors duration-300">
            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50 shadow-sm"
            >
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-xl">H</span>
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">HelprX</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            How It Works
                        </Link>
                        <Link href="#services" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors">
                            Services
                        </Link>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <Link
                            href="/user/login"
                            className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/user/register"
                            className="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 dark:hover:bg-primary-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 md:py-32 relative">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-blue-950/30 dark:via-gray-950 dark:to-gray-950 opacity-70"></div>
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        variants={fadeIn('up', 0.2)}
                        initial="hidden"
                        animate="show"
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                            Find Reliable Local Services
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-400 dark:from-primary-400 dark:to-blue-300 mt-2">
                                In Minutes
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        variants={fadeIn('up', 0.4)}
                        initial="hidden"
                        animate="show"
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                    >
                        Connect with verified plumbers, electricians, tutors, and more. <br className="hidden md:block" />
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">AI-powered matching</span> ensures you get the best service provider for your needs.
                    </motion.p>

                    <motion.div
                        variants={fadeIn('up', 0.6)}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col sm:flex-row gap-5 justify-center"
                    >
                        <Link
                            href="/user/register"
                            className="group bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 dark:hover:bg-primary-500 transition-all duration-300 shadow-lg hover:shadow-primary-500/30 flex items-center justify-center space-x-2 text-lg font-semibold"
                        >
                            <span>Find a Service</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/worker/register"
                            className="bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border-2 border-primary-100 dark:border-gray-700 px-8 py-4 rounded-full hover:bg-primary-50 dark:hover:bg-gray-700 hover:border-primary-200 transition-all duration-300 text-lg font-semibold"
                        >
                            Become a Provider
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-white dark:bg-gray-950 py-24 relative overflow-hidden transition-colors duration-300">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Why Choose HelprX?
                        </h2>
                        <div className="w-24 h-1.5 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full"></div>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    >
                        {[
                            {
                                icon: <Zap className="w-8 h-8 text-white" />,
                                title: "AI-Powered Matching",
                                desc: "Our intelligent system finds the perfect service provider based on location, ratings, and availability.",
                                color: "bg-blue-500"
                            },
                            {
                                icon: <Shield className="w-8 h-8 text-white" />,
                                title: "Verified Professionals",
                                desc: "All service providers go through KYC verification and background checks for your safety.",
                                color: "bg-green-500"
                            },
                            {
                                icon: <Users className="w-8 h-8 text-white" />,
                                title: "Trusted by Thousands",
                                desc: "Join thousands of satisfied customers who found reliable services through HelprX.",
                                color: "bg-purple-500"
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={item}
                                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:border-gray-800 dark:hover:border-gray-700 hover:shadow-xl transition-all duration-300 text-center"
                            >
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Get your tasks done in 3 simple steps</p>
                    </motion.div>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12 relative">
                        {/* Connector Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 dark:bg-gray-800 -z-10"></div>

                        {[
                            {
                                step: 1,
                                title: "Submit Your Request",
                                desc: "Tell us what service you need and when you need it."
                            },
                            {
                                step: 2,
                                title: "Get Matched",
                                desc: "Our AI finds the best available professionals near you."
                            },
                            {
                                step: 3,
                                title: "Service Completed",
                                desc: "Track progress, make payment, and rate your experience."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold ring-8 ring-primary-50 dark:ring-primary-900/30">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="bg-white dark:bg-gray-950 py-24 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Popular Services
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">Explore our most requested services</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            '🔧 Plumbing',
                            '⚡ Electrical',
                            '📚 Tutoring',
                            '🔨 Carpentry',
                            '🎨 Painting',
                            '🧹 Cleaning',
                            '🐕 Pet Care',
                            '🛠️ Handyman',
                        ].map((service, index) => (
                            <motion.div
                                key={service}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl text-center hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-primary-100 dark:hover:shadow-none border border-transparent hover:border-primary-100 dark:hover:border-primary-900 transition-all cursor-pointer group"
                            >
                                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">H</span>
                                </div>
                                <span className="text-2xl font-bold tracking-tight">HelprX</span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Your trusted local services platform. Connecting you with professionals you can trust.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">For Customers</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/user/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                                <li><Link href="/user/login" className="hover:text-white transition-colors">Login</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">How It Works</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">For Providers</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="/worker/register" className="hover:text-white transition-colors">Join as Provider</Link></li>
                                <li><Link href="/worker/login" className="hover:text-white transition-colors">Provider Login</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Benefits</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
                            <ul className="space-y-3 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
                        <p>&copy; 2024 HelprX. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
