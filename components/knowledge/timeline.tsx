const timelineTitles = ["文明起点", "思想突破", "课堂回响"];

export function StoryTimeline() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {timelineTitles.map((item, index) => (
        <div key={item} className="rounded-3xl border border-border/60 bg-card/60 p-5">
          <p className="text-xs uppercase tracking-[0.28em] text-primary">0{index + 1}</p>
          <h3 className="mt-3 font-display text-xl">{item}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            从生活问题出发，到跨文明交流，再到今天的课堂抽象，数学知识总在不断重写自己。
          </p>
        </div>
      ))}
    </div>
  );
}
