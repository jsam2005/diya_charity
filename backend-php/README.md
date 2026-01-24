# Diya NGO Backend - PHP Version

PHP backend compatible with **GoDaddy Web Hosting Starter** (no Node.js required).

## 🎯 Features

- ✅ Works on all GoDaddy hosting plans (including Starter)
- ✅ Google Sheets integration
- ✅ Razorpay payment processing
- ✅ Volunteer form submissions
- ✅ Donation handling
- ✅ CORS support

## 📋 Requirements

- PHP 7.4 or higher (GoDaddy supports this)
- Composer (for dependency management)
- Google Sheets API credentials
- Razorpay API keys (optional, if using payments)

## 🚀 Quick Setup

### Step 1: Install Dependencies Locally

```bash
cd backend-php
composer install
```

This will create a `vendor/` folder with all required libraries.

### Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   - Google Sheets service account email and private key
   - Google Sheet ID
   - Razorpay keys (if using payments)
   - Allowed CORS origins (your frontend domain)

### Step 3: Upload to GoDaddy

Upload these files/folders to GoDaddy:
- ✅ `index.php`
- ✅ `config.php`
- ✅ `services/` folder
- ✅ `vendor/` folder (from `composer install`)
- ✅ `.env` file (with your production credentials)
- ✅ `.htaccess` file

**Upload location**: Create a folder like `api` or `backend` in your `public_html` directory.

### Step 4: Set Permissions

In GoDaddy File Manager:
- Set folder permissions to `755`
- Set file permissions to `644`
- `.env` file should be `600` (more secure)

### Step 5: Test

Visit: `https://yourdomain.com/api/health`

Should return: `{"status":"ok","message":"Server is running"}`

## 📁 File Structure

```
backend-php/
├── index.php              # Main entry point
├── config.php             # Configuration loader
├── .htaccess              # URL routing
├── .env                   # Environment variables (create from .env.example)
├── composer.json          # PHP dependencies
├── composer.lock          # Locked dependency versions
├── services/
│   ├── GoogleSheetsService.php
│   └── RazorpayService.php
└── vendor/                # Installed dependencies (from composer install)
```

## 🔧 API Endpoints

All endpoints are prefixed with `/api/`:

- `GET /api/health` - Health check
- `POST /api/volunteer/submit` - Submit volunteer form
- `POST /api/donations/create-order` - Create payment order
- `POST /api/donations/create-plan` - Create subscription plan
- `POST /api/donations/create-subscription` - Create subscription
- `POST /api/donations/verify-payment` - Verify payment
- `POST /api/donations/save-subscription` - Save subscription
- `POST /api/donations/webhook` - Razorpay webhook handler

## 🔒 Security Notes

1. **Never commit `.env`** to version control
2. Keep `.env` file permissions restricted (600)
3. Use production Razorpay keys (not test keys)
4. Restrict CORS origins to your domain only

## 🐛 Troubleshooting

### 500 Internal Server Error
- Check PHP error logs in cPanel
- Verify all environment variables are set
- Ensure `vendor/` folder is uploaded
- Check file permissions

### CORS Errors
- Verify `ALLOWED_ORIGINS` in `.env`
- Check `.htaccess` is uploaded correctly

### Google Sheets Not Working
- Verify service account email and private key
- Check private key format (should have `\n` for newlines)
- Ensure service account has access to the Google Sheet

### Composer Not Available
If you can't run `composer install` locally:
1. Download dependencies manually from packagist.org
2. Or use GoDaddy's terminal/SSH if available
3. Or use a local development environment

## 📞 Support

For deployment help, see: [PHP_BACKEND_DEPLOYMENT.md](../PHP_BACKEND_DEPLOYMENT.md)
