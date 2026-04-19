import Link from "next/link";
import { Clock3, Sparkles } from "lucide-react";
import { BlockMath } from "react-katex";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { KnowledgePoint } from "@/types";

export function KnowledgeCard({ knowledge }: { knowledge: KnowledgePoint }) {
  return (
    <Card className="relative flex h-full flex-col justify-between overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-yellow-200 to-accent" />
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge>{knowledge.chapter}</Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" />
            {knowledge.estimatedTime} 分钟
          </span>
        </div>
        <CardTitle className="text-xl">{knowledge.title}</CardTitle>
        <CardDescription>{knowledge.shortDesc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-border/60 bg-background/40 p-4 text-sm leading-7 text-muted-foreground">
          {knowledge.formula ? (
            <div className="space-y-2">
              <p className="font-medium text-primary">核心公式</p>
              <div className="overflow-x-auto text-foreground">
                <BlockMath math={knowledge.formula} />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                动画重点
              </div>
              <p>{knowledge.animationPrompt}</p>
            </div>
          )}
        </div>
        <div className="flex gap-3">
          <Button asChild className="flex-1">
            <Link href={`/knowledge/${knowledge.slug}`}>进入故事</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href={`/knowledge/${knowledge.slug}/quiz`}>开始测试</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
