import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { NAV_ITEMS } from '@/data/constants';
import { scrollToElement } from '@/utils';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const elementId = href.replace('#', '');
    scrollToElement(elementId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-50/95 backdrop-blur-sm shadow-lg'
          : 'bg-warm-50'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0"
          >
            <h1 className="text-2xl font-serif font-bold text-primary-600">
              Diya Charity
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick(item.href)}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-300 focus-visible"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-primary-600 focus-visible"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden"
        >
          <nav className="py-4 space-y-4">
            {NAV_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: isMobileMenuOpen ? 0 : -20,
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left text-primary-600 hover:text-primary-700 font-medium py-2 focus-visible"
              >
                {item.label}
              </motion.button>
            ))}
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
