import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import ViewportMeta from '@/components/ViewportMeta';

const Annathanam: React.FC = () => {
    return (
        <>
            <ViewportMeta />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="p-8 md:p-12">
                            <div className="text-center mb-10">
                                <span className="text-6xl mb-4 block">🍲</span>
                                <h1 className="text-4xl md:text-5xl font-bold text-[#1C3F75] font-serif mb-4">
                                    Annathanam
                                </h1>
                                <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full"></div>
                            </div>

                            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                                <p className="text-xl font-medium text-center text-[#1C3F75] italic mb-8">
                                    "Annadhanam is not charity - it’s service."
                                </p>

                                <p className="text-justify leading-relaxed">
                                    You don’t give food to someone; you serve food to God through them.
                                </p>

                                <p className="text-justify leading-relaxed">
                                    In many traditions, it's said:
                                    <br />
                                    <span className="font-semibold block mt-2 text-center">“The one who eats is God in disguise.”</span>
                                </p>

                                <p className="text-justify leading-relaxed">
                                    You need to experience extreme hunger due to abject poverty to realise Annadhan ! Well apart from abject poverty, many hesitate to seek help due to pride and self-respect - such as displaced students, children of daily labourers, labourers themselves, orphaned nomads, or even those who earn a small income but still struggle to make ends meet.
                                </p>

                                <p className="text-justify leading-relaxed">
                                    If our Annadhan can ease their burden and help them move up the economic ladder, then why not? We serve food beyond caste creed gender or religion to anyone who walks in without pride !
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
                <ScrollToTop />
            </div>
        </>
    );
};

export default Annathanam;
