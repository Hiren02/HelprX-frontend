export interface User {
    id: string;
    name: string;
    phone: string;
    email?: string;
    role: 'user' | 'worker' | 'admin';
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserProfile extends User {
    addresses?: Address[];
}

export interface Address {
    id: string;
    userId?: string;
    label: string;
    addressLine: string;
    landmark?: string;
    city: string;
    state: string;
    pincode: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserStats {
    totalJobs: number;
    completedJobs: number;
    activeJobs: number;
    ratingsGiven: number;
}
