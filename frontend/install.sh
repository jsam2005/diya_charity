#!/bin/bash

# Diya Charity Website Installation Script

echo "🌱 Installing Diya Charity Website..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 Getting started:"
    echo "   npm run dev     - Start development server"
    echo "   npm run build   - Build for production"
    echo "   npm run preview - Preview production build"
    echo ""
    echo "🌐 The website will be available at: http://localhost:3000"
    echo ""
    echo "📚 For more information, see README.md"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
