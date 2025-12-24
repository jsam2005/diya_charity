import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

/**
 * Submit volunteer form data to Google Sheets
 * @param {Object} formData - Volunteer form data
 * @returns {Promise<Object>} Result of the operation
 */
export async function submitVolunteerForm(formData) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const sheetName = process.env.GOOGLE_SHEET_NAME || 'Volunteers';

  if (!spreadsheetId) {
    throw new Error('GOOGLE_SHEET_ID is not configured');
  }

  // Format the data as a row
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'short',
    timeStyle: 'medium'
  });

  const row = [
    timestamp,
    formData.firstName || '',
    formData.lastName || '',
    formData.gender || '',
    formData.email || '',
    formData.phone || '',
    formData.volunteerPreferences?.join(', ') || '',
    formData.availability?.join(', ') || '',
    formData.message || '',
  ];

  try {
    // First, check if sheet exists and has headers
    const sheetExists = await checkSheetExists(spreadsheetId, sheetName);
    
    if (!sheetExists) {
      // Create sheet with headers
      await createSheetWithHeaders(spreadsheetId, sheetName);
    }

    // Check if headers exist
    const hasHeaders = await checkHeadersExist(spreadsheetId, sheetName);
    
    if (!hasHeaders) {
      // Add headers
      await addHeaders(spreadsheetId, sheetName);
    }

    // Append the row
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:I`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [row],
      },
    });

    return {
      success: true,
      updatedRows: response.data.updates?.updatedRows || 0,
      spreadsheetId,
      sheetName,
    };
  } catch (error) {
    console.error('Error writing to Google Sheets:', error);
    throw new Error(`Failed to write to Google Sheets: ${error.message}`);
  }
}

/**
 * Check if sheet exists
 */
async function checkSheetExists(spreadsheetId, sheetName) {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    
    return response.data.sheets?.some(
      sheet => sheet.properties.title === sheetName
    ) || false;
  } catch (error) {
    console.error('Error checking sheet existence:', error);
    return false;
  }
}

/**
 * Create a new sheet with headers
 */
async function createSheetWithHeaders(spreadsheetId, sheetName) {
  try {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });

    // Add headers
    await addHeaders(spreadsheetId, sheetName);
  } catch (error) {
    console.error('Error creating sheet:', error);
    throw error;
  }
}

/**
 * Check if headers exist in the sheet
 */
async function checkHeadersExist(spreadsheetId, sheetName) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:I1`,
    });

    const headers = response.data.values?.[0] || [];
    const expectedHeaders = [
      'Timestamp',
      'First Name',
      'Last Name',
      'Gender',
      'Email',
      'Phone',
      'Volunteer Preferences',
      'Availability',
      'Message',
    ];

    return headers.length > 0 && headers[0] === expectedHeaders[0];
  } catch (error) {
    // If range doesn't exist, headers don't exist
    return false;
  }
}

/**
 * Add headers to the sheet
 */
async function addHeaders(spreadsheetId, sheetName) {
  const headers = [
    'Timestamp',
    'First Name',
    'Last Name',
    'Gender',
    'Email',
    'Phone',
    'Volunteer Preferences',
    'Availability',
    'Message',
  ];

  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:I1`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [headers],
      },
    });
  } catch (error) {
    console.error('Error adding headers:', error);
    throw error;
  }
}

/**
 * Get sheet ID by name
 */
async function getSheetId(spreadsheetId, sheetName) {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const sheet = response.data.sheets?.find(
      sheet => sheet.properties.title === sheetName
    );

    return sheet?.properties.sheetId;
  } catch (error) {
    console.error('Error getting sheet ID:', error);
    throw error;
  }
}

