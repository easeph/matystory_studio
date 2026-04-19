import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PortraitAsset } from "@/types";

export function PortraitCard({ portrait }: { portrait?: PortraitAsset }) {
  if (!portrait) {
    return null;
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative h-72 overflow-hidden bg-card">
        <Image
          src={portrait.imageUrl}
          alt={portrait.title}
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-4">
          <p className="font-display text-2xl text-foreground">{portrait.title}</p>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{portrait.caption}</p>
        </div>
      </div>
      <CardHeader>
        <CardTitle>历史人物画像</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-7 text-muted-foreground">
        <p>{portrait.credit}</p>
        <p>授权说明：{portrait.license}</p>
        <Link
          href={portrait.sourcePageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          查看原始图像来源
          <ExternalLink className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
