"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Lock, CheckCircle, Star } from "lucide-react"

interface Branch {
  name: string
  level: number
  maxLevel: number
  unlocked: boolean
}

interface LiteracyTreeData {
  totalBranches: number
  unlockedBranches: number
  branches: Branch[]
}

interface LegalLiteracyTreeProps {
  treeData: LiteracyTreeData
}

export function LegalLiteracyTree({ treeData }: LegalLiteracyTreeProps) {
  const getBranchIcon = (branch: Branch) => {
    if (!branch.unlocked) {
      return <Lock className="h-6 w-6 text-muted-foreground" />
    }
    if (branch.level === branch.maxLevel) {
      return <CheckCircle className="h-6 w-6 text-green-500" />
    }
    return <Star className="h-6 w-6 text-primary" />
  }

  const getBranchColor = (branch: Branch) => {
    if (!branch.unlocked) return "border-muted bg-muted/20"
    if (branch.level === branch.maxLevel) return "border-green-200 bg-green-50"
    return "border-primary/20 bg-primary/5"
  }

  const getProgressColor = (branch: Branch) => {
    if (branch.level === branch.maxLevel) return "bg-green-500"
    return "bg-primary"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="text-2xl">🌳</div>
            Legal Literacy Tree
          </CardTitle>
          <p className="text-muted-foreground">
            Your knowledge grows with each document type you master. Unlock new branches by analyzing different types of
            legal documents.
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
              <p className="text-2xl font-bold">
                {treeData.unlockedBranches}/{treeData.totalBranches} Branches Unlocked
              </p>
            </div>
            <div className="text-right">
              <Progress value={(treeData.unlockedBranches / treeData.totalBranches) * 100} className="w-32 h-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((treeData.unlockedBranches / treeData.totalBranches) * 100)}% Complete
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tree Visualization */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treeData.branches.map((branch, index) => (
          <Card key={index} className={`transition-all duration-200 ${getBranchColor(branch)}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-4">
                {getBranchIcon(branch)}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">{branch.name}</h3>
                  {branch.unlocked ? (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Level {branch.level}
                      </Badge>
                      {branch.level === branch.maxLevel && (
                        <Badge variant="secondary" className="text-xs">
                          Mastered
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Locked
                    </Badge>
                  )}
                </div>
              </div>

              {branch.unlocked ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>
                      {branch.level}/{branch.maxLevel}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(branch)}`}
                      style={{ width: `${(branch.level / branch.maxLevel) * 100}%` }}
                    />
                  </div>
                  {branch.level < branch.maxLevel && (
                    <p className="text-xs text-muted-foreground">
                      Analyze {branch.maxLevel - branch.level} more {branch.name.toLowerCase()} to level up
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Unlock by analyzing your first {branch.name.toLowerCase()}
                  </p>
                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    Find Examples
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tree Benefits */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Tree Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Specialized Knowledge</p>
                <p className="text-muted-foreground">Each branch unlocks specialized insights for that document type</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Bonus Points</p>
                <p className="text-muted-foreground">Higher level branches earn more clarity points per analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Expert Status</p>
                <p className="text-muted-foreground">Master all branches to become a Legal Document Expert</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
