'use client';

import React, { useState } from 'react';
import { useNotifications } from '@/lib/hooks/useNotifications';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDateTime } from '@/lib/utils/date';
import { Bell, Check, CheckCheck, Inbox, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WorkerNotificationsPage() {
    const [activeTab, setActiveTab] = useState<'unread' | 'all'>('unread');
    const { data: notificationsData, isLoading, markAsRead, markAllAsRead } = useNotifications();

    const notifications = notificationsData?.data || [];
    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => !n.isRead)
        : notifications;

    const handleMarkAsRead = (id: string) => {
        markAsRead.mutate(id);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Worker Alerts</h1>
                        <p className="text-gray-500 mt-1">Manage your job invites and platform updates</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button
                            onClick={() => markAllAsRead.mutate()}
                            disabled={markAllAsRead.isPending}
                            variant="outline"
                            className="flex items-center gap-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300"
                        >
                            <CheckCheck className="w-4 h-4 text-secondary-600" />
                            Mark all as read
                        </Button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6 gap-8">
                    <button
                        onClick={() => setActiveTab('unread')}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'unread'
                            ? 'text-secondary-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Unread
                        {unreadCount > 0 && (
                            <span className="ml-2 bg-secondary-600 text-white px-2 py-0.5 rounded-full text-[10px]">
                                {unreadCount}
                            </span>
                        )}
                        {activeTab === 'unread' && (
                            <motion.div
                                layoutId="activeTabWorker"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-600"
                            />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'all'
                            ? 'text-secondary-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        History
                        {activeTab === 'all' && (
                            <motion.div
                                layoutId="activeTabWorker"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary-600"
                            />
                        )}
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-secondary-600 animate-spin mb-4" />
                        <p className="text-gray-500 font-medium">Loading alerts...</p>
                    </div>
                ) : filteredNotifications.length > 0 ? (
                    <div className="space-y-2">
                        {filteredNotifications.map((notification, index) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                key={notification.id}
                            >
                                <Card
                                    className={`relative group p-0 transition-all duration-200 border-gray-100 shadow-sm hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-secondary-600 bg-secondary-50/10' : ''}`}
                                >
                                    <div className="flex items-start gap-4 p-4">
                                        <div className={`mt-1 p-2 rounded-lg ${!notification.isRead ? 'bg-secondary-100 text-secondary-600' : 'bg-gray-100 text-gray-500'}`}>
                                            <Bell className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`font-bold text-gray-900 ${!notification.isRead ? 'text-lg' : 'text-base'}`}>
                                                        {notification.title}
                                                    </h3>
                                                    {!notification.isRead && (
                                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-secondary-600 text-white uppercase tracking-wider">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap font-medium">
                                                    {formatDateTime(notification.createdAt || (notification as any).created_at)}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed mb-3">
                                                {notification.body || notification.message}
                                            </p>
                                            {!notification.isRead && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleMarkAsRead(notification.id)}
                                                    className="text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 px-0 h-8 flex items-center gap-1.5"
                                                >
                                                    <Check className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Mark as read</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <Card className="flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-gray-200 bg-transparent">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                            <Inbox className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No alerts at the moment</h3>
                        <p className="text-gray-500 max-w-sm">
                            We'll let you know when new jobs are available or when there's an update to your account.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}
