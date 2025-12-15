import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addressService } from '@/lib/api/services/addresses';
import toast from 'react-hot-toast';

export const useAddresses = () => {
    const queryClient = useQueryClient();

    // Get addresses
    const { data: addresses, isLoading } = useQuery({
        queryKey: ['addresses'],
        queryFn: () => addressService.getAddresses(),
    });

    // Create address mutation
    const createAddressMutation = useMutation({
        mutationFn: addressService.createAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Address added successfully!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add address');
        },
    });

    // Update address mutation
    const updateAddressMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            addressService.updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Address updated!');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update address');
        },
    });

    // Delete address mutation
    const deleteAddressMutation = useMutation({
        mutationFn: addressService.deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Address deleted');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete address');
        },
    });

    // Set default address mutation
    const setDefaultMutation = useMutation({
        mutationFn: addressService.setDefaultAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Default address updated');
        },
    });

    return {
        addresses: addresses?.data || [],
        isLoading,
        createAddress: createAddressMutation.mutate,
        updateAddress: updateAddressMutation.mutate,
        deleteAddress: deleteAddressMutation.mutate,
        setDefaultAddress: setDefaultMutation.mutate,
        isCreating: createAddressMutation.isPending,
    };
};
