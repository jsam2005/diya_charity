# Fix CORS for Local Development

## Problem
The backend is returning `Access-Control-Allow-Origin: https://dctnow.ngo` but your frontend is running on `http://localhost:3000`, causing CORS errors.

## Solution

I've updated the `getCorsOrigin()` function in `index.php` to automatically allow localhost for local development.

## Steps to Fix

### Option 1: Restart the PHP Server (Recommended)

1. **Stop the current PHP server**:
   - Go to the terminal where PHP is running
   - Press `Ctrl+C` to stop it

2. **Restart the PHP server**:
   ```powershell
   cd E:\Diya_works\DiyaWeb\backend-php
   php -S localhost:8000 router.php
   ```

3. **Test again** - The CORS error should be fixed!

### Option 2: Update .env File (Alternative)

If you want to explicitly set allowed origins, edit `backend-php/.env`:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,https://dctnow.ngo,https://www.dctnow.ngo
```

Then restart the PHP server.

## What I Changed

The `getCorsOrigin()` function now:
- ✅ Automatically allows `http://localhost:*` for development
- ✅ Automatically allows `http://127.0.0.1:*` for development  
- ✅ Still respects `ALLOWED_ORIGINS` from `.env` for production
- ✅ Falls back to allowing all origins if no `.env` is set (development mode)

## Test

After restarting, try submitting the volunteer form again. The CORS error should be gone!

---

**Note**: The updated code is already in `index.php`. You just need to restart the PHP server for the changes to take effect.
