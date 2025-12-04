import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { ContactFormData } from '@/types';
import { isValidEmail, isValidPhone } from '@/utils';
import { useNotification } from './NotificationProvider';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { showNotification } = useNotification();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form submitted:', data);
      reset();
      showNotification('Thank you for your message! We will get back to you soon.', 'success');
    } catch (error) {
      console.error('Form submission error:', error);
      showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    }
  };

  const validateEmail = (email: string) => {
    return isValidEmail(email) || 'Please enter a valid email address';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    return isValidPhone(phone) || 'Please enter a valid phone number';
  };

  const volunteerPreferenceOptions = [
    'Event Setup',
    'Registration Desk',
    'Hospitality/Guest Services',
    'Workshop Facilitation',
    'Marketing/Promotion',
    'Fundraising',
    'General Support',
    'Teaching',
  ];

  const availabilityOptions = [
    'Morning (8am-12pm)',
    'Afternoon (12pm-5pm)',
    'Evening (5pm-9pm)',
    'Weekdays',
    'Weekends',
    'Flexible Schedule',
  ];

  return (
    <section
      id="contact"
      ref={ref}
    >
      <div className="container-custom-full">
        <div className="flex justify-center">
          {/* Volunteer Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                backgroundColor: '#1142bd',
                padding: '24px',
                borderRadius: '20px',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
              }}
            >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                width: '60%',
                margin: '0 auto',
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2
                className="font-serif font-bold mb-6"
                style={{ fontSize: '28px', color: '#2C3E50' }}
              >
                Volunteer Sign Up Form
              </h2>

              {/* Personal Information */}
              <div className="mb-6">
                <h3
                  className="mb-3 font-semibold"
                  style={{ fontSize: '20px', color: '#2C3E50' }}
                >
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="form-label font-semibold"
                    >
                      First Name *
                    </label>
                    <input
                      {...register('firstName', {
                        required: 'First name is required',
                      })}
                      type="text"
                      id="firstName"
                      className={`form-input ${errors.firstName ? 'border-red-500' : ''
                        }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="form-error">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="gender"
                      className="form-label font-semibold"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      {...register('gender')}
                      className="form-input"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-Binary">Non-Binary</option>
                      <option value="Prefer Not To Say">Prefer Not To Say</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="form-label font-semibold"
                    >
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        validate: validateEmail,
                      })}
                      type="email"
                      id="email"
                      className={`form-input ${errors.email ? 'border-red-500' : ''
                        }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="form-label font-semibold"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 text-primary-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <select className="bg-transparent text-primary-500 focus:outline-none">
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+91">+91</option>
                        </select>
                      </div>
                      <input
                        {...register('phone', { validate: validatePhone })}
                        type="tel"
                        id="phone"
                        className={`form-input pl-20 ${errors.phone ? 'border-red-500' : ''
                          }`}
                        placeholder="e.g., +91 98765 43210"
                      />
                    </div>
                    {errors.phone && (
                      <p className="form-error">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Volunteer Preferences */}
              <div className="mb-6">
                <h3
                  className="mb-3 font-semibold"
                  style={{ fontSize: '20px', color: '#2C3E50' }}
                >
                  Volunteer Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {volunteerPreferenceOptions.map((option) => (
                    <label key={option} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={option}
                        {...register('volunteerPreferences')}
                        className="peer sr-only"
                      />
                      <div
                        className="px-3 py-2 rounded-full border text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 peer-checked:bg-[#EBF5FB] peer-checked:border-[#3498DB] peer-checked:text-[#2C3E50] transition-colors"
                      >
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6">
                <h3
                  className="mb-3 font-semibold"
                  style={{ fontSize: '20px', color: '#2C3E50' }}
                >
                  Availability
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availabilityOptions.map((option) => (
                    <label key={option} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={option}
                        {...register('availability')}
                        className="peer sr-only"
                      />
                      <div className="px-3 py-2 rounded-full border text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 peer-checked:bg-[#EBF5FB] peer-checked:border-[#3498DB] peer-checked:text-[#2C3E50] transition-colors">
                        {option}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Comments */}
              <div className="mb-6">
                <h3
                  className="mb-3 font-semibold"
                  style={{ fontSize: '20px', color: '#2C3E50' }}
                >
                  Additional Comments
                </h3>
                <label
                  htmlFor="message"
                  className="form-label font-semibold"
                >
                  Tell us why you want to volunteer
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="form-input resize-none"
                  style={{ minHeight: '100px' }}
                  placeholder="Enter any additional notes, skills, or specific time constraints..."
                />
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: '#FF8C42',
                    color: '#FFFFFF',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    fontWeight: 600,
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2" />
                      Sending...
                    </span>
                  ) : (
                    'Submit Volunteer Application'
                  )}
                </motion.button>
                <p className="text-sm text-gray-500">
                  By submitting, you agree to our volunteer terms and conditions.
                </p>
              </div>
            </form>
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
