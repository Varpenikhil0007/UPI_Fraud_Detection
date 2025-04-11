'use client';

import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NavBar from '@/components/nav-bar';
import { useToast } from '@/components/ui/use-toast';
import { FileText } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

interface ReportData {
  transactionId: string;
  fraudType: string;
  description: string;
  amount: number;
  upiId: string;
  deviceInfo: string;
  location: string;
  suspiciousActivity: string;
  evidenceDescription: string;
  attachments?: string[];
  status?: string;
}

const ReportPage = () => {
  const { toast } = useToast();
  const { user, getAuthHeader } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<ReportData>({
    transactionId: '',
    fraudType: '',
    description: '',
    amount: 0,
    upiId: '',
    deviceInfo: '',
    location: '',
    suspiciousActivity: '',
    evidenceDescription: '',
    attachments: [],
  });

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

    console.log('Current user:', user);
    setIsLoading(true);
    try {
      const baseUrl =  'https://upi-fraud-detection-backend1.onrender.com/api';
      console.log('Making request to:', `${baseUrl}/reports`);
      
      // Get auth header and ensure token exists
      const authHeader = getAuthHeader();
      if (!authHeader?.Authorization) {
        throw new Error('Authentication token not found');
      }

      // Ensure user ID is available and use the correct field (_id or id)
      // Extract token and decode it to get userId
      const token = authHeader.Authorization.split(' ')[1];
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded token payload:', decodedToken);
      const userId = decodedToken.userId || decodedToken._id || decodedToken.id;
      console.log('Extracted userId:', userId);

      if (!userId) {
        throw new Error('User ID not found in token');
      }

      const response = await fetch(`${baseUrl}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeader
        },
        body: JSON.stringify({
          ...reportData,
          userId: userId,
          status: 'Pending' // Match the enum in Report model
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'Failed to parse error response'
        }));
        console.error('API Error:', errorData);
        throw new Error(errorData.error || `Failed to submit report: ${response.status}`);
      }

      const data = await response.json().catch(() => ({
        message: 'Successfully submitted but failed to parse response'
      }));
      
      toast({
        title: 'Report Submitted',
        description: data.message || 'Transaction reported successfully',
        variant: 'default',
      });
      setReportData({
        transactionId: '',
        fraudType: '',
        description: '',
        amount: 0,
        upiId: '',
        deviceInfo: '',
        location: '',
        suspiciousActivity: '',
        evidenceDescription: '',
        attachments: [],
      });
    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Failed to submit report',
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
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Report Suspicious Transaction
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Help us maintain a secure payment environment by reporting suspicious transactions.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
              <Input
                required
                value={reportData.transactionId}
                onChange={(e) => setReportData({ ...reportData, transactionId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fraud Type</label>
              <select
                required
                className="w-full p-2 border rounded-md"
                value={reportData.fraudType}
                onChange={(e) => setReportData({ ...reportData, fraudType: e.target.value })}
              >
                <option value="">Select fraud type</option>
                <option value="UPI_FRAUD">UPI Fraud</option>
                <option value="PHISHING">Phishing</option>
                <option value="IMPERSONATION">Impersonation</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Input
                required
                value={reportData.description}
                onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <Input
                required
                type="number"
                min="0"
                value={reportData.amount}
                onChange={(e) => setReportData({ ...reportData, amount: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
              <Input
                required
                value={reportData.upiId}
                onChange={(e) => setReportData({ ...reportData, upiId: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Device Information</label>
              <Input
                required
                value={reportData.deviceInfo}
                onChange={(e) => setReportData({ ...reportData, deviceInfo: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <Input
                required
                value={reportData.location}
                onChange={(e) => setReportData({ ...reportData, location: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Suspicious Activity</label>
              <Input
                required
                value={reportData.suspiciousActivity}
                onChange={(e) => setReportData({ ...reportData, suspiciousActivity: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evidence Description</label>
              <Input
                required
                value={reportData.evidenceDescription}
                onChange={(e) => setReportData({ ...reportData, evidenceDescription: e.target.value })}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
                disabled={isLoading}
              >
                <FileText className="w-5 h-5" />
                {isLoading ? 'Submitting Report...' : 'Submit Report'}
              </Button>
            </div>
          </form>
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