import { Button } from '@/components/ui/Button';
import { Search, Calendar, ShieldCheck, DollarSign, TrendingUp, Bell } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function FeaturesPage() {
    return (
        <>
            <Header />
            <div className="bg-white">
                {/* Hero */}
                <section className="bg-gray-900 text-white py-20 text-center">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features for Everyone</h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Everything you need to manage your home services or grow your service business, all in one app.
                        </p>
                    </div>
                </section>

                {/* For Users */}
                <section className="py-20 container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-4">
                            FOR CUSTOMERS
                        </span>
                        <h2 className="text-3xl font-bold text-gray-900">Simplifying Home Maintenance</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
                        <div className="order-2 md:order-1 space-y-8">
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary-100 p-2 rounded-lg h-fit">
                                    <Search className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
                                    <p className="text-gray-600">Find the perfect professional for your specific needs instantly. Our algorithm considers proximity, rating, and expertise.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary-100 p-2 rounded-lg h-fit">
                                    <ShieldCheck className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Verified Professionals</h3>
                                    <p className="text-gray-600">Every worker goes through rigorous identity and background checks. Your safety is non-negotiable.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 bg-primary-100 p-2 rounded-lg h-fit">
                                    <DollarSign className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Transparent Pricing</h3>
                                    <p className="text-gray-600">Get upfront estimates. No hidden fees, no last-minute surprises. You pay securely through the app.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
                            <span className="text-gray-400 font-semibold">[User App Screenshot Placeholder]</span>
                        </div>
                    </div>
                </section>

                {/* For Workers */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="inline-block py-1 px-3 rounded-full bg-secondary-100 text-secondary-700 font-semibold text-sm mb-4">
                                FOR PROFESSIONALS
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900">Tools to Grow Your Business</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div className="bg-white rounded-2xl h-96 flex items-center justify-center shadow-lg border border-gray-100">
                                <span className="text-gray-400 font-semibold">[Worker App Screenshot Placeholder]</span>
                            </div>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-secondary-100 p-2 rounded-lg h-fit">
                                        <Calendar className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Flexible Schedule</h3>
                                        <p className="text-gray-600">Work when you want. Toggle your availability with a single tap and manage your bookings effortlessly.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-secondary-100 p-2 rounded-lg h-fit">
                                        <TrendingUp className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Earnings Dashboard</h3>
                                        <p className="text-gray-600">Track your daily, weekly, and monthly earnings with detailed analytics. Watch your business grow.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 bg-secondary-100 p-2 rounded-lg h-fit">
                                        <Bell className="w-6 h-6 text-secondary-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">Instant Job Alerts</h3>
                                        <p className="text-gray-600">Get notified immediately when jobs match your skills and location. Never miss an opportunity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to experience these features?</h2>
                    <Link href="/user/register">
                        <Button size="lg" className="mr-4">Get Started</Button>
                    </Link>
                </section>
            </div>
            <Footer />
        </>
    );
}
