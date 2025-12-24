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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Volunteer form submissions will be saved to Google Sheets`);
});

