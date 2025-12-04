import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollToElement, getAssetPath } from '@/utils';
import { useDeviceFeatures } from '@/hooks/useResponsive';

const Hero: React.FC = () => {
  const { isMobile, isTablet } = useDeviceFeatures();
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
  const mobileBgImage = getAssetPath('BG_mobile.jpeg');
  
  // Debug: log the video source path (remove in production)
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('Video source path:', videoSrc);
      console.log('BASE_URL:', import.meta.env.BASE_URL);
    }
  }, [videoSrc]);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ 
        minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
      }}
    >
      {/* Mobile Background Image */}
      {isMobile ? (
        <div
          className="absolute top-0 left-0 w-full h-full z-0"
          style={{
            backgroundImage: `url(${mobileBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
          }}
        />
      ) : (
        /* Video Background for Desktop/Tablet */
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
                console.error('Error playing video:', error);
              });
            }
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Background Overlay - Very light for better visibility */}
      <div className={`absolute inset-0 z-[1] ${isMobile ? 'bg-black/10' : 'bg-black/20'}`} />

      {/* Welcome Text - After Navbar */}
      <motion.div
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute left-0 right-0 z-10 text-center w-full ${
          isMobile ? 'top-28 px-3' : 'top-24 md:top-28 px-4'
        }`}
        style={{ opacity: 1 }}
      >
        <h2 
          className={`font-elegant text-white tracking-wide ${
            isMobile 
              ? 'text-3xl leading-tight' 
              : isTablet 
                ? 'text-3xl md:text-4xl' 
                : 'text-4xl lg:text-5xl xl:text-6xl'
          }`}
          style={isMobile ? {
            textShadow: '4px 4px 16px rgba(0, 0, 0, 0.95), 2px 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.08em',
            fontWeight: '900',
            lineHeight: '1.2'
          } : {
            textShadow: '3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 4px rgba(0, 0, 0, 0.8)',
            letterSpacing: '0.05em',
            fontWeight: '700'
          }}
        >
          WELCOME TO DIYA CHARITABLE TRUST(TN)
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
                : 'whitespace-nowrap text-3xl md:text-4xl lg:text-5xl mb-3'
            }`}
            style={isMobile ? {
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.03em',
              fontWeight: '800'
            } : {
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.05em',
              fontWeight: '700'
            }}
          >
            -Humanity First-
          </motion.h1>
          <motion.h2
            initial={variants.title}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`font-elegant font-normal text-black tracking-wide leading-tight text-center ${
              isMobile 
                ? 'text-xl font-bold' 
                : 'whitespace-nowrap text-3xl md:text-4xl lg:text-5xl'
            }`}
            style={isMobile ? {
              textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4), 0 0 12px rgba(0, 0, 0, 0.3)',
              letterSpacing: '0.03em',
              fontWeight: '800'
            } : {
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 0, 0, 0.2)',
              letterSpacing: '0.05em',
              fontWeight: '700'
            }}
          >
            Illuminating Lives Through Service
          </motion.h2>
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
