#!/bin/bash

echo "========================================"
echo "  GoDaddy Deployment Script"
echo "  Diya Charitable Trust Website"
echo "========================================"
echo ""

echo "[1/3] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "[2/3] Building production version..."
npm run build
if [ $? -ne 0 ]; then
    echo "ERROR: Build failed"
    exit 1
fi

echo ""
echo "[3/3] Build completed successfully!"
echo ""
echo "========================================"
echo "  NEXT STEPS:"
echo "========================================"
echo "1. Go to GoDaddy cPanel"
echo "2. Open File Manager"
echo "3. Navigate to public_html folder"
echo "4. Upload ALL files from: frontend/dist/"
echo "5. Make sure .htaccess file is uploaded"
echo "6. Visit your domain to verify"
echo ""
echo "Files are ready in: frontend/dist/"
echo ""
