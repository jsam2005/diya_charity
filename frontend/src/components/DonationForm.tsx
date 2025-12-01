import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';

interface DonationFormData {
  donationType: 'one-time' | 'monthly';
  amount: string;
  donorName: string;
  email: string;
  phone: string;
}

// Replace with your actual GPay UPI ID
const GPAY_UPI_ID = 'your-gpay-upi-id@paytm'; // Example: diyacharity@paytm or your actual UPI ID

const DonationForm: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [step, setStep] = useState<1 | 2>(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<DonationFormData>({
    defaultValues: {
      donationType: 'one-time',
      amount: '',
      donorName: '',
      email: '',
      phone: '',
    },
  });

  const donationType = watch('donationType');
  const amount = watch('amount');

  const quickAmounts = ['500', '1000', '2500', '5000', '10000'];

  const handleContinue = () => {
    const data = getValues();
    
    // Validate step 1
    if (step === 1) {
      if (!data.donationType || !data.amount || parseFloat(data.amount) < 100) {
        return;
      }
      setStep(2);
    }
  };

  const handleProceedToPayment = (data: DonationFormData) => {
    // Create UPI payment link
    const upiLink = `upi://pay?pa=${GPAY_UPI_ID}&pn=Diya%20Charitable%20Trust&am=${data.amount}&cu=INR&tn=Donation%20${data.donationType === 'monthly' ? '(Monthly)' : '(One-time)'}`;
    
    // Try to open GPay/UPI app
    window.location.href = upiLink;
    
    // Fallback: Show UPI ID for manual payment
    setTimeout(() => {
      alert(`If GPay doesn't open automatically, please send ₹${data.amount} to:\n\nUPI ID: ${GPAY_UPI_ID}\n\nOr scan the QR code if available.`);
    }, 1000);
  };

  return (
    <section
      id="donation"
      ref={ref}
      className="section-padding bg-white"
    >
      <div className="container-custom-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-primary-600 mb-4">
            Support Our Cause
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your generous contribution helps us continue our mission of serving communities and illuminating lives.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl border border-gray-200 p-6 md:p-8"
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= 1 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">Donation Details</span>
                </div>
                <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= 2 ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
                  }`}>
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium hidden sm:inline">Your Information</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleProceedToPayment)}>
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                      Choose Your Donation
                    </h3>

                    {/* Donation Type Selection */}
                    <div>
                      <label className="form-label mb-3 block">Donation Type *</label>
                      <div className="grid grid-cols-2 gap-4">
                        <motion.label
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            donationType === 'one-time'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-300 bg-white hover:border-primary-300'
                          }`}
                        >
                          <input
                            {...register('donationType', { required: true })}
                            type="radio"
                            value="one-time"
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-3xl mb-2">💝</div>
                            <div className="font-semibold text-lg text-gray-800">One-Time Donate</div>
                            <div className="text-sm text-gray-600 mt-1">Single contribution</div>
                          </div>
                        </motion.label>

                        <motion.label
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                            donationType === 'monthly'
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-300 bg-white hover:border-primary-300'
                          }`}
                        >
                          <input
                            {...register('donationType', { required: true })}
                            type="radio"
                            value="monthly"
                            className="sr-only"
                          />
                          <div className="text-center">
                            <div className="text-3xl mb-2">🔄</div>
                            <div className="font-semibold text-lg text-gray-800">Monthly Donate</div>
                            <div className="text-sm text-gray-600 mt-1">Recurring monthly</div>
                          </div>
                        </motion.label>
                      </div>
                    </div>

                    {/* Amount Selection */}
                    <div>
                      <label htmlFor="amount" className="form-label">
                        Donation Amount (₹) *
                      </label>
                      
                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {quickAmounts.map((quickAmount) => (
                          <motion.button
                            key={quickAmount}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const event = { target: { value: quickAmount } };
                              register('amount').onChange(event as any);
                            }}
                            className={`p-3 rounded-lg border-2 font-semibold transition-all duration-300 ${
                              amount === quickAmount
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                            }`}
                          >
                            ₹{quickAmount}
                          </motion.button>
                        ))}
                      </div>

                      {/* Custom Amount Input */}
                      <input
                        {...register('amount', {
                          required: 'Please enter donation amount',
                          min: { value: 100, message: 'Minimum donation is ₹100' },
                          validate: (value) => {
                            const numValue = parseFloat(value);
                            return !isNaN(numValue) && numValue >= 100 || 'Please enter a valid amount (minimum ₹100)';
                          },
                        })}
                        type="number"
                        id="amount"
                        min="100"
                        step="100"
                        className={`form-input ${errors.amount ? 'border-red-500' : ''}`}
                        placeholder="Or enter custom amount (minimum ₹100)"
                      />
                      {errors.amount && (
                        <p className="form-error mt-1">{errors.amount.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleContinue}
                      disabled={!donationType || !amount || parseFloat(amount) < 100}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary btn-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-serif font-bold text-gray-800">
                        Your Information
                      </h3>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        ← Back
                      </button>
                    </div>

                    {/* Donation Summary */}
                    <div className="bg-primary-50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-sm text-gray-600">Donation Type</div>
                          <div className="font-semibold text-gray-800">
                            {donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation'}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Amount</div>
                          <div className="font-bold text-primary-600 text-xl">₹{amount}</div>
                        </div>
                      </div>
                    </div>

                    {/* Form Fields */}
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
                        <p className="form-error mt-1">{errors.donorName.message}</p>
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
                            message: 'Please enter a valid email address',
                          },
                        })}
                        type="email"
                        id="email"
                        className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="form-error mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="form-label">
                        Phone Number *
                      </label>
                      <input
                        {...register('phone', {
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: 'Please enter a valid 10-digit phone number',
                          },
                        })}
                        type="tel"
                        id="phone"
                        className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="Enter your 10-digit phone number"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <p className="form-error mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary btn-lg w-full flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Continue to GPay
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Trust & Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 bg-primary-50 p-6 rounded-lg border border-primary-200"
          >
            <h4 className="text-lg font-semibold text-primary-600 mb-4 text-center">
              Secure & Trusted
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm text-gray-700">Secure Payment</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm text-gray-700">80G Tax Benefit</div>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <div className="text-sm text-gray-700">Transparent</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-gray-700">Impact Reports</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
