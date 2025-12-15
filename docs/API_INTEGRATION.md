# API Integration Guide

## Overview

This guide explains how to integrate the HelprX frontend with the backend API.

## API Client Configuration

The API client is configured in `lib/api/client.ts`:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
```

### Features
- Automatic token attachment to requests
- Automatic token refresh on 401 errors
- Request/response interceptors
- Error handling

## Available Services

### 1. Authentication Service (`lib/api/services/auth.ts`)

```typescript
import { authService } from '@/lib/api/services/auth';

// Register
await authService.register({
  phone: '9876543210',
  password: 'password123',
  name: 'John Doe',
  role: 'user'
});

// Login
await authService.login({
  phone: '9876543210',
  password: 'password123'
});

// Logout
await authService.logout();

// Get current user
await authService.getCurrentUser();
```

### 2. Job Service (`lib/api/services/jobs.ts`)

```typescript
import { jobService } from '@/lib/api/services/jobs';

// Create job
await jobService.createJob({
  addressId: 'addr-123',
  serviceType: 'plumbing',
  title: 'Fix leaking tap',
  description: 'Kitchen tap is leaking'
});

// Get jobs
await jobService.getJobs({ status: 'in_progress' });

// Get single job
await jobService.getJobById('job-123');

// Cancel job (User)
await jobService.cancelJob('job-123', {
  cancellationReason: 'Found another provider'
});

// Accept job (Worker)
await jobService.acceptJob('job-123');

// Start job (Worker)
await jobService.startJob('job-123');

// Complete job (Worker)
await jobService.completeJob('job-123', {
  finalPrice: 500
});
```

### 3. Address Service (`lib/api/services/addresses.ts`)

```typescript
import { addressService } from '@/lib/api/services/addresses';

// Create address
await addressService.createAddress({
  label: 'Home',
  addressLine: '123 Main Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  latitude: 19.0760,
  longitude: 72.8777
});

// Get all addresses
await addressService.getAddresses();

// Update address
await addressService.updateAddress('addr-123', {
  label: 'Office'
});

// Delete address
await addressService.deleteAddress('addr-123');

// Set default address
await addressService.setDefaultAddress('addr-123');
```

### 4. Worker Service (`lib/api/services/workers.ts`)

```typescript
import { workerService } from '@/lib/api/services/workers';

// Get worker profile
await workerService.getProfile();

// Update profile
await workerService.updateProfile({
  name: 'Rajesh Kumar',
  companyName: 'Kumar Plumbing Services',
  experienceYears: 5
});

// Update skills
await workerService.updateSkills({
  skills: [
    { skill: 'plumbing', level: 4 },
    { skill: 'electrical', level: 3 }
  ]
});

// Update availability
await workerService.updateAvailability({
  status: 'online'
});

// Upload KYC documents
await workerService.uploadKYC({
  documents: {
    aadhar: 'base64-string',
    pan: 'base64-string'
  }
});
```

### 5. Rating Service (`lib/api/services/ratings.ts`)

```typescript
import { ratingService } from '@/lib/api/services/ratings';

// Submit rating
await ratingService.submitRating({
  jobId: 'job-123',
  rating: 5,
  review: 'Excellent service!'
});

// Get worker ratings
await ratingService.getWorkerRatings('worker-123');

// Get job rating
await ratingService.getJobRating('job-123');
```

### 6. Wallet Service (`lib/api/services/wallet.ts`)

```typescript
import { walletService } from '@/lib/api/services/wallet';

// Get balance
await walletService.getBalance();

// Get transactions
await walletService.getTransactions({
  type: 'credit',
  page: 1,
  limit: 10
});

// Request payout
await walletService.requestPayout(5000);
```

### 7. Payment Service (`lib/api/services/payments.ts`)

```typescript
import { paymentService } from '@/lib/api/services/payments';

// Create payment order
await paymentService.createOrder({
  amount: 500,
  jobId: 'job-123',
  currency: 'INR'
});

// Verify payment
await paymentService.verifyPayment({
  orderId: 'order-123',
  paymentId: 'pay-123',
  signature: 'signature-string'
});
```

## Using React Query Hooks

### useAuth Hook

```typescript
import { useAuth } from '@/lib/hooks';

function LoginComponent() {
  const { login, isLoading } = useAuth();

  const handleLogin = () => {
    login({
      phone: '9876543210',
      password: 'password123'
    });
  };

  return (
    <button onClick={handleLogin} disabled={isLoading}>
      {isLoading ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

### useJobs Hook

```typescript
import { useJobs } from '@/lib/hooks';

function JobsList() {
  const { jobs, isLoading, createJob } = useJobs({ status: 'in_progress' });

  const handleCreateJob = () => {
    createJob({
      addressId: 'addr-123',
      serviceType: 'plumbing',
      title: 'Fix tap',
      description: 'Leaking tap'
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {jobs.map(job => (
        <div key={job.id}>{job.title}</div>
      ))}
      <button onClick={handleCreateJob}>Create Job</button>
    </div>
  );
}
```

### useAddresses Hook

```typescript
import { useAddresses } from '@/lib/hooks';

function AddressList() {
  const { addresses, isLoading, createAddress, deleteAddress } = useAddresses();

  const handleAddAddress = () => {
    createAddress({
      label: 'Home',
      addressLine: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      latitude: 19.0760,
      longitude: 72.8777
    });
  };

  return (
    <div>
      {addresses.map(addr => (
        <div key={addr.id}>
          {addr.label}
          <button onClick={() => deleteAddress(addr.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleAddAddress}>Add Address</button>
    </div>
  );
}
```

## Error Handling

All API calls include automatic error handling with toast notifications:

```typescript
try {
  await jobService.createJob(data);
  // Success toast shown automatically
} catch (error) {
  // Error toast shown automatically
  console.error('Job creation failed:', error);
}
```

## Token Management

Tokens are automatically managed:

1. **Storage**: Stored in localStorage
2. **Attachment**: Automatically attached to all requests
3. **Refresh**: Automatically refreshed on 401 errors
4. **Cleanup**: Cleared on logout

## API Response Format

All API responses follow this format:

```typescript
{
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
```

## Pagination

Paginated endpoints return:

```typescript
{
  success: boolean;
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

## Best Practices

1. **Use React Query hooks** for data fetching
2. **Handle loading states** in components
3. **Show error messages** to users
4. **Invalidate queries** after mutations
5. **Use TypeScript types** for all API calls
6. **Test API integration** with backend running

## Testing API Integration

1. Start backend server
2. Update `.env.local` with correct API URL
3. Test authentication flow
4. Test CRUD operations
5. Check browser network tab for requests
6. Verify error handling

## Troubleshooting

### CORS Errors
- Ensure backend allows frontend origin
- Check backend CORS configuration

### 401 Errors
- Check if token is valid
- Verify token refresh logic
- Check localStorage for tokens

### Network Errors
- Verify backend is running
- Check API URL in `.env.local`
- Inspect browser console

### Type Errors
- Ensure types match backend API
- Update TypeScript interfaces if needed
- Run `npm run type-check`
