# 🚀 GoDaddy Backend - Quick Start Checklist

Quick reference for deploying backend to GoDaddy. For detailed instructions, see [GODADDY_BACKEND_DEPLOYMENT.md](../GODADDY_BACKEND_DEPLOYMENT.md).

## ⚡ Quick Steps

### 1. Prepare Files (5 min)
- [ ] Ensure `.env` has all production values
- [ ] Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` is set
- [ ] Verify `GOOGLE_PRIVATE_KEY` is set (full key with BEGIN/END)
- [ ] Verify `GOOGLE_SHEET_ID` is set
- [ ] Verify `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` (production keys)
- [ ] Set `ALLOWED_ORIGINS` to your frontend domain(s)

### 2. Upload to GoDaddy (10 min)
- [ ] Log in to GoDaddy → cPanel
- [ ] Create folder: `public_html/backend` (or your preferred location)
- [ ] Upload files:
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `package-lock.json`
  - [ ] `.env`
  - [ ] `services/googleSheets.js` (in `services/` folder)

### 3. Setup Node.js App (10 min)
- [ ] cPanel → **Node.js Selector** → **Create Application**
- [ ] Node.js version: **18.x** or **20.x**
- [ ] Application root: `/home/username/public_html/backend`
- [ ] Application URL: `yourdomain.com/api` (or subdomain)
- [ ] Startup file: `server.js`
- [ ] Click **Create**

### 4. Configure Environment (5 min)
- [ ] Add all environment variables from `.env`:
  ```
  PORT=3001
  GOOGLE_SERVICE_ACCOUNT_EMAIL=...
  GOOGLE_PRIVATE_KEY="..."
  GOOGLE_SHEET_ID=...
  GOOGLE_SHEET_NAME=Volunteers
  GOOGLE_DONOR_SHEET_NAME=Donors
  RAZORPAY_KEY_ID=rzp_live_...
  RAZORPAY_KEY_SECRET=...
  RAZORPAY_WEBHOOK_SECRET=...
  ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
  ```

### 5. Install & Start (5 min)
- [ ] Click **"Run NPM Install"** (wait 2-5 min)
- [ ] Click **"Restart App"**
- [ ] Verify app status is **green/running**

### 6. Test (5 min)
- [ ] Visit: `https://yourdomain.com/api/api/health`
- [ ] Should see: `{"status":"ok","message":"Server is running"}`
- [ ] Test volunteer form from frontend
- [ ] Check Google Sheets for new entry

### 7. Update Frontend (5 min)
- [ ] Create `frontend/.env.production`:
  ```
  VITE_API_BASE_URL=https://yourdomain.com/api
  ```
- [ ] Rebuild: `cd frontend && npm run build`
- [ ] Upload new frontend build to GoDaddy

## 🔗 Your Backend URLs

After setup, your backend will be available at:
- **Base URL**: `https://yourdomain.com/api`
- **Health Check**: `https://yourdomain.com/api/api/health`
- **Volunteer Form**: `https://yourdomain.com/api/api/volunteer/submit`
- **Donations**: `https://yourdomain.com/api/api/donations/*`

## ⚠️ Common Issues

| Problem | Quick Fix |
|---------|-----------|
| App won't start | Check Node.js version, verify all env vars |
| 404 errors | Check Application URL, verify routes start with `/api/` |
| CORS errors | Update `ALLOWED_ORIGINS` env var, restart app |
| Google Sheets fails | Verify private key format, check service account email |
| Port issues | Check assigned port in Node.js Selector |

## 📞 Need Help?

- Full guide: [GODADDY_BACKEND_DEPLOYMENT.md](../GODADDY_BACKEND_DEPLOYMENT.md)
- Check logs in Node.js Selector
- GoDaddy Support: Available 24/7

---

**Total Time**: ~40 minutes (first time)  
**Updates**: ~5 minutes (just upload & restart)
