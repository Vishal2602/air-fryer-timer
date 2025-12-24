# Air Fryer Timer - Deployment Documentation

## Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://projlq9vh11766551950259.vercel.app |
| **GitHub Repository** | https://github.com/Vishal2602/air-fryer-timer |
| **Vercel Dashboard** | https://vercel.com/vishal2602s-projects/proj_lq9vh1_1766551950259 |

## Deployment Status

- **Platform**: Vercel
- **Build Tool**: Vite
- **Framework**: React 18
- **Status**: LIVE

## Automatic Deployments

This project is connected to GitHub. Any push to the `main` branch will trigger an automatic deployment to Vercel.

### Deployment Workflow

1. Push changes to `main` branch
2. Vercel automatically detects changes
3. Build runs: `npm run build` (via Vite)
4. Output directory `dist/` is deployed
5. Production URL is updated

## Build Configuration

| Setting | Value |
|---------|-------|
| Build Command | `vite build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 18.x |

## Environment Variables

No environment variables are required for this application.

## Manual Deployment

To deploy manually from the command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features Deployed

- Food selection with preset cooking times
- Real-time countdown timer
- Flip reminder notifications
- Voice alerts (browser speech synthesis)
- Responsive design for mobile/desktop

## Browser Compatibility

Voice alerts require browser support for Web Speech API:
- Chrome (recommended)
- Edge
- Safari
- Firefox

## Monitoring

- View deployment logs: Vercel Dashboard > Deployments
- Check build status: GitHub Actions (connected via Vercel)

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard
2. Select the project
3. Navigate to Deployments
4. Click on a previous successful deployment
5. Click "Promote to Production"

---

**Deployed**: December 24, 2025
**Deployment Engineer**: Casey (DevOps)
