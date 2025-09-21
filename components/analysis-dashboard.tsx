"use client";
import { getBackendUrl } from "../lib/api";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentChat } from "@/components/document-chat";
import {
  FileText,
  AlertTriangle,
  Clock,
  MessageSquare,
  BarChart,
  Shield,
  Loader2,
} from "lucide-react";

// Props remain the same
interface AnalysisDashboardProps {
  documentId: string;
}

// Interface updated to match new backend structure
interface Risk {
  risk_title: string;
  risk_description: string;
  risk_score: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  impact: string;
  likelihood: "Low" | "Medium" | "High";
}

interface Issue {
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
}

interface AnalysisData {
  document_id: string;
  document_name: string;
  summary: string;
  riskScore: number;
  issuesCount: number;
  analysis: string;
  risks: Risk[];
  issues: Issue[];
  recommendations: string;
  status: string;
}

// Helper function to determine risk level and associated styles (to avoid repetition)
const getRiskProfile = (score: number) => {
  if (score > 7) {
    return { level: "High Risk", className: "border-red-500 text-red-400" };
  }
  if (score > 4) {
    return {
      level: "Moderate Risk",
      className: "border-yellow-500 text-yellow-400",
    };
  }
  return { level: "Low Risk", className: "border-green-500 text-green-400" };
};

