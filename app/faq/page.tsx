'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "For Customers",
      items: [
        {
          q: "How do I book a service?",
          a: "Simply browse our services or search for what you need. Follow the prompts to describe your task, set a time, and we'll match you with a qualified professional instantly."
        },
        {
          q: "Is payment secure?",
          a: "Yes, all payments are processed securely through our payment partners. We hold the funds in escrow and only release them to the professional once the job is completed to your satisfaction."
        },
        {
          q: "What if I'm not satisfied with the service?",
          a: "We have a satisfaction guarantee. If things don't go as planned, contact our support team within 24 hours, and we'll work to make it right, including offering a re-service or refund."
        }
      ]
    },
    {
      category: "For Professionals",
      items: [
        {
          q: "How do I join as a professional?",
          a: "Click on 'Become a Pro' and complete the registration. You'll need to submit identity proof and relevant certifications. Once verified, you can start accepting jobs."
        },
        {
          q: "How much does it cost to use the platform?",
          a: "Signing up is free. We charge a small commission fee on each completed job. You keep the majority of your earnings."
        },
        {
          q: "When do I get paid?",
          a: "Payments are transferred to your wallet immediately after job completion. You can withdraw to your bank account anytime."
        }
      ]
    }
  ];

  let globalIndex = 0;

  return (
    <>
      <Header />
      <div className="bg-white min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12">
            Find answers to common questions about using HelprX.
          </p>

          <div className="space-y-12">
            {faqs.map((section, sIndex) => (
              <div key={sIndex}>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{section.category}</h2>
                <div className="space-y-4">
                  {section.items.map((item, i) => {
                    const currentIndex = globalIndex++;
                    const isOpen = openIndex === currentIndex;
                    return (
                      <Card
                        key={i}
                        className={`cursor-pointer transition-all duration-200 ${isOpen ? 'ring-2 ring-primary-500' : 'hover:shadow-md'}`}
                        onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-semibold text-lg text-gray-900">{item.q}</h3>
                          {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                        </div>
                        {isOpen && (
                          <p className="mt-4 text-gray-600 leading-relaxed animate-in fade-in duration-300">
                            {item.a}
                          </p>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
