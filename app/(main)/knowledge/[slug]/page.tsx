import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, ExternalLink, ScrollText, Sparkles, Star } from "lucide-react";

import { FormulaAnimation } from "@/components/knowledge/formula-animation";
import { FormulaBlock } from "@/components/knowledge/formula-block";
import { PortraitCard } from "@/components/knowledge/portrait-card";
import { StoryTimeline } from "@/components/knowledge/timeline";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getReadingReward } from "@/lib/gamification";
import { knowledgePoints } from "@/data/knowledge";
import { getEnrichedKnowledgeBySlug } from "@/data/knowledge-enrichment";

export function generateStaticParams() {
  return knowledgePoints.map((item) => ({ slug: item.slug }));
}

export default function KnowledgeDetailPage({ params }: { params: { slug: string } }) {
  const knowledge = getEnrichedKnowledgeBySlug(params.slug);

  if (!knowledge) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden p-0">
          <div className="relative px-6 py-8 md:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,rgba(9,22,52,0.96),rgba(15,42,82,0.92))]" />
            <div className="relative space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge>{knowledge.grade}</Badge>
                <Badge className="border-accent/40 bg-accent/10 text-sky-200">{knowledge.chapter}</Badge>
              </div>
              <div>
                <h1 className="font-display text-4xl leading-tight">{knowledge.title}</h1>
                <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">{knowledge.shortDesc}</p>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-primary" />
                  预计阅读 {knowledge.estimatedTime} 分钟
                </span>
                <span className="flex items-center gap-2">
                  <ScrollText className="h-4 w-4 text-primary" />
                  史实分段叙事 + 公式动画 + 课堂测试
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button type="button">
                  <Star className="mr-2 h-4 w-4" />
                  阅读完成，获得 {getReadingReward()} 积分
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/knowledge/${knowledge.slug}/quiz`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    开始测试
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <PortraitCard portrait={knowledge.portrait} />
      </section>

      <FormulaBlock formula={knowledge.formula} />
      <FormulaAnimation slug={knowledge.slug} formula={knowledge.formula} prompt={knowledge.animationPrompt} />
      <StoryTimeline />

      <Card>
        <CardHeader>
          <CardTitle>详细历史故事</CardTitle>
        </CardHeader>
        <CardContent className="story-prose">
          {(knowledge.storySections ?? []).map((part) => (
            <section key={part.title}>
              <h3>{part.title}</h3>
              <p>{part.content}</p>
            </section>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>参考来源</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
          {(knowledge.sources ?? []).map((item) => (
            <div key={`${item.label}-${item.url ?? "text"}`} className="rounded-2xl border border-border/60 bg-background/40 p-4">
              <p className="font-medium text-foreground">{item.label}</p>
              {item.note ? <p className="mt-1">{item.note}</p> : null}
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-primary hover:underline"
                >
                  打开来源
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
