'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, CreditCard, Shield, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import toast from 'react-hot-toast';

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'wallet' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Invoice Data
  const invoice = {
    id: `INV-${params.id}`,
    serviceFee: 350,
    partsCost: 120,
    tax: 84.6, // 18% GST
    total: 554.6,
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful!');
      router.push(`/user/jobs/${params.id}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Complete Payment</h1>
        <p className="text-gray-600">Job {invoice.id}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Payment Methods */}
        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-4">Select Payment Method</h3>
            <div className="space-y-3">
              <div 
                className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                  paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-3 text-purple-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                </div>
                {paymentMethod === 'card' && <CheckCircle className="w-5 h-5 text-purple-500" />}
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                  paymentMethod === 'upi' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('upi')}
              >
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-3 text-green-600" />
                  <span className="font-medium">UPI / BHIM</span>
                </div>
                {paymentMethod === 'upi' && <CheckCircle className="w-5 h-5 text-purple-500" />}
              </div>

              <div 
                className={`p-4 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                  paymentMethod === 'wallet' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('wallet')}
              >
                <div className="flex items-center">
                  <Wallet className="w-5 h-5 mr-3 text-purple-600" />
                  <span className="font-medium">HelprX Wallet</span>
                </div>
                {paymentMethod === 'wallet' && <CheckCircle className="w-5 h-5 text-purple-500" />}
              </div>
            </div>
          </Card>

          <div className="bg-green-50 p-4 rounded-lg flex items-start">
            <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            <p className="text-sm text-green-700">
              Your payment is secure and encrypted. We do not store your card details.
            </p>
          </div>
        </div>

        {/* Invoice Summary */}
        <div>
          <Card>
            <h3 className="font-semibold mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span>{formatCurrency(invoice.serviceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Parts & Materials</span>
                <span>{formatCurrency(invoice.partsCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (18%)</span>
                <span>{formatCurrency(invoice.tax)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-purple-600">{formatCurrency(invoice.total)}</span>
              </div>
            </div>

            <Button 
              className="w-full mt-6" 
              size="lg"
              isLoading={isProcessing}
              onClick={handlePayment}
            >
              Pay {formatCurrency(invoice.total)}
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              By proceeding, you agree to our Terms of Service
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper icon
function Smartphone(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
