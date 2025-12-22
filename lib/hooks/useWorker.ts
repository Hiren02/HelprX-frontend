import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workerService, UpdateAvailabilityData, UpdateWorkerProfileData, UpdateSkillsData, UploadKYCData } from '../api/services/workers';
import toast from 'react-hot-toast';

export const useWorkerProfile = () => {
    return useQuery({
        queryKey: ['worker', 'profile'],
        queryFn: workerService.getProfile,
    });
};

export const useWorkerStats = () => {
    return useQuery({
        queryKey: ['worker', 'stats'],
        queryFn: workerService.getStats,
    });
};

export const useWorkerJobs = (params?: { status?: string; page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ['worker', 'jobs', params],
        queryFn: () => workerService.getJobs(params),
    });
};

export const useUpdateAvailability = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAvailabilityData) => workerService.updateAvailability(data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'profile'] });
            const message = variables.status === 'online' ? 'You are now Online' : 'You are now Offline';
            toast.success(message);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update availability');
        },
    });
};

export const useUpdateWorkerProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateWorkerProfileData) => workerService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'profile'] });
            toast.success('Profile updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        },
    });
};

export const useUpdateSkills = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateSkillsData) => workerService.updateSkills(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'profile'] });
            toast.success('Skills updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update skills');
        }
    });
};

export const useUploadKYC = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: UploadKYCData) => workerService.uploadKYC(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'profile'] });
            toast.success('KYC Documents uploaded successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to upload documents');
        }
    })
}

import { jobService } from '../api/services/jobs';

export const useAcceptJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => jobService.acceptJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'jobs'] });
            toast.success('Job accepted');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to accept job');
        }
    });
};

export const useDeclineJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) => jobService.declineJob(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'jobs'] });
            toast.success('Job declined');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to decline job');
        }
    });
};


export const useStartJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => jobService.startJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'jobs'] });
            // Also invalidate single job query which usually uses queryKey ['job', id] or similar.
            // But my useWorker.ts doesn't have useJob yet.
            // I'll add useWorkerJob as well.
            toast.success('Job started');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to start job');
        }
    });
};

export const useCompleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, finalPrice }: { id: string; finalPrice: number }) => jobService.completeJob(id, { finalPrice }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'jobs'] });
            queryClient.invalidateQueries({ queryKey: ['worker', 'stats'] }); // Update earnings
            queryClient.invalidateQueries({ queryKey: ['worker', 'wallet'] }); // Update balance
            toast.success('Job completed successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to complete job');
        }
    });
};

export const useWorkerJob = (id: string) => {
    return useQuery({
        queryKey: ['worker', 'job', id],
        queryFn: async () => {
            // Re-using jobService.getJobById which hits /jobs/:id
            // This endpoint is accessible to authenticated users (including workers if logic permits)
            // Or use workerService.getJobs and find? No, getJobById is better.
            // Documentation says /jobs/:id [Requires authentication]. Doesn't specify role strictness.
            return jobService.getJobById(id);
        },
        enabled: !!id,
    });
};

// Wallet Hooks
import { walletService } from '../api/services/wallet';

export const useWalletBalance = () => {
    return useQuery({
        queryKey: ['worker', 'wallet', 'balance'],
        queryFn: walletService.getBalance,
    });
};

export const useWalletTransactions = (params?: { page?: number; limit?: number; type?: 'credit' | 'debit' | 'payout' }) => {
    return useQuery({
        queryKey: ['worker', 'wallet', 'transactions', params],
        queryFn: () => walletService.getTransactions(params),
    });
};

export const useRequestPayout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (amount: number) => walletService.requestPayout(amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'wallet'] });
            toast.success('Payout requested successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to request payout');
        }
    });
};

export const useUpdateProfileImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (image: File) => workerService.updateProfileImage(image),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'profile'] });
            toast.success('Profile image updated');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update profile image');
        }
    });
};

import { addressService, CreateAddressData, UpdateAddressData } from '../api/services/addresses';

export const useWorkerAddresses = (params?: { page?: number; limit?: number }) => {
    return useQuery({
        queryKey: ['worker', 'addresses', params],
        queryFn: () => addressService.getWorkerAddresses(params),
    });
};

export const useCreateWorkerAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateAddressData) => addressService.createWorkerAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'addresses'] });
            toast.success('Address added successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add address');
        }
    });
};

export const useUpdateWorkerAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAddressData }) => addressService.updateWorkerAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['worker', 'addresses'] });
            toast.success('Address updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update address');
        }
    });
};
