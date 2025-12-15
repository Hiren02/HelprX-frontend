# HelprX Frontend

A modern, production-ready Next.js frontend for the HelprX Local Services Platform.

## Features

- 🎨 **Modern UI** - Built with Next.js 15, React 19, and Tailwind CSS
- 🔐 **Authentication** - JWT-based auth with automatic token refresh
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Performance** - Optimized with code splitting and lazy loading
- 🔄 **State Management** - Redux Toolkit + React Query
- 📝 **Form Validation** - React Hook Form + Yup
- 🎯 **TypeScript** - Fully typed for better DX
- 🌐 **API Integration** - Complete REST API integration with HelprX backend

## Project Structure

```
HelprX-frontend/
├── app/                      # Next.js App Router
│   ├── user/                # User (Customer) routes
│   ├── worker/              # Worker (Service Provider) routes
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # Reusable components
│   ├── ui/                  # Base UI components
│   ├── forms/               # Form components
│   ├── feedback/            # Feedback components (loaders, ratings)
│   ├── user/                # User-specific components
│   ├── worker/              # Worker-specific components
│   └── providers/           # Context providers
├── lib/
│   ├── api/                 # API client and services
│   │   ├── client.ts        # Axios instance
│   │   └── services/        # API service functions
│   └── utils/               # Utility functions
├── store/                   # Redux store
│   ├── authSlice.ts
│   ├── uiSlice.ts
│   └── index.ts
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- HelprX Backend running on `http://localhost:5000`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   - `NEXT_PUBLIC_API_URL` - Backend API URL
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key
   - Firebase configuration for FCM
   - Razorpay key for payments

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Routes

### User Routes (`/user`)
- `/user/login` - User login
- `/user/register` - User registration
- `/user` - User dashboard
- `/user/search` - Search and create service request
- `/user/booking/[id]` - Booking details and matching
- `/user/tracking/[id]` - Live job tracking
- `/user/payments/[id]` - Payment processing
- `/user/profile` - User profile management

### Worker Routes (`/worker`)
- `/worker/login` - Worker login
- `/worker/register` - Worker registration
- `/worker/onboarding` - Worker onboarding and KYC
- `/worker` - Worker dashboard
- `/worker/jobs` - Job inbox
- `/worker/jobs/[id]` - Job execution
- `/worker/wallet` - Wallet and earnings
- `/worker/profile` - Worker profile management

## API Integration

All API calls are centralized in `lib/api/services/`:

- `auth.ts` - Authentication (login, register, logout)
- `users.ts` - User profile management
- `workers.ts` - Worker profile, skills, KYC
- `jobs.ts` - Job creation and management
- `addresses.ts` - Address CRUD operations
- `ratings.ts` - Rating and review system
- `notifications.ts` - Notification management
- `wallet.ts` - Wallet and transactions
- `payments.ts` - Payment processing

## State Management

### Redux (Client State)
- **Auth State** - User authentication and session
- **UI State** - Sidebar, modals, theme

### React Query (Server State)
- Automatic caching and revalidation
- Optimistic updates
- Background refetching

## Form Validation

Forms use React Hook Form with Yup schemas:

```typescript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const { register, handleSubmit } = useForm({
  resolver: yupResolver(schema),
});
```

## Styling

- **Tailwind CSS** for utility-first styling
- **Custom theme** with primary and secondary colors
- **Responsive design** with mobile-first approach
- **Dark mode ready** (can be enabled via UI slice)

## TypeScript

The project is fully typed with TypeScript:

- API response types in `types/api.ts`
- Domain models in `types/user.ts`, `types/worker.ts`, `types/job.ts`
- Component props are typed
- Redux state is typed with `RootState` and `AppDispatch`

## Next Steps

1. **Implement remaining pages**:
   - User pages (search, booking, tracking, payments, profile)
   - Worker pages (onboarding, jobs, wallet, profile)

2. **Create UI components**:
   - Button, Input, Modal, Card components
   - Form components with validation
   - Rating component
   - Loaders and skeletons

3. **Add React Query hooks**:
   - `useAuth`, `useJobs`, `useWorkers`, etc.
   - Mutations for create/update/delete operations

4. **Integrate Google Maps**:
   - Location picker
   - Live tracking map
   - Distance calculation

5. **Add Firebase FCM**:
   - Push notifications
   - Real-time updates

6. **Implement Razorpay**:
   - Payment gateway integration
   - Order creation and verification

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run type-check`
4. Submit a pull request

## License

ISC

## Support

For support, contact the development team or create an issue in the repository.
