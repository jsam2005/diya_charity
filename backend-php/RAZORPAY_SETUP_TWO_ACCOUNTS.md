# Razorpay Setup for Two Separate Bank Accounts

This guide explains how to configure two separate Razorpay merchant accounts for General (HDFC Bank) and Annathanam (Indus Bank) donations.

## Overview

The system now supports separate Razorpay accounts:
- **General Donations** → HDFC Bank (via `RAZORPAY_KEY_ID_GENERAL`)
- **Annathanam Donations** → Indus Bank (via `RAZORPAY_KEY_ID_ANNATHANAM`)

## Setup Steps

### 1. Create Two Razorpay Merchant Accounts

1. **General Donations Account (HDFC Bank)**
   - Go to https://razorpay.com
   - Create a merchant account
   - Link it to your HDFC Bank account
   - Get API keys from Dashboard → Settings → API Keys
   - Note down: `Key ID` and `Key Secret`

2. **Annathanam Donations Account (Indus Bank)**
   - Create a second Razorpay merchant account (or use a sub-account if available)
   - Link it to your Indus Bank account
   - Get API keys from Dashboard → Settings → API Keys
   - Note down: `Key ID` and `Key Secret`

### 2. Update Environment Variables

**Step 1: Get Your Current Keys (General/HDFC)**

If you already have one Razorpay account set up:
- Your current `RAZORPAY_KEY_ID` → Use this for `RAZORPAY_KEY_ID_GENERAL`
- Your current `RAZORPAY_KEY_SECRET` → Use this for `RAZORPAY_KEY_SECRET_GENERAL`

**Step 2: Get New Keys (Annathanam/Indus)**

From your second Razorpay account (Indus Bank):
- Get the `Key ID` → This will be `RAZORPAY_KEY_ID_ANNATHANAM`
- Get the `Key Secret` → This will be `RAZORPAY_KEY_SECRET_ANNATHANAM`

**Step 3: Update `.env` File**

Add these to your `.env` file in `backend-php/`:

```env
# Razorpay Configuration - General Donations (HDFC Bank)
# Use your existing Razorpay account keys here
RAZORPAY_KEY_ID_GENERAL=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET_GENERAL=your_general_secret_key_here

# Razorpay Configuration - Annathanam Donations (Indus Bank)
# Use your NEW second Razorpay account keys here
RAZORPAY_KEY_ID_ANNATHANAM=rzp_live_yyyyyyyyyyyyy
RAZORPAY_KEY_SECRET_ANNATHANAM=your_annathanam_secret_key_here
```

**Note:** If you don't have a second account yet, you can temporarily use the same keys for both, but payments will go to the same bank account until you create the second account.

### 3. Upload to GoDaddy

1. Update `.env` file on GoDaddy with both sets of keys
2. Upload updated `backend-php/services/RazorpayService.php`
3. Upload updated `backend-php/config.php`

### 4. Test

1. **Test General Donation:**
   - Go to General Donation form
   - Make a test payment (one-time or monthly)
   - Verify it goes to HDFC Bank account

2. **Test Annathanam Donation:**
   - Go to Annathanam page
   - Make a test payment (one-time or monthly)
   - Verify it goes to Indus Bank account

## How It Works

- The frontend sends `purpose: 'general'` or `purpose: 'annathanam'` with each payment request
- The backend `RazorpayService` reads the purpose and uses the corresponding API keys
- Each Razorpay account is linked to its respective bank account
- All payments are automatically routed to the correct bank account

## Fallback Behavior

If the new environment variables are not set, the system will fall back to:
- `RAZORPAY_KEY_ID` (legacy)
- `RAZORPAY_KEY_SECRET` (legacy)

This ensures backward compatibility during migration.

## Important Notes

- **Never share your Key Secret** - Keep it secure
- **Use Live keys in production** - Test keys only work in test mode
- **Both accounts must be activated** - Ensure both Razorpay accounts are fully activated
- **Bank account verification** - Complete bank account verification for both accounts in Razorpay dashboard
