'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Globe } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const msg: Record<string, string> = {
        'Invalid login credentials': '邮箱或密码错误，请检查后重试。',
        'Email not confirmed': '邮箱尚未验证，请查收确认邮件。',
        'Too many requests': '尝试次数过多，请稍后再试。',
      }
      setMessage(msg[error.message] ?? error.message)
    } else {
      router.push('/')
      router.refresh()
    }

    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/` },
    })
    if (error) setMessage(error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-glow">
            M
          </div>
          <h1 className="font-display text-4xl text-foreground">MathStory</h1>
          <p className="text-sm text-muted-foreground">数学历史探索学习平台</p>
        </div>

        <Card className="border-border/60 shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-2xl">欢迎回来</CardTitle>
            <CardDescription>登录后继续你的数学历史探索之旅</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">邮箱地址</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">密码</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                    忘记密码？
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {message && (
                <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-3 py-2">
                  {message}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? '登录中...' : '邮箱登录'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">或</span>
              </div>
            </div>

            <Button onClick={handleGoogleLogin} variant="outline" className="w-full gap-2">
              <Globe className="h-4 w-4" />
              使用 Google 账号登录
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              还没有账号？{' '}
              <Link href="/auth/register" className="text-primary hover:underline font-medium">
                立即注册
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}