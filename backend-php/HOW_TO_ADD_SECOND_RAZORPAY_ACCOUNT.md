# How to Add Second Razorpay Account for Separate Bank Account

## 🎯 Goal

You need **two separate Razorpay merchant accounts**:
1. **General Donations** → HDFC Bank (you already have this)
2. **Annathanam Donations** → Indus Bank (need to create this)

## 📋 Step-by-Step Guide

### Step 1: Create Second Razorpay Account

**Method 1: New Account with Different Email (Recommended)**

1. **Go to:** https://razorpay.com
2. **Click:** "Sign Up" (top right)
3. **Use a different email address** than your first account
   - Example: If first account uses `admin@dctnow.ngo`
   - Use: `annathanam@dctnow.ngo` or `donations@dctnow.ngo`
4. **Complete registration:**
   - Enter organization name: "Diya Charitable Trust - Annathanam"
   - Select business type: "NGO/Charity"
   - Complete KYC verification

**Method 2: Contact Razorpay Support for Sub-Account**

1. **Email:** support@razorpay.com
2. **Subject:** "Request for Sub-Account for Separate Bank Account"
3. **Message:**
   ```
   Hello,
   
   I need to create a sub-account or second merchant account for 
   separate bank account routing. I have:
   - Main account: [Your current account email]
   - Need: Second account linked to Indus Bank
   - Purpose: Separate donations (Annathanam) from general donations
   
   Please guide me on how to set this up.
   ```

### Step 2: Link Indus Bank Account

**In your NEW Razorpay account:**

1. **Go to:** Dashboard → Settings → Bank Accounts
2. **Click:** "Add Bank Account"
3. **Enter details:**
   - **Account Name:** DIYA CHARITABLE TRUST
   - **Bank Name:** Indus Bank
   - **Account Number:** 259445205771
   - **IFSC Code:** INDB0000236
   - **Account Type:** Current/Savings (as applicable)
4. **Upload required documents:**
   - Bank statement
   - Cancelled cheque
   - Any other documents Razorpay requests
5. **Wait for verification** (usually 1-3 business days)

### Step 3: Get API Keys from Second Account

**Once bank account is verified:**

1. **Go to:** Dashboard → Settings → API Keys
2. **Click:** "Generate Key" (if not already generated)
3. **Copy:**
   - **Key ID:** `rzp_live_xxxxxxxxxxxxx`
   - **Key Secret:** `xxxxxxxxxxxxxxxxxxxxx` (keep this secure!)

### Step 4: Update Environment Variables

**On GoDaddy (in `public_html/api/.env`):**

```env
# General Donations (HDFC Bank) - Your existing account
RAZORPAY_KEY_ID_GENERAL=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET_GENERAL=your_existing_secret_key

# Annathanam Donations (Indus Bank) - Your NEW account
RAZORPAY_KEY_ID_ANNATHANAM=rzp_live_yyyyyyyyyyyyy
RAZORPAY_KEY_SECRET_ANNATHANAM=your_new_secret_key
```

**Important:**
- Replace `xxxxxxxxxxxxx` with your actual General account Key ID
- Replace `yyyyyyyyyyyyy` with your actual Annathanam account Key ID
- Replace secret keys with actual secret keys (keep them secure!)

### Step 5: Verify Setup

**Test the configuration:**

1. **Test General Donation:**
   - Make a test payment from General Donation form
   - Check Razorpay Dashboard → Payments
   - Verify it appears in your General account (HDFC Bank)

2. **Test Annathanam Donation:**
   - Make a test payment from Annathanam page
   - Check Razorpay Dashboard → Payments
   - Verify it appears in your Annathanam account (Indus Bank)

## ⚠️ Important Notes

### Account Requirements

- **Both accounts must be fully activated** (KYC completed)
- **Both bank accounts must be verified** in Razorpay
- **Both accounts must be in "Live" mode** (not test mode)

### If You Can't Create Second Account

**Temporary Solution:**
- Use the same API keys for both `GENERAL` and `ANNATHANAM`
- All payments will go to the same bank account
- Update later when second account is ready

**Permanent Solution:**
- Contact Razorpay support to discuss options
- They may offer:
  - Sub-accounts feature
  - Multiple bank accounts in one account (if supported)
  - Account splitting options

## 🔍 Troubleshooting

### "Account not activated" Error

- Complete KYC verification in Razorpay dashboard
- Upload all required documents
- Wait for approval (1-3 business days)

### "Bank account not verified" Error

- Complete bank account verification
- Upload bank statement/cancelled cheque
- Wait for verification (1-2 business days)

### "API keys not working" Error

- Ensure you're using **Live keys** (not test keys)
- Check that keys are from the correct account
- Verify keys are copied correctly (no extra spaces)

## 📞 Need Help?

**Contact Razorpay Support:**
- **Email:** support@razorpay.com
- **Phone:** Check Razorpay website for support number
- **Live Chat:** Available in Razorpay dashboard

**Ask them:**
- "How do I create a second merchant account for separate bank account routing?"
- "Do you support sub-accounts for multiple bank accounts?"
- "Can I link multiple bank accounts to one Razorpay account?"

---

## ✅ Checklist

- [ ] Created second Razorpay account (or contacted support)
- [ ] Linked Indus Bank account to second Razorpay account
- [ ] Bank account verified in Razorpay
- [ ] Got API keys from second account
- [ ] Updated `.env` file with both sets of keys
- [ ] Tested General donation (goes to HDFC account)
- [ ] Tested Annathanam donation (goes to Indus account)
