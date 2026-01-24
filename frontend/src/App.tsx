import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import Annathanam from '@/pages/Annathanam';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CancellationPolicy from '@/pages/CancellationPolicy';
import LegalDisclaimer from '@/pages/LegalDisclaimer';
import AccessibilityStatement from '@/pages/AccessibilityStatement';
import NotificationProvider from '@/components/NotificationProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import GoogleTranslate from '@/components/GoogleTranslate';

// Component to intercept API routes and index.html BEFORE React Router tries to match them
const RouteInterceptor: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If someone navigates to /api/*, redirect immediately
    if (location.pathname.startsWith('/api/')) {
      console.warn('API route accessed via navigation. Redirecting to home. API calls should use fetch(), not navigation.');
      navigate('/', { replace: true });
      return;
    }
    
    // If someone accesses /index.html, redirect to root
    if (location.pathname === '/index.html' || location.pathname === '/index.html/') {
      navigate('/', { replace: true });
      return;
    }
  }, [location.pathname, navigate]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <GoogleTranslate />
        <Router>
          <RouteInterceptor />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annathanam" element={<Annathanam />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
            {/* Redirect /index.html to root */}
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            {/* Explicitly handle /api/* routes to prevent React Router warnings */}
            <Route path="/api/*" element={null} />
          </Routes>
        </Router>
      </NotificationProvider>
    </LanguageProvider>
  );
};

export default App;
