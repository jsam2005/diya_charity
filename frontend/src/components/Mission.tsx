import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAssetPath } from '@/utils';

const Mission: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const ngoLogo = getAssetPath('assets/logos/ngo-npo-logo.png');
  const darpanLogo = getAssetPath('assets/logos/darpan-logo.png');
  const incomeTaxLogo = getAssetPath('assets/logos/income-tax-logo.png');

  const complianceCards = [
    { id: 'card-ngo', logo: ngoLogo, alt: 'NGO & NPO Registration Logo' },
    { id: 'card-darpan', logo: darpanLogo, alt: 'DARPAN Portal Logo' },
    { id: 'card-income-tax-a', logo: incomeTaxLogo, alt: 'Income Tax Registration Logo' },
    { id: 'card-income-tax-b', logo: incomeTaxLogo, alt: 'Income Tax Registration Logo' },
  ];

  const activityCards = [
    {
      id: 'card-budding-minds',
      title: 'Budding Minds',
      content: 'Bridging school dropout gaps, skill training, and job placement assistance for underprivileged youth.',
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
  ];

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Poppins', 'EB Garamond', serif",
    fontSize: '2.5rem',
    color: '#1C3F75',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '20px',
    borderBottom: '4px solid #00A389',
    paddingBottom: '10px',
    display: 'inline-block',
  };

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#F9F9F9',
    padding: '30px 20px',
    borderRadius: '1.5rem',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '25px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const cardClassName =
    'h-full p-[30px] bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] text-center transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-[#EAF4FF]';

  const iconWrapperClass =
    'mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-3xl';

  const identityCards = [
    {
      id: 'card-mission',
      header: 'Our Mission',
      content:
        'At Diya Charity, we are a newly established NGO dedicated to serving society through comprehensive social welfare programs. Our mission is to illuminate lives and bring hope to underserved communities through education, healthcare, women’s empowerment, and environmental sustainability. Like a Diya (lamp) that dispels darkness, we strive to light up the path towards a better tomorrow for all.',
      accentColor: '#00A389',
      backgroundColor: '#F8FFFD',
    },
    {
      id: 'card-about-us',
      header: 'About Us',
      content:
        'Founded in 2024, Diya Charity emerged from a simple yet powerful vision: to be the light that guides communities out of darkness. As a startup NGO, we believe that every individual deserves access to quality education, healthcare, and opportunities for growth. Our name “Diya” symbolizes the light of hope, knowledge, and compassion that we bring to every life we touch.',
      accentColor: '#1C3F75',
      backgroundColor: '#F8F9FF',
    },
    {
      id: 'card-vision',
      header: 'Our Vision',
      content:
        'To create a world where no one is left behind, where every child has access to education, every family has healthcare, and every woman has the power to shape her own destiny.',
      accentColor: '#FF8C42',
      backgroundColor: '#FFFBF8',
    },
    {
      id: 'card-values',
      header: 'Our Values',
      content:
        'Compassion, Integrity, Transparency, and Service to Humanity are the core values that guide everything we do.',
      accentColor: '#7B42F2',
      backgroundColor: '#FCF8FF',
    },
  ];

  const identitySectionTitleStyle: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '3rem',
    color: '#1C3F75',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '15px',
  };

  const identitySubtextStyle: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1.25rem',
    color: '#556079',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const identityLayoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '30px 20px 30px 20px',
    borderRadius: '1.5rem',
  };

  const identityGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '35px',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const identityCardBaseStyle: React.CSSProperties = {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const identityHeaderStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 600,
    marginBottom: '15px',
    fontFamily: "'Playfair Display', 'EB Garamond', serif",
    color: '#1C3F75',
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
                Our Primary Activities &amp; Impact Areas
              </h2>
            </motion.div>

            <div className="space-y-12">
              <section aria-labelledby="compliance-credentials-heading">
                <h3
                  id="compliance-credentials-heading"
                  className="text-2xl font-semibold text-[#1C3F75] text-center mb-6"
                >
                  Compliance Credentials
                </h3>
                <div style={gridStyle}>
                  {complianceCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="h-full bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] flex items-center justify-center p-6"
                    >
                      <img
                        src={card.logo}
                        alt={card.alt}
                        className="max-h-24 w-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </section>

              <section aria-labelledby="primary-activities-heading">
                <h3
                  id="primary-activities-heading"
                  className="text-2xl font-semibold text-[#1C3F75] text-center mb-6"
                >
                  Impact Areas
                </h3>
                <div style={gridStyle}>
                  {activityCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className={cardClassName}
                    >
                      <div className={iconWrapperClass} aria-hidden="true">
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

          <section
            id="mission-values-section"
            style={identityLayoutContainerStyle}
            className="mb-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 style={identitySectionTitleStyle}>Our Core Identity</h2>
              <p style={identitySubtextStyle}>Mission, Vision, Values &amp; Story</p>
            </motion.div>

            <div style={identityGridStyle}>
              {identityCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{
                    y: -5,
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)',
                  }}
                  style={{
                    ...identityCardBaseStyle,
                    borderLeft: `6px solid ${card.accentColor}`,
                    backgroundColor: card.backgroundColor,
                  }}
                >
                  <h3 style={identityHeaderStyle}>{card.header}</h3>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      color: '#253148',
                      lineHeight: 1.8,
                      fontSize: '1.05rem',
                    }}
                  >
                    {card.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
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
