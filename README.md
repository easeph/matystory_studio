# MathStory（数学故事）

MathStory 是一个基于 Next.js 14 App Router + TypeScript + Tailwind CSS + shadcn/ui 风格组件 + Framer Motion + KaTeX + Supabase 的中文初中数学历史互动网站。

## 项目特色

- 完整覆盖人教版初中数学核心知识点，共 40 个知识点，按六册教材分组
- 每个知识点包含公式、历史故事、动画提示、人物画像提示、阅读时长
- 知识点详情页提供 KaTeX 公式渲染、分段叙事、时间轴与互动动画
- 每个知识点自带 8 道题的测试页，提交后展示得分、解析和历史彩蛋
- 内置积分等级系统、个人中心、排行榜、积分兑换商店
- 支持深色/浅色模式，默认深蓝+金色数学主题

## 技术栈

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- KaTeX / react-katex
- Supabase Auth + PostgreSQL
- next-themes

## 项目结构

```text
mathstory/
├─ app/
│  ├─ (main)/
│  │  ├─ knowledge/[slug]/page.tsx
│  │  ├─ knowledge/[slug]/quiz/page.tsx
│  │  ├─ leaderboard/page.tsx
│  │  ├─ profile/page.tsx
│  │  ├─ shop/page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ auth/login/page.tsx
│  ├─ auth/signup/page.tsx
│  ├─ layout.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ knowledge/
│  ├─ layout/
│  ├─ quiz/
│  ├─ ui/
│  ├─ auth-form.tsx
│  └─ theme-provider.tsx
├─ data/
│  ├─ knowledge.ts
│  └─ quizzes.ts
├─ lib/
│  ├─ gamification.ts
│  ├─ mock-data.ts
│  ├─ supabase.ts
│  └─ utils.ts
├─ styles/globals.css
├─ supabase/schema.sql
├─ .env.example
├─ package.json
└─ tailwind.config.ts
```

## 运行步骤

1. 安装依赖

```bash
npm install
```

2. 创建环境变量文件

```bash
cp .env.example .env.local
```

3. 在 `.env.local` 中填写 Supabase 配置

```env
NEXT_PUBLIC_SUPABASE_URL=你的_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的_supabase_anon_key
```

4. 在 Supabase SQL Editor 中执行 [supabase/schema.sql](./supabase/schema.sql)

5. 启动开发环境

```bash
npm run dev
```

6. 打开 `http://localhost:3000`

## Supabase 配置建议

- Authentication:
  - 开启 Email / Password
  - 开启 Google Provider
  - Google 回调地址设置为 `http://localhost:3000`
- Database:
  - 使用 `users` 存用户基础资料
  - 使用 `knowledge_points` 存章节元信息
  - 使用 `quizzes` 存测试题
  - 使用 `user_progress` 记录阅读和测试进度
  - 使用 `user_points` 记录积分流水

## 如何扩展新知识点

1. 在 [data/knowledge.ts](./data/knowledge.ts) 中追加新的 `KnowledgePoint`
2. 如果需要定制测试，扩展 [data/quizzes.ts](./data/quizzes.ts) 的生成逻辑或改为静态题库
3. 如果需要专属动画，在 [components/knowledge/formula-animation.tsx](./components/knowledge/formula-animation.tsx) 中添加新的 `slug` 分支
4. 如果需要展示真实人物图像，可在 `public/images/mathematicians/` 中加入素材，并在详情页中替换 AI 提示卡
5. 如果接入真实积分逻辑，可把 `mock-data.ts` 替换为 Supabase 查询结果

## 当前 1.0 范围说明

- 已提供完整前端结构与可运行页面
- 已覆盖 40 个核心知识点与测试页入口
- 已内置重点动画：勾股定理、二次函数、一元二次方程求根、锐角三角函数
- 当前积分、排行榜、商店默认使用演示数据，方便先跑通 UI
- 接入 Supabase 后即可逐步改为真实持久化数据
