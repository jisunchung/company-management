import React from "react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  variant?: "Fill" | "Outline";
  className?: string;
}

export default function Button({
  leftIcon,
  rightIcon,
  children,
  width = 147,
  height = 38,
  style,
  className = "",
  variant = "Fill",
  ...props
}: ButtonProps) {
  let variantClass = "";
  if (variant === "Fill") {
    variantClass = "bg-black text-white border border-black hover:bg-gray-700";
  } else if (variant === "Outline") {
    variantClass = "bg-white text-black border border-black hover:bg-gray-200";
  }

  return (
    <button
      type="button"
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        padding: "8px 16px",
        borderRadius: 4,
        opacity: 1,
        ...style,
      }}
      className={`flex items-center justify-center gap-1 text-base font-medium transition-colors ${variantClass} ${className}`}
      {...props}
    >
      {leftIcon && <span className="flex items-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex items-center">{rightIcon}</span>}
    </button>
  );
}
