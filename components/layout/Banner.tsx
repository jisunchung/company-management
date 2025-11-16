import React from "react";
import { cn } from "@/lib/utils";

interface BannerProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function Banner({ title, subtitle, className }: BannerProps) {
  return (
    <div
      className={cn("relative h-60 overflow-hidden", className)}
      style={{
        backgroundImage: "url(/Banner.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto flex h-full items-center justify-center px-6 text-center">
        <div>
          {subtitle && (
            <p className="text-text-muted mb-2 text-sm">{subtitle}</p>
          )}
          <h1 className="text-text-primary text-3xl font-bold">{title}</h1>
        </div>
      </div>
    </div>
  );
}
