# ✅ GoDaddy Production Deployment Checklist

## 🔧 Pre-Deployment Setup

### Frontend
- [ ] Create `frontend/.env.production` with production Razorpay Key ID
- [ ] Run `npm run build` in frontend folder
- [ ] Verify `dist/` folder contains all files

### Backend
- [ ] Update `backend-php/.env` with production credentials
- [ ] Verify all Razorpay keys are **production** keys (rzp_live_*)
- [ ] Verify Google Sheets credentials are correct
- [ ] Verify CORS includes your production domains

---

## 📤 Upload Files

### Frontend (to `public_html/`)
- [ ] Upload all files from `frontend/dist/` folder
- [ ] Maintain folder structure
- [ ] Set permissions: folders (755), files (644)

### Backend (to `public_html/api/`)
- [ ] Upload `index.php`
- [ ] Upload `config.php`
- [ ] Upload `.htaccess`
- [ ] Upload `.env` (with production values)
- [ ] Upload `services/` folder
- [ ] Upload `vendor/` folder (large, may take time)
- [ ] Upload `data/` folder
- [ ] Set permissions: folders (755), files (644), `.env` (600)

---

## ✅ Testing

### Backend API
- [ ] `https://yourdomain.com/api/health` returns `{"status":"ok"}`
- [ ] `https://yourdomain.com/api/running-line` returns JSON

### Frontend
- [ ] Website loads at `https://yourdomain.com`
- [ ] Language switcher works
- [ ] Running line displays
- [ ] Donation form loads
- [ ] Volunteer form loads

### Payments
- [ ] One-time payment opens Razorpay checkout
- [ ] Monthly subscription opens Razorpay subscription checkout
- [ ] Payments process successfully

---

## 🔒 Security

- [ ] `.env` file has permissions 600
- [ ] `.env` file is NOT accessible via browser
- [ ] Production Razorpay keys are used (not test keys)
- [ ] CORS is configured correctly

---

## 📝 Quick Commands

### Build Frontend
```bash
cd frontend
npm install
npm run build
```

### Test Backend (after upload)
```bash
curl https://yourdomain.com/api/health
```

---

## 🐛 Common Issues

**404 Errors:**
- Check file permissions
- Verify `.htaccess` is uploaded
- Check folder structure matches

**CORS Errors:**
- Verify `ALLOWED_ORIGINS` in `.env` includes your domain
- Check both www and non-www versions

**Razorpay Not Working:**
- Verify `VITE_RAZORPAY_KEY_ID` in `.env.production`
- Rebuild frontend after setting environment variable
- Check browser console for errors
