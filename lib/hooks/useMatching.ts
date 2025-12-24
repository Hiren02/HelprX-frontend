import { useMutation, useQuery } from '@tanstack/react-query';
import { matchingService, FindWorkersParams } from '@/lib/api/services/matching';

export const useMatching = () => {
    // Mutation to find workers (used for both preview and existing job)
    const findWorkersMutation = useMutation({
        mutationFn: (params: FindWorkersParams) => matchingService.findWorkers(params),
    });

    return {
        findWorkers: findWorkersMutation.mutate,
        findWorkersAsync: findWorkersMutation.mutateAsync,
        isFinding: findWorkersMutation.isPending,
        matchResults: findWorkersMutation.data?.data,
    };
};

export const useJobMatches = (jobId: string) => {
    return useQuery({
        queryKey: ['job-matches', jobId],
        queryFn: () => matchingService.getJobMatches(jobId),
        enabled: !!jobId,
    });
};
