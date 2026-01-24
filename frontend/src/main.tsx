import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Suppress React Router warnings for API routes and index.html (they're handled by backend/redirects, not React Router)
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  // Suppress "No routes matched location" for /api/* paths and /index.html
  if (message.includes('No routes matched location') && 
      (message.includes('/api/') || message.includes('/index.html'))) {
    return; // Silently ignore
  }
  originalWarn.apply(console, args);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
