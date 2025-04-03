'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer'

export default function JatinProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-teal-50">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          href="/blog" 
          className="inline-block mb-8 text-teal-600 hover:text-teal-700 transition-colors"
        >
          ← Back to Team
        </Link>

        <Card className="p-8 backdrop-blur-2xl bg-white/20 border border-white/30 shadow-2xl rounded-2xl hover:shadow-teal-500/10 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Jatin Lal</h1>
            <p className="text-xl text-teal-600 font-medium">User Feedback & Project Promotion Specialist</p>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Led user experience research and feedback collection</li>
                <li>Managed community engagement and stakeholder relations</li>
                <li>Coordinated project demonstrations and presentations</li>
                <li>Developed promotion strategies for project visibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Areas of Expertise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">User Research</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Community Management</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Project Promotion</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Stakeholder Relations</p>
                </div>
                <div className="bg-white/50 p-4 rounded-lg text-center">
                  <p className="font-medium text-gray-900">Content Strategy</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Contributions</h2>
              <div className="space-y-4">
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">User Feedback Integration</h3>
                  <p className="text-gray-600">Implemented a structured feedback system that led to 15 major feature improvements</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Community Growth</h3>
                  <p className="text-gray-600">Built an active community of 1000+ early adopters and beta testers</p>
                </div>
                <div className="bg-white/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Project Visibility</h3>
                  <p className="text-gray-600">Successfully presented the project at 3 major tech conferences</p>
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