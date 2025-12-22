import apiClient from '../client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Address } from '@/types/user';

export interface CreateAddressData {
    label: string;
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
}

export type UpdateAddressData = Partial<CreateAddressData>;

export const addressService = {
    // Create address
    createAddress: async (data: CreateAddressData): Promise<ApiResponse<Address>> => {
        const response = await apiClient.post('/addresses', data);
        return response.data;
    },

    // Get user addresses
    getAddresses: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Address>> => {
        const response = await apiClient.get('/addresses', { params });
        return response.data;
    },

    // Get single address
    getAddressById: async (id: string): Promise<ApiResponse<Address>> => {
        const response = await apiClient.get(`/addresses/${id}`);
        return response.data;
    },

    // Update address
    updateAddress: async (id: string, data: UpdateAddressData): Promise<ApiResponse<Address>> => {
        const response = await apiClient.put(`/addresses/${id}`, data);
        return response.data;
    },

    // Delete address
    deleteAddress: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.delete(`/addresses/${id}`);
        return response.data;
    },

    // Set default address
    setDefaultAddress: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.put(`/addresses/${id}/set-default`);
        return response.data;
    },

    // Search addresses
    searchAddresses: async (query: string): Promise<ApiResponse<Address[]>> => {
        const response = await apiClient.get('/addresses/search', { params: { q: query } });
        return response.data;
    },

    // Get nearby addresses
    getNearbyAddresses: async (latitude: number, longitude: number, radius?: number): Promise<ApiResponse<Address[]>> => {
        const response = await apiClient.get('/addresses/nearby', {
            params: { latitude, longitude, radius },
        });
        return response.data;
    },

    // Worker specific methods
    getWorkerAddresses: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Address>> => {
        const response = await apiClient.get('/addresses/worker/list', { params });
        return response.data;
    },

    createWorkerAddress: async (data: CreateAddressData): Promise<ApiResponse<Address>> => {
        const response = await apiClient.post('/addresses/worker', data);
        return response.data;
    },

    updateWorkerAddress: async (id: string, data: UpdateAddressData): Promise<ApiResponse<Address>> => {
        const response = await apiClient.put(`/addresses/worker/${id}`, data);
        return response.data;
    },
};
