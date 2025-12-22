import { Button } from '@/components/ui/Button';
import { Search, Calculator, CheckSquare, Star, UserPlus, ClipboardList, Wallet, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Search,
      title: "1. Search for a Service",
      desc: "Browse our wide range of services or search for exactly what you need. From plumbing to cleaning, we've got you covered."
    },
    {
      icon: Calculator,
      title: "2. Get Matched",
      desc: "Tell us the details of the job. We'll match you with the best available professionals in your area instantly."
    },
    {
      icon: CheckSquare,
      title: "3. Job Done",
      desc: "Your pro arrives on time and completes the job. You can track their status in real-time through the app."
    },
    {
      icon: Star,
      title: "4. Pay & Review",
      desc: "Pay securely via the app after the job is finished. Rate your pro to help others find great service."
    }
  ];

  const workerSteps = [
    {
      icon: UserPlus,
      title: "1. Create Profile",
      desc: "Sign up, upload your ID for verification, and list your skills and experience."
    },
    {
      icon: ClipboardList,
      title: "2. Receive Jobs",
      desc: "Get notified about jobs in your area that match your expertise. Accept the ones that fit your schedule."
    },
    {
      icon: BadgeCheck,
      title: "3. Deliver Great Service",
      desc: "Complete the job to the customer's satisfaction. Professionalism earns you better ratings and more work."
    },
    {
      icon: Wallet,
      title: "4. Get Paid",
      desc: "Earnings are transferred directly to your wallet instantly upon job completion. Withdraw anytime."
    }
  ];

  return (
    <>
      <Header />
      <div className="bg-white">
        <section className="bg-primary-50 py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">How HelprX Works</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and transparent. Here’s how we connect you with the help you need.
            </p>
          </div>
        </section>

        <section className="py-20 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">For Customers</h2>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-200 z-0" style={{ top: '3rem' }}></div>
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 text-center bg-white p-4">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                  <step.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-gray-700 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">For Professionals</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {workerSteps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
                    <step.icon className="w-10 h-10 text-secondary-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/worker/register">
                <Button variant="secondary" size="lg">Start Earning Today</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
