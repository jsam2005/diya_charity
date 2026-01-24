# 🔧 Complete Solution: Force Browser to Use New Build

## 🚨 The Problem

Your browser is still using a cached `index.html` that references the old JavaScript file (`index-0125b9ae.js`), even though the server has the correct file (`index-6f0f6099.js`).

## ✅ Complete Fix (Do All Steps)

### Step 1: Verify Root `.htaccess` Has Cache Prevention

**In GoDaddy File Manager, check `public_html/.htaccess`:**

It should have these lines at the end:
```apache
# Prevent caching of index.html to avoid hash mismatch issues
<FilesMatch "^(index\.html)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>
```

**If missing:**
1. Copy content from `frontend/.htaccess` (local file)
2. Replace entire content of `public_html/.htaccess` on GoDaddy

### Step 2: Clear CDN Cache (Sucuri)

**Since you're using Sucuri Cloudproxy:**

1. **Log into Sucuri Dashboard**
2. **Go to "Performance" or "Cache" section**
3. **Clear cache for:** `www.dctnow.ngo`
4. **Or wait 10-15 minutes** for cache to expire

### Step 3: Clear Browser Cache Completely

**Method 1: Clear All Site Data (Recommended)**

1. **Press `F12`** (Developer Tools)
2. **Go to "Application" tab** (Chrome) or **"Storage" tab** (Firefox)
3. **Click "Clear site data"** button
4. **Check ALL boxes:**
   - ✅ Cookies and other site data
   - ✅ Cached images and files
   - ✅ Service workers
   - ✅ Storage
   - ✅ IndexedDB
   - ✅ Local storage
5. **Click "Clear site data"**
6. **Close browser completely**
7. **Reopen browser**
8. **Visit:** `https://www.dctnow.ngo`

**Method 2: Hard Refresh with Cache Disabled**

1. **Press `F12`**
2. **Go to "Network" tab**
3. **Check "Disable cache"** checkbox
4. **Keep DevTools open** (important!)
5. **Press `Ctrl + Shift + R`** (hard refresh)
6. **Visit:** `https://www.dctnow.ngo`

**Method 3: Incognito/Private Window**

1. **Open incognito:** `Ctrl + Shift + N` (Chrome) or `Ctrl + Shift + P` (Firefox)
2. **Visit:** `https://www.dctnow.ngo`
3. **Should work immediately** (no cache in incognito)

### Step 4: Add Version Parameter (Temporary Workaround)

**If cache is still an issue, add this to your URL:**
```
https://www.dctnow.ngo/?v=2
```

This forces the browser to treat it as a new page and bypass cache.

### Step 5: Verify After Clearing

**After clearing cache, check:**

1. **Open Network tab (F12)**
2. **Filter by "Doc" or "HTML"**
3. **Click on `index.html`**
4. **Check "Response Headers":**
   - Should see: `Cache-Control: no-cache, no-store, must-revalidate`
   - Should see: `Pragma: no-cache`
   - Should see: `Expires: 0`

5. **Check "Response" tab:**
   - Search for: `index-6f0f6099.js`
   - Should see it (not `index-0125b9ae.js`)

6. **Filter by "JS"**
   - Should see: `index-6f0f6099.js` loading (status 200)
   - Should NOT see: `index-0125b9ae.js` (404)

## 🔍 Diagnostic: Check What Browser is Loading

**Run this in browser console (F12 → Console):**

```javascript
// Check what index.html the browser has
fetch('/index.html?t=' + Date.now(), {cache: 'no-store'})
  .then(r => r.text())
  .then(html => {
    const match = html.match(/index-([a-f0-9]+)\.js/);
    console.log('Browser loaded:', match ? match[0] : 'NOT FOUND');
    console.log('Expected: index-6f0f6099.js');
    console.log('Match:', match && match[0] === 'index-6f0f6099.js' ? '✅ CORRECT' : '❌ WRONG - Still cached');
  });
```

## 📋 Complete Checklist

- [ ] Verified `public_html/.htaccess` has cache prevention headers
- [ ] Uploaded updated `frontend/.htaccess` to `public_html/.htaccess`
- [ ] Cleared Sucuri CDN cache (or waited 10-15 minutes)
- [ ] Cleared browser cache (Application tab → Clear site data)
- [ ] Closed and reopened browser
- [ ] Tested in incognito mode
- [ ] Verified Network tab shows correct file loading
- [ ] Site works without query parameters

## 🚨 If Still Not Working

**If browser still loads old file after all steps:**

1. **Check if `.htaccess` is being read:**
   - Temporarily add a syntax error to `.htaccess`
   - If site breaks, `.htaccess` is being read
   - Remove error after testing

2. **Check file permissions:**
   - `.htaccess` should be `644`
   - `index.html` should be `644`

3. **Try different browser:**
   - Test in Chrome, Firefox, Edge
   - If one works, it's browser-specific cache

4. **Check for service workers:**
   - F12 → Application → Service Workers
   - Unregister any service workers

5. **Contact Sucuri support** if CDN cache won't clear

---

## 💡 Why This Happens

- **Browser cache:** Browsers cache `index.html` aggressively
- **CDN cache:** Sucuri Cloudproxy caches files for performance
- **Service workers:** Can cache files independently

The cache prevention headers in `.htaccess` tell both browser and CDN not to cache `index.html`, but you need to clear existing cache first.
