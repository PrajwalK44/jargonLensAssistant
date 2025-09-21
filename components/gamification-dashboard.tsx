import { getBackendUrl } from "../lib/api";
("use client");

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LegalLiteracyTree } from "@/components/legal-literacy-tree";
import { AchievementBadges } from "@/components/achievement-badges";
import { ClarityPointsTracker } from "@/components/clarity-points-tracker";
import {
  Award,
  Trophy,
  Target,
  TrendingUp,
  Star,
  Zap,
  Users,
} from "lucide-react";

export function GamificationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [points, setPoints] = useState<number | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [literacyTree, setLiteracyTree] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGamification() {
      setLoading(true);
      try {
        const pointsRes = await fetch(
          `${getBackendUrl()}/api/v1/gamification/points`
        );
        const pointsData = await pointsRes.json();
        setPoints(pointsData.points);

        const badgesRes = await fetch(
          `${getBackendUrl()}/api/v1/gamification/badges`
        );
        const badgesData = await badgesRes.json();
        setBadges(badgesData.badges || []);

        const treeRes = await fetch(
          `${getBackendUrl()}/api/v1/gamification/tree`
        );
        const treeData = await treeRes.json();
        setLiteracyTree(treeData.tree || {});
      } catch (err) {
        setPoints(0);
        setBadges([]);
        setLiteracyTree({});
      }
      setLoading(false);
    }
    fetchGamification();
  }, []);

  // Example calculations (replace with real logic if needed)
  const totalPoints = points ?? 0;
  const achievements = badges;
  const unlockedBranches = literacyTree.unlockedBranches ?? 0;
  const totalBranches = literacyTree.totalBranches ?? 0;
  const progressToNextLevel = ((totalPoints % 500) / 500) * 100;

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="text-center py-10">Loading gamification data...</div>
      ) : (
        <>
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Clarity Points
                    </p>
                    <p className="text-2xl font-bold">
                      {totalPoints.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="text-2xl font-bold">
                      {Math.floor(totalPoints / 500) + 1}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Document Types Mastered
                    </p>
                    <p className="text-2xl font-bold">{unlockedBranches}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Achievements
                    </p>
                    <p className="text-2xl font-bold">
                      {achievements.filter((a) => a.earned).length}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Level Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Level {Math.floor(totalPoints / 500) + 1}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {500 - (totalPoints % 500)} points to next level
                  </p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {Math.round(progressToNextLevel)}% Complete
                </Badge>
              </div>
              <Progress value={progressToNextLevel} className="h-3" />
            </CardContent>
          </Card>

          {/* Main Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tree">Literacy Tree</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Document Types Mastered</span>
                        <span className="font-semibold">
                          {unlockedBranches}/{totalBranches}
                        </span>
                      </div>
                      <Progress
                        value={
                          totalBranches
                            ? (unlockedBranches / totalBranches) * 100
                            : 0
                        }
                        className="h-2"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Achievements Earned</span>
                        <span className="font-semibold">
                          {achievements.filter((a) => a.earned).length}/
                          {achievements.length}
                        </span>
                      </div>
                      <Progress
                        value={
                          achievements.length
                            ? (achievements.filter((a) => a.earned).length /
                                achievements.length) *
                              100
                            : 0
                        }
                        className="h-2"
                      />

                      <div className="pt-4 border-t">
                        <Button className="w-full" asChild>
                          <a href="/upload">Analyze Another Document</a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Points Breakdown */}
              <ClarityPointsTracker />
            </TabsContent>

            <TabsContent value="tree">
              <LegalLiteracyTree treeData={literacyTree} />
            </TabsContent>

            <TabsContent value="achievements">
              <AchievementBadges achievements={achievements} />
            </TabsContent>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Community Leaderboard
                  </CardTitle>
                  <p className="text-muted-foreground">
                    See how you rank among other legal learners
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* TODO: Replace with real leaderboard data */}
                    <div className="flex items-center gap-4 p-4 border rounded-lg border-primary bg-primary/5">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">You</p>
                        <p className="text-sm text-muted-foreground">
                          Level {Math.floor(totalPoints / 500) + 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {totalPoints.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">points</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default GamificationDashboard;
