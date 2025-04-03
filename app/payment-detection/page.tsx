'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/nav-bar';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface TransactionData {
  type: string;
  amount: number;
  senderId: string;
  oldBalanceOrg: number;
  newBalanceOrg: number;
  receiverId: string;
  oldBalanceDest: number;
  newBalanceDest: number;
}

const PaymentDetectionPage = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: Replace with actual auth state
  const [transactionData, setTransactionData] = useState<TransactionData>({
    type: '',
    amount: 0,
    senderId: '',
    oldBalanceOrg: 0,
    newBalanceOrg: 0,
    receiverId: '',
    oldBalanceDest: 0,
    newBalanceDest: 0
  });
  const [result, setResult] = useState<{ isFraud: boolean; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof TransactionData, value: string) => {
    setTransactionData(prev => ({
      ...prev,
      [field]: field === 'type' ? value : Number(value) || value
    }));
  };

  const handleDetect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/detect-fraud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze transaction');
      }

      const data = await response.json();
      setResult(data);

      if (data.isFraud) {
        toast({
          title: 'Warning: Potential Fraud Detected',
          description: 'This transaction shows signs of fraudulent activity. Please review carefully.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Transaction Analysis Complete',
          description: 'No suspicious activity detected in this transaction.',
          variant: 'default',
        });
      }
    } catch (error) {
      console.error('Error detecting fraud:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze transaction',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReport = () => {
    if (!isLoggedIn) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to report suspicious transactions.',
        variant: 'destructive',
      });
      return;
    }

    // Convert all transaction data values to strings
    const stringifiedData = Object.entries(transactionData).reduce((acc, [key, value]) => ({
      ...acc,
      [key]: value.toString()
    }), {});

    // Create URL parameters from stringified transaction data
    const params = new URLSearchParams({
      ...stringifiedData,
      fraudScore: (result?.confidence || 0).toString()
    });

    // Redirect to the report page with transaction data
    window.location.href = `/report?${params.toString()}`;
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
            Payment Fraud Detection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze transaction patterns to detect potential fraudulent activities using advanced machine learning.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Type
                </label>
                <Input
                  type="text"
                  placeholder="e.g., TRANSFER, PAYMENT"
                  value={transactionData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={transactionData.amount || ''}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter sender ID"
                  value={transactionData.senderId}
                  onChange={(e) => handleInputChange('senderId', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender's Old Balance
                </label>
                <Input
                  type="number"
                  placeholder="Enter old balance"
                  value={transactionData.oldBalanceOrg || ''}
                  onChange={(e) => handleInputChange('oldBalanceOrg', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver ID
                </label>
                <Input
                  type="text"
                  placeholder="Enter receiver ID"
                  value={transactionData.receiverId}
                  onChange={(e) => handleInputChange('receiverId', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver's Old Balance
                </label>
                <Input
                  type="number"
                  placeholder="Enter old balance"
                  value={transactionData.oldBalanceDest || ''}
                  onChange={(e) => handleInputChange('oldBalanceDest', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sender's New Balance
                </label>
                <Input
                  type="number"
                  placeholder="Enter new balance"
                  value={transactionData.newBalanceOrg || ''}
                  onChange={(e) => handleInputChange('newBalanceOrg', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Receiver's New Balance
                </label>
                <Input
                  type="number"
                  placeholder="Enter new balance"
                  value={transactionData.newBalanceDest || ''}
                  onChange={(e) => handleInputChange('newBalanceDest', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleDetect}
              className="bg-purple-600 hover:bg-purple-700 text-lg px-8"
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Detect Fraud'}
            </Button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-lg ${result.isFraud ? 'bg-red-50' : 'bg-green-50'}`}
            >
              <div className="flex items-start gap-4">
                {result.isFraud ? (
                  <AlertTriangle className="text-red-500 mt-1" />
                ) : (
                  <CheckCircle className="text-green-500 mt-1" />
                )}
                <div>
                  <h3 className={`text-xl font-semibold ${result.isFraud ? 'text-red-700' : 'text-green-700'}`}>
                    {result.isFraud ? 'Potential Fraud Detected' : 'Transaction Appears Safe'}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Confidence Level: {(result.confidence * 100).toFixed(2)}%
                  </p>
                  <p className="text-sm text-gray-500 mt-4">
                    Note: This is an automated analysis and should be used as one of many verification methods.
                    The prediction is not 100% accurate and should be verified with additional security measures.
                  </p>
                  {result.isFraud && (
                    <div className="mt-4">
                      <Button
                        onClick={handleReport}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Report This Transaction
                      </Button>
                      {!isLoggedIn && (
                        <p className="text-sm text-red-600 mt-2">
                          Please <Link href="/auth/login" className="underline">login</Link> to report suspicious transactions.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <p>
            Our system uses advanced machine learning algorithms, including Isolation Forest,
            to analyze transaction patterns and identify potential fraudulent activities.
            The analysis is based on various factors including transaction amount, account balances,
            and historical patterns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetectionPage;