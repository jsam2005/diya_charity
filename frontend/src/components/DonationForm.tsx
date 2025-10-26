import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { useNotification } from './NotificationProvider';

interface DonationFormData {
  amount: string;
  paymentMethod: string;
  donorName: string;
  email: string;
  phone: string;
  message: string;
  anonymous: boolean;
}

const PAYMENT_METHODS = [
  { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
  { value: 'netbanking', label: 'Net Banking', icon: '🏦' },
  { value: 'upi', label: 'UPI Payment', icon: '📱' },
  { value: 'wallet', label: 'Digital Wallet', icon: '💰' }
];

const DonationForm: React.FC = () => {
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
    watch,
  } = useForm<DonationFormData>();

  const onSubmit = async (data: DonationFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Donation submitted:', data);
      reset();
      
      showNotification(
        `Thank you for your generous donation of ₹${data.amount}! Your contribution will help us serve more communities.`,
        'success'
      );
    } catch (error) {
      console.error('Donation submission error:', error);
      showNotification(
        'Sorry, there was an error processing your donation. Please try again.',
        'error'
      );
    }
  };

  return (
    <section
      id="donate"
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
            Make a Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us continue our mission of serving communities and illuminating lives. Every contribution makes a real impact.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-warm-50 p-8 rounded-lg shadow-lg"
            >
              <h3 className="text-2xl font-serif font-bold text-primary-600 mb-6">
                Donate Now
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Donation Amount */}
                <div>
                  <label htmlFor="amount" className="form-label">
                    Enter Donation Amount (₹) *
                  </label>
                  <input
                    {...register('amount', { 
                      required: 'Please enter donation amount',
                      min: { value: 100, message: 'Minimum donation is ₹100' }
                    })}
                    type="number"
                    id="amount"
                    min="100"
                    className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
                    placeholder="Enter amount (minimum ₹100)"
                  />
                  {errors.amount && (
                    <p className="form-error">{errors.amount.message}</p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="form-label">Select Payment Method *</label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {PAYMENT_METHODS.map((method) => (
                      <motion.label
                        key={method.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                          watch('paymentMethod') === method.value
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-300 bg-white hover:border-primary-300'
                        }`}
                      >
                        <input
                          {...register('paymentMethod', { required: 'Please select a payment method' })}
                          type="radio"
                          value={method.value}
                          className="sr-only"
                        />
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <span className="font-medium text-primary-600">
                            {method.label}
                          </span>
                        </div>
                      </motion.label>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="form-error mt-2">{errors.paymentMethod.message}</p>
                  )}
                </div>

                {/* Donor Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="donorName" className="form-label">
                      Full Name *
                    </label>
                    <input
                      {...register('donorName', { required: 'Name is required' })}
                      type="text"
                      id="donorName"
                      className={`form-input ${errors.donorName ? 'border-red-500' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {errors.donorName && (
                      <p className="form-error">{errors.donorName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Please enter a valid email'
                        }
                      })}
                      type="email"
                      id="email"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="form-error">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="form-input"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message (Optional)
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={3}
                    className="form-input resize-none"
                    placeholder="Any message you'd like to share with us"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    {...register('anonymous')}
                    type="checkbox"
                    id="anonymous"
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="anonymous" className="ml-2 text-sm text-gray-600">
                    Make this donation anonymous
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <div className="spinner mr-2" />
                      Processing Donation...
                    </span>
                  ) : (
                    `Donate ₹${watch('amount') || '0'}`
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Donation Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Impact Information */}
              <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
                <h4 className="text-xl font-semibold text-primary-600 mb-4">
                  Your Donation Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">₹500 feeds a child for a month</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">₹1,000 provides education for a week</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">₹2,500 covers healthcare for a family</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">₹5,000 enables women empowerment training</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">₹10,000 funds complete education for a year</span>
                  </div>
                </div>
              </div>

              {/* How Your Donation Helps */}
              <div className="bg-white p-6 rounded-lg shadow-lg border">
                <h4 className="text-xl font-semibold text-primary-600 mb-4">
                  How Your Donation Helps
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">1</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary-600">Education</h5>
                      <p className="text-sm text-gray-600">Support quality education for underprivileged children</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">2</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary-600">Healthcare</h5>
                      <p className="text-sm text-gray-600">Provide medical care to families in need</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">3</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary-600">Women Empowerment</h5>
                      <p className="text-sm text-gray-600">Build skills and create opportunities for women</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-600 font-bold">4</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-primary-600">Environment</h5>
                      <p className="text-sm text-gray-600">Protect our planet for future generations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust & Security */}
              <div className="bg-warm-50 p-6 rounded-lg border border-warm-200">
                <h4 className="text-xl font-semibold text-primary-600 mb-4">
                  Trust & Security
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="text-green-500 mr-3">✓</div>
                    <span className="text-gray-700">100% Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-500 mr-3">✓</div>
                    <span className="text-gray-700">Tax Exemption Certificate (80G)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-500 mr-3">✓</div>
                    <span className="text-gray-700">Transparent Fund Utilization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="text-green-500 mr-3">✓</div>
                    <span className="text-gray-700">Regular Impact Reports</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
