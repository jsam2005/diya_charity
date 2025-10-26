// Form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormFieldError {
  field: string;
  message: string;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
}

// Process item types
export interface ProcessItem {
  id: string;
  title: string;
  description: string;
}

// Component props types
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

// Animation types
export interface AnimationProps {
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Contact information types
export interface ContactInfo {
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

// Social media types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Theme types
export type Theme = 'light' | 'dark';

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
