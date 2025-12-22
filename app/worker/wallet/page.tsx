'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Wallet, ArrowDownLeft, ArrowUpRight, Download, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWalletBalance, useWalletTransactions, useRequestPayout } from '@/lib/hooks/useWorker';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDateTime } from '@/lib/utils/date';
import toast from 'react-hot-toast';

export default function WorkerWalletPage() {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  
  const { data: balance, isLoading: isLoadingBalance } = useWalletBalance();
  const { data: transactions, isLoading: isLoadingTransactions } = useWalletTransactions({ limit: 20 });
  const requestPayout = useRequestPayout();

  const handleRequestPayout = () => {
      const amount = Number(payoutAmount);
      if (!amount || amount < 100) {
          toast.error("Minimum payout is ₹100");
          return;
      }
      if (amount > (balance?.data?.balance || 0)) {
          toast.error("Insufficient balance");
          return;
      }
      
      requestPayout.mutate(amount, {
          onSuccess: () => {
              setShowPayoutModal(false);
              setPayoutAmount('');
          }
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (isLoadingBalance || isLoadingTransactions) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <Loader2 className="w-8 h-8 animate-spin text-secondary-600" />
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 py-8 max-w-4xl"
      >
        <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
        </motion.div>

        {/* Balance Card */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-2 bg-gradient-to-r from-secondary-600 to-secondary-700 text-white border-none">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary-100 mb-2">Total Balance</p>
                <h2 className="text-4xl font-bold mb-4">{formatCurrency(balance?.data?.balance || 0)}</h2>
                <div className="flex space-x-4 text-sm text-secondary-100">
                  <span>Pending: {formatCurrency(balance?.data?.pendingAmount || 0)}</span>
                  <span>•</span>
                  <span>Withdrawn: {formatCurrency(balance?.data?.totalWithdrawn || 0)}</span>
                </div>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <Wallet className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
              <Button 
                variant="secondary" // Should appear white/light on dark background
                className="bg-white text-secondary-700 hover:bg-gray-100 border-none"
                onClick={() => setShowPayoutModal(true)}
              >
                Request Payout
              </Button>
            </div>
          </Card>

          <Card className="flex flex-col justify-center items-center text-center p-6">
             <h3 className="text-gray-500 mb-2">Total Earnings</h3>
             <p className="text-3xl font-bold text-gray-900 mb-2">
                 {formatCurrency(balance?.data?.totalEarnings || 0)}
             </p>
             <p className="text-sm text-green-600 flex items-center">
                 <ArrowUpRight className="w-4 h-4 mr-1" />
                 Lifetime
             </p>
          </Card>
        </motion.div>

        {/* Transactions */}
        <motion.div variants={itemVariants}>
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Transaction History</h2>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            
            <div className="space-y-4">
              {transactions?.data && transactions.data.length > 0 ? (
                  transactions.data.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                        <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === 'credit' ? 'bg-green-100 text-green-600' : 
                            tx.type === 'debit' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600' // Payout
                        }`}>
                            {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : 
                             tx.type === 'debit' ? <ArrowUpRight className="w-5 h-5" /> :
                             <Wallet className="w-5 h-5" />}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 capitalize">{tx.description || tx.type}</p>
                            <p className="text-sm text-gray-500">{formatDateTime(tx.createdAt)}</p>
                        </div>
                        </div>
                        <div className="text-right">
                        <p className={`font-bold ${
                            tx.type === 'credit' ? 'text-green-600' : 'text-gray-900'
                        }`}>
                            {tx.type === 'credit' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{tx.status}</p>
                        </div>
                    </div>
                  ))
              ) : (
                  <div className="text-center py-8 text-gray-500">
                      No transactions found
                  </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Payout Modal */}
      <Modal
        isOpen={showPayoutModal}
        onClose={() => setShowPayoutModal(false)}
        title="Request Payout"
      >
        <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg flex gap-3 text-sm text-yellow-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>
                    Payouts are processed within 24-48 hours. Minimum withdrawal amount is ₹100.
                </p>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (Available: {formatCurrency(balance?.data?.balance || 0)})
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <Input 
                        type="number" 
                        className="pl-8"
                        placeholder="Enter amount"
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        max={balance?.data?.balance}
                        min={100}
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button variant="ghost" onClick={() => setShowPayoutModal(false)}>
                    Cancel
                </Button>
                <Button 
                    onClick={handleRequestPayout}
                    disabled={requestPayout.isPending || !payoutAmount}
                    variant="secondary"
                >
                    {requestPayout.isPending ? 'Processing...' : 'Confirm Request'}
                </Button>
            </div>
        </div>
      </Modal>
    </div>
  );
}
