'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { useScroll, useTransform } from 'framer-motion';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const UpiFraudDetectionPage = () => {
  const [activeTab, setActiveTab] = useState<'id' | 'payment'>('id');
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const { toast } = useToast();

  // State for report form
  const [reportForm, setReportForm] = useState({
    transactionType: '',
    amount: '',
    senderId: '',
    receiverId: '',
    balance: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report');
      }

      toast({
        title: 'Success!',
        description: 'Your fraud report has been successfully submitted and will be reviewed by our team.',
        duration: 5000,
      });

      // Reset form
      setReportForm({
        transactionType: '',
        amount: '',
        senderId: '',
        receiverId: '',
        balance: '',
        description: ''
      });
    } catch (error) {
      console.error('Report submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Failed to submit report. Please try again.',
        variant: 'destructive',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Advanced UPI Fraud Detection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Protect your transactions with our cutting-edge fraud detection system powered by AI and machine learning.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center gap-6 mb-16"
          >
            <Link href="/id-detection">
            <Button 
              onClick={() => setActiveTab('id')}
              className={`px-8 py-4 text-lg ${activeTab === 'id' ? 'bg-purple-600' : 'bg-gray-200 text-gray-700'}`}
            >
              ID Detection
            </Button>
            </Link>
            <Link href="/payment-detection">
              <Button 
                onClick={() => setActiveTab('payment')}
                className={`px-8 py-4 text-lg ${activeTab === 'payment' ? 'bg-purple-600' : 'bg-gray-200 text-gray-700'}`}
              >
                Payment Detection
              </Button>
            </Link>
          </motion.div>

          {/* Fraud Alert Message */}
          <div className="flex justify-center items-center w-full py-12">
            <div className="text-center w-full max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-pulse">
                ⚠️ Stay Alert: Protect Yourself from UPI Fraud
              </h2>
              <p className="text-xl text-white/90">
                Be vigilant while making UPI transactions. Never share your PIN, OTP, or scan unknown QR codes. Your financial security is our top priority.
              </p>
            </div>
          </div>

          {/* YouTube Video Section */}
          <div className="w-full flex justify-center items-center max-w-4xl mx-auto mt-8 px-4">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg w-full">
              <iframe
                src="https://www.youtube.com/embed/iI2NaN_QVTI"
                title="UPI Fraud Detection Video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fraud Prevention Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Proactive Fraud Prevention
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our system identifies suspicious patterns before they impact your business.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Monitoring",
                description: "24/7 surveillance of all transactions with instant alerts for suspicious activity.",
                color: "from-blue-500 to-purple-500"
              },
              {
                title: "Behavioral Analysis",
                description: "Machine learning models that learn and adapt to new fraud patterns.",
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Multi-layer Protection",
                description: "Multiple verification steps to ensure only legitimate transactions go through.",
                color: "from-pink-500 to-red-500"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br rounded-xl p-1 shadow-lg"
              >
                <div className="bg-white p-6 rounded-lg h-full">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Transaction Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Report Suspicious Transaction</h2>
              <p className="text-gray-600">Help us prevent fraud by reporting suspicious UPI transactions.</p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Type</label>
                  <Input
                    required
                    placeholder="e.g., UPI Transfer"
                    value={reportForm.transactionType}
                    onChange={(e) => setReportForm({ ...reportForm, transactionType: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    required
                    type="number"
                    placeholder="Enter amount"
                    value={reportForm.amount}
                    onChange={(e) => setReportForm({ ...reportForm, amount: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sender ID</label>
                  <Input
                    required
                    placeholder="Enter sender's UPI ID"
                    value={reportForm.senderId}
                    onChange={(e) => setReportForm({ ...reportForm, senderId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Receiver ID</label>
                  <Input
                    required
                    placeholder="Enter receiver's UPI ID"
                    value={reportForm.receiverId}
                    onChange={(e) => setReportForm({ ...reportForm, receiverId: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Account Balance</label>
                <Input
                  type="number"
                  placeholder="Enter account balance (optional)"
                  value={reportForm.balance}
                  onChange={(e) => setReportForm({ ...reportForm, balance: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe why this transaction is suspicious"
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  className="h-32"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting Report...' : 'Report This Transaction'}
              </Button>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
                <AlertCircle className="w-4 h-4" />
                <span>Your report will be reviewed by our fraud prevention team.</span>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Prevention Techniques Section */}
      <section className="py-20 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fraud Prevention Techniques
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Biometric Authentication",
                description: "Secure transactions with fingerprint and facial recognition",
                icon: "M12 11v5.5M8.5 7.5a3.5 3.5 0 1 1 7 0"
              },
              {
                title: "Transaction Limits",
                description: "Real-time monitoring of transaction amounts and frequency",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Device Binding",
                description: "Restrict transactions to registered devices only",
                icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-12 h-12 bg-purple-100 rounded-xl mb-6 p-2"
                >
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="{feature.icon}" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detection Methods Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6">Advanced Detection Methods</h2>
              <ul className="space-y-4">
                {[
                  "Device fingerprinting analysis",
                  "Geolocation tracking",
                  "Transaction pattern recognition",
                  "Real-time behavior monitoring"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              className="relative h-96 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2">Live Threat Map</h3>
                <p className="text-purple-100">Global fraud activity visualization</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Footer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-auto"
      >
        <Footer />
      </motion.div>

    </div>
  );
};

export default UpiFraudDetectionPage;