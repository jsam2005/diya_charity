# Google Sheets Integration Setup Guide

This guide will help you set up the backend to automatically save volunteer form submissions to Google Sheets using your email: **dctnow.ngo@gmail.com**

## Overview

When a volunteer fills out the form on your website, their information will be automatically saved to a Google Sheet. This includes:
- Personal information (name, email, phone, gender)
- Volunteer preferences
- Availability
- Additional comments/message

## Prerequisites

- Google account: dctnow.ngo@gmail.com
- Node.js installed (v16 or higher)
- A Google Sheet ready to receive the data

## Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with **dctnow.ngo@gmail.com**
3. Click the project dropdown at the top → "New Project"
4. Name: **"Diya NGO Backend"**
5. Click "Create"
6. Wait for the project to be created, then select it

### Step 2: Enable Google Sheets API

1. In your project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and click **"Enable"**
4. Wait for it to enable (usually takes a few seconds)

### Step 3: Create Service Account

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"Create Credentials"** → **"Service Account"**
3. Fill in:
   - **Service account name**: `diya-sheets-service`
   - **Service account ID**: (auto-generated, you can change it)
   - **Description**: "Service account for Diya NGO volunteer form"
4. Click **"Create and Continue"**
5. Skip the optional steps (click "Continue" and then "Done")

### Step 4: Create Service Account Key

1. In the Credentials page, find your service account (it will have an email like `diya-sheets-service@your-project.iam.gserviceaccount.com`)
2. Click on the service account email
3. Go to the **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Choose **"JSON"** format
6. Click **"Create"**
7. **IMPORTANT**: A JSON file will download automatically. Save this file securely - you'll need it!

### Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Sign in with **dctnow.ngo@gmail.com**
3. Create a new spreadsheet
4. Name it: **"Diya NGO Volunteers"** (or any name you prefer)
5. **Copy the Sheet ID** from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`
   - Example: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t`

### Step 6: Share Sheet with Service Account

1. Open your Google Sheet
2. Click the **"Share"** button (top right, blue button)
3. In the "Add people and groups" field, paste the **service account email**:
   - You can find this in the JSON file you downloaded (field: `client_email`)
   - Or in Google Cloud Console → Credentials → Your service account
   - It looks like: `diya-sheets-service@your-project.iam.gserviceaccount.com`
4. Make sure it has **"Editor"** permissions (should be default)
5. **Uncheck** "Notify people" (optional, since it's a service account)
6. Click **"Share"**

### Step 7: Install Backend Dependencies

1. Open terminal/command prompt
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Step 8: Configure Environment Variables

1. Open the JSON file you downloaded in Step 4
2. You'll see something like this:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "diya-sheets-service@your-project.iam.gserviceaccount.com",
     ...
   }
   ```

3. Create a `.env` file in the `backend` folder:
   ```bash
   # In the backend folder
   # Create .env file (you can copy from .env.example if it exists)
   ```

4. Add these values to `.env`:
   ```env
   PORT=3001

   # From the JSON file - client_email field
   GOOGLE_SERVICE_ACCOUNT_EMAIL=diya-sheets-service@your-project.iam.gserviceaccount.com

   # From the JSON file - private_key field (keep the entire key including BEGIN/END)
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour actual private key here\n-----END PRIVATE KEY-----\n"

   # From Step 5 - the Sheet ID from the URL
   GOOGLE_SHEET_ID=your-sheet-id-here

   # Sheet name (tab name) - default is "Volunteers"
   GOOGLE_SHEET_NAME=Volunteers
   ```

   **Important Notes:**
   - Keep the quotes around `GOOGLE_PRIVATE_KEY`
   - Include the entire private key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - The `\n` characters should be kept as-is (the code handles them)

### Step 9: Test the Setup

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. You should see:
   ```
   🚀 Server running on port 3001
   📊 Volunteer form submissions will be saved to Google Sheets
   ```

3. Test the health endpoint:
   - Open browser: http://localhost:3001/api/health
   - Should show: `{"status":"ok","message":"Server is running"}`

4. Test form submission:
   - Open your frontend (if running) and submit the volunteer form
   - Or use curl:
     ```bash
     curl -X POST http://localhost:3001/api/volunteer/submit \
       -H "Content-Type: application/json" \
       -d '{
         "firstName": "Test",
         "email": "test@example.com",
         "phone": "+91 1234567890"
       }'
     ```

5. Check your Google Sheet:
   - Open the sheet you created
   - You should see headers in row 1 (if it's a new sheet)
   - You should see a new row with the test data

### Step 10: Configure Frontend

1. In the `frontend` folder, create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://localhost:3001
   ```

