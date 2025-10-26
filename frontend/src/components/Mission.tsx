import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MISSION_CONTENT } from '@/data/constants';
import { scrollToElement } from '@/utils';

const Mission: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const handleExplore = () => {
    scrollToElement('process');
  };

  return (
    <section
      id="about"
      ref={ref}
      className="section-padding bg-warm-50"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-600 mb-8 text-center"
          >
            {MISSION_CONTENT.title}
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Mission Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-lg"
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
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg"
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
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-primary-50 p-6 rounded-lg border-l-4 border-primary-500"
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
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-warm-50 p-6 rounded-lg border-l-4 border-warm-500"
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
            transition={{ duration: 0.6, delay: 0.8 }}
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
