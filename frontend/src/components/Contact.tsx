import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { ContactFormData } from '@/types';
import { isValidEmail, isValidPhone } from '@/utils';
import { submitVolunteerForm } from '@/utils/api';
import { useNotification } from './NotificationProvider';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { isMobile, isTablet } = useDeviceFeatures();
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { showNotification } = useNotification();
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormData>({
    defaultValues: {
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Log submission attempt (for debugging)
      if (import.meta.env.DEV) {
        console.log('Submitting volunteer form:', data);
      }

      // Submit to backend API
      const response = await submitVolunteerForm(data);
      
      if (response.success) {
        reset();
        showNotification('Thank you for your volunteer application! We will get back to you soon.', 'success');
      } else {
        throw new Error(response.error || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      // More detailed error handling
      let errorMessage = 'Sorry, there was an error sending your message. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Check for specific error types
        if (error.message.includes('Cannot connect') || error.message.includes('fetch')) {
          errorMessage = 'Cannot connect to server. Please ensure the backend is running and accessible.';
        } else if (error.message.includes('Network error')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        }
      }
      
      showNotification(errorMessage, 'error');
    }
  };

  const validateEmail = (email: string) => {
    return isValidEmail(email) || t('emailAddress') + ' is invalid';
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    return isValidPhone(phone) || t('phoneNumber') + ' is invalid';
  };

  const volunteerPreferenceOptions = [
    t('eventSetup'),
    t('registrationDesk'),
    t('hospitalityGuestServices'),
    t('workshopFacilitation'),
    t('marketingPromotion'),
    t('fundraising'),
    t('generalSupport'),
    t('teaching'),
  ];

  const availabilityOptions = [
    t('morning'),
    t('afternoon'),
    t('evening'),
    t('weekdays'),
    t('weekends'),
    t('flexibleSchedule'),
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <div className="container-custom-full" style={{ width: '100%', boxSizing: 'border-box' }}>
        <div className="flex justify-center" style={{ width: '100%', boxSizing: 'border-box' }}>
          {/* Volunteer Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            style={{ width: '100%', boxSizing: 'border-box' }}
          >
            <div
              style={{
                backgroundImage: 'linear-gradient(135deg, #1C3F75 0%, #2E5A8F 30%, #00A389 70%, #1C7A6B 100%)',
                backgroundSize: '400% 400%',
                padding: '24px',
                borderRadius: '20px 20px 0 0',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                boxSizing: 'border-box',
                overflow: 'hidden',
                animation: 'gradient-motion-glow 25s ease infinite alternate',
              }}
            >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: isMobile ? '30px 20px' : '40px',
                borderRadius: '16px 16px 0 0',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                width: isMobile ? '90%' : isTablet ? '70%' : '60%',
                margin: '0 auto',
                maxWidth: '100%',
                boxSizing: 'border-box',
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2
                className="font-serif font-bold mb-3"
                style={{ fontSize: '28px', color: '#2C3E50' }}
              >
                {t('volunteerSignUp')}
              </h2>
              <p
                className="text-base text-gray-600 mb-6"
              >
                {t('contactDescription')}
              </p>

              {/* Personal Information */}
              <div className="mb-6">
                <h3
                  className="mb-3 font-semibold"
                  style={{ fontSize: '20px', color: '#2C3E50' }}
                >
                  {t('personalInformation')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="form-label font-semibold"
                    >
                      {t('firstName')}
                    </label>
                    <input
                      {...register('firstName', {
                        required: t('firstName') + ' is required',
                      })}
                      type="text"
                      id="firstName"
                      className={`form-input ${errors.firstName ? 'border-red-500' : ''
                        }`}
                      placeholder={t('enterFirstName')}
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
                      {t('gender')}
                    </label>
                    <select
                      id="gender"
                      {...register('gender')}
                      className="form-input"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t('selectGender')}
                      </option>
                      <option value="Male">{t('male')}</option>
                      <option value="Female">{t('female')}</option>
                      <option value="Non-Binary">{t('nonBinary')}</option>
                      <option value="Prefer Not To Say">{t('preferNotToSay')}</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="form-label font-semibold"
                    >
                      {t('emailAddress')}
                    </label>
                    <input
                      {...register('email', {
                        required: t('emailAddress') + ' is required',
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
                      {t('phoneNumber')}
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
                  {t('volunteerPreferences')}
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
                  {t('availability')}
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
                  {t('additionalComments')}
                </h3>
                <label
                  htmlFor="message"
                  className="form-label font-semibold"
                >
                  {t('tellUsWhy')}
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={5}
                  className="form-input resize-none"
                  style={{ minHeight: '100px' }}
                  placeholder={t('enterAdditionalNotes')}
                />
              </div>

              {/* Terms & Conditions */}
              <div className="mb-6">
                <div
                  className="border border-gray-300 rounded-lg p-4"
                  style={{ backgroundColor: '#F9FAFB' }}
                >
                  <button
                    type="button"
                    onClick={() => setIsTermsOpen(!isTermsOpen)}
                    className="w-full text-left flex items-center justify-between"
                    style={{ color: '#1C3F75', fontWeight: 600 }}
                  >
                    <span>{t('volunteerTermsTitle')}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${isTermsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isTermsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-3 text-sm text-gray-700"
                      style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}
                    >
                      <p><strong>{t('volunteerTermsSubtitle')}</strong></p>
                      <p>{t('volunteerTermsContent')}</p>
                      <p><strong>{t('volunteerTermsOpportunities')}</strong></p>
                      <p>{t('volunteerTermsOpportunitiesDesc')}</p>
                      <p>{t('volunteerTermsMedia')}</p>
                      <p>{t('volunteerTermsBelongings')}</p>
                      <p>{t('volunteerTermsLiability')}</p>
                      <p>{t('volunteerTermsConfidential')}</p>
                      <p>{t('volunteerTermsConduct')}</p>
                      <p>{t('volunteerTermsSubstances')}</p>
                      <p>{t('volunteerTermsStandards')}</p>
                      <p>{t('volunteerTermsDocumentation')}</p>
                      <p>{t('volunteerTermsForceMajeure')}</p>
                      <p>{t('volunteerTermsCancellation')}</p>
                      <p>{t('volunteerTermsCancellationLiability')}</p>
                      <p>{t('volunteerTermsConsent')}</p>
                      <p>{t('volunteerTermsFinal')}</p>
                    </motion.div>
                  )}
                </div>

                {/* Accept Terms Checkbox */}
                <div className="mt-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('acceptTerms', {
                        required: t('acceptTermsRequired'),
                      })}
                      className="mt-1 w-5 h-5 text-[#FF8C42] border-gray-300 rounded focus:ring-[#FF8C42]"
                    />
                    <span className="text-sm text-gray-700">
                      {t('acceptTerms')}
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="form-error mt-1">{errors.acceptTerms.message}</p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="space-y-3">
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !acceptTerms}
                  whileHover={{ scale: acceptTerms ? 1.02 : 1, y: acceptTerms ? -2 : 0 }}
                  whileTap={{ scale: acceptTerms ? 0.98 : 1 }}
                  className="w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: acceptTerms ? '#FF8C42' : '#CCCCCC',
                    color: '#FFFFFF',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: acceptTerms ? 'pointer' : 'not-allowed',
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2" />
                      {t('sending')}
                    </span>
                  ) : (
                    t('submitVolunteerApplication')
                  )}
                </motion.button>
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
