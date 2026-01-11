import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Mission from '@/components/Mission';
import DonationForm from '@/components/DonationForm';
import CommunityFeedback from '@/components/CommunityFeedback';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';

const Home: React.FC = () => {
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);
    
    return (
        <>
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
        </>
    );
};

export default Home;
