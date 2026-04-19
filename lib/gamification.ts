const LEVEL_TITLES = [
  "数学新芽",
  "数轴旅人",
  "几何学徒",
  "方程侦探",
  "函数漫游者",
  "证明挑战者",
  "图形炼金师",
  "历史解码师",
  "数学星图师",
  "MathStory 大师"
];

export function getLevelFromPoints(points: number) {
  const level = Math.max(1, Math.min(10, Math.floor(points / 500) + 1));
  const currentLevelFloor = (level - 1) * 500;
  const nextLevelFloor = Math.min(5000, level * 500);
  const progress = level === 10 ? 1 : (points - currentLevelFloor) / 500;

  return {
    level,
    title: LEVEL_TITLES[level - 1],
    progress,
    currentLevelFloor,
    nextLevelFloor
  };
}

export function getReadingReward() {
  return 10;
}

export function getPerfectQuizReward() {
  return 30;
}
