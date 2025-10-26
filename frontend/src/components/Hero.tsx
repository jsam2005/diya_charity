import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '@/data/constants';
import { scrollToElement } from '@/utils';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import ResponsiveLayout from './ResponsiveLayout';

const Hero: React.FC = () => {
  const { isMobile, isTablet, isTouchDevice } = useDeviceFeatures();

  const handleLearnMore = () => {
    scrollToElement('donate');
  };

  const handleScrollDown = () => {
    scrollToElement('about');
  };

  // Dynamic animation variants based on device
  const getAnimationVariants = () => {
    if (isMobile) {
      return {
        title: { opacity: 0, y: 30 },
        subtitle: { opacity: 0, y: 20 },
        button: { opacity: 0, scale: 0.9 }
      };
    }
    return {
      title: { opacity: 0, y: 50 },
      subtitle: { opacity: 0, y: 30 },
      button: { opacity: 0, scale: 0.9 }
    };
  };

  const variants = getAnimationVariants();

  return (
    <section
      id="home"
      className="relative flex items-center justify-center bg-cover bg-center bg-fixed"
      style={{ 
        minHeight: isMobile ? 'calc(var(--vh, 1vh) * 100)' : '100vh',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url(/diya_charity/diya_bg.jpeg)'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <ResponsiveLayout className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Text Background Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-backdrop rounded-2xl p-6 md:p-8 lg:p-12 mx-4 md:mx-0"
        >
          {/* Charity Name */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-8"
          >
            {/* Decorative line above */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-0.5 bg-primary-400 mx-auto mb-4 rounded-full"
            />
            
            <h1 className={`font-serif font-bold text-primary-400 charity-name-glow ${
              isMobile ? 'text-2xl' : isTablet ? 'text-3xl md:text-4xl' : 'text-4xl lg:text-5xl'
            }`}
            >
              Diya Charity
            </h1>
            
            {/* Decorative line below */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-24 h-0.5 bg-primary-400 mx-auto mt-4 rounded-full"
            />
          </motion.div>

          <motion.h2
            initial={variants.title}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-elegant font-light mb-6 text-white tracking-wide leading-tight ${
              isMobile ? 'text-3xl' : isTablet ? 'text-4xl md:text-5xl' : 'text-5xl lg:text-6xl'
            }`}
            style={{ 
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
              letterSpacing: '0.05em',
              fontWeight: '300'
            }}
          >
            {HERO_CONTENT.title}
          </motion.h2>

          <motion.p
            initial={variants.subtitle}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`font-light mb-8 text-white/90 ${
              isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-xl md:text-2xl'
            }`}
            style={{ textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }}
          >
            {HERO_CONTENT.subtitle}
          </motion.p>

          <motion.div
            initial={variants.button}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              whileHover={isTouchDevice ? {} : { scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLearnMore}
              className={`btn-outline ${isMobile ? 'btn' : 'btn-lg'} bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20`}
            >
              Donate Now
            </motion.button>
          </motion.div>
        </motion.div>
      </ResponsiveLayout>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={handleScrollDown}
          className="text-white hover:text-primary-200 transition-colors duration-300 focus-visible"
          aria-label="Scroll down"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
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
