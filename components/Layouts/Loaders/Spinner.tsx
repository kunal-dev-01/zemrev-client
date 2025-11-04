// Spinner.tsx
import React from "react";
import clsx from "clsx";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
};

const Spinner: React.FC<SpinnerProps> = React.memo(
  ({ size = "md", color = "text-blue-600", strokeWidth = 3, className }) => {
    const pixelSize =
      typeof size === "number" ? size : sizeMap[size] ?? sizeMap.md;

    return (
      <>
        <span
          className={clsx("inline-flex", color, className)}
          style={{ width: pixelSize, height: pixelSize }}
        >
          <svg viewBox="25 25 50 50" className="w-full h-full animate-rotate">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeDasharray="1, 200"
              strokeDashoffset="0"
              strokeLinecap="round"
              className="animate-dash"
            />
          </svg>
        </span>

        <style jsx>{`
          .animate-rotate {
            animation: rotate4 2s linear infinite;
            transform-origin: center;
          }
          .animate-dash {
            animation: dash4 1.5s ease-in-out infinite;
          }

          @keyframes rotate4 {
            100% { transform: rotate(360deg); }
          }
          @keyframes dash4 {
            0%   { stroke-dasharray: 1, 200; stroke-dashoffset: 0; }
            50%  { stroke-dasharray: 90, 200; stroke-dashoffset: -35px; }
            100% { stroke-dashoffset: -125px; }
          }
        `}</style>
      </>
    );
  }
);

Spinner.displayName = "Spinner";
export default Spinner;