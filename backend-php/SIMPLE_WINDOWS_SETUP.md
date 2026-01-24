# 🚀 Simple Windows Setup - PHP Backend

## ⚡ Quickest Solution: Install XAMPP

**XAMPP is the easiest way to get PHP on Windows.**

### Step 1: Download & Install XAMPP (5 minutes)

1. **Go to**: https://www.apachefriends.org/download.html
2. **Download**: XAMPP for Windows (PHP 8.x version)
3. **Install**: 
   - Run the installer
   - Install to default location: `C:\xampp`
   - ✅ Check "Add to PATH" during installation (if option available)

### Step 2: Add PHP to PATH (if not auto-added)

1. **Open System Properties**:
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"

2. **Edit Path**:
   - Under "User variables", find "Path" → Edit
   - Click "New" → Add: `C:\xampp\php`
   - Click OK on all windows

3. **Restart PowerShell** (close and reopen)

### Step 3: Verify PHP

Open **NEW** PowerShell window:
```powershell
php -v
```

You should see PHP version info.

### Step 4: Install Composer

1. **Download**: https://getcomposer.org/download/
   - Click "Composer-Setup.exe"

2. **Install**:
   - Run the installer
   - It will auto-detect PHP from XAMPP
   - Follow the wizard

3. **Verify**:
   ```powershell
   composer --version
   ```

### Step 5: Install Dependencies

```powershell
cd E:\Diya_works\DiyaWeb\backend-php
composer install
```

**Done!** ✅

---

## 🎯 Alternative: Use the PowerShell Script

I've created a helper script that will:
- Check if PHP/Composer are installed
- Download Composer if needed
- Install dependencies

**Run it:**
```powershell
cd E:\Diya_works\DiyaWeb\backend-php
.\install-dependencies.ps1
```

---

## 📋 What You'll Get

After `composer install`, you'll have:
- `vendor/` folder with all PHP libraries
- Ready to upload to GoDaddy

---

## ⚠️ If You Can't Install PHP Locally

**Option 1: Use GoDaddy Terminal** (if available)
1. Upload `composer.json` to GoDaddy
2. Use cPanel Terminal or SSH
3. Run `composer install` on the server

**Option 2: Skip Local Setup**
- Upload files without `vendor/` folder
- Contact GoDaddy support to run `composer install` on server
- Or use a different computer with PHP installed

---

## ✅ Quick Checklist

- [ ] XAMPP installed
- [ ] PHP added to PATH
- [ ] PHP verified (`php -v` works)
- [ ] Composer installed
- [ ] Composer verified (`composer --version` works)
- [ ] Dependencies installed (`composer install` completed)
- [ ] `vendor/` folder created

---

**Need help?** The XAMPP method is the easiest and most reliable!
