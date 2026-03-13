import React, { useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../api/services/notifications';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import toast from 'react-hot-toast';

export const useNotifications = (unreadOnly: boolean = false) => {
    const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);
    const queryClient = useQueryClient();
    const lastNotifiedId = useRef<string | null>(null);

    const query = useQuery({
        queryKey: ['notifications', { unreadOnly }],
        queryFn: () => notificationService.getNotifications({ unreadOnly, limit: 10 }),
        enabled: isAuthenticated && (typeof window !== 'undefined' && !!localStorage.getItem('accessToken')),
        refetchInterval: 10000, // Poll every 10 seconds
    });

    const markAsRead = useMutation({
        mutationFn: (id: string) => notificationService.markAsRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });

    const markAllAsRead = useMutation({
        mutationFn: () => notificationService.markAllAsRead(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
    });

    useEffect(() => {
        if (query.data?.data && query.data.data.length > 0) {
            const latestNotification = query.data.data[0];

            // If it's a new notification and not already notified
            if (latestNotification.id !== lastNotifiedId.current && !latestNotification.isRead) {
                lastNotifiedId.current = latestNotification.id;

                // Trigger toast
                toast.success(
                    <div>
                        <p className="font-bold" > {latestNotification.title} </p>
                        < p className="text-sm" > {latestNotification.body || latestNotification.message} </p>
                    </div>,
                    { duration: 5000 }
                );

                // We might want to invalidate other related queries if needed
                // e.g. if job_available, invalidate job inbox
                if (latestNotification.type === 'job_available') {
                    queryClient.invalidateQueries({ queryKey: ['worker', 'inbox'] });
                }
            }
        }
    }, [query.data, queryClient]);

    return {
        ...query,
        markAsRead,
        markAllAsRead,
    };
};
