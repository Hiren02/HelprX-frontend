import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Truncate text
export const truncate = (text: string, length: number): string => {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

// Capitalize first letter
export const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

// Convert service type to readable label
export const getServiceLabel = (serviceType: string): string => {
    const labels: Record<string, string> = {
        plumbing: 'Plumbing',
        electrical: 'Electrical',
        tutoring: 'Tutoring',
        carpentry: 'Carpentry',
        painting: 'Painting',
        cleaning: 'Cleaning',
        pet_care: 'Pet Care',
        handyman: 'Handyman',
        ac_repair: 'AC Repair',
        appliance_repair: 'Appliance Repair',
        pest_control: 'Pest Control',
        gardening: 'Gardening',
        other: 'Other',
    };
    return labels[serviceType] || capitalize(serviceType);
};

// Get status badge color
export const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
        created: 'bg-gray-100 text-gray-800',
        matching: 'bg-blue-100 text-blue-800',
        assigned: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-purple-100 text-purple-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        disputed: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};
