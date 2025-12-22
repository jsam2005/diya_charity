import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Annathanam from '@/pages/Annathanam';
import NotificationProvider from '@/components/NotificationProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annathanam" element={<Annathanam />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </LanguageProvider>
  );
};

export default App;
