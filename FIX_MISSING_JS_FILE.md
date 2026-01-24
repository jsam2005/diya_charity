# 🔧 Fix Missing JavaScript File (404 on assets/index-*.js)

## 🚨 Problem

The browser is trying to load `https://www.dctnow.ngo/assets/index-0125b9ae.js` but getting a 404 error. This causes a blank white page because React can't load.

## ✅ Solution: Rebuild and Re-upload Frontend

### Step 1: Rebuild Frontend

```bash
cd frontend
npm install
npm run build
```

**This will create/update:**
- `frontend/dist/index.html` (with correct JavaScript file reference)
- `frontend/dist/assets/index-XXXXX.js` (the actual JavaScript file)
- `frontend/dist/assets/index-XXXXX.css` (CSS file)

### Step 2: Verify Build Output

**Check that these files exist:**
- [ ] `frontend/dist/index.html`
- [ ] `frontend/dist/assets/` folder exists
- [ ] `frontend/dist/assets/index-*.js` file exists (note the hash)
- [ ] `frontend/dist/assets/index-*.css` file exists
- [ ] `frontend/dist/.htaccess` exists

**Important:** The hash in the filename (like `0125b9ae`) will change with each build. The `index.html` will automatically reference the correct hash.

### Step 3: Upload to GoDaddy

**In GoDaddy File Manager (`public_html/`):**

1. **Delete old files** (but keep `api/` folder):
   - Delete `index.html` (old one)
   - Delete `assets/` folder (old one)
   - Keep `api/` folder untouched

2. **Upload NEW files from `frontend/dist/`:**
   - Upload `index.html` → `public_html/index.html`
   - Upload entire `assets/` folder → `public_html/assets/`
   - Upload `.htaccess` → `public_html/.htaccess`

3. **Set file permissions:**
   - Folders: `755`
   - Files: `644`

### Step 4: Verify Upload

**In GoDaddy File Manager, check:**
- [ ] `public_html/index.html` exists
- [ ] `public_html/assets/` folder exists
- [ ] `public_html/assets/index-*.js` file exists (check the hash matches what's in `index.html`)
- [ ] `public_html/assets/index-*.css` file exists
- [ ] `public_html/.htaccess` exists

### Step 5: Test

1. **Clear browser cache** (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. **Visit:** `https://www.dctnow.ngo`
3. **Check browser console (F12):**
   - Should see no 404 errors
   - JavaScript file should load successfully
   - Page should render (not blank)

---

## 🔍 Why This Happens

1. **Build hash mismatch:** Each build generates files with unique hashes. If `index.html` references `index-0125b9ae.js` but you uploaded a different build with `index-abc123.js`, you'll get a 404.

2. **Incomplete upload:** Only `index.html` was uploaded, but `assets/` folder was missing.

3. **Old build:** An old `index.html` is referencing a JavaScript file from a previous build that no longer exists.

---

## ✅ Prevention

**Always upload the ENTIRE `dist/` folder contents together:**
- `index.html`
- `assets/` folder (all files inside)
- `.htaccess`

**Never upload just `index.html` without the `assets/` folder!**

---

## 🚨 Quick Fix Checklist

- [ ] Rebuild frontend (`npm run build`)
- [ ] Verify `dist/assets/` has JavaScript files
- [ ] Delete old `index.html` and `assets/` from GoDaddy
- [ ] Upload NEW `index.html` and `assets/` folder
- [ ] Verify file permissions (755 for folders, 644 for files)
- [ ] Clear browser cache
- [ ] Test the site

---

## 📝 Still Not Working?

**If you still get 404 after uploading:**

1. **Check the exact filename in `index.html`:**
   - Open `public_html/index.html` in GoDaddy File Manager
   - Search for `assets/index-`
   - Note the exact filename (e.g., `index-0125b9ae.js`)
   - Verify that EXACT file exists in `public_html/assets/`

2. **Check `.htaccess` isn't blocking assets:**
   - Verify `.htaccess` has this rule:
   ```apache
   # Don't rewrite assets
   RewriteCond %{REQUEST_URI} ^/assets(/.*)?$ [NC]
   RewriteRule . - [L]
   ```

3. **Test direct file access:**
   - Try: `https://www.dctnow.ngo/assets/index-0125b9ae.js`
   - Should return JavaScript code (not 404)

4. **Check file permissions:**
   - `assets/` folder: `755`
   - `index-*.js` file: `644`
