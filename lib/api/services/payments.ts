import apiClient from '../client';
import { ApiResponse } from '@/types/api';
import { PaymentOrder } from '@/types/common';

export interface CreatePaymentOrderData {
    amount: number;
    jobId?: string;
    currency?: string;
}

export interface VerifyPaymentData {
    orderId: string;
    paymentId: string;
    signature: string;
}

export const paymentService = {
    // Create payment order
    createOrder: async (data: CreatePaymentOrderData): Promise<ApiResponse<PaymentOrder>> => {
        const response = await apiClient.post('/payments/create-order', data);
        return response.data;
    },

    // Verify payment
    verifyPayment: async (data: VerifyPaymentData): Promise<ApiResponse> => {
        const response = await apiClient.post('/payments/verify', data);
        return response.data;
    },
};
