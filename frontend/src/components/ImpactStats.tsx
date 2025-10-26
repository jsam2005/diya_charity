import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { scrollToElement } from '@/utils';

interface StatItem {
  number: string;
  label: string;
  description: string;
}

const STATS: StatItem[] = [
  {
    number: '500+',
    label: 'Children Educated',
    description: 'Providing quality education to underprivileged children'
  },
  {
    number: '50+',
    label: 'Healthcare Camps',
    description: 'Organizing medical camps in rural areas'
  },
  {
    number: '200+',
    label: 'Women Empowered',
    description: 'Training women in vocational skills'
  },
  {
    number: '25+',
    label: 'Villages Reached',
    description: 'Extending our services to remote communities'
  }
];

const ImpactStats: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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
      ref={ref}
      className="section-padding bg-white"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-600 mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Since our inception, we have been making a meaningful difference in the lives of countless individuals and communities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="bg-warm-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary-500">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-primary-600 mb-4"
                >
                  {stat.number}
                </motion.div>
                <h3 className="text-xl font-semibold text-primary-600 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-primary-50 p-8 rounded-lg border border-primary-200">
            <h3 className="text-2xl font-semibold text-primary-600 mb-4">
              Join Us in Making a Difference
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Every contribution, no matter how small, helps us reach more people and create lasting change in communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToElement('donate')}
                className="btn-primary"
              >
                Donate Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToElement('contact')}
                className="btn-outline border-primary-500 text-primary-600 hover:bg-primary-500 hover:text-white"
              >
                Volunteer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStats;
