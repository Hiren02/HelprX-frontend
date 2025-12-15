import apiClient from '../client';
import { ApiResponse } from '@/types/api';
import { UserProfile, UserStats } from '@/types/user';

export interface UpdateProfileData {
    name?: string;
    email?: string;
}

export interface UpdatePasswordData {
    currentPassword: string;
    newPassword: string;
}

export const userService = {
    // Get user profile
    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.get('/users/profile');
        return response.data;
    },

    // Update user profile
    updateProfile: async (data: UpdateProfileData): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.put('/users/profile', data);
        return response.data;
    },

    // Update password
    updatePassword: async (data: UpdatePasswordData): Promise<ApiResponse> => {
        const response = await apiClient.put('/users/password', data);
        return response.data;
    },

    // Deactivate account
    deactivateAccount: async (): Promise<ApiResponse> => {
        const response = await apiClient.delete('/users/account');
        return response.data;
    },

    // Get user statistics
    getStats: async (): Promise<ApiResponse<UserStats>> => {
        const response = await apiClient.get('/users/stats');
        return response.data;
    },
};
