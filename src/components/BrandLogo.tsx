import React from "react";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Styled "Madinaty AI" text logo with gradient coloring.
 * "Madinaty" uses blue-to-teal gradient, "AI" uses teal/coral accent.
 */
export function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const sizeClasses = {
    sm: "brand-logo-sm",
    md: "brand-logo-md",
    lg: "brand-logo-lg",
    xl: "brand-logo-xl",
  };

  return (
    <span className={`brand-logo ${sizeClasses[size]} ${className}`} dir="ltr">
      <span className="brand-text-madinaty">Madinaty</span>
      <span className="brand-text-ai">&nbsp;AI</span>
    </span>
  );
}
