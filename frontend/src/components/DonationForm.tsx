import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import { getAssetPath } from '@/utils';
import { useLanguage } from '@/contexts/LanguageContext';

const DONATION_AMOUNTS = [250, 500, 1000, 1500, 2000];

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  email: '',
  customAmount: '',
};

const BANK_DETAILS = [
  { label: 'Account Name', value: 'DIYA CHARITABLE TRUST' },
  { label: 'Bank Name', value: 'HDFC Bank' },
  { label: 'Account Number', value: '50200116912060' },
  { label: 'IFSC Code', value: 'HDFC0002014' },
];

const DonationForm: React.FC = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(
    DONATION_AMOUNTS[2]
  );

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { isMobile, isTablet } = useDeviceFeatures();
  const { t } = useLanguage();

  const sponsor1 = getAssetPath('assets/sponsors1.jpg');
  const sponsor2 = getAssetPath('assets/sponsors2.jpg');
  const sponsor3 = getAssetPath('assets/sponsors3.jpg');

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
    minWidth: 0, // Prevents flex items from overflowing
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
    minWidth: 0, // Prevents flex items from overflowing
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    alignSelf: 'start', // Prevents stretching
  };

  const amountButtonClass =
    'px-5 py-3 rounded-full border-2 font-semibold text-base transition-all duration-300 focus:outline-none';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'customAmount') {
      setSelectedAmount(null);
    }
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({ ...prev, customAmount: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...formData,
      amount: selectedAmount ?? Number(formData.customAmount || 0),
    };
    console.log('Donation submission:', payload);
    alert(
      'Thank you for your willingness to contribute! Our team will reach out shortly.'
    );
    setFormData(INITIAL_FORM_STATE);
    setSelectedAmount(DONATION_AMOUNTS[2]);
  };

  return (
    <>
      <section
        id="donation"
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
              <p
                style={{
                  fontFamily: 'Calibri, sans-serif',
                  fontSize: isMobile ? '18px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '1px',
                  fontWeight: 700,
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                  padding: '0 10px',
                }}
              >
                {t('taxBenefit')}
              </p>
              <p
                style={{
                  fontFamily: 'Calibri, sans-serif',
                  fontSize: isMobile ? '18px' : '25px',
                  lineHeight: 1.3,
                  color: '#000000',
                  textAlign: 'center',
                  marginTop: '1px',
                  marginBottom: '18px',
                  fontWeight: 500,
                  maxWidth: '100%',
                  boxSizing: 'border-box',
                  wordWrap: 'break-word',
                  padding: '0 10px',
                }}
              >
                {t('taxBenefitDesc')}{' '}
                <a
                  href="https://wa.me/9894728646?text=I%20have%20donated%20and%20would%20like%20to%20share%20my%20PAN%20for%2080G%20receipt."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563EB', textDecoration: 'underline', fontWeight: 600 }}
                >
                  {t('whatsapp')}
                </a>
                {' '}{t('taxBenefitDescAfter')}
              </p>
              <div
                style={{
                  backgroundColor: 'rgba(135, 206, 235, 0.3)', // Sky blue with low transparency
                  borderRadius: '20px',
                  padding: '20px',
                  display: 'block',
                  margin: '20px auto',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <h2
                  className="font-semibold"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    color: 'var(--color-primary)',
                    marginBottom: '10px',
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    wordWrap: 'break-word',
                    padding: '0 10px',
                  }}
                >
                  {t('lifeIsEcho')}
                </h2>
                <p
                  style={{
                    fontFamily: 'Calibri, sans-serif',
                    fontSize: isMobile ? '18px' : '25px',
                    lineHeight: 1.3,
                    color: '#000000',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontWeight: 700,
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    wordWrap: 'break-word',
                    padding: '0 10px',
                  }}
                >
                  <strong>{t('echo1')}</strong>
                </p>
                <p
                  style={{
                    fontFamily: 'Calibri, sans-serif',
                    fontSize: isMobile ? '18px' : '25px',
                    lineHeight: 1.3,
                    color: '#000000',
                    textAlign: 'center',
                    marginTop: '10px',
                    fontWeight: 700,
                    maxWidth: '100%',
                    boxSizing: 'border-box',
                    wordWrap: 'break-word',
                    padding: '0 10px',
                  }}
                >
                  <strong>{t('echo2')}</strong>
                </p>
              </div>
            </motion.div>

            <div style={gridStyle}>
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
                    {t('proceedPayment')}
                  </motion.button>
                </form>
              </motion.div>

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

                {/* UPI Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: isMobile ? '15px 12px' : isTablet ? '20px 18px' : '25px',
                    borderRadius: '20px',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
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
                  <div
                    style={{
                      width: isMobile ? '120px' : isTablet ? '150px' : '200px',
                      height: isMobile ? '120px' : isTablet ? '150px' : '200px',
                      margin: '15px auto',
                      border: '4px solid #16A34A',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      color: '#16A34A',
                      maxWidth: 'calc(100% - 24px)',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                    }}
                  >
                    {t('upiQr')}
                  </div>
                  <p className="text-sm text-gray-500 text-center" style={{
                    wordWrap: 'break-word',
                    padding: '0 5px',
                    maxWidth: '100%',
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    boxSizing: 'border-box'
                  }}>
                    {t('upiPlaceholder')}
                  </p>
                </div>

                {/* Bank Transfer Card */}
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: isMobile ? '15px 12px' : isTablet ? '20px 18px' : '25px',
                    borderRadius: '20px',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px',
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
                        case 'Trust Name':
                          icon = '🤝';
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

      {/* Metrics & Impact Areas - separate full-width section */}
      <section
        style={{
          backgroundColor: '#0d5ace62',
          padding: isMobile ? '30px 0 40px' : '40px 0 50px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div className="container-custom-full" style={{ width: '100%', boxSizing: 'border-box' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
            style={{ marginBottom: '30px' }}
          >
            <h2 style={{
              fontFamily: "'Poppins', 'EB Garamond', serif",
              fontSize: '2.5rem',
              color: '#1C3F75',
              textAlign: 'center',
              marginTop: '20px',
              marginBottom: '20px',
              display: 'inline-block',
            }}>
              {t('corporateSponsors')}
            </h2>
            <h1 style={{
              fontFamily: "'Poppins', 'EB Garamond', serif",
              fontSize: '1.8rem',
              color: '#1C3F75',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '20px',
              display: 'block',
            }}>
              {t('underCSR')}
            </h1>
          </motion.div>
          <div style={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: '900px',
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10px',
            marginBottom: '40px',
          }} className="carousel-wrapper">
            <div style={{
              display: 'flex',
              gap: '24px',
              width: 'max-content',
              animation: 'stream-loop-rtl 30s linear infinite',
            }} className="card-track">
              {[1, 2, 3, 4, 1, 2, 3, 4].map((i, index) => {
                const sponsorImages = [sponsor1, sponsor2, sponsor3, null];
                const sponsorImage = sponsorImages[i - 1];

                return (
                  <div key={index} style={{
                    width: '300px',
                    flexShrink: 0,
                    padding: '24px 22px',
                    borderRadius: '16px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    textAlign: 'center',
                    color: '#111827',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }} className="stream-card">
                    {sponsorImage ? (
                      <img
                        src={sponsorImage}
                        alt={`Corporate Partner ${i}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: '150px',
                          objectFit: 'contain',
                          borderRadius: '8px',
                        }}
                      />
                    ) : (
                      <>
                        <h3
                          style={{
                            fontFamily: "'Poppins', 'EB Garamond', serif",
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            color: '#1C3F75',
                            marginBottom: '8px',
                          }}
                        >
                          {t('corporatePartner')} {i}
                        </h3>
                        <p
                          style={{
                            fontFamily: "'EB Garamond', serif",
                            fontSize: '1rem',
                            color: '#374151',
                            lineHeight: 1.6,
                          }}
                        >
                          {t('anticipatingCSR')}
                        </p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics & Impact Areas Section */}
      <section
        style={{
          backgroundColor: '#273857',
          padding: isMobile ? '30px 0 40px' : '40px 0 50px',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div className="container-custom-full" style={{ width: '100%', boxSizing: 'border-box' }}>
          <h3
            style={{
              fontFamily: "'Poppins', 'EB Garamond', serif",
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '20px',
              padding: '0 10px',
              wordWrap: 'break-word',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            {t('metricsImpact')}
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              maxWidth: '1100px',
              margin: '10px auto 0',
              width: '100%',
              boxSizing: 'border-box',
              padding: '0 10px',
            }}
          >
            {[
              {
                title: t('educationYouth'),
              },
              {
                title: t('elderlyCare'),
              },
              {
                title: t('womenFamilies'),
              },
              {
                title: t('emergencyRelief'),
              },
            ].map((impact, index) => (
              <div
                key={impact.title}
                style={{
                  flex: isMobile ? '1 1 100%' : '1 1 220px',
                  textAlign: 'center',
                  padding: '16px 18px',
                  borderLeft: index === 0 ? 'none' : isMobile ? 'none' : '1px solid rgba(255,255,255,0.25)',
                  borderTop: index > 0 && isMobile ? '1px solid rgba(255,255,255,0.25)' : 'none',
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: isMobile ? '1.1rem' : '1.35rem',
                    color: '#FFFFFF',
                    margin: 0,
                    wordWrap: 'break-word',
                  }}
                >
                  {impact.title}
                </h4>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: 'Calibri, sans-serif',
              fontSize: isMobile ? '16px' : '22px',
              lineHeight: 1.3,
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: '12px',
              fontWeight: 700,
              padding: '0 10px',
              wordWrap: 'break-word',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            {t('willBeShared')}
          </p>
        </div>
      </section>
    </>
  );
};

export default DonationForm;
