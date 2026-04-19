import Link from "next/link";
import { BookMarked, Flame, Sparkles, Trophy } from "lucide-react";

import { KnowledgeCard } from "@/components/knowledge/knowledge-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { currentUser } from "@/lib/mock-data";
import { chunkBy } from "@/lib/utils";
import { gradeOrder, knowledgePoints } from "@/data/knowledge";

const grouped = chunkBy(knowledgePoints, (item) => item.grade);

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden p-0">
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.25),transparent_30%),linear-gradient(135deg,rgba(11,24,58,0.98),rgba(16,49,88,0.92))] px-6 py-10 md:px-10">
            <div className="absolute inset-0 math-grid bg-math-grid opacity-50" />
            <div className="relative space-y-6">
              <Badge>人教版初中数学 × 4000 年数学史</Badge>
              <div className="space-y-4">
                <h1 className="max-w-3xl font-display text-4xl leading-tight md:text-6xl">
                  MathStory
                  <span className="mt-2 block text-2xl text-primary md:text-3xl">把课本公式，讲成一场跨文明的数学冒险</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                  全知识点、历史故事、互动公式动画、测试闯关、积分等级与虚拟奖励，一站式服务初中生、家长与老师。
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/knowledge/gougu-dingli">从勾股定理开始</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/profile">查看我的等级</Link>
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { icon: BookMarked, label: "核心知识点", value: "40" },
                  { icon: Sparkles, label: "互动动画", value: "重点公式全覆盖" },
                  { icon: Flame, label: "学习机制", value: "阅读 + 测试 + 积分" }
                ].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-border/50 bg-card/40 p-4">
                    <item.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-1 font-display text-2xl text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>今日学习进度</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-3xl border border-border/60 bg-background/40 p-5">
              <p className="text-sm text-muted-foreground">当前等级</p>
              <p className="mt-1 font-display text-4xl text-primary">Lv.{currentUser.level}</p>
              <p className="text-base text-foreground">{currentUser.title}</p>
              <div className="mt-4 space-y-2">
                <Progress value={48} />
                <p className="text-xs text-muted-foreground">{currentUser.points} / 1000 积分，继续阅读与测试即可升级。</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-border/60 bg-card/60 p-4">
                <p className="text-sm text-muted-foreground">已完成阅读</p>
                <p className="mt-2 text-3xl font-semibold">{currentUser.completedReadings.length}</p>
              </div>
              <div className="rounded-3xl border border-border/60 bg-card/60 p-4">
                <p className="text-sm text-muted-foreground">测试满分</p>
                <p className="mt-2 text-3xl font-semibold">{currentUser.perfectQuizzes.length}</p>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/leaderboard">
                <Trophy className="mr-2 h-4 w-4" />
                查看排行榜
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl text-foreground">按年级探索全部知识点</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              完整覆盖人教版初中数学主干目录，每个知识点都配有公式、历史故事、动画演示和测试入口。
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {gradeOrder.map((grade) => (
            <div key={grade} className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl">{grade}</h3>
                <Badge>{grouped[grade]?.length ?? 0} 个知识点</Badge>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {grouped[grade]?.map((knowledge) => <KnowledgeCard key={knowledge.id} knowledge={knowledge} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
