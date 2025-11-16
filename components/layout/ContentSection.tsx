import React from "react";
import { cn } from "@/lib/utils";

interface ContentSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function ContentSection({
  children,
  className,
}: ContentSectionProps) {
  return (
    <section className="w-full bg-white">
      <div
        className={cn(
          "max-w-content mx-auto flex flex-col gap-6 px-30 py-15",
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}
