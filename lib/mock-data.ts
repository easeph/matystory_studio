import { getLevelFromPoints } from "@/lib/gamification";
import type { UserProfile } from "@/types";

const baseProfiles = [
  { id: "u1", nickname: "星轨同学", points: 1680 },
  { id: "u2", nickname: "方程捕手", points: 1320 },
  { id: "u3", nickname: "几何画板", points: 1210 },
  { id: "u4", nickname: "数海远航", points: 990 },
  { id: "u5", nickname: "阿基米德猫", points: 860 }
];

export const leaderboardProfiles: UserProfile[] = baseProfiles.map((profile, index) => {
  const levelInfo = getLevelFromPoints(profile.points);
  return {
    ...profile,
    avatar: `/images/badges/avatar-${(index % 3) + 1}.png`,
    level: levelInfo.level,
    title: levelInfo.title,
    completedReadings: [],
    perfectQuizzes: []
  };
});

export const currentUser: UserProfile = {
  id: "demo-user",
  nickname: "数学故事探索者",
  avatar: "/images/badges/avatar-1.png",
  points: 740,
  level: getLevelFromPoints(740).level,
  title: getLevelFromPoints(740).title,
  completedReadings: ["gougu-dingli", "youli-shu"],
  perfectQuizzes: ["gougu-dingli"]
};

export const shopItems = [
  {
    id: "badge-pythagoras",
    name: "勾股探索徽章",
    cost: 120,
    description: "完成几何专题后可佩戴的动态徽章。"
  },
  {
    id: "wallpaper-night",
    name: "深蓝星图壁纸",
    cost: 260,
    description: "以古典天球和函数网格融合的高清壁纸。"
  },
  {
    id: "certificate-history",
    name: "数学史证书",
    cost: 480,
    description: "可下载的学习成就证书，适合课堂展示。"
  }
];
