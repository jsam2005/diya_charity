import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { submitVolunteerForm } from './services/googleSheets.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Razorpay
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  console.log('✅ Razorpay initialized');
} else {
  console.warn('⚠️ Razorpay keys not found. Payment features will be disabled.');
}

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

// ==================== DONATION ENDPOINTS ====================

// Create one-time payment order
app.post('/api/donations/create-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Razorpay not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to environment variables.'
      });
    }

    const { amount, currency = 'INR' } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create payment order'
    });
  }
});

// Create subscription plan for monthly donations
app.post('/api/donations/create-plan', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Razorpay not configured'
      });
    }

    const { amount, period = 'monthly', interval = 1 } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid amount'
      });
    }
    
    const plan = await razorpay.plans.create({
      period,
      interval,
      item: {
        name: `Monthly Donation - ₹${amount / 100}`,
        amount: Math.round(amount),
        currency: 'INR',
      },
    });

    res.json({
      success: true,
      planId: plan.id
    });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create subscription plan'
    });
  }
});

// Create subscription with UPI mandate for monthly donations
app.post('/api/donations/create-subscription', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Razorpay not configured'
      });
    }

    const { planId, customerDetails, upiId } = req.body;
    
    if (!planId) {
      return res.status(400).json({
        success: false,
        error: 'Plan ID is required'
      });
    }

    // Create customer if not exists
    let customer;
    try {
      customer = await razorpay.customers.create({
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      });
    } catch (error) {
      // Customer might already exist, try to fetch by email
      console.log('Customer creation note:', error.message);
      // Continue with subscription creation
    }

    // Create subscription with UPI mandate
    const subscriptionOptions = {
      plan_id: planId,
      customer_notify: 1,
      total_count: null, // Unlimited subscriptions
      notes: {
        donation_type: 'monthly',
        upi_id: upiId || 'N/A',
      },
    };

    // If customer was created, add customer_id
    if (customer && customer.id) {
      subscriptionOptions.customer_id = customer.id;
    }

    const subscription = await razorpay.subscriptions.create(subscriptionOptions);

    res.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer?.id,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create subscription'
    });
  }
});

// Create UPI mandate for auto-debit
app.post('/api/donations/create-upi-mandate', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Razorpay not configured'
      });
    }

    const { amount, customerDetails, upiId, subscriptionId } = req.body;
    
    if (!amount || !upiId || !subscriptionId) {
      return res.status(400).json({
        success: false,
        error: 'Amount, UPI ID, and Subscription ID are required'
      });
    }

    // Create customer
    let customer;
    try {
      customer = await razorpay.customers.create({
        name: customerDetails.name,
        email: customerDetails.email,
        contact: customerDetails.phone,
      });
    } catch (error) {
      console.log('Customer creation note:', error.message);
    }

    // Create order for mandate authentication
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `mandate_${Date.now()}`,
      notes: {
        subscription_id: subscriptionId,
        upi_id: upiId,
        purpose: 'UPI_MANDATE',
      },
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      customerId: customer?.id,
    });
  } catch (error) {
    console.error('Error creating UPI mandate:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create UPI mandate'
    });
  }
});

// Verify payment (one-time)
app.post('/api/donations/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationData } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing payment verification data'
      });
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment verified - save to database
      // TODO: Save donationData to your database
      console.log('Payment verified:', donationData);
      res.json({
        success: true,
        status: 'success',
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        status: 'failure',
        message: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to verify payment'
    });
  }
});

// Save subscription details
app.post('/api/donations/save-subscription', async (req, res) => {
  try {
    const { razorpay_subscription_id, razorpay_payment_id, razorpay_signature, donationData } = req.body;
    
    if (!razorpay_subscription_id) {
      return res.status(400).json({
        success: false,
        error: 'Subscription ID is required'
      });
    }

    // Verify signature if provided
    if (razorpay_payment_id && razorpay_signature) {
      const text = `${razorpay_subscription_id}|${razorpay_payment_id}`;
      const generated_signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: 'Invalid signature'
        });
      }
    }

    // TODO: Save subscription to database
    // Store: subscription_id, donor details, amount, start_date, status, upi_id
    console.log('Subscription saved:', {
      subscription_id: razorpay_subscription_id,
      donationData
    });
    
    res.json({
      success: true,
      status: 'success',
      message: 'Subscription saved successfully'
    });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to save subscription'
    });
  }
});

// Webhook handler for subscription and mandate events
app.post('/api/donations/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    if (!razorpay) {
      return res.status(503).json({
        success: false,
        error: 'Razorpay not configured'
      });
    }

    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.warn('⚠️ Webhook secret not configured. Skipping signature verification.');
    } else if (signature) {
      const generatedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (generatedSignature !== signature) {
        return res.status(400).json({
          success: false,
          error: 'Invalid webhook signature'
        });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;
    
    // Handle different events
    switch (event) {
      case 'subscription.charged':
        // Monthly payment successful
        console.log('✅ Subscription charged:', {
          subscription_id: payload.subscription?.entity?.id,
          payment_id: payload.payment?.entity?.id,
          amount: payload.payment?.entity?.amount,
        });
        // TODO: Update database, send receipt
        break;
        
      case 'subscription.failed':
        // Payment failed
        console.log('❌ Subscription failed:', {
          subscription_id: payload.subscription?.entity?.id,
          error: payload.payment?.entity?.error_description,
        });
        // TODO: Notify donor, retry logic
        break;
        
      case 'subscription.cancelled':
        // Subscription cancelled
        console.log('🚫 Subscription cancelled:', {
          subscription_id: payload.subscription?.entity?.id,
        });
        // TODO: Update database
        break;
        
      case 'subscription.activated':
        // Subscription activated (mandate approved)
        console.log('✅ Subscription activated:', {
          subscription_id: payload.subscription?.entity?.id,
        });
        // TODO: Update database, send confirmation
        break;
        
      case 'payment.authorized':
        // UPI mandate authorized
        console.log('✅ Payment authorized (Mandate):', {
          payment_id: payload.payment?.entity?.id,
          order_id: payload.payment?.entity?.order_id,
        });
        // TODO: Update mandate status
        break;
        
      default:
        console.log('📢 Unhandled webhook event:', event);
    }
    
    res.json({ success: true, received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to process webhook'
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

// Export for Vercel serverless
export default app;

// Only listen if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Volunteer form submissions will be saved to Google Sheets`);
  });
}

