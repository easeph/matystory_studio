import type { PropsWithChildren } from "react";

import { Shell } from "@/components/layout/shell";

export default function MainLayout({ children }: PropsWithChildren) {
  return <Shell>{children}</Shell>;
}
