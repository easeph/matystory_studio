import { Award, Gift, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser, shopItems } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <CardHeader>
          <CardTitle>个人中心</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl border border-border/60 bg-background/40 p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground">
                数
              </div>
              <div>
                <p className="font-display text-2xl">{currentUser.nickname}</p>
                <p className="text-sm text-muted-foreground">
                  Lv.{currentUser.level} · {currentUser.title}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>升级进度</span>
                <span>{currentUser.points} 积分</span>
              </div>
              <Progress value={48} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "已读章节", value: currentUser.completedReadings.length, icon: Award },
              { label: "满分测试", value: currentUser.perfectQuizzes.length, icon: Trophy },
              { label: "可兑换奖励", value: shopItems.length, icon: Gift }
            ].map((item) => (
              <div key={item.label} className="rounded-3xl border border-border/60 bg-card/60 p-4">
                <item.icon className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-3xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">学习成就</p>
            <div className="flex flex-wrap gap-2">
              {["勾股侦探", "数学史初探", "函数追光者"].map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>积分规则与兑换建议</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-3xl border border-border/60 bg-card/60 p-5">
            <p className="font-medium text-foreground">积分规则</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              阅读完成 +10 分，测试满分 +30 分；每累计 500 分升一级，最高 10 级。老师可以把等级系统当作课堂激励机制，家长也可以用它陪伴式记录学习节奏。
            </p>
          </div>
          {shopItems.map((item) => (
            <div key={item.id} className="rounded-3xl border border-border/60 bg-background/40 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
                <Badge>{item.cost} 积分</Badge>
              </div>
              <Button className="mt-4">立即兑换</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
