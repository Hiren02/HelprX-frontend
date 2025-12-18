import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingService } from '@/lib/api/services/ratings';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

export const useSubmitRating = () => {
    const queryClient = useQueryClient();

    const submitRatingMutation = useMutation({
        mutationFn: ratingService.submitRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            toast.success('Rating submitted successfully');
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Failed to submit rating');
        },
    });

    return {
        submitRating: submitRatingMutation.mutate,
        isSubmitting: submitRatingMutation.isPending,
    };
};
