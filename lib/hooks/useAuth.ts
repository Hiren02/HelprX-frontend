import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/api/services/auth';
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/authSlice';
import { setAccessToken, setRefreshToken, clearAuthData } from '@/lib/utils/auth';
import toast from 'react-hot-toast';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    // Login mutation
    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (response) => {
            if (response.success && response.data) {
                const { user, accessToken, refreshToken } = response.data;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                dispatch(setUser(user as User));
                toast.success('Login successful!');
            }
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Login failed');
        },
    });

    // Register mutation
    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (response) => {
            if (response.success && response.data) {
                const { user, accessToken, refreshToken } = response.data;
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                dispatch(setUser(user as User));
                toast.success('Registration successful!');
            }
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || 'Registration failed');
        },
    });

    // Logout mutation
    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            dispatch(clearUser());
            clearAuthData();
            queryClient.clear();
            toast.success('Logged out successfully');
        },
    });

    // Get current user
    const { data: currentUser, isLoading: isLoadingUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: () => authService.getCurrentUser(),
        enabled: !!localStorage.getItem('accessToken'),
    });

    return {
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        currentUser: currentUser?.data,
        isLoading: loginMutation.isPending || registerMutation.isPending || isLoadingUser,
    };
};
