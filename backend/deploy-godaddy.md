# Backend Deployment Checklist for GoDaddy

> 📖 **For detailed step-by-step instructions, see [GODADDY_BACKEND_DEPLOYMENT.md](../GODADDY_BACKEND_DEPLOYMENT.md)**  
> ⚡ **For quick reference, see [GODADDY_QUICK_START.md](./GODADDY_QUICK_START.md)**

## Pre-Deployment Checklist

- [ ] All environment variables ready in `.env` file
- [ ] Google Sheets API credentials configured
- [ ] Razorpay keys configured (if using payments)
- [ ] Dependencies installed locally (`npm install`)

## Files to Upload

Upload these files/folders to GoDaddy:
- [ ] `server.js`
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `.env` (production version with real credentials)
- [ ] `services/` folder (with googleSheets.js)

**DO NOT upload:**
- `node_modules/` (install on server)
- `.git/` folder
- `README.md`, `SETUP.md`, etc. (optional)

## GoDaddy cPanel Steps

1. [ ] Access cPanel → Node.js Selector
2. [ ] Create new Node.js application
3. [ ] Set Application Root to your backend folder
4. [ ] Set Application URL (e.g., `yourdomain.com/api`)
5. [ ] Select Node.js version (18.x or 20.x LTS)
6. [ ] Set Application Startup File: `server.js`
7. [ ] Add all environment variables from `.env`
8. [ ] Click "Run NPM Install"
9. [ ] Click "Restart App"
10. [ ] Test: Visit `https://yourdomain.com/api/api/health`

## Environment Variables to Set

Add these in Node.js app settings:
```
PORT=3001
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@...
GOOGLE_PRIVATE_KEY=your-private-key
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_SHEET_NAME=Volunteers
GOOGLE_DONOR_SHEET_NAME=Donors
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

## Testing

After deployment, test these endpoints:
- [ ] `GET /api/health` - Should return `{"status":"ok"}`
- [ ] `POST /api/volunteer/submit` - Test form submission
- [ ] `POST /api/donations/create-order` - Test payment (if configured)

## Troubleshooting

### App won't start:
- Check Node.js version matches requirements
- Verify all environment variables are set
- Check application logs in Node.js selector

### API returns 404:
- Verify application URL is correct
- Check that server.js is the startup file
- Ensure routes are correct

### CORS errors:
- Update `ALLOWED_ORIGINS` environment variable
- Include your frontend domain
- Restart the app after changes
