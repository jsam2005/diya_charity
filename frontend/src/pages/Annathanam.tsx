import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import AnnathanamDonationForm from '@/components/AnnathanamDonationForm';
import { getAssetPath } from '@/utils';

const Annathanam: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { isMobile } = useDeviceFeatures();

    const galleryImages = Array.from({ length: 9 }, (_, index) =>
        getAssetPath(`assets/annathanam/img${index + 1}.jpeg`)
    );
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const totalImages = galleryImages.length;

    const showPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    const showNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
    };
    
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
                    onClick={() => {
                        if (isExpanded) {
                            setIsExpanded(false);
                        } else {
                            navigate('/');
                        }
                    }}
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
                                                fontWeight: 900
                                            }}
                                        >
                                            {t('lunchMassFeeding')}
                                        </td>
                                        <td
                                            style={{
                                                padding: isMobile ? '12px 10px' : '15px',
                                                borderTop: '1px solid #E0E0E0',
                                                color: '#333333',
                                                fontSize: isMobile ? '14px' : '16px',
                                                fontWeight: 900
                                            }}
                                        >
                                            ₹ 6,000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                    
                    {/* Gallery Section */}
                    <section className="max-w-5xl mx-auto mt-10 mb-10">
                        <h2 className="text-2xl md:text-3xl font-semibold text-[#1C3F75] text-center mb-6">
                            Annathanam Gallery
                        </h2>
                        <div className="flex flex-col items-center">
                            <div className="relative w-full max-w-2xl">
                                {/* Single gallery card */}
                                <div
                                    className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer"
                                    onClick={() => setIsExpanded(true)}
                                >
                                    <div className="overflow-hidden">
                                        <img
                                            src={galleryImages[currentIndex]}
                                            alt={`Annathanam meal service ${currentIndex + 1}`}
                                            className="w-full h-80 md:h-96 object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                                            onError={(e) => {
                                                const target = e.currentTarget as HTMLImageElement;
                                                target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="px-4 py-3 border-t border-gray-100 text-sm text-gray-700 flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">
                                                On 27/02/2025
                                            </p>
                                            <p className="text-gray-600">
                                                Location: Pallavaram
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {currentIndex + 1} / {totalImages}
                                        </p>
                                    </div>
                                </div>

                                {/* Left / Right arrows - more visible */}
                                <button
                                    type="button"
                                    onClick={showPrev}
                                    className="absolute top-1/2 -translate-y-1/2 -left-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-black focus:outline-none"
                                    aria-label="Previous image"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={showNext}
                                    className="absolute top-1/2 -translate-y-1/2 -right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-black focus:outline-none"
                                    aria-label="Next image"
                                >
                                    ›
                                </button>
                            </div>

                            {/* Fullscreen overlay when expanded */}
                            {isExpanded && (
                                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                                    {/* Close button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center text-xl shadow-lg hover:bg-black focus:outline-none"
                                        aria-label="Close image"
                                    >
                                        ✕
                                    </button>

                                    {/* Previous / Next in fullscreen */}
                                    <button
                                        type="button"
                                        onClick={showPrev}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center text-3xl shadow-lg hover:bg-white/40 focus:outline-none"
                                        aria-label="Previous image"
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        onClick={showNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center text-3xl shadow-lg hover:bg-white/40 focus:outline-none"
                                        aria-label="Next image"
                                    >
                                        ›
                                    </button>

                                    <div className="max-w-5xl w-full px-4 flex flex-col items-center">
                                        <img
                                            src={galleryImages[currentIndex]}
                                            alt={`Annathanam meal service ${currentIndex + 1}`}
                                            className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                                        />
                                        <div className="mt-4 text-center text-sm text-gray-200">
                                            <p className="font-semibold">
                                                On 27/02/2025 &middot; Location: Pallavaram
                                            </p>
                                            <p className="text-xs mt-1">
                                                {currentIndex + 1} / {totalImages}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

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
