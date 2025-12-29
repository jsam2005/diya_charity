# UPI Auto-Debit Setup Guide for Monthly Donations

This guide explains how to set up automatic monthly donations using UPI eMandate (similar to JioStar subscription).

## Overview

The system now supports **UPI Auto-Debit** for monthly donations, allowing donors to set up recurring payments using their UPI ID (GPay, PhonePe, Paytm, etc.). Once set up, donations will be automatically debited each month without requiring manual intervention.

## Features

- ✅ **UPI eMandate**: Set up automatic recurring payments via UPI
- ✅ **Similar to JioStar**: Works like subscription services (JioStar, Netflix, etc.)
- ✅ **Multiple UPI Apps**: Supports GPay, PhonePe, Paytm, BHIM, and other UPI apps
- ✅ **Automatic Monthly Debits**: No need to remember to donate each month
- ✅ **Secure**: Powered by Razorpay's secure payment infrastructure

## Setup Instructions

### Step 1: Razorpay Account Setup

1. **Create Razorpay Account** (if not already done)
   - Go to https://razorpay.com
   - Sign up for a business account
   - Complete KYC verification

2. **Apply for NGO Pricing** (0% MDR)
   - Go to Settings → Pricing
   - Apply for NGO/Charity pricing
   - Submit your 12A/80G certificate
   - Wait for approval (usually 2-3 business days)

3. **Enable UPI AutoPay**
   - Go to Razorpay Dashboard → Products → UPI AutoPay
   - Enable UPI AutoPay feature
   - Follow the activation process

### Step 2: Get API Keys

1. Go to Settings → API Keys in Razorpay Dashboard
2. Generate Key ID and Key Secret
3. Copy both keys (Key Secret is shown only once)

### Step 3: Backend Configuration

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set Environment Variables**
   
   Create or update `backend/.env`:
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=your_secret_key
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   PORT=3001
   ```

3. **Start Backend Server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

### Step 4: Frontend Configuration

1. **Set Environment Variables**
   
   Create or update `frontend/.env`:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx
   VITE_API_BASE_URL=http://localhost:3001
   ```

   For production, use your deployed backend URL:
   ```env
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxx
   VITE_API_BASE_URL=https://your-backend.vercel.app
   ```

### Step 5: Webhook Setup

1. **Get Webhook Secret**
   - Go to Razorpay Dashboard → Settings → Webhooks
   - Click "Add New Webhook"
   - Enter webhook URL: `https://your-backend.vercel.app/api/donations/webhook`
   - Select events:
     - `subscription.charged` - Monthly payment successful
     - `subscription.failed` - Payment failed
     - `subscription.cancelled` - Subscription cancelled
     - `subscription.activated` - Subscription activated (mandate approved)
     - `payment.authorized` - UPI mandate authorized
   - Copy the webhook secret
   - Add to `backend/.env`: `RAZORPAY_WEBHOOK_SECRET=your_webhook_secret`

## How It Works

### For Donors

1. **Select Monthly Donation**
   - Donor selects "Monthly Donation" option
   - Enters donation amount
   - **Enters UPI ID** (e.g., `yourname@paytm`, `yourname@ybl`, `yourname@phonepe`)

2. **Set Up Mandate**
   - Click "Proceed to Payment"
   - Razorpay checkout opens
   - Donor approves the UPI mandate in their UPI app
   - Mandate is registered

3. **Automatic Monthly Debits**
   - Every month, the donation amount is automatically debited
   - Donor receives notification from their UPI app
   - Donor receives receipt email from Diya Charitable Trust

### Technical Flow

1. **Frontend**: User enters UPI ID and submits form
2. **Backend**: Creates subscription plan and subscription
3. **Razorpay**: Opens checkout for UPI mandate approval
4. **User**: Approves mandate in UPI app
5. **Backend**: Receives webhook confirmation
6. **Monthly**: Razorpay automatically debits amount each month

## API Endpoints

### Backend Endpoints

