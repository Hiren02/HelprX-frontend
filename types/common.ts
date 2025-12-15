export interface Rating {
    id: string;
    jobId: string;
    userId: string;
    workerId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    review?: string;
    createdAt: string;
    user?: {
        id: string;
        name: string;
    };
    job?: {
        id: string;
        serviceType: string;
    };
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    isRead: boolean;
    metadata?: Record<string, any>;
    createdAt: string;
}

export interface WalletTransaction {
    id: string;
    walletId: string;
    type: 'credit' | 'debit' | 'payout';
    amount: number;
    description: string;
    jobId?: string;
    createdAt: string;
}

export interface Wallet {
    id: string;
    workerId: string;
    balance: number;
    totalEarnings: number;
    totalWithdrawn: number;
    pendingAmount: number;
}

export interface PaymentOrder {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    status: 'created' | 'paid' | 'failed';
    jobId?: string;
}
