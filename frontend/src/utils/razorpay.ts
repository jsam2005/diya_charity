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

// Get API base URL - use relative URLs in production for simplicity
// CRITICAL: Relative URLs automatically use current origin (www or non-www)
function getApiBaseUrl(): string {
  // In production, use empty string for relative URLs
  // This ensures same-origin requests without hardcoding domains
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname.includes('dctnow.ngo') || hostname.includes('diyacharity.org')) {
      return ''; // Empty = relative URL, uses current origin automatically
    }
  }
  
  // For localhost/development, use environment variable or default to PHP backend
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
  if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
    return envUrl;
  }
  return 'http://localhost:8000'; // Default to PHP backend port for development
}

// Helper to build API URLs - uses relative URLs in production
function getApiUrl(endpoint: string): string {
  // Remove leading slash from endpoint if present
  endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  const baseUrl = getApiBaseUrl();
  
  // If baseUrl is empty (production), use relative URL
  if (!baseUrl) {
    return `/api/${endpoint}`;
  }
  
  // For development, use absolute URL
  const cleanBase = baseUrl.replace(/\/$/, '');
  const prefix = cleanBase.includes('/api') ? '' : '/api';
  return `${cleanBase}${prefix}/${endpoint}`;
}

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
  upiId?: string;
  pan?: string;
  purpose?: string; // e.g., 'annathanam' to identify donation type
}

export interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
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
  // Additional options to help with configuration
  theme?: {
    color?: string;
  };
  notes?: Record<string, string>;
  readonly?: {
    email?: boolean;
    contact?: boolean;
    name?: boolean;
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
    
    // Add error handler for script loading issues
    script.onerror = () => {
      reject(new Error('Failed to load Razorpay checkout script. Please check your internet connection.'));
    };
    
    document.body.appendChild(script);
  });
};

/**
 * Validate Razorpay key and provide helpful error messages
 */
function validateRazorpayKey(key: string): { valid: boolean; error?: string } {
  if (!key || key.trim() === '') {
    return {
      valid: false,
      error: 'Razorpay Key ID is not configured. Please set VITE_RAZORPAY_KEY_ID in your environment variables.'
    };
  }

  if (!key.startsWith('rzp_test_') && !key.startsWith('rzp_live_')) {
    return {
      valid: false,
      error: 'Invalid Razorpay Key ID format. Key should start with "rzp_test_" (for test mode) or "rzp_live_" (for production).'
    };
  }

  if (key.length < 20) {
    return {
      valid: false,
      error: 'Razorpay Key ID appears to be incomplete. Please check your environment variable.'
    };
  }

  return { valid: true };
}

/**
 * Create one-time payment order
 * Call this from your backend API
 */
