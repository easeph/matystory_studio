import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function chunkBy<T>(items: T[], groupFn: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = groupFn(item);
    acc[key] ??= [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
