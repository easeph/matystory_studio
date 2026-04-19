import Link from "next/link";
import { notFound } from "next/navigation";

import { QuizClient } from "@/components/quiz/quiz-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPerfectQuizReward } from "@/lib/gamification";
import { getKnowledgeAndQuiz } from "@/data/quizzes";

export default function QuizPage({ params }: { params: { slug: string } }) {
  const { knowledge, quiz } = getKnowledgeAndQuiz(params.slug);

  if (!knowledge || !quiz) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-3">
            <Badge>{knowledge.grade}</Badge>
            <Badge>{knowledge.chapter}</Badge>
          </div>
          <CardTitle className="text-3xl">{knowledge.title} - 章节测试</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
          <p>本套题共 8 道，包含 4 道选择题、2 道填空题、2 道判断题，提交后会立即显示成绩、详细解析和历史彩蛋。</p>
          <p>满分奖励：{getPerfectQuizReward()} 积分。建议先阅读知识点详情页，再回来完成测试，效果会更好。</p>
          <Button asChild variant="outline">
            <Link href={`/knowledge/${knowledge.slug}`}>返回知识点详情</Link>
          </Button>
        </CardContent>
      </Card>

      <QuizClient quiz={quiz} />
    </div>
  );
}
