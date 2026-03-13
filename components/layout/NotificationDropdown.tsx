'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck, Inbox, Loader2, X } from 'lucide-react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { formatDateTime } from '@/lib/utils/date';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';

export const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState<'unread' | 'all'>('unread');
    const { user } = useAppSelector((state: RootState) => state.auth);
    const { data: notificationsData, isLoading, markAsRead, markAllAsRead } = useNotifications();

    const notifications = notificationsData?.data || [];
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => !n.isRead)
        : notifications;

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleMarkAsRead = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        markAsRead.mutate(id);
    };

    const handleMarkAllAsRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        markAllAsRead.mutate();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
            >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] overflow-hidden"
                    >
                        <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
                            <h3 className="font-bold text-gray-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <button
                                    onClick={handleMarkAllAsRead}
                                    disabled={markAllAsRead.isPending}
                                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 disabled:opacity-50 flex items-center gap-1"
                                >
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b">
                            <button
                                onClick={() => setActiveTab('unread')}
                                className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center justify-center gap-2 ${activeTab === 'unread'
                                    ? 'border-primary-600 text-primary-600 bg-primary-50/30'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Unread
                                {unreadCount > 0 && (
                                    <span className="bg-primary-600 text-white px-1.5 py-0.5 rounded-full text-[10px]">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('all')}
                                className={`flex-1 py-2.5 text-xs font-bold transition-all border-b-2 ${activeTab === 'all'
                                    ? 'border-primary-600 text-primary-600 bg-primary-50/30'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                All
                            </button>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            {isLoading ? (
                                <div className="p-8 flex flex-col items-center justify-center text-gray-400">
                                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                    <p className="text-sm">Loading notifications...</p>
                                </div>
                            ) : filteredNotifications.length > 0 ? (
                                <div className="divide-y divide-gray-50">
                                    {filteredNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={(e) => !notification.isRead && handleMarkAsRead(e, notification.id)}
                                            className={`p-4 hover:bg-gray-50 transition-colors relative group duration-200 cursor-pointer ${!notification.isRead ? 'bg-primary-50/30' : ''
                                                }`}
                                        >
                                            <div className="flex gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between gap-2 mb-0.5">
                                                        <p className={`text-sm font-bold text-gray-900 truncate ${!notification.isRead ? '' : 'text-gray-600'}`}>
                                                            {notification.title}
                                                        </p>
                                                        {!notification.isRead && (
                                                            <span className="h-1.5 w-1.5 rounded-full bg-primary-600 flex-shrink-0" title="New" />
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                                                        {notification.body || notification.message}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 font-medium">
                                                        {formatDateTime(notification.createdAt || (notification as any).created_at)}
                                                    </p>
                                                </div>
                                                {!notification.isRead && (
                                                    <button
                                                        onClick={(e) => handleMarkAsRead(e, notification.id)}
                                                        className="h-6 w-6 flex items-center justify-center rounded-full text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 flex flex-col items-center justify-center text-gray-400 text-center">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                                        <Inbox className="w-8 h-8" />
                                    </div>
                                    <p className="font-medium text-gray-900 mb-1">No notifications</p>
                                    <p className="text-sm">We'll notify you when something important happens.</p>
                                </div>
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <Link
                                href={user?.role === 'worker' ? "/worker/notifications" : "/user/notifications"}
                                className="block p-3 text-center text-sm font-semibold text-gray-600 hover:bg-gray-50 border-t transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                View all notifications
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
