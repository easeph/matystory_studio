import { BlockMath } from "react-katex";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FormulaBlock({ formula }: { formula?: string }) {
  if (!formula) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>原理公式</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <BlockMath math={formula} />
      </CardContent>
    </Card>
  );
}
