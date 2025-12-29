# Quick Start Guide - Volunteer Form to Google Sheets

## 🚀 Quick Setup (5 Minutes)

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Google Sheets API Setup

1. **Create Google Cloud Project:**
   - Go to https://console.cloud.google.com/
   - Sign in with dctnow.ngo@gmail.com
   - Create new project: "Diya NGO Backend"

2. **Enable Google Sheets API:**
   - APIs & Services → Library → Search "Google Sheets API" → Enable

3. **Create Service Account:**
   - APIs & Services → Credentials → Create Credentials → Service Account
   - Name: `diya-sheets-service`
   - Create Key → JSON format → Download JSON file

4. **Create Google Sheet:**
   - Go to https://sheets.google.com/
   - Create new sheet: "Diya NGO Volunteers"
   - Copy Sheet ID from URL (between `/d/` and `/edit`)

5. **Share Sheet:**
   - Click Share button
   - Add service account email (from JSON file: `client_email`)
   - Give "Editor" permission

### 3. Configure Backend

Create `backend/.env` file:

```env
PORT=3001
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-here
GOOGLE_SHEET_NAME=Volunteers
```

**Get values from:**
- `GOOGLE_SERVICE_ACCOUNT_EMAIL`: From JSON file → `client_email`
- `GOOGLE_PRIVATE_KEY`: From JSON file → `private_key` (keep full key with BEGIN/END)
- `GOOGLE_SHEET_ID`: From Google Sheet URL

### 4. Start Backend

```bash
cd backend
npm start
```

Should see: `🚀 Server running on port 3001`

### 5. Configure Frontend

Create `frontend/.env` file:

```env
VITE_API_BASE_URL=http://localhost:3001
```

### 6. Test

1. Start frontend: `cd frontend && npm run dev`
2. Fill out volunteer form
3. Submit form
4. Check Google Sheet - new row should appear!

## 📋 What Gets Saved

Each form submission creates a row with:
- Timestamp
- First Name, Last Name, Gender
- Email, Phone
- Volunteer Preferences (comma-separated)
- Availability (comma-separated)
- Message/Comments

## 🔧 Troubleshooting

**Backend not starting?**
- Check `.env` file exists and has all variables
- Verify JSON file values are correct

**Form submits but no data in sheet?**
- Check service account has Editor access to sheet
- Verify Sheet ID is correct
- Check backend logs for errors

**CORS errors?**
- Make sure backend is running on port 3001
- Verify `VITE_API_BASE_URL` matches backend URL

## 📚 Full Documentation

- **Detailed Setup:** See [GOOGLE_SHEETS_SETUP.md](./GOOGLE_SHEETS_SETUP.md)
- **Backend Docs:** See [backend/SETUP.md](./backend/SETUP.md)
- **Backend README:** See [backend/README.md](./backend/README.md)




