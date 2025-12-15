export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    errors?: Array<{
        field: string;
        message: string;
    }>;
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export interface AuthResponse {
    user: {
        id: string;
        phone: string;
        name: string;
        email?: string;
        role: 'user' | 'worker' | 'admin';
    };
    accessToken: string;
    refreshToken: string;
}
