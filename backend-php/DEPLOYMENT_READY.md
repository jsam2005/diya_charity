# ✅ PHP Backend - Ready for Deployment!

Your PHP backend is now set up and ready to deploy to GoDaddy!

## ✅ What's Complete

- ✅ PHP installed and working (PHP 8.5.1)
- ✅ Composer installed
- ✅ Dependencies installed (`vendor/` folder created)
- ✅ All PHP files in place
- ✅ `.env` file created (needs your credentials)

## 📋 Next Steps

### Step 1: Configure Environment Variables

Edit the `.env` file in `backend-php/` folder with your production credentials:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
GOOGLE_SHEET_NAME=Volunteers
GOOGLE_DONOR_SHEET_NAME=Donors
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_production_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Important:**
- Replace `yourdomain.com` with your actual GoDaddy domain
- Use **production** Razorpay keys (not test keys)
- Keep the `\n` characters in the private key

### Step 2: Upload to GoDaddy

Upload these files/folders to GoDaddy `public_html/api/`:

**Required Files:**
- ✅ `index.php`
- ✅ `config.php`
- ✅ `.htaccess`
- ✅ `.env` (with your production credentials)
- ✅ `services/` folder (with both PHP files)
- ✅ `vendor/` folder (entire folder - this is large, may take time)

**Upload Method:**
1. Go to GoDaddy → cPanel → File Manager
2. Navigate to `public_html`
3. Create folder: `api`
4. Upload all files maintaining folder structure
5. For `vendor/` folder: Upload entire folder (may take 5-10 minutes)

### Step 3: Set File Permissions

In GoDaddy File Manager:
- Folders: `755`
- PHP files: `644`
- `.env` file: `600` (more secure)

### Step 4: Test Your Backend

Visit: `https://yourdomain.com/api/health`

Should return: `{"status":"ok","message":"Server is running"}`

### Step 5: Update Frontend

1. Create `frontend/.env.production`:
   ```
   VITE_API_BASE_URL=https://yourdomain.com/api
   ```

2. Rebuild frontend:
   ```bash
   cd E:\Diya_works\DiyaWeb\frontend
   npm run build
   ```

3. Upload new frontend build to GoDaddy

## 📁 Files to Upload

```
backend-php/
├── index.php                    ✅ Upload
├── config.php                   ✅ Upload
├── .htaccess                    ✅ Upload
├── .env                         ✅ Upload (with your credentials)
├── services/
│   ├── GoogleSheetsService.php  ✅ Upload
│   └── RazorpayService.php      ✅ Upload
└── vendor/                      ✅ Upload (entire folder)
    └── [all dependencies]
```

## 🎯 Your Backend URLs

After deployment:
- **Base URL**: `https://yourdomain.com/api`
- **Health Check**: `https://yourdomain.com/api/health`
- **Volunteer Form**: `https://yourdomain.com/api/volunteer/submit`
- **Donations**: `https://yourdomain.com/api/donations/*`

## ✅ Deployment Checklist

- [ ] `.env` file configured with production credentials
- [ ] All files uploaded to GoDaddy `public_html/api/`
- [ ] `vendor/` folder uploaded completely
- [ ] File permissions set correctly
- [ ] Health check endpoint working
- [ ] Frontend `.env.production` updated
- [ ] Frontend rebuilt and deployed
- [ ] Volunteer form tested
- [ ] Google Sheets integration verified

## 🐛 Troubleshooting

### 500 Internal Server Error
- Check PHP error logs in cPanel → Errors
- Verify all environment variables in `.env` are set
- Ensure `vendor/` folder is uploaded completely

### CORS Errors
- Update `ALLOWED_ORIGINS` in `.env`
- Include exact domain: `https://yourdomain.com`
- Re-upload `.env` after changes

### Google Sheets Not Working
- Verify service account email and private key
- Check private key format (keep `\n` characters)
- Ensure service account has access to Google Sheet

## 🎉 Success!

Once deployed, your complete setup will be:
- **Frontend**: `https://yourdomain.com` (GoDaddy) ✅
- **Backend**: `https://yourdomain.com/api` (GoDaddy PHP) ✅
- **Everything on GoDaddy** - as requested! ✅

---

**Need help?** See [PHP_BACKEND_DEPLOYMENT.md](../PHP_BACKEND_DEPLOYMENT.md) for detailed instructions.
