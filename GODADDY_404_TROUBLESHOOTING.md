# 🔧 GoDaddy 404 Error - Troubleshooting Guide

## ⚠️ Critical: Upload Updated Files

**The 404 errors suggest the server might be running old code. Make sure you've uploaded the latest `index.php` file.**

## ✅ Step-by-Step Fix

### 1. Verify File Structure on GoDaddy

**Check in GoDaddy File Manager:**

```
public_html/
└── api/
    ├── index.php          ← MUST exist
    ├── .htaccess          ← MUST exist  
    ├── config.php
    ├── .env
    ├── services/
    │   ├── GoogleSheetsService.php
    │   └── RazorpayService.php
    ├── vendor/            ← Large folder
    └── data/
        └── running-line.json
```

### 2. Verify .htaccess Content

**File:** `public_html/api/.htaccess`

**Must contain:**
```apache
RewriteEngine On
RewriteBase /api/

RewriteCond %{REQUEST_METHOD} ^OPTIONS
RewriteRule ^(.*)$ index.php [QSA,L]

RewriteCond %{REQUEST_FILENAME} -f
RewriteRule . - [L]

RewriteCond %{REQUEST_FILENAME} -d
RewriteRule . - [L]

RewriteRule ^(.*)$ index.php/$1 [QSA,L]
```

### 3. Test Direct PHP Access

**Visit:** `https://www.dctnow.ngo/api/index.php`

**If this works**, the PHP file is accessible but routing is broken.
**If this doesn't work**, there's a PHP error - check error logs.

### 4. Check File Permissions

In GoDaddy File Manager:
- **Folders:** `755`
- **Files:** `644`
- **`.htaccess`:** `644`

### 5. Verify mod_rewrite is Enabled

1. Go to cPanel
2. Find "Apache Modules" or "Select PHP Version"
3. Ensure `mod_rewrite` is enabled

### 6. Check Error Logs

**Go to:** cPanel → Metrics → Errors

Look for:
- PHP syntax errors
- File not found errors
- Permission errors

### 7. Test Endpoints Directly

**After uploading updated `index.php`, test:**

1. **Debug:** `https://www.dctnow.ngo/api/debug`
   - Should return detailed debug info

2. **Health:** `https://www.dctnow.ngo/api/health`
   - Should return: `{"status":"ok"}`

3. **Running Line:** `https://www.dctnow.ngo/api/running-line`
   - Should return JSON with `en` and `ta` fields

## 🔍 Quick Diagnostic

**If `/api/debug` still returns 404 after uploading updated `index.php`:**

1. **Check if file was uploaded correctly:**
   - File size should match local file
   - File modification date should be recent

2. **Check for PHP errors:**
   - Visit: `https://www.dctnow.ngo/api/index.php?test=1`
   - Should show some response (even if error)

3. **Check .htaccess is being read:**
   - Temporarily add a syntax error to `.htaccess`
   - If site breaks, `.htaccess` is being read
   - Remove error after testing

## 📝 What to Upload

**Critical files that MUST be uploaded:**

1. ✅ `backend-php/index.php` → `public_html/api/index.php`
2. ✅ `backend-php/.htaccess` → `public_html/api/.htaccess`
3. ✅ `backend-php/config.php` → `public_html/api/config.php`
4. ✅ `backend-php/.env` → `public_html/api/.env` (with production values)

**After uploading, wait 1-2 minutes for changes to propagate, then test again.**

## 🚨 Still Not Working?

If endpoints still return 404 after:
- ✅ Uploading latest `index.php`
- ✅ Verifying `.htaccess` exists and has correct content
- ✅ Checking file permissions
- ✅ Ensuring `mod_rewrite` is enabled

**Then check:**
1. GoDaddy error logs for specific PHP errors
2. Contact GoDaddy support to verify `mod_rewrite` is enabled
3. Try accessing `index.php` directly with a query parameter to test PHP execution
