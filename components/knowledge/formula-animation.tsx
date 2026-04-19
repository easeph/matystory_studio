"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BlockMath, InlineMath } from "react-katex";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function Range({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="space-y-2 text-sm text-muted-foreground">
      <span className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-primary">{value.toFixed(1)}</span>
      </span>
      <Input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step ?? 0.1}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-3 cursor-pointer p-0"
      />
    </label>
  );
}

function PythagoreanAnimation() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = useMemo(() => Math.sqrt(a * a + b * b), [a, b]);
  const scale = 20;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Range label="直角边 a" value={a} min={2} max={8} onChange={setA} />
        <Range label="直角边 b" value={b} min={2} max={8} onChange={setB} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 320 240" className="w-full rounded-3xl border border-border/60 bg-background/50 p-4">
          <motion.polygon
            points={`40,200 ${40 + a * scale},200 40,${200 - b * scale}`}
            fill="rgba(212,175,55,0.25)"
            stroke="rgba(212,175,55,0.95)"
            strokeWidth="3"
            layout
          />
          <motion.rect x="40" y={200 - a * scale} width={a * scale} height={a * scale} fill="rgba(34,197,94,0.2)" stroke="#22c55e" layout />
          <motion.rect x={40 + a * scale + 20} y={200 - b * scale} width={b * scale} height={b * scale} fill="rgba(56,189,248,0.2)" stroke="#38bdf8" layout />
          <motion.rect
            x={210}
            y={200 - c * scale}
            width={c * scale}
            height={c * scale}
            fill="rgba(244,114,182,0.18)"
            stroke="#f472b6"
            layout
          />
          <text x="50" y="218" fill="currentColor">a²</text>
          <text x={50 + a * scale + 20} y="218" fill="currentColor">b²</text>
          <text x="220" y="218" fill="currentColor">c²</text>
        </svg>
        <div className="space-y-3 rounded-3xl border border-border/60 bg-card/60 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            拖动两条直角边后，可以看到两个小正方形的面积和始终等于大正方形面积。
          </p>
          <p className="font-medium text-foreground">
            当前验证：<InlineMath math={`${a.toFixed(1)}^2+${b.toFixed(1)}^2=${c.toFixed(2)}^2`} />
          </p>
        </div>
      </div>
    </div>
  );
}

function QuadraticAnimation() {
  const [a, setA] = useState(1);
  const [h, setH] = useState(0);
  const [k, setK] = useState(0);
  const points = useMemo(() => {
    const values: string[] = [];
    for (let x = -6; x <= 6; x += 0.2) {
      const y = a * (x - h) ** 2 + k;
      values.push(`${x * 18 + 140},${120 - y * 10}`);
    }
    return values.join(" ");
  }, [a, h, k]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Range label="开口系数 a" value={a} min={-2} max={2} step={0.1} onChange={setA} />
        <Range label="顶点横坐标 h" value={h} min={-4} max={4} onChange={setH} />
        <Range label="顶点纵坐标 k" value={k} min={-4} max={4} onChange={setK} />
      </div>
      <svg viewBox="0 0 280 240" className="w-full rounded-3xl border border-border/60 bg-background/50 p-4">
        <line x1="20" x2="260" y1="120" y2="120" stroke="currentColor" opacity="0.3" />
        <line x1="140" x2="140" y1="20" y2="220" stroke="currentColor" opacity="0.3" />
        <motion.polyline fill="none" stroke="rgba(212,175,55,0.95)" strokeWidth="4" points={points} layout />
        <motion.circle cx={h * 18 + 140} cy={120 - k * 10} r="6" fill="#38bdf8" layout />
      </svg>
      <p className="text-sm leading-7 text-muted-foreground">
        当前函数：<InlineMath math={`y=${a.toFixed(1)}(x-${h.toFixed(1)})^2+${k.toFixed(1)}`} />
      </p>
    </div>
  );
}

