"use client";
import { getBackendUrl } from "../lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  TrendingUp,
  Award,
  MessageSquare,
  FileText,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

export function ClarityPointsTracker() {
  const [pointsBreakdown, setPointsBreakdown] = useState<any[]>([]);
  const [recentEarnings, setRecentEarnings] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGamification() {
      setLoading(true);
      try {
        const pointsRes = await fetch(
          `${getBackendUrl()}/api/v1/gamification/points`
        );
        const pointsData = await pointsRes.json();
        setPointsBreakdown(pointsData.breakdown || []);
        setTotalPoints(pointsData.total || 0);

        const earningsRes = await fetch(
          `${getBackendUrl()}/api/v1/gamification/earnings`
        );
        const earningsData = await earningsRes.json();
        setRecentEarnings(earningsData.earnings || []);
      } catch (err) {
        // Handle error (show toast or fallback UI)
      }
      setLoading(false);
    }
    fetchGamification();
  }, []);
  if (loading) {
    return <div className="text-center py-10">Loading clarity points...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Clarity Points Breakdown
          </CardTitle>
          <p className="text-muted-foreground">
            Earn points by engaging with documents and building your legal
            knowledge
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Points by Category */}
            <div className="space-y-4">
              <h3 className="font-semibold">Points by Category</h3>
              {pointsBreakdown.map((category, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {/* Use icon string from backend or fallback */}
                      {category.icon === "FileText" ? (
                        <FileText className="h-4 w-4" />
                      ) : category.icon === "MessageSquare" ? (
                        <MessageSquare className="h-4 w-4" />
                      ) : category.icon === "Award" ? (
                        <Award className="h-4 w-4" />
                      ) : category.icon === "Target" ? (
                        <Target className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                      <span className="font-semibold">{category.category}</span>
                    </div>
                    <Badge variant="secondary">{category.points} pts</Badge>
                  </div>
                  <div className="space-y-1">
                    {category.activities &&
                      category.activities.map(
                        (activity: any, actIndex: number) => (
                          <div
                            key={actIndex}
                            className="flex justify-between text-sm text-muted-foreground"
                          >
                            <span>{activity.action}</span>
                            <span>+{activity.points} pts</span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Earnings */}
            <div className="space-y-4">
              <h3 className="font-semibold">Recent Earnings</h3>
              <div className="space-y-3">
                {recentEarnings.map((earning, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {earning.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {earning.timestamp}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +{earning.points}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Points Summary */}
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Total Points Earned</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalPoints.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>+285 points this week</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Point Multipliers */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Boost Your Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Streak Multiplier</p>
                <p className="text-muted-foreground">
                  Maintain daily streaks for 2x points on activities
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Document Mastery</p>
                <p className="text-muted-foreground">
                  Higher level branches earn bonus points per analysis
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold mb-1">Weekly Challenges</p>
                <p className="text-muted-foreground">
                  Complete special challenges for bonus point rewards
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ClarityPointsTracker;
