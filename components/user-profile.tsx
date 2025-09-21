import { getBackendUrl } from "../lib/api";
("use client");

// ...existing imports and code...
("use client");

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { DocumentHistory } from "@/components/document-history";
import { LearningInsights } from "@/components/learning-insights";
import {
  Settings,
  FileText,
  TrendingUp,
  Calendar,
  Award,
  Star,
  Target,
  Edit3,
  Save,
  X,
} from "lucide-react";

import { useEffect } from "react";

export function UserProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [editedProfile, setEditedProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch(`${getBackendUrl()}/api/v1/profile`);
        const data = await res.json();
        setProfile(data);
        setEditedProfile({
          name: data.name,
          bio: data.bio,
          location: data.location,
          profession: data.profession,
        });
      } catch (err) {
        setProfile(null);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    setIsEditing(false);
    try {
      await fetch(`${getBackendUrl()}/api/v1/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedProfile),
      });
      setProfile((prev: any) => ({ ...prev, ...editedProfile }));
    } catch {}
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      name: profile?.name ?? "",
      bio: profile?.bio ?? "",
      location: profile?.location ?? "",
      profession: profile?.profession ?? "",
    });
    setIsEditing(false);
  };

  if (loading || !profile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <div className="mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage
                    src={profile.avatar || "/placeholder.svg"}
                    alt={profile.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {profile.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <Badge variant="secondary" className="mb-2">
                    Level {profile.level}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    Member since {profile.joinDate}
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="profession">Profession</Label>
                      <Input
                        id="profession"
                        value={editedProfile.profession}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            profession: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editedProfile.bio}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            bio: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold">{profile.name}</h1>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-1">
                      {profile.profession}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {profile.location}
                    </p>
                    <p className="text-sm mb-4">{profile.bio}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Star className="h-3 w-3" />
                        {profile.rank}
                      </Badge>
                      <span className="text-muted-foreground">
                        {profile.totalPoints?.toLocaleString()} points
                      </span>
                      <span className="text-muted-foreground">
                        {profile.documentsAnalyzed} documents analyzed
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:w-48">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Streak</span>
                  </div>
                  <p className="text-2xl font-bold">{profile.streak}</p>
                  <p className="text-xs text-muted-foreground">days</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Award className="h-4 w-4 text-secondary" />
                    <span className="text-sm font-semibold">Badges</span>
                  </div>
                  <p className="text-2xl font-bold">{profile.achievements}</p>
                  <p className="text-xs text-muted-foreground">earned</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">
                        Level Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Level {profile.level} - {profile.rank}
                      </span>
                    </div>
                    <Progress
                      value={profile.levelProgress || 0}
                      className="h-3"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {profile.pointsToNextLevel} points to next level
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm font-semibold">Documents</span>
                      </div>
                      <p className="text-2xl font-bold">
                        {profile.documentsAnalyzedThisMonth}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        analyzed this month
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-semibold">
                          Time Spent
                        </span>
                      </div>
                      <p className="text-2xl font-bold">
                        {profile.timeSpentThisMonth}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        learning this month
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" asChild>
                    <a href="/upload">
                      <FileText className="h-4 w-4 mr-2" />
                      Analyze New Document
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a href="/progress">
                      <Award className="h-4 w-4 mr-2" />
                      View Achievements
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    asChild
                  >
                    <a href="/analysis/demo-document">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Continue Analysis
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentDocuments?.map((doc: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <FileText className="h-8 w-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.type}
                        </Badge>
                        <Badge
                          variant={
                            doc.riskLevel === "high"
                              ? "destructive"
                              : doc.riskLevel === "medium"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {doc.riskLevel?.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Analyzed on {doc.analyzedDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs">
                        +{doc.pointsEarned} pts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <DocumentHistory documents={profile.recentDocuments || []} />
        </TabsContent>

        <TabsContent value="insights">
          <LearningInsights />
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your documents
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={profile.preferences?.emailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weekly Digest</p>
                      <p className="text-sm text-muted-foreground">
                        Summary of your weekly progress
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={profile.preferences?.weeklyDigest}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Achievement Alerts</p>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you earn badges
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={profile.preferences?.achievementAlerts}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={profile.email || ""} disabled />
                  </div>
                  <div>
                    <Label htmlFor="reminder">Reminder Frequency</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      defaultValue={
                        profile.preferences?.reminderFrequency || "weekly"
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>
                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full bg-transparent">
                      Change Password
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
