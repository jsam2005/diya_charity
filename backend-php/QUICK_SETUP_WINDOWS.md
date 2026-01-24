# Quick Setup Guide for Windows

## Option 1: Install PHP + Composer (Recommended)

### Step 1: Install PHP

**Easiest Method - Using XAMPP:**

1. **Download XAMPP**:
   - Go to: https://www.apachefriends.org/download.html
   - Download XAMPP for Windows (includes PHP)
   - Install it (usually to `C:\xampp`)

2. **Add PHP to PATH**:
   - Open System Properties → Environment Variables
   - Edit "Path" variable
   - Add: `C:\xampp\php` (or wherever XAMPP installed PHP)
   - Click OK

3. **Verify PHP**:
   ```powershell
   php -v
   ```

**Alternative - Direct PHP Download:**
- Download PHP from: https://windows.php.net/download/
- Extract to `C:\php`
- Add `C:\php` to PATH

### Step 2: Install Composer

1. **Download Composer Installer**:
   - Go to: https://getcomposer.org/download/
   - Download `Composer-Setup.exe`

2. **Run Installer**:
   - Double-click `Composer-Setup.exe`
   - It will detect your PHP installation
   - Follow the wizard

3. **Verify**:
   ```powershell
   composer --version
   ```

### Step 3: Install Dependencies

```powershell
cd E:\Diya_works\DiyaWeb\backend-php
composer install
```

---

## Option 2: Skip Local Installation (Alternative)

If you don't want to install PHP/Composer locally, you can:

### A. Use GoDaddy's Terminal (if available)

1. Upload `composer.json` to GoDaddy
2. Use GoDaddy's terminal/SSH to run `composer install` on the server

### B. Download Dependencies Manually

I can create a script to download the required packages, but this is more complex.

### C. Use Pre-built Vendor Folder

If someone else has the same setup, they can share the `vendor/` folder, but this is not recommended for security.

---

## Option 3: Use Online Composer (Temporary Solution)

1. Go to: https://getcomposer.org/download/
2. Download `composer.phar` directly
3. Use it with:
   ```powershell
   php composer.phar install
   ```
   (But you still need PHP installed)

---

## Recommended: Install XAMPP

**XAMPP includes:**
- ✅ PHP (ready to use)
- ✅ Apache (for local testing)
- ✅ MySQL (if needed)
- ✅ Easy to use

**After installing XAMPP:**
1. Add PHP to PATH: `C:\xampp\php`
2. Install Composer
3. Run `composer install`

---

## Quick Command Summary

After everything is installed:

```powershell
# Verify PHP
php -v

# Verify Composer
composer --version

# Install dependencies
cd E:\Diya_works\DiyaWeb\backend-php
composer install
```

---

**Need help?** Let me know which option you prefer!
