import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ratingService } from '@/lib/api/services/ratings';
import toast from 'react-hot-toast';

export const useRatings = () => {
    const queryClient = useQueryClient();

    // Submit rating mutation
    const submitRatingMutation = useMutation({
        mutationFn: ratingService.submitRating,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ratings'] });
            toast.success('Rating submitted successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to submit rating');
        },
    });

    return {
        submitRating: submitRatingMutation.mutate,
        isSubmitting: submitRatingMutation.isPending,
    };
};
