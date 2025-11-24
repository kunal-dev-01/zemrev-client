import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "neutral" | "info";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = "neutral", className = "" }) => {
  const variants = {
    success: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    warning: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    danger: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
    neutral: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
      ${variants[variant]} 
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;