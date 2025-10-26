# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your Diya Charity website to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `DiyaWeb` (or update the base path in `vite.config.ts` if you use a different name)
3. Make it public (required for free GitHub Pages)

### 2. Push Your Code

```bash
# Navigate to your project directory
cd E:\Diya_works\DiyaWeb

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Diya Charity website"

# Add your GitHub repository as remote
git remote add origin https://github.com/[your-username]/DiyaWeb.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow will automatically start

### 4. Access Your Website

Your website will be available at:
```
https://[your-username].github.io/DiyaWeb/
```

## 🛠️ Local Development

### Using PowerShell (Windows)
```powershell
# Navigate to frontend directory
cd E:\Diya_works\DiyaWeb\frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### Using Command Prompt (Windows)
```cmd
cd E:\Diya_works\DiyaWeb\frontend
npm install
npm run dev
```

## 📦 Build and Deploy

### Automatic Deployment
- Push changes to the `main` branch
- GitHub Actions will automatically build and deploy

### Manual Deployment
Run the deployment script:
```bash
# Windows
deploy.bat

# Linux/Mac
./deploy.sh
```

## 🔧 Configuration

### Update Base Path
If your repository name is different from `DiyaWeb`, update the base path in `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-repository-name/', // Update this
  // ... rest of config
})
```

### Custom Domain
To use a custom domain:
1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Create a `CNAME` file in the `public` directory with your domain

## 🐛 Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify Node.js version (requires 18+)
- Check for TypeScript errors: `npm run build`

### GitHub Pages Not Updating
- Check GitHub Actions tab for deployment status
- Ensure the workflow file is in `.github/workflows/`
- Verify the repository is public

### Assets Not Loading
- Check the base path in `vite.config.ts`
- Ensure all assets are in the `public` directory
- Verify the repository name matches the base path

## 📞 Support

If you encounter any issues:
1. Check the GitHub Actions logs
2. Verify your repository settings
3. Ensure all files are committed and pushed

## 🎉 Success!

Once deployed, your Diya Charity website will be live and accessible worldwide!

**Website URL**: `https://[your-username].github.io/DiyaWeb/`
