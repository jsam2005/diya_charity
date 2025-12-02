import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';

interface DonationFormData {
  donationType: 'one-time' | 'monthly';
  name: string;
  phone: string;
  address: string;
  pan: string;
  amount: string;
  occupation: string;
}

// GPay UPI ID
const GPAY_UPI_ID = 'ssamuvelraj28032005@okaxis';

// Bank Details - Replace with your actual bank details
const BANK_DETAILS = {
  accountName: 'Diya Charitable Trust',
  accountNumber: '1234567890123456',
  ifscCode: 'BANK0001234',
  bankName: 'Your Bank Name',
  branch: 'Your Branch Name'
};

const DonationForm: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'bank' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DonationFormData>({
    defaultValues: {
      donationType: 'one-time',
      name: '',
      phone: '',
      address: '',
      pan: '',
      amount: '',
      occupation: '',
    },
  });

  const donationType = watch('donationType');
  const amount = watch('amount');

  const quickAmounts = ['500', '1000', '2500', '5000', '10000'];

  const handleQuickAmountSelect = (quickAmount: string) => {
    setValue('amount', quickAmount, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handlePanInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const sanitized = target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    target.value = sanitized;
  };

  const onSubmit = (data: DonationFormData) => {
    console.log('Donation Form Data:', data);
    setShowPayment(true);
  };

  const handleUPIPayment = () => {
    const upiLink = `upi://pay?pa=${GPAY_UPI_ID}&pn=Diya%20Charitable%20Trust&am=${amount}&cu=INR&tn=Donation%20${donationType === 'monthly' ? '(Monthly)' : '(One-time)'}`;
    
    // Try to open GPay/UPI app
    window.location.href = upiLink;
    
    // Fallback: Show UPI ID for manual payment
    setTimeout(() => {
      alert(`If GPay doesn't open automatically, please send ₹${amount} to:\n\nUPI ID: ${GPAY_UPI_ID}\n\nOr scan the QR code if available.`);
    }, 1000);
  };

  const handleCopyBankDetails = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${label} copied to clipboard!`);
    });
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

        <div className="max-w-3xl mx-auto">
          {!showPayment ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Donation Type Selection */}
                <div>
                  <label className="form-label mb-3 block text-lg font-semibold">Donation Type *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        donationType === 'one-time'
                          ? 'border-primary-500 bg-primary-50 shadow-md'
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
                        <div className="text-4xl mb-2">💝</div>
                        <div className="font-bold text-xl text-gray-800">One-Time</div>
                        <div className="text-sm text-gray-600 mt-1">Single contribution</div>
                      </div>
                    </motion.label>

                    <motion.label
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        donationType === 'monthly'
                          ? 'border-primary-500 bg-primary-50 shadow-md'
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
                        <div className="text-4xl mb-2">🔄</div>
                        <div className="font-bold text-xl text-gray-800">Monthly</div>
                        <div className="text-sm text-gray-600 mt-1">Recurring monthly</div>
                      </div>
                    </motion.label>
                  </div>
                </div>

                {/* Amount Selection */}
                <div>
                  <label htmlFor="amount" className="form-label text-lg font-semibold">
                    Donation Amount (₹) *
                  </label>
                  
                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-5 gap-3 mb-4">
                    {quickAmounts.map((quickAmount) => (
                      <motion.button
                        key={quickAmount}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickAmountSelect(quickAmount)}
                        aria-pressed={amount === quickAmount}
                        className={`p-3 rounded-lg border-2 font-bold text-base transition-all duration-300 ${
                          amount === quickAmount
                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-md'
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
                    inputMode="numeric"
                    className={`form-input text-lg ${errors.amount ? 'border-red-500' : ''}`}
                    placeholder="Or enter custom amount (minimum ₹100)"
                  />
                  {errors.amount && (
                    <p className="form-error mt-1">{errors.amount.message}</p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label text-lg font-semibold">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id="name"
                    className={`form-input text-lg ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="form-error mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="form-label text-lg font-semibold">
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
                    className={`form-input text-lg ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter your 10-digit phone number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="form-error mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className="form-label text-lg font-semibold">
                    Address *
                  </label>
                  <textarea
                    {...register('address', { required: 'Address is required' })}
                    id="address"
                    rows={3}
                    className={`form-input text-lg ${errors.address ? 'border-red-500' : ''}`}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && (
                    <p className="form-error mt-1">{errors.address.message}</p>
                  )}
                </div>

                {/* PAN */}
                <div>
                  <label htmlFor="pan" className="form-label text-lg font-semibold">
                    PAN Number *
                  </label>
                  <input
                    {...register('pan', {
                      required: 'PAN number is required',
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: 'Please enter a valid PAN (e.g., ABCDE1234F)',
                      },
                    })}
                    type="text"
                    id="pan"
                    maxLength={10}
                    className={`form-input text-lg uppercase tracking-[0.3em] text-center ${errors.pan ? 'border-red-500' : ''}`}
                    placeholder="ABCDE1234F"
                    style={{ textTransform: 'uppercase' }}
                    autoComplete="off"
                    inputMode="text"
                    aria-describedby="pan-helper-text"
                    onInput={handlePanInput}
                  />
                  {!errors.pan && (
                    <p id="pan-helper-text" className="text-sm text-gray-500 mt-2">
                      Use uppercase letters followed by numbers (e.g., ABCDE1234F).
                    </p>
                  )}
                  {errors.pan && (
                    <p className="form-error mt-1">{errors.pan.message}</p>
                  )}
                </div>

                {/* Occupation */}
                <div>
                  <label htmlFor="occupation" className="form-label text-lg font-semibold">
                    Occupation *
                  </label>
                  <input
                    {...register('occupation', { required: 'Occupation is required' })}
                    type="text"
                    id="occupation"
                    className={`form-input text-lg ${errors.occupation ? 'border-red-500' : ''}`}
                    placeholder="Enter your occupation"
                  />
                  {errors.occupation && (
                    <p className="form-error mt-1">{errors.occupation.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary btn-lg w-full text-lg font-bold py-4"
                >
                  Proceed to Payment
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key="payment"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 md:p-8"
              >
                {/* Donation Summary */}
                <div className="bg-primary-50 p-6 rounded-xl mb-6 border-2 border-primary-200">
                  <h3 className="text-2xl font-serif font-bold text-primary-700 mb-4">Donation Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Donation Type</div>
                      <div className="font-bold text-lg text-gray-800">
                        {donationType === 'monthly' ? 'Monthly Donation' : 'One-Time Donation'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Amount</div>
                      <div className="font-bold text-primary-600 text-2xl">₹{amount}</div>
                    </div>
                  </div>
                </div>

                {/* Payment Mode Selection */}
                {!paymentMode ? (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6 text-center">
                      Choose Payment Method
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.button
                        onClick={() => setPaymentMode('upi')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-8 rounded-xl border-2 border-primary-500 bg-primary-50 hover:bg-primary-100 transition-all duration-300 shadow-lg"
                      >
                        <div className="text-center">
                          <div className="text-5xl mb-4">📱</div>
                          <div className="font-bold text-xl text-gray-800 mb-2">UPI Payment</div>
                          <div className="text-sm text-gray-600">Pay via GPay, PhonePe, Paytm</div>
                        </div>
                      </motion.button>

                      <motion.button
                        onClick={() => setPaymentMode('bank')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-8 rounded-xl border-2 border-primary-500 bg-primary-50 hover:bg-primary-100 transition-all duration-300 shadow-lg"
                      >
                        <div className="text-center">
                          <div className="text-5xl mb-4">🏦</div>
                          <div className="font-bold text-xl text-gray-800 mb-2">Bank Transfer</div>
                          <div className="text-sm text-gray-600">Direct bank transfer details</div>
                        </div>
                      </motion.button>
                    </div>

                    <motion.button
                      onClick={() => setShowPayment(false)}
                      className="w-full mt-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      ← Back to Form
                    </motion.button>
                  </div>
                ) : paymentMode === 'upi' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">UPI Payment</h3>
                      <p className="text-gray-600">Click the button below to pay via UPI</p>
                    </div>

                    <motion.button
                      onClick={handleUPIPayment}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 rounded-xl text-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Pay ₹{amount} via UPI
                    </motion.button>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
                      <p className="font-mono font-bold text-lg">{GPAY_UPI_ID}</p>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => setPaymentMode(null)}
                        className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                      >
                        ← Back
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setShowPayment(false);
                          setPaymentMode(null);
                        }}
                        className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600"
                      >
                        New Donation
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="text-center">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">Bank Transfer Details</h3>
                      <p className="text-gray-600">Transfer ₹{amount} to the following account</p>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-semibold text-gray-700">Account Name:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{BANK_DETAILS.accountName}</span>
                          <button
                            onClick={() => handleCopyBankDetails(BANK_DETAILS.accountName, 'Account Name')}
                            className="text-primary-600 hover:text-primary-700"
                            title="Copy"
                          >
                            📋
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-semibold text-gray-700">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-lg">{BANK_DETAILS.accountNumber}</span>
                          <button
                            onClick={() => handleCopyBankDetails(BANK_DETAILS.accountNumber, 'Account Number')}
                            className="text-primary-600 hover:text-primary-700"
                            title="Copy"
                          >
                            📋
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-semibold text-gray-700">IFSC Code:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-lg">{BANK_DETAILS.ifscCode}</span>
                          <button
                            onClick={() => handleCopyBankDetails(BANK_DETAILS.ifscCode, 'IFSC Code')}
                            className="text-primary-600 hover:text-primary-700"
                            title="Copy"
                          >
                            📋
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-b pb-3">
                        <span className="font-semibold text-gray-700">Bank Name:</span>
                        <span className="font-bold text-lg">{BANK_DETAILS.bankName}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">Branch:</span>
                        <span className="font-bold text-lg">{BANK_DETAILS.branch}</span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 p-4 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> After making the transfer, please send a screenshot of the transaction to our email or WhatsApp for confirmation.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => setPaymentMode(null)}
                        className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                      >
                        ← Back
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setShowPayment(false);
                          setPaymentMode(null);
                        }}
                        className="flex-1 py-3 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600"
                      >
                        New Donation
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

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
                <div className="text-sm text-gray-700 font-semibold">Secure Payment</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm text-gray-700 font-semibold">80G Tax Benefit</div>
              </div>
              <div>
                <div className="text-2xl mb-2">✅</div>
                <div className="text-sm text-gray-700 font-semibold">Transparent</div>
              </div>
              <div>
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm text-gray-700 font-semibold">Impact Reports</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