- `POST /api/donations/create-order` - Create one-time payment order
- `POST /api/donations/create-plan` - Create subscription plan
- `POST /api/donations/create-subscription` - Create subscription with UPI mandate
- `POST /api/donations/create-upi-mandate` - Create UPI mandate order
- `POST /api/donations/verify-payment` - Verify payment signature
- `POST /api/donations/save-subscription` - Save subscription details
- `POST /api/donations/webhook` - Handle Razorpay webhooks

## Testing

### Test Mode

1. Use test keys from Razorpay Dashboard
2. Test UPI IDs: Use any UPI ID format (e.g., `test@paytm`)
3. Test mandate approval flow
4. Verify webhook events in Razorpay Dashboard

### Production Mode

1. Complete KYC verification
2. Switch to live keys
3. Enable UPI AutoPay in production
4. Test with small amounts first
5. Monitor webhook events

## Supported UPI Apps

- ✅ Google Pay (GPay)
- ✅ PhonePe
- ✅ Paytm
- ✅ BHIM
- ✅ Amazon Pay
- ✅ Any UPI-enabled app

## UPI ID Format

UPI IDs follow the format: `username@provider`

Examples:
- `yourname@paytm`
- `yourname@ybl` (Yes Bank)
- `yourname@phonepe`
- `yourname@okaxis` (Axis Bank)
- `yourname@upi` (BHIM)

## Troubleshooting

### Issue: UPI mandate not working

**Solution:**
- Ensure UPI AutoPay is enabled in Razorpay Dashboard
- Check that webhook is properly configured
- Verify API keys are correct
- Check Razorpay logs for errors

### Issue: Monthly debits not happening

**Solution:**
- Verify subscription is active in Razorpay Dashboard
- Check webhook events for errors
- Ensure donor's UPI app has sufficient balance
- Check mandate status in Razorpay Dashboard

### Issue: Webhook not receiving events

**Solution:**
- Verify webhook URL is accessible
- Check webhook secret is correct
- Ensure webhook events are selected in Razorpay Dashboard
- Check server logs for webhook errors

## Security Best Practices

1. **Never expose Key Secret** in frontend code
2. **Always verify signatures** on backend
3. **Use HTTPS** in production
4. **Store sensitive data** in environment variables
5. **Implement rate limiting** on API endpoints
6. **Log all transactions** for audit
7. **Monitor webhook events** regularly

## Cost

### With NGO Pricing (Recommended)
- **Setup Cost**: ₹0
- **Transaction Fee**: 0% MDR (after approval)
- **Monthly Charges**: ₹0
- **Total Cost**: **FREE** ✅

### Without NGO Pricing
- **Setup Cost**: ₹0
- **Transaction Fee**: 2% per transaction
- **Monthly Charges**: ₹0

## Support

- Razorpay Docs: https://razorpay.com/docs/payments/subscriptions/
- UPI AutoPay: https://razorpay.com/upi-autopay/
- Support: support@razorpay.com
- API Reference: https://razorpay.com/docs/api/

## Next Steps

1. ✅ Backend API implementation (Completed)
2. ✅ Frontend integration (Completed)
3. ⏳ Set up Razorpay account
4. ⏳ Enable UPI AutoPay
5. ⏳ Configure webhooks
6. ⏳ Test payment flows
7. ⏳ Deploy to production

## Example Donation Flow

1. Donor visits donation page
2. Selects "Monthly Donation"
3. Enters amount: ₹500
4. Enters UPI ID: `donor@paytm`
5. Clicks "Proceed to Payment"
6. Razorpay checkout opens
7. Donor approves mandate in Paytm app
8. Mandate registered successfully
9. Every month, ₹500 is automatically debited
10. Donor receives notification and receipt

---

**Note**: This implementation uses Razorpay's UPI eMandate feature, which is similar to how JioStar, Netflix, and other subscription services work. Once the mandate is approved, payments are automatically processed each month without requiring donor intervention.


