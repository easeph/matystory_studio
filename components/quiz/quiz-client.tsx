"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import { InlineMath } from "react-katex";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { QuizSet } from "@/types";

function renderAnswer(answer: string | boolean) {
  if (typeof answer === "boolean") {
    return answer ? "正确" : "错误";
  }

  if (/[\\^_=]/.test(answer)) {
    return <InlineMath math={answer} />;
  }

  return answer;
}

export function QuizClient({ quiz }: { quiz: QuizSet }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const score = useMemo(() => {
    return quiz.questions.reduce((total, question) => {
      const value = answers[question.id];
      const normalizedAnswer =
        typeof question.answer === "boolean" ? String(question.answer) : String(question.answer).trim().toLowerCase();
      const normalizedValue = String(value ?? "").trim().toLowerCase();
      return total + (normalizedAnswer === normalizedValue ? 1 : 0);
    }, 0);
  }, [answers, quiz.questions]);

  const answeredCount = useMemo(
    () => quiz.questions.filter((question) => String(answers[question.id] ?? "").trim() !== "").length,
    [answers, quiz.questions]
  );

  useEffect(() => {
    if (submitted) {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [submitted]);

  return (
    <div className="space-y-6">
      {submitted && (
        <Card ref={resultRef} className="border-primary/40 bg-primary/5">
          <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 font-display text-2xl text-foreground">
                <Trophy className="h-6 w-6 text-primary" />
                提交成功
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                你答对了 {score} / {quiz.questions.length} 题。
                {score === quiz.questions.length ? " 恭喜满分，应该奖励 30 积分。" : " 下方已经展开每题解析和历史彩蛋。"}
              </p>
            </div>
            <Badge className="text-sm">完成度 {answeredCount}/{quiz.questions.length}</Badge>
          </CardContent>
        </Card>
      )}

      {quiz.questions.map((question, index) => {
        const currentAnswer = answers[question.id];
        const correct =
          submitted &&
          String(currentAnswer ?? "").trim().toLowerCase() === String(question.answer).trim().toLowerCase();

        return (
          <Card key={question.id}>
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xl">第 {index + 1} 题</CardTitle>
                <Badge>{question.type === "single" ? "选择题" : question.type === "blank" ? "填空题" : "判断题"}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-7 text-foreground">{question.prompt}</p>
              {question.type === "single" && question.options ? (
                <div className="grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: option }))}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        currentAnswer === option
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background/30 text-muted-foreground"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : question.type === "judge" ? (
                <div className="flex gap-3">
                  {[
                    { label: "正确", value: "true" },
                    { label: "错误", value: "false" }
                  ].map((item) => (
                    <Button
                      key={item.value}
                      type="button"
                      variant={currentAnswer === item.value ? "default" : "outline"}
                      onClick={() => setAnswers((prev) => ({ ...prev, [question.id]: item.value }))}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              ) : (
                <Input
                  placeholder="请输入答案"
                  value={currentAnswer ?? ""}
                  onChange={(event) => setAnswers((prev) => ({ ...prev, [question.id]: event.target.value }))}
                />
              )}

              {submitted && (
                <div
                  className={`rounded-2xl border p-4 ${
                    correct ? "border-emerald-400/40 bg-emerald-500/10" : "border-rose-400/40 bg-rose-500/10"
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium">
                    {correct ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-400" />
                    )}
                    {correct ? "回答正确" : <>正确答案：{renderAnswer(question.answer)}</>}
                  </div>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{question.explanation}</p>
                  <p className="mt-2 text-sm leading-7 text-primary">{question.easterEgg}</p>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}

      <Card className="sticky bottom-4">
        <CardContent className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl text-foreground">测试总览</p>
            <p className="text-sm text-muted-foreground">
              已作答 {answeredCount} / {quiz.questions.length} 题。
              {submitted
                ? ` 当前成绩 ${score} / ${quiz.questions.length}。`
                : " 点击提交后会立即显示成绩、解析和历史彩蛋。"}
            </p>
          </div>
          <Button type="button" onClick={() => setSubmitted(true)}>
            提交并查看解析
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
