/**
 * API utility functions for backend communication
 */

// Get API base URL - use environment variable or default to localhost
// For mobile testing, you need to use your computer's IP address instead of localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// Helper to detect if we're likely on mobile and localhost won't work
const isLikelyMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Warn in console if using localhost on mobile
if (typeof window !== 'undefined' && isLikelyMobileDevice() && API_BASE_URL.includes('localhost')) {
  console.warn(
    '⚠️ Mobile device detected with localhost API URL. ' +
    'This will not work! Please set VITE_API_BASE_URL to your computer\'s IP address ' +
    'or deploy the backend. See MOBILE_API_SETUP.md for details.'
  );
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * Submit volunteer form data to backend
 */
export async function submitVolunteerForm(formData: {
  firstName: string;
  lastName?: string;
  gender?: string;
  email: string;
  phone: string;
  message?: string;
  volunteerPreferences?: string[];
  availability?: string[];
}): Promise<ApiResponse> {
  try {
    // Log for debugging (only in development)
    if (import.meta.env.DEV) {
      console.log('Submitting to:', `${API_BASE_URL}/api/volunteer/submit`);
      console.log('Form data:', formData);
    }

    const response = await fetch(`${API_BASE_URL}/api/volunteer/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'Failed to submit volunteer form';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      // Provide helpful error message for network issues
      if (response.status === 0 || response.status >= 500) {
        errorMessage = 'Unable to connect to server. Please check your internet connection and ensure the backend server is running.';
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to submit volunteer form');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    
    // Provide more helpful error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to server. Please check if the backend is running and accessible.');
    }
    
    throw error instanceof Error ? error : new Error('Network error occurred. Please check your connection and try again.');
  }
}

/**
 * Check backend health
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}


