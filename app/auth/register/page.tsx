'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, User, Globe } from 'lucide-react'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (password.length < 6) {
      setMessage('密码至少需要 6 位字符。')
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname: nickname || email.split('@')[0] },
      },
    })

    if (error) {
      const msg: Record<string, string> = {
        'User already registered': '该邮箱已注册，请直接登录。',
        'Password should be at least 6 characters': '密码至少需要 6 位字符。',
        'Unable to validate email address: invalid format': '邮箱格式不正确。',
      }
      setMessage(msg[error.message] ?? error.message)
    } else {
      setSuccess(true)
    }

    setLoading(false)
  }

  const handleGoogleRegister = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/` },
    })
    if (error) setMessage(error.message)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/60 shadow-glow text-center">
          <CardContent className="pt-10 pb-8 space-y-4">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-primary/20 text-3xl">
              ✓
            </div>
            <h2 className="font-display text-2xl text-foreground">注册成功！</h2>
            <p className="text-sm text-muted-foreground leading-7">
              确认邮件已发送至 <span className="text-primary font-medium">{email}</span>，
              请前往邮箱点击确认链接，然后即可登录。
            </p>
            <Button asChild className="w-full mt-4">
              <Link href="/auth/login">前往登录</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-accent text-2xl font-bold text-primary-foreground shadow-glow">
            M
          </div>
          <h1 className="font-display text-4xl text-foreground">MathStory</h1>
          <p className="text-sm text-muted-foreground">创建你的数学探索档案</p>
        </div>

        <Card className="border-border/60 shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-2xl">注册账户</CardTitle>
            <CardDescription>注册后即可累计积分、冲击排行榜</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">昵称（选填）</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="你的数学探索者称号"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

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
                <Label htmlFor="password">密码（至少 6 位）</Label>
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
                {loading ? '注册中...' : '邮箱注册'}
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

            <Button onClick={handleGoogleRegister} variant="outline" className="w-full gap-2">
              <Globe className="h-4 w-4" />
              使用 Google 账号注册
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              已有账号？{' '}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                立即登录
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
