export type GradeGroup =
  | "七年级上册"
  | "七年级下册"
  | "八年级上册"
  | "八年级下册"
  | "九年级上册"
  | "九年级下册";

export interface StorySection {
  title: string;
  content: string;
}

export interface KnowledgeSource {
  label: string;
  url?: string;
  note?: string;
}

export interface PortraitAsset {
  title: string;
  imageUrl: string;
  sourcePageUrl: string;
  caption: string;
  credit: string;
  license: string;
}

export interface KnowledgePoint {
  id: string;
  slug: string;
  title: string;
  grade: GradeGroup;
  chapter: string;
  formula?: string;
  animationPrompt?: string;
  portraitPrompt?: string;
  shortDesc: string;
  fullStory: string;
  estimatedTime: number;
  storySections?: StorySection[];
  sources?: KnowledgeSource[];
  portrait?: PortraitAsset;
}

export type QuizQuestionType = "single" | "blank" | "judge";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  prompt: string;
  options?: string[];
  answer: string | boolean;
  explanation: string;
  easterEgg: string;
}

export interface QuizSet {
  knowledgeSlug: string;
  questions: QuizQuestion[];
}

export interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  points: number;
  level: number;
  title: string;
  completedReadings: string[];
  perfectQuizzes: string[];
}
