import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import Process from '@/components/Process';
import ImpactStats from '@/components/ImpactStats';
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
      <div className="min-h-screen bg-warm-50">
        <Header />
        <main>
          <Hero />
          <Mission />
          <Process />
          <ImpactStats />
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
