import { ServiceType } from './worker';

export interface Job {
    id: string;
    userId: string;
    workerId?: string; // This might be used in some contexts, keeping it
    assignedWorkerId?: string; // Adding this matching backend model
    addressId: string;
    serviceType: ServiceType;
    title: string;
    description?: string;
    status: JobStatus;
    priceEstimate?: number;
    finalPrice?: number;
    surgeMultiplier?: number;
    preferredTimeStart?: string;
    preferredTimeEnd?: string;
    attachments?: string[];
    cancellationReason?: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    // Relations
    user?: {
        id: string;
        name: string;
        phone: string;
    };
    worker?: {
        id: string;
        name: string;
        phone: string;
        avgRating: number;
    };
    assignedWorker?: {
        id: string;
        name: string;
        phone: string;
        avgRating: number;
        profileImage?: string;
    };
    address?: {
        id: string;
        label?: string;
        addressLine: string;
        city: string;
        state?: string;
        pincode?: string;
        latitude: number;
        longitude: number;
    };
}

export type JobStatus =
    | 'created'
    | 'matching'
    | 'assigned'
    | 'in_progress'
    | 'completed'
    | 'cancelled'
    | 'disputed';

export interface JobCandidate {
    id: string;
    jobId: string;
    workerId: string;
    score: number;
    distance: number;
    status: 'pending' | 'accepted' | 'declined' | 'timeout';
    declineReason?: string;
    createdAt: string;
    updatedAt: string;
    worker?: {
        id: string;
        name: string;
        phone: string;
        avgRating: number;
        completedJobs: number;
    };
}
