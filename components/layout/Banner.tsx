import React from "react";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/Text";

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
        <div className="flex flex-col gap-2">
          <Text typography="t5" bold="regular" className="text-text-muted">
            {subtitle}
          </Text>

          <Text typography="t1" bold="bold" className="text-primary">
            {title}
          </Text>
        </div>
      </div>
    </div>
  );
}
