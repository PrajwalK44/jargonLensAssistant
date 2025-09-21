import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Brain, Users, Zap, Award } from "lucide-react";
import Link from "next/link";
import NavigationBar from "@/components/navigationBar";
import HeroSection from "@/components/HeroSection";
import ProblemStatement from "@/components/ProblemStatement";
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      
      <NavigationBar />

      {/* Hero Section */}
      <HeroSection/>

      {/* Problem Statement */}
      <ProblemStatement/>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Powerful Features for Legal Clarity
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to understand
              and analyze any legal document
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Universal Document Processing
              </h3>
              <p className="text-gray-400 mb-6">
                Upload documents in any format - PDF, images, or plain text. Our
                AI processes everything instantly.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">PDF document analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Image and scan processing
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Plain text document support
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="bg-gray-700 rounded-lg p-6 mb-4">
                <FileText className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <div className="text-center">
                  <p className="font-semibold mb-2 text-white">
                    Employment Contract.pdf
                  </p>
                  <span className="inline-block px-3 py-1 bg-green-600 text-green-100 text-sm rounded-full">
                    Processing Complete
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold text-white">
                    AI Analysis Complete
                  </span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Original:</p>
                  <p className="text-xs italic mb-3 text-gray-300">
                    "The Employee shall not, during the term of employment and
                    for a period of twenty-four (24) months thereafter..."
                  </p>
                  <p className="text-sm text-gray-400 mb-2">Plain English:</p>
                  <p className="text-sm text-yellow-400">
                    You cannot work for competitors for 2 years after leaving
                    this job.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-4 text-white">
                Plain-Language Summaries
              </h3>
              <p className="text-gray-400 mb-6">
                Our AI transforms complex legal clauses into simple,
                easy-to-understand summaries that anyone can comprehend.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Instant clause translation
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Key term highlighting</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Risk assessment indicators
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                Interactive Q&A Assistant
              </h3>
              <p className="text-gray-400 mb-6">
                Ask specific questions about your document and get instant,
                contextual answers based on the actual content.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">
                    Natural language questions
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Contextual AI responses</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Scenario-based analysis</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <div className="space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2 text-yellow-400">
                    You asked:
                  </p>
                  <p className="text-sm text-gray-300">
                    "What happens if I miss a payment?"
                  </p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2 text-white">
                    AI Response:
                  </p>
                  <p className="text-sm text-gray-300">
                    According to Section 4.2, if you miss a payment by more than
                    15 days, you'll be charged a $50 late fee and the landlord
                    can begin eviction proceedings after 30 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Preview */}
      <section className="py-16 px-4 bg-gray-800/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Learn While You Analyze
          </h2>
          <p className="text-lg text-gray-400 mb-12">
            Build your legal literacy with our gamified learning system
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-4">
                Clarity Points
              </h3>
              <p className="text-gray-400">
                Earn points for understanding clauses and engaging with your
                documents
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌳</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Legal Literacy Tree
              </h3>
              <p className="text-gray-400">
                Watch your knowledge grow as you master different types of legal
                documents
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 text-center border border-gray-700">
              <div className="h-12 w-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Achievement Badges
              </h3>
              <p className="text-gray-400">
                Unlock badges for mastering contracts, leases, terms of service,
                and more
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Link
              href="/progress"
              className="px-8 py-3 border-2 border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500 hover:text-gray-900 transition-colors duration-200"
            >
              View Your Progress
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Stop Signing Documents You Don't Understand
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of users who've taken control of their legal
            documents with LegalGuardian
          </p>
          <Link
            href="/upload"
            className="px-8 py-4 bg-yellow-500 text-gray-900 font-semibold text-lg rounded-lg hover:bg-yellow-400 transition-colors duration-200 inline-block"
          >
            Start Analyzing Documents
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-800/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-yellow-500" />
                <span className="text-lg font-bold text-white">
                  LegalGuardian
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering everyone to understand their legal documents with
                AI-powered analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/features"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/demo"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Demo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link
                    href="/help"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 LegalGuardian. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
