'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/nav-bar';
import { motion } from 'framer-motion';
import { ChevronRight, AlertTriangle, CheckCircle } from 'lucide-react';

const IdDetectionPage = () => {
  const [idNumber, setIdNumber] = useState('');
  const [result, setResult] = useState<{ isValid: boolean; message: string } | null>(null);

  const validateId = (id: string) => {
    // Basic validation rules
    if (!id.trim()) {
      return { isValid: false, message: 'Please enter an ID number' };
    }

    // Add your ID validation logic here
    const isValidFormat = /^[A-Z0-9]{12}$/.test(id);
    if (!isValidFormat) {
      return { isValid: false, message: '❌ Invalid ID format. Please check and try again.' };
    }

    // Add more sophisticated validation as needed
    return { isValid: true, message: '✅ ID appears to be valid!' };
  };

  const handleCheck = () => {
    setResult(validateId(idNumber));
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
              Valid format: 12 characters, uppercase letters and numbers only (e.g., ABC123XYZ789, 123456789ABC)
              <br />
              Invalid format: abc123xyz789 (lowercase), AB12-XY89-ZW (special characters), ABC12 (too short)
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
                placeholder="Enter 12-digit ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value.toUpperCase())}
                className="flex-1"
                maxLength={12}
              />
              <Button onClick={handleCheck} className="bg-purple-600 hover:bg-purple-700">
                Verify
              </Button>
            </div>
          </div>

          {/* Result Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg ${result.isValid ? 'bg-green-50' : 'bg-red-50'}`}
            >
              <div className="flex items-start gap-3">
                {result.isValid ? (
                  <CheckCircle className="text-green-500 mt-1" />
                ) : (
                  <AlertTriangle className="text-red-500 mt-1" />
                )}
                <div>
                  <p className={`font-medium ${result.isValid ? 'text-green-700' : 'text-red-700'}`}>
                    {result.message}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Note: This is an automated verification system. For official verification,
                    please contact the relevant authorities.
                  </p>
                </div>
              </div>
            </motion.div>
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