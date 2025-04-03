'use client';

import { useEffect, useState } from 'react';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

export default function CampaignPage() {
  const [activeSection, setActiveSection] = useState(0);
  const images = [
    '/470934de877c88a13171081ae22e98994ce9cbd7-1792x1008.png',
    '/ChatGPT Image Apr 3, 2025, 09_20_13 PM.png',
    '/media_1433d47e0fab8a75adb6b9838c7df3489bf962183.jpeg',
    '/MPIN_ What It Is, How It Works & Its Role in Secure Transactions.jpeg',
    '/Secure-your-account-from-UPI-frauds.jpg'
  ];

  const messages = [
    { 
      title: 'Real-Time Transaction Monitoring',
      text: 'AI-powered analysis of every UPI payment in milliseconds'
    },
    {
      title: 'Anomaly Detection',
      text: 'Machine learning models identifying suspicious patterns'
    },
    {
      title: 'Secure MPIN Protection',
      text: 'Multi-layer encryption for transaction authorization'
    },
    {
      title: 'Phishing Prevention',
      text: 'Block fake payment collect requests automatically'
    },
    {
      title: '24/7 Fraud Surveillance',
      text: 'Round-the-clock monitoring of your UPI transactions'
    }
  ];

  useEffect(() => {
    const container = document.querySelector('.overflow-y-auto');
    const handleScroll = () => {
      const scrollPosition = container?.scrollTop || 0;
      const sectionHeight = container?.clientHeight || 0;
      setActiveSection(Math.floor(scrollPosition / sectionHeight));
    };

    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      
      <div className="relative h-[calc(100vh-4rem)] overflow-y-auto snap-mandatory snap-y">
        {images.map((img, index) => (
          <section
            key={index}
            className="h-full w-full relative snap-start transition-opacity duration-1000"
            style={{
              opacity: activeSection === index ? 1 : 0,
              pointerEvents: activeSection === index ? 'auto' : 'none',
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-lg" />
          <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {messages[index].title}
              </h1>
              <p className="text-lg md:text-2xl text-gray-200">
                {messages[index].text}
              </p>
            </div>
          </div>
        </section>
      ))}

      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-24">
          <h2 className="text-4xl font-bold text-center mb-12">
            Join Thousands of Protected Businesses
          </h2>
          <Footer />
        </div>
      </div>
    </div>
    </div>
  );
}
