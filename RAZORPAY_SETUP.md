# Razorpay Recurring Donations Setup Guide

## Overview
This guide explains how to set up Razorpay for both one-time and monthly recurring donations with **0% MDR for registered NGOs**.

## Step 1: Create Razorpay Account

1. Go to https://razorpay.com
2. Sign up for a business account
3. Complete KYC verification
4. **Apply for NGO Pricing** (0% MDR):
   - Go to Settings → Pricing
   - Apply for NGO/Charity pricing
   - Submit your 12A/80G certificate
   - Wait for approval (usually 2-3 business days)

## Step 2: Get API Keys

1. Go to Settings → API Keys
2. Generate Key ID and Key Secret
3. Add to your environment variables:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret_key
   ```

## Step 3: Backend API Implementation

### Install Dependencies

```bash
npm install razorpay express cors dotenv
```

### Backend Server Example (Node.js/Express)

```javascript
// server.js
const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create one-time payment order
app.post('/api/donations/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create subscription plan for monthly donations
app.post('/api/donations/create-plan', async (req, res) => {
  try {
    const { amount, period = 'monthly', interval = 1 } = req.body;
    
    const plan = await razorpay.plans.create({
      period,
      interval,
      item: {
        name: `Monthly Donation - ₹${amount / 100}`,
        amount: amount,
        currency: 'INR',
      },
    });

    res.json({ planId: plan.id });
  } catch (error) {
    console.error('Error creating plan:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create subscription
app.post('/api/donations/create-subscription', async (req, res) => {
  try {
    const { planId, customerId } = req.body;
    
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: 12, // 12 months, set to null for unlimited
    });

    res.json({ subscriptionId: subscription.id });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment (one-time)
app.post('/api/donations/verify-payment', async (req, res) => {
  try {
    const crypto = require('crypto');
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, donationData } = req.body;
    
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (generated_signature === razorpay_signature) {
      // Payment verified - save to database
      // TODO: Save donationData to your database
      console.log('Payment verified:', donationData);
      res.json({ status: 'success', message: 'Payment verified' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save subscription details
app.post('/api/donations/save-subscription', async (req, res) => {
  try {
    const { razorpay_subscription_id, donationData } = req.body;
    
    // TODO: Save subscription to database
    // Store: subscription_id, donor details, amount, start_date, status
    console.log('Subscription saved:', { razorpay_subscription_id, donationData });
    
    res.json({ status: 'success', message: 'Subscription saved' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook handler for subscription events
app.post('/api/donations/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const crypto = require('crypto');
  const signature = req.headers['x-razorpay-signature'];
  
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const generatedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (generatedSignature === signature) {
    const event = req.body.event;
    const payload = req.body.payload;
    
    // Handle different events
    switch (event) {
      case 'subscription.charged':
        // Monthly payment successful
        console.log('Subscription charged:', payload);
        // TODO: Update database, send receipt
        break;
      case 'subscription.failed':
        // Payment failed
        console.log('Subscription failed:', payload);
        // TODO: Notify donor, retry logic
        break;
      case 'subscription.cancelled':
        // Subscription cancelled
        console.log('Subscription cancelled:', payload);
        // TODO: Update database
        break;
    }
    
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure', message: 'Invalid signature' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 4: Frontend Integration

The frontend utilities are already created in `frontend/src/utils/razorpay.ts`.

To use them in `DonationForm.tsx`:

```tsx
import { processDonation } from '@/utils/razorpay';

// In handleSubmit function:
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const amount = selectedAmount ?? Number(formData.customAmount || 0);
  
  if (amount <= 0) {
    alert('Please select or enter a valid donation amount.');
    return;
  }

  const payload = {
    ...formData,
    amount,
    donationType,
  };

  try {
    await processDonation(
      payload,
      (response) => {
        // Success handler
        alert('Payment successful! Thank you for your donation.');
        setFormData(INITIAL_FORM_STATE);
        setSelectedAmount(DONATION_AMOUNTS[2]);
        setDonationType('one-time');
      },
      (error) => {
        // Error handler
        console.error('Payment error:', error);
        alert('Payment failed. Please try again.');
      }
    );
  } catch (error) {
    console.error('Error processing donation:', error);
    alert('An error occurred. Please try again.');
  }
};
```

## Step 5: Environment Variables

Create `.env` file in frontend:

```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

Create `.env` file in backend:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
PORT=3001
```

## Step 6: Webhook Setup

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/donations/webhook`
3. Select events:
   - `subscription.charged`
   - `subscription.failed`
   - `subscription.cancelled`
   - `payment.captured` (for one-time)
4. Copy webhook secret to `.env`

## Step 7: Database Schema

Recommended database tables:

```sql
-- Donations table
CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  donation_type VARCHAR(20) NOT NULL, -- 'one-time' or 'monthly'
  payment_id VARCHAR(255),
  order_id VARCHAR(255),
  status VARCHAR(50) NOT NULL, -- 'pending', 'success', 'failed'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  subscription_id VARCHAR(255) UNIQUE NOT NULL,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  donor_phone VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  plan_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'active', 'paused', 'cancelled'
  start_date DATE NOT NULL,
  next_billing_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription payments table
CREATE TABLE subscription_payments (
  id SERIAL PRIMARY KEY,
  subscription_id VARCHAR(255) NOT NULL,
  payment_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  payment_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(subscription_id)
);
```

## Cost Breakdown

### With NGO Pricing (Recommended)
- **Setup Cost**: ₹0
- **Transaction Fee**: 0% MDR (after approval)
- **Monthly Charges**: ₹0
- **Total Cost**: **FREE** ✅

### Without NGO Pricing
- **Setup Cost**: ₹0
- **Transaction Fee**: 2% per transaction
- **Monthly Charges**: ₹0

## Testing

### Test Mode
1. Use test keys from Razorpay Dashboard
2. Test cards: https://razorpay.com/docs/payments/test-cards/
3. Test UPI: Use any UPI ID in test mode

### Production Mode
1. Complete KYC verification
2. Switch to live keys
3. Apply for NGO pricing
4. Test with small amounts first

## Support

- Razorpay Docs: https://razorpay.com/docs/
- Support: support@razorpay.com
- API Reference: https://razorpay.com/docs/api/

## Security Best Practices

1. **Never expose Key Secret** in frontend code
2. **Always verify signatures** on backend
3. **Use HTTPS** in production
4. **Store sensitive data** in environment variables
5. **Implement rate limiting** on API endpoints
6. **Log all transactions** for audit

## Next Steps

1. ✅ UI Implementation (Completed)
2. ⏳ Set up Razorpay account
3. ⏳ Apply for NGO pricing
4. ⏳ Implement backend APIs
5. ⏳ Set up webhooks
6. ⏳ Test payment flows
7. ⏳ Deploy to production





