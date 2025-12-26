# Deploy Backend to Vercel

This guide will help you deploy the Diya NGO backend to Vercel so it works on both desktop and mobile.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free)
2. **Vercel CLI** (optional, but recommended):
   ```bash
   npm install -g vercel
   ```

## Step 1: Prepare Your Backend

The backend is already configured for Vercel deployment. Make sure you have:
- ✅ `vercel.json` in the backend folder
- ✅ `server.js` exports the app for serverless
- ✅ All dependencies in `package.json`

## Step 2: Set Up Environment Variables in Vercel

You need to add your Google Sheets credentials to Vercel:

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your repository or upload the backend folder
4. Before deploying, go to **Settings → Environment Variables**
5. Add these variables:

   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL=diya-sheets-service@diya-ngo-backend.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n
   GOOGLE_SHEET_ID=1FvSO7x0TJDIyaHkDi-VhSNER6nIUKGO5r6A7td6N5PU
   GOOGLE_SHEET_NAME=Volunteers
   ```

   **Important**: 
   - For `GOOGLE_PRIVATE_KEY`, keep the `\n` characters - they're needed for line breaks
   - Copy the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### Option B: Using Vercel CLI

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Set environment variables:
   ```bash
   vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
   vercel env add GOOGLE_PRIVATE_KEY
   vercel env add GOOGLE_SHEET_ID
   vercel env add GOOGLE_SHEET_NAME
   ```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. **Import Git Repository**:
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Set **Root Directory** to `backend`
   - Click **Deploy**

4. **Or Upload Folder**:
   - Click **"Browse"** and select your `backend` folder
   - Vercel will detect the configuration automatically
   - Click **Deploy**

### Option B: Using Vercel CLI

1. Navigate to backend folder:
   ```bash
   cd backend
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Link to existing project? **No** (first time)
   - Project name: `diya-ngo-backend` (or your choice)
   - Directory: `.` (current directory)
   - Override settings? **No**

5. For production deployment:
   ```bash
   vercel --prod
   ```

## Step 4: Get Your Backend URL

After deployment, Vercel will give you a URL like:
```
https://diya-ngo-backend.vercel.app
```

Or if you have a custom domain:
```
https://api.yourdomain.com
```

## Step 5: Update Frontend to Use Deployed Backend

1. Create or update `frontend/.env`:
   ```env
   VITE_API_BASE_URL=https://diya-ngo-backend.vercel.app
   ```

   Replace `diya-ngo-backend.vercel.app` with your actual Vercel URL.

2. Restart your frontend dev server:
   ```bash
   cd frontend
   npm run dev
   ```

3. For production build:
   ```bash
   npm run build
   ```

## Step 6: Test the Deployment

1. **Test Health Endpoint**:
   Open in browser: `https://your-backend-url.vercel.app/api/health`
   
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Test Volunteer Form**:
   - Fill out the volunteer form on your website
   - Check if data appears in Google Sheets
   - Test on both desktop and mobile

## Troubleshooting

### Issue: "Cannot connect to server"

**Solution**: 
- Check that your backend URL in `frontend/.env` is correct
- Make sure backend is deployed (check Vercel dashboard)
- Verify environment variables are set in Vercel

### Issue: "Failed to write to Google Sheets"

**Solution**:
- Check Google Sheets credentials in Vercel environment variables
- Verify `GOOGLE_PRIVATE_KEY` has `\n` for line breaks
- Make sure service account email has access to the Google Sheet
- Check Vercel function logs for detailed errors

### Issue: Environment variables not working

**Solution**:
- After adding environment variables, **redeploy** your backend
- Environment variables are set at build time
- Use Vercel dashboard → Your Project → Settings → Environment Variables

### View Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Functions"** tab
4. Click on a function to see logs
5. Or use CLI: `vercel logs`

## Updating Your Backend

After making changes:

1. **Using CLI**:
   ```bash
   cd backend
   vercel --prod
   ```

2. **Using Git**:
   - Push changes to your repository
   - Vercel will automatically redeploy (if connected)

## Production Checklist

- ✅ Backend deployed to Vercel
- ✅ Environment variables set in Vercel
- ✅ Frontend `.env` updated with backend URL
- ✅ Health endpoint working
- ✅ Volunteer form tested on desktop
- ✅ Volunteer form tested on mobile
- ✅ Data appearing in Google Sheets

## Next Steps

1. **Custom Domain** (Optional):
   - Add custom domain in Vercel dashboard
   - Update `VITE_API_BASE_URL` to use custom domain

2. **Monitor Usage**:
   - Check Vercel dashboard for function invocations
   - Monitor Google Sheets API quota

3. **Set Up Alerts**:
   - Configure error alerts in Vercel
   - Monitor Google Sheets access

## Support

If you encounter issues:
1. Check Vercel function logs
2. Verify environment variables
3. Test API endpoints directly
4. Check Google Sheets permissions

