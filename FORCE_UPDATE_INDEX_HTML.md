# 🔧 Force Update index.html - Complete Fix

## ✅ Your Local Build is Correct

Your `frontend/dist/index.html` correctly references:
- `index-2875fee5.js` ✅ (matches the file that exists)

## 🚨 The Problem

The browser is still loading the OLD `index.html` from cache, which references `index-0125b9ae.js`.

## ✅ Complete Solution

### Step 1: Verify New index.html is Uploaded

**In GoDaddy File Manager:**

1. **Open `public_html/index.html`**
2. **Click "Edit" or "View"**
3. **Search for:** `index-2875fee5.js`
4. **Should see:** `<script type="module" crossorigin src="/assets/index-2875fee5.js"></script>`

**If you see `index-0125b9ae.js` instead:**
- The OLD file is still there
- Delete it and upload the NEW one from `frontend/dist/index.html`

### Step 2: Force Browser Cache Clear

**Method 1: Hard Refresh (Recommended)**
- **Windows:** Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** Press `Cmd + Shift + R`

**Method 2: Clear All Cache**
1. Press `F12` to open Developer Tools
2. **Right-click** the refresh button (next to address bar)
3. Select **"Empty Cache and Hard Reload"**

**Method 3: Clear Browser Data**
1. Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
2. Select **"Cached images and files"**
3. Time range: **"All time"**
4. Click **"Clear data"**

### Step 3: Add Cache-Busting to index.html (Optional)

If cache is still an issue, we can add a version parameter to force reload.

**But first, try Step 1 and 2 above.**

### Step 4: Verify Upload

**After uploading new index.html:**

1. **Visit:** `https://www.dctnow.ngo/index.html` (direct access)
2. **Right-click → View Page Source**
3. **Search for:** `index-2875fee5.js`
4. **Should see it** - if not, the upload didn't work

### Step 5: Test

1. **Hard refresh:** `Ctrl + Shift + R`
2. **Check console (F12):**
   - Network tab → Filter by "JS"
   - Should see `index-2875fee5.js` loading (status 200)
   - Should NOT see `index-0125b9ae.js` (404)

---

## 🔍 Troubleshooting

### If Still Seeing Old Hash:

1. **Check GoDaddy File Manager:**
   - Verify `public_html/index.html` was modified recently
   - Check file size matches `frontend/dist/index.html`

2. **Check for Multiple index.html Files:**
   - Search for all `index.html` files in `public_html/`
   - Delete any duplicates

3. **Check .htaccess:**
   - Ensure `.htaccess` isn't redirecting to a cached version

4. **Try Incognito/Private Window:**
   - Open site in incognito mode
   - If it works there, it's definitely browser cache

---

## ✅ Success Checklist

- [ ] Verified `public_html/index.html` references `index-2875fee5.js`
- [ ] Deleted old `index.html` if it existed
- [ ] Uploaded NEW `frontend/dist/index.html`
- [ ] Cleared browser cache (hard refresh)
- [ ] Tested in incognito mode
- [ ] Site loads correctly
