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

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-white overflow-hidden"
    >
      <div
        className="container-custom-full relative z-10"
        style={{
          backgroundColor: '#ffffff',
          minHeight: '400px',
          borderRadius: '1rem',
          maxWidth: '95%',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 p-4 md:p-6"
        >
          <div
            id="primary-activity-section"
            className="mb-4 bg-[#F9F9F9] p-5 md:p-8 rounded-[1rem] md:rounded-[1.5rem]"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="font-['Poppins','EB_Garamond',serif] text-[1.75rem] md:text-[2.5rem] text-[#1C3F75] mt-2 md:mt-5 mb-2 md:mb-5 inline-block font-bold">
                OUR MISSION
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[1950px] mx-auto p-5 text-justify"
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
                  <div className="space-y-4">
                    <p style={{ ...missionTextStyle }}>
                      Have you ever felt the sting of hunger born out of extreme poverty - Even sudden urban poverty due to misfortune so deep that you couldn't share your struggles with anyone because of family dignity? Have you faced the stress of losing a job, along with the emotional turmoil it brings to you and your family? Have you experienced loneliness or depression from being left behind in the race for success or from the challenges that come with age? Or the pain of missing someone, something, or the helplessness of being unable to meet the needs of your loved ones?
                    </p>
                    <p style={{ ...missionTextStyle, textAlign: 'center', fontWeight: 'bold' }}>
                      We are here to be a comforting presence - A healing hand to support you, uplift you, and help you move forward.
                    </p>
                    <p style={{ ...missionTextStyle, textAlign: 'center' }}>
                      If you, the reader, feel blessed by God, live in comfort, and feel protected, we invite you to spare your time to join us as a <strong>Volunteer (OR) contribute by Donating even a small part of your abundance</strong> . Remember, what goes around comes around in multiples!
                    </p>
                    <p style={{ ...missionTextStyle }}>
                      Our every outreach would be anonymous. None outside would know except professional volunteers! Reach out to us through whatsapp on 1234567890, you may not get instant replies but for sure we will reach out to you !
                    </p>
                    <p style={{ ...missionTextStyle, textAlign: 'center' }}>
                      It doesn't matter who we are ! Let our actions speak !!
                    </p>
                  </div>
                );
              })()}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10"
              >
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('contact')}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 bg-[rgba(139,0,0,0.85)] border border-white/5 backdrop-blur-md font-['Montserrat',sans-serif] text-[18px] font-bold text-white min-w-[200px] max-w-[300px]"
                >
                  Volunteer
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToElement('donation')}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full transition-all duration-300 bg-[rgba(139,0,0,0.85)] border border-white/5 backdrop-blur-md font-['Montserrat',sans-serif] text-[18px] font-bold text-white min-w-[200px] max-w-[300px]"
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
            className="text-center mt-5 mb-8"
          >
            <h2 className="font-['Poppins','EB_Garamond',serif] text-[1.75rem] md:text-[2.5rem] text-[#1C3F75] mt-2 md:mt-5 mb-2 md:mb-5 inline-block font-bold">
              OUR COMPLIANCE
            </h2>
          </motion.div>

          {/* Our Compliance Container - Full Width */}
          <div
            id="compliance-section"
            className="relative block mt-5 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
          >
            {/* Background Image Area with Dark Overlay */}
            <div
              className="relative w-full h-[200px] md:h-[400px] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${complianceImage})` }}
            >
              {/* Dark Grayscale Overlay */}
              <div className="absolute inset-0 bg-black/30 bg-gradient-to-b from-black/30 to-black/60" />
            </div>

            {/* Content Container Overlay - Overlaps bottom half of image */}
            <div className="relative -mt-12 md:-mt-24 z-10 bg-transparent py-10 md:py-16 px-4 md:px-5 max-w-[1400px] mx-auto">
              {/* Compliance Credentials Logos - Centered Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex justify-center items-center w-full px-4 md:px-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-[25px] w-full max-w-[1200px] mx-auto">
                  {complianceCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                      }
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      className="bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] p-10 md:p-[30px] flex items-center justify-center min-h-[160px] md:min-h-[160px]"
                    >
                      <img
                        src={card.logo}
                        alt={card.alt}
                        className="max-h-[120px] md:max-h-[100px] w-full object-contain"
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
            className="mb-4 relative overflow-hidden rounded-[1rem] md:rounded-[1.5rem] py-8 md:py-12 px-4 md:px-5 shadow-[0_0_10px_rgba(59,130,246,0.5),0_0_40px_rgba(59,130,246,0.3),0_0_80px_rgba(59,130,246,0.1)] bg-[linear-gradient(135deg,#1e3a8a_0%,#3b82f6_25%,#60a5fa_50%,#93c5fd_75%,#dbeafe_100%)] bg-[length:400%_400%] animate-[gradient-motion-glow_25s_ease_infinite_alternate]"
          >
            {/* Glitter Noise Overlay - Multiple Layers for Depth */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none z-[1] animate-[subtleShift_15s_ease_infinite_alternate] bg-repeat"
              style={{
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
              }}
            />
            {/* Secondary Glitter Layer */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none z-[1] animate-[subtleShift_25s_ease_infinite_alternate-reverse] bg-repeat"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '50px 50px',
              }}
            />
            <div className="relative z-[2]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="font-['Poppins','EB_Garamond',serif] text-[1.75rem] md:text-[2.5rem] text-white mt-2 md:mt-5 mb-2 md:mb-5 inline-block font-bold drop-shadow-md">
                  Our Primary Activities & Impact Areas
                </h2>
              </motion.div>

              <section aria-labelledby="primary-activities-heading">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[25px] max-w-[1200px] mx-auto px-4 md:px-0">
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
                      className="h-full p-6 md:p-[30px] bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.08)] text-center transition-all duration-300 ease-out flex flex-col"
                    >
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF4FF] text-3xl overflow-hidden shrink-0" aria-hidden="true">
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
                          className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-full transition-all duration-300 bg-[rgba(139,0,0,0.85)] border border-white/5 backdrop-blur-md font-['Montserrat',sans-serif] text-[14px] font-bold text-white w-full"
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
            className="relative block mt-0 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] leading-[0]"
          >
            <img
              src={mealDonationImage}
              alt="Meal Donation Support"
              className="w-full h-auto block object-cover"
            />
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute top-20 left-10 w-32 h-32 border border-blue-300 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-20 right-10 w-24 h-24 border border-blue-300 rounded-full"
          />
        </div>
      </div >
    </section >
  );
};

export default Mission;
