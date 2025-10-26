import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TESTIMONIALS } from '@/data/constants';

const CommunityFeedback: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="feedback"
      ref={ref}
      className="section-padding bg-warm-50"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-600 mb-4">
            Community Feedback
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto space-y-12"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 md:p-12 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.2 }}
                  className="text-lg md:text-xl text-primary-600 italic leading-relaxed mb-6"
                >
                  "{testimonial.quote}"
                </motion.p>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 + 0.4 }}
                  className="text-lg font-semibold text-primary-700"
                >
                  — {testimonial.author}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Quote Marks */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-20 left-20 text-8xl text-primary-300 font-serif"
          >
            "
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-20 right-20 text-8xl text-primary-300 font-serif transform rotate-180"
          >
            "
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommunityFeedback;
