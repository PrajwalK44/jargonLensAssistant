"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Award, Lock } from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress?: number
  total?: number
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

interface AchievementBadgesProps {
  achievements: Achievement[]
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "uncommon":
        return "border-green-300 bg-green-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const getRarityBadgeVariant = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "secondary"
      case "uncommon":
        return "outline"
      case "rare":
        return "default"
      case "epic":
        return "destructive"
      case "legendary":
        return "default"
      default:
        return "secondary"
    }
  }

  const earnedAchievements = achievements.filter((a) => a.earned)
  const unlockedAchievements = achievements.filter((a) => !a.earned)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievement Collection
          </CardTitle>
          <p className="text-muted-foreground">
            Unlock badges by completing challenges and mastering legal document analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{earnedAchievements.length}</p>
              <p className="text-sm text-muted-foreground">Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{unlockedAchievements.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {Math.round((earnedAchievements.length / achievements.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {
                  achievements
                    .filter((a) => a.rarity === "rare" || a.rarity === "epic" || a.rarity === "legendary")
                    .filter((a) => a.earned).length
                }
              </p>
              <p className="text-sm text-muted-foreground">Rare+</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earned Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Earned Achievements ({earnedAchievements.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedAchievements.map((achievement) => (
            <Card key={achievement.id} className={`${getRarityColor(achievement.rarity)} border-2`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant={getRarityBadgeVariant(achievement.rarity)} className="text-xs">
                      {achievement.rarity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {achievement.earnedDate}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* In Progress Achievements */}
      <div>
        <h2 className="text-xl font-semibold mb-4">In Progress ({unlockedAchievements.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unlockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="border-2 border-muted bg-muted/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative mb-3">
                    <div className="text-4xl opacity-50">{achievement.icon}</div>
                    <Lock className="h-4 w-4 absolute top-0 right-0 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

                  {achievement.progress !== undefined && achievement.total !== undefined && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.total}
                        </span>
                      </div>
                      <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    </div>
                  )}

                  <Badge variant={getRarityBadgeVariant(achievement.rarity)} className="text-xs">
                    {achievement.rarity.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievement Tips */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">How to Earn Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Analyze Documents</p>
                  <p className="text-muted-foreground">Upload and analyze different types of legal documents</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Ask Questions</p>
                  <p className="text-muted-foreground">Use the Q&A feature to understand your documents better</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Maintain Streaks</p>
                  <p className="text-muted-foreground">Come back daily to build your learning streak</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold">Master Document Types</p>
                  <p className="text-muted-foreground">Become an expert in specific types of legal documents</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
