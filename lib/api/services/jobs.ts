import apiClient from '../client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Job, JobStatus } from '@/types/job';
import { ServiceType } from '@/types/worker';

export interface CreateJobData {
    addressId: string;
    serviceType: ServiceType;
    title: string;
    description?: string;
    preferredTimeStart?: string;
    preferredTimeEnd?: string;
    attachments?: string[];
}

export interface GetJobsParams {
    page?: number;
    limit?: number;
    status?: JobStatus;
    startDate?: string;
    endDate?: string;
}

export interface CancelJobData {
    cancellationReason: string;
}

export interface CompleteJobData {
    finalPrice: number;
}

export const jobService = {
    // Create new job
    createJob: async (data: CreateJobData): Promise<ApiResponse<Job>> => {
        const response = await apiClient.post('/jobs', data);
        return response.data;
    },

    // Get user's jobs
    getJobs: async (params?: GetJobsParams): Promise<PaginatedResponse<Job>> => {
        const response = await apiClient.get('/jobs', { params });
        return response.data;
    },

    // Get job by ID
    getJobById: async (id: string): Promise<ApiResponse<Job>> => {
        const response = await apiClient.get(`/jobs/${id}`);
        return response.data;
    },

    // Cancel job (User)
    cancelJob: async (id: string, data: CancelJobData): Promise<ApiResponse> => {
        const response = await apiClient.put(`/jobs/${id}/cancel`, data);
        return response.data;
    },

    // Accept job (Worker)
    acceptJob: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.post(`/jobs/${id}/accept`);
        return response.data;
    },

    // Decline job (Worker)
    declineJob: async (id: string, reason: string): Promise<ApiResponse> => {
        const response = await apiClient.post(`/jobs/${id}/decline`, { reason });
        return response.data;
    },

    // Start job (Worker)
    startJob: async (id: string): Promise<ApiResponse> => {
        const response = await apiClient.post(`/jobs/${id}/start`);
        return response.data;
    },

    // Complete job (Worker)
    completeJob: async (id: string, data: CompleteJobData): Promise<ApiResponse> => {
        const response = await apiClient.post(`/jobs/${id}/complete`, data);
        return response.data;
    },
};
