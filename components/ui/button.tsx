/*import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "default" | "ghost";
  size?: "default" | "icon";
  asChild?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "default",
  size = "default",
  asChild = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-400",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-inherit focus:ring-gray-300",
  } as const;
  const sizes = { default: "h-10 px-4 py-2", icon: "h-9 w-9 p-0" } as const;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, { className: cn(classes, child.props.className) });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}*/
/*import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: "default" | "ghost";
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-8 text-lg"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = "md", variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-xl font-medium transition-transform";
    const variantClass =
      variant === "default"
        ? "bg-rose-600 text-white hover:scale-[1.02] shadow-md"
        : "bg-transparent";
    return (
      <button ref={ref} className={cn(base, sizeClasses[size], variantClass, className)} {...props} />
    );
  }
);
Button.displayName = "Button";*/
/*import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
  icon: "h-8 w-8 p-0",
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:brightness-95",
  outline: "bg-transparent border border-primary/20",
  ghost: "bg-transparent",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";*/
/*import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
  icon: "h-8 w-8 p-0",
};

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:brightness-95",
  outline: "bg-transparent border border-primary/20",
  ghost: "bg-transparent",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";*/
// src/components/ui/button.tsx
// components/ui/button.tsx
// components/ui/button.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariants = "default" | "outline" | "ghost" | "link";
export type ButtonSizes = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  asChild?: boolean; // keep for API compatibility but we won't blindly pass it to DOM
}

const variantClasses: Record<ButtonVariants, string> = {
  default:
    "bg-primary text-white hover:bg-primary/90 border border-transparent",
  outline: "border border-primary/10 bg-card/50",
  ghost: "bg-transparent",
  link: "bg-transparent underline-offset-4 hover:underline",
};

const sizeClasses: Record<ButtonSizes, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-base px-4 py-2 rounded-lg",
  lg: "text-lg px-5 py-3 rounded-xl",
  icon: "p-2 w-10 h-10 inline-flex items-center justify-center rounded-xl",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, variant = "default", size = "md", asChild, ...rest } = props;
  // IMPORTANT: do not pass `asChild` to the DOM element
  return (
    <button
      ref={ref}
      {...rest}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    />
  );
});

Button.displayName = "Button";
export { Button };
export default Button;



