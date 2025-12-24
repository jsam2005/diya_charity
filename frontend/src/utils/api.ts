/**
 * API utility functions for backend communication
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

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
    const response = await fetch(`${API_BASE_URL}/api/volunteer/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit volunteer form');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error instanceof Error ? error : new Error('Network error occurred');
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

