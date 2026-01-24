# ✅ Fix Hash Mismatch - Simple Solution

## 🔍 The Problem

- **Browser is looking for:** `index-0125b9ae.js` (old hash)
- **File that exists:** `index-2875fee5.js` (new hash from latest build)
- **Root cause:** `index.html` on server is OLD and references the wrong file

## ✅ The Solution (2 Steps)

### Step 1: Upload NEW index.html

**In GoDaddy File Manager (`public_html/`):**

1. **Delete the OLD `index.html`**
   - Go to `public_html/index.html`
   - Delete it

2. **Upload the NEW `index.html`**
   - Source: `frontend/dist/index.html` (just built)
   - Destination: `public_html/index.html`
   - This NEW file references `index-2875fee5.js` (the correct file)

### Step 2: Verify

1. **Open `public_html/index.html` in GoDaddy File Manager**
2. **Search for:** `assets/index-`
3. **Should see:** `index-2875fee5.js` (matches the file that exists)
4. **Should NOT see:** `index-0125b9ae.js` (old hash)

### Step 3: Test

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Visit:** `https://www.dctnow.ngo`
3. **Check console (F12):** Should have NO 404 errors
4. **Page should load!** ✅

---

## 📋 Quick Checklist

- [ ] Deleted OLD `public_html/index.html`
- [ ] Uploaded NEW `frontend/dist/index.html` to `public_html/`
- [ ] Verified `index.html` references `index-2875fee5.js`
- [ ] Cleared browser cache
- [ ] Tested the site

---

## 🎯 Why This Happened

When you rebuild the frontend, Vite generates new file hashes. The `index.html` file contains references to these hashed filenames. If you upload new JavaScript files but keep the old `index.html`, the hashes won't match.

**Always upload `index.html` and `assets/` folder together!**
