# 🚀 GoDaddy Production Deployment Guide

Complete guide for deploying Diya Charitable Trust website to GoDaddy hosting.

## 📋 Pre-Deployment Checklist

### Frontend Requirements
- [ ] Build frontend for production
- [ ] Set Razorpay Key ID in environment variables
- [ ] Verify all API URLs use relative paths (already configured)

### Backend Requirements
- [ ] PHP backend files ready
- [ ] Environment variables configured in `.env` file
- [ ] Google Sheets API credentials ready
- [ ] Razorpay production keys ready

---

## 🔧 Step 1: Build Frontend for Production

### 1.1 Set Environment Variables

Create/update `frontend/.env.production`:

```env
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
VITE_API_BASE_URL=
```

**Important:**
- Use **production** Razorpay Key ID (starts with `rzp_live_`)
- Leave `VITE_API_BASE_URL` empty (uses relative URLs in production)
- Do NOT commit this file to git (add to `.gitignore`)

### 1.2 Build Frontend

```bash
cd frontend
npm install
npm run build
```

This creates a `dist/` folder with production-ready files.

---

## 📤 Step 2: Upload Frontend to GoDaddy

### 2.1 Upload Files

1. **Go to GoDaddy cPanel → File Manager**
2. **Navigate to `public_html/`** (or your domain root)
3. **Upload all files from `frontend/dist/` folder:**
   - `index.html`
   - `assets/` folder (entire folder)
   - `.htaccess` file (if exists)
   - Any other files in `dist/`

### 2.2 Set File Permissions

- **Folders:** `755`
- **Files:** `644`
- **`.htaccess`:** `644`

---

## 🔧 Step 3: Upload PHP Backend to GoDaddy

### 3.1 Prepare Backend Files

**Files to upload to `public_html/api/`:**

```
backend-php/
├── index.php
├── config.php
├── router.php (optional, for development)
├── .htaccess
├── .env (with production credentials)
├── services/
│   ├── GoogleSheetsService.php
│   └── RazorpayService.php
├── vendor/ (entire folder - large, may take time)
└── data/
    └── running-line.json
```

### 3.2 Configure Environment Variables

Edit `backend-php/.env` with production values:

```env
# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_NAME=Volunteers
GOOGLE_DONOR_SHEET_NAME=Donors

# Razorpay (PRODUCTION KEYS)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_production_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# CORS (Your production domains)
ALLOWED_ORIGINS=https://dctnow.ngo,https://www.dctnow.ngo,https://diyacharity.org,https://www.diyacharity.org
```

**Important:**
- Use **production** Razorpay keys (not test keys)
- Keep `\n` characters in `GOOGLE_PRIVATE_KEY`
- Include both www and non-www versions of your domain

### 3.3 Upload Backend Files

1. **Go to GoDaddy cPanel → File Manager**
2. **Navigate to `public_html/`**
3. **Create folder:** `api`
4. **Upload all backend files** maintaining folder structure:
   - Upload `index.php`, `config.php`, `.htaccess`, `.env`
   - Upload `services/` folder
   - Upload `vendor/` folder (this is large, may take 5-10 minutes)
   - Upload `data/` folder

### 3.4 Set File Permissions

In GoDaddy File Manager:
- **Folders:** `755`
- **PHP files:** `644`
- **`.env` file:** `600` (more secure)

---

## ✅ Step 4: Verify Deployment

### 4.1 Test Backend API

Visit these URLs in your browser:

1. **Debug Endpoint (to diagnose routing issues):**
   ```
   https://yourdomain.com/api/debug
   ```
   Should return debug information showing how paths are parsed

2. **Health Check:**
   ```
   https://yourdomain.com/api/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

3. **Running Line:**
   ```
   https://yourdomain.com/api/running-line
   ```
   Should return JSON with `en` and `ta` fields

### 4.2 Test Frontend

1. **Visit your website:** `https://yourdomain.com`
2. **Test features:**
   - [ ] Homepage loads correctly
   - [ ] Language switcher works
   - [ ] Running line displays
   - [ ] Donation form loads
   - [ ] Volunteer form loads
   - [ ] One-time payment works
   - [ ] Monthly subscription works

### 4.3 Test Payments

**One-Time Payment:**
1. Fill donation form
2. Select "One-Time Donation"
3. Click "Proceed to Payment"
4. Should open Razorpay checkout

**Monthly Subscription:**
1. Fill donation form
2. Select "Monthly Donation"
3. Click "Proceed to Payment"
4. Should open Razorpay subscription checkout with UPI mandate

---

## 🔒 Step 5: Security Checklist

- [ ] `.env` file has permissions `600` (read/write for owner only)
- [ ] `.env` file is NOT accessible via web browser
- [ ] Production Razorpay keys are used (not test keys)
- [ ] Google Sheets API credentials are correct
- [ ] CORS is configured for your domains only

---

## 🐛 Troubleshooting

### Backend Returns 404

**Check:**
1. Files are in `public_html/api/` folder
2. `.htaccess` file is present and correct
3. File permissions are correct (folders: 755, files: 644)

### CORS Errors

**Check:**
1. `ALLOWED_ORIGINS` in `.env` includes your domain
2. Both www and non-www versions are included
3. Backend CORS headers are set correctly

### Razorpay Not Working

**Check:**
1. `VITE_RAZORPAY_KEY_ID` is set in frontend build
2. Production Razorpay keys are used (not test keys)
3. Razorpay account is activated
4. Check browser console for errors

### Running Line Not Updating

**Check:**
1. `backend-php/data/running-line.json` file exists
2. File has correct permissions (644)
3. API endpoint `/api/running-line` returns JSON

---

## 📝 Post-Deployment

### Update Running Line

1. **Via File Manager:**
   - Edit `public_html/api/data/running-line.json`
   - Update `en` and `ta` fields
   - Save file

2. **Via Web Interface (if enabled):**
   - Visit: `https://yourdomain.com/api/edit-running-line.php`
   - Edit and save

### Monitor Logs

Check GoDaddy error logs if issues occur:
- **cPanel → Metrics → Errors**
- Look for PHP errors or API issues

---

## 🎉 Success!

Your website should now be live on GoDaddy with:
- ✅ Frontend deployed
- ✅ PHP backend API working
- ✅ Payments integrated (Razorpay)
- ✅ Google Sheets integration
- ✅ Running line editable

---

## 📞 Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Check GoDaddy error logs
3. Verify all environment variables are set correctly
4. Test API endpoints directly in browser
