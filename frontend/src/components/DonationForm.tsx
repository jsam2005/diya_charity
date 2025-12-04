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
    backgroundColor: '#FFFFFF',
    padding: '30px 20px',
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.05)',
    borderRadius: '15px',
    maxWidth: '1100px',
    margin: '0 auto',
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gap: '50px',
    gridTemplateColumns: isMobile ? '1fr' : '60% 40%',
  };

  const leftColumnStyle: React.CSSProperties = {
    paddingRight: isMobile ? 0 : '20px',
    borderRight: isMobile ? 'none' : '1px solid #EAEAEA',
  };

  const rightColumnStyle: React.CSSProperties = {
    paddingLeft: isMobile ? 0 : '20px',
    textAlign: 'center',
  };

  const amountButtonClass =
    'px-5 py-3 rounded-lg border-2 font-semibold text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500';

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
                fontSize: '2.5rem',
                color: 'var(--color-primary)',
                marginBottom: '20px',
              }}
            >
              LIFE IS AN ECHO
            </h2>
            <div
              style={{
                fontFamily: "'EB Garamond', serif",
                color: '#333333',
                fontSize: '1.25rem',
                lineHeight: '1.8',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <p style={{ marginBottom: '8px' }}>What you send out comes back.</p>
              <p style={{ marginBottom: '8px' }}>What you sow you reap.</p>
              <p style={{ marginBottom: '8px' }}>What you give you get.</p>
              <p>What you see in others exists in you.</p>
            </div>
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
                            ? 'border-secondary bg-[#EAF4FF] text-secondary shadow'
                            : 'border-gray-300 text-[#333333] bg-white hover:border-secondary'
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
                    backgroundColor: 'var(--color-accent)',
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
              <div className="mb-6">
                <p className="text-[#333333] font-semibold">
                  Scan &amp; Pay (UPI)
                </p>
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    margin: '15px auto',
                    border: '6px solid var(--color-secondary)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: 'var(--color-secondary)',
                  }}
                >
                  UPI QR
                </div>
                <p className="text-sm text-gray-500">
                  [Placeholder for Trust&apos;s UPI QR Code Image]
                </p>
              </div>

              <div
                style={{
                  backgroundColor: '#F8F8F8',
                  padding: '20px',
                  borderRadius: '10px',
                  marginTop: '25px',
                  textAlign: 'left',
                }}
              >
                <p className="text-lg font-semibold text-primary mb-4">
                  Bank Transfer Details
                </p>
                <div className="space-y-3">
                  {BANK_DETAILS.map((detail) => (
                    <div key={detail.label} className="flex justify-between">
                      <span className="font-semibold text-[#666666]">
                        {detail.label}:
                      </span>
                      <span className="font-bold text-[#333333]">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#666666] mt-4">
                  *Please share transaction details via email/WhatsApp for 80G
                  receipt.*
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
