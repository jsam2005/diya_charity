# 🔧 Final 404 Fix - Complete Troubleshooting

## 🚨 Step 1: Identify Which File is 404

**Open browser console (F12) and check:**

1. **Go to "Network" tab**
2. **Look for red entries (404 errors)**
3. **Note the exact filename that's failing**

**Common files that might 404:**
- `index-0125b9ae.js` (old hash - browser cache issue)
- `index-6f0f6099.js` (current hash - file not uploaded)
- `index-2875fee5.js` (previous hash - file not uploaded)
- CSS files
- Other asset files

## ✅ Step 2: Verify Files on GoDaddy

### Check index.html

**In GoDaddy File Manager:**

1. **Open `public_html/index.html`**
2. **Click "Edit" or "View"**
3. **Search for:** `index-6f0f6099.js`
4. **Should see:** `<script type="module" crossorigin src="/assets/index-6f0f6099.js"></script>`

**If you see a different hash:**
- The old `index.html` is still there
- Delete it and upload NEW `frontend/dist/index.html`

### Check assets folder

**In GoDaddy File Manager:**

1. **Navigate to `public_html/assets/`**
2. **Verify these files exist:**
   - ✅ `index-6f0f6099.js` (must match hash in index.html)
   - ✅ `index-6f0f6099.js.map`
   - ✅ `index-2156be5a.css`
   - ✅ `vendor-b1791c80.js`
   - ✅ `animations-57ef0978.js`
   - ✅ `forms-b1539102.js`
   - ✅ `razorpay-b58f4218.js`

**If `index-6f0f6099.js` is missing:**
- The assets folder wasn't uploaded correctly
- Re-upload entire `assets/` folder from `frontend/dist/assets/`

## ✅ Step 3: Complete Re-Upload (If Needed)

**If files are missing or wrong:**

### Delete Everything (Keep api/ folder)

**In GoDaddy File Manager (`public_html/`):**

1. **Delete:**
   - `index.html`
   - `assets/` folder (entire folder)
   - `.htaccess` (we'll re-upload it)

**DO NOT DELETE:**
- ❌ `api/` folder (keep this!)

### Upload Fresh Build

**Upload from `frontend/dist/` to `public_html/`:**

1. **Upload `index.html`**
   - Source: `frontend/dist/index.html`
   - Destination: `public_html/index.html`

2. **Upload `assets/` folder**
   - Source: `frontend/dist/assets/` (entire folder)
   - Destination: `public_html/assets/`
   - **Make sure ALL files are uploaded**, including:
     - `index-6f0f6099.js`
     - `index-6f0f6099.js.map`
     - All other `.js`, `.css`, and asset files

3. **Upload `.htaccess`**
   - Source: `frontend/.htaccess`
   - Destination: `public_html/.htaccess`

### Set Permissions

**In GoDaddy File Manager:**

- **Folders:** `755`
  - `public_html/assets/`
- **Files:** `644`
  - `public_html/index.html`
  - `public_html/assets/index-6f0f6099.js`
  - All other files

## ✅ Step 4: Test Direct File Access

**Test if files are accessible:**

1. **Test index.html:**
   ```
   https://www.dctnow.ngo/index.html
   ```
   Should show HTML (not 404)

2. **Test JavaScript file:**
   ```
   https://www.dctnow.ngo/assets/index-6f0f6099.js
   ```
   Should return JavaScript code (not 404)

3. **Test CSS file:**
   ```
   https://www.dctnow.ngo/assets/index-2156be5a.css
   ```
   Should return CSS code (not 404)

**If any return 404:**
- File doesn't exist on server
- Re-upload that specific file or folder

## ✅ Step 5: Clear Browser Cache

**After uploading, clear cache:**

1. **Press `F12`**
2. **Application tab → Clear site data**
3. **Check all boxes → Clear**
4. **Close browser → Reopen**
5. **Visit:** `https://www.dctnow.ngo`

## ✅ Step 6: Verify in Network Tab

**After clearing cache:**

1. **Press `F12` → Network tab**
2. **Filter by "JS"**
3. **Should see:**
   - ✅ `index-6f0f6099.js` → Status: `200` (success)
   - ❌ Should NOT see `index-0125b9ae.js` (old hash)

4. **Filter by "CSS"**
   - ✅ `index-2156be5a.css` → Status: `200` (success)

## 🔍 Diagnostic Commands

**Run in browser console (F12 → Console):**

```javascript
// Check what index.html references
fetch('/index.html?t=' + Date.now())
  .then(r => r.text())
  .then(html => {
    const match = html.match(/index-([a-f0-9]+)\.js/);
    console.log('index.html references:', match ? match[0] : 'NOT FOUND');
  });

// Check if file exists
fetch('/assets/index-6f0f6099.js')
  .then(r => {
    console.log('File status:', r.status);
    console.log(r.status === 200 ? '✅ File exists' : '❌ File missing');
  })
  .catch(e => console.log('❌ Error:', e));
```

## 📋 Complete Checklist

- [ ] Verified `public_html/index.html` references `index-6f0f6099.js`
- [ ] Verified `public_html/assets/index-6f0f6099.js` exists
- [ ] Verified all files in `assets/` folder are uploaded
- [ ] Set correct permissions (755 for folders, 644 for files)
- [ ] Tested direct file access (no 404)
- [ ] Cleared browser cache completely
- [ ] Tested in incognito mode
- [ ] Verified Network tab shows status 200 (not 404)

---

## 🚨 Still Getting 404?

**If you've done everything above and still get 404:**

1. **Check GoDaddy error logs:**
   - cPanel → Metrics → Errors
   - Look for specific file access errors

2. **Verify file paths:**
   - Make sure files are in `public_html/assets/` (not `public_html/public/assets/`)

3. **Check .htaccess:**
   - Verify `.htaccess` isn't blocking asset files
   - Should have: `RewriteCond %{REQUEST_URI} ^/assets(/.*)?$ [NC]`

4. **Contact GoDaddy support** if:
   - Files are uploaded correctly
   - Permissions are correct
   - But files still return 404
