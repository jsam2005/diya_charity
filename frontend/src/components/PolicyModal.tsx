import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'cancellation' | 'legal';
}

const PolicyModal: React.FC<PolicyModalProps> = ({ isOpen, onClose, type }) => {
  const { t } = useLanguage();

  const getContent = () => {
    if (type === 'privacy') {
      return {
        title: t('privacyPolicy'),
        content: [
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
        ],
      };
    } else if (type === 'cancellation') {
      return {
        title: t('cancellationRefundsPolicy'),
        content: [
          { heading: '', text: t('cancellationPolicyDesc1') },
          { heading: '', text: t('cancellationPolicyDesc2') },
          { heading: '', text: t('cancellationPolicyDesc3') },
          { heading: '', text: t('cancellationPolicyDesc4') },
          { heading: '', text: t('cancellationPolicyDesc5') },
        ],
      };
    } else {
      return {
        title: t('legalDisclaimerCompliance'),
        content: [
          { heading: '', text: t('legalDisclaimerDesc1') },
          { heading: '', text: t('legalDisclaimerDesc2') },
          { heading: '', text: t('legalDisclaimerDesc3') },
          { heading: '', text: t('legalDisclaimerDesc4') },
          { heading: '', text: t('legalDisclaimerDesc5') },
          { heading: '', text: t('legalDisclaimerDesc6') },
          { heading: '', text: t('legalDisclaimerDesc7') },
        ],
      };
    }
  };

  const { title, content } = getContent();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#1C3F75]">{title}</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-4 overflow-y-auto flex-1" style={{ maxHeight: 'calc(90vh - 120px)' }}>
                <div className="space-y-4 text-gray-700">
                  {content.map((item, index) => (
                    <div key={index}>
                      {item.heading && (
                        <h3 className="font-semibold text-lg text-[#1C3F75] mb-2">{item.heading}</h3>
                      )}
                      {item.text && (
                        <p className="text-sm leading-relaxed whitespace-pre-line">{item.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-[#FF8C42] text-white rounded-lg font-semibold hover:bg-[#E67A35] transition-colors"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PolicyModal;

