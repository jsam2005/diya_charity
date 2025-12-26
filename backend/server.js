import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { submitVolunteerForm } from './services/googleSheets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Volunteer form submission endpoint
app.post('/api/volunteer/submit', async (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    if (!formData.firstName || !formData.email) {
      return res.status(400).json({
        success: false,
        error: 'First name and email are required'
      });
    }

    // Submit to Google Sheets
    const result = await submitVolunteerForm(formData);
    
    res.json({
      success: true,
      message: 'Volunteer form submitted successfully',
      data: result
    });
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to submit volunteer form'
    });
  }
});

// Helpful message for GET requests to volunteer endpoint
app.get('/api/volunteer/submit', (req, res) => {
  res.status(405).json({
    success: false,
    error: 'Method not allowed',
    message: 'This endpoint only accepts POST requests. Use POST to submit volunteer form data.',
    example: {
      method: 'POST',
      url: '/api/volunteer/submit',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        firstName: 'John',
        email: 'john@example.com',
        phone: '+91 1234567890'
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Export for Vercel serverless
export default app;

// Only listen if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Volunteer form submissions will be saved to Google Sheets`);
  });
}

