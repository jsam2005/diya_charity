import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDeviceFeatures } from '@/hooks/useResponsive';
import { getApiUrl } from '@/utils/api';

interface Donor {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  amount: string | number;
  donationType: string;
  upiId?: string;
  paymentId?: string;
  orderId?: string;
  subscriptionId?: string;
  status: string;
}

interface DonorListProps {
  maxDisplay?: number; // Maximum donors to display in each section
}

const DonorList: React.FC<DonorListProps> = ({ maxDisplay = 10 }) => {
  const [oneTimeDonors, setOneTimeDonors] = useState<Donor[]>([]);
  const [monthlyDonors, setMonthlyDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useDeviceFeatures();

  useEffect(() => {
    fetchDonors();
    // Refresh every 30 seconds
    const interval = setInterval(fetchDonors, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiUrl('donors'));
      
      if (!response.ok) {
        throw new Error('Failed to fetch donors');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOneTimeDonors(data.data.oneTime || []);
        setMonthlyDonors(data.data.monthly || []);
        setError(null);
      } else {
        throw new Error(data.error || 'Failed to fetch donors');
      }
    } catch (err) {
      console.error('Error fetching donors:', err);
      setError(err instanceof Error ? err.message : 'Failed to load donor details');
      // Don't show error to user, just log it
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: string | number) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return `₹${numAmount.toLocaleString('en-IN')}`;
  };

  const formatDate = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return timestamp;
    }
  };

  const DonorCard = ({ donor, isMonthly }: { donor: Donor; isMonthly: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: '#FFFFFF',
        padding: isMobile ? '12px' : '16px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        marginBottom: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <div style={{ fontWeight: 600, color: '#1C3F75', fontSize: isMobile ? '14px' : '16px', marginBottom: '4px' }}>
            {donor.name || 'Anonymous'}
          </div>
          <div style={{ fontSize: isMobile ? '12px' : '14px', color: '#666666', marginBottom: '2px' }}>
            {formatAmount(donor.amount)}
          </div>
          {isMonthly && donor.subscriptionId && (
            <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>
              🔄 Active Subscription
            </div>
          )}
        </div>
        <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#999999', textAlign: 'right' }}>
          {formatDate(donor.timestamp)}
        </div>
      </div>
    </motion.div>
  );

  if (loading && oneTimeDonors.length === 0 && monthlyDonors.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666666' }}>
        Loading donor details...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', marginTop: '40px' }}>
      {/* One-Time Donors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: '#F9F9F9',
          padding: isMobile ? '24px 16px' : '32px 24px',
          borderRadius: '12px',
          marginBottom: '32px',
          border: '2px solid #E8F4F8',
        }}
      >
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: 700,
            color: '#1C3F75',
            marginBottom: '8px',
          }}
        >
          💝 One-Time Donors
        </h3>
        <p style={{ fontSize: isMobile ? '13px' : '14px', color: '#666666', marginBottom: '20px' }}>
          Generous supporters who made one-time contributions
        </p>
        
        {oneTimeDonors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999999' }}>
            No one-time donors yet. Be the first! 🙏
          </div>
        ) : (
          <div>
            {oneTimeDonors.slice(0, maxDisplay).map((donor, index) => (
              <DonorCard key={index} donor={donor} isMonthly={false} />
            ))}
            {oneTimeDonors.length > maxDisplay && (
              <div style={{ textAlign: 'center', marginTop: '16px', color: '#666666', fontSize: '14px' }}>
                + {oneTimeDonors.length - maxDisplay} more donors
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Monthly Donors Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          backgroundColor: '#F0F9FF',
          padding: isMobile ? '24px 16px' : '32px 24px',
          borderRadius: '12px',
          border: '2px solid #BFDBFE',
        }}
      >
        <h3
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: isMobile ? '1.3rem' : '1.8rem',
            fontWeight: 700,
            color: '#1C3F75',
            marginBottom: '8px',
          }}
        >
          🔄 Monthly Donors
        </h3>
        <p style={{ fontSize: isMobile ? '13px' : '14px', color: '#666666', marginBottom: '20px' }}>
          Committed supporters with active monthly subscriptions
        </p>
        
        {monthlyDonors.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#999999' }}>
            No monthly donors yet. Start a monthly subscription! 💙
          </div>
        ) : (
          <div>
            {monthlyDonors.slice(0, maxDisplay).map((donor, index) => (
              <DonorCard key={index} donor={donor} isMonthly={true} />
            ))}
            {monthlyDonors.length > maxDisplay && (
              <div style={{ textAlign: 'center', marginTop: '16px', color: '#666666', fontSize: '14px' }}>
                + {monthlyDonors.length - maxDisplay} more monthly donors
              </div>
            )}
          </div>
        )}
      </motion.div>

      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '20px', 
          color: '#dc2626', 
          fontSize: '14px',
          marginTop: '20px'
        }}>
          Note: Unable to load donor details. Donations are still being processed.
        </div>
      )}
    </div>
  );
};

export default DonorList;
