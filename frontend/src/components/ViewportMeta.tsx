import React, { useEffect } from 'react';

const ViewportMeta: React.FC = () => {
  useEffect(() => {
    // Dynamic viewport height for mobile browsers
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial viewport height
    setViewportHeight();

    // Update on resize
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return null;
};

export default ViewportMeta;
