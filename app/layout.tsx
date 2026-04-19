import type { Metadata } from "next";
import "katex/dist/katex.min.css";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "MathStory | 数学故事",
  description: "人教版初中数学全知识点 + 数学历史故事 + 互动动画 + 积分等级系统"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