function RootAnimation() {
  const [b, setB] = useState(4);
  const [c, setC] = useState(1);
  const delta = b * b - 4 * c;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Range label="系数 b" value={b} min={-8} max={8} onChange={setB} />
        <Range label="系数 c" value={c} min={-8} max={8} onChange={setC} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["x^2+bx+c=0", "(x+\\frac{b}{2})^2=\\frac{b^2}{4}-c", "x=\\frac{-b\\pm\\sqrt{b^2-4c}}{2}"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="rounded-3xl border border-border/60 bg-card/60 p-5"
          >
            <InlineMath math={item} />
          </motion.div>
        ))}
      </div>
      <p className="text-sm leading-7 text-muted-foreground">
        判别式 <InlineMath math={`\\Delta=${delta.toFixed(1)}`} />。
        {delta >= 0 ? " 当前有实数根。" : " 当前没有实数根。"}
      </p>
    </div>
  );
}

function TrigAnimation() {
  const [angle, setAngle] = useState(35);
  const radians = (angle * Math.PI) / 180;
  const hyp = 100;
  const adjacent = hyp * Math.cos(radians);
  const opposite = hyp * Math.sin(radians);

  return (
    <div className="space-y-6">
      <Range label="锐角 A" value={angle} min={15} max={75} step={1} onChange={setAngle} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <svg viewBox="0 0 260 220" className="w-full rounded-3xl border border-border/60 bg-background/50 p-4">
          <polygon points={`40,180 ${40 + adjacent},180 ${40 + adjacent},${180 - opposite}`} fill="rgba(212,175,55,0.2)" stroke="#d4af37" strokeWidth="3" />
          <text x="85" y="196" fill="currentColor">邻边</text>
          <text x={52 + adjacent} y={140 - opposite / 2} fill="currentColor">对边</text>
          <text x="75" y={155 - opposite / 2} fill="currentColor">斜边</text>
        </svg>
        <div className="space-y-3 rounded-3xl border border-border/60 bg-card/60 p-5">
          <p><InlineMath math={`\\sin A\\approx ${Math.sin(radians).toFixed(3)}`} /></p>
          <p><InlineMath math={`\\cos A\\approx ${Math.cos(radians).toFixed(3)}`} /></p>
          <p><InlineMath math={`\\tan A\\approx ${Math.tan(radians).toFixed(3)}`} /></p>
          <p className="text-sm leading-7 text-muted-foreground">拖动角度后，三种边长比会同步更新。</p>
        </div>
      </div>
    </div>
  );
}

function ParallelogramAnimation() {
  const [base, setBase] = useState(8);
  const [height, setHeight] = useState(5);
  const [skew, setSkew] = useState(2.5);
  const scale = 18;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Range label="底 a" value={base} min={4} max={10} onChange={setBase} />
        <Range label="高 h" value={height} min={3} max={8} onChange={setHeight} />
        <Range label="倾斜量" value={skew} min={1} max={4} step={0.5} onChange={setSkew} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <svg viewBox="0 0 320 220" className="w-full rounded-3xl border border-border/60 bg-background/50 p-4">
          <motion.polygon
            points={`${70 + skew * 10},40 ${70 + skew * 10 + base * scale},40 ${40 + base * scale},${40 + height * scale} 40,${40 + height * scale}`}
            fill="rgba(56,189,248,0.20)"
            stroke="#38bdf8"
            strokeWidth="3"
            layout
          />
          <motion.polygon
            points={`70,40 ${70 + skew * 10},40 40,${40 + height * scale} 40,${40 + height * scale}`}
            fill="rgba(212,175,55,0.22)"
            stroke="#d4af37"
            strokeDasharray="6 4"
            strokeWidth="2"
            layout
          />
          <motion.rect
            x={170}
            y={40}
            width={base * scale}
            height={height * scale}
            fill="rgba(34,197,94,0.18)"
            stroke="#22c55e"
            strokeWidth="3"
            layout
          />
        </svg>
        <div className="rounded-3xl border border-border/60 bg-card/60 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            左侧把平行四边形切下一角并平移到右侧，就得到等底等高的长方形，因此面积不变。
          </p>
          <p className="mt-3 font-medium text-foreground">
            当前面积：<InlineMath math={`S=${base.toFixed(1)}\\times${height.toFixed(1)}=${(base * height).toFixed(1)}`} />
          </p>
        </div>
      </div>
    </div>
  );
}

