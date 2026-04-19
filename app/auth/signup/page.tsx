import Link from "next/link";

import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10">
      <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-primary">MathStory 注册</p>
          <h1 className="font-display text-5xl leading-tight">创建你的数学探索档案</h1>
          <p className="max-w-xl text-base leading-8 text-muted-foreground">
            注册后就能累计积分、解锁等级称号、收藏知识点，并在排行榜里和同学一起成长。
          </p>
          <p className="text-sm text-muted-foreground">
            已有账号？<Link href="/auth/login" className="text-primary">返回登录</Link>
          </p>
        </section>
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
