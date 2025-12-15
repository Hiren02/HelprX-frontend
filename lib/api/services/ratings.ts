import apiClient from '../client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Rating } from '@/types/common';

export interface SubmitRatingData {
    jobId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    review?: string;
}

export const ratingService = {
    // Submit rating
    submitRating: async (data: SubmitRatingData): Promise<ApiResponse<Rating>> => {
        const response = await apiClient.post('/ratings', data);
        return response.data;
    },

    // Get worker ratings
    getWorkerRatings: async (workerId: string, params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Rating>> => {
        const response = await apiClient.get(`/ratings/worker/${workerId}`, { params });
        return response.data;
    },

    // Get job rating
    getJobRating: async (jobId: string): Promise<ApiResponse<Rating>> => {
        const response = await apiClient.get(`/ratings/job/${jobId}`);
        return response.data;
    },

    // Get my ratings
    getMyRatings: async (params?: { page?: number; limit?: number }): Promise<PaginatedResponse<Rating>> => {
        const response = await apiClient.get('/ratings/my-ratings', { params });
        return response.data;
    },
};
