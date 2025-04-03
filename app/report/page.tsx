'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/nav-bar';
import { useToast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Suspense } from 'react';

interface TransactionData {
  type: string;
  amount: number;
  senderId: string;
  oldBalanceOrg: number;
  newBalanceOrg: number;
  receiverId: string;
  oldBalanceDest: number;
  newBalanceDest: number;
  fraudScore?: number;
}

const ReportPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [transactionData, setTransactionData] = useState<TransactionData>({
    type: '',
    amount: 0,
    senderId: '',
    oldBalanceOrg: 0,
    newBalanceOrg: 0,
    receiverId: '',
    oldBalanceDest: 0,
    newBalanceDest: 0,
    fraudScore: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Parse URL parameters to pre-fill the form
    const type = searchParams.get('type') || '';
    const amount = parseFloat(searchParams.get('amount') || '0');
    const senderId = searchParams.get('senderId') || '';
    const oldBalanceOrg = parseFloat(searchParams.get('oldBalanceOrg') || '0');
    const newBalanceOrg = parseFloat(searchParams.get('newBalanceOrg') || '0');
    const receiverId = searchParams.get('receiverId') || '';
    const oldBalanceDest = parseFloat(searchParams.get('oldBalanceDest') || '0');
    const newBalanceDest = parseFloat(searchParams.get('newBalanceDest') || '0');
    const fraudScore = parseFloat(searchParams.get('fraudScore') || '0');

    setTransactionData({
      type,
      amount,
      senderId,
      oldBalanceOrg,
      newBalanceOrg,
      receiverId,
      oldBalanceDest,
      newBalanceDest,
      fraudScore
    });
  }, [searchParams]);

  const handleInputChange = (field: keyof TransactionData, value: string) => {
    setTransactionData(prev => ({
      ...prev,
      [field]: field === 'type' ? value : Number(value) || value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to report suspicious transactions.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionType: transactionData.type,
          amount: transactionData.amount,
          senderId: transactionData.senderId,
          receiverId: transactionData.receiverId,
          balance: {
            sender: {
              old: transactionData.oldBalanceOrg,
              new: transactionData.newBalanceOrg
            },
            receiver: {
              old: transactionData.oldBalanceDest,
              new: transactionData.newBalanceDest
            }
          },
          fraudScore: transactionData.fraudScore,
        }),
      });

      if (response.ok) {
          const data = await response.json();
          toast({
            title: 'Report Submitted',
            description: data.message || 'Transaction reported successfully',
            variant: 'default',
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit report');
        }
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Failed to submit report',
        variant: 'destructive',
      });
      console.error('Error reporting fraud:', error);
      toast({
        title: 'Report Failed',
        description: error instanceof Error ? error.message : 'Failed to submit report',
        variant: 'destructive',
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
            Report Suspicious Transaction
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us maintain a secure payment environment by reporting suspicious transactions.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit}>
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
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-lg px-8 flex items-center gap-2"
              disabled={isLoading}
            >
              <FileText className="w-5 h-5" />
              {isLoading ? 'Submitting Report...' : 'Submit Report'}
            </Button>
          </div>
        </form>
      </div>

      <div className="mt-12 text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-2">Why Report?</h3>
          <p>
            Your reports help us identify and prevent fraudulent activities across our payment network.
            Our team carefully investigates each report to maintain the security of our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReportPage />
    </Suspense>
  );
}