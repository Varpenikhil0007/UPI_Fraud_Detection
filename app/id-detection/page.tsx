'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/nav-bar';
import { motion } from 'framer-motion';
import { ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

const IdDetectionPage = () => {
  const [showReport, setShowReport] = useState(false);
  const [idNumber, setIdNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ 
    isFraudulent: boolean;
    messages: string[];
    isValidFormat: boolean;
    fraudReport?: {
      fraudType: string;
      description: string;
      location: string;
      suspiciousActivity: string;
      amount?: number;
      evidenceDescription?: string;
    };
    
  } | null>(null);
  
  const FRAUD_KEYWORDS = ['admin', 'support', 'help', 'verify', 'fraud', 'scam'];
  
  const validateId = async (id: string) => {
    try {
      if (!id.trim()) return { isValidFormat: false, messages: [] };
  
      const isValidFormat = /^[A-Za-z0-9]{10,20}$/.test(id); // still check format
  
      // 🚨 Always call backend regardless of format
      const response = await fetch('https://upi-fraud-detection-backend1.onrender.com/api/id/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
  
      if (!response.ok) throw new Error('API Error');
  
      const result = await response.json();
      console.log('API result:', result);
  
      return {
        isFraudulent: result.isFraudulent,
        messages: result.messages || [],
        isValidFormat, // use client-side format result
        fraudReport: result.fraudReport
      };
  
    } catch (error) {
      console.error('Validation error:', error);
      return { 
        isFraudulent: true, 
        messages: ['Service unavailable'],
        isValidFormat: false 
      };
    }
  };
  
  
  
  const hasSequentialPattern = (id: string) => {
    const lowerId = id.toLowerCase();
    for (let i = 0; i < lowerId.length - 2; i++) {
      const a = lowerId.charCodeAt(i);
      const b = lowerId.charCodeAt(i+1);
      const c = lowerId.charCodeAt(i+2);
      if (b === a + 1 && c === b + 1) return true;
    }
    return false;
  };
  
  const containsFraudKeywords = (id: string) => {
    return FRAUD_KEYWORDS.some(keyword => 
      id.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  
  





  const handleCheck = async () => {
    setIsLoading(true);
    try {
      const validation = await validateId(idNumber); // this includes DB check
  
      // If DB says it's fraudulent, no need to do further checks
      if (validation.isFraudulent) {
        setResult({
          isFraudulent: true,
          messages: validation.messages || ['Reported in fraud database'],
          isValidFormat: validation.isValidFormat ?? true,
          fraudReport: validation.fraudReport
        });
      } else {
        // If not in DB, continue with other checks
        const sequentialCheck = hasSequentialPattern(idNumber);
        const keywordCheck = containsFraudKeywords(idNumber);
  
        const isFraud = sequentialCheck || keywordCheck;
  
        setResult({
          isFraudulent: isFraud,
          messages: [
            ...(validation.messages || []),
            ...(sequentialCheck ? ['⚠️ Sequential pattern detected'] : []),
            ...(keywordCheck ? ['⚠️ Suspicious keywords found'] : [])
          ],
          isValidFormat: validation.isValidFormat ?? true,
          fraudReport: validation.fraudReport
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setResult({
        isFraudulent: true,
        messages: ['Verification failed'],
        isValidFormat: false
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  







return (
  <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white">
    <NavBar />

    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          ID Detection System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Verify the authenticity of ID numbers using our advanced detection system.
          <br />
          <span className="text-sm mt-2 block">
            Valid format: 10-30 characters, letters and numbers (case-insensitive)
            <br />
            Invalid format: AB12-XY89-ZW (special characters), ABC123 (too short)
          </span>
        </p>
      </motion.div>

      {/* Process Flow */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">Verification Process</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-4xl mx-auto">
          {[
            { title: 'Input ID', description: 'Enter the ID number for verification' },
            { title: 'Format Check', description: 'System validates the ID format' },
            { title: 'Authentication', description: 'Verify against our database' },
            { title: 'Result', description: 'Get instant verification results' }
          ].map((step, index) => (
            <div key={index} className="flex items-center gap-4 w-full">
              <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              {index < 3 && (
                <ChevronRight className="hidden md:block text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ID Check Section */}
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="mb-6">
          <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Enter ID Number
          </label>
          <div className="flex gap-4">
            <Input
              id="idNumber"
              type="text"
              placeholder="Enter Char-digit ID number"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="flex-1"
              maxLength={40}
            />
            <div className="flex gap-2">
              <Button 
                onClick={handleCheck} 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </Button>
              {result?.fraudReport && (
                <Button
                  onClick={() => setShowReport(!showReport)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                  variant="secondary"
                >
                  {showReport ? 'Hide Report' : 'View Report'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Result Section */}
        {result && (
          <div className={`p-4 rounded-lg ${result.isFraudulent ? 'bg-yellow-50' : 'bg-green-50'}`}>
            <div className="flex items-start gap-3">
              {result.isFraudulent ? (
                <AlertTriangle className="text-yellow-500 mt-1" />
              ) : (
                <CheckCircle className="text-green-500 mt-1" />
              )}
              <div>
                <p className={`font-medium ${result.isFraudulent ? 'text-yellow-700' : 'text-green-700'} mb-2`}>
                  {result.isFraudulent ? 'Potential Risk Detected' : 'No Risk Detected - All Security Checks Passed'}
                </p>
                <ul className="text-sm space-y-1">
                  {result.messages.map((msg, index) => {
                    let explanation = '';
                    if (msg.includes('fraud database')) {
                      explanation = 'This ID has been previously reported in our fraud database. Please exercise extra caution.';
                    } else if (msg.includes('Sequential')) {
                      explanation = 'This ID contains sequential patterns that are commonly associated with automated or fraudulent accounts.';
                    } else if (msg.includes('keywords')) {
                      explanation = 'This ID contains terms that are often used in fraudulent activities.';
                    }
                    return (
                      <li key={index} className="text-gray-700">
                        {msg}
                        {explanation && <p className="text-gray-600 mt-1">{explanation}</p>}
                      </li>
                    );
                  })}
                </ul>

                {result.fraudReport && showReport && (
  <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
    <h4 className="font-semibold text-yellow-800 mb-2">Previous Fraud Report</h4>
    <div className="space-y-2">
      <p><span className="font-medium">Fraud Type:</span> {result.fraudReport.fraudType}</p>
      <p><span className="font-medium">Description:</span> {result.fraudReport.description}</p>
      <p><span className="font-medium">Amount:</span> ₹{result.fraudReport.amount || 'N/A'}</p>
      <p><span className="font-medium">Location:</span> {result.fraudReport.location}</p>
      <p><span className="font-medium">Suspicious Activity:</span> {result.fraudReport.suspiciousActivity}</p>
      <p><span className="font-medium">Evidence:</span> {result.fraudReport.evidenceDescription || 'N/A'}</p>
    </div>
  </div>
)}

                {!result.isValidFormat && (
                  <p className="text-sm text-gray-600 mt-2">
                    Please ensure your ID contains 10-30 alphanumeric characters. This helps maintain security standards.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 text-center text-sm text-gray-600 max-w-2xl mx-auto">
        <p>
          Our ID detection system uses advanced pattern recognition to assess ID numbers.
          While we strive for accuracy, this tool should be used as one of many verification
          methods in your security process.
        </p>
      </div>
    </div>
    </div>
  );
};

export default IdDetectionPage;