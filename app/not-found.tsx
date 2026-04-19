import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm uppercase tracking-[0.28em] text-primary">404</p>
      <h1 className="mt-4 font-display text-5xl">这页数学故事暂时走丢了</h1>
      <p className="mt-4 text-base leading-8 text-muted-foreground">
        可能是链接有误，也可能这个知识点还在整理中。先回首页继续探索其他章节吧。
      </p>
      <Button asChild className="mt-6">
        <Link href="/">返回首页</Link>
      </Button>
    </main>
  );
}
