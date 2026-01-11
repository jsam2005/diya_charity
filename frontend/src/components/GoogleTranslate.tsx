import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

// Store initialization state globally to prevent multiple initializations across re-renders
let isGoogleTranslateInitialized = false;

const GoogleTranslate: React.FC = () => {
  const initializedRef = useRef(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isGoogleTranslateInitialized || initializedRef.current) {
      return;
    }

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (existingScript) {
      scriptLoadedRef.current = true;
    }

    // Define callback only once globally
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        // Prevent recursive calls
        if (isGoogleTranslateInitialized || initializedRef.current) {
          return;
        }

        if (window.google?.translate) {
          try {
            const element = document.getElementById('google_translate_element');
            if (element && !element.hasChildNodes()) {
              new window.google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'en,ta',
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false,
                },
                'google_translate_element'
              );
              initializedRef.current = true;
              isGoogleTranslateInitialized = true;
            }
          } catch (error) {
            console.error('Error initializing Google Translate:', error);
          }
        }
      };
    }

    // Load script only if not already loaded
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Google Translate script');
      };
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    } else {
      // If script already loaded, try to initialize immediately (with delay to ensure DOM is ready)
      setTimeout(() => {
        if (window.google?.translate && !isGoogleTranslateInitialized) {
          window.googleTranslateElementInit();
        }
      }, 100);
    }

    // No cleanup needed - keep script loaded for the session
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        display: 'none', // Hidden by default, can be shown via CSS or toggle
      }}
    />
  );
};

export default GoogleTranslate;




