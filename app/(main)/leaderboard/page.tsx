import { Crown, Medal, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { leaderboardProfiles } from "@/lib/mock-data";

const medals = [Crown, Trophy, Medal];

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>排行榜</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          按累计积分排序，适合班级 PK、家庭陪学和阶段复盘。接入 Supabase 后，可直接改为实时读取 `user_points` 与 `user_progress`。
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {leaderboardProfiles.map((profile, index) => {
          const MedalIcon = medals[index] ?? Trophy;
          return (
            <Card key={profile.id}>
              <CardContent className="flex items-center justify-between gap-4 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MedalIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-2xl">{profile.nickname}</p>
                    <p className="text-sm text-muted-foreground">
                      Lv.{profile.level} · {profile.title}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge>第 {index + 1} 名</Badge>
                  <p className="mt-3 text-3xl font-semibold text-foreground">{profile.points}</p>
                  <p className="text-sm text-muted-foreground">积分</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
