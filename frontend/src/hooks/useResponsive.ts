import { useState, useEffect } from 'react';

interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
}

const getSnapshot = (): ResponsiveState => {
  if (typeof window === 'undefined') {
    return {
    isMobile: false,
    isTablet: false,
      isDesktop: true,
      screenWidth: 1200,
      screenHeight: 800,
    orientation: 'landscape',
    };
  }

      const width = window.innerWidth;
      const height = window.innerHeight;
      
  return {
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
        orientation: width > height ? 'landscape' : 'portrait',
  };
};

export const useResponsive = (): ResponsiveState => {
  const [responsiveState, setResponsiveState] = useState<ResponsiveState>(getSnapshot());

  useEffect(() => {
    const updateResponsiveState = () => {
      setResponsiveState(getSnapshot());
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
  const { isMobile, isTablet, isDesktop, orientation, screenWidth } = useResponsive();

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
    isSmallMobile: screenWidth < 480,
    isLargeMobile: screenWidth >= 480 && screenWidth < 768,
    isSmallTablet: screenWidth >= 768 && screenWidth < 900,
    isLargeTablet: screenWidth >= 900 && screenWidth < 1024,
  };
};
