import type { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return (
    <section className="flex-1 bg-white dark:bg-gray-900 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">{children}</div>
    </section>
  );
}
