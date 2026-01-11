import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Annathanam from '@/pages/Annathanam';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import CancellationPolicy from '@/pages/CancellationPolicy';
import LegalDisclaimer from '@/pages/LegalDisclaimer';
import AccessibilityStatement from '@/pages/AccessibilityStatement';
import NotificationProvider from '@/components/NotificationProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import GoogleTranslate from '@/components/GoogleTranslate';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <GoogleTranslate />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annathanam" element={<Annathanam />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cancellation-policy" element={<CancellationPolicy />} />
            <Route path="/legal-disclaimer" element={<LegalDisclaimer />} />
            <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </LanguageProvider>
  );
};

export default App;
