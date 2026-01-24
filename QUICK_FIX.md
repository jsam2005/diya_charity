# ⚡ Quick Fix for Blank Page

## The Problem
JavaScript file `index-0125b9ae.js` is missing on the server, causing a blank page.

## The Solution (3 Steps)

### 1️⃣ Build Frontend

```powershell
cd frontend
npm install
npm run build
```

**Wait for:** `✓ built in X.XXs`

### 2️⃣ Upload to GoDaddy

**In GoDaddy File Manager (`public_html/`):**

1. **DELETE:**
   - `index.html` (old)
   - `assets/` folder (old)

2. **UPLOAD from `frontend/dist/`:**
   - `index.html` → `public_html/index.html`
   - `assets/` folder (entire folder) → `public_html/assets/`
   - `.htaccess` → `public_html/.htaccess`

3. **Set permissions:**
   - Folders: `755`
   - Files: `644`

### 3️⃣ Verify

**In GoDaddy File Manager:**
- Open `public_html/index.html`
- Search for `assets/index-`
- Note the filename (e.g., `index-0125b9ae.js`)
- Verify that EXACT file exists in `public_html/assets/`

**If filename doesn't match:**
- The build changed
- Rebuild and re-upload everything

### 4️⃣ Test

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit: `https://www.dctnow.ngo`
3. Check console (F12) - should have NO 404 errors

---

## ⚠️ Common Mistakes

❌ **Only uploading `index.html`** → Missing `assets/` folder
❌ **Uploading old build** → Filename hash doesn't match
❌ **Not clearing browser cache** → Browser shows old cached error
❌ **Wrong permissions** → Server can't read files

---

## ✅ Success Checklist

- [ ] Built frontend successfully
- [ ] Deleted old files from GoDaddy
- [ ] Uploaded NEW `index.html` AND `assets/` folder
- [ ] Verified filename in HTML matches file in assets/
- [ ] Set correct permissions
- [ ] Cleared browser cache
- [ ] Site loads (not blank)
