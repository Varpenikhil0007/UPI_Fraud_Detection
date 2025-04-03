'use client'

import { Card } from '@/components/ui/card'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer'
import Link from 'next/link'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Social Media Floating Buttons */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 space-y-2">
          <a href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085c.626 1.957 2.444 3.38 4.6 3.42a9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/shareArticle" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.332-1.756-1.332-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>

        {/* Introduction Section */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">UPI Fraud Detection System</h1>
          
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Name:</span> Varpe Nikhil</p>
              <p><span className="font-medium">College:</span> Pravara Rural Engineering College</p>
              <p><span className="font-medium">Department:</span> BE IT</p>
              <p><span className="font-medium">University:</span> Savitribai Phule Pune University</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h2 className="text-xl font-semibold mb-3">Aryan Jadhav</h2>
              <p className="text-gray-600 mb-4">Backend Architecture & System Design</p>
              <p className="text-sm text-gray-500 mb-4">
                Designed and implemented the core fraud detection algorithms,
                optimized database queries, and managed API integrations.
              </p>
              <Link href="/team/aryan" className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300">
                View Profile
              </Link>
            </Card>

            <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h2 className="text-xl font-semibold mb-3">Jatin Lal</h2>
              <p className="text-gray-600 mb-4">User Feedback & Project Promotion</p>
              <p className="text-sm text-gray-500 mb-4">
                Led user experience research, managed community feedback integration,
                and spearheaded project promotion through various channels.
              </p>
              <Link href="/team/jatin" className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300">
                View Profile
              </Link>
            </Card>

            <Card className="p-6 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h2 className="text-xl font-semibold mb-3">Mirpagar Anurag</h2>
              <p className="text-gray-600 mb-4">Project Infrastructure & Security</p>
              <p className="text-sm text-gray-500 mb-4">
                Architected the project foundation, implemented robust security measures,
                and established the development infrastructure.
              </p>
              <Link href="/team/anurag" className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300">
                View Profile
              </Link>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-600">
              This system leverages machine learning algorithms to detect and prevent fraudulent UPI transactions in real-time. 
              By analyzing transaction patterns and user behavior, it provides an additional layer of security for digital payments.
            </p>
          </Card>
        </section>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">The Growing Threat of UPI Fraud</h2>
          <Card className="p-6">
            <p className="text-gray-600">
              With the rapid adoption of UPI payments in India, fraud cases have increased by 300% in the last two years. 
              Our solution addresses critical vulnerabilities like phishing attacks, QR code tampering, and fake payment requests 
              through advanced pattern recognition and real-time monitoring.
            </p>
          </Card>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Isolation Forest</h3>
              <p className="text-gray-600">Anomaly detection algorithm for identifying suspicious transactions</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">React & Next.js</h3>
              <p className="text-gray-600">Frontend framework for building responsive user interfaces</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Node.js</h3>
              <p className="text-gray-600">Backend runtime for handling real-time transaction processing</p>
            </Card>
            <Card className="p-6">
              
              <p className="text-gray-600">NoSQL database for storing transaction records and user patterns</p>
            </Card>
          </div>
        </section>

        {/* Project Journey */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">Development Journey</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-semibold">Initial Exploration with CNN</h3>
                <p className="text-gray-600 mt-2">
                  Started with Convolutional Neural Networks for pattern recognition, but faced challenges 
                  with real-time performance and imbalanced datasets.
                </p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-semibold">Switch to Isolation Forest</h3>
                <p className="text-gray-600 mt-2">
                  Adopted Isolation Forest algorithm for its efficiency in anomaly detection and 
                  ability to handle high-dimensional transaction data.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Real-time Monitoring</h3>
              <p className="text-gray-600">24/7 transaction tracking with instant fraud alerts</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Risk Scoring</h3>
              <p className="text-gray-600">Dynamic risk assessment for each transaction</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">EMI Calculator</h3>
              <p className="text-gray-600">Integrated financial tool for payment planning</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Detailed Reporting</h3>
              <p className="text-gray-600">Comprehensive fraud analysis and audit trails</p>
            </Card>
          </div>
        </section>

        {/* Challenges & Solutions */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">Challenges Overcome</h2>
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">!</div>
                <div>
                  <h3 className="text-xl font-semibold">Data Imbalance</h3>
                  <p className="text-gray-600">Implemented synthetic data generation using SMOTE techniques</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center mr-4">!</div>
                <div>
                  <h3 className="text-xl font-semibold">Model Accuracy</h3>
                  <p className="text-gray-600">Enhanced through ensemble learning and hyperparameter tuning</p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Future Enhancements */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-navy-900 mb-6">Future Roadmap</h2>
          <Card className="p-6">
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Integration with banking APIs for direct fraud reporting</li>
              <li>Enhanced biometric authentication measures</li>
              <li>Adaptive AI models for evolving fraud patterns</li>
              <li>Multi-language support for broader accessibility</li>
            </ul>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}