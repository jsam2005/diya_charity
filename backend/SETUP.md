# Backend Setup Guide - Google Sheets Integration

This guide will help you set up the backend to collect volunteer form data in Google Sheets.

## Prerequisites

- Node.js (v16 or higher)
- Google account (dctnow.ngo@gmail.com)
- A Google Sheet where you want to store the data

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account (dctnow.ngo@gmail.com)
3. Click on the project dropdown at the top
4. Click "New Project"
5. Name it "Diya NGO Backend" (or any name you prefer)
6. Click "Create"

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and click "Enable"

## Step 3: Create Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the details:
   - **Service account name**: `diya-sheets-service`
   - **Service account ID**: (auto-generated)
   - **Description**: "Service account for Diya NGO volunteer form"
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

## Step 4: Create and Download Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Click "Create" - this will download a JSON file
7. **IMPORTANT**: Save this file securely. You'll need the values from it.

## Step 5: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Diya NGO Volunteers" (or any name you prefer)
4. Copy the **Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - The Sheet ID is the long string between `/d/` and `/edit`

## Step 6: Share Sheet with Service Account

1. Open your Google Sheet
2. Click the "Share" button (top right)
3. Add the service account email (from Step 3, it looks like: `diya-sheets-service@your-project.iam.gserviceaccount.com`)
4. Give it "Editor" permissions
5. Click "Send" (you can uncheck "Notify people" if you want)

## Step 7: Install Dependencies

```bash
cd backend
npm install
```

## Step 8: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the downloaded JSON file from Step 4
3. Open `.env` file and fill in the values:

```env
PORT=3001

# From the JSON file:
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# From Step 5:
GOOGLE_SHEET_ID=your-google-sheet-id-here
GOOGLE_SHEET_NAME=Volunteers
```

**Important Notes:**
- The `GOOGLE_PRIVATE_KEY` should include the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Keep the quotes around the private key
- Replace `\n` with actual newlines OR keep `\n` as is (the code handles both)

## Step 9: Test the Setup

1. Start the server:
   ```bash
   npm start
   ```

2. Test the health endpoint:
   ```bash
   curl http://localhost:3001/api/health
   ```

3. Test form submission (from another terminal):
   ```bash
   curl -X POST http://localhost:3001/api/volunteer/submit \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "email": "test@example.com",
       "phone": "+91 1234567890"
     }'
   ```

4. Check your Google Sheet - you should see:
   - Headers in the first row (if it's a new sheet)
   - A new row with the test data

## Step 10: Update Frontend

The frontend needs to be configured to call this backend. See the frontend setup instructions.

## Troubleshooting

### Error: "GOOGLE_SHEET_ID is not configured"
- Make sure `.env` file exists and has `GOOGLE_SHEET_ID` set

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- Check that the service account has "Editor" permissions

### Error: "Invalid credentials"
- Double-check the `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY` in `.env`
- Make sure the private key includes the full key with BEGIN/END markers

### Error: "Sheet not found"
- Verify the `GOOGLE_SHEET_ID` is correct
- Make sure the sheet is shared with the service account

## Security Best Practices

1. **Never commit `.env` file** to version control
2. Add `.env` to `.gitignore`
3. Keep your service account JSON file secure
4. Rotate keys periodically
5. Use environment-specific sheets for development/production

## Production Deployment

When deploying to production:
1. Set environment variables in your hosting platform (Vercel, Heroku, etc.)
2. Use production Google Sheet ID
3. Ensure the service account has access to the production sheet

## Support

If you encounter issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test the Google Sheets API access manually









