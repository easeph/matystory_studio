"use client";

import { useState } from "react";
import { Chrome } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("请先配置 Supabase 环境变量后再启用真实登录。");

  async function handleSubmit() {
    const supabase = createClient();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessage("当前为演示模式：请在 .env.local 中配置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。");
      return;
    }

    const action =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });

    const { error } = await action;
    setMessage(error ? error.message : mode === "login" ? "登录成功，请返回首页继续学习。" : "注册成功，请前往邮箱确认。");
  }

  async function signInWithGoogle() {
    const supabase = createClient();

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setMessage("当前为演示模式：Google 登录需要 Supabase 配置完成后启用。");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : undefined
      }
    });

    if (error) {
      setMessage(error.message);
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "欢迎回来" : "创建账户"}</CardTitle>
        <CardDescription>
          {mode === "login" ? "使用邮箱密码或 Google 登录，继续你的数学历史冒险。" : "注册后即可累计积分、冲击等级并参与排行榜。"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="邮箱地址" type="email" />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" type="password" />
        <Button className="w-full" onClick={handleSubmit}>
          {mode === "login" ? "邮箱登录" : "邮箱注册"}
        </Button>
        <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
          <Chrome className="mr-2 h-4 w-4" />
          使用 Google 继续
        </Button>
        <p className="text-sm leading-7 text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
