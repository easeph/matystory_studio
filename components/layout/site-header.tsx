"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoonStar, SunMedium, Trophy, UserCircle2, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/leaderboard", label: "排行榜" },
  { href: "/shop", label: "积分商店" },
  { href: "/profile", label: "个人中心" },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const displayName = user?.user_metadata?.nickname
    ?? user?.user_metadata?.full_name
    ?? user?.email?.split("@")[0]
    ?? "";

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground">
            M
          </div>
          <div>
            <p className="font-display text-xl text-foreground">MathStory</p>
            <p className="text-xs text-muted-foreground">数学故事</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunMedium className="h-5 w-5" />
              ) : (
                <MoonStar className="h-5 w-5" />
              )}
            </Button>
          )}

          {mounted && user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  榜单
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/profile">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  <span className="max-w-[80px] truncate">{displayName}</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="退出登录">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : mounted ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/leaderboard">
                  <Trophy className="mr-2 h-4 w-4" />
                  榜单
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/auth/login">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  登录
                </Link>
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}
