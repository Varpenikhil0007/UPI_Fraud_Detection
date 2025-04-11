'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/nav-bar';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Report {
  _id: string;
  transactionId: string;
  fraudType: 'UPI_FRAUD' | 'PHISHING' | 'IMPERSONATION' | 'OTHER';
  description: string;
  amount: number;
  upiId: string;
  deviceInfo: string;
  location: string;
  suspiciousActivity: string;
  evidenceDescription: string;
  status: 'Pending' | 'Under Investigation' | 'Resolved' | 'Rejected';
  attachments: string[];
  createdAt: string;
}

const MyReportsPage = () => {
  const { toast } = useToast();
  const { user, getAuthHeader } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to view your reports.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }

      try {
        const authHeader = getAuthHeader();
        if (!authHeader?.Authorization) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('https://upi-fraud-detection-backend1.onrender.com/api/reports/user', {
          headers: authHeader,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }

        const data = await response.json();
        setReports(data);
      } catch (error: any) {
        console.error('Error fetching reports:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to fetch reports',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [user, toast, getAuthHeader]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="text-green-500" />;
      case 'pending':
        return <Clock className="text-yellow-500" />;
      case 'under investigation':
        return <AlertTriangle className="text-blue-500" />;
      case 'rejected':
        return <AlertTriangle className="text-red-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under investigation':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            My Reports
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track and manage your submitted reports
          </p>
        </motion.div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No reports found</p>
              <Button
                className="mt-4"
                onClick={() => window.location.href = '/report'}
              >
                Submit a Report
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UPI ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fraud Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report) => (
                    <tr key={report._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(report.status)}
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{report.transactionId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.upiId}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.fraudType.replace('_', ' ')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{report.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReportsPage;