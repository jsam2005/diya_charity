import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useDeviceFeatures } from '@/hooks/useResponsive';

const DONATION_AMOUNTS = [250, 500, 1000, 1500, 2000];

const INITIAL_FORM_STATE = {
  name: '',
  phone: '',
  email: '',
  customAmount: '',
};

const BANK_DETAILS = [
  { label: 'Trust Name', value: 'Diya Charity/Trust Name Placeholder' },
  { label: 'Bank Name', value: 'Placeholder Bank Name' },
  { label: 'Account Number', value: 'XXXX XXXX XXXX' },
  { label: 'IFSC Code', value: 'ABC12345678' },
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

  const { isMobile } = useDeviceFeatures();

  const layoutContainerStyle: React.CSSProperties = {
    backgroundColor: '#F9F9F9',
    padding: '40px 20px',
    borderRadius: '15px',
    maxWidth: '1300px',
    margin: '0 auto',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '40px',
    gridTemplateColumns: isMobile ? '1fr' : '60% 40%',
  };

  const leftColumnStyle: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    textAlign: 'left',
  };

  const rightColumnStyle: React.CSSProperties = {
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
      >
        <div className="container-custom-full">
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
                fontSize: '2.4rem',
                color: '#FFFFFF',
                backgroundColor: '#3498DB',
                padding: '15px 30px',
                borderRadius: '8px',
                display: 'inline-block',
                marginBottom: '30px',
              }}
            >
              NEED SUPPORT - DONATE
            </h2>
            <p
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '25px',
                lineHeight: 1.3,
                color: '#000000',
                textAlign: 'center',
                marginTop: '1px',
                fontWeight: 700,
              }}
            >
              Get Tax Benefit (Under 80G)
            </p>
            <p
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '25px',
                lineHeight: 1.3,
                color: '#000000',
                textAlign: 'center',
                marginTop: '1px',
                marginBottom: '18px',
                fontWeight: 500,
              }}
            >
              Donations are eligible for Section 80G exemption. Just share your PAN on our{' '}
              <a
                href="https://wa.me/9894728646?text=I%20have%20donated%20and%20would%20like%20to%20share%20my%20PAN%20for%2080G%20receipt."
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2563EB', textDecoration: 'underline', fontWeight: 600 }}
              >
                WhatsApp
              </a>{' '}
              after donating.
            </p>
            <h2
              className="font-semibold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '2.5rem',
                color: 'var(--color-primary)',
                marginBottom: '20px',
              }}
            >
              LIFE IS AN ECHO
            </h2>
            <p
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '25px',
                lineHeight: 1.3,
                color: '#000000',
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 700,
              }}
            >
              <strong>What you send out comes back. What you sow you reap.</strong>
            </p>
            <p
              style={{
                fontFamily: 'Calibri, sans-serif',
                fontSize: '25px',
                lineHeight: 1.3,
                color: '#000000',
                textAlign: 'center',
                marginTop: '10px',
                fontWeight: 700,
              }}
            >
              <strong>What you give you get. What you see in others exists in you.</strong>
            </p>
          </motion.div>

          <div style={gridStyle}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={leftColumnStyle}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Donor Information &amp; Contribution
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    Donor Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="form-input text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., +91 98765 43210"
                    className="form-input text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="form-input text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[#333333] font-semibold">
                    Select Donation Amount (INR)
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {DONATION_AMOUNTS.map((amount) => (
                      <motion.button
                        key={amount}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`${amountButtonClass} ${
                          selectedAmount === amount
                            ? 'border-[#FF8C42] bg-[#FF8C42] text-white shadow-md'
                            : 'border-gray-300 text-[#333333] bg-white hover:border-[#FF8C42]'
                        }`}
                        onClick={() => handleAmountSelect(amount)}
                      >
                        ₹ {amount.toLocaleString('en-IN')}
                      </motion.button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[#333333] font-semibold">
                      Other Amount
                    </label>
                    <input
                      type="number"
                      name="customAmount"
                      value={formData.customAmount}
                      onChange={handleInputChange}
                      placeholder="Enter custom amount"
                      className="form-input text-lg"
                      min={100}
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
                  Proceed to Payment
                </motion.button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={rightColumnStyle}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Direct Payment Details
              </h3>

              {/* UPI Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid #E0E0E0',
                  marginBottom: '20px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  borderTop: '5px solid #3498DB',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#3498DB] text-xl" aria-hidden="true">
                    📱
                  </span>
                  <p className="text-[#333333] font-semibold">
                    Scan &amp; Pay (UPI)
                  </p>
                </div>
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    margin: '15px auto',
                    border: '4px solid #16A34A',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: '#16A34A',
                  }}
                >
                  UPI QR
                </div>
                <p className="text-sm text-gray-500 text-center">
                  [Placeholder for Trust&apos;s UPI QR Code Image]
                </p>
              </div>

              {/* Bank Transfer Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid #E0E0E0',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
                  borderTop: '5px solid #FF8C42',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[#FF8C42] text-xl" aria-hidden="true">
                    🏦
                  </span>
                  <p className="text-lg font-semibold text-primary mb-0">
                    Bank Transfer Details
                  </p>
                </div>
                <div className="space-y-3">
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
                        className="flex items-start justify-between gap-3"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[#FF8C42] text-lg"
                            aria-hidden="true"
                          >
                            {icon}
                          </span>
                          <span className="font-semibold text-[#666666]">
                            {detail.label}:
                          </span>
                        </div>
                        <span className="font-bold text-[#333333]">
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
                    fontSize: '0.85rem',
                    color: '#666666',
                  }}
                >
                  *Please share transaction details via email/WhatsApp for 80G
                  receipt.*
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
          backgroundColor: '#273857',
          padding: '40px 0 50px',
        }}
      >
        <div className="container-custom-full">
          <h3
            style={{
              fontFamily: "'Poppins', 'EB Garamond', serif",
              fontSize: '2.5rem',
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: '10px',
              marginBottom: '20px',
            }}
          >
            METRICS & IMPACTS AREAS
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'stretch',
              maxWidth: '1100px',
              margin: '10px auto 0',
            }}
          >
            {[
              {
                title: 'Education & Youth',
              },
              {
                title: 'Elderly Care',
              },
              {
                title: 'Women & Families',
              },
              {
                title: 'Emergency Relief',
              },
            ].map((impact, index) => (
              <div
                key={impact.title}
                style={{
                  flex: '1 1 220px',
                  textAlign: 'center',
                  padding: '16px 18px',
                  borderLeft: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <h4
                  style={{
                    fontFamily: "'Poppins', 'EB Garamond', serif",
                    fontSize: '1.35rem',
                    color: '#FFFFFF',
                    margin: 0,
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
              fontSize: '22px',
              lineHeight: 1.3,
              color: '#FFFFFF',
              textAlign: 'center',
              marginTop: '12px',
              fontWeight: 700,
            }}
          >
            ---------- <strong>Will be Shared with program sponsors</strong> -------------
          </p>
        </div>
      </section>
    </>
  );
};

export default DonationForm;
