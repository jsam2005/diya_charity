# 🔧 Fix 404 Errors on GoDaddy

## Common Causes of 404 Errors

### 1. Missing or Incorrect .htaccess File

**Location:** `public_html/api/.htaccess`

**Check:**
- [ ] `.htaccess` file exists in `public_html/api/` folder
- [ ] File has correct permissions (644)
- [ ] File content matches the template below

### 2. Incorrect File Structure

**Correct Structure on GoDaddy:**
```
public_html/
├── index.html (frontend)
├── assets/ (frontend)
├── .htaccess (frontend)
└── api/
    ├── index.php
    ├── config.php
    ├── .htaccess (backend)
    ├── .env
    ├── services/
    ├── vendor/
    └── data/
```

### 3. .htaccess Content for Backend

**File:** `public_html/api/.htaccess`

```apache
# Diya NGO Backend - PHP Routing
# For GoDaddy Web Hosting Starter

RewriteEngine On
RewriteBase /api/

# Route OPTIONS requests to PHP FIRST
RewriteCond %{REQUEST_METHOD} ^OPTIONS
RewriteRule ^(.*)$ index.php [QSA,L]

# Don't rewrite if file exists
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule . - [L]

# Don't rewrite if directory exists
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule . - [L]

# Route all other requests to index.php
RewriteRule ^(.*)$ index.php [QSA,L]

# Security: Prevent direct access to sensitive files
<FilesMatch "^(\.env|composer\.(json|lock)|config\.php)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# CORS headers
<IfModule mod_headers.c>
    Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header always set Access-Control-Allow-Headers "Content-Type, Authorization, X-Requested-With, Accept, Cache-Control, Pragma"
    Header always set Access-Control-Allow-Credentials "true"
    Header always set Access-Control-Max-Age "86400"
</IfModule>
```

### 4. Test API Endpoints

**After fixing .htaccess, test these URLs:**

1. **Debug Endpoint (to diagnose issues):**
   ```
   https://yourdomain.com/api/debug
   ```
   Should return debug information about routing

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

3. **If 404 persists, check:**
   - File permissions (folders: 755, files: 644)
   - PHP version (should be 7.4+)
   - mod_rewrite is enabled (check cPanel)

### 5. Enable mod_rewrite in GoDaddy

If mod_rewrite is not enabled:
1. Go to cPanel
2. Find "Apache Modules" or "Select PHP Version"
3. Enable `mod_rewrite`
4. Restart Apache if needed

### 6. Debug Steps

**Check error logs:**
- Go to cPanel → Metrics → Errors
- Look for PHP errors or routing issues

**Test directly:**
- Visit: `https://yourdomain.com/api/index.php`
- Should show API response or error message

**Check file structure:**
- Verify `index.php` exists in `public_html/api/`
- Verify `.htaccess` exists in `public_html/api/`
- Verify all folders are uploaded correctly

---

## Quick Fix Checklist

- [ ] `.htaccess` file exists in `public_html/api/`
- [ ] `.htaccess` has correct content (see above)
- [ ] File permissions: folders (755), files (644)
- [ ] `index.php` exists in `public_html/api/`
- [ ] `mod_rewrite` is enabled
- [ ] Test `/api/health` endpoint
- [ ] Check GoDaddy error logs

---

## Still Getting 404?

### Most Common Issue: Old Code on Server

**The 404 errors usually mean the updated `index.php` hasn't been uploaded to GoDaddy yet.**

**Solution:**
1. Upload the latest `backend-php/index.php` to `public_html/api/index.php` on GoDaddy
2. Wait 1-2 minutes for changes to propagate
3. Test again: `https://yourdomain.com/api/debug`

### Other Checks:

1. **Test direct PHP access:** `https://yourdomain.com/api/index.php`
   - If this works, routing is the issue
   - If this doesn't work, there's a PHP error

2. **Check GoDaddy error logs** (cPanel → Metrics → Errors)
   - Look for PHP syntax errors
   - Look for file permission errors

3. **Verify PHP version** (should be 7.4 or higher)
   - cPanel → Select PHP Version

4. **Contact GoDaddy support** if:
   - `mod_rewrite` is not available
   - PHP errors persist
   - File permissions can't be changed
