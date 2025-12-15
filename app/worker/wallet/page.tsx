'use client';

import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useRouter } from 'next/navigation';
import { Wallet, TrendingUp, TrendingDown, Download, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/date';

// Mock data
const mockTransactions = [
  {
    id: '1',
    type: 'credit' as const,
    amount: 500,
    description: 'Job #1234 - Plumbing service',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: '2',
    type: 'payout' as const,
    amount: 2000,
    description: 'Payout to bank account',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

export default function WorkerWalletPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
            <Button variant="ghost" onClick={() => router.push('/worker')}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Balance Card */}
        <Card className="mb-6 bg-gradient-to-br from-secondary-600 to-secondary-700 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-secondary-100 mb-1">Available Balance</p>
              <h2 className="text-4xl font-bold">{formatCurrency(0)}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-secondary-500">
            <div>
              <p className="text-secondary-100 text-sm">Total Earnings</p>
              <p className="text-xl font-semibold">{formatCurrency(0)}</p>
            </div>
            <div>
              <p className="text-secondary-100 text-sm">Total Withdrawn</p>
              <p className="text-xl font-semibold">{formatCurrency(0)}</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Button className="bg-secondary-600 hover:bg-secondary-700 h-auto py-4">
            <Download className="w-5 h-5 mr-2" />
            Request Payout
          </Button>
          <Button variant="outline" className="h-auto py-4">
            View Payout History
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <p className="text-gray-600 text-sm mb-1">This Week</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(0)}</p>
            <p className="text-sm text-green-600 mt-1">+0% from last week</p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm mb-1">This Month</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(0)}</p>
            <p className="text-sm text-green-600 mt-1">+0% from last month</p>
          </Card>
          <Card>
            <p className="text-gray-600 text-sm mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(0)}</p>
            <p className="text-sm text-gray-500 mt-1">In progress jobs</p>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {mockTransactions.length > 0 ? (
            <div className="space-y-3">
              {mockTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between py-3 border-b last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'credit'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {transaction.type === 'credit' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.createdAt, 'PPP')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        transaction.type === 'credit'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </p>
                    <Badge
                      variant={
                        transaction.type === 'credit' ? 'success' : 'default'
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No transactions yet</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
