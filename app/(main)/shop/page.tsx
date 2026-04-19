import { Gift, Palette, ScrollText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { shopItems } from "@/lib/mock-data";

const icons = [Gift, Palette, ScrollText];

export default function ShopPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>积分兑换商店</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          1.0 版本提供虚拟徽章、壁纸和证书兑换。后续可以扩展班级勋章、主题皮肤、教师奖励卡与打印版学习档案。
        </CardContent>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shopItems.map((item, index) => {
          const Icon = icons[index] ?? Gift;
          return (
            <Card key={item.id} className="overflow-hidden">
              <div className="h-40 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22),transparent_40%),linear-gradient(135deg,rgba(9,23,56,0.98),rgba(16,44,89,0.88))]" />
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge>{item.cost} 积分</Badge>
                </div>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                <Button className="w-full">兑换奖励</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
