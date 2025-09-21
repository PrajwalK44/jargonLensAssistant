import { getBackendUrl } from "../../../lib/api";
("use client");

import { AnalysisDashboard } from "@/components/analysis-dashboard";
import { Shield, ArrowLeft, Download, Share } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AnalysisPageProps {
  params: {
    documentId: string;
  };
}

export default function AnalysisPage({ params }: AnalysisPageProps) {
  const [documentData, setDocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${getBackendUrl()}/api/v1/document/${params.documentId}`,
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        if (res.ok) {
          const data = await res.json();
          setDocumentData(data);
        }
      } catch (err) {
        console.error("Failed to fetch document data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.documentId) {
      fetchDocumentData();
    }
  }, [params.documentId]);
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800/50 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/upload"
              className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-yellow-400 transition-colors duration-200 rounded-lg hover:bg-gray-800/50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Upload
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
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-200 rounded-lg">
              <Download className="h-4 w-4" />
              Export Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 hover:border-yellow-500 hover:text-yellow-400 transition-colors duration-200 rounded-lg">
              <Share className="h-4 w-4" />
              Share
            </button>
            <Link
              href="/login"
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading document analysis...</p>
            </div>
          </div>
        ) : (
          <AnalysisDashboard documentId={params.documentId} />
        )}
      </main>
    </div>
  );
}
