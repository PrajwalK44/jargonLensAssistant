import { getBackendUrl } from "../lib/api";
("use client");

// ...existing imports and code...

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Clock,
  MessageSquare,
  AlertTriangle,
  Target,
  Award,
} from "lucide-react";

interface Stats {
  totalTimeSpent: string;
  questionsAsked: number;
  clausesReviewed: number;
  riskFactorsIdentified: number;
  favoriteDocumentType: string;
  averageRiskScore: number;
}

import { useEffect, useState } from "react";

export function LearningInsights() {
  const [stats, setStats] = useState<any>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<any[]>([]);
  const [documentTypes, setDocumentTypes] = useState<any[]>([]);
  const [progress, setProgress] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      setLoading(true);
      try {
        const res = await fetch(`${getBackendUrl()}/api/v1/learning/insights`);
        const data = await res.json();
        setStats(data.stats);
        setWeeklyActivity(data.weeklyActivity || []);
        setDocumentTypes(data.documentTypes || []);
        setProgress(data.progress || null);
        setRecommendations(data.recommendations || []);
      } catch (err) {
        setStats(null);
        setWeeklyActivity([]);
        setDocumentTypes([]);
        setProgress(null);
        setRecommendations([]);
      }
      setLoading(false);
    }
    fetchInsights();
  }, []);

  if (loading || !stats) {
    return (
      <div className="text-center py-10">Loading learning insights...</div>
    );
  }
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Learning Insights
          </CardTitle>
          <p className="text-muted-foreground">
            Detailed analytics about your legal document learning journey
          </p>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Time Spent</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalTimeSpent}</p>
            <p className="text-xs text-muted-foreground">learning this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-secondary" />
              <span className="text-sm font-semibold">Questions</span>
            </div>
            <p className="text-2xl font-bold">{stats.questionsAsked}</p>
            <p className="text-xs text-muted-foreground">asked total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-semibold">Clauses</span>
            </div>
            <p className="text-2xl font-bold">{stats.clausesReviewed}</p>
            <p className="text-xs text-muted-foreground">reviewed total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-semibold">Risk Factors</span>
            </div>
            <p className="text-2xl font-bold">{stats.riskFactorsIdentified}</p>
            <p className="text-xs text-muted-foreground">identified</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="documents" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Document Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Document Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={documentTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {documentTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {progress?.map((item: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.value}%
                  </span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations?.map((rec: any, idx: number) => (
              <div
                key={idx}
                className={rec.className || "p-4 border rounded-lg"}
              >
                <h4 className="font-semibold mb-2">{rec.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {rec.description}
                </p>
                <Badge variant={rec.badgeVariant || "outline"}>
                  {rec.badgeText}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
