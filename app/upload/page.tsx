import { DocumentUpload } from "@/components/document-upload";
import { Shield, ArrowLeft, FileText, ImageIcon, Type } from "lucide-react";
import Link from "next/link";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Shield className="h-6 w-6 text-yellow-500" />
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"></div>
              </div>
              <span className="text-xl font-bold text-white">
                LegalGuardian
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gray-800/80 backdrop-blur-sm text-yellow-400 text-sm font-medium rounded-full mb-6">
            AI Document Analysis
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Upload Your <span className="text-yellow-400">Legal Document</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Upload any legal document in PDF, image, or text format. Our AI will
            analyze it and provide you with a clear, understandable breakdown.
          </p>
        </div>

        {/* Supported Formats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-yellow-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="relative mb-4">
              <FileText className="h-12 w-12 text-yellow-500 mx-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              PDF Documents
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Upload contracts, agreements, and other PDF legal documents
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-yellow-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="relative mb-4">
              <ImageIcon className="h-12 w-12 text-yellow-500 mx-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Images & Scans
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Take photos of physical documents or upload scanned images
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-yellow-500/30 hover:bg-gray-800/70 transition-all duration-300 group">
            <div className="relative mb-4">
              <Type className="h-12 w-12 text-yellow-500 mx-auto transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Plain Text
            </h3>
            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Copy and paste text directly from digital documents
            </p>
          </div>
        </div>

        {/* Upload Component */}
        <div className="mb-12">
          <DocumentUpload />
        </div>

        {/* Security Notice */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Shield className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"></div>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white">
                Your Privacy is Protected
              </h3>
              <p className="text-sm text-gray-400">
                All documents are processed securely and encrypted. We never
                store your personal legal documents on our servers. Your
                analysis is private and only accessible to you.
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-white">Upload Document</h3>
              <p className="text-sm text-gray-400">
                Choose your legal document in any supported format
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-white">AI Analysis</h3>
              <p className="text-sm text-gray-400">
                Our AI processes and breaks down complex legal language
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/30">
                <span className="text-yellow-400 font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-white">Get Results</h3>
              <p className="text-sm text-gray-400">
                Receive clear summaries and ask questions about your document
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
