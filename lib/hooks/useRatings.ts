import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ratingService } from '@/lib/api/services/ratings';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const useSubmitRating = () => {
    const queryClient = useQueryClient();

    const submitRatingMutation = useMutation({
        mutationFn: ratingService.submitRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            queryClient.invalidateQueries({ queryKey: ['job'] });
            toast.success('Rating submitted successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to submit rating');
        },
    });

    return {
        submitRating: submitRatingMutation.mutateAsync,
        isSubmitting: submitRatingMutation.isPending,
    };
};

export const useJobRating = (jobId: string) => {
    return useQuery({
        queryKey: ['ratings', 'job', jobId],
        queryFn: () => ratingService.getJobRating(jobId),
        enabled: !!jobId,
    });
};
