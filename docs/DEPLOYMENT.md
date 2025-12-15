# Deployment Guide

## Overview

This guide covers deploying the HelprX frontend to various platforms.

---

## Vercel (Recommended)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure project:
  - Framework Preset: Next.js
  - Root Directory: `./`
  - Build Command: `npm run build`
  - Output Directory: `.next`

3. **Environment Variables**
Add in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api/v1
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
```

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Visit your deployment URL

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation

---

## Netlify

### Steps

1. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

2. **Environment Variables**
Same as Vercel (see above)

3. **Deploy**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## AWS Amplify

### Steps

1. **Connect Repository**
- Open AWS Amplify Console
- Click "New App" → "Host web app"
- Connect your GitHub repository

2. **Build Settings**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

3. **Environment Variables**
Add in Amplify Console → Environment variables

4. **Deploy**
- Save and deploy
- Monitor build progress

---

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:5000/api/v1
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: helprx-backend:latest
    ports:
      - "5000:5000"
    restart: unless-stopped
```

### Build and Run

```bash
# Build image
docker build -t helprx-frontend .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1 \
  helprx-frontend

# Or use docker-compose
docker-compose up -d
```

---

## Self-Hosted (VPS)

### Prerequisites
- Ubuntu 20.04+ server
- Node.js 18+
- Nginx
- PM2

### Steps

1. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

2. **Deploy Application**
```bash
# Clone repository
git clone <your-repo-url>
cd HelprX-frontend

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "helprx-frontend" -- start
pm2 save
pm2 startup
```

3. **Configure Nginx**

Create `/etc/nginx/sites-available/helprx`:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/helprx /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables

### Required Variables

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.helprx.com/api/v1

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# Firebase (for push notifications)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Razorpay (for payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
```

### Optional Variables

```env
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry (Error tracking)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

---

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] API endpoints tested
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Images optimized
- [ ] SEO meta tags added
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] Backup strategy in place

---

## Post-Deployment

### Monitoring

1. **Vercel Analytics**
- Automatically enabled on Vercel
- View in Vercel dashboard

2. **Google Analytics**
```tsx
// Add to app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

3. **Sentry Error Tracking**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

### Performance Optimization

1. **Enable Caching**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

2. **Image Optimization**
- Use Next.js Image component
- Compress images before upload
- Use WebP format

3. **Code Splitting**
- Already handled by Next.js
- Use dynamic imports for large components

### Continuous Deployment

**GitHub Actions Example:**

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Rollback Strategy

### Vercel
- Go to Deployments
- Find previous successful deployment
- Click "Promote to Production"

### PM2 (Self-hosted)
```bash
# List deployments
pm2 list

# Restart with previous version
git checkout <previous-commit>
npm install
npm run build
pm2 restart helprx-frontend
```

---

## Troubleshooting

### Build Fails
1. Check build logs
2. Verify environment variables
3. Test build locally
4. Check Node.js version

### 404 Errors
1. Verify routing configuration
2. Check `.next` output
3. Ensure all pages exported

### API Connection Issues
1. Check CORS settings
2. Verify API URL
3. Check network tab in browser
4. Verify SSL certificates

---

## Support

For deployment issues:
- Check documentation
- Review build logs
- Contact platform support
- Check community forums

---

**Happy Deploying! 🚀**
