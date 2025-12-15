import apiClient from '../client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Notification } from '@/types/common';

export const notificationService = {
    // Get notifications
    getNotifications: async (params?: {
        page?: number;
        limit?: number;
        unreadOnly?: boolean;
    }): Promise<PaginatedResponse<Notification>> => {
        const response = await apiClient.get('/notifications', { params });
        return response.data;
    },

    // Mark as read
    markAsRead: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.put(`/notifications/${id}/read`);
        return response.data;
    },

    // Mark all as read
    markAllAsRead: async (): Promise<ApiResponse> => {
        const response = await apiClient.put('/notifications/read-all');
        return response.data;
    },
};
