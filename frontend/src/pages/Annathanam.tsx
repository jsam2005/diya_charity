import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import AnnathanamDonationForm from '@/components/AnnathanamDonationForm';

const Annathanam: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { isMobile } = useDeviceFeatures();
    
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);
    
    return (
        <>
            <ViewportMeta />
            <div className="min-h-screen flex flex-col">
                <Header />
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate('/')}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        position: 'fixed',
                        top: isMobile ? '100px' : '100px',
                        left: isMobile ? '15px' : '20px',
                        zIndex: 9999,
                        backgroundColor: '#1C3F75',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: isMobile ? '44px' : '48px',
                        height: isMobile ? '44px' : '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    aria-label="Go back to home"
                >
                    <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </motion.button>
                <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <span className="text-6xl mb-4 block">🍲</span>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#1C3F75] font-serif mb-4">
                                    {t('annathanam')}
                                </h1>
                                <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                                <p className="text-xl font-medium text-center text-[#1C3F75] italic mb-8">
                                    "{t('annathanamQuote')}"
                                </p>

                                <p className="leading-relaxed text-left">
                                    {t('annathanamDesc1')}
                                </p>

                                <p className="leading-relaxed text-left">
                                    {t('annathanamDesc2')}
                                    <br />
                                    <span className="font-semibold block mt-2 text-center">"{t('annathanamQuote2')}"</span>
                                </p>

                                <p className="leading-relaxed text-left">
                                    {t('annathanamDesc3')}
                                </p>

                                <p className="leading-relaxed text-left">
                                    {t('annathanamDesc4')}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Donation Table */}
                    <div className="max-w-4xl mx-auto mt-8 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <table
                                style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                    border: '1px solid #E0E0E0',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                    backgroundColor: '#FFFFFF'
                                }}
                            >
                                <thead>
                                    <tr style={{ backgroundColor: '#1C3F75' }}>
                                        <th
                                            style={{
                                                padding: isMobile ? '12px 10px' : '15px',
                                                textAlign: 'left',
                                                color: '#FFFFFF',
                                                fontWeight: 600,
                                                fontSize: isMobile ? '14px' : '16px',
                                                borderRight: '1px solid rgba(255, 255, 255, 0.2)'
                                            }}
                                        >
                                            Donation
                                        </th>
                                        <th
                                            style={{
                                                padding: isMobile ? '12px 10px' : '15px',
                                                textAlign: 'left',
                                                color: '#FFFFFF',
                                                fontWeight: 600,
                                                fontSize: isMobile ? '14px' : '16px'
                                            }}
                                        >
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ backgroundColor: '#FFFFFF' }}>
                                        <td
                                            style={{
                                                padding: isMobile ? '12px 10px' : '15px',
                                                borderRight: '1px solid #E0E0E0',
                                                borderTop: '1px solid #E0E0E0',
                                                color: '#333333',
                                                fontSize: isMobile ? '14px' : '16px',
                                                fontWeight: 500
                                            }}
                                        >
                                            Lunch
                                        </td>
                                        <td
                                            style={{
                                                padding: isMobile ? '12px 10px' : '15px',
                                                borderTop: '1px solid #E0E0E0',
                                                color: '#333333',
                                                fontSize: isMobile ? '14px' : '16px',
                                                fontWeight: 600
                                            }}
                                        >
                                            ₹ 6,000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                    
                    {/* Donation Form Section */}
                    <AnnathanamDonationForm />
                </main>
                <Footer />
                <ScrollToTop />
            </div>
        </>
    );
};

export default Annathanam;
