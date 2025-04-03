'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      question: 'What is UPI Fraud Detection System?',
      answer: 'The UPI Fraud Detection System is an advanced security solution that uses machine learning algorithms to identify and prevent fraudulent transactions in real-time. It analyzes transaction patterns and user behavior to provide an additional layer of security for digital payments.'
    },
    {
      question: 'How does the fraud detection system work?',
      answer: 'Our system uses Isolation Forest algorithm to detect anomalies in transaction patterns. It analyzes various factors including transaction amount, frequency, location, and user behavior to identify potentially fraudulent activities. When suspicious activity is detected, the system generates immediate alerts.'
    },
    {
      question: 'What types of fraud can the system detect?',
      answer: 'The system can detect various types of fraud including phishing attacks, QR code tampering, fake payment requests, unauthorized transactions, and unusual transaction patterns that deviate from normal user behavior.'
    },
    {
      question: 'How accurate is the fraud detection?',
      answer: 'Our system maintains a high accuracy rate through continuous learning and adaptation. It uses advanced machine learning techniques and is regularly updated to recognize new fraud patterns. The false positive rate is kept minimal to ensure legitimate transactions are not affected.'
    },
    {
      question: 'How does the EMI Calculator work?',
      answer: 'The EMI Calculator helps you estimate your monthly installments for loans. It takes into account the principal amount, interest rate, and loan tenure to calculate the EMI. The calculator provides a detailed breakdown of the payment schedule and total interest payable.'
    },
    {
      question: 'What security measures are in place?',
      answer: 'We implement multiple layers of security including encryption of sensitive data, secure API endpoints, real-time transaction monitoring, and user authentication protocols. The system also maintains detailed audit trails for all transactions.'
    },
    {
      question: 'How can I report suspicious activity?',
      answer: 'If you notice any suspicious activity, you can immediately report it through the Alerts section of our platform. Our team will investigate the issue and take appropriate action. You should also contact your bank to block any unauthorized transactions.'
    },
    {
      question: 'What should I do if I suspect fraud?',
      answer: 'If you suspect fraud: 1) Immediately report the incident through our platform, 2) Contact your bank to block your UPI ID, 3) Change your UPI PIN, 4) Monitor your account for any unauthorized transactions, and 5) File a police complaint if necessary.'
    },
    {
      question: 'How often is the system updated?',
      answer: 'The system is continuously updated with new fraud patterns and security measures. Our machine learning models are retrained regularly with new data to ensure they can detect the latest types of fraud attempts.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security very seriously. All sensitive information is encrypted, and we follow industry-standard security protocols. We comply with relevant data protection regulations and regularly conduct security audits.'
    }
  ];

  const filteredFAQs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-navy-900 mb-4">Help & FAQ</h1>
          <p className="text-gray-600 mb-8">Find answers to common questions about our UPI Fraud Detection System</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg bg-white/50 border-white/30 focus:border-purple-500 transition-colors duration-200"
            />
          </div>

          {/* FAQ Accordion */}
          <Card className="p-6 backdrop-blur-xl bg-white/20 border border-white/30 shadow-xl rounded-xl">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-200">
              {filteredFAQs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="py-2">
                  <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-purple-600 transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}