export const createOneTimePayment = async (
  payload: DonationPayload
): Promise<string> => {
  try {
    const apiUrl = getApiUrl('donations/create-order');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: payload.amount,
        currency: 'INR',
        donationType: 'one-time',
        purpose: payload.purpose || 'general', // Pass purpose to route to correct bank account
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
  amount: number,
  purpose: string = 'general'
): Promise<string> => {
  try {
    const apiUrl = getApiUrl('donations/create-plan');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
        period: 'monthly',
        interval: 1,
        purpose: purpose, // Pass purpose to route to correct bank account
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || 'Failed to create subscription plan';
      console.error('Backend error:', errorData);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to create subscription plan');
    }
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
    const apiUrl = getApiUrl('donations/create-subscription');
    const response = await fetch(apiUrl, {
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
    // Validate Razorpay key
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const keyValidation = validateRazorpayKey(razorpayKey);
    if (!keyValidation.valid) {
      console.error('Razorpay key validation failed:', keyValidation.error);
      onError(new Error(keyValidation.error || 'Invalid Razorpay configuration'));
      return;
    }

    await loadRazorpayScript();

    const options: RazorpayOptions = {
      key: razorpayKey,
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
      theme: {
        color: '#F37254', // Razorpay default color
      },
      notes: {
        donation_type: 'one-time',
        source: 'website',
        purpose: payload.purpose || 'general',
      },
      // Add error handler for Razorpay initialization errors
      handler: async (response: RazorpayResponse) => {
        // Verify payment on backend
        try {
          const apiUrl = getApiUrl('donations/verify-payment');
          const verifyResponse = await fetch(apiUrl, {
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

    // Log key info for debugging (first few chars only)
    const keyMode = razorpayKey.startsWith('rzp_live_') ? 'LIVE' : 'TEST';
    console.log(`Initializing Razorpay with ${keyMode} key:`, razorpayKey.substring(0, 15) + '...');
    console.log('Current domain:', window.location.hostname);
    console.log('Order ID:', orderId);
    
    // Warn if there's a potential key mismatch
    if (keyMode === 'TEST' && window.location.hostname.includes('dctnow.ngo')) {
      console.warn('⚠️ WARNING: Using TEST key on production domain! Make sure backend is also using TEST key, or switch to LIVE key.');
    }
    
    // Intercept fetch requests to catch Razorpay API errors
    const originalFetch = window.fetch;
    let razorpayErrorDetected = false;
    
    window.fetch = function(...args) {
      const url = args[0]?.toString() || '';
      
      // Check if this is a Razorpay API call
      if (url.includes('api.razorpay.com') && url.includes('standard_checkout')) {
        return originalFetch.apply(this, args)
          .then(async response => {
            if (!response.ok && response.status === 400 && !razorpayErrorDetected) {
              razorpayErrorDetected = true;
              console.error('Razorpay API 400 Error detected:', url);
              
              // Clone response to read it without consuming the stream
              const clonedResponse = response.clone();
              
              // Restore original fetch
              window.fetch = originalFetch;
              
              try {
                // Parse error response
                const errorData = await clonedResponse.json();
                const errorDesc = errorData?.error?.description || errorData?.description || 'Unknown error';
                
                let errorMessage = 'Razorpay Payment Error\n\n';
                
                if (errorDesc.includes('does not exist') || errorDesc.includes('id provided')) {
                  errorMessage += '❌ Key Mismatch Error!\n\n' +
                    'The order was created with a different Razorpay key than the one used to open checkout.\n\n' +
                    'This usually means:\n' +
                    '• Backend is using ' + (razorpayKey.startsWith('rzp_live_') ? 'TEST' : 'LIVE') + ' key\n' +
                    '• Frontend is using ' + (razorpayKey.startsWith('rzp_live_') ? 'LIVE' : 'TEST') + ' key\n\n' +
                    '✅ Solution:\n' +
                    '1. Ensure both frontend and backend use the SAME key type (both TEST or both LIVE)\n' +
                    '2. Update environment variables:\n' +
                    '   - Frontend: VITE_RAZORPAY_KEY_ID\n' +
                    '   - Backend: RAZORPAY_KEY_ID\n' +
                    '3. Rebuild frontend: npm run build\n' +
                    '4. Restart backend server\n\n' +
                    'Current frontend key: ' + razorpayKey.substring(0, 15) + '... (' + 
                    (razorpayKey.startsWith('rzp_live_') ? 'LIVE' : 'TEST') + ' mode)';
                } else {
                  errorMessage += 'Error: ' + errorDesc + '\n\n' +
                    'Please check:\n' +
                    '1. Razorpay account is fully activated\n' +
                    '2. API key is valid and active\n' +
                    '3. Domain is whitelisted in Razorpay Dashboard\n' +
                    '4. Key type matches (TEST/LIVE) between frontend and backend';
                }
                
                onError(new Error(errorMessage));
              } catch (parseError) {
                onError(new Error(
                  'Razorpay Configuration Error (400 Bad Request)\n\n' +
                  'Please check your Razorpay account configuration.\n' +
                  'Make sure frontend and backend use the same key type (TEST or LIVE).'
                ));
              }
              
              return Promise.reject(new Error('Razorpay API Error: 400 Bad Request'));
            }
            return response;
          })
          .catch(error => {
            if (!razorpayErrorDetected && error.message && error.message.includes('400')) {
              razorpayErrorDetected = true;
              window.fetch = originalFetch;
              onError(new Error('Razorpay API Error: ' + error.message));
            }
            throw error;
          });
      }
      
      return originalFetch.apply(this, args);
    };
    
    // Set up global error handler as backup
    const errorHandler = (event: ErrorEvent) => {
      if (razorpayErrorDetected) return;
      
      // Check if error is from Razorpay API
      if ((event.filename && event.filename.includes('razorpay')) || 
          (event.message && event.message.includes('razorpay'))) {
        if (event.message && (event.message.includes('400') || event.message.includes('Bad Request'))) {
          razorpayErrorDetected = true;
          console.error('Razorpay Error detected:', event);
          window.removeEventListener('error', errorHandler);
          window.fetch = originalFetch; // Restore fetch
          onError(new Error(
            'Razorpay payment gateway error (400 Bad Request).\n\n' +
            'Please check your Razorpay Dashboard configuration:\n' +
            '1. Account activation status\n' +
            '2. API key validity\n' +
            '3. Domain whitelisting\n\n' +
            'Domain: ' + window.location.hostname
          ));
        }
      }
    };
    
    window.addEventListener('error', errorHandler);
    
    const razorpay = new window.Razorpay(options);
    
    // Wrap open() to catch initialization errors
    try {
      razorpay.open();
      
      // Clean up after 10 seconds (enough time for Razorpay to initialize)
      setTimeout(() => {
        window.removeEventListener('error', errorHandler);
        if (!razorpayErrorDetected) {
          window.fetch = originalFetch; // Restore fetch if no error
        }
      }, 10000);
    } catch (openError) {
      window.removeEventListener('error', errorHandler);
      window.fetch = originalFetch; // Restore fetch
      console.error('Error opening Razorpay checkout:', openError);
      onError(new Error(
        'Failed to open payment gateway. This may be due to:\n' +
        '• Razorpay account not fully activated\n' +
        '• Invalid or restricted API key\n' +
        '• Domain not whitelisted in Razorpay settings\n' +
        '• Network connectivity issues\n\n' +
        'Please check your Razorpay Dashboard settings or contact support.'
      ));
    }
  } catch (error) {
    console.error('Error initializing Razorpay:', error);
    onError(error);
  }
};

/**
 * Initialize Razorpay checkout for monthly subscription with UPI mandate
 */
export const initMonthlySubscription = async (
  payload: DonationPayload,
  subscriptionId: string,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    // Validate Razorpay key
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const keyValidation = validateRazorpayKey(razorpayKey);
    if (!keyValidation.valid) {
      console.error('Razorpay key validation failed:', keyValidation.error);
      onError(new Error(keyValidation.error || 'Invalid Razorpay configuration'));
      return;
    }

    await loadRazorpayScript();

    if (import.meta.env.DEV) {
      console.log('🔧 Initializing Razorpay subscription checkout with subscription_id:', subscriptionId);
    }

    const options: any = {
      key: razorpayKey,
      subscription_id: subscriptionId,
      name: 'Diya Charitable Trust',
      description: `Monthly donation of ₹${payload.amount} - UPI Auto-debit${payload.purpose === 'annathanam' ? ' (Annathanam)' : ''}\n\nNote: Razorpay will charge a small refundable amount (₹5) to verify your payment method. Your monthly donation of ₹${payload.amount} will be charged automatically each month.`,
      prefill: {
        name: payload.name,
        email: payload.email,
        contact: payload.phone,
      },
      // Razorpay subscription checkout automatically handles UPI mandate collection
      // No need for method or recurring options - subscription_id is enough
      handler: async (response: RazorpayResponse) => {
        if (import.meta.env.DEV) {
          console.log('✅ Subscription payment successful:', response);
        }
        // Save subscription details on backend
        try {
          const apiUrl = getApiUrl('donations/save-subscription');
          const saveResponse = await fetch(apiUrl, {
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
    razorpay.on('payment.failed', (response: any) => {
      console.error('Payment failed:', response);
      onError(new Error(response.error?.description || 'Payment failed'));
    });
    razorpay.open();
  } catch (error) {
    console.error('Error initializing Razorpay subscription:', error);
    onError(error);
  }
};

/**
 * Create UPI mandate for auto-debit
 */
export const createUPIMandate = async (
  payload: DonationPayload,
  subscriptionId: string,
  onSuccess: (response: RazorpayResponse) => void,
  onError: (error: any) => void
): Promise<void> => {
  try {
    if (!payload.upiId) {
      onError(new Error('UPI ID is required for auto-debit'));
      return;
    }

    // Create mandate order
    const apiUrl = getApiUrl('donations/create-upi-mandate');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: payload.amount,
        customerDetails: {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
        },
        upiId: payload.upiId,
        subscriptionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create UPI mandate');
    }

    const { orderId } = await response.json();

    // Validate Razorpay key
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const keyValidation = validateRazorpayKey(razorpayKey);
    if (!keyValidation.valid) {
      console.error('Razorpay key validation failed:', keyValidation.error);
      onError(new Error(keyValidation.error || 'Invalid Razorpay configuration'));
      return;
    }

    // Initialize Razorpay checkout for mandate
    await loadRazorpayScript();

    const options: any = {
      key: razorpayKey,
      amount: payload.amount * 100,
      currency: 'INR',
      name: 'Diya Charitable Trust',
      description: `Set up UPI Auto-debit for monthly donation of ₹${payload.amount}`,
      order_id: orderId,
      prefill: {
        name: payload.name,
        email: payload.email,
        contact: payload.phone,
      },
      // UPI mandate specific options
      method: {
        upi: {
          flow: 'collect',
          vpa: payload.upiId, // Pre-fill UPI ID
        },
      },
      handler: async (response: RazorpayResponse) => {
        // Verify and save mandate
        try {
          const apiUrl = getApiUrl('donations/verify-payment');
          const verifyResponse = await fetch(apiUrl, {
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
            onError(new Error('Mandate verification failed'));
          }
        } catch (error) {
          onError(error);
        }
      },
      modal: {
        ondismiss: () => {
          onError(new Error('Mandate setup cancelled by user'));
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Error creating UPI mandate:', error);
    onError(error);
  }
};

/**
 * Show mobile-friendly confirmation dialog
 */
const showConfirmationDialog = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
    `;

    // Create message
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 1.5;
      color: #333;
      white-space: pre-line;
    `;
    messageDiv.textContent = message;

    // Create button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    `;

    // Create Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
      padding: 10px 20px;
      border: 2px solid #ccc;
      background: white;
      color: #333;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
    `;
    cancelBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(false);
    };

    // Create OK button
    const okBtn = document.createElement('button');
    okBtn.textContent = 'OK';
    okBtn.style.cssText = `
      padding: 10px 20px;
      border: none;
      background: #1C3F75;
      color: white;
      border-radius: 6px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
    `;
    okBtn.onclick = () => {
      document.body.removeChild(overlay);
      resolve(true);
    };

    // Add hover effects
    cancelBtn.onmouseenter = () => cancelBtn.style.background = '#f5f5f5';
    cancelBtn.onmouseleave = () => cancelBtn.style.background = 'white';
    okBtn.onmouseenter = () => okBtn.style.background = '#0f2a4f';
    okBtn.onmouseleave = () => okBtn.style.background = '#1C3F75';

    // Assemble modal
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(okBtn);
    modal.appendChild(messageDiv);
    modal.appendChild(buttonContainer);
    overlay.appendChild(modal);

    // Add to DOM
    document.body.appendChild(overlay);

    // Close on overlay click (outside modal)
    overlay.onclick = (e) => {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        resolve(false);
      }
    };
  });
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
    // Validate Razorpay key before processing
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const keyValidation = validateRazorpayKey(razorpayKey);
    if (!keyValidation.valid) {
      console.error('Razorpay key validation failed:', keyValidation.error);
      onError(new Error(keyValidation.error || 'Razorpay is not configured. Please contact support or check your environment configuration.'));
      return;
    }

    if (payload.donationType === 'one-time') {
      // Create order and initiate one-time payment
      if (import.meta.env.DEV) {
        console.log('💳 Processing one-time payment for amount:', payload.amount);
      }
      const orderId = await createOneTimePayment(payload);
      await initOneTimePayment(payload, orderId, onSuccess, onError);
    } else {
      // Monthly donation with UPI auto-debit
      // UPI ID will be automatically detected during Razorpay checkout
      if (import.meta.env.DEV) {
        console.log('🔄 Processing monthly subscription for amount:', payload.amount);
      }
      
      // Show mobile-friendly confirmation dialog explaining Razorpay's verification charge
      const confirmed = await showConfirmationDialog(
        `Setting up monthly donation of ₹${payload.amount}\n\n` +
        `IMPORTANT: Razorpay will charge a small refundable amount (₹5) to verify your payment method.\n` +
        `After verification, your monthly donation of ₹${payload.amount} will be charged automatically each month.\n\n` +
        `Click OK to proceed with payment setup.`
      );
      
      if (!confirmed) {
        onError(new Error('Subscription setup cancelled by user'));
        return;
      }
      
      const planId = await createSubscriptionPlan(payload.amount, payload.purpose || 'general');
      if (import.meta.env.DEV) {
        console.log('📋 Plan created with ID:', planId);
      }
      const apiUrl = getApiUrl('donations/create-subscription');
      const subscriptionResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          purpose: payload.purpose || 'general', // Pass purpose to route to correct bank account
          customerDetails: {
            name: payload.name,
            email: payload.email,
            phone: payload.phone,
          },
          // UPI ID will be captured during Razorpay checkout
        }),
      });

      if (!subscriptionResponse.ok) {
        const errorData = await subscriptionResponse.json().catch(() => ({}));
        console.error('Subscription creation failed:', errorData);
        throw new Error(errorData.error || 'Failed to create subscription');
      }

      const subscriptionData = await subscriptionResponse.json();
      if (!subscriptionData.success || !subscriptionData.subscriptionId) {
        console.error('Invalid subscription response:', subscriptionData);
        throw new Error(subscriptionData.error || 'Invalid subscription response');
      }

      const { subscriptionId } = subscriptionData;
      
      if (import.meta.env.DEV) {
        console.log('✅ Subscription created successfully:', subscriptionId);
        console.log('📋 Subscription details:', subscriptionData);
      }
      
      // Initialize Razorpay subscription checkout - user will enter/select UPI ID during checkout
      await initMonthlySubscription(payload, subscriptionId, onSuccess, onError);
    }
  } catch (error) {
    console.error('Error processing donation:', error);
    onError(error);
  }
};