export function AnalysisDashboard({ documentId }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  // Dedicated error state for better UX
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use an AbortController for cleanup to prevent race conditions
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAnalysis = async () => {
      if (!documentId) return;
      setLoading(true);
      setError(null); // Reset error state on new fetch

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${getBackendUrl()}/api/v1/analysis/summary/${documentId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            signal, // Pass the signal to the fetch request
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Get data from API and use it directly (backend now uses snake_case consistently)
        const analysisData = await res.json();
        setAnalysis(analysisData);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching analysis:", err);
          setError(err.message || "An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();

    // Cleanup function to abort fetch if component unmounts
    return () => {
      controller.abort();
    };
  }, [documentId]);

  const riskProfile = analysis ? getRiskProfile(analysis.riskScore) : null;

  // --- RENDER LOGIC ---

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        {/* Loading spinner remains the same */}
      </div>
    );
  }

  // Render a specific error message
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-white">
            Analysis Failed
          </h3>
          <p className="text-gray-400">
            Could not load the analysis.
            <br />
            <span className="text-sm text-gray-500">Error: {error}</span>
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    // This case now primarily handles when there's no error but also no data
    return (
      <div className="text-center text-gray-400 min-h-[500px]">
        No analysis data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        {/* Header remains the same, but uses camelCase field */}
        <h1 className="text-2xl font-bold text-white">
          {analysis.document_name}
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border-gray-700">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <BarChart className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="risks"
            className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <Shield className="h-4 w-4 mr-2" />
            Risk Analysis
          </TabsTrigger>
          <TabsTrigger
            value="chat"
            className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask Questions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Overall Risk Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-yellow-400">
                    {analysis.riskScore}/10
                  </div>
                  {/* Using the helper function here */}
                  {riskProfile && (
                    <Badge variant="outline" className={riskProfile.className}>
                      {riskProfile.level}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              {/* Key Issues Card remains the same */}
            </Card>

            {/* This card now uses data from the API instead of being hardcoded */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Analysis Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-bold text-green-400 capitalize">
                    {analysis.status || "Unknown"}
                  </div>
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {analysis.summary ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl font-bold text-white mb-4 mt-6">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl font-semibold text-white mb-3 mt-5">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg font-medium text-white mb-2 mt-4">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-300 mb-3 leading-relaxed">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="text-gray-300 list-disc pl-6 mb-3 space-y-1">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="text-gray-300 list-decimal pl-6 mb-3 space-y-1">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-300">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <strong className="text-yellow-400 font-semibold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className="text-gray-200 italic">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-700 px-2 py-1 rounded text-yellow-300 text-sm">
                            {children}
                          </code>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-gray-400 my-4">
                            {children}
                          </blockquote>
                        ),
                      }}
                    >
                      {analysis.summary}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Executive Summary
                    </h3>
                    <p className="mb-4">
                      This document has been analyzed for potential legal risks
                      and key terms.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-400 mb-2">
                          Risk Assessment
                        </h4>
                        <p className="text-sm">
                          Overall risk level:{" "}
                          {analysis.riskScore > 7
                            ? "High"
                            : analysis.riskScore > 4
                            ? "Moderate"
                            : "Low"}
                        </p>
                      </div>
                      <div className="bg-gray-700/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-400 mb-2">
                          Issues Identified
                        </h4>
                        <p className="text-sm">
                          {analysis.issuesCount} potential concerns found
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Issues Breakdown Card */}
          {analysis.issues && analysis.issues.length > 0 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Specific Issues Found ({analysis.issues.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="bg-gray-700/30 p-4 rounded-lg border-l-4 border-l-red-400"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-white">
                          {issue.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className={
                            issue.severity === "High"
                              ? "border-red-500 text-red-400"
                              : issue.severity === "Medium"
                              ? "border-yellow-500 text-yellow-400"
                              : "border-green-500 text-green-400"
                          }
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {issue.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations Card */}
          {analysis.recommendations && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  💡 Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-bold text-white mb-3 mt-4">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-semibold text-white mb-2 mt-4">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-md font-medium text-white mb-2 mt-3">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-300 mb-2 leading-relaxed">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="text-gray-300 list-disc pl-6 mb-2 space-y-1">
                          {children}
                        </ul>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-300">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="text-blue-400 font-semibold">
                          {children}
                        </strong>
                      ),
                    }}
                  >
                    {analysis.recommendations}
                  </ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="risks" className="space-y-6 mt-6">
          {/* Overall Risk Summary Card */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-400" />
                Overall Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">
                    {analysis.riskScore}/10
                  </div>
                  <div className="text-sm text-gray-300">
                    Overall Risk Score
                  </div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {analysis.risks ? analysis.risks.length : 0}
                  </div>
                  <div className="text-sm text-gray-300">Identified Risks</div>
                </div>
                <div className="bg-gray-700/30 p-4 rounded-lg text-center">
                  <Badge
                    variant="outline"
                    className={`text-lg px-3 py-1 ${
                      analysis.riskScore > 7
                        ? "border-red-500 text-red-400"
                        : analysis.riskScore > 4
                        ? "border-yellow-500 text-yellow-400"
                        : "border-green-500 text-green-400"
                    }`}
                  >
                    {analysis.riskScore > 7
                      ? "High Risk"
                      : analysis.riskScore > 4
                      ? "Moderate Risk"
                      : "Low Risk"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Risk Breakdown */}
          {analysis.risks && analysis.risks.length > 0 && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                  Detailed Risk Analysis ({analysis.risks.length} risks
                  identified)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.risks.map((risk, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        risk.severity === "Critical"
                          ? "border-l-red-600 bg-red-500/10"
                          : risk.severity === "High"
                          ? "border-l-red-500 bg-red-500/5"
                          : risk.severity === "Medium"
                          ? "border-l-yellow-500 bg-yellow-500/5"
                          : "border-l-green-500 bg-green-500/5"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-1">
                            {risk.risk_title}
                          </h4>
                          <div className="flex items-center gap-4 mb-2">
                            <Badge
                              variant="outline"
                              className={
                                risk.severity === "Critical"
                                  ? "border-red-600 text-red-400"
                                  : risk.severity === "High"
                                  ? "border-red-500 text-red-400"
                                  : risk.severity === "Medium"
                                  ? "border-yellow-500 text-yellow-400"
                                  : "border-green-500 text-green-400"
                              }
                            >
                              {risk.severity}
                            </Badge>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">
                                Risk Score:
                              </span>
                              <span
                                className={`font-bold ${
                                  risk.risk_score > 7
                                    ? "text-red-400"
                                    : risk.risk_score > 4
                                    ? "text-yellow-400"
                                    : "text-green-400"
                                }`}
                              >
                                {risk.risk_score}/10
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {risk.risk_description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-gray-700/30 p-3 rounded">
                          <span className="font-medium text-blue-400">
                            Impact:{" "}
                          </span>
                          <span className="text-gray-300">{risk.impact}</span>
                        </div>
                        <div className="bg-gray-700/30 p-3 rounded">
                          <span className="font-medium text-purple-400">
                            Likelihood:{" "}
                          </span>
                          <Badge
                            variant="outline"
                            className={
                              risk.likelihood === "High"
                                ? "border-red-400 text-red-300"
                                : risk.likelihood === "Medium"
                                ? "border-yellow-400 text-yellow-300"
                                : "border-green-400 text-green-300"
                            }
                          >
                            {risk.likelihood}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Risks Found - Fallback */}
          {(!analysis.risks || analysis.risks.length === 0) && (
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No Specific Risks Identified
                  </h3>
                  <p className="text-gray-300">
                    The analysis is still processing or no significant risks
                    were found in this document.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="chat" className="space-y-6 mt-6">
          <DocumentChat
            documentName={analysis.document_name}
            documentId={documentId}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
