// src/components/LazyComponent.tsx
import { lazy, Suspense } from "react";

export default function LazyComponent({
  importFunc,
}: {
  importFunc: () => Promise<{ default: React.ComponentType }>;
}) {
  const Component = lazy(importFunc);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
}
