"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Scale,
  ListChecks,
  FileText,
} from "lucide-react";

interface Clause {
  id: string;
  title: string;
  originalText: string;
  plainEnglish: string;
  riskLevel: "low" | "medium" | "high";
  category: string;
}

interface ClauseAnalysisProps {
  clauses: Clause[];
}

export function ClauseAnalysis({ clauses }: ClauseAnalysisProps) {
  const [expandedClauses, setExpandedClauses] = useState<string[]>([]);

  const toggleClause = (clauseId: string) => {
    setExpandedClauses((prev) =>
      prev.includes(clauseId)
        ? prev.filter((id) => id !== clauseId)
        : [...prev, clauseId]
    );
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case "medium":
        return <Info className="h-5 w-5 text-yellow-400" />;
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      default:
        return <Info className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRiskBadgeStyles = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-900/30 text-red-300 border-red-500/50";
      case "medium":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-500/50";
      case "low":
        return "bg-green-900/30 text-green-300 border-green-500/50";
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-500/50";
    }
  };

  const getRiskExplanation = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "This clause may significantly impact your rights or obligations. Consider seeking legal advice before proceeding.";
      case "medium":
        return "This clause has some potential concerns but is generally standard for this type of contract. Review carefully.";
      case "low":
        return "This clause is standard and poses minimal risk to your interests. It follows industry best practices.";
      default:
        return "This clause requires further review to determine its impact.";
    }
  };

  const getRiskIconGlow = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-400/20";
      case "medium":
        return "bg-yellow-400/20";
      case "low":
        return "bg-green-400/20";
      default:
        return "bg-gray-400/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <ListChecks className="h-7 w-7 text-yellow-500" />
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"></div>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Clause-by-Clause Analysis
          </h2>
        </div>
        <p className="text-gray-400 leading-relaxed">
          Each clause has been analyzed and translated into plain English. Click
          on any clause to see the detailed breakdown, risk assessment, and
          actionable insights.
        </p>
      </div>

      {/* Clause Cards */}
      <div className="space-y-4">
        {clauses.map((clause) => {
          const isExpanded = expandedClauses.includes(clause.id);
          return (
            <div
              key={clause.id}
              className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-gray-600/50"
            >
              {/* Clause Header - Clickable */}
              <button
                onClick={() => toggleClause(clause.id)}
                className="w-full p-6 text-left hover:bg-gray-700/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {/* Risk Icon with Glow */}
                    <div className="relative flex-shrink-0">
                      {getRiskIcon(clause.riskLevel)}
                      <div
                        className={`absolute inset-0 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${getRiskIconGlow(
                          clause.riskLevel
                        )}`}
                      ></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gray-100 transition-colors duration-300">
                        {clause.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* Category Badge */}
                        <span className="px-3 py-1 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-full text-sm font-medium">
                          {clause.category}
                        </span>
                        {/* Risk Badge */}
                        <span
                          className={`px-3 py-1 text-sm font-semibold rounded-full border backdrop-blur-sm ${getRiskBadgeStyles(
                            clause.riskLevel
                          )}`}
                        >
                          {clause.riskLevel.toUpperCase()} RISK
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <div
                      className={`transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown className="h-6 w-6 text-gray-400 group-hover:text-yellow-400 transition-colors duration-300" />
                    </div>
                  </div>
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 space-y-6">
                  {/* Plain English Summary - Glassmorphism Card */}
                  <div className="bg-yellow-500/5 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <FileText className="h-5 w-5 text-yellow-500" />
                        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-sm"></div>
                      </div>
                      <h4 className="font-bold text-yellow-400 text-lg">
                        Plain English Summary
                      </h4>
                    </div>
                    <p className="text-gray-200 leading-relaxed text-base">
                      {clause.plainEnglish}
                    </p>
                  </div>

                  {/* Original Legal Text */}
                  <div className="bg-gray-700/20 backdrop-blur-sm border border-gray-600/30 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-300 mb-4 text-sm uppercase tracking-wide">
                      Original Legal Text
                    </h4>
                    <p className="text-sm italic text-gray-400 leading-relaxed">
                      "{clause.originalText}"
                    </p>
                  </div>

                  {/* Risk Assessment Panel */}
                  <div className="flex items-start gap-4 p-6 bg-gray-700/20 backdrop-blur-sm border border-gray-600/30 rounded-xl">
                    <div className="flex-shrink-0 mt-1">
                      <div className="relative">
                        {getRiskIcon(clause.riskLevel)}
                        <div
                          className={`absolute inset-0 rounded-full blur-sm ${getRiskIconGlow(
                            clause.riskLevel
                          )}`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-2 text-lg">
                        Risk Assessment
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {getRiskExplanation(clause.riskLevel)}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-gray-600/50 text-gray-300 rounded-xl hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-500/5 transition-all duration-300 font-medium">
                      <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Ask Question About This Clause</span>
                    </button>
                    <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-transparent border border-gray-600/50 text-gray-300 rounded-xl hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-500/5 transition-all duration-300 font-medium">
                      <Scale className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Compare with Industry Standard</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            max-height: 0;
            opacity: 0;
          }
          to {
            max-height: 1000px;
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            max-height: 1000px;
            opacity: 1;
          }
          to {
            max-height: 0;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
