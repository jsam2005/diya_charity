import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';
import { useLanguage } from '@/contexts/LanguageContext';

const PrivacyPolicy: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const content = [
    { heading: t('privacyIntro'), text: '' },
    { heading: t('privacyInfoWeCollect'), text: t('privacyInfoWeCollectDesc') },
    { heading: t('privacyUseOfInfo'), text: t('privacyUseOfInfoDesc') },
    { heading: t('privacyDisclosure'), text: t('privacyDisclosureDesc') },
    { heading: t('privacyDataSecurity'), text: t('privacyDataSecurityDesc') },
    { heading: t('privacyCookies'), text: t('privacyCookiesDesc') },
    { heading: t('privacyThirdPartyLinks'), text: t('privacyThirdPartyLinksDesc') },
    { heading: t('privacyConsent'), text: t('privacyConsentDesc') },
    { heading: t('privacyUpdates'), text: t('privacyUpdatesDesc') },
    { heading: t('privacyContact'), text: t('privacyContactDesc') },
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
                {t('privacyPolicy')}
              </h1>
              
              <div className="space-y-6 text-gray-700">
                {content.map((item, index) => (
                  <div key={index}>
                    {item.heading && (
                      <h2 className="font-semibold text-xl text-[#1C3F75] mb-3 mt-6">
                        {item.heading}
                      </h2>
                    )}
                    {item.text && (
                      <p className="text-base leading-relaxed whitespace-pre-line">
                        {item.text}
                      </p>
                    )}
                  </div>
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

export default PrivacyPolicy;

