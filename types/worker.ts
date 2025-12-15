export interface Worker {
    id: string;
    userId: string;
    name: string;
    phone: string;
    email?: string;
    companyName?: string;
    bio?: string;
    experienceYears?: number;
    latitude?: number;
    longitude?: number;
    availabilityStatus: 'online' | 'offline' | 'busy';
    kycStatus: 'pending' | 'submitted' | 'verified' | 'rejected';
    kycDocuments?: {
        aadhar?: string;
        pan?: string;
        drivingLicense?: string;
        photo?: string;
    };
    avgRating: number;
    totalRatings: number;
    completedJobs: number;
    skills: WorkerSkill[];
    createdAt: string;
    updatedAt: string;
}

export interface WorkerSkill {
    id: string;
    workerId: string;
    skill: ServiceType;
    level: 1 | 2 | 3 | 4; // 1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert
    createdAt: string;
}

export interface WorkerStats {
    totalJobs: number;
    completedJobs: number;
    activeJobs: number;
    totalRatings: number;
    avgRating: number;
    acceptanceRate: number;
    walletBalance: number;
    totalEarnings: number;
}

export type ServiceType =
    | 'plumbing'
    | 'electrical'
    | 'tutoring'
    | 'carpentry'
    | 'painting'
    | 'cleaning'
    | 'pet_care'
    | 'handyman'
    | 'ac_repair'
    | 'appliance_repair'
    | 'pest_control'
    | 'gardening'
    | 'other';
