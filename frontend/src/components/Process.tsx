import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PROCESS_ITEMS } from '@/data/constants';
import { scrollToElement } from '@/utils';
// import { useDeviceFeatures } from '@/hooks/useResponsive';
import { ResponsiveGrid } from './ResponsiveLayout';

const Process: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // const { isMobile, isTablet } = useDeviceFeatures();

  const handleJoinUs = () => {
    scrollToElement('contact');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="process"
      ref={ref}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="mb-8 lg:mb-0"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-600 mb-6">
              Our Process
            </h2>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleJoinUs}
              className="btn-primary btn-lg"
            >
              Join Us
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:ml-16"
          >
            <ResponsiveGrid
              cols={{ mobile: 1, tablet: 2, desktop: 2 }}
              gap="gap-8"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="contents"
              >
              {PROCESS_ITEMS.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="p-6 border-b-2 border-primary-500 hover:bg-warm-50 transition-colors duration-300">
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className="text-xl md:text-2xl font-serif font-bold text-primary-600 mb-3 group-hover:text-primary-700 transition-colors duration-300"
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
              </motion.div>
            </ResponsiveGrid>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-1/4 right-1/4 w-64 h-64 border border-primary-200 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.05, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-1/4 left-1/4 w-48 h-48 border border-primary-200 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Process;
