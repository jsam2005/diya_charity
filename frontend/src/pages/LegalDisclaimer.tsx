import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';
import { useLanguage } from '@/contexts/LanguageContext';

const LegalDisclaimer: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const content = [
    { text: t('legalDisclaimerDesc1') },
    { text: t('legalDisclaimerDesc2') },
    { text: t('legalDisclaimerDesc3') },
    { text: t('legalDisclaimerDesc4') },
    { text: t('legalDisclaimerDesc5') },
    { text: t('legalDisclaimerDesc6') },
    { text: t('legalDisclaimerDesc7') },
  ];

  return (
    <>
      <ViewportMeta />
      <div className="min-h-screen flex flex-col">
        <Header />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow bg-gray-50 py-8 px-4"
        >
          <div className="container mx-auto max-w-4xl">
            <motion.button
              onClick={() => navigate('/')}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 text-[#1C3F75] hover:text-[#FF8C42] transition-colors"
            >
              ← Back to Home
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-6 md:p-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-[#1C3F75] mb-8">
                {t('legalDisclaimerCompliance')}
              </h1>
              
              <div className="space-y-6 text-gray-700">
                {content.map((item, index) => (
                  <p key={index} className="text-base leading-relaxed whitespace-pre-line">
                    {item.text}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default LegalDisclaimer;

