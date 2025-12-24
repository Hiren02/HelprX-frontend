import apiClient from '../client';
import { ApiResponse } from '@/types/api';

export interface MatchWorker {
    workerId: string;
    workerName: string;
    workerPhone: string;
    distance: string;
    rating: number;
    completedJobs: number;
    skills: any[];
    score: number;
    reason: string;
    profileImage?: string;
}

export interface MatchingResponse {
    mode: 'existing_job' | 'preview';
    jobId: string | null;
    searchRadius: number;
    totalMatches: number;
    matches: MatchWorker[];
}

export interface FindWorkersParams {
    jobId?: string;
    serviceType?: string;
    addressId?: string;
    radiusKm?: number;
}

export const matchingService = {
    findWorkers: async (params: FindWorkersParams): Promise<ApiResponse<MatchingResponse>> => {
        const response = await apiClient.post('/matching/find-workers', params);
        return response.data;
    },

    getJobMatches: async (jobId: string): Promise<ApiResponse<any>> => {
        const response = await apiClient.get(`/matching/job/${jobId}`);
        return response.data;
    },

    getBestMatch: async (jobId: string): Promise<ApiResponse<any>> => {
        const response = await apiClient.get(`/matching/job/${jobId}/best`);
        return response.data;
    },
};
