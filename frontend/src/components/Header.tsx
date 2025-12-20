import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToElement, getAssetPath } from '@/utils';
import { useDeviceFeatures } from '@/hooks/useResponsive';

const NAVBAR_HEIGHT = 60;
const RUNNING_LINE_HEIGHT = 30;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isMobile } = useDeviceFeatures();

  const handleDonate = () => {
    scrollToElement('donation');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const trustLogo = getAssetPath('assets/logos/trust logo.png');

  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://www.youtube.com',
      color: '#FF0000',
      icon: (
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: 'Twitter',
      url: 'https://www.twitter.com',
      color: '#1DA1F2',
      icon: (
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com',
      color: '#1877F2',
      icon: (
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com',
      color: '#E4405F',
      icon: (
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: NAVBAR_HEIGHT,
          padding: 0,
          backgroundColor: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
        justifyContent: 'space-between',
          zIndex: 20,
          width: '100%'
        }}
      >
        {/* Desktop Navbar */}
        {!isMobile && (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 15px',
            gap: '20px'
          }}
        >
          {/* Logo Container */}
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src={trustLogo}
              alt="Diya Charitable Trust Logo"
              style={{
                height: NAVBAR_HEIGHT,
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
          {/* Right Section */}
          <div
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px'
            }}
          >
            {/* Social Icons Container */}
            <div
              style={{ 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px'
              }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontSize: '28px',
                    margin: '0 6px',
                    display: 'flex',
                    alignItems: 'center',
                    color: social.color
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Donate Button */}
            <motion.button
              onClick={handleDonate}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              style={{
                height: 'calc(100% - 14px)',
                padding: '0 20px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 'bold',
                lineHeight: '1',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#A61426',
                color: '#FFFFFF',
                cursor: 'pointer',
                border: 'none',
                fontFamily: 'inherit'
              }}
            >
              Donate
            </motion.button>
          </div>
        </div>
        )}

        {/* Mobile Navbar */}
        {isMobile && (
        <div 
          style={{ 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '0 15px'
          }}
        >
          {/* Logo Container */}
          <div
            style={{ 
              height: '100%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img
              src={trustLogo}
              alt="Diya Charitable Trust Logo"
              style={{
                height: NAVBAR_HEIGHT,
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </div>
          {/* Mobile Menu Icon */}
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
            style={{
              fontSize: '30px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1C3F75'
            }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </motion.button>
        </div>
        )}

        {/* Mobile Menu */}
      {isMobile && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: NAVBAR_HEIGHT + RUNNING_LINE_HEIGHT,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(28, 63, 117, 0.98)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              overflow: 'hidden',
              zIndex: 15,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
            >
            <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {/* Social Media Icons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                    style={{
                      fontSize: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      color: social.color
                    }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                {/* Donate Button */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '0.5rem' }}>
                  <motion.button
                    onClick={handleDonate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                    padding: '10px 24px',
                    borderRadius: '4px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    backgroundColor: '#A61426',
                    border: 'none',
                      cursor: 'pointer',
                    fontFamily: 'inherit'
                    }}
                  >
                    Donate
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      </motion.header>

      {/* Running Line Placeholder */}
      <div
        style={{
          position: 'fixed',
          top: NAVBAR_HEIGHT,
          left: 0,
          width: '100%',
          height: RUNNING_LINE_HEIGHT,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          zIndex: 19
        }}
      >
        <p
          style={{
            margin: 0,
            whiteSpace: 'nowrap',
            animation: 'hero-ticker 18s linear infinite',
            color: '#FFFFFF',
            fontWeight: 600
          }}
        >
          RUNNING LINE PLACEHOLDER
        </p>
      </div>

      {/* Spacer to prevent overlap with content */}
      <div style={{ height: NAVBAR_HEIGHT + RUNNING_LINE_HEIGHT }} />
    </>
  );
};

export default Header;
