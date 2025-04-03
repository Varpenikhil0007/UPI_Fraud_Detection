'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import NavBar from '@/components/nav-bar';
import { Calculator, IndianRupee, Percent, Calendar, TrendingUp, Activity } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FinancialFeatures() {
  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [loanTenure, setLoanTenure] = useState<number>(12);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  // Profit Calculator States
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [annualRate, setAnnualRate] = useState<number>(15);
  const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
  const [profit, setProfit] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);

  // UPI Transaction States
  const [transactions, setTransactions] = useState<Array<{
    receiver: string;
    amount: number;
    date: string;
  }>>([]);
  const [receiver, setReceiver] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [transactionDate, setTransactionDate] = useState<string>('');

  // EMI Calculator
  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = (interestRate / 12) / 100;
    const tenure = loanTenure;

    const emiAmount = principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenure) / (Math.pow(1 + ratePerMonth, tenure) - 1);
    const totalPayment = emiAmount * tenure;
    const totalInterestAmount = totalPayment - principal;

    setEmi(Math.round(emiAmount));
    setTotalInterest(Math.round(totalInterestAmount));
    setTotalAmount(Math.round(totalPayment));
  };

  // Profit Calculator
  const calculateProfit = () => {
    const rate = annualRate / 100;
    const finalValue = initialInvestment * Math.pow(1 + rate, investmentPeriod);
    const profitAmount = finalValue - initialInvestment;
    setProfit(Math.round(profitAmount));
    setFinalAmount(Math.round(finalValue));
  };

  // UPI Transaction Analysis
  const addTransaction = () => {
    if (receiver && amount && transactionDate) {
      setTransactions([...transactions, { receiver, amount, date: transactionDate }]);
      setReceiver('');
      setAmount(0);
      setTransactionDate('');
    }
  };

  const analyzeTransactions = () => {
    const frequentReceivers = transactions.reduce((acc, curr) => {
      acc[curr.receiver] = (acc[curr.receiver] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const averageAmount = transactions.reduce((sum, curr) => sum + curr.amount, 0) / transactions.length;
    
    return {
      frequentReceivers,
      averageAmount: Math.round(averageAmount),
      totalTransactions: transactions.length
    };
  };

  const analysis = transactions.length > 0 ? analyzeTransactions() : null;

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100 via-pink-50 to-white">
      <NavBar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Financial Features</h1>
            <p className="text-gray-600 mt-2">Comprehensive tools for your financial needs</p>
          </div>

          <Tabs defaultValue="emi" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
              <TabsTrigger value="profit">Profit Calculator</TabsTrigger>
              <TabsTrigger value="upi">UPI Transaction Analyzer</TabsTrigger>
            </TabsList>

            <TabsContent value="emi" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
            <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" /> Loan Amount
                  </label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="bg-white/50"
                  />
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    max={10000000}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Percent className="h-4 w-4" /> Interest Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="bg-white/50"
                  />
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    max={30}
                    step={0.1}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Loan Tenure (months)
                  </label>
                  <Input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="bg-white/50"
                  />
                  <Slider
                    value={[loanTenure]}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    max={360}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={calculateEMI}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Calculator className="mr-2 h-4 w-4" /> Calculate EMI
                </Button>
              </CardFooter>
            </Card>

            <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <CardHeader>
                <CardTitle>EMI Breakdown</CardTitle>
                <CardDescription>Your loan repayment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/30 rounded-lg">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-2xl font-bold text-purple-600">₹ {emi.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white/30 rounded-lg">
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-purple-600">₹ {totalInterest.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-white/30 rounded-lg">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-600">₹ {totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
              </div>
            </TabsContent>

            <TabsContent value="profit" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Investment Details</CardTitle>
                    <CardDescription>Enter your investment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <IndianRupee className="h-4 w-4" /> Initial Investment
                      </label>
                      <Input
                        type="number"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(Number(e.target.value))}
                        className="bg-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Percent className="h-4 w-4" /> Annual Rate (%)
                      </label>
                      <Input
                        type="number"
                        value={annualRate}
                        onChange={(e) => setAnnualRate(Number(e.target.value))}
                        className="bg-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Investment Period (years)
                      </label>
                      <Input
                        type="number"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                        className="bg-white/50"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={calculateProfit}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" /> Calculate Profit
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Profit Breakdown</CardTitle>
                    <CardDescription>Your investment returns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-white/30 rounded-lg">
                        <p className="text-sm text-gray-600">Total Profit</p>
                        <p className="text-2xl font-bold text-purple-600">₹ {profit.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-white/30 rounded-lg">
                        <p className="text-sm text-gray-600">Final Amount</p>
                        <p className="text-2xl font-bold text-purple-600">₹ {finalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upi" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Add Transaction</CardTitle>
                    <CardDescription>Enter transaction details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Receiver UPI ID</label>
                      <Input
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className="bg-white/50"
                        placeholder="receiver@upi"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount</label>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="bg-white/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date</label>
                      <Input
                        type="date"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                        className="bg-white/50"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={addTransaction}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Activity className="mr-2 h-4 w-4" /> Add Transaction
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Transaction Analysis</CardTitle>
                    <CardDescription>Transaction patterns and insights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {transactions.length === 0 ? (
                      <p className="text-center text-gray-500">No transactions added yet</p>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-white/30 rounded-lg">
                          <p className="text-sm text-gray-600">Total Transactions</p>
                          <p className="text-2xl font-bold text-purple-600">{analysis?.totalTransactions}</p>
                        </div>
                        <div className="p-4 bg-white/30 rounded-lg">
                          <p className="text-sm text-gray-600">Average Amount</p>
                          <p className="text-2xl font-bold text-purple-600">₹ {analysis?.averageAmount.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-white/30 rounded-lg">
                          <p className="text-sm text-gray-600">Frequent Receivers</p>
                          <div className="mt-2 space-y-2">
                            {Object.entries(analysis?.frequentReceivers || {}).map(([receiver, count]) => (
                              <div key={receiver} className="flex justify-between items-center">
                                <span className="text-sm">{receiver}</span>
                                <span className="text-sm font-medium">{count} transactions</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}