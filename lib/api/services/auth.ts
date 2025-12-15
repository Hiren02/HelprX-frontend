import apiClient from '../client';
import { ApiResponse, AuthResponse } from '@/types/api';
import { User } from '@/types/user';

export interface RegisterData {
    phone: string;
    password: string;
    name: string;
    email?: string;
    role: 'user' | 'worker';
}

export interface LoginData {
    phone: string;
    password: string;
}

export interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export const authService = {
    // Register new user or worker
    register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    // Login
    login: async (data: LoginData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    // Logout
    logout: async (): Promise<ApiResponse> => {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },

    // Refresh token
    refreshToken: async (refreshToken: string): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post('/auth/refresh', { refreshToken });
        return response.data;
    },

    // Change password
    changePassword: async (data: ChangePasswordData): Promise<ApiResponse> => {
        const response = await apiClient.post('/auth/change-password', data);
        return response.data;
    },

    // Get current user
    getCurrentUser: async (): Promise<ApiResponse<User>> => {
        const response = await apiClient.get('/auth/me');
        return response.data;
    },
};
