# 🔧 Step-by-Step Fix for Missing JavaScript File

## 🚨 Current Problem

The browser is trying to load `https://www.dctnow.ngo/assets/index-0125b9ae.js` but getting a 404 error, causing a blank white page.

## ✅ Complete Fix Process

### Step 1: Build Frontend (Local Machine)

**Open PowerShell/Terminal and run:**

```powershell
cd frontend
npm install
npm run build
```

**Wait for build to complete.** You should see:
```
✓ built in X.XXs
```

### Step 2: Verify Build Output (Local Machine)

**Check that these files exist in `frontend/dist/`:**

1. **Open File Explorer** and navigate to `E:\Diya_works\DiyaWeb\frontend\dist\`

2. **Verify these exist:**
   - [ ] `index.html` file
   - [ ] `assets/` folder
   - [ ] `assets/index-*.js` file (note the exact filename with hash)
   - [ ] `assets/index-*.css` file
   - [ ] `.htaccess` file (if exists)

3. **Open `dist/index.html` in a text editor** and search for `assets/index-`
   - Note the exact filename (e.g., `index-0125b9ae.js`)
   - Verify that EXACT file exists in `dist/assets/` folder

### Step 3: Prepare Files for Upload

**Before uploading, verify:**

1. **Check `dist/index.html` references:**
   - Open `frontend/dist/index.html`
   - Look for: `<script type="module" src="/assets/index-XXXXX.js">`
   - Note the hash (XXXXX part)

2. **Verify matching file exists:**
   - Check `frontend/dist/assets/` folder
   - Find the file with that exact hash
   - Example: If HTML says `index-0125b9ae.js`, verify `assets/index-0125b9ae.js` exists

### Step 4: Upload to GoDaddy

**In GoDaddy cPanel → File Manager:**

#### 4.1 Navigate to `public_html/`

#### 4.2 Delete Old Files (IMPORTANT!)

**Delete these (but KEEP `api/` folder):**
- [ ] `index.html` (old one)
- [ ] `assets/` folder (entire folder - delete it)

**DO NOT DELETE:**
- ❌ `api/` folder (keep this!)

#### 4.3 Upload New Files

**Upload from `frontend/dist/` to `public_html/`:**

1. **Upload `index.html`:**
   - Source: `frontend/dist/index.html`
   - Destination: `public_html/index.html`

2. **Upload `assets/` folder:**
   - **Method 1 (Recommended):** Upload entire `assets/` folder
     - Select `frontend/dist/assets/` folder
     - Upload to `public_html/`
     - This should create `public_html/assets/` with all files inside
   
   - **Method 2 (If folder upload doesn't work):**
     - Upload each file individually from `frontend/dist/assets/` to `public_html/assets/`
     - Make sure ALL `.js` files are uploaded
     - Make sure ALL `.css` files are uploaded

3. **Upload `.htaccess`:**
   - Source: `frontend/.htaccess` (or `frontend/dist/.htaccess` if it exists)
   - Destination: `public_html/.htaccess`

#### 4.4 Set File Permissions

**In GoDaddy File Manager, set permissions:**

- **Folders:**
  - `public_html/assets/` → `755`
  
- **Files:**
  - `public_html/index.html` → `644`
  - `public_html/assets/index-*.js` → `644`
  - `public_html/assets/index-*.css` → `644`
  - `public_html/.htaccess` → `644`

### Step 5: Verify Upload on GoDaddy

**In GoDaddy File Manager, verify:**

1. **Check file structure:**
   ```
   public_html/
   ├── index.html          ← Should exist
   ├── .htaccess           ← Should exist
   ├── assets/             ← Should exist
   │   ├── index-*.js      ← Should exist (check exact filename)
   │   ├── index-*.css     ← Should exist
   │   └── ...             ← Other asset files
   └── api/                 ← Should exist (don't touch)
   ```

2. **Verify exact filename match:**
   - Open `public_html/index.html` in GoDaddy File Manager
   - Search for `assets/index-`
   - Note the exact filename (e.g., `index-0125b9ae.js`)
   - Verify that EXACT file exists in `public_html/assets/`
   - **If filename doesn't match, the build changed - rebuild and re-upload**

### Step 6: Test the Site

1. **Clear browser cache:**
   - Press `Ctrl+Shift+Delete` (Windows) or `Cmd+Shift+Delete` (Mac)
   - Select "Cached images and files"
   - Clear cache

2. **Visit the site:**
   - Go to: `https://www.dctnow.ngo`
   - Wait for page to load

3. **Check browser console (F12):**
   - **Console tab:** Should have NO red errors
   - **Network tab:** 
     - Filter by "JS"
     - Check `index-*.js` file
     - Should show status `200` (not 404)
     - Should show `Content-Type: application/javascript`

### Step 7: If Still Not Working

**If you still see 404 errors:**

1. **Check exact filename mismatch:**
   - Open `public_html/index.html` in browser (view source)
   - Find: `<script type="module" src="/assets/index-XXXXX.js">`
   - Note the hash (XXXXX)
   - Check if that EXACT file exists in `public_html/assets/`
   - **If hash doesn't match, rebuild and re-upload**

2. **Test direct file access:**
   - Try: `https://www.dctnow.ngo/assets/index-0125b9ae.js`
   - (Replace with actual filename from your build)
   - Should return JavaScript code (not 404)

3. **Check `.htaccess` is correct:**
   - Verify `public_html/.htaccess` exists
   - Should contain rule: `RewriteCond %{REQUEST_URI} ^/assets(/.*)?$ [NC]`

4. **Check file permissions:**
   - `assets/` folder: `755`
   - `index-*.js` file: `644`

---

## 🎯 Quick Checklist

- [ ] Built frontend (`npm run build`)
- [ ] Verified `dist/assets/` has JavaScript files
- [ ] Verified filename in `index.html` matches file in `assets/`
- [ ] Deleted old `index.html` and `assets/` from GoDaddy
- [ ] Uploaded NEW `index.html` to GoDaddy
- [ ] Uploaded NEW `assets/` folder (all files) to GoDaddy
- [ ] Set correct permissions (755 for folders, 644 for files)
- [ ] Verified exact filename match on server
- [ ] Cleared browser cache
- [ ] Tested the site

---

## 📞 Still Not Working?

**If the issue persists after following all steps:**

1. **Share the exact error from browser console (F12)**
2. **Share the exact filename from `index.html`** (the hash part)
3. **Share the list of files in `public_html/assets/`** on GoDaddy
4. **Verify the build was successful** (check for errors during `npm run build`)
