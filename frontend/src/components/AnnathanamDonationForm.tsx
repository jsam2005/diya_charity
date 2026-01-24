import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import { getAssetPath } from '@/utils';
import { useLanguage } from '@/contexts/LanguageContext';

// API URL is now handled by razorpay.ts utility

const DONATION_AMOUNTS = [1500, 2500, 3500, 4500, 5500];

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  email: '',
  pan: '', // Optional PAN number for 80G receipt
  customAmount: '',
};

const BANK_DETAILS = [
  { label: 'Account Name', value: 'DIYA CHARITABLE TRUST' },
  { label: 'Bank Name', value: 'Indus Bank' },
  { label: 'Account Number', value: '259445205771' },
  { label: 'IFSC Code', value: 'INDB0000236' },
];

const AnnathanamDonationForm: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    DONATION_AMOUNTS[0]
  );
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [upiCopied, setUpiCopied] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { isMobile, isTablet } = useDeviceFeatures();
  const { t } = useLanguage();

  const qrCodeImage = getAssetPath('assets/payment/annathnam_donation/qr_annathanam.png');
  const paymentOptionsImage = getAssetPath('assets/payment/annathnam_donation/payemnt_option_annathanam.png');
  const UPI_ID = 'pos.5346351@indus';

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setUpiCopied(true);
      setTimeout(() => setUpiCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy UPI ID:', err);
    }
  };

  // UPI payment instructions removed - now using Razorpay for all payments

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#F9F9F9',
    padding: isMobile ? '20px 12px' : isTablet ? '30px 18px' : '40px 20px',
    borderRadius: '15px',
    maxWidth: '1300px',
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: isMobile ? '30px' : isTablet ? '30px' : '40px',
    gridTemplateColumns: isMobile
      ? '1fr'
      : isTablet
        ? '1fr'
        : 'minmax(0, 55%) minmax(0, 45%)',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    gridAutoRows: 'min-content',
    overflow: 'hidden',
  };

  const leftColumnStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: isMobile ? '20px 15px' : '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'left',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  };

  const rightColumnStyle: React.CSSProperties = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    alignSelf: 'start',
  };

  const amountButtonClass =
    'px-5 py-3 rounded-full border-2 font-semibold text-base transition-all duration-300 focus:outline-none';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'customAmount') {
      const numValue = Number(value);
      const isPredefinedAmount = DONATION_AMOUNTS.includes(numValue);
      if (!isPredefinedAmount) {
        setSelectedAmount(null);
      } else {
        setSelectedAmount(numValue);
      }
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({ ...prev, customAmount: amount.toString() }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = selectedAmount ?? Number(formData.customAmount || 0);
    
    if (amount <= 0) {
      alert('Please select or enter a valid donation amount.');
      return;
    }

    // Use Razorpay for both one-time and monthly donations
    // Import Razorpay utility
    const { processDonation } = await import('@/utils/razorpay');

    const payload = {
      ...formData,
      amount,
      donationType,
      purpose: 'annathanam', // Add purpose to identify Annathanam donations
    };

    try {
      await processDonation(
        payload,
        (_response) => {
          // Success handler
          if (donationType === 'monthly') {
            alert(`✅ Monthly Annathanam donation setup successful! Your monthly donation of ₹${amount} has been registered. You will receive a confirmation email shortly.`);
          } else {
            alert('✅ Payment successful! Thank you for your Annathanam donation.');
          }
          setFormData(INITIAL_FORM_STATE);
          setSelectedAmount(DONATION_AMOUNTS[0]);
          setDonationType('one-time');
        },
        (error) => {
          // Error handler
          console.error('Payment error:', error);
          alert(`Payment failed: ${error.message || 'Please try again.'}`);
        }
      );
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <section
      id="annathanam-donation"
      ref={ref}
      className="section-padding bg-white"
      style={{ overflow: 'hidden', width: '100%', maxWidth: '100vw' }}
    >
      <div className="container-custom-full" style={{
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        paddingLeft: isMobile ? '15px' : '20px',
        paddingRight: isMobile ? '15px' : '20px',
      }}>
        <div style={layoutContainerStyle}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <h2
              className="font-semibold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: isMobile ? '1.5rem' : '2.4rem',
                color: '#FFFFFF',
                backgroundColor: 'rgb(39, 56, 87)',
                padding: isMobile ? '12px 20px' : '15px 30px',
                borderRadius: '8px',
                display: 'inline-block',
                marginBottom: '30px',
                maxWidth: '100%',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
              }}
            >
                {t('needSupport')}
            </h2>
          </motion.div>

          <div style={gridStyle}>
            {/* Left Side - Donor Details Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={leftColumnStyle}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6" style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                wordWrap: 'break-word',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}>
                {t('donorInfo')}
              </h3>

              {/* Donation Type Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  fontSize: isMobile ? '16px' : '18px', 
                  fontWeight: 600, 
                  marginBottom: '12px', 
                  display: 'block',
                  color: '#333333'
                }}>
                  {t('donationType')}
                </label>
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  flexWrap: 'wrap' 
                }}>
                  <motion.button
                    type="button"
                    onClick={() => setDonationType('one-time')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: isMobile ? '12px 20px' : '14px 24px',
                      borderRadius: '8px',
                      border: donationType === 'one-time' ? '2px solid #1C3F75' : '2px solid #E0E0E0',
                      backgroundColor: donationType === 'one-time' ? '#1C3F75' : '#FFFFFF',
                      color: donationType === 'one-time' ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: isMobile ? '14px' : '16px',
                      transition: 'all 0.3s ease',
                      boxShadow: donationType === 'one-time' ? '0 2px 8px rgba(28, 63, 117, 0.2)' : 'none',
                    }}
                  >
                    {t('oneTimeDonation')}
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setDonationType('monthly')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      flex: 1,
                      minWidth: '140px',
                      padding: isMobile ? '12px 20px' : '14px 24px',
                      borderRadius: '8px',
                      border: donationType === 'monthly' ? '2px solid #1C3F75' : '2px solid #E0E0E0',
                      backgroundColor: donationType === 'monthly' ? '#1C3F75' : '#FFFFFF',
                      color: donationType === 'monthly' ? '#FFFFFF' : '#333333',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: isMobile ? '14px' : '16px',
                      transition: 'all 0.3s ease',
                      boxShadow: donationType === 'monthly' ? '0 2px 8px rgba(28, 63, 117, 0.2)' : 'none',
                    }}
                  >
                    {t('monthlyDonation')}
                  </motion.button>
                </div>
                {donationType === 'monthly' && (
                  <>
                    <p style={{ 
                      marginTop: '10px', 
                      fontSize: isMobile ? '13px' : '14px', 
                      color: '#666666', 
                      fontStyle: 'italic',
                      lineHeight: 1.5
                    }}>
                      {t('monthlyDonationNote')}
                    </p>
                    <p style={{ 
                      marginTop: '10px', 
                      fontSize: isMobile ? '12px' : '13px', 
                      color: '#666666', 
                      fontStyle: 'italic',
                      lineHeight: 1.4
                    }}>
                      Your UPI ID will be automatically detected during payment setup.
                    </p>
                  </>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6" style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}>
                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    {t('donorName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input text-lg"
                    style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    {t('phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., +91 98765 43210"
                    className="form-input text-lg"
                    style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="form-input text-lg"
                    style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
                  />
                </div>

                {/* Optional PAN Number Field */}
                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    PAN Number <span style={{ fontWeight: 400, fontSize: '0.9rem', color: '#666666' }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    placeholder="e.g., ABCDE1234F"
                    className="form-input text-lg"
                    style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
                  />
                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: '#666666',
                      fontStyle: 'italic',
                    }}
                  >
                    Providing your PAN helps us issue your 80G tax benefit receipt accurately.
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    {t('selectAmount')}
                  </label>
                  <div
                    className="flex flex-wrap gap-3"
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}
                  >
                    {DONATION_AMOUNTS.map((amount) => (
                      <motion.button
                        key={amount}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`${amountButtonClass} ${selectedAmount === amount
                          ? 'border-[#FF8C42] bg-[#FF8C42] text-white shadow-md'
                          : 'border-gray-300 text-[#333333] bg-white hover:border-[#FF8C42]'
                          }`}
                        onClick={() => handleAmountSelect(amount)}
                        style={{
                          flex: isMobile ? '1 1 calc(50% - 6px)' : '0 1 auto',
                          minWidth: isMobile ? 'calc(50% - 6px)' : 'auto',
                          maxWidth: isMobile ? 'calc(50% - 6px)' : 'none',
                        }}
                      >
                        ₹ {amount.toLocaleString('en-IN')}
                      </motion.button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[#333333] font-semibold">
                      {t('otherAmount')}
                    </label>
                    <input
                      type="number"
                      name="customAmount"
                      value={formData.customAmount}
                      onChange={handleInputChange}
                      placeholder={t('enterCustomAmount')}
                      className="form-input text-lg"
                      min={100}
                      style={{ width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    backgroundColor: '#FF8C42',
                    color: '#FFFFFF',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    marginTop: '30px',
                  }}
                  className="font-semibold w-full"
                >
                  {donationType === 'monthly' 
                    ? `${t('proceedPayment')} (${t('monthlyDonation')})`
                    : t('proceedPayment')
                  }
                </motion.button>
              </form>
            </motion.div>

            {/* Right Side - QR Code, UPI ID, Payment Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={rightColumnStyle}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6" style={{
                fontSize: isMobile ? '1.25rem' : isTablet ? '1.5rem' : '1.75rem',
                wordWrap: 'break-word',
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '0',
                marginBottom: isMobile ? '20px' : '24px',
                overflow: 'hidden'
              }}>
                {t('directPayment')}
              </h3>

              {/* Payment Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: isMobile ? '15px 12px' : isTablet ? '20px 18px' : '25px',
                  borderRadius: '20px',
                  border: '1px solid #E0E0E0',
                  marginBottom: '20px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  borderTop: '5px solid #3498DB',
                  width: '100%',
                  minWidth: 0,
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div className="flex items-center gap-2 mb-3" style={{ width: '100%', boxSizing: 'border-box' }}>
                  <span className="text-[#3498DB] text-xl flex-shrink-0" aria-hidden="true">
                    📱
                  </span>
                  <p className="text-[#333333] font-semibold" style={{
                    wordWrap: 'break-word',
                    minWidth: 0,
                    maxWidth: '100%'
                  }}>
                    {t('scanPay')}
                  </p>
                </div>
                
                {/* QR Code Image */}
                <div
                  style={{
                    width: isMobile ? '200px' : isTablet ? '250px' : '300px',
                    height: isMobile ? '200px' : isTablet ? '250px' : '300px',
                    margin: '15px auto',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: 'calc(100% - 24px)',
                    boxSizing: 'border-box',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={qrCodeImage}
                    alt={t('upiQr')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      borderRadius: '10px',
                    }}
                  />
                </div>
                
                {/* UPI ID Section - Between QR and Payment Options */}
                <div
                  style={{
                    margin: '20px auto',
                    textAlign: 'center',
                    maxWidth: 'calc(100% - 24px)',
                    boxSizing: 'border-box',
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? '14px' : '16px',
                      color: '#333333',
                      margin: 0,
                      display: 'flex',
                      flexDirection: isMobile ? 'column' : 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span style={{ fontWeight: 500 }}>
                      {t('upiId')}:
                    </span>
                    <span
                      style={{
                        color: '#1C3F75',
                        fontWeight: 600,
                        wordBreak: 'break-all',
                        fontFamily: 'monospace',
                      }}
                    >
                      {UPI_ID}
                    </span>
                    <motion.button
                      onClick={handleCopyUPI}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: 'transparent',
                        color: upiCopied ? '#16A34A' : '#1C3F75',
                        border: 'none',
                        padding: '4px 8px',
                        fontSize: isMobile ? '12px' : '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        textDecoration: 'underline',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {upiCopied ? (
                        <>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {t('copied')}
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {t('copy')}
                        </>
                      )}
                    </motion.button>
                  </p>
                </div>
                
                {/* Payment Options Image - Below UPI ID */}
                <div
                  style={{
                    width: '100%',
                    maxWidth: isMobile ? '280px' : isTablet ? '350px' : '400px',
                    margin: '20px auto 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                  }}
                >
                  <img
                    src={paymentOptionsImage}
                    alt="Payment Options"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </div>

              {/* Bank Transfer Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: isMobile ? '15px 12px' : isTablet ? '20px 18px' : '25px',
                  borderRadius: '20px',
                  border: '1px solid #E0E0E0',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  borderTop: '5px solid #FF8C42',
                  width: '100%',
                  minWidth: 0,
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div className="flex items-center gap-2 mb-4" style={{ width: '100%', boxSizing: 'border-box' }}>
                  <span className="text-[#FF8C42] text-xl flex-shrink-0" aria-hidden="true">
                    🏦
                  </span>
                  <p className="text-lg font-semibold text-primary mb-0" style={{
                    wordWrap: 'break-word',
                    minWidth: 0,
                    maxWidth: '100%',
                    fontSize: isMobile ? '1rem' : '1.125rem'
                  }}>
                    {t('bankTransfer')}
                  </p>
                </div>
                <div className="space-y-3" style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  maxWidth: '100%',
                }}>
                  {BANK_DETAILS.map((detail) => {
                    let icon = '🏛️';
                    switch (detail.label) {
                      case 'Account Name':
                        icon = '👤';
                        break;
                      case 'Bank Name':
                        icon = '🏦';
                        break;
                      case 'Account Number':
                        icon = '💳';
                        break;
                      case 'IFSC Code':
                        icon = '🏷️';
                        break;
                      default:
                        icon = '🏛️';
                    }
                    return (
                      <div
                        key={detail.label}
                        className="flex items-start gap-3"
                        style={{
                          flexWrap: 'wrap',
                          width: '100%',
                          minWidth: 0,
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                        }}
                      >
                        <div className="flex items-center gap-2 flex-shrink-0" style={{
                          minWidth: 'fit-content',
                        }}>
                          <span
                            className="text-[#FF8C42] text-lg"
                            aria-hidden="true"
                            style={{ fontSize: isMobile ? '1rem' : '1.125rem' }}
                          >
                            {icon}
                          </span>
                          <span className="font-semibold text-[#666666] whitespace-nowrap" style={{
                            fontSize: isMobile ? '0.875rem' : '1rem'
                          }}>
                            {detail.label}:
                          </span>
                        </div>
                        <span className="font-bold text-[#333333] flex-1" style={{
                          wordWrap: 'break-word',
                          textAlign: isMobile ? 'left' : 'left',
                          minWidth: 0,
                          fontSize: isMobile ? '0.875rem' : '1rem',
                          overflowWrap: 'break-word',
                        }}>
                          {detail.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p
                  className="mt-4"
                  style={{
                    fontStyle: 'italic',
                    fontSize: isMobile ? '0.7rem' : isTablet ? '0.75rem' : '0.85rem',
                    color: '#666666',
                    wordWrap: 'break-word',
                    padding: '0 5px',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                  }}
                >
                  {t('transactionNote')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnathanamDonationForm;
