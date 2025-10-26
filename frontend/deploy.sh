#!/bin/bash

# GitHub Pages Deployment Script for Diya Charity Website

echo "🚀 Starting GitHub Pages deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 Build files are in the 'dist' directory"
echo ""
echo "🌐 To deploy to GitHub Pages:"
echo "1. Push your code to GitHub"
echo "2. Go to your repository settings"
echo "3. Navigate to 'Pages' section"
echo "4. Select 'GitHub Actions' as source"
echo "5. The workflow will automatically deploy your site"
echo ""
echo "🔗 Your site will be available at:"
echo "https://[your-username].github.io/DiyaWeb/"
echo ""
echo "📝 Note: Make sure to update the 'base' path in vite.config.ts"
echo "   if your repository name is different from 'DiyaWeb'"
