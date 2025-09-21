"use client"

interface RiskRadarProps {
  score: number
}

export function RiskRadar({ score }: RiskRadarProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-red-500"
    if (score >= 60) return "text-yellow-500"
    return "text-green-500"
  }

  const getLabel = (score: number) => {
    if (score >= 80) return "High Risk"
    if (score >= 60) return "Medium Risk"
    return "Low Risk"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-4">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted/20" />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
            className={getColor(score)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getColor(score)}`}>{score}</div>
            <div className="text-xs text-muted-foreground">Risk Score</div>
          </div>
        </div>
      </div>
      <div className={`text-sm font-semibold ${getColor(score)}`}>{getLabel(score)}</div>
    </div>
  )
}
