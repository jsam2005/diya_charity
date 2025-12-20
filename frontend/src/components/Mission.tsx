import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { getAssetPath, scrollToElement } from '@/utils';

const Mission: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const navigate = useNavigate();

  const ngoLogo = getAssetPath('assets/logos/ngo-npo-logo.png');
  const darpanLogo = getAssetPath('assets/logos/darpan-logo.png');
  const incomeTaxLogo = getAssetPath('assets/logos/income-tax-logo.png');
  const complianceImage = getAssetPath('compilance.png');
  const sustainabilityImage = getAssetPath('assets/sustainability.jpg');
  const annathanamImage = getAssetPath('assets/annathanam.jpg');
  const mealDonationImage = getAssetPath('assets/logos/meal_donation.jpg');

  const complianceCards = [
    { id: 'card-ngo', logo: ngoLogo, alt: 'NGO & NPO Registration Logo' },
    { id: 'card-darpan', logo: darpanLogo, alt: 'DARPAN Portal Logo' },
    { id: 'card-income-tax-a', logo: incomeTaxLogo, alt: 'Income Tax Registration Logo' },
    { id: 'card-income-tax-b', logo: incomeTaxLogo, alt: 'Income Tax Registration Logo' },
  ];

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Poppins', 'EB Garamond', serif",
    fontSize: '2.5rem',
    color: '#1C3F75',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    display: 'inline-block',
  };

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#F9F9F9',
    padding: '30px 20px',
    borderRadius: '1.5rem',
  };

  const primaryActivitiesGradientStyle: React.CSSProperties = {
    backgroundImage: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%)',
    backgroundSize: '400% 400%',
    padding: '30px 20px',
    borderRadius: '1.5rem',
    position: 'relative',
    overflow: 'hidden',
    animation: 'gradient-motion-glow 25s ease infinite alternate',
    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.1)',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto',
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
              }}
            >
              {/* Shared style for all mission paragraphs */}
              {(() => {
                const missionTextStyle: React.CSSProperties = {
                  fontFamily: "Calibri, sans-serif",
                  fontSize: '1.25rem',
                  lineHeight: 1.6,
                  color: '#000000',
                  fontWeight: 500,
                };

                return (
                  <>
                    <p
                      style={{
                        ...missionTextStyle,
                        textAlign: 'justify',
                      }}
                    >
                      Have you ever felt the sting of hunger born out of extreme poverty - Even sudden urban poverty due to misfortune so deep that you couldn't share your struggles with anyone because of family dignity? Have you faced the stress of losing a job, along with the emotional turmoil it brings to you and your family? Have you experienced loneliness or depression from being left behind in the race for success or from the challenges that come with age? Or the pain of missing someone, something, or the helplessness of being unable to meet the needs of your loved ones?
                    </p>
                    <p
                      style={{
                        ...missionTextStyle,
                        textAlign: 'center',
                        marginTop: '15px',
                        fontWeight: 'bold',
                      }}
                    >
                      We are here to be a comforting presence - A healing hand to support you, uplift you, and help you move forward.
                    </p>
                    <p
                      style={{
                        ...missionTextStyle,
                        textAlign: 'center',
                        marginTop: '15px',
                      }}
                    >
                      If you, the reader, feel blessed by God, live in comfort, and feel protected, we invite you to spare your time to join us as a <strong>Volunteer (OR) contribute by Donating even a small part of your abundance</strong> . Remember, what goes around comes around in multiples!
                    </p>
                    <p
                      style={{
                        ...missionTextStyle,
                        textAlign: 'justify',
                        marginTop: '15px',
                      }}
                    >
                      Our every outreach would be anonymous. None outside would know except professional volunteers! Reach out to us through whatsapp on 1234567890, you may not get instant replies but for sure we will reach out to you !
                    </p>
                    <p
                      style={{
                        ...missionTextStyle,
                        textAlign: 'center',
                        marginTop: '15px',
                      }}
                    >
                      It doesn't matter who we are ! Let our actions speak !!
                    </p>
                  </>
                );
              })()}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '40px',
                  marginTop: '40px',
                  flexWrap: 'wrap',
                }}
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('contact')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px 35px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(139, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                    minWidth: '200px',
                    maxWidth: '300px',
                  }}
                >
                  Volunteer
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('donation')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '15px 35px',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(139, 0, 0, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    boxShadow: 'none',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                    minWidth: '200px',
                    maxWidth: '300px',
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
            style={{ marginTop: '20px', marginBottom: '30px' }}
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
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              left: 0,
              right: 0,
            }}
          >
            {/* Background Image Area with Dark Overlay */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '400px',
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
                marginTop: '-100px',
                zIndex: 10,
                backgroundColor: 'transparent',
                padding: '60px 20px 40px 20px',
                maxWidth: '1400px',
                marginLeft: 'auto',
                marginRight: 'auto',
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
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '25px',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto',
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
                        minHeight: '160px',
                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                        padding: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={card.logo}
                        alt={card.alt}
                        style={{
                          maxHeight: '100px',
                          width: '100%',
                          objectFit: 'contain',
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
                <div style={gridStyle}>
                  {[
                    {
                      id: 'card-budding-minds',
                      title: 'Budding Minds',
                      content: 'Bridging school dropout gaps, skill training, and job placement assistance for underprivileged youth.',
                      icon: '🌱',
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
                      image: sustainabilityImage,
                    },
                    {
                      id: 'card-annathanam',
                      title: 'Annathanam',
                      content: `Annadhanam is not charity - it’s service.
                  You don’t give food to someone; you serve food to God through them.`,
                      icon: '🍲',
                      image: annathanamImage,
                      hasExplore: true,
                    },
                  ].map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="h-full p-[30px] bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] text-center transition-all duration-300 ease-out"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-3xl overflow-hidden" aria-hidden="true">
                        {(card as any).image ? (
                          <img src={(card as any).image} alt={card.title} className="h-full w-full object-cover" />
                        ) : (
                          <span>{card.icon}</span>
                        )}
                      </div>
                      <h4 className="text-xl font-bold text-[#1C3F75] mb-3">
                        {card.title}
                      </h4>
                      <p className="text-lg text-[#333333] leading-relaxed text-justify whitespace-pre-line mb-4 flex-grow">
                        {card.content}
                      </p>

                      {(card as any).hasExplore && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate('/annathanam')}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px 25px',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            background: 'rgba(139, 0, 0, 0.85)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: 'none',
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                            marginTop: 'auto',
                            width: '100%',
                          }}
                        >
                          Explore
                        </motion.button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Meal Donation Image Section - Full Width */}
          <div
            id="meal-donation-section"
            style={{
              position: 'relative',
              display: 'block',
              marginTop: '0px',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              left: 0,
              right: 0,
              lineHeight: 0,
            }}
          >
            <img
              src={mealDonationImage}
              alt="Meal Donation Support"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />
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
      </div >
    </section >
  );
};

export default Mission;
