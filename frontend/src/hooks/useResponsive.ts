import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
}

export const useResponsive = (): ResponsiveState => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'landscape',
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setResponsiveState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? 'landscape' : 'portrait',
      });
    };

    // Initial call
    updateResponsiveState();

    // Add event listener
    window.addEventListener('resize', updateResponsiveState);
    window.addEventListener('orientationchange', updateResponsiveState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return responsiveState;
};

// Hook for device-specific features
export const useDeviceFeatures = () => {
  const { isMobile, isTablet, isDesktop, orientation } = useResponsive();

  return {
    // Touch support
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // Device type
    isMobile,
    isTablet,
    isDesktop,
    
    // Orientation
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    
    // Performance considerations
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Network status
    isOnline: navigator.onLine,
    
    // Custom breakpoints
    isSmallMobile: isMobile && window.innerWidth < 480,
    isLargeMobile: isMobile && window.innerWidth >= 480,
    isSmallTablet: isTablet && window.innerWidth < 900,
    isLargeTablet: isTablet && window.innerWidth >= 900,
  };
};
