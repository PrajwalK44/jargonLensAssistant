"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Minus, BarChart3 } from "lucide-react"

interface PrecedentComparatorProps {
  documentType: string
}

const comparisonData = [
  {
    clause: "Non-Compete Duration",
    yourValue: "24 months",
    industryAverage: "12 months",
    percentile: 85,
    trend: "above",
    impact: "high",
  },
  {
    clause: "Base Salary",
    yourValue: "$85,000",
    industryAverage: "$82,000",
    percentile: 60,
    trend: "above",
    impact: "medium",
  },
  {
    clause: "Termination Notice",
    yourValue: "2 weeks",
    industryAverage: "4 weeks",
    percentile: 25,
    trend: "below",
    impact: "medium",
  },
  {
    clause: "Vacation Days",
    yourValue: "15 days",
    industryAverage: "15 days",
    percentile: 50,
    trend: "equal",
    impact: "low",
  },
  {
    clause: "Health Insurance Coverage",
    yourValue: "80% employer paid",
    industryAverage: "75% employer paid",
    percentile: 65,
    trend: "above",
    impact: "low",
  },
]

export function PrecedentComparator({ documentType }: PrecedentComparatorProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "above":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "below":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      case "equal":
        return <Minus className="h-4 w-4 text-gray-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "above":
        return "text-green-600"
      case "below":
        return "text-red-600"
      case "equal":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge variant="destructive">High Impact</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Impact</Badge>
      case "low":
        return <Badge variant="outline">Low Impact</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Industry Comparison - {documentType}
          </CardTitle>
          <p className="text-muted-foreground">
            See how your contract terms compare to industry standards based on anonymized data from similar agreements.
          </p>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {comparisonData.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{item.clause}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getTrendIcon(item.trend)}
                    <span className={`text-sm ${getTrendColor(item.trend)}`}>
                      {item.trend === "above" && "Above Average"}
                      {item.trend === "below" && "Below Average"}
                      {item.trend === "equal" && "At Average"}
                    </span>
                  </div>
                </div>
                {getImpactBadge(item.impact)}
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Your Contract</p>
                  <p className="font-semibold text-primary">{item.yourValue}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Industry Average</p>
                  <p className="font-semibold">{item.industryAverage}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Percentile Ranking</span>
                  <span className="font-semibold">{item.percentile}th percentile</span>
                </div>
                <Progress value={item.percentile} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Your terms are better than {item.percentile}% of similar contracts
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <BarChart3 className="h-5 w-5 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">About This Comparison</h3>
              <p className="text-sm text-muted-foreground">
                This analysis is based on anonymized data from over 10,000 similar contracts in our database. Industry
                averages are calculated from contracts in the same sector and role level. Data is updated monthly to
                reflect current market conditions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
