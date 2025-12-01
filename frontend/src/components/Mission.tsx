import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MISSION_CONTENT } from '@/data/constants';
import { scrollToElement } from '@/utils';

const Mission: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleExplore = () => {
    scrollToElement('process');
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
          backgroundImage: 'url(/BG_img_2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '400px',
          borderRadius: '1rem',
          padding: '1.5rem',
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
          {/* Certifications Section */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
            style={{ opacity: 1 }}
          >
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center mb-12"
              style={{ opacity: 1 }}
            >
              <div style={{ display: 'inline-block', padding: '1rem 2rem', borderRadius: '0.5rem', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)' }}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold uppercase mb-4 tracking-wide" style={{ color: 'white', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8), -2px -2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)' }}>
                  OUR COMPLIANCE
                </h2>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
              </div>
            </motion.div>

            {/* Compliance Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" style={{ maxWidth: '100%' }}>
              {/* NGO & NPO Registration Box */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="compliance-box flex items-center justify-center p-4"
                style={{ opacity: 1 }}
              >
                <img 
                  src="/assets/logos/ngo-npo-logo.png" 
                  alt="NGO & NPO Registration Logo" 
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
              
              {/* DARPAN Portal Registration Box */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="compliance-box flex items-center justify-center p-4"
                style={{ opacity: 1 }}
              >
                <img 
                  src="/assets/logos/darpan-logo.png" 
                  alt="DARPAN Portal Logo" 
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
              
              {/* Income Tax Registration Box */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="compliance-box flex items-center justify-center p-4"
                style={{ opacity: 1 }}
              >
                <img 
                  src="/assets/logos/income-tax-logo.png" 
                  alt="Income Tax Registration Logo" 
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>

              {/* Income Tax Registration Box - Repeat */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="compliance-box flex items-center justify-center p-4"
                style={{ opacity: 1 }}
              >
                <img 
                  src="/assets/logos/income-tax-logo.png" 
                  alt="Income Tax Registration Logo" 
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Primary Activities Section */}
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-20"
            style={{ opacity: 1 }}
          >
            {/* Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mb-12"
            >
              <div style={{ display: 'inline-block', padding: '1rem 2rem', borderRadius: '0.5rem', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)' }}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold uppercase mb-4 tracking-wide" style={{ color: 'white', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8), -2px -2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)' }}>
                  OUR PRIMARY ACTIVITY
                </h2>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
              </div>
            </motion.div>

            {/* Primary Activity Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6" style={{ maxWidth: '100%' }}>
              {/* Budding Minds */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="activity-box activity-box-mobile flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
              >
                <div className="activity-icon-container mb-4">
                  <div className="activity-icon">
                    <span className="text-6xl" style={{ fontSize: '3.5rem' }}>🧠</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-xl font-serif font-bold text-white text-center mb-3 leading-tight activity-title-mobile">
                  Budding Minds
                </h3>
                <p className="text-base md:text-sm text-white text-center leading-relaxed opacity-90 activity-text-mobile">
                  Bridging school dropout gaps, skill training, and job placement for children & teens (ages 5-17)
                </p>
              </motion.div>
              
              {/* Youth Leap */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="activity-box activity-box-mobile flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
              >
                <div className="activity-icon-container mb-4">
                  <div className="activity-icon">
                    <span className="text-6xl" style={{ fontSize: '3.5rem' }}>🚀</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-xl font-serif font-bold text-white text-center mb-3 leading-tight activity-title-mobile">
                  Youth Leap
                </h3>
                <p className="text-base md:text-sm text-white text-center leading-relaxed opacity-90 activity-text-mobile">
                  Skill training, psychological counseling, and job placement for youth (ages 18-30)
                </p>
              </motion.div>
              
              {/* Vulnerable Women & Families */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="activity-box activity-box-mobile flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
              >
                <div className="activity-icon-container mb-4">
                  <div className="activity-icon">
                    <span className="text-6xl" style={{ fontSize: '3.5rem' }}>💪</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-xl font-serif font-bold text-white text-center mb-3 leading-tight activity-title-mobile">
                  Vulnerable Women & Families
                </h3>
                <p className="text-base md:text-sm text-white text-center leading-relaxed opacity-90 activity-text-mobile">
                  Skill training, job placement, and women empowerment for widowed, divorced, and single mothers
                </p>
              </motion.div>

              {/* Old Age Care */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="activity-box activity-box-mobile flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
              >
                <div className="activity-icon-container mb-4">
                  <div className="activity-icon">
                    <span className="text-6xl" style={{ fontSize: '3.5rem' }}>❤️</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-xl font-serif font-bold text-white text-center mb-3 leading-tight activity-title-mobile">
                  Old Age Care
                </h3>
                <p className="text-base md:text-sm text-white text-center leading-relaxed opacity-90 activity-text-mobile">
                  Palliative care, counseling, and companionship for the elderly (60+ years)
                </p>
              </motion.div>

              {/* Support & Sustainability */}
              <motion.div
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="activity-box activity-box-mobile flex flex-col items-center justify-center"
                style={{ opacity: 1 }}
              >
                <div className="activity-icon-container mb-4">
                  <div className="activity-icon">
                    <span className="text-6xl" style={{ fontSize: '3.5rem' }}>🌱</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-xl font-serif font-bold text-white text-center mb-3 leading-tight activity-title-mobile">
                  Support & Sustainability
                </h3>
                <p className="text-base md:text-sm text-white text-center leading-relaxed opacity-90 activity-text-mobile">
                  Awareness campaigns and sustainability efforts for long-term impact and sustainable models
                </p>
              </motion.div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="text-center mb-8"
          >
            <div style={{ display: 'inline-block', padding: '1rem 2rem', borderRadius: '0.5rem', border: '2px solid rgba(255, 255, 255, 0.8)', backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(5px)' }}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8" style={{ color: 'white', textShadow: '2px 2px 10px rgba(0, 0, 0, 0.8), -2px -2px 10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)' }}>
                {MISSION_CONTENT.title}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Mission Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-primary-600 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                {MISSION_CONTENT.description}
              </p>
            </motion.div>

            {/* About Us */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-primary-600 mb-4">About Us</h3>
              <p className="text-gray-600 leading-relaxed">
                {MISSION_CONTENT.aboutUs}
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glass-card p-6 border-l-4 border-primary-500"
            >
              <h3 className="text-xl font-semibold text-primary-600 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                {MISSION_CONTENT.vision}
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="glass-card p-6 border-l-4 border-warm-500"
            >
              <h3 className="text-xl font-semibold text-primary-600 mb-4">Our Values</h3>
              <p className="text-gray-700 leading-relaxed">
                {MISSION_CONTENT.values}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExplore}
              className="btn-primary btn-lg"
            >
              Explore Our Programs
            </motion.button>
          </motion.div>
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
