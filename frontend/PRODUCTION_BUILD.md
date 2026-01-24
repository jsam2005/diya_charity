# 🏗️ Frontend Production Build Guide

## Quick Build Commands

### Standard Build
```bash
cd frontend
npm install
npm run build
```

### Build for GoDaddy (with HTML update)
```bash
cd frontend
npm install
npm run build:godaddy
```

## Environment Variables

### Create `.env.production` file:

```env
# Razorpay Production Key ID (starts with rzp_live_)
VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx

# Leave empty for production (uses relative URLs)
VITE_API_BASE_URL=
```

**Important:**
- Use **production** Razorpay Key ID (not test key)
- Do NOT commit `.env.production` to git
- Build will automatically use this file when running `npm run build`

## Build Output

After building, you'll have:
- `dist/index.html` - Main HTML file
- `dist/assets/` - All JavaScript, CSS, and assets
- `dist/.htaccess` - Apache configuration (if exists)

## Upload to GoDaddy

1. Upload all files from `dist/` folder to `public_html/`
2. Maintain folder structure
3. Set permissions: folders (755), files (644)

## Verification

After deployment, check:
- [ ] Website loads at `https://yourdomain.com`
- [ ] Razorpay checkout opens (check browser console for key)
- [ ] API calls work (check Network tab)
- [ ] No 404 errors in console
