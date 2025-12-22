import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation strings
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    donate: 'Donate',
    // Hero
    heroWelcome: 'Welcome to Diya Charitable Trust (TN)',
    heroMotto: '-Humanity First-',
    heroTitle: 'Illuminating Lives Through Service',
    heroSubtitle: 'Empowering Communities, Building Hope',
    heroCta: 'Join Our Mission',
    // Mission
    missionTitle: 'Our Mission',
    missionDescription: 'At Diya Charity, we are a newly established NGO dedicated to serving society through comprehensive social welfare programs. Our mission is to illuminate lives and bring hope to underserved communities through education, healthcare, women\'s empowerment, and environmental sustainability. Like a diya (lamp) that dispels darkness, we strive to light up the path towards a better tomorrow for all.',
    // Contact
    contactTitle: 'Get in Touch',
    contactDescription: 'Join us in our mission to serve society. Whether you want to volunteer, donate, or partner with us, we would love to hear from you. Together, we can make a difference in the lives of those who need it most.',
    // Footer
    footerCopyright: '© 2035 by Diya Charity.',
    footerPoweredBy: 'Powered and secured by Wix',
    privacyPolicy: 'Privacy Policy',
    accessibilityStatement: 'Accessibility Statement',
  },
  ta: {
    // Header
    donate: 'நன்கொடை',
    // Hero
    heroWelcome: 'Diya Charitable Trust (TN) உங்களை வரவேற்கிறது',
    heroMotto: '-மனிதாபிமானம் முதலில்-',
    heroTitle: 'சேவை மூலம் வாழ்க்கையை ஒளிரச் செய்தல்',
    heroSubtitle: 'சமூகங்களை அதிகாரப்படுத்துதல், நம்பிக்கையை உருவாக்குதல்',
    heroCta: 'எங்கள் பணியில் சேரவும்',
    // Mission
    missionTitle: 'எங்கள் பணி',
    missionDescription: 'டியா சாரிட்டியில், நாங்கள் விரிவான சமூக நலநலத் திட்டங்கள் மூலம் சமூகத்திற்கு சேவை செய்வதற்காக அர்ப்பணிக்கப்பட்ட புதிதாக நிறுவப்பட்ட NGO ஆகும். கல்வி, சுகாதாரம், பெண்கள் அதிகாரமளித்தல் மற்றும் சுற்றுச்சூழல் நிலைத்தன்மை மூலம் குறைந்த வசதியுள்ள சமூகங்களுக்கு வாழ்க்கையை ஒளிரச் செய்து நம்பிக்கையைக் கொண்டு வருவதே எங்கள் பணி. இருளைப் போக்கும் தீபம் போல, அனைவருக்கும் ஒரு சிறந்த நாளைக்கான பாதையை ஒளிரச் செய்ய நாங்கள் முயற்சிக்கிறோம்.',
    // Contact
    contactTitle: 'தொடர்பு கொள்ளுங்கள்',
    contactDescription: 'சமூகத்திற்கு சேவை செய்யும் எங்கள் பணியில் எங்களுடன் சேரவும். நீங்கள் தன்னார்வலராக இருக்க விரும்பினாலும், நன்கொடை அளிக்க விரும்பினாலும் அல்லது எங்களுடன் கூட்டாளியாக இருக்க விரும்பினாலும், உங்களிடமிருந்து கேட்க விரும்புகிறோம். ஒன்றாக, அதிகம் தேவைப்படுபவர்களின் வாழ்க்கையில் ஒரு வித்தியாசத்தை ஏற்படுத்தலாம்.',
    // Footer
    footerCopyright: '© 2035 டியா சாரிட்டி மூலம்.',
    footerPoweredBy: 'Wix மூலம் இயக்கப்பட்டது மற்றும் பாதுகாக்கப்பட்டது',
    privacyPolicy: 'தனியுரிமைக் கொள்கை',
    accessibilityStatement: 'அணுகல்தன்மை அறிக்கை',
  },
  hi: {
    // Header
    donate: 'दान करें',
    // Hero
    heroWelcome: 'Diya Charitable Trust (TN) में आपका स्वागत है',
    heroMotto: '-मानवता सर्वोपरि-',
    heroTitle: 'सेवा के माध्यम से जीवन को रोशन करना',
    heroSubtitle: 'समुदायों को सशक्त बनाना, आशा का निर्माण करना',
    heroCta: 'हमारे मिशन में शामिल हों',
    // Mission
    missionTitle: 'हमारा मिशन',
    missionDescription: 'दीया चैरिटी में, हम एक नव स्थापित NGO हैं जो व्यापक सामाजिक कल्याण कार्यक्रमों के माध्यम से समाज की सेवा के लिए समर्पित हैं। हमारा मिशन शिक्षा, स्वास्थ्य सेवा, महिला सशक्तिकरण और पर्यावरणीय स्थिरता के माध्यम से वंचित समुदायों के जीवन को रोशन करना और आशा लाना है। एक दीया (दीपक) की तरह जो अंधकार को दूर करता है, हम सभी के लिए एक बेहतर कल का मार्ग प्रशस्त करने का प्रयास करते हैं।',
    // Contact
    contactTitle: 'संपर्क करें',
    contactDescription: 'समाज की सेवा करने के हमारे मिशन में हमसे जुड़ें। चाहे आप स्वयंसेवक बनना चाहते हों, दान करना चाहते हों, या हमारे साथ साझेदारी करना चाहते हों, हम आपसे सुनना पसंद करेंगे। एक साथ, हम उन लोगों के जीवन में एक अंतर ला सकते हैं जिन्हें इसकी सबसे अधिक आवश्यकता है।',
    // Footer
    footerCopyright: '© 2035 दीया चैरिटी द्वारा।',
    footerPoweredBy: 'Wix द्वारा संचालित और सुरक्षित',
    privacyPolicy: 'गोपनीयता नीति',
    accessibilityStatement: 'पहुंच योग्यता विवरण',
  },
};

const languageNames: Record<Language, string> = {
  en: 'English',
  ta: 'Tamil',
  hi: 'Hindi',
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage first
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta' || savedLanguage === 'hi')) {
      return savedLanguage;
    }
    // Default to English
    return 'en';
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem('language', language);
    // Update document language attribute
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const getLanguageName = (code: Language): string => {
  return languageNames[code];
};

