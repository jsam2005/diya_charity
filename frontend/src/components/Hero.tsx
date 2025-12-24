import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToElement, getAssetPath } from '@/utils';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import { useLanguage } from '@/contexts/LanguageContext';

const NAVBAR_HEIGHT = 60;
const RUNNING_LINE_HEIGHT = 30;

const Hero: React.FC = () => {
  const { isMobile, isTablet } = useDeviceFeatures();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScrollDown = () => {
    scrollToElement('about');
  };

  // Dynamic animation variants based on device
  const getAnimationVariants = () => {
    if (isMobile) {
      return {
        title: { opacity: 0, y: 30 }
      };
    }
    return {
      title: { opacity: 0, y: 50 }
    };
  };

  const variants = getAnimationVariants();
  
  const videoSrc = getAssetPath('bg.mp4');
  
  // Debug: log the video source path (only in development)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Video source path:', videoSrc);
      console.log('BASE_URL:', import.meta.env.BASE_URL);
    }
  }, [videoSrc]);

  useEffect(() => {
    // Ensure video plays when component mounts (for both mobile and desktop)
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Silently handle autoplay restrictions
        if (import.meta.env.DEV) {
          console.warn('Video autoplay prevented:', error);
        }
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        paddingTop: NAVBAR_HEIGHT + RUNNING_LINE_HEIGHT,
        boxSizing: 'border-box'
      }}
    >
      {/* Video Background for both Mobile and Desktop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
        }}
        onLoadedData={() => {
          if (videoRef.current) {
            videoRef.current.play().catch((error) => {
              // Silently handle autoplay restrictions
              if (import.meta.env.DEV) {
                console.warn('Video autoplay prevented:', error);
              }
            });
          }
        }}
        onError={(e) => {
          // Handle video loading errors gracefully
          if (import.meta.env.DEV) {
            console.warn('Video loading error:', e);
          }
        }}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Background Overlay - Very light for better visibility */}
      <div className={`absolute inset-0 z-[1] ${isMobile ? 'bg-black/10' : 'bg-black/20'}`} />

      {/* Welcome Text - After Navbar */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute left-0 right-0 text-center w-full px-3 md:px-4`}
        style={{ 
          opacity: 1,
          top: isMobile ? `${NAVBAR_HEIGHT + RUNNING_LINE_HEIGHT + 100}px` : '50px',
          zIndex: 20,
          transition: 'top 0.3s ease'
        }}
      >
        <h2 
          className={`font-elegant text-white tracking-wide ${
            isMobile 
              ? 'text-5xl leading-tight' 
              : isTablet 
                ? 'text-3xl md:text-4xl' 
                : 'text-4xl lg:text-5xl xl:text-6xl'
          }`}
          style={{
            ...(isMobile ? {
              fontSize: '2.5rem',
              textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95), 2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.08em',
              fontWeight: '900',
              lineHeight: '1.2'
            } : {
              textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 4px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.05em',
              fontWeight: '700'
            }),
            maxWidth: '100%',
            boxSizing: 'border-box',
            wordWrap: 'break-word',
            padding: '0 15px',
          }}
        >
          {t('heroWelcome')}
        </h2>
      </motion.div>

      {/* Text Background Component - Moved to Bottom Black Region */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ opacity: 1 }}
      >
        <div className={`text-backdrop rounded-t-2xl mb-0 w-full ${
          isMobile ? 'p-3 px-4' : 'p-2 md:p-3 px-4 md:px-0'
        }`}>
          <motion.h1
            initial={variants.title}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`font-elegant font-normal text-black tracking-wide leading-tight text-center ${
              isMobile 
                ? 'text-xl font-bold mb-2' 
                : 'text-3xl md:text-4xl lg:text-5xl mb-3'
            }`}
            style={{
              ...(isMobile ? {
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.03em',
                fontWeight: '800'
              } : {
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2)',
                letterSpacing: '0.05em',
                fontWeight: '700'
              }),
              maxWidth: '100%',
              boxSizing: 'border-box',
              wordWrap: 'break-word',
              padding: '0 10px',
            }}
          >
            {t('heroMotto')}
          </motion.h1>
          <motion.h2
            initial={variants.title}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`font-elegant font-normal text-black tracking-wide leading-tight text-center ${
              isMobile 
                ? 'text-xl font-bold' 
                : 'text-3xl md:text-4xl lg:text-5xl'
            }`}
            style={{
              ...(isMobile ? {
                textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.3)',
                letterSpacing: '0.03em',
                fontWeight: '800'
              } : {
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2)',
                letterSpacing: '0.05em',
                fontWeight: '700'
              }),
              maxWidth: '100%',
              boxSizing: 'border-box',
              wordWrap: 'break-word',
              padding: '0 10px',
            }}
          >
            {t('heroTitle')}
          </motion.h2>
          <motion.p
            initial={variants.title}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`font-elegant text-center ${
              isMobile
                ? 'text-base font-semibold'
                : 'text-xl md:text-2xl'
            }`}
            style={{
              color: '#1C1C1C',
              marginTop: isMobile ? '0.25rem' : '0.5rem',
              padding: '0 10px'
            }}
          >
            {t('heroSubtitle')}
          </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className={`absolute left-1/2 transform -translate-x-1/2 z-20 ${
          isMobile ? 'bottom-16' : 'bottom-20 md:bottom-24'
        }`}
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={handleScrollDown}
          className="text-white hover:text-primary-200 transition-colors duration-300 focus-visible"
          aria-label="Scroll down"
        >
          <svg
            className={isMobile ? "w-5 h-5" : "w-6 h-6"}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={isMobile ? 3 : 2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.button>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
