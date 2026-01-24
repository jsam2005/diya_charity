# 🔧 Fix Blank White Page on GoDaddy

## 🚨 Critical: Blank Page Diagnosis

A blank white page usually means:
1. **JavaScript files aren't loading** (404 errors)
2. **Build wasn't deployed correctly**
3. **JavaScript errors preventing React from mounting**
4. **Missing base tag or incorrect asset paths**

---

## ✅ Step 1: Check Browser Console

**Open your browser's Developer Tools (F12) and check:**

1. **Console Tab:**
   - Look for **red error messages**
   - Common errors:
     - `Failed to load module script`
     - `Uncaught SyntaxError`
     - `Cannot read property of undefined`
     - `React is not defined`

2. **Network Tab:**
   - Look for **red 404 errors**
   - Check which files are failing to load:
     - `index.html` - Should return 200
     - `/assets/index-*.js` - Should return 200
     - `/assets/index-*.css` - Should return 200

---

## ✅ Step 2: Verify File Structure on GoDaddy

**In GoDaddy File Manager, check `public_html/` has:**

```
public_html/
├── index.html          ← MUST exist
├── .htaccess          ← MUST exist
└── assets/
    ├── index-*.js     ← JavaScript files
    ├── index-*.css    ← CSS files
    └── ...            ← Other assets
```

**If `assets/` folder is missing or empty:**
- The build wasn't uploaded correctly
- Re-upload the `dist/` folder contents

---

## ✅ Step 3: Check index.html Content

**Open `public_html/index.html` in GoDaddy File Manager:**

**Should contain:**
```html
<!doctype html>
<html lang="en">
  <head>
    <base href="/">
    <script type="module" src="/assets/index-XXXXX.js"></script>
    ...
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**If missing:**
- The build wasn't generated correctly
- Rebuild the frontend

---

## ✅ Step 4: Rebuild and Redeploy Frontend

### 4.1 Build Frontend

```bash
cd frontend
npm install
npm run build
```

**Verify build output:**
- Check `frontend/dist/` folder exists
- Check `frontend/dist/index.html` exists
- Check `frontend/dist/assets/` folder has files

### 4.2 Upload to GoDaddy

1. **Delete old files** from `public_html/` (except `api/` folder)
2. **Upload ALL files** from `frontend/dist/` to `public_html/`
3. **Set permissions:**
   - Folders: `755`
   - Files: `644`

### 4.3 Verify Upload

**Check in GoDaddy File Manager:**
- [ ] `public_html/index.html` exists
- [ ] `public_html/.htaccess` exists
- [ ] `public_html/assets/` folder exists
- [ ] `public_html/assets/` has JavaScript files (`.js`)

---

## ✅ Step 5: Test Direct File Access

**Try accessing these URLs directly:**

1. **Main HTML:**
   ```
   https://www.dctnow.ngo/index.html
   ```
   Should show HTML (even if blank, it should load)

2. **JavaScript file:**
   ```
   https://www.dctnow.ngo/assets/index-XXXXX.js
   ```
   (Replace `XXXXX` with actual hash from your build)
   Should return JavaScript code (not 404)

3. **CSS file:**
   ```
   https://www.dctnow.ngo/assets/index-XXXXX.css
   ```
   Should return CSS code (not 404)

**If any return 404:**
- Files weren't uploaded correctly
- Re-upload the `dist/` folder

---

## ✅ Step 6: Check .htaccess Configuration

**File:** `public_html/.htaccess`

**Must contain:**
```apache
RewriteEngine On
RewriteBase /

# Don't rewrite API requests
RewriteCond %{REQUEST_URI} ^/api(/.*)?$ [NC]
RewriteRule . - [L]

# Don't rewrite assets
RewriteCond %{REQUEST_URI} ^/assets(/.*)?$ [NC]
RewriteRule . - [L]

# Don't rewrite if file exists
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule . - [L]

# React Router - route everything else to index.html
RewriteRule . /index.html [L]
```

**If missing or incorrect:**
- Upload the correct `.htaccess` from `frontend/.htaccess`

---

## ✅ Step 7: Check JavaScript MIME Type

**If JavaScript files load but show as text:**
- GoDaddy might be serving `.js` files with wrong MIME type
- Add to `.htaccess`:

```apache
<FilesMatch "\.js$">
  ForceType application/javascript
</FilesMatch>
```

---

## ✅ Step 8: Common Issues & Fixes

### Issue: "Failed to load module script"
**Fix:** Check base tag in `index.html` - should be `<base href="/">`

### Issue: "404 on assets/index-*.js"
**Fix:** 
- Verify `assets/` folder was uploaded
- Check file permissions (644)
- Verify `.htaccess` doesn't block assets

### Issue: "React is not defined"
**Fix:** 
- Rebuild frontend (`npm run build`)
- Check all vendor chunks are uploaded

### Issue: "CORS error"
**Fix:** 
- Ensure API calls use relative URLs (`/api/...`)
- Check `.htaccess` doesn't block API requests

---

## 🔍 Quick Diagnostic Commands

**In browser console (F12), run:**

```javascript
// Check if React is loaded
console.log(window.React);

// Check if root element exists
console.log(document.getElementById('root'));

// Check for errors
console.error('Check console for errors above');
```

---

## 📞 Still Not Working?

**If the page is still blank after all checks:**

1. **Check GoDaddy error logs:**
   - cPanel → Metrics → Errors
   - Look for PHP or Apache errors

2. **Test with minimal HTML:**
   - Create `test.html` in `public_html/`:
   ```html
   <!DOCTYPE html>
   <html>
   <head><title>Test</title></head>
   <body><h1>Test Page Works</h1></body>
   </html>
   ```
   - Visit: `https://www.dctnow.ngo/test.html`
   - If this works, the issue is with the React build

3. **Contact GoDaddy support** if:
   - Files are uploaded correctly
   - Permissions are correct
   - `.htaccess` is correct
   - But page still doesn't load

---

## ✅ Success Checklist

After fixing, verify:
- [ ] Page loads (not blank)
- [ ] No console errors
- [ ] No 404 errors in Network tab
- [ ] React app renders
- [ ] Navigation works
- [ ] API calls work