function CircleAnimation() {
  const [radius, setRadius] = useState(4);
  const [angle, setAngle] = useState(80);
  const rad = (angle * Math.PI) / 180;
  const cx = 140;
  const cy = 110;
  const px = cx + radius * 20;
  const py = cy;
  const qx = cx + Math.cos(rad) * radius * 20;
  const qy = cy - Math.sin(rad) * radius * 20;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Range label="半径 r" value={radius} min={2} max={6} step={0.5} onChange={setRadius} />
        <Range label="圆心角" value={angle} min={20} max={160} step={5} onChange={setAngle} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <svg viewBox="0 0 300 220" className="w-full rounded-3xl border border-border/60 bg-background/50 p-4">
          <circle cx={cx} cy={cy} r={radius * 20} fill="rgba(56,189,248,0.12)" stroke="#38bdf8" strokeWidth="3" />
          <line x1={cx} y1={cy} x2={px} y2={py} stroke="#d4af37" strokeWidth="3" />
          <line x1={cx} y1={cy} x2={qx} y2={qy} stroke="#d4af37" strokeWidth="3" />
          <path d={`M ${px} ${py} A ${radius * 20} ${radius * 20} 0 0 0 ${qx} ${qy}`} fill="none" stroke="#f472b6" strokeWidth="4" />
          <text x={cx - 6} y={cy + 6} fill="currentColor">O</text>
        </svg>
        <div className="rounded-3xl border border-border/60 bg-card/60 p-5">
          <p className="text-sm leading-7 text-muted-foreground">
            调整半径和圆心角，可以观察弧长、半径与圆周率相关公式如何共同变化。
          </p>
          <div className="mt-3 space-y-2">
            <p><InlineMath math={`C=2\\pi r\\approx ${(2 * Math.PI * radius).toFixed(2)}`} /></p>
            <p><InlineMath math={`S=\\pi r^2\\approx ${(Math.PI * radius * radius).toFixed(2)}`} /></p>
            <p><InlineMath math={`\\text{圆心角}=${angle.toFixed(0)}^\\circ`} /></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericAnimation({
  formula,
  prompt
}: {
  formula?: string;
  prompt?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[240px] items-center justify-center rounded-3xl border border-border/60 bg-background/50 p-6"
      >
        <div className="w-full space-y-5">
          {formula ? (
            <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card/60 p-4">
              <BlockMath math={formula} />
            </div>
          ) : null}
          <svg viewBox="0 0 240 120" className="w-full">
            <motion.circle cx="45" cy="60" r="20" fill="rgba(212,175,55,0.30)" animate={{ x: [0, 20, 0] }} transition={{ duration: 3.2, repeat: Infinity }} />
            <motion.rect x="100" y="35" width="42" height="42" rx="8" fill="rgba(56,189,248,0.28)" animate={{ rotate: [0, 8, 0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity }} />
            <motion.line x1="170" y1="90" x2="220" y2="30" stroke="#22c55e" strokeWidth="4" animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 2.5, repeat: Infinity }} />
          </svg>
        </div>
      </motion.div>
      <div className="rounded-3xl border border-border/60 bg-card/60 p-5 text-sm leading-7 text-muted-foreground">
        {prompt ?? "通过 SVG 与 Framer Motion 把本节公式从静态表达转成动态观察。"}
      </div>
    </div>
  );
}

export function FormulaAnimation({
  slug,
  formula,
  prompt
}: {
  slug: string;
  formula?: string;
  prompt?: string;
}) {
  const content = (() => {
    switch (slug) {
      case "gougu-dingli":
      case "gougu-yingyong":
        return <PythagoreanAnimation />;
      case "erci-hanshu":
      case "ercihanshu-yingyong":
        return <QuadraticAnimation />;
      case "yiyuanyici-fangcheng-2":
        return <RootAnimation />;
      case "ruijiao-sanjiaohanshu":
        return <TrigAnimation />;
      case "pingxingsibianxing":
        return <ParallelogramAnimation />;
      case "yuan":
      case "yuan-xingzhi":
        return <CircleAnimation />;
      default:
        return <GenericAnimation formula={formula} prompt={prompt} />;
    }
  })();

  return (
    <Card>
      <CardHeader>
        <CardTitle>公式动画演示</CardTitle>
        <CardDescription>把公式、图形和变化过程放在同一个可视化面板里。</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
