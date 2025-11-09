/**
 * Button Component
 * Primary CTA button with purple (#4B4AD5) styling from Dr.Tatva design system
 */

import React from "react";
import { designTokens, typographyClasses } from "@/lib/design-tokens";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  size?: "medium" | "large";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "large",
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "rounded-[16px] font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variantStyles = {
    primary: `bg-[${designTokens.colors.primary}] text-white hover:bg-[#3b3ac5] active:bg-[#2b2ab5]`,
    secondary: "bg-white text-[#4B4AD5] border border-[#4B4AD5] hover:bg-gray-50",
  };

  const sizeStyles = {
    medium: "px-4 text-sm h-10",
    large: "px-5 text-base h-[55px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      style={{
        backgroundColor: variant === "primary" ? designTokens.colors.primary : undefined,
      }}
    >
      {children}
    </button>
  );
}
