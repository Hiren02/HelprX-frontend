import apiClient from '../client';
import { ApiResponse, PaginatedResponse } from '@/types/api';
import { Worker, WorkerStats, WorkerSkill, ServiceType } from '@/types/worker';
import { Job } from '@/types/job';

export interface UpdateWorkerProfileData {
    name?: string;
    companyName?: string;
    bio?: string;
    experienceYears?: number;
    latitude?: number;
    longitude?: number;
}

export interface UpdateSkillsData {
    skills: Array<{
        skill: ServiceType;
        level: 1 | 2 | 3 | 4;
    }>;
}

export interface UpdateAvailabilityData {
    status: 'online' | 'offline' | 'busy';
}

export interface UploadKYCData {
    documents: {
        aadhar?: string;
        pan?: string;
        drivingLicense?: string;
        photo?: string;
    };
}

export const workerService = {
    // Get worker profile
    getProfile: async (): Promise<ApiResponse<Worker>> => {
        const response = await apiClient.get('/workers/profile');
        return response.data;
    },

    // Update worker profile
    updateProfile: async (data: UpdateWorkerProfileData): Promise<ApiResponse<Worker>> => {
        const response = await apiClient.put('/workers/profile', data);
        return response.data;
    },

    // Update skills
    updateSkills: async (data: UpdateSkillsData): Promise<ApiResponse<WorkerSkill[]>> => {
        const response = await apiClient.put('/workers/skills', data);
        return response.data;
    },

    // Update availability status
    updateAvailability: async (data: UpdateAvailabilityData): Promise<ApiResponse> => {
        const response = await apiClient.put('/workers/availability', data);
        return response.data;
    },

    // Upload KYC documents
    uploadKYC: async (data: UploadKYCData): Promise<ApiResponse> => {
        const response = await apiClient.post('/workers/kyc', data);
        return response.data;
    },

    // Get worker statistics
    getStats: async (): Promise<ApiResponse<WorkerStats>> => {
        const response = await apiClient.get('/workers/stats');
        return response.data;
    },

    // Get worker jobs
    getJobs: async (params?: { status?: string; page?: number; limit?: number }): Promise<PaginatedResponse<Job>> => {
        const response = await apiClient.get('/workers/jobs', { params });
        return response.data;
    },
};
