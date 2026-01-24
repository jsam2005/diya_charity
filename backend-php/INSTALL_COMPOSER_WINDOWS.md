# Installing Composer on Windows

## Quick Installation (Recommended)

### Method 1: Using Composer Installer (Easiest)

1. **Download Composer Installer**:
   - Go to: https://getcomposer.org/download/
   - Click "Composer-Setup.exe" (Windows installer)
   - This will download the installer

2. **Run the Installer**:
   - Double-click `Composer-Setup.exe`
   - Follow the installation wizard
   - It will automatically:
     - Install Composer
     - Add it to your PATH
     - Detect your PHP installation

3. **Verify Installation**:
   ```powershell
   composer --version
   ```

### Method 2: Manual Installation

If the installer doesn't work:

1. **Download `composer.phar`**:
   - Go to: https://getcomposer.org/download/
   - Download `composer.phar`

2. **Create `composer.bat`** in a folder in your PATH:
   ```batch
   @echo off
   php "C:\path\to\composer.phar" %*
   ```

3. **Or use directly**:
   ```powershell
   php composer.phar install
   ```

## Alternative: Without Installing Composer

If you can't install Composer, you can download the dependencies manually or use an online tool.

### Option 1: Use Composer Online

1. Go to: https://getcomposer.org/download/
2. Use the online installer or download `composer.phar`
3. Run: `php composer.phar install`

### Option 2: Download Dependencies Manually

The main dependencies you need are:
- `google/apiclient` (Google API Client)
- `razorpay/razorpay` (Razorpay SDK)

You can download these from packagist.org and place them in the `vendor/` folder manually, but this is more complex.

## Quick Start After Installation

Once Composer is installed:

```powershell
cd E:\Diya_works\DiyaWeb\backend-php
composer install
```

This will download all required PHP libraries.
