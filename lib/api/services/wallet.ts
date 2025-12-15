import apiClient from '../client';
import { ApiResponse } from '@/types/api';
import { Wallet, WalletTransaction } from '@/types/common';
import { PaginatedResponse } from '@/types/api';

export const walletService = {
    // Get wallet balance
    getBalance: async (): Promise<ApiResponse<Wallet>> => {
        const response = await apiClient.get('/wallet/balance');
        return response.data;
    },

    // Get transaction history
    getTransactions: async (params?: {
        page?: number;
        limit?: number;
        type?: 'credit' | 'debit' | 'payout';
    }): Promise<PaginatedResponse<WalletTransaction>> => {
        const response = await apiClient.get('/wallet/transactions', { params });
        return response.data;
    },

    // Request payout
    requestPayout: async (amount: number): Promise<ApiResponse> => {
        const response = await apiClient.post('/wallet/payout', { amount });
        return response.data;
    },
};
