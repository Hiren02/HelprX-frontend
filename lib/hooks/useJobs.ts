import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobService, GetJobsParams } from '@/lib/api/services/jobs';
import toast from 'react-hot-toast';

export const useJobs = (params?: GetJobsParams) => {
    const queryClient = useQueryClient();

    // Get jobs list
    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ['jobs', params],
        queryFn: () => jobService.getJobs(params),
    });

    // Create job mutation
    const createJobMutation = useMutation({
        mutationFn: jobService.createJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job created successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create job');
        },
    });

    // Cancel job mutation
    const cancelJobMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) =>
            jobService.cancelJob(id, { cancellationReason: reason }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job cancelled');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to cancel job');
        },
    });

    // Accept job mutation (Worker)
    const acceptJobMutation = useMutation({
        mutationFn: jobService.acceptJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job accepted!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to accept job');
        },
    });

    // Decline job mutation (Worker)
    const declineJobMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) =>
            jobService.declineJob(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job declined');
        },
    });

    // Start job mutation (Worker)
    const startJobMutation = useMutation({
        mutationFn: jobService.startJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job started!');
        },
    });

    // Complete job mutation (Worker)
    const completeJobMutation = useMutation({
        mutationFn: ({ id, finalPrice }: { id: string; finalPrice: number }) =>
            jobService.completeJob(id, { finalPrice }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast.success('Job completed!');
        },
    });

    return {
        jobs: jobs?.data || [],
        isLoading,
        error,
        createJob: createJobMutation.mutate,
        cancelJob: cancelJobMutation.mutate,
        acceptJob: acceptJobMutation.mutate,
        declineJob: declineJobMutation.mutate,
        startJob: startJobMutation.mutate,
        completeJob: completeJobMutation.mutate,
        isCreating: createJobMutation.isPending,
    };
};

// Hook for single job
export const useJob = (id: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['job', id],
        queryFn: () => jobService.getJobById(id),
        enabled: !!id,
    });

    return {
        job: data?.data,
        isLoading,
        error,
    };
};
