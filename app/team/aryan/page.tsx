'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer'

export default function AryanProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-purple-600 hover:text-purple-700 transition-colors"
        >
          ← Back to Team
        </Link>

        <Card className="p-8 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl hover:shadow-purple-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Aryan Jadhav</h1>
            <p className="text-xl text-purple-600 font-medium">Backend Architecture & System Design Lead</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Designed and implemented core fraud detection algorithms</li>
                <li>Optimized database queries for real-time transaction processing</li>
                <li>Developed API integrations with banking systems</li>
                <li>Implemented machine learning models for fraud pattern recognition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Python</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Machine Learning</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">SQL</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">API Design</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">System Architecture</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Achievements</h2>
              <div className="space-y-4">
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Fraud Detection Accuracy</h3>
                  <p className="text-gray-600">Achieved 99.5% accuracy in fraud detection through advanced algorithm optimization</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">System Performance</h3>
                  <p className="text-gray-600">Reduced transaction processing time by 60% through database optimization</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">API Integration</h3>
                  <p className="text-gray-600">Successfully integrated with 5 major banking systems with zero downtime</p>
                </div>
              </div>
            </section>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}