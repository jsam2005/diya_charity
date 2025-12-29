# Mobile API Setup Guide

## Issue: Volunteer Form Not Saving on Mobile

If the volunteer form works on desktop but fails on mobile, it's likely because the backend API URL is set to `localhost:3001`, which mobile devices cannot access.

## Solution

### Option 1: Use Your Computer's IP Address (For Testing)

1. **Find your computer's IP address:**
   - Windows: Open Command Prompt and run `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.1.100`)
   - Mac/Linux: Run `ifconfig` or `ip addr`

2. **Update frontend `.env` file:**
   ```env
   VITE_API_BASE_URL=http://YOUR_IP_ADDRESS:3001
   ```
   Example: `VITE_API_BASE_URL=http://192.168.1.100:3001`

3. **Make sure your mobile device and computer are on the same WiFi network**

4. **Restart frontend dev server:**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Test on mobile:** Open the site on your mobile device using your computer's IP address

### Option 2: Deploy Backend (Recommended for Production)

Deploy your backend to a hosting service:
- **Vercel** (recommended for Node.js)
- **Railway**
- **Render**
- **Heroku**

Then update `VITE_API_BASE_URL` to your deployed backend URL.

### Option 3: Use ngrok (For Quick Testing)

1. Install ngrok: https://ngrok.com/
2. Start your backend: `cd backend && npm start`
3. In another terminal, run: `ngrok http 3001`
4. Copy the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. Update frontend `.env`:
   ```env
   VITE_API_BASE_URL=https://abc123.ngrok.io
   ```

## Quick Check

1. **Check if backend is running:**
   - Open: `http://localhost:3001/api/health` in your browser
   - Should show: `{"status":"ok","message":"Server is running"}`

2. **Check frontend `.env` file:**
   - Location: `frontend/.env`
   - Should have: `VITE_API_BASE_URL=http://localhost:3001` (for desktop)
   - Or: `VITE_API_BASE_URL=http://YOUR_IP:3001` (for mobile on same network)

3. **Check browser console on mobile:**
   - Open browser dev tools
   - Look for error messages
   - Check Network tab to see if API call is being made

## Common Errors

### "Cannot connect to server"
- Backend is not running
- Wrong API URL in `.env`
- Firewall blocking port 3001

### "Network error"
- Mobile device not on same network as computer
- Backend server not accessible from mobile device

### "Failed to submit volunteer form"
- Backend is running but Google Sheets API has issues
- Check backend server logs for detailed error

## Testing Steps

1. **Test backend directly:**
   ```bash
   cd backend
   npm start
   ```
   Should see: `🚀 Server running on port 3001`

2. **Test API from mobile browser:**
   - Open: `http://YOUR_IP:3001/api/health` on mobile
   - Should show: `{"status":"ok","message":"Server is running"}`

3. **Test form submission:**
   - Fill out volunteer form on mobile
   - Check browser console for errors
   - Check backend terminal for logs

## Production Setup

For production, you need to:
1. Deploy backend to a hosting service
2. Update `VITE_API_BASE_URL` to production URL
3. Rebuild frontend: `npm run build`
4. Deploy frontend

Example production `.env`:
```env
VITE_API_BASE_URL=https://your-backend.vercel.app
```



