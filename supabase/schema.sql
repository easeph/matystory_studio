create table if not exists public.users (
  id uuid primary key,
  email text unique not null,
  nickname text not null,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.knowledge_points (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  grade text not null,
  chapter text not null,
  formula text,
  short_desc text not null,
  full_story text not null,
  estimated_time integer not null default 6,
  created_at timestamptz default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  knowledge_slug text not null references public.knowledge_points(slug) on delete cascade,
  question_order integer not null,
  question_type text not null,
  prompt text not null,
  options jsonb,
  answer text not null,
  explanation text not null,
  easter_egg text not null
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  knowledge_slug text not null references public.knowledge_points(slug) on delete cascade,
  reading_completed boolean default false,
  quiz_score integer default 0,
  completed_at timestamptz,
  unique (user_id, knowledge_slug)
);

create table if not exists public.user_points (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  source text not null,
  delta integer not null,
  related_slug text,
  created_at timestamptz default now()
);
