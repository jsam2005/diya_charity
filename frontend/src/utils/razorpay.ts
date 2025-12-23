/**
 * Razorpay Payment Integration Utilities
 * 
 * This file contains helper functions for integrating Razorpay payments
 * for both one-time and recurring donations.
 * 
 * Setup Instructions:
 * 1. Create Razorpay account at https://razorpay.com
 * 2. Apply for NGO pricing (0% MDR for registered charities)
 * 3. Get your Key ID and Key Secret from Razorpay Dashboard
 * 4. Add to .env file:
 *    VITE_RAZORPAY_KEY_ID=your_key_id
 *    VITE_RAZORPAY_KEY_SECRET=your_key_secret (backend only)
 * 5. Install Razorpay: npm install razorpay (backend)
 * 6. Load Razorpay script in index.html or dynamically
 */

// Declare Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface DonationPayload {
  name: string;
  phone: string;
  email: string;
  amount: number;
  donationType: 'one-time' | 'monthly';
  customAmount?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  subscription_id?: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  razorpay_subscription_id?: string;
}

/**
 * Load Razorpay script dynamically
 */
export const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

/**
 * Create one-time payment order
 * Call this from your backend API
 */
export const createOneTimePayment = async (
  payload: DonationPayload
): Promise<string> => {
  try {
    const response = await fetch('/api/donations/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: payload.amount,
        currency: 'INR',
        donationType: 'one-time',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

/**
 * Create subscription plan for monthly donations
 * Call this from your backend API
 */
export const createSubscriptionPlan = async (
  amount: number
): Promise<string> => {
  try {
    const response = await fetch('/api/donations/create-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        period: 'monthly',
        interval: 1,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription plan');
    }

    const data = await response.json();
    return data.planId;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
};

/**
 * Create subscription for monthly recurring payment
 * Call this from your backend API
 */
export const createSubscription = async (
  planId: string,
  customerId?: string
): Promise<string> => {
  try {
    const response = await fetch('/api/donations/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planId,
        customerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create subscription');
    }

    const data = await response.json();
    return data.subscriptionId;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

/**
 * Initialize Razorpay checkout for one-time payment
 */
export const initOneTimePayment = async (
  payload: DonationPayload,
  orderId: string,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    await loadRazorpayScript();

    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      amount: payload.amount * 100, // Convert to paise
      currency: 'INR',
      name: 'Diya Charitable Trust',
      description: `One-time donation of ₹${payload.amount}`,
      order_id: orderId,
      prefill: {
        name: payload.name,
        email: payload.email,
        contact: payload.phone,
      },
      handler: async (response: RazorpayResponse) => {
        // Verify payment on backend
        try {
          const verifyResponse = await fetch('/api/donations/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...response,
              donationData: payload,
            }),
          });

          if (verifyResponse.ok) {
            onSuccess(response);
          } else {
            onError(new Error('Payment verification failed'));
          }
        } catch (error) {
          onError(error);
        }
      },
      modal: {
        ondismiss: () => {
          onError(new Error('Payment cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    onError(error);
  }
};

/**
 * Initialize Razorpay checkout for monthly subscription
 */
export const initMonthlySubscription = async (
  payload: DonationPayload,
  subscriptionId: string,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    await loadRazorpayScript();

    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || '',
      subscription_id: subscriptionId,
      name: 'Diya Charitable Trust',
      description: `Monthly donation of ₹${payload.amount}`,
      prefill: {
        name: payload.name,
        email: payload.email,
        contact: payload.phone,
      },
      handler: async (response: RazorpayResponse) => {
        // Save subscription details on backend
        try {
          const saveResponse = await fetch('/api/donations/save-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...response,
              donationData: payload,
            }),
          });

          if (saveResponse.ok) {
            onSuccess(response);
          } else {
            onError(new Error('Failed to save subscription'));
          }
        } catch (error) {
          onError(error);
        }
      },
      modal: {
        ondismiss: () => {
          onError(new Error('Subscription cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay subscription:', error);
    onError(error);
  }
};

/**
 * Process donation based on type
 */
export const processDonation = async (
  payload: DonationPayload,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    if (payload.donationType === 'one-time') {
      // Create order and initiate one-time payment
      const orderId = await createOneTimePayment(payload);
      await initOneTimePayment(payload, orderId, onSuccess, onError);
    } else {
      // Create plan, then subscription for monthly payment
      const planId = await createSubscriptionPlan(payload.amount);
      const subscriptionId = await createSubscription(planId);
      await initMonthlySubscription(payload, subscriptionId, onSuccess, onError);
    }
  } catch (error) {
    console.error('Error processing donation:', error);
    onError(error);
  }
};

