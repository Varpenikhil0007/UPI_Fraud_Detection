'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer'

export default function AnuragProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-orange-600 hover:text-orange-700 transition-colors"
        >
          ← Back to Team
        </Link>

        <Card className="p-8 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl hover:shadow-orange-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Mirpagar Anurag</h1>
            <p className="text-xl text-orange-600 font-medium">Project Infrastructure & Security Lead</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Established core project infrastructure and architecture</li>
                <li>Implemented comprehensive security protocols</li>
                <li>Designed and maintained CI/CD pipeline</li>
                <li>Managed system scalability and performance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">DevOps</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Security Protocols</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Cloud Infrastructure</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">System Architecture</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">CI/CD Pipeline</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Achievements</h2>
              <div className="space-y-4">
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Security Implementation</h3>
                  <p className="text-gray-600">Achieved zero security breaches through robust security measures and regular audits</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Infrastructure Scalability</h3>
                  <p className="text-gray-600">Designed system architecture capable of handling 10,000+ concurrent users</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Deployment Efficiency</h3>
                  <p className="text-gray-600">Reduced deployment time by 75% through automated CI/CD pipeline implementation</p>
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