import React from "react";
import { typographyMap, Typography } from "@/styles/typography";

interface TextProps {
  children: React.ReactNode;
  typography?: Typography;
  display?: "block" | "inline" | "inline-block";
  textAlign?: "left" | "center" | "right";
  bold?: "bold" | "semibold" | "regular";
  className?: string;
}

export default function Text({
  children,
  typography = "t5",
  display,
  textAlign,
  bold = "regular",
  className = "",
}: TextProps) {
  const fontWeightMap = {
    bold: "font-bold",
    semibold: "font-semibold",
    regular: "font-normal",
  };
  const displayClass = display ? `inline-block` : "";
  const alignClass = textAlign ? `text-${textAlign}` : "";

  return (
    <span
      className={[
        typographyMap[typography],
        fontWeightMap[bold],
        displayClass,
        alignClass,
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
