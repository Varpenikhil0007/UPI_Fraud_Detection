'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer';

const AlertEducationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-navy-900">
            Stay Safe from UPI Fraud
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Essential tips and guidelines to protect your transactions and personal information
          </p>
        </section>

        {/* Prevention Steps */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-navy-900 text-center">
            5-Step Fraud Prevention Guide
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Verify Requests',
                content: 'Always confirm payment requests through official apps'
              },
              {
                title: 'Check URLs',
                content: 'Look for HTTPS and padlock icon in browser'
              },
              {
                
                title: 'Enable 2FA',
                content: 'Use two-factor authentication for all accounts'
              },
              {
                title: 'Monitor Accounts',
                content: 'Review transaction history regularly'
              },
              {
                title: 'Report Suspicions',
                content: 'Immediately contact your bank if suspicious'
              }
            ].map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-gray-600">
                  {step.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Flowchart Section */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-navy-900 text-center">
            Detailed Fraud Detection Flow
          </h2>
          
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
            <svg viewBox="0 0 800 600" className="w-full h-auto">
              {/* Flowchart elements with enhanced details */}
              <rect x="50" y="50" width="200" height="60" rx="10" className="fill-purple-100 stroke-purple-600" />
              <text x="150" y="85" className="text-sm font-semibold fill-navy-900" textAnchor="middle">Transaction Initiated</text>

              <path d="M150 110 L150 150" className="stroke-purple-600" />
              <polygon points="145,140 155,140 150,150" className="fill-purple-600" />

              <rect x="50" y="160" width="200" height="60" rx="10" className="fill-purple-100 stroke-purple-600" />
              <text x="150" y="195" className="text-sm font-semibold fill-navy-900" textAnchor="middle">Verify Recipient Details</text>

              <path d="M150 220 L150 260" className="stroke-purple-600" />
              <polygon points="145,250 155,250 150,260" className="fill-purple-600" />

              <rect x="50" y="270" width="200" height="60" rx="10" className="fill-purple-100 stroke-purple-600" />
              <text x="150" y="305" className="text-sm font-semibold fill-navy-900" textAnchor="middle">Check Transaction Pattern</text>

              {/* New detection steps */}
              <path d="M150 330 L150 370" className="stroke-purple-600" />
              <polygon points="145,360 155,360 150,370" className="fill-purple-600" />

              <rect x="50" y="380" width="200" height="60" rx="10" className="fill-purple-100 stroke-purple-600" />
              <text x="150" y="415" className="text-sm font-semibold fill-navy-900" textAnchor="middle">Cross-check with Blacklist</text>

              <path d="M150 440 L150 480" className="stroke-purple-600" />
              <polygon points="145,470 155,470 150,480" className="fill-purple-600" />

              <rect x="50" y="490" width="200" height="60" rx="10" className="fill-purple-100 stroke-purple-600" />
              <text x="150" y="525" className="text-sm font-semibold fill-navy-900" textAnchor="middle">Flag Suspicious Activity</text>
            </svg>
          </div>
        </section>

        {/* Scam Interaction Diagram */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-navy-900 text-center">
            Common UPI Scam Scenario
          </h2>
          
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              <g transform="translate(100,50)">
                {/* Scammer */}
                <circle cx="100" cy="150" r="40" className="fill-red-100 stroke-red-600" />
                <text x="100" y="150" className="text-sm font-semibold fill-navy-900" textAnchor="middle" dy="5">Scammer</text>
                
                {/* Victim */}
                <circle cx="500" cy="150" r="40" className="fill-green-100 stroke-green-600" />
                <text x="500" y="150" className="text-sm font-semibold fill-navy-900" textAnchor="middle" dy="5">Victim</text>

                {/* Phishing Message */}
                <path d="M140 150 L460 150" className="stroke-yellow-500" strokeDasharray="4" />
                <text x="300" y="140" className="text-xs fill-yellow-700" textAnchor="middle">Fake Payment Request</text>

                {/* Money Flow */}
                <path d="M500 190 L500 250 L100 250 L100 190" className="stroke-red-500" />
                <text x="300" y="240" className="text-xs fill-red-600" textAnchor="middle">Unauthorized Transaction</text>
                <polygon points="500,190 495,200 505,200" className="fill-red-500" />
              </g>
            </svg>
          </div>
        </section>

       
        
        {/* Common Scenarios */}
        <section className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-navy-900 text-center">
            Common Fraud Patterns
          </h2>
          
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg border-l-4 border-purple-600 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-navy-900">Fake Payment Requests</h3>
              <p className="text-gray-600">
                Fraudsters send fake payment collect requests pretending to be legitimate services
              </p>
            </div>
            
            <div className="p-6 bg-white rounded-lg border-l-4 border-purple-600 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-navy-900">QR Code Scams</h3>
              <p className="text-gray-600">
                Modified QR codes that redirect payments to attacker accounts
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
             { <Footer /> }
      {/* Footer would be imported here */}
    </div>
  )
}

export default AlertEducationPage