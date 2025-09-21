"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Filter, Download, Eye } from "lucide-react"
import { useState } from "react"

interface Document {
  id: string
  name: string
  type: string
  analyzedDate: string
  riskLevel: string
  pointsEarned: number
}

interface DocumentHistoryProps {
  documents: Document[]
}

export function DocumentHistory({ documents }: DocumentHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || doc.type === filterType
    return matchesSearch && matchesFilter
  })

  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document History
          </CardTitle>
          <p className="text-muted-foreground">View and manage all your analyzed legal documents</p>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="all">All Types</option>
                <option value="Employment Contract">Employment Contracts</option>
                <option value="Rental Agreement">Rental Agreements</option>
                <option value="Vendor Contract">Vendor Contracts</option>
                <option value="NDA">NDAs</option>
              </select>
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <FileText className="h-10 w-10 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{doc.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    <Badge variant={getRiskBadgeVariant(doc.riskLevel)} className="text-xs">
                      {doc.riskLevel.toUpperCase()} RISK
                    </Badge>
                    <span className="text-xs text-muted-foreground">Analyzed {doc.analyzedDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    +{doc.pointsEarned} pts
                  </Badge>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{documents.length}</p>
              <p className="text-sm text-muted-foreground">Total Documents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{documents.reduce((sum, doc) => sum + doc.pointsEarned, 0)}</p>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Math.round(documents.reduce((sum, doc) => sum + doc.pointsEarned, 0) / documents.length)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Points/Doc</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
