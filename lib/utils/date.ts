import { format, formatDistance, formatRelative, parseISO, isValid } from 'date-fns';

// Format date to readable string
export const formatDate = (date: string | Date, formatStr: string = 'PPP'): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, formatStr);
};

// Format date to time ago (e.g., "2 hours ago")
export const formatTimeAgo = (date: string | Date): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return formatDistance(dateObj, new Date(), { addSuffix: true });
};

// Format date relative to now
export const formatRelativeDate = (date: string | Date): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return formatRelative(dateObj, new Date());
};

// Format time (HH:mm)
export const formatTime = (date: string | Date): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, 'HH:mm');
};

// Format date and time
export const formatDateTime = (date: string | Date): string => {
    if (!date) return 'N/A';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, 'PPP p');
};
