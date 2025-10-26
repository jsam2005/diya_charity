import React from 'react';
import { motion } from 'framer-motion';
import { useDeviceFeatures } from '@/hooks/useResponsive';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, className = '' }) => {
  const { isMobile, isTablet, isDesktop, isTouchDevice } = useDeviceFeatures();

  const getResponsiveClasses = () => {
    let classes = className;
    
    if (isMobile) {
      classes += ' mobile-layout';
    } else if (isTablet) {
      classes += ' tablet-layout';
    } else if (isDesktop) {
      classes += ' desktop-layout';
    }
    
    if (isTouchDevice) {
      classes += ' touch-device';
    }
    
    return classes;
  };

  return (
    <motion.div
      className={getResponsiveClasses()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-4',
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useDeviceFeatures();

  const getGridCols = () => {
    if (isMobile) return `grid-cols-${cols.mobile || 1}`;
    if (isTablet) return `grid-cols-${cols.tablet || 2}`;
    if (isDesktop) return `grid-cols-${cols.desktop || 3}`;
    return 'grid-cols-1';
  };

  return (
    <div className={`grid ${getGridCols()} ${gap} ${className}`}>
      {children}
    </div>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({ 
  children, 
  mobile = 'text-sm',
  tablet = 'text-base',
  desktop = 'text-lg',
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useDeviceFeatures();

  const getTextSize = () => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    if (isDesktop) return desktop;
    return mobile;
  };

  return (
    <span className={`${getTextSize()} ${className}`}>
      {children}
    </span>
  );
};

// Responsive Image Component
interface ResponsiveImageProps {
  src: string;
  alt: string;
  mobile?: string;
  tablet?: string;
  desktop?: string;
  className?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ 
  src, 
  alt, 
  mobile = 'w-full h-48',
  tablet = 'w-full h-64',
  desktop = 'w-full h-80',
  className = ''
}) => {
  const { isMobile, isTablet, isDesktop } = useDeviceFeatures();

  const getImageSize = () => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    if (isDesktop) return desktop;
    return mobile;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${getImageSize()} ${className}`}
      loading="lazy"
    />
  );
};

export default ResponsiveLayout;
