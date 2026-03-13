'use client';

import React from 'react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

interface NotificationProviderProps {
    children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

    // This hook handles its own side effects (toasts)
    // We only enable it if authenticated
    useNotifications(true);

    return <>{children}</>;
};
