"use client";

import { ReactNode, useEffect, useState } from "react";

export function MswProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // if (process.env.NODE_ENV === "development") {
      import("./msw").then(async ({ initMockServiceWorker }) => {
        await initMockServiceWorker();
        setReady(true);
      });
    // }
  }, []);
  if (!ready) return null;
  return <>{children}</>; // Component này chỉ để side effect, không render gì cả
}
