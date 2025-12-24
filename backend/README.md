# Diya NGO Backend Server

Backend server for collecting volunteer form submissions and saving them to Google Sheets.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Google Sheets API:**
   - Follow the detailed instructions in [SETUP.md](./SETUP.md)
   - Create a `.env` file with your credentials

3. **Start the server:**
   ```bash
   npm start
   ```

4. **For development with auto-reload:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

### Submit Volunteer Form
```
POST /api/volunteer/submit
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "gender": "Male",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "volunteerPreferences": ["Event Setup", "Teaching"],
  "availability": ["Weekends", "Evening"],
  "message": "I want to volunteer..."
}
```

## Environment Variables

See `.env.example` for required environment variables.

## Google Sheets Structure

The backend automatically creates a sheet with the following columns:
- Timestamp
- First Name
- Last Name
- Gender
- Email
- Phone
- Volunteer Preferences
- Availability
- Message

## Troubleshooting

See [SETUP.md](./SETUP.md) for detailed troubleshooting guide.

