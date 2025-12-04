import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import DonationForm from '@/components/DonationForm';
import CommunityFeedback from '@/components/CommunityFeedback';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import NotificationProvider from '@/components/NotificationProvider';
import ViewportMeta from '@/components/ViewportMeta';

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ViewportMeta />
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <Mission />
          <DonationForm />
          <CommunityFeedback />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </NotificationProvider>
  );
};

export default App;
