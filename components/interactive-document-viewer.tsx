"use client";

import { useState, useRef, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Search,
  Download,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronDown,
  ChevronRight,
  Lightbulb,
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

interface InteractiveDocumentViewerProps {
  clauses: Clause[];
}

// Mock document content with highlighted sections
const mockDocumentContent = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into on January 15, 2024, between TechCorp Inc., a Delaware corporation ("Company"), and John Smith ("Employee").

1. POSITION AND DUTIES
Employee shall serve as Software Developer and shall perform such duties as are customarily associated with such position. Employee agrees to devote Employee's full business time and attention to the performance of Employee's duties hereunder.

2. COMPENSATION
[CLAUSE_2]The Company shall pay Employee an annual base salary of $85,000, payable in accordance with the Company's standard payroll practices. Employee's salary shall be reviewed annually and may be increased at the sole discretion of the Company.[/CLAUSE_2]

3. BENEFITS
Employee shall be entitled to participate in all employee benefit plans and programs maintained by the Company for its employees, subject to the terms and conditions of such plans.

4. TERM AND TERMINATION
[CLAUSE_3]Either party may terminate this Agreement at any time with or without cause upon two (2) weeks' written notice to the other party.[/CLAUSE_3] Upon termination, Employee shall return all Company property.

5. NON-COMPETE AGREEMENT
[CLAUSE_1]The Employee shall not, during the term of employment and for a period of twenty-four (24) months thereafter, directly or indirectly engage in any business that competes with the Company, solicit any customers or employees of the Company, or work for any competitor of the Company.[/CLAUSE_1]

6. CONFIDENTIALITY
Employee acknowledges that during employment, Employee will have access to confidential information. Employee agrees to maintain the confidentiality of such information both during and after employment.

7. INTELLECTUAL PROPERTY
All inventions, discoveries, and improvements made by Employee during employment shall be the exclusive property of the Company.

8. GOVERNING LAW
This Agreement shall be governed by the laws of the State of Delaware.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.

_________________________                    _________________________
Company Representative                         Employee Signature`;

export function InteractiveDocumentViewer({
  clauses,
}: InteractiveDocumentViewerProps) {
  const [highlightedClause, setHighlightedClause] = useState<string | null>(
    null
  );
  const [showRisksOnly, setShowRisksOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClause, setSelectedClause] = useState<Clause | null>(null);
  const [hoveredClause, setHoveredClause] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Restrictive Covenants",
    "Compensation",
    "Termination",
  ]);
  const documentRef = useRef<HTMLDivElement>(null);

  const getRiskColor = (riskLevel: string, isHighlighted = false) => {
    const opacity = isHighlighted ? "40" : "20";
    switch (riskLevel) {
      case "high":
        return `bg-red-500/${opacity} border-red-500/50 text-red-300`;
      case "medium":
        return `bg-yellow-500/${opacity} border-yellow-500/50 text-yellow-300`;
      case "low":
        return `bg-green-500/${opacity} border-green-500/50 text-green-300`;
      default:
        return `bg-gray-500/${opacity} border-gray-500/50 text-gray-300`;
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case "medium":
        return <Info className="h-4 w-4 text-yellow-400" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      default:
        return <Info className="h-4 w-4 text-gray-400" />;
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

  const renderDocumentWithHighlights = () => {
    let content = mockDocumentContent;

    // Filter clauses based on risk-only toggle
    const filteredClauses = showRisksOnly
      ? clauses.filter((clause) => clause.riskLevel !== "low")
      : clauses;

    // Replace clause markers with highlighted spans
    filteredClauses.forEach((clause) => {
      const marker = `[CLAUSE_${clause.id}]`;
      const endMarker = `[/CLAUSE_${clause.id}]`;
      const startIndex = content.indexOf(marker);
      const endIndex = content.indexOf(endMarker);

      if (startIndex !== -1 && endIndex !== -1) {
        const beforeText = content.substring(0, startIndex);
        const clauseText = content.substring(
          startIndex + marker.length,
          endIndex
        );
        const afterText = content.substring(endIndex + endMarker.length);

        const isHighlighted = highlightedClause === clause.id;
        const isHovered = hoveredClause === clause.id;
        const highlightClass = `${getRiskColor(
          clause.riskLevel,
          isHighlighted || isHovered
        )} border-2 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 hover:shadow-lg backdrop-blur-sm relative group`;

        content = `${beforeText}<span class="${highlightClass}" data-clause-id="${clause.id}" data-clause-title="${clause.title}" data-plain-english="${clause.plainEnglish}">${clauseText}</span>${afterText}`;
      }
    });

    // Highlight search terms
    if (searchTerm) {
      const regex = new RegExp(`(${searchTerm})`, "gi");
      content = content.replace(
        regex,
        '<mark class="bg-yellow-400/30 text-yellow-200 rounded px-1">$1</mark>'
      );
    }

    return content;
  };

  const handleClauseClick = (clauseId: string) => {
    const clause = clauses.find((c) => c.id === clauseId);
    if (clause) {
      setSelectedClause(clause);
      setHighlightedClause(clauseId);
      // Scroll to clause
      const element = document.querySelector(`[data-clause-id="${clauseId}"]`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const handleSidebarClauseClick = (clauseId: string) => {
    handleClauseClick(clauseId);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  // Group clauses by category
  const clausesByCategory = clauses.reduce((acc, clause) => {
    if (!acc[clause.category]) {
      acc[clause.category] = [];
    }
    acc[clause.category].push(clause);
    return acc;
  }, {} as Record<string, Clause[]>);

  return (
    <div className="space-y-6">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-40 bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50 shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-200"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRisksOnly(!showRisksOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 ${
                showRisksOnly
                  ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-400"
                  : "bg-gray-700/50 border-gray-600/50 text-gray-300 hover:border-yellow-500/30 hover:text-yellow-400"
              }`}
            >
              {showRisksOnly ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="text-sm font-medium">
                {showRisksOnly ? "Show All" : "Risks Only"}
              </span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-xl hover:border-yellow-500/30 hover:text-yellow-400 transition-all duration-200">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-10 gap-6">
        {/* Document Viewer - 70% */}
        <div className="lg:col-span-7">
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="flex items-center gap-3 text-xl font-bold text-white">
                <div className="relative">
                  <FileText className="h-6 w-6 text-yellow-500" />
                  <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md"></div>
                </div>
                Employment Agreement
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Click highlighted sections for detailed analysis
              </p>
            </div>

            {/* Document Content */}
            <div className="relative">
              <div
                ref={documentRef}
                className="h-[700px] overflow-y-auto p-6 scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/50 hover:scrollbar-thumb-gray-500/50"
              >
                <div
                  className="font-mono text-sm leading-loose whitespace-pre-wrap text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: renderDocumentWithHighlights(),
                  }}
                  onClick={(e) => {
                    const target = e.target as HTMLElement;
                    const clauseId = target.getAttribute("data-clause-id");
                    if (clauseId) {
                      handleClauseClick(clauseId);
                    }
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLElement;
                    const clauseId = target.getAttribute("data-clause-id");
                    if (clauseId) {
                      setHoveredClause(clauseId);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredClause(null);
                  }}
                />
              </div>

              {/* Tooltip */}
              {hoveredClause && (
                <div className="fixed z-50 pointer-events-none">
                  <div className="bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl max-w-sm">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {getRiskIcon(
                          clauses.find((c) => c.id === hoveredClause)
                            ?.riskLevel || "low"
                        )}
                        <h4 className="font-semibold text-white text-sm">
                          {clauses.find((c) => c.id === hoveredClause)?.title}
                        </h4>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {
                          clauses.find((c) => c.id === hoveredClause)
                            ?.plainEnglish
                        }
                      </p>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 rounded-lg text-xs font-medium hover:bg-yellow-500/30 transition-all duration-200">
                        <Lightbulb className="h-3 w-3" />
                        Suggest Fix
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - 30% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Risk Legend */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
            <h4 className="font-bold text-white mb-4">Risk Legend</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-500/30 border border-red-500/50 rounded"></div>
                <span className="text-sm text-gray-300">High Risk</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500/30 border border-yellow-500/50 rounded"></div>
                <span className="text-sm text-gray-300">Medium Risk</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500/30 border border-green-500/50 rounded"></div>
                <span className="text-sm text-gray-300">Low Risk</span>
              </div>
            </div>
          </div>

          {/* Clause Accordion */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700/50">
              <h4 className="font-bold text-white">Key Clauses</h4>
              <p className="text-gray-400 text-sm mt-1">
                {clauses.length} clauses identified
              </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/50 scrollbar-thumb-gray-600/50">
              {Object.entries(clausesByCategory).map(
                ([category, categoryClause]) => (
                  <div
                    key={category}
                    className="border-b border-gray-700/30 last:border-b-0"
                  >
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-700/20 transition-all duration-200"
                    >
                      <span className="font-semibold text-gray-200 text-sm">
                        {category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {categoryClause.length}
                        </span>
                        {expandedCategories.includes(category) ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </button>

                    {expandedCategories.includes(category) && (
                      <div className="pb-2">
                        {categoryClause.map((clause) => (
                          <div
                            key={clause.id}
                            className={`mx-4 mb-2 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                              highlightedClause === clause.id
                                ? "bg-yellow-500/10 border-yellow-500/30"
                                : "bg-gray-700/20 border-gray-600/30 hover:bg-gray-700/30 hover:border-gray-500/50"
                            }`}
                            onClick={() => handleSidebarClauseClick(clause.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-0.5">
                                {getRiskIcon(clause.riskLevel)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h5 className="font-semibold text-white text-sm truncate">
                                    {clause.title}
                                  </h5>
                                </div>
                                <span
                                  className={`inline-block px-2 py-1 text-xs font-semibold rounded-full border ${getRiskBadgeStyles(
                                    clause.riskLevel
                                  )}`}
                                >
                                  {clause.riskLevel.toUpperCase()} RISK
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Selected Clause Details */}
          {selectedClause && (
            <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                {getRiskIcon(selectedClause.riskLevel)}
                <h4 className="font-bold text-white text-lg">
                  {selectedClause.title}
                </h4>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-700/20 backdrop-blur-sm rounded-xl border border-gray-600/30">
                  <h5 className="font-semibold text-white text-sm mb-2">
                    Plain English
                  </h5>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedClause.plainEnglish}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getRiskBadgeStyles(
                      selectedClause.riskLevel
                    )}`}
                  >
                    {selectedClause.riskLevel.toUpperCase()} RISK
                  </span>
                  <span className="px-3 py-1 bg-gray-700/30 text-gray-300 border border-gray-600/50 rounded-full text-xs font-medium">
                    {selectedClause.category}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 rounded-xl text-sm font-medium hover:bg-yellow-500/30 transition-all duration-200">
                    <Lightbulb className="h-4 w-4" />
                    Suggest Fix
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }

        .scrollbar-track-gray-800\/50::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-track-gray-800\/50::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 3px;
        }

        .scrollbar-thumb-gray-600\/50::-webkit-scrollbar-thumb {
          background: rgba(75, 85, 99, 0.5);
          border-radius: 3px;
        }

        .hover\\:scrollbar-thumb-gray-500\/50:hover::-webkit-scrollbar-thumb {
          background: rgba(107, 114, 128, 0.5);
        }
      `}</style>
    </div>
  );
}