2. For production, update this to your deployed backend URL:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.com
   ```

3. Restart your frontend dev server if it's running

## Troubleshooting

### ❌ Error: "GOOGLE_SHEET_ID is not configured"
**Solution:** Make sure your `.env` file exists and has `GOOGLE_SHEET_ID` set correctly.

### ❌ Error: "The caller does not have permission"
**Solution:** 
- Make sure you shared the Google Sheet with the service account email
- Check that the service account has "Editor" permissions (not just "Viewer")
- Double-check the service account email is correct

### ❌ Error: "Invalid credentials"
**Solution:**
- Verify `GOOGLE_SERVICE_ACCOUNT_EMAIL` matches the `client_email` from your JSON file
- Verify `GOOGLE_PRIVATE_KEY` includes the full key with BEGIN/END markers
- Make sure there are quotes around the private key value
- Check for any extra spaces or line breaks

### ❌ Error: "Sheet not found"
**Solution:**
- Verify the `GOOGLE_SHEET_ID` is correct (copy from the URL again)
- Make sure the sheet is shared with the service account
- Check that `GOOGLE_SHEET_NAME` matches the tab name (default is "Volunteers")

### ❌ Form submits but nothing appears in Google Sheets
**Solution:**
- Check the backend server logs for errors
- Verify the service account has Editor access to the sheet
- Check that the sheet ID is correct
- Try creating a new sheet and updating the ID

### ❌ CORS Error in Browser
**Solution:**
- Make sure the backend server is running
- Check that `VITE_API_BASE_URL` in frontend `.env` matches your backend URL
- Verify CORS is enabled in the backend (it should be by default)

## Production Deployment

When deploying to production:

1. **Backend Deployment:**
   - Deploy your backend to a hosting service (Vercel, Heroku, Railway, etc.)
   - Set environment variables in your hosting platform's dashboard
   - Use the same `.env` values but ensure they're set as environment variables

2. **Frontend Deployment:**
   - Update `VITE_API_BASE_URL` to your production backend URL
   - Rebuild the frontend: `npm run build`
   - Deploy the `dist` folder

3. **Security:**
   - Never commit `.env` files to Git
   - Keep your service account JSON file secure
   - Use environment variables in your hosting platform

## Google Sheets Structure

The backend automatically creates columns in this order:
1. **Timestamp** - When the form was submitted
2. **First Name** - Volunteer's first name
3. **Last Name** - Volunteer's last name (optional)
4. **Gender** - Gender selection (optional)
5. **Email** - Volunteer's email address
6. **Phone** - Volunteer's phone number
7. **Volunteer Preferences** - Comma-separated list of selected preferences
8. **Availability** - Comma-separated list of availability options
9. **Message** - Additional comments/message from volunteer

## Support

If you encounter issues:
1. Check the backend server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the Google Sheets API access manually
4. Make sure the service account has proper permissions

## Next Steps

Once setup is complete:
- ✅ Volunteer forms will automatically save to Google Sheets
- ✅ You can view all submissions in your Google Sheet
- ✅ You can export, filter, and analyze the data
- ✅ You can set up email notifications in Google Sheets (optional)

---

**Need Help?** Check the backend [SETUP.md](./backend/SETUP.md) for more detailed technical information.


