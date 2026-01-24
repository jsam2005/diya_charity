/**
 * API utility functions for backend communication
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
  
  // For localhost/development, use environment variable or default
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_API_BASE_URL : undefined;
  if (envUrl && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
    return envUrl;
  }
  return 'http://localhost:8000'; // Default to localhost for development
}

// Export helper function to build API URLs
// Uses relative URLs in production (e.g., /api/volunteer/submit)
// Uses absolute URLs in development (e.g., http://localhost:8000/api/volunteer/submit)
export function getApiUrl(endpoint: string): string {
  // Remove leading slash from endpoint if present
  endpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  
  const baseUrl = getApiBaseUrl();
  
  // If baseUrl is empty (production), use relative URL
  if (!baseUrl) {
    const relativeUrl = `/api/${endpoint}`;
    if (typeof window !== 'undefined') {
      console.log('[API] Using relative URL:', relativeUrl, 'on origin:', window.location.origin);
    }
    return relativeUrl;
  }
  
  // For development, use absolute URL
  const cleanBase = baseUrl.replace(/\/$/, '');
  const prefix = cleanBase.includes('/api') ? '' : '/api';
  const absoluteUrl = `${cleanBase}${prefix}/${endpoint}`;
  if (typeof window !== 'undefined') {
    console.log('[API] Development URL:', absoluteUrl);
  }
  return absoluteUrl;
}

// Helper to detect if we're likely on mobile and localhost won't work
const isLikelyMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Warn in console if using localhost on mobile
if (typeof window !== 'undefined' && isLikelyMobileDevice()) {
  const baseUrl = getApiBaseUrl();
  if (baseUrl.includes('localhost')) {
    console.warn(
      '⚠️ Mobile device detected with localhost API URL. ' +
      'This will not work! Please set VITE_API_BASE_URL to your computer\'s IP address ' +
      'or deploy the backend. See MOBILE_API_SETUP.md for details.'
    );
  }
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
    // Get API URL - uses relative URL in production (/api/volunteer/submit)
    // This automatically uses same origin, avoiding CORS issues
    const apiUrl = getApiUrl('volunteer/submit');
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'unknown';
    
    // Log for debugging
    console.log('[Volunteer Form] Current origin:', currentOrigin);
    console.log('[Volunteer Form] API URL:', apiUrl);
    console.log('[Volunteer Form] Full URL will be:', typeof window !== 'undefined' ? window.location.origin + apiUrl : apiUrl);
    console.log('[Volunteer Form] Form data:', formData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'Failed to submit volunteer form';
      let errorDetails: any = null;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        errorDetails = errorData.debug || null;
        
        // Log detailed error for debugging
        console.error('[Volunteer Form] Backend error:', {
          status: response.status,
          error: errorMessage,
          debug: errorDetails
        });
      } catch (e) {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
        console.error('[Volunteer Form] Non-JSON error response:', response.status, response.statusText);
      }
      
      // Provide helpful error message for network issues
      if (response.status === 0 || response.status >= 500) {
        errorMessage = 'Unable to connect to server. Please check your internet connection and ensure the backend server is running.';
      } else if (response.status === 400) {
        // 400 Bad Request - show the actual error message from backend
        if (errorDetails) {
          console.error('[Volunteer Form] Validation error details:', errorDetails);
        }
        // Keep the errorMessage from backend (already set above)
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
    const apiUrl = getApiUrl('health');
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}


