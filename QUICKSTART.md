# HelprX Frontend - Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- HelprX Backend running (optional for development)

### Step 1: Install Dependencies
```bash
cd HelprX-frontend
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📱 Available Routes

### Public Routes
- `/` - Landing page
- `/user/login` - User login
- `/user/register` - User registration
- `/worker/login` - Worker login

### User Routes (Protected)
- `/user` - User dashboard
- `/user/search` - Create service request
- `/user/jobs/[id]` - Track job
- `/user/profile` - Manage profile

### Worker Routes (Protected)
- `/worker` - Worker dashboard
- `/worker/jobs` - Job inbox
- `/worker/jobs/[id]` - Execute job
- `/worker/wallet` - View earnings

---

## 🧪 Testing the App

### Test User Login
1. Go to `/user/login`
2. Enter phone: `9876543210`
3. Enter password: `password123`
4. Click "Sign In"

### Test Worker Login
1. Go to `/worker/login`
2. Enter phone: `9876543211`
3. Enter password: `password123`
4. Click "Sign In"

> **Note**: These are mock credentials. Connect to backend for real authentication.

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint

# Fix linting issues
npm run lint -- --fix
```

---

## 📂 Project Structure

```
HelprX-frontend/
├── app/                    # Next.js App Router
│   ├── user/              # User pages
│   ├── worker/            # Worker pages
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   └── feedback/         # Feedback components
├── lib/
│   ├── api/              # API integration
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
├── store/                # Redux store
├── types/                # TypeScript types
└── public/               # Static assets
```

---

## 🎨 Key Features

### ✅ Implemented
- Complete authentication system
- User & Worker dashboards
- Job creation and tracking
- Wallet management
- Profile management
- Responsive design
- Form validation
- API integration layer

### 🚧 Pending
- Payment gateway integration
- Google Maps integration
- Firebase push notifications
- Real-time updates
- Image uploads

---

## 🔧 Common Tasks

### Adding a New Page
1. Create file in `app/[route]/page.tsx`
2. Use `'use client'` for client components
3. Import components from `@/components`
4. Add to navigation if needed

### Creating a New Component
1. Create in `components/[category]/ComponentName.tsx`
2. Export from component file
3. Import using `@/components/[category]/ComponentName`

### Adding API Integration
1. Create service in `lib/api/services/`
2. Create hook in `lib/hooks/`
3. Use hook in components

### Styling Components
- Use Tailwind CSS utility classes
- Use `cn()` helper for conditional classes
- Follow existing component patterns

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Type Errors
```bash
# Run type checking
npm run type-check

# Check specific file
npx tsc --noEmit [file-path]
```

### API Connection Issues
1. Check `.env.local` has correct API URL
2. Ensure backend is running
3. Check browser console for errors
4. Verify CORS settings on backend

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

---

## 📝 License

ISC

---

**Happy Coding! 🚀**
