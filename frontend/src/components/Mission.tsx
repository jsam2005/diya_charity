import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAssetPath, scrollToElement } from '@/utils';
import { useDeviceFeatures } from '@/hooks/useResponsive';

const Mission: React.FC = () => {
  const { isMobile, isTablet } = useDeviceFeatures();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const ngoLogo = getAssetPath('assets/logos/ngo-npo-logo.png');
  const darpanLogo = getAssetPath('assets/logos/darpan-logo.png');
  const incomeTaxLogo = getAssetPath('assets/logos/income-tax-logo.png');
  const csrLogo = getAssetPath('assets/logos/csr.png');
  const complianceImage = getAssetPath('compilance.png');

  const complianceCards = [
    { id: 'card-ngo', logo: ngoLogo, alt: 'NGO & NPO Registration Logo' },
    { id: 'card-darpan', logo: darpanLogo, alt: 'DARPAN Portal Logo' },
    { id: 'card-income-tax-a', logo: incomeTaxLogo, alt: 'Income Tax Registration Logo' },
    { id: 'card-income-tax-b', logo: csrLogo, alt: 'CSR Logo' },
  ];

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Poppins', 'EB Garamond', serif",
    fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
    color: '#1C3F75',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    display: 'inline-block',
    maxWidth: '100%',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    padding: '0 15px',
  };

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#F9F9F9',
    padding: isMobile ? '20px 15px' : '30px 20px',
    borderRadius: '1.5rem',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const primaryActivitiesGradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(135deg, #1C3F75 0%, #2E5A8F 20%, #00A389 50%, #1C7A6B 80%, #1C3F75 100%)',
    backgroundSize: '400% 400%',
    padding: isMobile ? '20px 15px' : '30px 20px',
    borderRadius: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    animation: 'gradient-motion-glow 25s ease infinite alternate',
    boxShadow: '0 0 10px rgba(28, 63, 117, 0.5), 0 0 40px rgba(0, 163, 137, 0.3), 0 0 80px rgba(28, 63, 117, 0.1)',
    width: '100%',
    boxSizing: 'border-box',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0 15px',
  };

  // Responsive grid style for mobile/tablet
  const getResponsiveGridStyle = (): React.CSSProperties => {
    if (isMobile) {
      return {
        ...gridStyle,
        gridTemplateColumns: '1fr',
        gap: '20px',
        padding: '0 10px',
      };
    }
    if (isTablet) {
      return {
        ...gridStyle,
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        padding: '0 15px',
      };
    }
    return gridStyle;
  };

  // Corporate sponsors streaming cards (carousel-wrapper / card-track / stream-card)
  const corporateScrollerContainerStyle: React.CSSProperties = {
    overflow: 'hidden',
    width: '100%',
    maxWidth: '900px',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    marginBottom: '40px',
    boxSizing: 'border-box',
    padding: '0 15px',
  };

  const corporateScrollerTrackStyle: React.CSSProperties = {
    display: 'flex',
    gap: '24px',
    width: 'max-content',
    animation: 'stream-loop-rtl 30s linear infinite',
  };

  const corporateCardStyle: React.CSSProperties = {
    width: isMobile ? '280px' : '300px',
    flexShrink: 0,
    padding: isMobile ? '20px 18px' : '24px 22px',
    borderRadius: '16px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    textAlign: 'left',
    color: '#111827',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
  };

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-white"
    >
      <div 
        className="container-custom-full relative z-10"
        style={{
          backgroundColor: '#ffffff',
          minHeight: '400px',
          borderRadius: '1rem',
          padding: '0.5rem',
          maxWidth: '95%',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
          style={{ opacity: 1 }}
        >
          <div
            id="primary-activity-section"
            style={layoutContainerStyle}
            className="mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 style={sectionTitleStyle}>
                OUR MISSION
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                maxWidth: '1950px',
                margin: '0 auto',
                padding: '20px',
                textAlign: 'justify',
                width: '100%',
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <p
                style={{
                  fontFamily: "Calibri, sans-serif",
                  fontSize: '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                Have you ever felt the sting of hunger born out of extreme poverty - Even sudden urban poverty due to misfortune so deep that you couldn't share your struggles with anyone because of family dignity? Have you faced the stress of losing a job, along with the emotional turmoil it brings to you and your family? Have you experienced loneliness or depression from being left behind in the race for success or from the challenges that come with age? Or the pain of missing someone, something, or the helplessness of being unable to meet the needs of your loved ones?
              </p>
              <p
                style={{
                  fontFamily: "Calibri, sans-serif",
                  fontSize: isMobile ? '16px' : isTablet ? '20px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: 500,
                  padding: isMobile ? '0 10px' : '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                }}
              >
                We are here to be a comforting presence - A healing hand to support you, uplift you, and help you move forward.
              </p>
              <p
                style={{
                  fontFamily: "Calibri, sans-serif",
                  fontSize: isMobile ? '16px' : isTablet ? '20px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: 500,
                  padding: isMobile ? '0 10px' : '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                }}
              >
                If you, the reader, feel blessed by God, live in comfort, and feel protected, we invite you to spare your time to join us as a <strong>Volunteer</strong> (OR) contribute by <strong>Donating even a small part of your abundance</strong> . Remember, what goes around comes around in multiples!
              </p>
              <p
                style={{
                  fontFamily: "Calibri, sans-serif",
                  fontSize: isMobile ? '16px' : isTablet ? '20px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: 500,
                  padding: isMobile ? '0 10px' : '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                }}
              >
                Our every outreach would be anonymous. None outside would know except professional volunteers! Reach out to us through whatsapp on 1234567890, you may not get instant replies but for sure we will reach out to you !
              </p>
              <p
                style={{
                  fontFamily: "Calibri, sans-serif",
                  fontSize: isMobile ? '16px' : isTablet ? '20px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '10px',
                  fontWeight: 500,
                  padding: isMobile ? '0 10px' : '0',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                }}
              >
                It doesn't matter who we are ! Let our actions speak !!
              </p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: isMobile ? '15px' : '40px',
                  marginTop: isMobile ? '30px' : '40px',
                  flexWrap: 'wrap',
                  padding: isMobile ? '0 10px' : '0',
                  boxSizing: 'border-box',
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '12px 25px' : '15px 35px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(139, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                    minWidth: isMobile ? '140px' : '200px',
                    maxWidth: isMobile ? '100%' : '300px',
                    width: isMobile ? '100%' : 'auto',
                    flex: isMobile ? '1 1 calc(50% - 7.5px)' : '0 1 auto',
                  }}
                >
                  Volunteer
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('donation')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: isMobile ? '12px 25px' : '15px 35px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(139, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                    minWidth: isMobile ? '140px' : '200px',
                    maxWidth: isMobile ? '100%' : '300px',
                    width: isMobile ? '100%' : 'auto',
                    flex: isMobile ? '1 1 calc(50% - 7.5px)' : '0 1 auto',
                  }}
                >
                  Donate
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Our Compliance Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
            style={{ marginTop: '60px', marginBottom: '30px' }}
          >
            <h2 style={sectionTitleStyle}>
              OUR COMPILANCE
            </h2>
          </motion.div>

          {/* Our Compliance Container - Full Width */}
          <div
            id="compliance-section"
            style={{
              position: 'relative',
              display: 'block',
              marginTop: '20px',
              width: isMobile ? '100%' : '100vw',
              marginLeft: isMobile ? '0' : 'calc(-50vw + 50%)',
              padding: isMobile ? '0 15px' : 0,
              boxSizing: 'border-box'
            }}
          >
            {/* Background Image Area with Dark Overlay */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? '250px' : '400px',
                backgroundImage: `url(${complianceImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Dark Grayscale Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6))',
                }}
              />
            </div>

            {/* Content Container Overlay - Overlaps bottom half of image */}
            <div
              style={{
                position: 'relative',
                marginTop: isMobile ? '-40px' : '-100px',
                zIndex: 10,
                backgroundColor: 'transparent',
                padding: isMobile ? '30px 10px 30px 10px' : '60px 20px 40px 20px',
                maxWidth: '1400px',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxSizing: 'border-box'
              }}
            >
              {/* Compliance Credentials Logos - Centered Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '15px' : '25px',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
                    boxSizing: 'border-box',
                    padding: isMobile ? '0 10px' : '0 15px',
                  }}
                >
                  {complianceCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      style={{
                        background: '#FFFFFF',
                        borderRadius: '12px',
                        minHeight: isMobile ? '120px' : '160px',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                        padding: '0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={card.logo}
                        alt={card.alt}
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'contain',
                          display: 'block',
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Our Primary Activities Section */}
          <div
            id="primary-activities-section"
            style={primaryActivitiesGradientStyle}
            className="mb-4"
          >
            {/* Glitter Noise Overlay - Multiple Layers for Depth */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise1">
                      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
                      <feColorMatrix type="saturate" values="0"/>
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise1)" opacity="0.3"/>
                  </svg>
                `)}")`,
                backgroundSize: '200px 200px',
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'overlay',
                opacity: 0.25,
                pointerEvents: 'none',
                zIndex: 1,
                animation: 'subtleShift 15s ease infinite alternate',
              }}
            />
            {/* Secondary Glitter Layer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '50px 50px',
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'screen',
                opacity: 0.4,
                pointerEvents: 'none',
                zIndex: 1,
                animation: 'subtleShift 25s ease infinite alternate-reverse',
              }}
            />
            <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 style={{ ...sectionTitleStyle, color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                Our Primary Activities & Impact Areas
              </h2>
            </motion.div>

              <section aria-labelledby="primary-activities-heading">
                <h3
                  id="primary-activities-heading"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  textAlign: 'center',
                  marginBottom: '24px',
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
                }}
                >
                </h3>
                <div style={getResponsiveGridStyle()}>
                {[
                  {
                    id: 'card-budding-minds',
                    title: 'Budding Minds',
                    content: 'Bridging school dropout gaps, support classes, counseling, and career guidance.',
                    icon: '🧠',
                  },
                  {
                    id: 'card-youth-leap',
                    title: 'Youth Leap',
                    content: 'Skill training, psychological counseling, and placement support specifically designed for youth empowerment.',
                    icon: '🚀',
                  },
                  {
                    id: 'card-vulnerable-families',
                    title: 'Vulnerable Women & Families',
                    content: 'Skill training, job placement, and self-help group formation focused on economic stability for women.',
                    icon: '💪',
                  },
                  {
                    id: 'card-old-age-care',
                    title: 'Old Age Care',
                    content: 'Palliative care, counseling, and accessible healthcare services for the elderly community.',
                    icon: '❤️',
                  },
                  {
                    id: 'card-sustainability',
                    title: 'Support & Sustainability',
                    content: 'Awareness campaigns and sustainability efforts for long-term community resilience.',
                    icon: '🌱',
                  },
                  {
                    id: 'card-placeholder',
                    title: 'Coming Soon',
                    content: 'New initiative coming soon. Stay tuned for updates.',
                    icon: '✨',
                    isPlaceholder: true,
                  },
                ].map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className={`h-full bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-[#EAF4FF] ${isMobile ? 'p-4' : 'p-[30px]'}`}
                    >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-3xl" aria-hidden="true">
                        <span>{card.icon}</span>
                      </div>
                      <h4 className="text-xl font-semibold text-[#1C3F75] mb-3">
                        {card.title}
                      </h4>
                      <p className="text-base text-[#333333] leading-relaxed">
                        {card.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Our Corporate Partners Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ marginTop: '60px', marginBottom: '30px' }}
          >
            <h2 style={sectionTitleStyle}>
              OUR CORPORATE & GOVERNMENT SPONSORS
            </h2>
            <h1 style={{
              ...sectionTitleStyle,
              fontSize: '1.8rem',
              marginTop: '10px',
              marginBottom: '20px',
              display: 'block',
            }}>
              UNDER CSR INITIATIVES
            </h1>
          </motion.div>
          <div style={corporateScrollerContainerStyle} className="carousel-wrapper">
            <div style={corporateScrollerTrackStyle} className="card-track">
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 1
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 2
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 3
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
              {/* Duplicated cards for seamless loop */}
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 1
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 2
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
              <div style={corporateCardStyle} className="stream-card">
                <h3
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: '#1C3F75',
                    marginBottom: '8px',
                  }}
                >
                  Corporate Partner Placeholder 3
                </h3>
                <p
                  style={{
                    fontFamily: "'EB Garamond', serif",
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: 1.6,
                  }}
                >
                  Placeholder text for future CSR partner details and impact
                  summary.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-20 left-10 w-32 h-32 border border-primary-300 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-20 right-10 w-24 h-24 border border-primary-300 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Mission;
