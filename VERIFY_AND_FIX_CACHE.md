# 🔧 Verify Server File and Clear Cache

## 🚨 Current Issue

Browser is still requesting `index-0125b9ae.js` (old hash), which means:
- Either the new `index.html` isn't on the server yet
- Or browser cache is very aggressive

## ✅ Step 1: Verify Server File

### Check What's Actually on GoDaddy

**Method 1: View Source (Recommended)**
1. Visit: `https://www.dctnow.ngo/index.html`
2. **Right-click** → **"View Page Source"**
3. **Search for:** `index-2875fee5.js`
4. **Check:**
   - ✅ If you see `index-2875fee5.js` → File is correct, it's browser cache
   - ❌ If you see `index-0125b9ae.js` → Old file is still on server

**Method 2: Direct File Check**
1. Visit: `https://www.dctnow.ngo/index.html?nocache=12345`
2. **Right-click** → **"View Page Source"**
3. **Search for:** `index-2875fee5.js`

## ✅ Step 2: If Old File is on Server

**If you see `index-0125b9ae.js` in the source:**

1. **Go to GoDaddy File Manager**
2. **Delete `public_html/index.html`**
3. **Upload NEW `frontend/dist/index.html`** (from your latest build)
4. **Verify upload:**
   - Check file modification date (should be recent)
   - Check file size matches local file

## ✅ Step 3: Clear Browser Cache Aggressively

### Method 1: Hard Refresh
- **Windows:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`

### Method 2: Clear All Site Data
1. Press `F12` (Developer Tools)
2. Go to **"Application"** tab (Chrome) or **"Storage"** tab (Firefox)
3. Click **"Clear site data"** or **"Clear storage"**
4. Check all boxes
5. Click **"Clear site data"**

### Method 3: Disable Cache (While DevTools Open)
1. Press `F12`
2. Go to **Network** tab
3. Check **"Disable cache"** checkbox
4. Keep DevTools open while testing

### Method 4: Incognito/Private Window
- **Windows:** `Ctrl + Shift + N` (Chrome) or `Ctrl + Shift + P` (Firefox)
- **Mac:** `Cmd + Shift + N` (Chrome) or `Cmd + Shift + P` (Firefox)
- Test site in incognito mode

## ✅ Step 4: Check for Service Worker

**Service workers can cache aggressively:**

1. Press `F12`
2. Go to **"Application"** tab (Chrome) or **"Storage"** tab (Firefox)
3. Look for **"Service Workers"** section
4. If any are registered:
   - Click **"Unregister"**
   - Or check **"Update on reload"**

## ✅ Step 5: Verify After Cache Clear

1. **Hard refresh:** `Ctrl + Shift + R`
2. **Check Network tab (F12):**
   - Filter by "JS"
   - Should see `index-2875fee5.js` loading (status 200)
   - Should NOT see `index-0125b9ae.js` (404)

## 🔍 Quick Diagnostic

**Run this in browser console (F12 → Console tab):**

```javascript
// Check what index.html is actually loading
fetch('/index.html?t=' + Date.now())
  .then(r => r.text())
  .then(html => {
    const match = html.match(/index-([a-f0-9]+)\.js/);
    if (match) {
      console.log('Server is serving:', match[0]);
      console.log('Expected: index-2875fee5.js');
      console.log('Match:', match[0] === 'index-2875fee5.js' ? '✅ CORRECT' : '❌ WRONG - Need to upload new index.html');
    }
  });
```

This will tell you exactly what hash the server is serving.

---

## 📋 Checklist

- [ ] Verified server file (View Page Source)
- [ ] If old file on server → Uploaded new `index.html`
- [ ] Cleared browser cache (hard refresh)
- [ ] Cleared site data (Application tab)
- [ ] Tested in incognito mode
- [ ] Checked for service workers
- [ ] Verified Network tab shows correct file loading
