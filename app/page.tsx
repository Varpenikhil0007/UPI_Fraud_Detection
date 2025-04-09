import Link from "next/link"
import { ChevronRight, Shield, Globe, Zap, BarChart4, Check } from "lucide-react"
import NavBar from "@/components/nav-bar"
import ChartCard from "@/components/chart-card"
import GradientBackground from "@/components/gradient-background"
import GlobeAnimation from "@/components/globe-animation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-32">
          <div className="container mx-auto px-4 py-12 relative z-10">
            {/* IFDAS Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                    fill="white"
                  />
                  <path
                    d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium">IFDAS-JJMN</h2>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-6 mb-16 text-sm">
              <Link href="#" className="text-gray-700 font-medium">
                Overview
              </Link>
              <Link href="#" className="text-purple-600 font-medium">
                IFDAS for Fraud Teams
              </Link>
              {/* <Link href="#" className="text-gray-700 font-medium">
                Pricing
              </Link> */}
              <Link href="/UPI_ResearchPaper[2].pdf" className="text-gray-700 font-medium">
                Docs
              </Link>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                  Advanced UPI Fraud Detection with Machine Learning
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  IFDAS: Isolation Forest Fraud Detection & Analysis System powered by real-time transaction analysis
                  and predictive ML models
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/upi-fraud-detection"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    Start now
                    <ChevronRight size={16} />
                  </Link>
                  {/* <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors"
                  >
                    Contact sales
                    <ChevronRight size={16} />
                  </Link> */}
                </div>
              </div>
              <div className="transform transition-all duration-500 hover:scale-105">
                <ChartCard />
              </div>
            </div>
          </div>

          <GradientBackground />
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Powerful fraud prevention, built for your business
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                IFDAS uses machine learning to identify and block fraud. It's built into Jagruk and adapts to your
                business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
                icon={<Shield className="w-8 h-8 text-purple-600" />}
                title="Real-time UPI Monitoring"
                description="Analyze every transaction instantly using our ML models trained on millions of UPI payment patterns"
              />
              <FeatureCard
                icon={<Globe className="w-8 h-8 text-purple-600" />}
                title="Anomaly Detection"
                description="Identify suspicious transaction patterns and potential fraud markers in real-time"
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-purple-600" />}
                title="Predictive Risk Scoring"
                description="ML-powered risk assessment system that predicts fraud probability for each transaction"
              />
              <FeatureCard
                icon={<BarChart4 className="w-8 h-8 text-purple-600" />}
                title="Transaction Forensics"
                description="Deep analysis of payment metadata and behavioral patterns for fraud investigation"
              />
              <FeatureCard
                icon={<Check className="w-8 h-8 text-purple-600" />}
                title="Adaptive Learning"
                description="Self-improving models that continuously learn from new fraud patterns and attack vectors"
              />
              <FeatureCard
                icon={<Shield className="w-8 h-8 text-purple-600" />}
                title="Regulatory Compliance"
                description="Pre-built templates for RBI compliance reports and audit-ready documentation"
              />
            </div>
          </div>
        </section>

        {/* Network Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Powered by the Jagruk network</h2>
                <p className="text-lg text-gray-600 mb-8 text-center">
                  IFDAS draws from Jagruk's global network of businesses to identify and block fraud patterns. The more
                  businesses use Jagruk, the better IFDAS gets at detecting fraud.
                </p>
                <ul className="space-y-4">
                  {[
                    "Trained on data from millions of global payments",
                    "Adapts to emerging fraud patterns in real-time",
                    "Learns from your payments's unique patterns",
                    "Improves with every transaction processed",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 rounded-full p-1">
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="flex flex-col items-center justify-center text-center mb-8 bg-white p-8 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 bg-clip-text text-transparent animate-gradient">
                  99.9% Accuracy
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Our advanced machine learning models achieve industry-leading accuracy in fraud detection.
                </p>
              </div> */}
              <div className="bg-white p-6 rounded-xl shadow-lg h-[300px] transform transition-all duration-1000 hover:translate-y-1 hover:scale-105 motion-safe:animate-float hover:shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <GlobeAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Comments by Authorities worldwide</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Warned about rising digital fraud and urged banks to strengthen security.",
                  author: "Sanjay Malhotra ",
                  role: "RBI Governor",
                },
                {
                  quote: "Stated that Google Pay prevented scams worth ₹12,000 crore in 2023.",
                  author: "Ambarish Kenghe",
                  role: "Google Pay VP",
                },
                {
                  quote: "Alerted users about UPI scams using ‘request money’ links to trick them.",
                  author: "Bala Parthasarathy",
                  role: "MoneyTap CEO",
                },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="bg-gray-50 p-6 rounded-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 text-purple-600">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11 7H7.5C6.12 7 5 8.12 5 9.5C5 10.88 6.12 12 7.5 12H9V14.5C9 15.88 7.88 17 6.5 17C5.8 17 5.27 16.67 5 16.18V19C5 19.55 5.45 20 6 20H10C10.55 20 11 19.55 11 19V7ZM20 7H16.5C15.12 7 14 8.12 14 9.5C14 10.88 15.12 12 16.5 12H18V14.5C18 15.88 16.88 17 15.5 17C14.8 17 14.27 16.67 14 16.18V19C14 19.55 14.45 20 15 20H19C19.55 20 20 19.55 20 19V7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <p className="mb-6 text-gray-700">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 animate-pulse"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to fight fraud with Jagruk IFDAS?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses using IFDAS to protect against fraud and reduce chargebacks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/campaign">
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 transition-transform hover:scale-105"
                >
                  Start now
                </Button>
              </Link>
              {/* <Button
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10 rounded-full px-8 transition-transform hover:scale-105"
              >
                Contact sales
              </Button> */}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Frequently asked questions</h2>

            <div className="max-w-3xl mx-auto grid gap-6">
              {[
                {
                  question: "How does Jagruk IFDAS work?",
                  answer:
                    "IFDAS uses machine learning to identify and block fraud. It analyzes patterns across millions of businesses on Jagruk and adapts to your unique business patterns.",
                },
                {
                  question: "Is IFDAS included with my Jagruk account?",
                  answer:
                    "Basic IFDAS features are included with all Jagruk accounts. IFDAS for Fraud Teams is available for an additional fee and provides advanced fraud prevention tools.",
                },
                {
                  question: "Can I customize IFDAS's fraud prevention rules?",
                  answer:
                    "Yes, you can create custom rules to block or allow specific transactions based on your business needs. IFDAS for Fraud Teams provides even more customization options.",
                },
                {
                  question: "How does IFDAS compare to other fraud prevention solutions?",
                  answer:
                    "IFDAS is built into Jagruk and benefits from data across millions of businesses. It adapts to your business patterns and provides real-time protection without adding friction to the checkout process.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="border-b border-gray-200 pb-6 transition-all duration-300 hover:bg-gray-50 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="py-20 relative bg-gradient-to-br from-purple-500/10 to-pink-500/20">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="relative bg-white backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 animate-pulse"></div>
              <div className="relative p-8 space-y-6">
                <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Send us your feedback
                </h2>
                <form 
                  action="mailto:varpenikhil07@gmail.com" 
                  method="POST"
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 placeholder-gray-400 h-32"
                        placeholder="Your feedback..."
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2"
                  >
                    <span className="animate-pulse">✨</span>
                    Send Message
                    <span className="animate-pulse">✨</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}

import { FeatureCardProps } from "@/types/feature-card"

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

